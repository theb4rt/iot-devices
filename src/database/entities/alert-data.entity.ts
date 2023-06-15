import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AlertData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  alert: string;

  @Column({ type: 'varchar', length: 50 })
  sensor: string;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  value: number;
}
