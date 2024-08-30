import { NEXT_AUTH } from "@/lib/auth"
import { getServerSession } from "next-auth"

const ProfilePic =async () => {
    const serverSideSession:any = await getServerSession(NEXT_AUTH)
    return <div>
        <div>
            <img src={serverSideSession.user.image} alt="Profile Pic"  className="w-12 rounded-full"/>
        </div>
    </div>
}
export default ProfilePic