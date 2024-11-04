
interface IToken {
    httpOnly: boolean
    secure: boolean
    sameSite: 'strict' | 'lax' | 'none'
    maxAge: number
}

export const accessTokenOpt: IToken = {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 15 * 60 * 1000, // 15 minutes
}

export const refreshTokenOpt: IToken = {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
}