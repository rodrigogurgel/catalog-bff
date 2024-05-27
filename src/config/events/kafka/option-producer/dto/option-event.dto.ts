import { StatusEventDto } from '../../commom/dto/status-event.dto';

export class OptionEventDto {
  optionId: string;
  storeId: string;
  customizationId: string;
  productId: string;
  price: number;
  minPermitted: number;
  maxPermitted: number;
  status: StatusEventDto;
  index: number;
  reference: string;
}
