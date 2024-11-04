import jwt from 'jsonwebtoken'
import { RefreshTokenModel } from '../models/refresh_token';

export const generateToken = (id: string, role: string) => {
    return jwt.sign(
        { id, role }, 
        process.env.JWT_SECRET as string, 
        { expiresIn: '15m' }
    )
}

export const generateRefreshToken = (id: string, role: string) => {
    return jwt.sign(
        { id, role },
        process.env.JWT_REFRESH_SECRET as string,
        { expiresIn: '7d' }
    );
};

export const createRefreshTokenOnDB = (id: string, token: string) => {
    const createRefreshToken = new RefreshTokenModel({
        user: id,
        refresh_token: token,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Expires in 7 days
    })
    return createRefreshToken
}

export const createTokens = (id: string, role: string) => {
    const accessToken = generateToken(id, role)
    const refreshToken = generateRefreshToken(id, role)

    return {
        accessToken,
        refreshToken
    }
}