import { RequestHandler, NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'


export interface JwtPayload {
    id: string
    role: string
}

export const isOwner = async (
    req: { user: JwtPayload } & Request, 
    res: Response, 
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params
        const currentUser = req.user

        if (!currentUser) {
            res.status(401).json({ message: "You are not authenticated" })
            return
        }
            
        if (currentUser.id !== id) {
            res.status(403).json({ message: 'You are not the owner to perform this action' })
            return
        } else {
            next()
        }

    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "There is an error" })
        return
    }
}

export const isAdmin = async (
    req: { user: JwtPayload } & Request, 
    res: Response, 
    next: NextFunction
): Promise<void> => {
    try {
        const currentUser = req.user

        if (!currentUser) {
            res.status(401).json({ message: "You are not authenticated" })
            return
        }
            
        if (currentUser.role !== 'admin') {
            res.status(403).json({ message: 'You are not an admin to perform this action' })
            return
        } else {
            next()
        }

    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "There is an error" })
        return
    }
}

export const isAuthenticated = async (
    req: { user: JwtPayload } & Request, 
    res: Response, 
    next: NextFunction
): Promise<void> => {
    const token = req.cookies?.accessToken

    if (!token) {
        res.status(401).json({ message: 'No access token, authorization denied' })
        return
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload
        req.user = decoded
        
        next()
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid or has expired' })
        return
    }
}