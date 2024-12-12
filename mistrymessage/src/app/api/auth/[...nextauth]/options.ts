import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbconnection";
import UserModel from "@/model/User";
import { promises } from "dns";
import { pages } from "next/dist/build/templates/app-page";

export const authOptions: NextAuthOptions = {
  providers:[
    CredentialsProvide({
      id: "credentials",
      name: "credentials", 
      credentials: {
        username: { label: "Email", type: "text " },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any>{
        await dbConnect()
        try{
           const user = await UserModel.findOne({
                $or:[
                    {email:credentials.username},
                    {username:credentials.username}
                ]
             })
             if(!user)
             {
                throw new Error("No user found with this email");
             }
             if(!user.isVerified)
             {
                throw new Error("Please verify your account before login");
             }
             const isPassword = await bcrypt.compare(credentials.password,user.password);

             if(!isPassword)
             {
                return user;
             }
             else{
                throw new Error("Password is not correct Please enter correct password");
             }
        }catch(err:any){
          throw new Error(err);
        }

      }
    }),
  ],
  callbacks:{
    async jwt({token, user}) {
        return token
    }
  }
  pages: {
    signIn: '/sign-in'
},
session: {
    strategy: "jwt"
},
secret: process.env.NEXTAUTH_SECRET,
};
