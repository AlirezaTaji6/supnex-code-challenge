import { Injectable } from '@nestjs/common';
import { DeleteFailed, UpdateFailed } from '../../common';
import { SuppliersService } from '../../supplier';
import { CreateRawMaterialPriceDto, UpdateRawMaterialPriceDto } from '../dto';
import { RawMaterialPriceDuplicated } from '../raw-material.exception';
import { RawMaterialPrice } from '../repository/raw-material-price.entity';
import { RawMaterialPriceRepo } from '../repository/raw-material-price.repository';
import { RawMaterialService } from './raw-material.service';

@Injectable()
export class RawMaterialPriceService {
  constructor(
    private readonly repo: RawMaterialPriceRepo,
    private readonly rawMaterialSerivce: RawMaterialService,
    private readonly supplierService: SuppliersService,
  ) {}

  async create(dto: CreateRawMaterialPriceDto): Promise<RawMaterialPrice> {
    await this.rawMaterialSerivce.findOne(dto.rawMaterialId);
    await this.supplierService.findOne(dto.supplierId);
    await this.isDuplicated(dto);
    return this.repo.save(this.repo.create(dto));
  }

  async update(id: number, dto: UpdateRawMaterialPriceDto) {
    const { affected } = await this.repo.update(id, dto);
    if (!affected) throw new UpdateFailed();
  }

  async delete(id: number) {
    const { affected } = await this.repo.softDelete(id);
    if (!affected) throw new DeleteFailed();
  }

  private async isDuplicated({
    rawMaterialId,
    supplierId,
  }: {
    rawMaterialId: number;
    supplierId: number;
  }) {
    const exists = await this.repo.findByParticipations({
      rawMaterialId,
      supplierId,
    });
    if (exists) throw new RawMaterialPriceDuplicated();
  }
}
