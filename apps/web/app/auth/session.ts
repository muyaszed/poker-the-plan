import 'server-only'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
 
export async function createSession(userId: string, token: string) {
  const cookieStore = await cookies()
 
  cookieStore.set('session', JSON.stringify({
    userId,
    token,
  }), {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
  })
}

export async function verifySession() {
  const cookieStore = await cookies()
 
  const session = cookieStore.get('session');

  if (!session) {
    redirect('/auth/signup')
  }
const {userId, accesToken} = JSON.parse(session.value);
  return {
    isAuth: true,
    userId,
    token: accesToken,
  }
}