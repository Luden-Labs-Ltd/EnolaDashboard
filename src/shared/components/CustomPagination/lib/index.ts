// Function to get the range of page numbers to show

type RangeProps = {
  totalPages: number;
  pagesToShow: number;
  currentPage: number;
  isRenderFirstEclipse: boolean;
  isRenderLastEclipse: boolean;
};
export const getPageRange = ({
    totalPages,
    pagesToShow,
    currentPage,
    isRenderFirstEclipse,
    isRenderLastEclipse,
}: RangeProps) => {
  if (totalPages <= pagesToShow) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  let start = Math.max(
    isRenderFirstEclipse ? 3 : 2,
    currentPage - Math.floor(pagesToShow / 2)
  );
  let end = Math.min(
    isRenderLastEclipse ? totalPages - 2 : totalPages - 1,
    start + pagesToShow - 1
  );

  // Adjust if we can't show the full range
  start = Math.max(isRenderFirstEclipse ? 3 : 2, end - pagesToShow + 1);

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};
