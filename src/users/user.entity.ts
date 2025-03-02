import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Role } from '../helpers/role';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string;

    @Column({ nullable: true })
    title?: string;

    @Column()
    firstName!: string;

    @Column()
    lastName!: string;

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.User
    })
    role!: Role;
}

@Entity('customers')
export class Customer {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    email!: string;

    @Column()
    phoneNumber!: string;

    @Column()
    address!: string;

    @Column()
    firstName!: string;

    @Column()
    lastName!: string;
}

@Entity('rooms')
export class Room {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    roomNumber!: string;

    @Column()
    floor!: number;

    @Column()
    building!: string;

    @Column()
    roomType!: string;

    @Column('decimal')
    pricePerNight!: number;

    @Column({ default: true })
    isAvailable!: boolean;
}

@Entity('reservations')
export class Reservation {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    customerId!: number;

    @Column()
    roomId!: number;

    @Column('date')
    arrivalDate!: Date;

    @Column('date')
    departureDate!: Date;

    @Column('decimal')
    totalAmount!: number;

    @Column({ default: 'pending' })
    status!: string;
}