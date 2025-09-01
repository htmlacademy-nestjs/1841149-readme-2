import { PrismaClientService } from '@project/models';
import { DefaultToObjectType, Entity, EntityIdType } from './entity.interface';
import { Repository } from './repository.interface';

export abstract class BasePostgresRepository<
  EntityType extends Entity<EntityIdType, DocumentType>,
  DocumentType = DefaultToObjectType
> implements Repository<EntityType, DocumentType>
{
  constructor(
    protected readonly client: PrismaClientService,
    private readonly createEntity: (document: DocumentType) => EntityType
  ) {}

  protected createEntityFromDocument(document: DocumentType): EntityType {
    return this.createEntity(document);
  }

  public async findById(id: EntityType['id']): Promise<EntityType | null> {
    throw new Error('Not implemented');
  }

  public async save(entity: EntityType): Promise<EntityType> {
    throw new Error('Not implemented');
  }

  public async update(
    id: EntityType['id'],
    entity: EntityType
  ): Promise<EntityType> {
    throw new Error('Not implemented');
  }

  public async deleteById(id: EntityType['id']): Promise<void> {
    throw new Error('Not implemented');
  }
}
