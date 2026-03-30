"use client";

import React, { useMemo } from "react";
import { format } from "date-fns";
import { enUS, he } from "date-fns/locale";
import { useTranslations, useLocale } from "next-intl";
import {
  getFamilyEvents,
  markFamilyEventDone,
  convertFamilyTask,
} from "entities/family-task";
import type { FamilyEventApi } from "entities/family-task";
import type { FamilyTask } from "entities/family-task";
import { CategoryType, RenderCategoryIcon } from "entities/category";
import { Button } from "@components/shadowCDN/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/shadowCDN/dropdown-menu";
import { cn } from "@utils";
import {
  buildCategoryMap,
  getCategoryIconKey,
  getCategoryLabel,
  getEventCategoryId,
} from "../lib/categoryMeta";

const CATEGORY_COLORS: Record<string, string> = {
  medical: "#FF6B6B",
  emotional: "#FFB347",
  home: "#77DD77",
  legal: "#6B9BFF",
  general: "#A3ABC3",
  childcare: "#F9C5D1",
};

const getCategoryColor = (key?: string | null) =>
  key ? (CATEGORY_COLORS[key] ?? "#A3ABC3") : "#A3ABC3";

interface EventListProps {
  familyId: string;
  categories: CategoryType[];
  selectedDate: Date;
  onRefresh: () => void;
  onEditTask: (task: FamilyTask) => void;
}

export const EventList: React.FC<EventListProps> = ({
  familyId,
  categories,
  selectedDate,
  onRefresh,
  onEditTask,
}) => {
  const t = useTranslations();
  const locale = useLocale();
  const isRtl = locale === "he";
  const categoriesById = React.useMemo(() => buildCategoryMap(categories), [categories]);
  const [events, setEvents] = React.useState<FamilyEventApi[]>([]);
  const [loading, setLoading] = React.useState(true);

  const dateStr = format(selectedDate, "yyyy-MM-dd");

  const normalizeDate = (s: string | undefined) =>
    s ? s.slice(0, 10) : "";

  React.useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      try {
        const list = await getFamilyEvents(familyId);
        if (!cancelled) setEvents(list);
      } catch {
        if (!cancelled) setEvents([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [familyId]);

  const eventsForDate = useMemo(() => {
    return events
      .filter((e) => {
        if (e.status === "completed") return false;
        const d = normalizeDate(e.date);
        if (!d) return false;
        return d === dateStr;
      })
      .sort((a, b) => {
        const timeA = a.end_at ?? a.start_at ?? "00:00:00";
        const timeB = b.end_at ?? b.start_at ?? "00:00:00";
        return timeA.localeCompare(timeB);
      });
  }, [events, dateStr]);

  const handleMarkEventDone = async (eventId: string) => {
    await markFamilyEventDone(familyId, eventId);
    const list = await getFamilyEvents(familyId);
    setEvents(list);
    onRefresh();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-6">
        <div className="loader" />
      </div>
    );
  }

  if (eventsForDate.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-semibold text-[#313A56]">
        {t("FamilyTasks.tasks")} — {format(selectedDate, "d MMMM yyyy", { locale: locale === "he" ? he : enUS })}
      </h3>
      {eventsForDate.map((event) => (
        <EventRow
          key={event.id}
          event={event}
          categoriesById={categoriesById}
          isRtl={isRtl}
          t={t}
          onEdit={() => event.task && onEditTask(convertFamilyTask(event.task))}
          onMarkDone={() => handleMarkEventDone(event.id)}
        />
      ))}
    </div>
  );
};

interface EventRowProps {
  event: FamilyEventApi;
  categoriesById: Map<string, CategoryType>;
  isRtl: boolean;
  t: ReturnType<typeof useTranslations>;
  onEdit: () => void;
  onMarkDone: () => void;
}

const EventRow: React.FC<EventRowProps> = ({
  event,
  categoriesById,
  isRtl,
  t,
  onEdit,
  onMarkDone,
}) => {
  const task = event.task;
  const categoryId = getEventCategoryId(task);
  const categorySlug = task?.category_slug ?? categoryId ?? task?.category ?? undefined;
  const categoryColor = getCategoryColor(categorySlug);
  const categoryLabel = getCategoryLabel({
    t,
    categoryId,
    categoriesById,
    fallbackSlug: task?.category_slug,
    fallbackName: task?.category_name ?? task?.category,
  });
  const timeStr = task?.end_at ?? task?.start_at ?? "";
  const dateStr = event.date ?? "";

  return (
    <div
      className={cn(
        "flex items-center gap-4 rounded-xl border px-4 py-3 rtl:flex-row-reverse",
        "border-[#DCE5FF] bg-white"
      )}
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rtl:order-2">
        <RenderCategoryIcon
          icon={getCategoryIconKey(
            categoryId,
            categoriesById,
            task?.category_icon,
            task?.category_slug,
            task?.category
          )}
        />
      </div>
      <div
        className="min-w-0 flex-1 rtl:order-1"
        style={isRtl ? { textAlign: "right" } : undefined}
      >
        {categoryLabel && (
          <span
            className="mb-1 block text-[11px] font-medium uppercase tracking-wide"
            style={{ color: categoryColor }}
          >
            {categoryLabel}
          </span>
        )}
        <p className="text-sm font-semibold text-[#313A56]">{task?.title}</p>
        {(dateStr || timeStr) && (
          <p className="mt-0.5 text-xs text-[#A3ABC3]">
            {dateStr ? format(new Date(dateStr + "T00:00:00"), "d MMMM") : ""}
            {dateStr && timeStr ? " | " : ""}
            {timeStr ? timeStr.slice(0, 5) : ""}
          </p>
        )}
      </div>
      <div className="flex shrink-0 items-center gap-2 rtl:order-3 rtl:flex-row-reverse">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="rounded-lg text-xs"
          onClick={onMarkDone}
        >
          {t("FamilyTasks.markAsDone")}
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 rounded-lg text-[#A3ABC3]">
              <MoreIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="rounded-xl">
            <DropdownMenuItem
              onClick={onEdit}
              className="flex items-center gap-2 text-sm rtl:flex-row-reverse"
            >
              <EditIcon />
              {t("Common.edit")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

const MoreIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="3" r="1.5" fill="currentColor" />
    <circle cx="8" cy="8" r="1.5" fill="currentColor" />
    <circle cx="8" cy="13" r="1.5" fill="currentColor" />
  </svg>
);

const EditIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="me-2 shrink-0">
    <path d="M8 2l4 4-7 7H1v-4l7-7z" stroke="#269ACF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
