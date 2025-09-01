export type EntityIdType = string;

export type DefaultToObjectType = Record<string, unknown>;

export interface Entity<
  T extends EntityIdType,
  toObjectType = DefaultToObjectType
> {
  id?: T;
  toObject(): toObjectType;
}
