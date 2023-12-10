import { HttpException } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { InternalServerError } from '../common.exception';

// implemented based on template method design pattern
export class TypeormTransactionTemplate<R> {
  constructor(private readonly dataSource: DataSource) {}
  async apply<R>() {
    const queryRunner = this.dataSource.createQueryRunner();
    queryRunner.startTransaction();
    try {
      const result = await this.handler(queryRunner.manager);
      await queryRunner.commitTransaction();
      return result;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      if (err instanceof HttpException) throw err;
      console.log(err); //TODO: add logging
      throw new InternalServerError();
    } finally {
      await queryRunner.release();
    }
  }

  handler: (manager: EntityManager) => Promise<R>;
}
