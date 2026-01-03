import { verifySession, verifySessionAndRedirect } from "../../auth/session";
import { getRoom } from "./action"
import LeaveButton from "./compopnents/leaveButton";
import RoomNotification from "./compopnents/roomNotification";
import UserInRoom from "./compopnents/userInRoom";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const room = await getRoom(id);
  const { userId, userName } = await verifySessionAndRedirect();
 
  return (
    <div className="flex flex-col gap-10 p-5">
      <h1>{room.name}</h1>

      <div className="flex flex-col border-2 p-5">
        <div className="border-b-2">Pepople in the room</div>
        <UserInRoom roomUser={room.users} />
      </div>

      <LeaveButton roomId={room.id} userId={userId} userName={userName}/>
      <RoomNotification />

    </div>
  )
}