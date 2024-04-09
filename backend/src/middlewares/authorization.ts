// import { Request, Response, NextFunction } from "express";
// import pool from '../utils/mysql';
// import {RowDataPacket} from "mysql2";
// import Note from "../models/note"
//
// export async function authorizeNote(req: Request, res: Response, next: NextFunction) {
//     try {
//         // 인증된 사용자 확인
//         const user = req.user;
//         if (!user) {
//             return res.sendStatus(401); // 인증되지 않은 경우 401(Unauthorized) 반환
//         }
//
//         // 노트 ID 추출
//         const noteId = req.params.noteId;
//
//         // 노트를 데이터베이스에서 조회
//         const [rows, fields] = await pool.query<RowDataPacket[]>('SELECT * FROM notes WHERE id = ? AND user_id = ?', [noteId, user.id]);
//
//         const noteData = rows[0];
//
//         // 노트가 존재하지 않는 경우 404(Not Found) 반환
//         if (!noteData) {
//             return res.sendStatus(404);
//         }
//
//         const note = new Note(
//             noteData.id,
//             noteData.title,
//             noteData.content,
//             noteData.userId,
//             noteData.createdAt,
//             noteData.updatedAt
//         );
//
//         // 권한이 있는 경우 다음 미들웨어로 제어를 넘김
//         req.note = note;
//         next();
//     } catch (error) {
//         console.error("Error in authorizeNote middleware:", error);
//         res.sendStatus(500); // 내부 서버 오류 발생 시 500(Internal Server Error) 반환
//     }
// }
