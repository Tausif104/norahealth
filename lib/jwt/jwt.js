import { sign, verify } from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET

const signToken = (payload) => {
  return sign(payload, SECRET, { expiresIn: '30d' })
}

const verifyToken = (token) => {
  try {
    return verify(token, SECRET)
  } catch (error) {
    return null
  }
}

export { signToken, verifyToken }
