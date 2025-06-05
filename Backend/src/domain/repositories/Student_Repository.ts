import { Student,Public_Student } from '../entities/Student'

export interface IStudent_Repository {
    getAll() : Promise<Public_Student[]>;
    getById(id : number) : Promise<Public_Student | null>;
    create(student : Omit<Student , 'id' >) : Promise<Public_Student>;
    update(id : number, student : Partial<Omit<Student , 'id' | 'password' >>) : Promise<Public_Student | null>;
    delete(id : number) : Promise<boolean>;
}

