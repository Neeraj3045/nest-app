import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from './schema/blogs.schema';
import { BlogService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { ElasticSearchModule } from 'src/elasticSearch/search.module';
import { SearchBlog } from 'src/elasticSearch/search.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
    ElasticSearchModule,
  ],
  providers: [BlogService, SearchBlog],
  controllers: [BlogsController],
})
export class BlogsModule {}
