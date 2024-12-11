import dbConnect from "@/lib/dbconnection";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";


export async function POST(request:Request)
{
    try{
        const { username,email, password } = await request.json();

        const exitingUserVerifiedByUsername = await UserModel.findOne({
            username,
            isVerified:true
        })
        if(exitingUserVerifiedByUsername)
        {
            return Response.json({
                success: false,
                message: "Username is already taken"
            }, {status:400})
        }
          const exitingUserVerifiedByEmail = await UserModel.findOne({
            email,
          })
          const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
          if(exitingUserVerifiedByEmail)
          {
            if(exitingUserVerifiedByEmail.isVerified)
            {
                return Response.json({
                    success: false,
                    message: "User already exits with this email"
                }, {status:400})
            }else{
                const hasedPassword = await bcrypt.hash(password,10);
                exitingUserVerifiedByEmail.password = hasedPassword;
                exitingUserVerifiedByEmail.verifyCode = verifyCode;
                exitingUserVerifiedByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
                await exitingUserVerifiedByEmail.save();
            }

          }else{
            const hasedPassword = await bcrypt.hash(password,10);
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);

           const newUser = new UserModel({
                username,
                email,
                password: hasedPassword,
                verifyCode: verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified:false,
                isAcceptingMessage: true,
                message: []
            })
            await newUser.save();
          }

          //send email
          const emailResponse =await sendVerificationEmail(
            email,
            username,
            verifyCode
          )

          if(!emailResponse.success){
            return Response.json({
                success: false,
                message: emailResponse.message
            }, {status:500})
          }

          return Response.json({
            success: true,
            message: "User register successfully. please verify your email"
        }, {status:200})
    }catch{
        console.log("Error registering user");
        return Response.json(
            {
                success:false,
                message:"Error registering user"
            },
            {
                status:500
            }
        )
    }
}