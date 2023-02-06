import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useMemo, useState } from "react";
import QuotesService, { Quote } from "../../services/quotes.service";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import { Button, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import moment from "moment";
import { SearchIcon } from "@chakra-ui/icons";
import QuoteDetailsModal from "../QuoteDetailsModal";

type CustomQuoteTable = {
  id: string;
  departure_loc: string;
  destination_loc: string;
  departure_date: string;
  return_date: string;
  traveler_qty: number;
  transportation: string;
  status: string;
  price: number;
  action: Quote;
};

const AllQuoteTable = () => {
  const quotesService = new QuotesService();

  const columns_test = React.useMemo<ColumnDef<CustomQuoteTable, any>[]>(
    () => [
      {
        header: "Id",
        accessorKey: "id",
      },
      {
        header: "From",
        accessorKey: "departure_loc",
      },
      {
        header: "To",
        accessorKey: "destination_loc",
      },
      {
        header: "Departure date",
        accessorKey: "departure_date",
      },
      {
        header: "Return date",
        accessorKey: "return_date",
      },
      {
        header: "Number of travelers",
        accessorKey: "traveler_qty",
      },
      {
        header: "Transportation",
        accessorKey: "transportation",
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

  const [pageSize, setPageSize] = useState(10);

  const [pageNum, setPageNum] = useState(0);
  const [maxPage, setMaxPage] = useState(0);

  const dataQuery = useQuery(
    ["quotes", pageNum],
    async () => {
      const res = await quotesService.getQuoteList({
        skip: 10 * pageNum,
        take: 10,
      });
      setMaxPage(Math.ceil(res.rowCount / pageSize));
      return res;
    },
    {
      select: (data) => ({
        rows: data.rows.map((quote: Quote) => ({
          id: quote.id,
          departure_loc: quote.departure_loc,
          destination_loc: quote.destination_loc,
          departure_date: moment(quote.departure_date).format("MM-DD-YYYY"),
          return_date: moment(quote.return_date).format("MM-DD-YYYY"),
          traveler_qty: quote.traveler_qty,
          transportation: quote.transportation,
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
      <Table>
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <Th key={header.id} colSpan={header.colSpan}>
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
                    <Td key={cell.id}>
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
        >
          {"Previous"}
        </Button>
        <Button
          className="border rounded p-1"
          onClick={() => setPageNum((prevState) => prevState + 1)}
          disabled={pageNum >= maxPage - 1}
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

export default AllQuoteTable;
