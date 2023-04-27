import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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
  imageUrl: string;

  @Column('varchar')
  audioSrc: string;

  @Column('varchar', { length: 500 })
  extra: string;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createTime: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updateTime: Date;
}
