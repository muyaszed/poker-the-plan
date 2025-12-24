import { verifySession } from "../auth/session"



export default async function Page() {
    const session = await verifySession();
    return (
        <>
            <div className="title p-5">Profile</div>
            <div className="title p-5">userId: ${session.userId}</div>
            
        </>
    )
    
}