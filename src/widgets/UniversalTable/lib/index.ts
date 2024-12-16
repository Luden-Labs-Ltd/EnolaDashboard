import { HeaderItem, HeaderItemType, CeilItem, CeilItemType } from "./types";

type TableData = {
  headers: HeaderItem[];
  rows: Array<Array<CeilItem>>;
};

type TableDataConverterDto = {
  tableRawData: any[];
  selectedColumnIds: number[];
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
  itemId,
  rowValue,
  type,
  isActive,
  itemData,
}: {
  rowId: string;
  itemId: number;
  rowValue: string | number;
  type: CeilItemType;
  itemData: Record<string, any>,
  isActive?: boolean;
}): CeilItem => {
  return {
    id: rowId,
    itemId: itemId,
    itemData: itemData,
    value: rowValue,
    type,
    isActive,
  };
};

export const tableDataConverter = ({
  tableRawData,
  selectedColumnIds,
}: TableDataConverterDto) => {
  const resultData: TableData = {
    headers: [],
    rows: [],
  };

  tableRawData.forEach((item, index) => {
    const headersAndRows = Object.entries(item);
    headersAndRows.forEach(([headerValue, rowValue], headersAndRowsIndex) => {
      const currentHeaderId = `header-${item.id}-${headersAndRowsIndex}`;
      const currentRowId = `row-${item.id}-${headersAndRowsIndex}`;

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
            itemId: item.id,
            rowValue: "",
            type: CeilItemType.SELECT,
            itemData: item,
            isActive: selectedColumnIds.includes(item.id),
          }),
          createRow({
            rowId: currentRowId,
            itemId: item.id,
            rowValue: rowValue as number | string,
            type: CeilItemType.VALUE,
            itemData: item,
            isActive: selectedColumnIds.includes(item.id),
          }),
        ];
      } else {
        resultData.rows[index].push(
          createRow({
            rowId: currentRowId,
            itemId: item.id,
            rowValue: rowValue as number | string,
            type: CeilItemType.VALUE,
            itemData: item,
            isActive: selectedColumnIds.includes(item.id),
          })
        );
      }

      const isLastElementInRow =
        headersAndRows.length - 1 === headersAndRowsIndex;
      if (isLastElementInRow) {
        resultData.rows[index].push(
          createRow({
            rowId: "actions-" + currentRowId,
            itemId: item.id,
            rowValue: "",
            type: CeilItemType.ACTIONS,
            itemData: item,
            isActive: selectedColumnIds.includes(item.id),
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
