import { create } from "zustand"

export interface Student {
  id: string
  name: string
  email: string
  age: number
}

interface StudentsState {
  students: Student[]
  addStudent: (student: Omit<Student, "id">) => void
  updateStudent: (student: Student) => void
  deleteStudent: (id: string) => void
}

// Mock data for demonstration
const mockStudents: Student[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice.johnson@email.com",
    age: 20,
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob.smith@email.com",
    age: 22,
  },
  {
    id: "3",
    name: "Carol Davis",
    email: "carol.davis@email.com",
    age: 19,
  },
  {
    id: "4",
    name: "David Wilson",
    email: "david.wilson@email.com",
    age: 21,
  },
  {
    id: "5",
    name: "Emma Brown",
    email: "emma.brown@email.com",
    age: 23,
  },
  {
    id: "6",
    name: "Frank Miller",
    email: "frank.miller@email.com",
    age: 20,
  },
]

export const useStudents = create<StudentsState>((set) => ({
  students: mockStudents,
  addStudent: (studentData) => {
    const newStudent: Student = {
      ...studentData,
      id: Date.now().toString(),
    }
    set((state) => ({
      students: [...state.students, newStudent],
    }))
  },
  updateStudent: (updatedStudent) => {
    set((state) => ({
      students: state.students.map((student) => (student.id === updatedStudent.id ? updatedStudent : student)),
    }))
  },
  deleteStudent: (id) => {
    set((state) => ({
      students: state.students.filter((student) => student.id !== id),
    }))
  },
}))
