import { CategoryType } from "../model";

export const getCategories = async (): Promise<CategoryType[]> => {
  const categories: CategoryType[] = [
    {
      id: "general",
      icon: "MessageIcon",
      active: true,
      count: 2,
      title: "General",
    },
    {
      id: "medical",
      icon: "MedicalIcon",
      active: true,
      count: 2,
      title: "Medical",
    },
    {
      id: "home",
      icon: "HomeIcon",
      count: 2,
      active: true,
      title: "Home",
    },
    {
      id: "emotional",
      icon: "EmotionalIcon",
      count: 2,
      active: true,
      title: "Emotional",
    },
    {
      id: "childcare",
      icon: "ParentingIcon",
      count: 2,
      title: "Childcare",
    },
    {
      id: "legal_rights",
      icon: "RightIcon",
      count: 2,
      title: "Legal rights",
    },
  ];

  return categories;
};



