import express from 'express';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv"
import { findByEmail, save } from '../models/user.repository'

dotenv.config();

const router = express.Router();

/**
 * 사용자 생성 API
 *
 * @route POST /users
 * @param {string} email - 사용자 이메일
 * @param {string} password - 사용자 비밀번호
 * @returns {number} - HTTP 상태 코드
 */
router.post('/users', async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.create({ email, password });
        save(user);
    } catch (error) {
        throw error;
    }
    res.sendStatus(201);
});

/**
 * 로그인 API
 *
 * @route POST /login
 * @param {string} email - 사용자 이메일
 * @returns {number} - HTTP 상태 코드
 */
router.post('/login', async (req, res) => {
    const { email } = req.body;
    const findEmail = await findByEmail(email);
    if (!findEmail) {
        res.sendStatus(404);
        return;
    }

    /**
     * 액세스 토큰입니다.
     *
     * @type {string}
     */
    const accessToken = jwt.sign({ email }, process.env.JWT_SECRET as string, { expiresIn: '14d' });

    res.cookie('access-token', accessToken, {
        maxAge: 1000 * 60 * 60 * 24 * 14,
        httpOnly: true,
    });

    res.sendStatus(204);
})

/**
 * 내 정보 조회 API
 *
 * @route GET /users/me
 * @returns {Object} - 사용자 정보
 * @returns {string} email - 사용자 이메일
 */
router.get('/users/me', async (req, res) => {
    const token = req.cookies['access-token'];
    if (!token) {
        res.sendStatus(401);
        return;
    }

    jwt.verify(token, process.env.JWT_SECRET as string, async (error: any, decoded: any) => {
        if (error) {
            res.sendStatus(401);
            return;
        }

        const user = await findByEmail(decoded.email);
        if (!user) {
            res.sendStatus(404);
            return;
        }

        res.json({ email: user.getEmail() });
    });
});

/**
 * 로그아웃 API
 *
 * @route DELETE /logout
 * @returns {number} - HTTP 상태 코드
 */
router.delete('/logout', async (req, res) => {
    res.clearCookie('access-token');

    res.sendStatus(204);
})

export default router;