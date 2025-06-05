export interface Student {
    id : number;
    name : string;
    email : string;
    password : string
}

export type Public_Student =  Omit<Student , 'password' >;