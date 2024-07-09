import { db } from "@/lib/db"

export const getAccountByUserId = async (userId: string) => {
    try {
    const account = await db.account.findFirst({
        where: {
            userId
        }
    })
    // console.log(account)
    return account
    } catch (error) {
        return null
    }
}