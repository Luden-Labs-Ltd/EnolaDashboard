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
import { cn } from "@utils";

interface FamilyTaskListProps {
  familyId: string;
}

const STATUS_CONFIG: Record<
  FamilyTaskStatus,
  { label: string; bg: string; text: string }
> = {
  initial: {
    label: "Common.initial",
    bg: "bg-purple-100",
    text: "text-purple-700",
  },
  in_progress: {
    label: "Common.inProgress",
    bg: "bg-blue-100",
    text: "text-blue-700",
  },
  completed: {
    label: "Common.completed",
    bg: "bg-yellow-100",
    text: "text-yellow-700",
  },
};

const CATEGORY_COLORS: Record<string, string> = {
  medical: "#FF6B6B",
  emotional: "#FFB347",
  home: "#77DD77",
  legal: "#6B9BFF",
  general: "#C39BD3",
  childcare: "#F9C5D1",
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
        map.set(
          task.categorySlug,
          task.categoryName || task.categorySlug
        );
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
      <div className="flex items-center justify-center py-12">
        <div className="loader" />
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="flex items-center justify-center py-12 text-muted-foreground text-sm">
        {t("FamilyTasks.noTasks")}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {categories.size > 2 && (
        <div className="flex gap-2 flex-wrap">
          {Array.from(categories.entries()).map(([slug, name]) => (
            <button
              key={slug}
              onClick={() => setActiveCategory(slug)}
              className={cn(
                "px-3 py-1 rounded-full text-xs font-medium transition-colors border",
                activeCategory === slug
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-muted-foreground border-border hover:bg-muted"
              )}
            >
              {name}
            </button>
          ))}
        </div>
      )}

      <ScrollArea className="max-h-[50vh]">
        <div className="flex flex-col gap-2">
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
  const categoryColor =
    CATEGORY_COLORS[task.categorySlug ?? ""] ?? "#C39BD3";

  return (
    <div
      className={cn(
        "flex items-start gap-3 p-3 rounded-lg border transition-colors",
        isCompleted
          ? "bg-muted/50 border-border/50"
          : "bg-background border-border hover:bg-muted/30"
      )}
    >
      <div
        className="w-1 self-stretch rounded-full shrink-0"
        style={{ backgroundColor: isCompleted ? "#d1d5db" : categoryColor }}
      />

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          {task.categoryName && (
            <span className="text-xs text-muted-foreground">
              {task.categoryName}
            </span>
          )}
          <span
            className={cn(
              "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium",
              statusConfig.bg,
              statusConfig.text
            )}
          >
            {t(statusConfig.label)}
          </span>
          {task.assignee && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-50 text-blue-600">
              {task.assignee.fullName}
            </span>
          )}
          {task.circle && !task.assignee && !isCompleted && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-orange-50 text-orange-600">
              {t(`Common.${task.circle}`)}
            </span>
          )}
        </div>

        <p
          className={cn(
            "text-sm font-medium mt-1",
            isCompleted && "line-through text-muted-foreground"
          )}
        >
          {task.title}
        </p>

        {task.description && (
          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
            {task.description}
          </p>
        )}
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="shrink-0 h-8 w-8">
            <MoreIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {!isCompleted && (
            <DropdownMenuItem onClick={() => onMarkDone(task)}>
              {t("FamilyTasks.markAsDone")}
            </DropdownMenuItem>
          )}
          {isCompleted && (
            <DropdownMenuItem onClick={() => onRestore(task)}>
              {t("FamilyTasks.restore")}
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            className="text-destructive focus:text-destructive"
            onClick={() => onDelete(task)}
          >
            {t("Common.delete")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const MoreIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="8" cy="3" r="1.5" fill="currentColor" />
    <circle cx="8" cy="8" r="1.5" fill="currentColor" />
    <circle cx="8" cy="13" r="1.5" fill="currentColor" />
  </svg>
);
