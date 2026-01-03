import { verifySessionAndRedirect } from "../auth/session"
// import WebSocket from "../component/webSocket";

export default async function Page() {
    const session = await verifySessionAndRedirect();
    return (
        <>
            {/* { session.isAuth && session.token && <WebSocket token={session.token} />} */}
            <div className="title p-5">Profile</div>
            <div className="title p-5">userId: ${session.userId}</div>
            
        </>
    )
    
}