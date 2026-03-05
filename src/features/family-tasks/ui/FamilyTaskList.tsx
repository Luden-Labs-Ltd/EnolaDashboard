"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import {
  getFamilyTasks,
  markFamilyTaskDone,
  restoreFamilyTask,
  deleteFamilyTask,
  convertFamilyTasks,
} from "entities/family-task";
import type { FamilyTask, FamilyTaskStatus } from "entities/family-task";
import { ScrollArea } from "@components/shadowCDN/scroll-area";
import { Button } from "@components/shadowCDN/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/shadowCDN/dropdown-menu";
import {
  EmotionalIcon,
  FinanceIcon,
  HomeIcon,
  MedicalIcon,
  MessageIcon,
  ParentingIcon,
} from "shared/assets/categoryIcon";
import { cn } from "@utils";

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

const CategoryIcon: React.FC<{
  categoryKey?: string | null;
}> = ({ categoryKey }) => {
  switch (categoryKey) {
    case "medical":
      return <MedicalIcon />;
    case "home":
      return <HomeIcon />;
    case "general":
      return <MessageIcon />;
    case "legal":
      return <FinanceIcon />;
    case "emotional":
      return <EmotionalIcon />;
    case "childcare":
      return <ParentingIcon />;
    default:
      return <MessageIcon />;
  }
};

export const FamilyTaskList: React.FC<FamilyTaskListProps> = ({
  familyId,
}) => {
  const t = useTranslations();
  const [tasks, setTasks] = useState<FamilyTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const apiTasks = await getFamilyTasks(familyId);
      setTasks(convertFamilyTasks(apiTasks));
    } catch {
      setTasks([]);
    } finally {
      setLoading(false);
    }
  }, [familyId]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const categories = useMemo(() => {
    const map = new Map<string, string>();
    map.set("all", t("FamilyTasks.allCategories"));
    tasks.forEach((task) => {
      if (task.categorySlug) {
        map.set(task.categorySlug, task.categoryName || task.categorySlug);
      }
    });
    return map;
  }, [tasks, t]);

  const filteredTasks = useMemo(() => {
    if (activeCategory === "all") return tasks;
    return tasks.filter((task) => task.categorySlug === activeCategory);
  }, [tasks, activeCategory]);

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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="loader" />
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-2">
        <EmptyIcon />
        <p className="text-[#A3ABC3] text-sm">{t("FamilyTasks.noTasks")}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {categories.size > 2 && (
        <div className="flex gap-2 flex-wrap">
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
                  "text-xs font-semibold gap-2 border",
                  "bg-white",
                  isActive
                    ? "border-[#65458E] text-[#313A56] shadow-sm"
                    : "border-[#DCE5FF] text-[#313A56]"
                )}
              >
                <CategoryIcon categoryKey={slug === "all" ? undefined : slug} />
                <span>{name}</span>
              </Button>
            );
          })}
        </div>
      )}

      <ScrollArea className="max-h-[55vh]">
        <div className="flex flex-col gap-3">
          {filteredTasks.map((task) => (
            <TaskRow
              key={task.id}
              task={task}
              onMarkDone={handleMarkDone}
              onRestore={handleRestore}
              onDelete={handleDelete}
              t={t}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

interface TaskRowProps {
  task: FamilyTask;
  onMarkDone: (task: FamilyTask) => void;
  onRestore: (task: FamilyTask) => void;
  onDelete: (task: FamilyTask) => void;
  t: ReturnType<typeof useTranslations>;
}

const TaskRow: React.FC<TaskRowProps> = ({
  task,
  onMarkDone,
  onRestore,
  onDelete,
  t,
}) => {
  const statusConfig = STATUS_CONFIG[task.status];
  const isCompleted = task.status === "completed";
  const categoryKey = task.categorySlug ?? task.category ?? undefined;
  const categoryColor = getCategoryColor(categoryKey);
  const categoryLabel =
    task.categoryName ||
    (categoryKey ? t(`Resources.Categories.${categoryKey}`) : "");

  return (
    <div
      className="flex items-center gap-4 rounded-xl px-4 py-3 transition-all"
      style={{
        background: isCompleted ? "#f0f0f0" : "#fff",
        border: `1px solid ${isCompleted ? "#e0e0e0" : "#DCE5FF"}`,
      }}
    >
      <div className="flex items-center justify-center shrink-0 w-8">
        <CategoryIcon categoryKey={categoryKey} />
      </div>

      <div className="flex-1 min-w-0">
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
          }}
        >
          {task.title}
        </p>

        {task.description && (
          <p
            className="text-xs mt-0.5 line-clamp-1"
            style={{ color: "#A3ABC3" }}
          >
            {task.description}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2 shrink-0">
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
                onClick={() => onMarkDone(task)}
                className="text-sm"
              >
                <CheckIcon />
                {t("FamilyTasks.markAsDone")}
              </DropdownMenuItem>
            )}
            {isCompleted && (
              <DropdownMenuItem
                onClick={() => onRestore(task)}
                className="text-sm"
              >
                <RestoreIcon />
                {t("FamilyTasks.restore")}
              </DropdownMenuItem>
            )}
            <DropdownMenuItem
              onClick={() => onDelete(task)}
              className="text-sm text-red-500 focus:text-red-500"
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
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mr-2 shrink-0">
    <path d="M2.5 7.5L5.5 10.5L11.5 3.5" stroke="#269ACF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const RestoreIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mr-2 shrink-0">
    <path d="M2 7a5 5 0 019.33-2.5M12 7a5 5 0 01-9.33 2.5" stroke="#269ACF" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M11.5 2v3h-3" stroke="#269ACF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mr-2 shrink-0">
    <path d="M3 4h8M5.5 4V3a1 1 0 011-1h1a1 1 0 011 1v1M6 6.5v3M8 6.5v3M4 4l.5 7a1 1 0 001 1h3a1 1 0 001-1L10 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const EmptyIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <rect x="8" y="10" width="32" height="28" rx="4" stroke="#DCE5FF" strokeWidth="2" />
    <path d="M16 20h16M16 26h10" stroke="#DCE5FF" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
