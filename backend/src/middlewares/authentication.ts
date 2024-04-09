// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";
//
// export async function authenticateUser(req: Request, res: Response, next: NextFunction) {
//     const accessToken = req.cookies["access-token"];
//     if (!accessToken) {
//         return res.sendStatus(401);
//     }
//
//     jwt.verify(accessToken, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
//         if (err) return res.sendStatus(403)
//
//         req.user = user
//
//         next()
//     })
// }
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            user: any;
        }
    }
}

export async function authenticateUser(req: Request, res: Response, next: NextFunction) {
    const accessToken = req.cookies["access-token"];
    if (!accessToken) {
        return res.sendStatus(401);
    }

    jwt.verify(accessToken, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
        if (err) return res.sendStatus(403)

        req.user = user

        next()
    })
}
