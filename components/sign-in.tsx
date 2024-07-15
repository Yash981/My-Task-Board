"use client"
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";


export function SignIn(){
  const onclick = (provider: string) => {
    signIn(provider, { callbackUrl: "/" })


  }
  return (
    <Button type="submit" onClick={() => onclick('github')}>Signin with GitHub</Button>
  )
} 