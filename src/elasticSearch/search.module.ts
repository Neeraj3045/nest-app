import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { SearchBlog } from './search.service';

@Module({
  imports: [
    ElasticsearchModule.register({
      node: 'http://localhost:9200', // Your Elasticsearch node URL
    }),
  ],
  providers: [SearchBlog],
  exports: [ElasticsearchModule, SearchBlog],
})
export class ElasticSearchModule {}
