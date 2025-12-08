import { SignJWT, jwtVerify } from 'jose'

const SECRET = process.env.JWT_SECRET

const signToken = async (payload) => {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('30d')
    .sign(new TextEncoder().encode(SECRET))
}

const verifyToken = async (token) => {
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(SECRET))
    return payload
  } catch (error) {
    return null
  }
}

export { signToken, verifyToken }
