import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  userName: string;

  @Column('varchar')
  password: string;

  @Column('varchar', { nullable: true })
  name: string;

  @Column('varchar', { nullable: true })
  email: string;

  @Column('text', { nullable: true })
  avatar: string;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createTime: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updateTime: Date;
}
