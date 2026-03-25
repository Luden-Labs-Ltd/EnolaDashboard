"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import {
  getFamilyTasks,
  markFamilyTaskDone,
  restoreFamilyTask,
  deleteFamilyTask,
  convertFamilyTasks,
  getFamilyEvents,
} from "entities/family-task";
import type { FamilyTask, FamilyTaskStatus } from "entities/family-task";
import { RenderCategoryIcon } from "entities/category";
import { ScrollArea } from "@components/shadowCDN/scroll-area";
import { Button } from "@components/shadowCDN/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/shadowCDN/dropdown-menu";
import { translateCategoryTitle } from "shared/utils/categoryTranslation";
import { cn } from "@utils";
import { EditTaskDialog } from "./EditTaskDialog";
import { TaskCalendar } from "./TaskCalendar";
import { EventList } from "./EventList";

interface FamilyTaskListProps {
  familyId: string;
}

const STATUS_CONFIG: Record<
  FamilyTaskStatus,
  { label: string; color: string; bg: string }
> = {
  initial: { label: "Common.initial", color: "#B4407F", bg: "#F3E0EC" },
  in_progress: { label: "Common.inProgress", color: "#269ACF", bg: "#DDF0FA" },
  completed: { label: "Common.completed", color: "#EFB825", bg: "#FFF7DF" },
};

const CATEGORY_COLORS: Record<string, string> = {
  medical: "#FF6B6B",
  emotional: "#FFB347",
  home: "#77DD77",
  legal: "#6B9BFF",
  general: "#A3ABC3",
  childcare: "#F9C5D1",
};

const getCategoryColor = (key?: string | null) => {
  if (!key) return "#A3ABC3";
  return CATEGORY_COLORS[key] ?? "#A3ABC3";
};

const getCategoryIconKey = (
  categoryIcon?: string | null,
  categorySlug?: string | null,
  category?: string | null
) => {
  if (categoryIcon) return categoryIcon;
  if (categorySlug) return categorySlug;
  if (category) return category;
  return "general";
};

export const FamilyTaskList: React.FC<FamilyTaskListProps> = ({
  familyId,
}) => {
  const t = useTranslations();
  const [tasks, setTasks] = useState<FamilyTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [datesWithEvents, setDatesWithEvents] = useState<string[]>([]);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const [apiTasks, events] = await Promise.all([
        getFamilyTasks(familyId),
        getFamilyEvents(familyId),
      ]);
      setTasks(convertFamilyTasks(apiTasks));
      const dates = [
        ...new Set(
          events
            .filter((e) => e.status !== "completed" && e.date)
            .map((e) => e.date as string)
        ),
      ];
      setDatesWithEvents(dates);
    } catch {
      setTasks([]);
      setDatesWithEvents([]);
    } finally {
      setLoading(false);
    }
  }, [familyId]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const noTimeTasks = useMemo(
    () => tasks.filter((task) => task.type === "no_time"),
    [tasks]
  );

  const availableTasks = useMemo(
    () =>
      noTimeTasks.filter(
        (task) => task.status === "initial" && !task.assignee
      ),
    [noTimeTasks]
  );
  const assignedTasks = useMemo(
    () =>
      noTimeTasks.filter(
        (task) => task.status === "in_progress" || !!task.assignee
      ),
    [noTimeTasks]
  );
  const doneTasks = useMemo(
    () => noTimeTasks.filter((task) => task.status === "completed"),
    [noTimeTasks]
  );

  const categories = useMemo(() => {
    const map = new Map<string, string>();
    map.set("all", t("FamilyTasks.allCategories"));
    noTimeTasks.forEach((task) => {
      if (task.categorySlug) {
        map.set(
          task.categorySlug,
          translateCategoryTitle(
            t,
            task.categorySlug,
            task.categoryName || task.categorySlug
          )
        );
      }
    });
    return map;
  }, [noTimeTasks, t]);

  const filteredAvailable = useMemo(() => {
    if (activeCategory === "all") return availableTasks;
    return availableTasks.filter((task) => task.categorySlug === activeCategory);
  }, [availableTasks, activeCategory]);
  const filteredAssigned = useMemo(() => {
    if (activeCategory === "all") return assignedTasks;
    return assignedTasks.filter((task) => task.categorySlug === activeCategory);
  }, [assignedTasks, activeCategory]);
  const filteredDone = useMemo(() => {
    if (activeCategory === "all") return doneTasks;
    return doneTasks.filter((task) => task.categorySlug === activeCategory);
  }, [doneTasks, activeCategory]);

  const handleMarkDone = async (task: FamilyTask) => {
    await markFamilyTaskDone(familyId, task.id);
    fetchTasks();
  };

  const handleRestore = async (task: FamilyTask) => {
    await restoreFamilyTask(familyId, task.id, !!task.assignee);
    fetchTasks();
  };

  const handleDelete = async (task: FamilyTask) => {
    await deleteFamilyTask(familyId, task.id);
    fetchTasks();
  };

  const [editingTask, setEditingTask] = useState<FamilyTask | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handleEdit = (task: FamilyTask) => {
    setEditingTask(task);
    setEditDialogOpen(true);
  };

  const handleEditUpdated = () => {
    fetchTasks();
    setEditDialogOpen(false);
    setEditingTask(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="loader" />
      </div>
    );
  }

  const hasAnyTasks = tasks.length > 0;

  return (
    <div className="flex flex-col gap-4">
      <TaskCalendar
        date={selectedDate}
        onDateChange={setSelectedDate}
        datesWithEvents={datesWithEvents}
      />
      <EventList
        familyId={familyId}
        selectedDate={selectedDate}
        onRefresh={fetchTasks}
        onEditTask={handleEdit}
      />

      {categories.size > 2 && hasAnyTasks && (
        <div className="flex gap-2 flex-wrap justify-start">
          {Array.from(categories.entries()).map(([slug, name]) => {
            const isActive = activeCategory === slug;

            return (
              <Button
                key={slug}
                type="button"
                variant="secondary"
                size="sm"
                rounded="circle"
                withIcon
                onClick={() => setActiveCategory(slug)}
                className={cn(
                  "text-xs font-semibold gap-2 border flex rtl:flex-row-reverse",
                  "bg-white",
                  isActive
                    ? "border-[#65458E] text-[#313A56] shadow-sm"
                    : "border-[#DCE5FF] text-[#313A56]"
                )}
              >
                <RenderCategoryIcon
                  icon={slug === "all" ? "general" : slug}
                />
                <span>{name}</span>
              </Button>
            );
          })}
        </div>
      )}

      {!hasAnyTasks && (
        <div className="flex flex-col items-center justify-center py-12 gap-2">
          <EmptyIcon />
          <p className="text-sm text-[#A3ABC3]">{t("FamilyTasks.noTasks")}</p>
        </div>
      )}

      {hasAnyTasks && (
        <ScrollArea className="h-[55vh] w-full">
          <div className="flex flex-col gap-4">
            {filteredAvailable.length > 0 && (
              <div className="flex flex-col gap-2">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-[#A3ABC3]">
                  {t("Common.initial")}
                </h3>
                <div className="flex flex-col gap-3">
                  {filteredAvailable.map((task) => (
                    <TaskRow
                      key={task.id}
                      task={task}
                      onMarkDone={handleMarkDone}
                      onRestore={handleRestore}
                      onDelete={handleDelete}
                      onEdit={handleEdit}
                      t={t}
                    />
                  ))}
                </div>
              </div>
            )}
            {filteredAssigned.length > 0 && (
              <div className="flex flex-col gap-2">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-[#A3ABC3]">
                  {t("Common.inProgress")}
                </h3>
                <div className="flex flex-col gap-3">
                  {filteredAssigned.map((task) => (
                    <TaskRow
                      key={task.id}
                      task={task}
                      onMarkDone={handleMarkDone}
                      onRestore={handleRestore}
                      onDelete={handleDelete}
                      onEdit={handleEdit}
                      t={t}
                    />
                  ))}
                </div>
              </div>
            )}
            {filteredDone.length > 0 && (
              <div className="flex flex-col gap-2">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-[#A3ABC3]">
                  {t("Common.completed")}
                </h3>
                <div className="flex flex-col gap-3">
                  {filteredDone.map((task) => (
                    <TaskRow
                      key={task.id}
                      task={task}
                      onMarkDone={handleMarkDone}
                      onRestore={handleRestore}
                      onDelete={handleDelete}
                      onEdit={handleEdit}
                      t={t}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      )}
      <EditTaskDialog
        familyId={familyId}
        task={editingTask}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onUpdated={handleEditUpdated}
      />
    </div>
  );
};

interface TaskRowProps {
  task: FamilyTask;
  onMarkDone: (task: FamilyTask) => void;
  onRestore: (task: FamilyTask) => void;
  onDelete: (task: FamilyTask) => void;
  onEdit: (task: FamilyTask) => void;
  t: ReturnType<typeof useTranslations>;
}

const TaskRow: React.FC<TaskRowProps> = ({
  task,
  onMarkDone,
  onRestore,
  onDelete,
  onEdit,
  t,
}) => {
  const locale = useLocale();
  const isRtl = locale === "he";
  const statusConfig = STATUS_CONFIG[task.status];
  const isCompleted = task.status === "completed";
  const categoryKey = task.categorySlug ?? task.category ?? undefined;
  const categoryColor = getCategoryColor(categoryKey);
  const categoryLabel = categoryKey
    ? translateCategoryTitle(t, categoryKey, task.categoryName || categoryKey)
    : "";

  return (
    <div
      className="flex items-center gap-4 rounded-xl px-4 py-3 transition-all rtl:flex-row-reverse"
      style={{
        background: isCompleted ? "#f0f0f0" : "#fff",
        border: `1px solid ${isCompleted ? "#e0e0e0" : "#DCE5FF"}`,
      }}
    >
      <div className="flex items-center justify-center shrink-0 w-8 rtl:order-2">
        <RenderCategoryIcon
          icon={getCategoryIconKey(
            task.categoryIcon,
            task.categorySlug,
            task.category
          )}
        />
      </div>

      <div
        className="flex-1 min-w-0 rtl:order-1"
        style={
          isRtl
            ? {
                textAlign: "right",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }
            : undefined
        }
      >
        <div className="flex items-center gap-2 mb-1">
          {categoryLabel && (
            <span
              className="text-[11px] font-medium uppercase tracking-wide"
              style={{ color: categoryColor }}
            >
              {categoryLabel}
            </span>
          )}
        </div>

        <p
          className="text-sm font-semibold leading-snug"
          style={{
            color: isCompleted ? "#A3ABC3" : "#313A56",
            textDecoration: isCompleted ? "line-through" : "none",
            ...(isRtl && { width: "100%", textAlign: "right" }),
          }}
        >
          {task.title}
        </p>

        {task.description && (
          <p
            className="text-xs mt-0.5 line-clamp-1"
            style={{
              color: "#A3ABC3",
              ...(isRtl && { width: "100%", textAlign: "right" }),
            }}
          >
            {task.description}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2 shrink-0 rtl:flex-row-reverse rtl:order-3">
        <span
          className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold"
          style={{ background: statusConfig.bg, color: statusConfig.color }}
        >
          {t(statusConfig.label)}
        </span>

        {task.circle && !isCompleted && (
          <span
            className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold"
            style={{ background: "#DDF0FA", color: "#269ACF" }}
          >
            {t(`Common.${task.circle}`)}
          </span>
        )}

        {task.assignee && (
          <span
            className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold"
            style={{ background: "#F7DACB", color: "#8B5E3C" }}
          >
            {task.assignee.fullName}
          </span>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 h-8 w-8 rounded-lg"
              style={{ color: "#A3ABC3" }}
            >
              <MoreIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="rounded-xl">
            {!isCompleted && (
              <DropdownMenuItem
                onClick={() => onEdit(task)}
                className="text-sm flex items-center gap-2 rtl:flex-row-reverse"
              >
                <EditIcon />
                {t("Common.edit")}
              </DropdownMenuItem>
            )}
            {!isCompleted && (
              <DropdownMenuItem
                onClick={() => onMarkDone(task)}
                className="text-sm flex items-center gap-2 rtl:flex-row-reverse"
              >
                <CheckIcon />
                {t("FamilyTasks.markAsDone")}
              </DropdownMenuItem>
            )}
            {isCompleted && (
              <DropdownMenuItem
                onClick={() => onRestore(task)}
                className="text-sm flex items-center gap-2 rtl:flex-row-reverse"
              >
                <RestoreIcon />
                {t("FamilyTasks.restore")}
              </DropdownMenuItem>
            )}
            <DropdownMenuItem
              onClick={() => onDelete(task)}
              className="text-sm text-red-500 focus:text-red-500 flex items-center gap-2 rtl:flex-row-reverse"
            >
              <TrashIcon />
              {t("Common.delete")}
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

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="me-2 shrink-0">
    <path d="M2.5 7.5L5.5 10.5L11.5 3.5" stroke="#269ACF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const RestoreIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="me-2 shrink-0">
    <path d="M2 7a5 5 0 019.33-2.5M12 7a5 5 0 01-9.33 2.5" stroke="#269ACF" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M11.5 2v3h-3" stroke="#269ACF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="me-2 shrink-0">
    <path d="M3 4h8M5.5 4V3a1 1 0 011-1h1a1 1 0 011 1v1M6 6.5v3M8 6.5v3M4 4l.5 7a1 1 0 001 1h3a1 1 0 001-1L10 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const EditIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="me-2 shrink-0">
    <path d="M8 2l4 4-7 7H1v-4l7-7z" stroke="#269ACF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const EmptyIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <rect x="8" y="10" width="32" height="28" rx="4" stroke="#DCE5FF" strokeWidth="2" />
    <path d="M16 20h16M16 26h10" stroke="#DCE5FF" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
