import BaseHttpService from "./base-http.service";
import { CreateQuoteDTO } from "./DTO/create-quote.dto";
import {
  GetQuoteListRequest,
  GetQuoteListResponse,
} from "./DTO/get-quote-list";
import { UpdateQuoteDTO } from "./DTO/update-quote.dto";

export type Quote = {
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
};
export default class QuotesService extends BaseHttpService {
  async createQuote(data: CreateQuoteDTO) {
    return await this.post(`quotes`, { ...data });
  }

  deleteQuote(id: string) {
    return this.delete(`quotes/${id}`);
  }

  updateQuoteById(id: string, data: UpdateQuoteDTO) {
    return this.patch(`quotes/${id}`, { ...data });
  }

  async getQuoteList(
    options: GetQuoteListRequest
  ): Promise<GetQuoteListResponse> {
    let res = await this.get(
      `quotes?skip=${options.skip}&take=${options.take}`
    );
    return res.data;
  }
  async getSingleQuote(id: string) {
    return await this.get(`quotes/${id}`);
  }
}
