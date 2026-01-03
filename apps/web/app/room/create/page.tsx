import { verifySessionAndRedirect } from "../../auth/session";
import { createNewRoom, getAllRooms, getMyRooms } from "./action";
import { RoomList } from "./components/roomList";

export default async function Page() {
    const data = await getAllRooms();
    const myRooms = await getMyRooms();
    const {userId, userName} = await verifySessionAndRedirect();

    return (
        <div className="flex">
            <div className="new-room-form-container flex flex-col w-[60%] p-10">
                <div className="title mb-5">Create new room</div>
                <form action={createNewRoom} className="flex flex-col gap-10">
                    <input className="border-2 p-2 border-gray-200" type="text" name="name" placeholder="Name" required />
                    
                    <div className="create-room-button-wrapper flex justify-end">
                        <button className="w-35 bg-blue-200 p-2 cursor-pointer" type="submit">Create</button>
                    </div>
          
            
                </form>
            </div>
            
            <RoomList data={data} myRooms={myRooms} userId={userId} userName={userName}/>
        </div>
    )
    
}