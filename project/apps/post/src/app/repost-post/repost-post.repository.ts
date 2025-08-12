import { Injectable } from "@nestjs/common";
import { BaseMemoryRepository } from "@project/libs/shared/core";
import {RepostPostEntity} from "./repost-post.entity";

@Injectable()
export class RepostPostRepository extends BaseMemoryRepository<RepostPostEntity> {}
