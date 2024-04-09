import { type RowDataPacket } from 'mysql2'
import { doQuery } from '../utils/mysql';
import { User } from '../models/user';

export const save = async (user: User): Promise<boolean> => {
    try {
        await doQuery((connection) =>
            connection.execute(
                `INSERT INTO users (email, encrypted_password) VALUES (?, ?)`,
                [user.getEmail(), user.getPassword()],
            ),
        );
        return true;
    } catch (error: any) {
        if (/Duplicate entry/.test(error.message)) {
            return false;
        }
        throw error;
    }
};

export const findByEmail = async (email: string): Promise<User | null> => {
    const [rows] = await doQuery((connection) =>
        connection.execute<RowDataPacket[]>(`SELECT email, encrypted_password FROM users WHERE email = ?`, [email]),
    );

    const [row] = rows ?? [];
    if (!row) {
        return row;
    }

    return new User(
        row.email,
        row.encrypted_password,
    );
}