import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, type Relation } from 'typeorm'
import type { File } from './File'

@Entity('folders')
export class Folder {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  name!: string

  @Column({ nullable: true })
  parentId?: string

  @ManyToOne('Folder', 'children', { nullable: true, onDelete: 'CASCADE' })
  parent?: Relation<Folder>

  @OneToMany('Folder', 'parent')
  children!: Relation<Folder[]>

  @OneToMany('File', 'folder')
  files!: Relation<File[]>

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}
