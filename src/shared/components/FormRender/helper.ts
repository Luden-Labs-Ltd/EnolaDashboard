export const getDirectionClassForField = (direction: "row" | "column" | undefined = "column") => {
  return direction === "row"
    ? "flex flex-row gap-3 items-center justify-between"
    : "flex flex-col gap-[8px]";
};
