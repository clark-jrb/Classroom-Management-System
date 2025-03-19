import { Request, Response } from "express"
import { generateToken } from "./createToken"
import { RefreshTokenModel } from "../models/refresh_token"
import { JwtPayload } from "middlewares"
import jwt from 'jsonwebtoken'

export const refresh = async (req: Request, res: Response): Promise<any> => {
    const { refreshToken } = req.cookies
    
    if (!refreshToken) {
        return res.status(403).json({ message: 'Refresh token is required' })
    }

    // Check if the refresh token exists in the database
    //
    const existingToken = await RefreshTokenModel.findOne({ refresh_token: refreshToken })

    if (!existingToken) {
        return res.status(403).json({ message: 'Invalid refresh token' })
    }
    

    // Check if the refresh token has expired (if expired, redirect to login page)
    //
    if (existingToken.expiresAt < new Date()) {
        return res.status(403).json({ message: 'Refresh token has expired, you need to log in again' })
    }

    // Generate new access token if refresh token is not yet expired
    //

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET as string) as JwtPayload
        const newAccessToken = generateToken(decoded.id, decoded.role)

        return res
            .cookie("accessToken", newAccessToken, {
                httpOnly: true,
                secure: true, // Enable in a production environment with HTTPS
                sameSite: "lax",
                maxAge: 60 * 60 * 1000, // 60 minutes
                // maxAge: 15 * 1000, // 15 seconds (for testing)
            })
            .json({ message: "Generated new access token" })
        } catch (error) {
        return res.status(403).json({ message: error })
    }
}