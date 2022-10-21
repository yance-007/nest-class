import { BeforeInsert, Column, Entity, ObjectIdColumn, Unique } from 'typeorm';

@Entity()
@Unique(['name'])
export class User {
  @ObjectIdColumn()
  id?: number;

  @Column()
  name!: string;

  @Column()
  age!: number;

  @Column({ default: 0 })
  gender!: number;
}
