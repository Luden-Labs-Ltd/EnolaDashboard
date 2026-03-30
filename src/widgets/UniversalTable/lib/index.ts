import { HeaderItem, HeaderItemType, CeilItem, CeilItemType } from "./types";

type TableData = {
  headers: HeaderItem[];
  rows: Array<Array<CeilItem>>;
};

type TableDataConverterDto = {
  tableRawData: any[];
  selectedColumnIds: string[];
  tableName: string;
  hiddenColumns?: string[];
};

const createHeader = ({
  headerId,
  headerValue,
  tableName,
  type,
}: {
  headerId: string;
  headerValue: string;
  tableName?: string;
  type: HeaderItemType;
}): HeaderItem => {
  const header: HeaderItem = {
    id: headerId,
    value: headerValue,
    type,
  };

  if (tableName) {
    header.translate = `TablesTranslates.${tableName}.${headerValue}`;
  }
  return header;
};

const createRow = ({
  rowId,
  columnId,
  itemId,
  rowValue,
  type,
  isActive,
  itemData,
}: {
  rowId: string;
  columnId: string;
  itemId: string;
  rowValue: string | number;
  type: CeilItemType;
  itemData: Record<string, any>;
  isActive?: boolean;
}): CeilItem => {
  return {
    id: rowId,
    columnId,
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
  tableName,
  hiddenColumns = [],
}: TableDataConverterDto) => {
  const resultData: TableData = {
    headers: [],
    rows: [],
  };

  tableRawData.forEach((item, index) => {
    const headersAndRows = Object.entries(item).filter(
      ([headerValue]) => !hiddenColumns.includes(headerValue)
    );
    headersAndRows.forEach(([headerValue, rowValue], headersAndRowsIndex) => {
      const currentHeaderId = `header-${item.id}-${headersAndRowsIndex}`;
      const currentRowId = `row-${item.id}-${headersAndRowsIndex}`;

      const headerAlreadyExist = resultData.headers.find(
        (addedHeader) => addedHeader.value === headerValue
      );
      if (!headerAlreadyExist) {
        resultData.headers.push(
          createHeader({
            headerId: currentHeaderId,
            headerValue: headerValue,
            type: HeaderItemType.VALUE,
            tableName: tableName,
          })
        );
      }

      if (!resultData.rows[index]) {
        resultData.rows[index] = [
          createRow({
            rowId: "select-" + currentRowId,
            columnId: "select",
            itemId: item.id,
            rowValue: "",
            type: CeilItemType.SELECT,
            itemData: item,
            isActive: selectedColumnIds.includes(item.id),
          }),
          createRow({
            rowId: currentRowId,
            columnId: headerValue,
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
            columnId: headerValue,
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
            columnId: "actions",
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
    createHeader({
      headerId: "main-select-header",
      headerValue: "",
      type: HeaderItemType.SELECT,
    })
  );
  resultData.headers.push(
    createHeader({
      headerId: "actions-header",
      headerValue: "",
      type: HeaderItemType.EMPTY,
    })
  );

  return resultData;
};
