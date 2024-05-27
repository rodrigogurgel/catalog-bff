import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemProducerService } from 'src/config/events/kafka/item-producer/item-producer.service';
import { OptionProducerService } from 'src/config/events/kafka/option-producer/option-producer.service';
import { CustomizationProducerService } from 'src/config/events/kafka/customization-producer/customization-producer.service';
import { ItemEventDto } from 'src/config/events/kafka/item-producer/dto/item-event.dto';
import { v4 as uuidv4 } from 'uuid';
import { StatusEventDto } from 'src/config/events/kafka/commom/dto/status-event.dto';
import { StatusEnumDto } from '../commom/dto/status.dto';
import { CreateItemCustomizationDto } from './dto/create-item-customization.dto';
import { CreateItemOptionDto } from './dto/create-item-option.dto';
import { ProductEventDto } from 'src/config/events/kafka/product-producer/dto/product-event.dto';
import { OptionEventDto } from 'src/config/events/kafka/option-producer/dto/option-event.dto';
import { CustomizationEventDto } from 'src/config/events/kafka/customization-producer/dto/customization-event.dto';
import { ProductProducerService } from 'src/config/events/kafka/product-producer/product-producer.service';

@Injectable()
export class ItemService {
  constructor(
    private readonly itemProducerService: ItemProducerService,
    private readonly customizationProducerService: CustomizationProducerService,
    private readonly optionProducerService: OptionProducerService,
    private readonly productProducerService: ProductProducerService,
  ) {}

  async create(storeId: string, createItemDto: CreateItemDto) {
    const reference = `CATEGORY#${createItemDto.categoryId}#ITEM#${createItemDto.itemId}`;

    const item: ItemEventDto = {
      itemId: createItemDto.itemId,
      storeId: storeId,
      categoryId: createItemDto.categoryId,
      productId: createItemDto.product.productId,
      price: createItemDto.price,
      status:
        StatusEventDto[
          StatusEnumDto[createItemDto.status] as keyof typeof StatusEventDto
        ],
      index: createItemDto.index,
      reference: reference,
    };

    const products = this.getProductsRecursiveFromItem(storeId, createItemDto);
    const customizations = this.getCustomizationsRecursiveFromItem(
      storeId,
      reference,
      createItemDto,
    );
    const options = this.getOptionsRecursiveFromItem(
      storeId,
      reference,
      createItemDto,
    );

    const headers = {
      correlationId: uuidv4(),
    };

    await this.itemProducerService.create([item], headers);
    await this.optionProducerService.create(options, headers);
    await this.customizationProducerService.create(customizations, headers);
    await this.productProducerService.create(products, headers);
  }

  findAll() {
    return `This action returns all item`;
  }

  findOne(id: number) {
    return `This action returns a #${id} item`;
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    return `This action updates a #${id} item`;
  }

  remove(id: number) {
    return `This action removes a #${id} item`;
  }

  private getCustomizationsRecursiveFromItem(
    storeId: string,
    parentReference: string,
    createItemDto: CreateItemDto,
  ): CustomizationEventDto[] {
    return createItemDto.customizations.flatMap((customization) => {
      const reference = `${parentReference}#CUSTOMIZATION#${customization.customizationId}`;
      return [
        {
          customizationId: customization.customizationId,
          storeId: storeId,
          name: customization.name,
          minPermitted: customization.minPermitted,
          maxPermitted: customization.maxPermitted,
          description: customization.description,
          status:
            StatusEventDto[
              StatusEnumDto[customization.status] as keyof typeof StatusEventDto
            ],
          index: customization.index,
          reference: reference,
        } as CustomizationEventDto,
        ...this.getCustomizationsRecursiveFromCustomization(
          storeId,
          reference,
          customization,
        ),
      ];
    });
  }

  private getCustomizationsRecursiveFromCustomization(
    storeId: string,
    parentReference: string,
    createItemCustomizationDto: CreateItemCustomizationDto,
  ): CustomizationEventDto[] {
    return createItemCustomizationDto.options.flatMap((option) =>
      this.getCustomizationsRecursiveFromOption(
        storeId,
        `${parentReference}#OPTION#${option.optionId}`,
        option,
      ),
    );
  }

  private getCustomizationsRecursiveFromOption(
    storeId: string,
    parentReference: string,
    createItemOptionDto: CreateItemOptionDto,
  ): CustomizationEventDto[] {
    return createItemOptionDto.customizations.flatMap((customization) => {
      const reference = `${parentReference}#CUSTOMIZATION#${customization.customizationId}`;
      return [
        {
          customizationId: customization.customizationId,
          optionId: createItemOptionDto.optionId,
          storeId: storeId,
          name: customization.name,
          minPermitted: customization.minPermitted,
          maxPermitted: customization.maxPermitted,
          description: customization.description,
          status:
            StatusEventDto[
              StatusEnumDto[customization.status] as keyof typeof StatusEventDto
            ],
          index: customization.index,
          reference: reference,
        } as CustomizationEventDto,
        ...this.getCustomizationsRecursiveFromCustomization(
          storeId,
          reference,
          customization,
        ),
      ];
    });
  }

  private getProductsRecursiveFromItem(
    storeId: string,
    createItemDto: CreateItemDto,
  ): ProductEventDto[] {
    return createItemDto.customizations.flatMap((customization) => {
      if (createItemDto.product.create) {
        return [
          {
            productId: createItemDto.product.productId,
            storeId: storeId,
            name: createItemDto.product.name,
            description: createItemDto.product.description,
            image: createItemDto.product.image,
          } as ProductEventDto,
          ...this.getProductsRecursiveFromCustomization(storeId, customization),
        ];
      }
      return [
        ...this.getProductsRecursiveFromCustomization(storeId, customization),
      ];
    });
  }

  private getProductsRecursiveFromCustomization(
    storeId: string,
    createItemCustomizationDto: CreateItemCustomizationDto,
  ): ProductEventDto[] {
    return createItemCustomizationDto.options.flatMap((option) => {
      if (option.product.create) {
        return [
          {
            productId: option.product.productId,
            storeId: storeId,
            name: option.product.name,
            description: option.product.description,
            image: option.product.image,
          } as ProductEventDto,
          ...this.getProductsRecursiveFromOption(storeId, option),
        ];
      }
      return this.getProductsRecursiveFromOption(storeId, option);
    });
  }

  private getProductsRecursiveFromOption(
    storeId: string,
    createItemOptionDto: CreateItemOptionDto,
  ): ProductEventDto[] {
    return createItemOptionDto.customizations.flatMap((customization) =>
      this.getProductsRecursiveFromCustomization(storeId, customization),
    );
  }

  private getOptionsRecursiveFromItem(
    storeId: string,
    parentReference: string,
    createItemDto: CreateItemDto,
  ): OptionEventDto[] {
    return createItemDto.customizations.flatMap((customization) =>
      this.getOptionsRecursiveFromCustomization(
        storeId,
        `${parentReference}#CUSTOMIZATION#${customization.customizationId}`,
        customization,
      ),
    );
  }

  private getOptionsRecursiveFromCustomization(
    storeId: string,
    parentReference: string,
    createItemCustomizationDto: CreateItemCustomizationDto,
  ): OptionEventDto[] {
    return createItemCustomizationDto.options.flatMap((option) => {
      const reference = `${parentReference}#OPTION#${option.optionId}`;
      return [
        {
          optionId: option.optionId,
          storeId: storeId,
          customizationId: createItemCustomizationDto.customizationId,
          productId: option.product.productId,
          price: option.price,
          minPermitted: option.minPermitted,
          maxPermitted: option.maxPermitted,
          status:
            StatusEventDto[
              StatusEnumDto[option.status] as keyof typeof StatusEventDto
            ],
          index: option.index,
          reference: reference,
        } as OptionEventDto,
        ...this.getOptionsRecursiveFromOption(storeId, reference, option),
      ];
    });
  }

  private getOptionsRecursiveFromOption(
    storeId: string,
    parentReference: string,
    createItemOptionDto: CreateItemOptionDto,
  ): OptionEventDto[] {
    return createItemOptionDto.customizations.flatMap((customization) =>
      this.getOptionsRecursiveFromCustomization(
        storeId,
        `${parentReference}#CUSTOMIZATION#${customization.customizationId}`,
        customization,
      ),
    );
  }
}
