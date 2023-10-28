import { UserButton, auth } from "@clerk/nextjs";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogIn } from "lucide-react";
import FileUpload from "@/components/FileUpload";

export default async function Home() {
  const { userId } = await auth();
  const isAuth = !!userId;
  return (
    <div className="w-screen min-h-screen bg-gradient-to-r from-rose-100 to-teal-100">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center">
            <h1 className="mr-3  text-5xl font-semibold">
            Talk With PDF
            </h1>
            <UserButton afterSignOutUrl="/" />
          </div>
          <div className="flex mt-4">
            <Button>Go to Chats</Button>
          </div>
          <p className="max-w-xl mt-4 text-lg">
          Join a thriving community of millions, including students, researchers, and professionals, to instantly answer questions and gain a deeper understanding of research through the power of AI.
          </p>
          <div className="w-full mt-4">
    
            {isAuth?(<FileUpload/>):(
              <Link href='/sign-in'>
              <Button>Login to get Started
              <LogIn/>
              </Button>
             
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
