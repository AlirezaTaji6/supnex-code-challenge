import { Repository, SelectQueryBuilder } from 'typeorm';
import { SearchDto } from '../dto/search.dto';
import { Sorts } from '../enums/sorts.enum';
import { IListCount } from '../types/list-count.type';

export async function typeormPagination<T>(
  { page, limit, search, sorts }: SearchDto,
  repo: Repository<T> | SelectQueryBuilder<T>,
  config: {
    search: string[];
    sortableColumns?: string[];
    filterableColumns?: string[];
  },
): Promise<IListCount<T>> {
  const alias = repo instanceof Repository ? '__root' : repo.alias;

  const queryBuilder =
    repo instanceof Repository ? repo.createQueryBuilder(alias) : repo;

  const query = queryBuilder.take(limit).skip((page - 1) * limit);

  const searchExpressions = [];
  for (const column of config.search) {
    // if searching join field no need to add alias
    const name = getColumnName(column, alias);
    searchExpressions.push(`${name} ILIKE :search`);
  }
  query['andWhere'](`(${searchExpressions.join(' OR ')})`, {
    search: `%${search}%`,
  });

  if (
    sorts &&
    sorts.length &&
    config.sortableColumns &&
    config.sortableColumns.length
  ) {
    for (const sort of sorts) {
      // sort sample: "createdAt:DESC"
      const [column, order] = sort.split(':');
      if (config.sortableColumns.includes(column)) {
        const name = getColumnName(column, alias);
        query['addOrderBy'](name, <Sorts>order);
      }
    }
  }

  const [data, count] = await query.getManyAndCount();
  return { data, count };
}

function getColumnName(column: string, alias: string): string {
  return column.indexOf('.') ? column : `${alias}.${column}`;
}
