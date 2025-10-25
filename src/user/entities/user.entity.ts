import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  Timestamp,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({})
  password?: string;

  @Column({ nullable: true })
  googleId?: string;

  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column({ nullable: true })
  nickName?: string;

  @Column({ nullable: true })
  birthDate?: string;

  @Column({ nullable: true })
  gender?: string;

  @Column({ nullable: true })
  country?: string;

  @Column({ nullable: true })
  avatar?: string;

  @Column({ nullable: true })
  phoneNumber?: string;

  @Column({ default: false })
  isEmailConfirmed: boolean;

  @Column({ default: false })
  isPhoneNumberConfirmed: boolean;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Timestamp;

  @UpdateDateColumn()
  updatedAt: Timestamp;
}
