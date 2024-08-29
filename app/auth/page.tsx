import SigninComponent from "@/components/signInCompo";
import { NEXT_AUTH } from "@/lib/auth";
import { getServerSession } from "next-auth";
const  Auth = async() => {
    const session = await getServerSession(NEXT_AUTH)
    return <div>
        {JSON.stringify(session.user.id)}
        <SigninComponent />
    </div>
}
export default Auth
