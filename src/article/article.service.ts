import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { createArticleDto } from './dto/createArticle.dto';
import { Knex } from 'knex';
import { InjectKnex } from 'nestjs-knex';
@Injectable()
export class ArticleService {
  constructor(@InjectKnex() private readonly knex: Knex) {}
  async createArticle(
    articleData: createArticleDto,
    userId: number,
  ): Promise<any> {
    try {
      /* eslint-disable */
      const articles = await this.knex.table("articlesdb").insert({
        "title" : articleData.title,
        "slug": articleData.title.toLowerCase().split(' ').join('-'),
        "description" : articleData.decription,
        "body": articleData.body,
        "taglist" : articleData.taglist?.length ? JSON.stringify(articleData.taglist): '[]',
        "user_id" : userId
      });

      return { articles };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
  async getArticle(slug){
    
    const articles = await this.knex.table("articlesdb").where({slug:slug}).select()
    return articles;
    
  }
  async getAllArticles(query){
    
    //const articles = await this.knex.table("articlesdb").where({slug:slug}).select()
    return query;
    
  }
  async deleteArticle(slug , userID?: number){
    const articles : any = await this.knex.table("articlesdb").where({slug:slug}).select()
    if(articles[0]){
      throw new HttpException('does not exist', HttpStatus.NOT_FOUND)
    }
    else if(articles[0]?.user_id === userID){
      await this.knex.table("articlesdb").where({id:articles[0].id}).delete();
      return 'deleted succefully'
    }
    throw new HttpException('Not Authorized', HttpStatus.UNAUTHORIZED);
  }
  
}
