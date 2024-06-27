import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { Blog } from './schema/blogs.schema';
import { CreateBlogDto } from './dto/blogs.dto';
import { SearchBlog } from 'src/elasticSearch/search.service';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog.name)
    private blogModel: Model<Blog>,
    private blogSearch: SearchBlog,
  ) {}

  async createBlog(blog: CreateBlogDto): Promise<Blog> {
    const postBlog = new this.blogModel(blog);
    const newBlog = await postBlog.save();
    console.log('ccccc', postBlog);
    const blogId = newBlog._id;
    this.blogSearch.postBlog(blogId, blog);
    return newBlog;
  }

  async getBlogById(blogId: string): Promise<Blog> {
    return await this.blogModel.findById(blogId);
  }

  async findAllBlogs() {
    return await this.blogModel.find();
  }

  async deleteRecord(blogId: string) {
    const deleted = await this.blogModel.deleteOne({ _id: blogId });
    if (deleted) {
      this.blogSearch.removeData(blogId);
    }
    return deleted;
  }

  async updateBlogById(
    id: string,
    createBlogDto: CreateBlogDto,
  ): Promise<Blog> {
    const updateBlog: Document<unknown, object, Blog> &
      Blog & { _id: unknown } = await this.blogModel.findByIdAndUpdate(
      id,
      createBlogDto,
      { new: true },
    );
    if (!updateBlog) {
      throw new NotFoundException(`Blog not found with ${id}`);
    }
    this.blogSearch.updateSearchData(id, createBlogDto);
    return updateBlog;
  }
}
