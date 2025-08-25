import { Prisma } from '@prisma/client';

export interface TagPostFilter {
  id?: string;
  title?: string;
}

export function tagFilterToPrismaFilter(filter: TagPostFilter): Prisma.TagWhereInput | undefined {
  if (!filter) {
    return undefined;
  }

  let prismaFilter: Prisma.TagWhereInput = {};

  if (filter.title) {
    prismaFilter = { title: filter.title };
  }

  return prismaFilter;
}
