import {CreateQuotePostDto} from "./create-quote-post.dto";
import {CreateVideoPostDto} from "./create-video-post.dto";
import {CreateTextPostDto} from "./create-text-post.dto";
import {CreateLinkPostDto} from "./create-link-post.dto";
import {CreatePhotoPostDto} from "./create-photo-post.dto";

export type CreatePostUnionDto = CreateQuotePostDto | CreateVideoPostDto | CreateTextPostDto | CreateLinkPostDto | CreatePhotoPostDto
