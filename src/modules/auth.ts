import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const comparePasswords = (password, hashedPass) => {
    return bcrypt.compare(password, hashedPass)
} 

export const hashPass = (pass) => {
    return bcrypt.hash(pass, 5)
}

export const createJWT = (user) => {
    const token = jwt.sign({
            id: user.id, 
            username: user.username
        },
        process.env.JWT_SECRET
    )
    return token
}

export const protect = (req, res, next) => {
    // bearer is an auth design pattern
    const bearer = req.headers.authorization
    
    if(!bearer){
        res.status(401)
        res.json({message: 'not authorized'})
        return
    }

    // split, note bearer syntax "Bearer sdfsd23wdsdf.."
    const [, token] = bearer.split(' ')

    if (!token) {
        res.status(401)
        res.json({message: 'not valid token'})
        return
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET)
        req.user = user
        next()
    } catch (e) {
        console.error(e)
        res.status(401)
        res.json({message: 'not valid token'})
        return
    }
}
