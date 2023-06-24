import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class DBConfig {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  session_id!: string

  @Column()
  type!: string;

  @Column()
  host!: string;

  @Column({ default: null })
  user?: string;

  @Column({ default: null })
  password?: string;

  @Column({ default: null })
  database?: string;
}
