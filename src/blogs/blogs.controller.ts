import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  NotFoundException,
  BadRequestException,
  Delete,
  Query,
} from '@nestjs/common';
import { BlogService } from './blogs.service';
import { Blog } from './schema/blogs.schema';
import { CreateBlogDto } from './dto/blogs.dto';
import { SearchBlog } from 'src/elasticSearch/search.service';

@Controller('blogs')
export class BlogsController {
  constructor(
    private blogsService: BlogService,
    private blogSearchService: SearchBlog,
  ) {}

  @Post()
  async create(@Body() createBlogDto: CreateBlogDto) {
    const created = await this.blogsService.createBlog(createBlogDto);
    if (!created) {
      throw new BadRequestException(`Blog creation failed`);
    }
    return { message: 'Created successfully' };
  }

  @Get('/:id')
  async getById(@Param('id') id: string): Promise<Blog> {
    const blog = await this.blogsService.getBlogById(id);
    if (!blog) {
      throw new NotFoundException(`Blog not found with id : ${id}`);
    }
    return blog;
  }

  @Get()
  async findAll(): Promise<Blog[]> {
    return await this.blogsService.findAllBlogs();
  }

  @Put('/:id')
  async updateById(
    @Body() createBlogDto: CreateBlogDto,
    @Param('id') id: string,
  ) {
    const updated = await this.blogsService.updateBlogById(id, createBlogDto);
    if (updated) {
      return { success: 'Updated successfully' };
    }
  }

  @Get('/filters/data')
  async searchBlog(@Query('query') query: any) {
    const decodeUrl = decodeURIComponent(query);
    return await this.blogSearchService.searchBlog(decodeUrl);
  }
  @Delete('/:blogId')
  async deleteRecord(@Param('blogId') blogId: string) {
    return await this.blogsService.deleteRecord(blogId);
  }

  @Get('/all/search')
  async getAllSearchData() {
    return await this.blogSearchService.searchAll();
  }
}
