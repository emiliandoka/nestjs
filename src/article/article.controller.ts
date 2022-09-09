import {
  Body,
  Controller,
  Post,
  UseGuards,
  Req,
  Get,
  Param,
  Delete,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from 'src/userLogin/guard/auth.guard';
import { ArticleService } from './article.service';
import { ExpressRequest } from 'types/expressRequest.interface';
import { createArticleDto } from './dto/createArticle.dto';

@Controller('articles')
export class ArticleController {
  constructor(private readonly ArticleService: ArticleService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async create(
    @Body() articleData: createArticleDto,
    @Req() req: ExpressRequest,
  ) {
    return this.ArticleService.createArticle(articleData, req.user.id);
  }
  @Get()
  async getAllArticles(@Query() query: any) {
    return this.ArticleService.getAllArticles(query);
  }
  @Get(':slug')
  async getPost(@Param() slug: { slug: string }) {
    return this.ArticleService.getArticle(slug.slug);
  }
  @Delete(':slug')
  @UseGuards(AuthGuard)
  async deletePost(@Param('slug') slug: string, @Req() req: ExpressRequest) {
    return this.ArticleService.deleteArticle(slug, req.user.id);
  }
}
