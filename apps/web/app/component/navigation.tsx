import Link from "next/link";
import { logout } from "../auth/action";
import { verifySession } from "../auth/session";

export default async function Navigation() {
  const { isAuth } = await verifySession();

  return (
    <div className="flex flex-col">
      <div className="menu flex gap-10">
        {
          isAuth ?
          (
            <>
                <form action={logout}>
                <button type="submit">Signout</button>
                </form>
                <Link href="room/create">Create a room</Link>
            </>
            
          ) :
          ( 
            <>
              <Link href="auth/signin">Sign In</Link>
              <Link href="auth/signup">Sign Up</Link>
            </>
          )
        }
        
      </div>
    </div>
  );
}
