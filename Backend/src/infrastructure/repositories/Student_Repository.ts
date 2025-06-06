import { IStudent_Repository } from '@/domain/repositories/studentRepository';
import { Public_Student, Student } from '@/domain/entities/Student';
import { pool } from '../database';


export class Student_Repository implements IStudent_Repository {

    async getAll(): Promise<Student[]> {

        const res = await pool.query('SELECT id,name,email FROM students')
        return res.rows;
    }

    async getById(id: number): Promise<Public_Student | null> {
        const res = await pool.query('SELECT id,name,email FROM students WHERE id = $1',[id]);
        return res.rows[0] || null;
    }

    async findByEmail(email : string) : Promise<Public_Student | null> {
        const res = await pool.query('SELECT id,name,email FROM students WHERE email = $1',[email])
        return res.rows[0] || null;   
    }

    async create(student: Omit<Student, 'id'>): Promise<Public_Student> {
        const res = await pool.query(
            'INSERT INTO students (name,email,password) values ($1, $2, $3) RETURNING id, name, email',
            [student.name, student.email, student.password]
        )
        return res.rows[0];
    }

    async update(id: number, student: Partial<Omit<Student, 'id' | 'password'>>): Promise<Public_Student | null> {
        const current = await this.getById(id);
        if(!current) return null;

        const updated = {
            name : student.name || current.name,
            email : student.email || current.email,
        }

        const res = await pool.query('UPDATE students SET name = $1, email = $2 WHERE id = $3 RETURNING id, name, email',
            [updated.name,updated.email,id]
        )

        return res.rows[0];
    }

    async delete(id: number): Promise<boolean> {
        const res = await pool.query('DELETE FROM students WHERE id = $1',[id]);
        return res.rowCount !== null && res.rowCount > 0;
    }
}