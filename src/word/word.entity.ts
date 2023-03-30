import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class WordEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  text: string;

  @Column('varchar')
  enTranslation: string;

  @Column('varchar')
  zhTranslation: string;

  @Column('varchar', { length: 500 })
  example: string;

  @Column('varchar')
  pronunciation: string;

  @Column('varchar')
  audioSrc: string;

  @Column('varchar', { length: 500 })
  extra: string;

  @Column('timestamp')
  createTime: Date;

  @Column('timestamp')
  updateTime: Date;
}
