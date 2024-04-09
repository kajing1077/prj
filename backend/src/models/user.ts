// import bcrypt from 'bcrypt';
// import pool from '../utils/mysql';
// import { RowDataPacket } from 'mysql2/promise';
//
// class User {
//     static async create(email: string, password: string): Promise<void> {
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
//         const values = [email, hashedPassword];
//
//         try {
//             await pool.query(query, values);
//         } catch (error) {
//             throw error;
//         }
//     }
//
//     static async findByEmail(email: string): Promise<User | null> {
//         const query = 'SELECT * FROM users WHERE email = ?';
//         const [rows] = await pool.query<RowDataPacket[]>(query, [email]);
//         const user = rows[0];
//         return user ? new User(user.email, user.password) : null;
//     }
//
//     constructor(public email: string, public password: string) {}
// }
//
// export default User;
// import bcrypt from 'bcrypt';
// import connectionPromise, {doQuery} from '../utils/mysql';
// import { RowDataPacket } from 'mysql2/promise';
//
// class User {
//     email: string;
//     password: string;
//
//     constructor(id: number, email: string, password: string) {
//         this.email = email;
//         this.password = password;
//     }
//
//     static async create(email: string, password: string): Promise<User | null> {
//         try {
//             const hashedPassword = await bcrypt.hash(password, 10);
//             const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
//             const [result] = await pool.query(query, [email, hashedPassword]);
//             const insertedId = (result as RowDataPacket).insertId;
//             return new User(insertedId, email, hashedPassword);
//         } catch (error) {
//             console.error('Error creating user:', error);
//             return null;
//         }
//     }
//
//     static async findOne(email: { email: string }): Promise<User | null> {
//         const query = 'SELECT * FROM users WHERE email = ?';
//         const [rows] = await pool.query<RowDataPacket[]>(query, [email]);
//         const userData = rows[0];
//         if (!userData) {
//             return null;
//         }
//         return new User(userData.id, userData.email, userData.password);
//     }
//
//     static findByEmail = async (email: string): Promise<User | null> => {
//         const [rows] = await doQuery((connection) =>
//             connection.execute<RowDataPacket[]>(`SELECT email, encrypted_password FROM users WHERE email = ?`, [email]),
//         );
//
//         const [row] = rows ?? [];
//         if (!row) {
//             return row;
//         }
//
//         return new User(
//             row.email,
//             row.encrypted_password,
//         );
//     }
//
//
//
// }
//
// export default User;
export class User {
    private email: string;
    private password: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }

    static async create({ email, password }: { email: string, password: string }) {
        return new User(email, password);
    }

    getEmail() {
        return this.email;
    }

    getPassword() {
        return this.password;
    }
}
