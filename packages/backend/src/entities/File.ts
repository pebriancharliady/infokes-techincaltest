import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, type Relation } from 'typeorm'
import type { Folder } from './Folder'

@Entity('files')
export class File {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  name!: string

  @Column({ nullable: true })
  folderId?: string

  @ManyToOne('Folder', 'files', { nullable: true, onDelete: 'CASCADE' })
  folder?: Relation<Folder>

  @Column({ nullable: true })
  size?: number

  @Column({ nullable: true })
  mimeType?: string

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}
