import { CategoryType } from "../model";

export const getCategories = async (): Promise<CategoryType[]> => {
  const categories: CategoryType[] = [
    {
      id: "general",
      icon: "MessageIcon",
      active: true,
      title: "General",
    },
    {
      id: "medical",
      icon: "MedicalIcon",
      active: true,
      title: "Medical",
    },
    {
      id: "home",
      icon: "HomeIcon",
      active: true,
      title: "Home",
    },
    {
      id: "emotional",
      icon: "EmotionalIcon",
      active: true,
      title: "Emotional",
    },
    {
      id: "childcare",
      icon: "ParentingIcon",
      title: "Childcare",
    },
    {
      id: "legal_rights",
      icon: "RightIcon",
      title: "Legal rights",
    },
  ];

  return categories;
};
