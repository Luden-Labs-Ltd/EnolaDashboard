import { FamilyType } from "entities/families";
import { HeaderItem, HeaderItemType, RowItem, RowItemType } from "./types";

type TableData = {
  headers: HeaderItem[];
  rows: Array<Array<RowItem>>;
};

type TableDataConverterDto = {
  families: FamilyType[];
  selectedFamilies: number[];
};

const createHeader = (
  headerId: string,
  headerValue: string,
  type: HeaderItemType
): HeaderItem => {
  return {
    id: headerId,
    value: headerValue,
    type,
  };
};

const createRow = ({
  rowId,
  familyId,
  rowValue,
  type,
  isActive,
}: {
  rowId: string;
  familyId: number;
  rowValue: string | number;
  type: RowItemType;
  isActive?: boolean;
}): RowItem => {
  return {
    id: rowId,
    familyId: familyId,
    value: rowValue,
    type,
    isActive,
  };
};

export const tableDataConverter = ({
  families,
  selectedFamilies,
}: TableDataConverterDto) => {
  const resultData: TableData = {
    headers: [],
    rows: [],
  };

  families.forEach((family, index) => {
    const headersAndRows = Object.entries(family);
    headersAndRows.forEach(([headerValue, rowValue], headersAndRowsIndex) => {
      const currentHeaderId = `header-${family.id}-${headersAndRowsIndex}`;
      const currentRowId = `row-${family.id}-${headersAndRowsIndex}`;

      const headerAlreadyExist = resultData.headers.find(
        (addedHeader) => addedHeader.value === headerValue
      );
      if (!headerAlreadyExist) {
        resultData.headers.push(
          createHeader(currentHeaderId, headerValue, HeaderItemType.VALUE)
        );
      }

      if (!resultData.rows[index]) {
        resultData.rows[index] = [
          createRow({
            rowId: "select-" + currentRowId,
            familyId: family.id,
            rowValue: "",
            type: RowItemType.SELECT,
            isActive: selectedFamilies.includes(family.id),
          }),
          createRow({
            rowId: currentRowId,
            familyId: family.id,
            rowValue: rowValue,
            type: RowItemType.VALUE,
            isActive: selectedFamilies.includes(family.id),
          }),
        ];
      } else {
        resultData.rows[index].push(
          createRow({
            rowId: currentRowId,
            familyId: family.id,
            rowValue: rowValue,
            type: RowItemType.VALUE,
            isActive: selectedFamilies.includes(family.id),
          })
        );
      }

      const isLastElementInRow =
        headersAndRows.length - 1 === headersAndRowsIndex;
      if (isLastElementInRow) {
        resultData.rows[index].push(
          createRow({
            rowId: "actions-" + currentRowId,
            familyId: family.id,
            rowValue: "",
            type: RowItemType.ACTIONS,
            isActive: selectedFamilies.includes(family.id),
          })
        );
      }
    });
  });

  resultData.headers.unshift(
    createHeader("main-select-header", "", HeaderItemType.SELECT)
  );
  resultData.headers.push(
    createHeader("actions-header", "", HeaderItemType.EMPTY)
  );

  return resultData;
};
