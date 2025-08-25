import {Injectable, NotFoundException} from "@nestjs/common";
import {BasePostgresRepository} from "@project/core";
import {Tag} from "@project/types";
import {PrismaClientService} from "@project/models";
import {TagPostEntity} from "./tag-post.entity";
import {tagFilterToPrismaFilter, TagPostFilter} from "./tag-post.filter";
import {TagPostFilterEnum} from "./tag-post-filter.enum";

@Injectable()
export class TagPostRepository extends BasePostgresRepository<TagPostEntity, Tag> {
  constructor(
    protected override readonly client: PrismaClientService,
  ) {
    super(client, TagPostEntity.fromObject);
  }

  public override async save(entity: TagPostEntity): Promise<TagPostEntity> {
    const record = await this.client.tag.create({
      data: {
        ...entity.toObject(),
      }
    })

    entity.id = record.id;
    return entity;
  }

  public override async findById(id: string): Promise<TagPostEntity> {
    const document = await this.client.tag.findFirst({
      where: {
        id,
      }
    })

    if (!document) {
      throw new NotFoundException(`Tag with id ${id} not found.`);
    }

    return this.createEntityFromDocument(document);
  }

  public async find(filter?: TagPostFilter): Promise<TagPostEntity[]> {
    const where = filter ?? tagFilterToPrismaFilter(filter!);

    const documents = await this.client.tag.findMany({
      where,
      take: TagPostFilterEnum.MAX_TAG_LIMIT,
    })

    return documents.map((document) => this.createEntityFromDocument(document));
  }

  public async delete(id: string): Promise<void> {
    await this.client.tag.delete({
      where: {
        id,
      }
    })
  }

  public async findByNamesOrCreate(titles: string[]): Promise<TagPostEntity[]> {
    const existingRecords = await this.client.tag.findMany({
      where: {
        title: {
          in: titles,
        }
      }
    })

    const existingTitles = existingRecords.map(record => record.title);

    const missingTitles = titles.filter(title => !existingTitles.includes(title));

    const createdRecords = [];
    for (const title of missingTitles) {
      const created = await this.client.tag.create({
        data: {
          title: title,
        }
      });
      createdRecords.push(created);
    }

    const allRecords = [...existingRecords, ...createdRecords];

    return allRecords.map((record) => this.createEntityFromDocument(record));
  }
}
