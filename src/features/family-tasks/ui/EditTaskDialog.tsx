"use client";

import React, { useState, useTransition, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@components/shadowCDN/dialog";
import { Button } from "@components/shadowCDN/button";
import { Input } from "@components/shadowCDN/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/shadowCDN/select";
import { Checkbox } from "@components/shadowCDN/checkbox";
import { updateFamilyTask } from "entities/family-task";
import type { UpdateFamilyTaskDto } from "entities/family-task";
import type { FamilyTask } from "entities/family-task";
import { translateCategoryTitle } from "shared/utils/categoryTranslation";
import {
  EmotionalIcon,
  FinanceIcon,
  HomeIcon,
  MedicalIcon,
  MessageIcon,
  ParentingIcon,
} from "shared/assets/categoryIcon";

const CIRCLES = ["intimate", "private", "public"] as const;

const CATEGORIES = [
  { slug: "medical", label: "Medical" },
  { slug: "emotional", label: "Emotional" },
  { slug: "home", label: "Home" },
  { slug: "legal", label: "Legal" },
  { slug: "general", label: "General" },
  { slug: "childcare", label: "Childcare" },
];

const renderCategoryIcon = (slug: string) => {
  switch (slug) {
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

interface EditTaskDialogProps {
  familyId: string;
  task: FamilyTask | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdated: () => void;
}

export const EditTaskDialog: React.FC<EditTaskDialogProps> = ({
  familyId,
  task,
  open,
  onOpenChange,
  onUpdated,
}) => {
  const t = useTranslations();
  const locale = useLocale();
  const isRtl = locale === "he";
  const [isPending, startTransition] = useTransition();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [circle, setCircle] = useState<UpdateFamilyTaskDto["circle"]>("intimate");
  const [category, setCategory] = useState("");
  const [taskType, setTaskType] = useState<UpdateFamilyTaskDto["type"]>("no_time");
  const [repeated, setRepeated] = useState(false);
  const [schedule, setSchedule] = useState("");
  const [dateTime, setDateTime] = useState("");

  const toDateTimeLocal = (iso: string | null | undefined): string => {
    if (!iso) return "";
    try {
      const d = new Date(iso);
      if (Number.isNaN(d.getTime())) return "";
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      const h = String(d.getHours()).padStart(2, "0");
      const min = String(d.getMinutes()).padStart(2, "0");
      return `${y}-${m}-${day}T${h}:${min}`;
    } catch {
      return "";
    }
  };

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description ?? "");
      setCircle((task.circle as UpdateFamilyTaskDto["circle"]) ?? "intimate");
      setCategory(task.categorySlug ?? task.category ?? "");
      setTaskType(task.type ?? "no_time");
      setRepeated(task.repeated ?? false);
      setSchedule(task.schedule ?? "");
      setDateTime(toDateTimeLocal(task.startAt ?? task.endAt ?? null));
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!task || !title.trim()) return;

    startTransition(async () => {
      const hasDateTime = !!dateTime.trim();
      const backendType: UpdateFamilyTaskDto["type"] =
        taskType === "no_time" ? "no_time" : "until_time";

      const dto: UpdateFamilyTaskDto = {
        title: title.trim(),
        circle,
        ...(description.trim() ? { description: description.trim() } : { description: "" }),
        ...(category ? { category, category_slug: category } : {}),
        type: backendType,
        repeated,
        status: task.status,
      };

      if (repeated) {
        const cron = schedule.trim();
        if (cron) {
          dto.schedule = cron;
        }
      } else {
        dto.schedule = null;
      }

      if (backendType === "no_time" || !hasDateTime) {
        dto.start_at = null;
        dto.end_at = null;
      } else {
        const iso = new Date(dateTime.trim()).toISOString();
        dto.end_at = iso;
      }

      await updateFamilyTask(familyId, task.id, dto);
      onOpenChange(false);
      onUpdated();
    });
  };

  if (!task) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[440px] rounded-2xl border-[#DCE5FF]">
        <DialogHeader>
          <DialogTitle
            className="text-lg font-bold"
            style={{ color: "#313A56" }}
          >
            {t("FamilyTasks.editTask")}
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 mt-2"
          dir={isRtl ? "rtl" : undefined}
        >
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold" style={{ color: "#313A56" }}>
              {t("FamilyTasks.taskTitle")} *
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t("FamilyTasks.taskTitlePlaceholder")}
              required
              className="rounded-lg border-[#DCE5FF] bg-[#F5F8FF] placeholder:text-[#A3ABC3] focus-visible:ring-[#269ACF]"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold" style={{ color: "#313A56" }}>
              {t("FamilyTasks.taskDescription")}
            </label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t("FamilyTasks.taskDescriptionPlaceholder")}
              className="rounded-lg border-[#DCE5FF] bg-[#F5F8FF] placeholder:text-[#A3ABC3] focus-visible:ring-[#269ACF]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold" style={{ color: "#313A56" }}>
                {t("FamilyTasks.taskCircle")}
              </label>
              <Select
                value={circle}
                onValueChange={(v) =>
                  setCircle(v as UpdateFamilyTaskDto["circle"])
                }
              >
                <SelectTrigger className="rounded-lg border-[#DCE5FF] bg-[#F5F8FF] rtl:flex-row-reverse rtl:text-right">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl" dir={isRtl ? "rtl" : undefined}>
                  {CIRCLES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {t(`Common.${c}`)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold" style={{ color: "#313A56" }}>
                {t("FamilyTasks.taskCategory")}
              </label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="rounded-lg border-[#DCE5FF] bg-[#F5F8FF] rtl:flex-row-reverse rtl:text-right">
                  <SelectValue placeholder={t("FamilyTasks.allCategories")} />
                </SelectTrigger>
                <SelectContent className="rounded-xl" dir={isRtl ? "rtl" : undefined}>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat.slug} value={cat.slug}>
                      <span className="flex items-center gap-2">
                        {renderCategoryIcon(cat.slug)}
                        <span>{translateCategoryTitle(t, cat.slug, cat.label)}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold" style={{ color: "#313A56" }}>
              {t("FamilyTasks.taskType")}
            </label>
            <Select
              value={taskType}
              onValueChange={(v) => setTaskType(v as UpdateFamilyTaskDto["type"])}
            >
              <SelectTrigger className="rounded-lg border-[#DCE5FF] bg-[#F5F8FF] rtl:flex-row-reverse rtl:text-right">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl" dir={isRtl ? "rtl" : undefined}>
                <SelectItem value="no_time">{t("FamilyTasks.taskTypeNoTime")}</SelectItem>
                <SelectItem value="exact_time">{t("FamilyTasks.taskTypeExactTime")}</SelectItem>
                <SelectItem value="until_time">{t("FamilyTasks.taskTypeUntilTime")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {(taskType === "exact_time" || taskType === "until_time") && (
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold" style={{ color: "#313A56" }}>
                {t("FamilyTasks.dateTime")}
              </label>
              <input
                type="datetime-local"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
                className="rounded-lg border border-[#DCE5FF] bg-[#F5F8FF] px-3 py-2 text-sm text-[#313A56] focus:outline-none focus:ring-2 focus:ring-[#269ACF]"
              />
            </div>
          )}

          <div className="flex items-center gap-2">
            <Checkbox
              id="edit-task-repeated"
              checked={repeated}
              onCheckedChange={(v) => setRepeated(v === true)}
              className="rounded border-[#DCE5FF]"
            />
            <label
              htmlFor="edit-task-repeated"
              className="text-xs font-semibold cursor-pointer"
              style={{ color: "#313A56" }}
            >
              {t("FamilyTasks.repeated")}
            </label>
          </div>

          {repeated && (
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold" style={{ color: "#313A56" }}>
                {t("FamilyTasks.schedule")}
              </label>
              <Input
                value={schedule}
                onChange={(e) => setSchedule(e.target.value)}
                placeholder={t("FamilyTasks.schedulePlaceholder")}
                className="rounded-lg border-[#DCE5FF] bg-[#F5F8FF] placeholder:text-[#A3ABC3] focus-visible:ring-[#269ACF] font-mono text-sm"
              />
            </div>
          )}

          <DialogFooter className="mt-2 flex gap-2 flex-wrap rtl:flex-row-reverse">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="rounded-full"
            >
              {t("Common.cancel")}
            </Button>
            <Button
              type="submit"
              disabled={!title.trim() || isPending}
              rounded="circle"
              className="font-semibold px-6"
            >
              {isPending ? t("FamilyTasks.creating") : t("Common.save")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
