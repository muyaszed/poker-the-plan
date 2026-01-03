import 'server-only'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
 
export async function createSession(user: {
  id: string;
  userName: string;
}, token: string) {
  const cookieStore = await cookies()
 
  cookieStore.set('session', JSON.stringify({
    userId: user.id,
    userName: user.userName,
    token,
  }), {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
  })
}

export async function verifySession(): Promise<{
  isAuth: boolean;
  userId: string | null;
  token: string | null,
  userName: string | null;

}> {  
  const cookieStore = await cookies()
 
  const session = cookieStore.get('session');

  if (!session) {
    return {
    isAuth: false,
    userId: null,
    token: null,
    userName: null
  }
  }
  const {userId, token, userName} = JSON.parse(session.value);
  return {
    isAuth: true,
    userId,
    token,
    userName
  }
}

export async function verifySessionAndRedirect() {
  const response = await verifySession();

  if (!response.isAuth) {
    redirect('/auth/signin');
  }

  return {
    isAuth: true,
    userId: response.userId,
    token: response.token,
    userName: response.userName
  }
}


export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
}