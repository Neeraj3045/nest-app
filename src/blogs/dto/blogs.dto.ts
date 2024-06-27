import { Transform } from 'class-transformer';
import { IsEnum, IsString } from 'class-validator';

export enum Status {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export class CreateBlogDto {
  blogId: string;

  @IsString()
  title: string;

  @IsString()
  descriptions: string;

  @IsString()
  @IsEnum(Status)
  @Transform(({ value }) => value || Status.ACTIVE)
  status: Status = Status.ACTIVE;
}
