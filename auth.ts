import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/lib/db"
import authConfig from "./auth.config"
import { getUserById } from "./data/get-user"
import { getAccountByUserId } from "./data/get-account"
 
 
export const { handlers, signIn,signOut,auth } = NextAuth({
  callbacks:{
    async signIn({ user , account}){
      // console.log({user,account})
      //Allow OAuth (google,github) without verification
      if(account?.provider !== "credentials"){
        return true
      }
      if(!user.id){
        return false
      }
      const existingUser = await getUserById(user.id)
      
      //prevent sign in without email verification
      if(!existingUser?.emailVerified){
        return false 
      }
  
      return true
    },

    async session({token, session}) {
      if(token.sub && session.user) {
        session.user.id = token.sub
      }
      if (token.role && session.user) {
      }
      if (session.user) {
      }
      if(session.user ) {
        session.user.name = token.name;
        //@ts-ignore
        session.user.email = token.email;
      }
      return session
    },
    async jwt({  token }) {
      if(!token.sub) return token;
      // console.log(token,`token`)
      const existingUser = await getUserById(token.sub)
      if(!existingUser) {
        return token
      }
      // console.log(existingUser, 'existinguser')
      const existingAccount = await getAccountByUserId(existingUser.id)
      token.isOAuth = !!existingAccount
      token.name = existingUser.name
      token.email = existingUser.email

      // console.log(token, 'token','jwt',existingAccount)
      return token
  }
},
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
})