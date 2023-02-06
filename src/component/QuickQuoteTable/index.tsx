import { Button, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import moment from "moment";
import React, { useState } from "react";
import QuotesService, { Quote } from "../../services/quotes.service";
import QuoteDetailsModal from "../QuoteDetailsModal";

type QuickQuoteTableType = {
  contact_info: string;
  traveler_qty: number;
  status: string;
  price: number;
  action: Quote;
};

const QuickQuoteTable = () => {
  const quotesService = new QuotesService();

  const columns_test = React.useMemo<ColumnDef<QuickQuoteTableType, any>[]>(
    () => [
      {
        header: "Name/contact",
        accessorKey: "contact_info",
      },
      {
        header: "Number of travelers",
        accessorKey: "traveler_qty",
      },
      {
        header: "status",
        accessorKey: "status",
      },
      {
        header: "price",
        accessorKey: "price",
      },
      {
        header: () => null,
        accessorKey: "action",
        cell: (props) => <QuoteDetailsModal quote={props.getValue()} />,
      },
    ],
    []
  );

  const [pageSize, setPageSize] = useState(9);
  const [pageNum, setPageNum] = useState(0);
  const [maxPage, setMaxPage] = useState(0);

  const dataQuery = useQuery(
    ["quickquotes", pageNum],
    async () => {
      const res = await quotesService.getQuoteList({
        skip: pageSize * pageNum,
        take: pageSize,
      });
      setMaxPage(Math.ceil(res.rowCount / pageSize));
      return res;
    },
    {
      select: (data) => ({
        rows: data.rows.map((quote: Quote) => ({
          traveler_qty: quote.traveler_qty,
          contact_info: quote.contact_info,
          status: quote.status,
          price: quote.price,
          action: quote,
        })),
        pageCount: data.pageCount,
        rowCount: data.rowCount,
      }),
      keepPreviousData: true,
    }
  );
  const defaultData = React.useMemo(() => [], []);

  const table = useReactTable({
    data: dataQuery.data?.rows ?? defaultData,
    columns: columns_test,
    pageCount: dataQuery.data?.pageCount ?? -1,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });
  return (
    <>
      <Table size="xs">
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <Th
                    key={header.id}
                    colSpan={header.colSpan}
                    fontSize={"x-small"}
                  >
                    {
                      <div>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                    }
                  </Th>
                );
              })}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <Td key={cell.id} fontSize={"small"}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <div className="h-2" />
      <div className="flex items-center gap-2">
        <Button
          className="border rounded p-1"
          onClick={() => setPageNum((prevState) => prevState - 1)}
          disabled={pageNum < 1}
          size="xs"
        >
          {"Previous"}
        </Button>
        <Button
          className="border rounded p-1"
          onClick={() => setPageNum((prevState) => prevState + 1)}
          disabled={pageNum >= maxPage - 1}
          size="xs"
        >
          {"Next"}
        </Button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>{pageNum + 1} of </strong>
          {maxPage}
        </span>
        {dataQuery.isFetching ? "Loading..." : null}
      </div>
    </>
  );
};

export default QuickQuoteTable;
