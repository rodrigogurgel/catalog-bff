import { StatusEventDto } from '../../commom/dto/status-event.dto';

export class CategoryEventDto {
  categoryId: string;
  storeId: string;
  name: string;
  status: StatusEventDto;
  index: number;
}
