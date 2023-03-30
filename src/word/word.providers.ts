import { DataSource } from 'typeorm';
import { WordEntity } from './word.entity';
export const wordProviders = [
  {
    provide: 'WordRepositoryToken',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(WordEntity),
    inject: ['DATABASE_CONNECTION'],
  },
];
