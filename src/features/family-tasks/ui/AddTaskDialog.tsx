"use client";

import React, { useState, useTransition } from "react";
import { useTranslations, useLocale } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
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
import { createFamilyTask } from "entities/family-task";
import type { CreateFamilyTaskDto } from "entities/family-task";
import { translateCategoryTitle } from "shared/utils/categoryTranslation";
import {
  EmotionalIcon,
  FinanceIcon,
  HomeIcon,
  MedicalIcon,
  MessageIcon,
  ParentingIcon,
} from "shared/assets/categoryIcon";

interface AddTaskDialogProps {
  familyId: string;
  onCreated: () => void;
}

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

export const AddTaskDialog: React.FC<AddTaskDialogProps> = ({
  familyId,
  onCreated,
}) => {
  const t = useTranslations();
  const locale = useLocale();
  const isRtl = locale === "he";
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [circle, setCircle] = useState<CreateFamilyTaskDto["circle"]>("intimate");
  const [category, setCategory] = useState("");

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCircle("intimate");
    setCategory("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    startTransition(async () => {
      const dto: CreateFamilyTaskDto = {
        title: title.trim(),
        circle,
        ...(description.trim() && { description: description.trim() }),
        ...(category && { category, category_slug: category }),
      };

      await createFamilyTask(familyId, dto);
      resetForm();
      setOpen(false);
      onCreated();
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          rounded="circle"
          withIcon
          className="font-semibold px-4 flex gap-2 rtl:flex-row-reverse"
        >
          <PlusIcon />
          {t("FamilyTasks.addTask")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[440px] rounded-2xl border-[#DCE5FF]">
        <DialogHeader>
          <DialogTitle
            className="text-lg font-bold"
            style={{ color: "#313A56" }}
          >
            {t("FamilyTasks.addTask")}
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
                  setCircle(v as CreateFamilyTaskDto["circle"])
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

          <DialogFooter className="mt-2 flex gap-2 flex-wrap rtl:flex-row-reverse">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
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
              {isPending ? t("FamilyTasks.creating") : t("FamilyTasks.addTask")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path
      d="M7 1v12M1 7h12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);
