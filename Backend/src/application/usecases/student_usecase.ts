import { IStudent_Repository } from '@/domain/repositories/studentRepository'
import { Student, Public_Student } from '@/domain/entities/Student'
import { IAuth_Service } from '@/domain/services/IAuth_Services'

export class Student_Usecase {
    constructor (
        private readonly student_repo : IStudent_Repository,
        private readonly auth_service : IAuth_Service
    ){}

    async getAll() : Promise<Public_Student[]> {
        return this.student_repo.getAll();
    }

    async getById(id : number) : Promise<Student | null> { 
        return this.student_repo.getById(id);
    } 

    async findByEmail(email : string) : Promise<Student | null> {
        return this.student_repo.findByEmail(email);
    }

    async create(student : Omit<Student,'id'>) : Promise<Public_Student> {
        const hashed_password = await this.auth_service.hash_password(student.password);
        return this.student_repo.create({...student , password : hashed_password});
    }

    async compare_password(raw : string, hashed : string) : Promise<boolean> {
        return this.auth_service.compare_password(raw,hashed);
    }

    async update(id : number, student : Partial<Omit<Student, 'id' | 'password'>>) : Promise<Public_Student | null> {
        return this.student_repo.update(id, student)
    }

    async delete(id : number) : Promise<boolean> {
        return this.student_repo.delete(id);
    }
}