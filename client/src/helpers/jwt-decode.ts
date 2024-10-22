import {jwtDecode} from "jwt-decode"
import moment from "moment"

export const tokenExpiration = (token: string) => {
    try {
        const decodeToken: { exp?: number } = jwtDecode(token)
        if (decodeToken.exp) {
            const tokenDateExp = new Date(decodeToken.exp * 1000)

            return moment(tokenDateExp).format('lll')
        }
    } catch (error) {
        console.error('Error decoding token: ', error)
        return true
    }
}

export const isTokenExpired = (token: string) => {
    try {
        const decodeToken: { exp?: number } = jwtDecode(token)
        const currentTime = Date.now() / 1000

        if (decodeToken.exp) {
            // const tokenDateExp = new Date(decodeToken.exp * 1000)

            if (decodeToken.exp < currentTime) return true
                else return false
            // return console.log('Token expiration: ' + moment(tokenDateExp).format('lll'))
        } else {
            return console.log('Token does not have expiration date')
        }

    } catch (error) {
        console.error('Error decoding token: ', error)
        return true
    }
}