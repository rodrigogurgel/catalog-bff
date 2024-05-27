import { Injectable } from '@nestjs/common';
import { CategoryProducerService } from 'src/config/events/kafka/category-producer/category-producer.service';
import { StatusEnumDto } from '../commom/dto/status.dto';
import { StatusEventDto } from 'src/config/events/kafka/commom/dto/status-event.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryEventDto } from 'src/config/events/kafka/category-producer/dto/category-event.dto';

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryProducerService: CategoryProducerService,
  ) {}

  async create(
    storeId: string,
    categoryDto: CreateCategoryDto,
  ): Promise<CreateCategoryDto> {
    await this.categoryProducerService.create([
      {
        categoryId: categoryDto.categoryId,
        storeId: storeId,
        index: categoryDto.index,
        name: categoryDto.name,
        status:
          StatusEventDto[
            StatusEnumDto[categoryDto.status] as keyof typeof StatusEventDto
          ],
      },
    ]);

    return categoryDto;
  }

  async update(storeId: string, id: string, categoryDto: CreateCategoryDto) {
    await this.categoryProducerService.update([
      {
        categoryId: id,
        storeId: storeId,
        index: categoryDto.index,
        name: categoryDto.name,
        status:
          StatusEventDto[
            StatusEnumDto[categoryDto.status] as keyof typeof StatusEventDto
          ],
      },
    ]);
  }

  async remove(storeId: string, id: string) {
    await this.categoryProducerService.delete([
      {
        categoryId: id,
        storeId: storeId,
      } as CategoryEventDto,
    ]);
  }

  async patch(storeId: string, id: string, categoryDto: CreateCategoryDto) {
    await this.categoryProducerService.patch([
      {
        categoryId: id,
        storeId: storeId,
        index: categoryDto.index,
        name: categoryDto.name,
        status:
          StatusEventDto[
            StatusEnumDto[categoryDto.status] as keyof typeof StatusEventDto
          ],
      },
    ]);
  }
}
