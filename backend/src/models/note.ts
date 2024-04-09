// import { RowDataPacket } from 'mysql2';
// //import pool from '../utils/mysql';
//
// // NoteRow 인터페이스 정의
// interface NoteRow extends RowDataPacket {
//     id: number;
//     title: string;
//     content: string;
//     user_id: number;
//     created_at: Date;
//     updated_at: Date;
// }
//
// class Note {
//     id: number;
//     title: string;
//     content: string;
//     userId: number;
//     createdAt: Date;
//     updatedAt: Date;
//
//     constructor(id: number, title: string, content: string, userId: number, createdAt: Date, updatedAt: Date) {
//         this.id = id;
//         this.title = title;
//         this.content = content;
//         this.userId = userId;
//         this.createdAt = createdAt;
//         this.updatedAt = updatedAt;
//     }
//
//     static async findById(noteId: number): Promise<Note | null> {
//         const [rows] = await pool.query<NoteRow[]>('SELECT * FROM notes WHERE id = ?', [noteId]);
//         const noteData = rows[0];
//         if (!noteData) {
//             return null;
//         }
//         return new Note(
//             noteData.id,
//             noteData.title,
//             noteData.content,
//             noteData.user_id,
//             new Date(noteData.created_at),
//             new Date(noteData.updated_at)
//         );
//     }
//
//     static async create(title: string, content: string, userId: number): Promise<Note> {
//         const [result] = await pool.query('INSERT INTO notes (title, content, user_id) VALUES (?, ?, ?)', [title, content, userId]);
//         const insertedId = (result as RowDataPacket).insertId;
//         return new Note(insertedId, title, content, userId, new Date(), new Date());
//     }
// }
//
// export default Note;
