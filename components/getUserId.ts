
import { auth } from "@/auth"


export const getUserId = async () => {
    const session = await auth()
    // console.log(session)
    return session?.user?.id
}