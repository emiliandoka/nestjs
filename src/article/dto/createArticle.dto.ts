import { IsNotEmpty, IsString } from 'class-validator';
export class createArticleDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly decription: string;
  @IsNotEmpty()
  @IsString()
  readonly body: string;

  readonly taglist?: string[];
}
