import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TagPostEntity } from './tag-post.entity';
import { TagPostRepository } from './tag-post.repository';
import { CreateTagDto } from './dto/create-tag.dto';

@Injectable()
export class TagPostService {
  constructor(private readonly tagPostRepository: TagPostRepository) {}

  public async getTag(id: string): Promise<TagPostEntity> {
    return this.tagPostRepository.findById(id);
  }

  public async getAllTags(): Promise<TagPostEntity[]> {
    return this.tagPostRepository.find();
  }

  public async createTag(dto: CreateTagDto): Promise<TagPostEntity> {
    const existsTag = (
      await this.tagPostRepository.find({ title: dto.title })
    ).at(0);
    if (existsTag) {
      throw new ConflictException('A tag with the title already exists');
    }

    const newTag = new TagPostEntity(dto);
    await this.tagPostRepository.save(newTag);

    return newTag;
  }

  public async deleteCategory(id: string): Promise<void> {
    try {
      await this.tagPostRepository.deleteById(id);
    } catch {
      // TODO
      throw new NotFoundException(`Tag with ID ${id} not found`);
    }
  }

  public async getTagsByNamesOrCreate(
    tagNames: string[]
  ): Promise<TagPostEntity[]> {
    return await this.tagPostRepository.findByNamesOrCreate(tagNames);
  }
}
