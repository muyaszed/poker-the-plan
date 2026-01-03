'use client'

export interface UserInRoomProps {
    roomUser: any[];
}
export default function UserInRoom({ roomUser }: UserInRoomProps) {
    return roomUser.map((user: any) => <div className="pt-2 pb-2" key={user.username}>{user.username}</div>)
}