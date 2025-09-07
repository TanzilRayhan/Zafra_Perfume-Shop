import LoginForm from "@/components/ui/loginForm";
import Link from "next/link";

import { FaArrowLeft } from "react-icons/fa6";

export default function Login() {
  return (
    <div className="w-full h-full">
        <Link href="/" className="text-indigo-500 hover:underline font-semibold text-sm  p-5 cursor-pointer flex items-center gap-2">
            <FaArrowLeft /> Back to Home
        </Link>
      <div className="flex flex-col items-center justify-center h-screen">
        <LoginForm />
      </div>
    </div>
  )
}