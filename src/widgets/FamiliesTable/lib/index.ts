import { FamilyType } from "entities/families";
import { HeaderItem, HeaderItemType, RowItem, RowItemType } from "./types";

type TableData = {
  headers: HeaderItem[];
  rows: Array<Array<RowItem>>;
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

const createRow = (
  rowId: string,
  rowValue: string | number,
  type: RowItemType
): RowItem => {
  return {
    id: rowId,
    value: rowValue,
    type,
  };
};

export const tableDataConverter = (families: FamilyType[]) => {
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
          createRow("select-" + currentRowId, "", RowItemType.SELECT),
          createRow(currentRowId, rowValue, RowItemType.VALUE),
        ];
      } else {
        resultData.rows[index].push(
          createRow(currentRowId, rowValue, RowItemType.VALUE)
        );
      }

      const isLastElementInRow = headersAndRows.length - 1 === headersAndRowsIndex
      if (isLastElementInRow) {
        resultData.rows[index].push(
          createRow("actions-" + currentRowId, "", RowItemType.ACTIONS)
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
