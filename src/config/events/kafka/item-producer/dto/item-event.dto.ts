import { StatusEventDto } from '../../commom/dto/status-event.dto';

export class ItemEventDto {
  itemId: string;
  storeId: string;
  categoryId: string;
  productId: string;
  price: number;
  status: StatusEventDto;
  index: number;
  reference: string;
}
