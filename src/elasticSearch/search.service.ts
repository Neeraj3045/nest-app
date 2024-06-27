import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class SearchBlog {
  index = 'blog_01';
  constructor(private readonly blogSearch: ElasticsearchService) {}

  async postBlog(blogId: any, postData: any) {
    postData.blogId = blogId;
    return this.blogSearch.index({
      index: this.index,
      body: postData,
    });
  }

  async searchBlog(searchText: any) {
    const body = await this.blogSearch.search({
      index: this.index,
      body: {
        query: {
          multi_match: {
            query: searchText,
            fields: ['title', 'descriptions', 'blogId'],
          },
        },
      },
    });
    console.log(body);
    //return body;
    const hits = body.hits.hits;
    return hits.map((item) => item._source);
  }

  async searchAll() {
    const body = await this.blogSearch.search({
      index: this.index,
      body: {
        query: {
          match_all: {},
        },
        from: 0,
        size: 1,
      },
    });
    //return body;
    const hits = body.hits.hits;
    return hits.map((item) => item._source);
  }

  async removeData(blogId: string) {
    this.blogSearch.deleteByQuery({
      index: this.index,
      body: {
        query: {
          match: {
            blogId: blogId,
          },
        },
      },
    });
  }

  async updateSearchData(blogId: string, post: any) {
    await this.blogSearch.updateByQuery({
      index: this.index,
      body: {
        script: {
          id: blogId,
          params: post,
        },
        query: {
          match: {
            field: 'blogId',
          },
        },
      },
    });
  }
}
