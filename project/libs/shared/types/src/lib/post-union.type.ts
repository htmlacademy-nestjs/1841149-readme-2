import {PhotoPost} from "./photo.post";
import {LinkPost} from "./link.post";
import {QuotePost} from "./quote.post";
import {VideoPost} from "./video.post";
import {TextPost} from "./text.post";

export type PostUnion = PhotoPost | LinkPost | QuotePost | VideoPost | TextPost
