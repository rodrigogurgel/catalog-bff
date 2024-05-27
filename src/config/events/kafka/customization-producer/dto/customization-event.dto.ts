import { StatusEventDto } from '../../commom/dto/status-event.dto';

export class CustomizationEventDto {
  customizationId: string;
  storeId: string;
  optionId?: string;
  name: string;
  minPermitted: number;
  maxPermitted: number;
  description?: string;
  status: StatusEventDto;
  index: number;
  reference: string;
}
