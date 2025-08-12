import { AuthUser, User } from "@project/libs/shared/app/types";
import {compare, genSalt, hash} from "bcrypt";
import {SALT_ROUNDS} from "./blog-user.constant";

export class BlogUserEntity implements AuthUser, User {
  public id: string;
  public passwordHash: string;
  public email: string;
  public firstName: string;
  public lastName: string;
  public avatarUrl: string;
  public registrationDate: string;
  public postCount: number;
  public subscriberCount: number;

  constructor(user: AuthUser) {
    this.populate(user)
  }

  public toObject() {
    return {
      id: this.id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      passwordHash: this.passwordHash,
      avatarUrl: this.avatarUrl,
      registrationDate: this.registrationDate,
      postCount: this.postCount,
      subscriberCount: this.subscriberCount,
    };
  }

  public populate(data: AuthUser): void {
    this.email = data.email;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.avatarUrl = data.avatarUrl;
    this.registrationDate = data.registrationDate;
    this.postCount = data.postCount;
    this.subscriberCount = data.subscriberCount;
  }

  public async setPassword(password: string): Promise<BlogUserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }
}
