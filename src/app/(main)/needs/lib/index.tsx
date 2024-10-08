
export type CategoryType = {
  id: string;
  icon: string;
  active?: boolean;
  title: string;
};


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
      title: "Medical",
    },
    {
      id: "home",
      icon: "HomeIcon",
      title: "Home",
    },
    {
      id: "emotional",
      icon: "EmotionalIcon",
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

  return categories
};
