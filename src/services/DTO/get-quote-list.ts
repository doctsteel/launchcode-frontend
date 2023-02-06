interface GetQuoteListRequest {
  skip: number;
  take: number;
}

interface GetQuoteListResponse {
  rows: [
    {
      id: string;
      departure_loc: string;
      destination_loc: string;
      departure_date: Date;
      return_date: Date;
      traveler_qty: number;
      transportation: string;
      contact_info: string;
      status: string;
      price: number;
      created_at: Date;
      userId: string;
    }
  ];
  pageCount: number;
  rowCount: number;
}

export type { GetQuoteListRequest, GetQuoteListResponse };
