import { RequestHandler, NextFunction, Request, Response } from 'express'
import { get } from 'lodash'
import jwt from 'jsonwebtoken'


export interface JwtPayload {
    id: string
    role: string
}

export const isOwner: RequestHandler = async (req, res, next: NextFunction) => {
    try {
        const { id } = req.params
        const currentStudentId = get(req, 'identity._id') as string

        if (!currentStudentId) {
            res.sendStatus(403)
        }
            
        if (currentStudentId.toString() !== id) {
            res.json({ message: 'You are not the owner to perform this action' })
        }

        next()
    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }
}

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const token = req.cookies?.accessToken

    if (!token) {
        return res.status(401).json({ message: 'No access token, authorization denied' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload
        (req as any).user = decoded
        
        next()
    } catch (err) {
        return res.status(401).json({ message: 'Token is not valid or has expired' })
    }
}