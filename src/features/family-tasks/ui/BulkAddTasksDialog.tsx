"use client";

import React, { useState, useTransition, useEffect } from "react";
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
import { Checkbox } from "@components/shadowCDN/checkbox";
import {
  getFamilyTaskTemplates,
  createFamilyTasksBulk,
  type CategoryWithTaskTemplates,
  type BulkTaskItem,
} from "entities/family-task";
import { translateCategoryTitle } from "shared/utils/categoryTranslation";
import {
  EmotionalIcon,
  FinanceIcon,
  HomeIcon,
  MedicalIcon,
  MessageIcon,
  ParentingIcon,
} from "shared/assets/categoryIcon";
import { cn } from "@utils";

interface MultiAddTasksDialogProps {
  familyId: string;
  onCreated: () => void;
}

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

const ChevronIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const DEFAULT_TASK_TEMPLATES: CategoryWithTaskTemplates[] = [
  { id: "medical", title: "Medical", tasks: ["Scheduling a medical appointment", "Medical documentation", "Medication management"] },
  { id: "emotional", title: "Emotional", tasks: ["Emotional support", "Counselling"] },
  { id: "home", title: "Home", tasks: ["Household chores", "Home repairs"] },
  { id: "legal", title: "Legal", tasks: ["Legal paperwork", "Legal consultation"] },
  { id: "general", title: "General", tasks: ["General errands", "Coordination"] },
  { id: "childcare", title: "Childcare", tasks: ["School runs", "Childcare arrangements"] },
];

export const MultiAddTasksDialog: React.FC<MultiAddTasksDialogProps> = ({
  familyId,
  onCreated,
}) => {
  const t = useTranslations();
  const locale = useLocale();
  const isRtl = locale === "he";
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [templates, setTemplates] = useState<CategoryWithTaskTemplates[]>([]);
  const [loadingTemplates, setLoadingTemplates] = useState(false);
  const [selected, setSelected] = useState<BulkTaskItem[]>([]);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  useEffect(() => {
    if (!open || !familyId) return;
    setLoadingTemplates(true);
    setSelected([]);
    getFamilyTaskTemplates(familyId)
      .then((data) => {
        const useApi = Array.isArray(data) && data.length > 0;
        const templatesToSet = useApi ? data : DEFAULT_TASK_TEMPLATES;
        setTemplates(templatesToSet);
      })
      .finally(() => setLoadingTemplates(false));
  }, [open, familyId]);

  const toggleTask = (title: string, categoryId: string, categoryTitle: string) => {
    const item: BulkTaskItem = {
      title,
      category_slug: categoryId,
      category_name: categoryTitle,
    };
    setSelected((prev) => {
      const exists = prev.some(
        (s) => s.title === title && s.category_slug === categoryId
      );
      if (exists) {
        return prev.filter((s) => !(s.title === title && s.category_slug === categoryId));
      }
      return [...prev, item];
    });
  };

  const isSelected = (title: string, categoryId: string) =>
    selected.some(
      (s) => s.title === title && s.category_slug === categoryId
    );

  const selectCategory = (cat: CategoryWithTaskTemplates, categoryTitle: string) => {
    const toAdd = cat.tasks
      .filter((title) => !isSelected(title, cat.id))
      .map((title) => ({ title, category_slug: cat.id, category_name: categoryTitle }));
    if (toAdd.length > 0) setSelected((prev) => [...prev, ...toAdd]);
  };

  const deselectCategory = (cat: CategoryWithTaskTemplates) => {
    const titles = new Set(cat.tasks);
    setSelected((prev) => prev.filter((s) => !(s.category_slug === cat.id && titles.has(s.title))));
  };

  const categoryAllSelected = (cat: CategoryWithTaskTemplates) =>
    cat.tasks.length > 0 && cat.tasks.every((title) => isSelected(title, cat.id));
  const categorySomeSelected = (cat: CategoryWithTaskTemplates) =>
    cat.tasks.some((title) => isSelected(title, cat.id));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selected.length === 0) return;
    startTransition(async () => {
      await createFamilyTasksBulk(familyId, selected);
      setSelected([]);
      setOpen(false);
      onCreated();
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          rounded="circle"
          className="font-semibold px-4 flex gap-2 rtl:flex-row-reverse"
        >
          {t("FamilyTasks.addMultiTasks")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[440px] max-h-[85vh] rounded-2xl border-[#DCE5FF] flex flex-col">
        <DialogHeader>
          <DialogTitle
            className="text-lg font-bold"
            style={{ color: "#313A56" }}
          >
            {t("FamilyTasks.multiAddTasksTitle")}
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 mt-2 flex-1 min-h-0"
          dir={isRtl ? "rtl" : undefined}
        >
          {loadingTemplates ? (
            <p className="text-sm text-[#A3ABC3]">{t("FamilyTasks.loadingTemplates")}</p>
          ) : (
            <>
            <div className="flex-1 overflow-y-auto pr-1 space-y-1">
              {templates.map((cat) => {
                const categoryTitle = translateCategoryTitle(
                  t,
                  cat.id,
                  cat.title
                );
                const isOpen = openAccordion === cat.id;
                return (
                  <div key={cat.id} className="rounded-lg border border-[#DCE5FF] overflow-hidden">
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => setOpenAccordion((prev) => (prev === cat.id ? null : cat.id))}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setOpenAccordion((prev) => (prev === cat.id ? null : cat.id));
                        }
                      }}
                      className={cn(
                        "flex items-center gap-2 w-full text-sm font-semibold px-3 py-2.5 text-left rtl:text-right",
                        "hover:bg-[#F5F8FF] transition-colors cursor-pointer"
                      )}
                      style={{ color: "#313A56" }}
                    >
                      {renderCategoryIcon(cat.id)}
                      <span className="flex-1">{categoryTitle}</span>
                      <div onClick={(e) => e.stopPropagation()}>
                        <Checkbox
                          checked={categoryAllSelected(cat) ? true : categorySomeSelected(cat) ? "indeterminate" : false}
                          onCheckedChange={() => {
                            if (categoryAllSelected(cat)) deselectCategory(cat);
                            else selectCategory(cat, categoryTitle);
                          }}
                          aria-label={categoryTitle}
                        />
                      </div>
                      <ChevronIcon className={cn("shrink-0 w-4 h-4 transition-transform", isOpen && "rotate-180")} />
                    </div>
                    {isOpen && (
                      <ul className="space-y-1.5 pl-6 pr-3 pt-3 pb-3 border-t border-[#DCE5FF] bg-[#FAFCFF]">
                        {cat.tasks.map((taskTitle) => (
                          <li key={`${cat.id}-${taskTitle}`} className="flex items-center gap-2">
                            <Checkbox
                              id={`${cat.id}-${taskTitle}`}
                              checked={isSelected(taskTitle, cat.id)}
                              onCheckedChange={() =>
                                toggleTask(taskTitle, cat.id, categoryTitle)
                              }
                            />
                            <label
                              htmlFor={`${cat.id}-${taskTitle}`}
                              className="text-sm cursor-pointer select-none"
                              style={{ color: "#313A56" }}
                            >
                              {taskTitle}
                            </label>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
            </>
          )}

          <DialogFooter className="mt-2 flex gap-2 flex-wrap rtl:flex-row-reverse shrink-0">
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
              disabled={selected.length === 0 || isPending || loadingTemplates}
              rounded="circle"
              className="font-semibold px-6"
            >
              {isPending
                ? t("FamilyTasks.creatingMulti")
                : t("FamilyTasks.addMultiTasks")}
              {selected.length > 0 && ` (${selected.length})`}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
