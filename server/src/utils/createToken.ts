import jwt from 'jsonwebtoken'

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
        { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d' }
    );
};