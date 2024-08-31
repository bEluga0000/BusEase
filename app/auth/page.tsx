import SigninComponent from "@/components/signInCompo";
import { NEXT_AUTH } from "@/lib/auth";
import { getServerSession } from "next-auth";
const  Auth = async() => {
    const session = await getServerSession(NEXT_AUTH)
    return <div>
        <SigninComponent />
    </div>
}
export default Auth
