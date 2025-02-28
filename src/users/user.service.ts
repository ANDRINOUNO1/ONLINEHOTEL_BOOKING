import { Repository } from 'typeorm';
import { AppDataSource } from '../helpers/db';
import { Customer } from './hotel_reservation_entity';
import { Room } from './hotel_reservation_entity';
import { Reservation } from './hotel_reservation_entity';
import { Router } from 'express';

export class CustomerService {
    private customerRepository: Repository<Customer> = AppDataSource.getRepository(Customer);

    async getAll() {
        return this.customerRepository.find();
    }

    async getById(id: number) {
        return this.customerRepository.findOneBy({ id });
    }

    async create(data: Partial<Customer>) {
        if (await this.customerRepository.findOneBy({ email: data.email })) {
            throw new Error(`Email ${data.email} is already registered`);
        }

        const customer = this.customerRepository.create(data);
        return this.customerRepository.save(customer);
    }

    async update(id: number, data: Partial<Customer>) {
        const customer = await this.getById(id);
        if (!customer) throw new Error('Customer not found');

        Object.assign(customer, data);
        return this.customerRepository.save(customer);
    }

    async delete(id: number) {
        const customer = await this.getById(id);
        if (!customer) throw new Error('Customer not found');

        return this.customerRepository.remove(customer);
    }
}

export class RoomService {
    private roomRepository: Repository<Room> = AppDataSource.getRepository(Room);

    async getAll() {
        return this.roomRepository.find();
    }

    async getById(id: number) {
        return this.roomRepository.findOneBy({ id });
    }

    async create(data: Partial<Room>) {
        const room = this.roomRepository.create(data);
        return this.roomRepository.save(room);
    }

    async update(id: number, data: Partial<Room>) {
        const room = await this.getById(id);
        if (!room) throw new Error('Room not found');

        Object.assign(room, data);
        return this.roomRepository.save(room);
    }

    async delete(id: number) {
        const room = await this.getById(id);
        if (!room) throw new Error('Room not found');

        return this.roomRepository.remove(room);
    }
}

export class ReservationService {
    private reservationRepository: Repository<Reservation> = AppDataSource.getRepository(Reservation);

    async getAll() {
        return this.reservationRepository.find();
    }

    async getById(id: number) {
        return this.reservationRepository.findOneBy({ id });
    }

    async create(data: Partial<Reservation>) {
        const reservation = this.reservationRepository.create(data);
        return this.reservationRepository.save(reservation);
    }

    async update(id: number, data: Partial<Reservation>) {
        const reservation = await this.getById(id);
        if (!reservation) throw new Error('Reservation not found');

        Object.assign(reservation, data);
        return this.reservationRepository.save(reservation);
    }

    async delete(id: number) {
        const reservation = await this.getById(id);
        if (!reservation) throw new Error('Reservation not found');

        return this.reservationRepository.remove(reservation);
    }
}