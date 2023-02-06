export interface CreateQuoteDTO {
  departure_loc: string;
  destination_loc: string;
  departure_date: Date;
  return_date: Date;
  traveler_qty: number;
  transportation: string;
  contact_info: string;
  status: string;
  price: number;
}
