import Link from "next/link";

export default function Navbar() {
  return <div className="flex justify-between items-center p-4 fixed top-0 left-0 right-0 z-10 backdrop-blur-xl bg-white/20 px-32">
    <div className="flex flex-row w-full items-center justify-between">
      <p className="text-3xl font-bold w-full">Zafra</p>
      <div className="flex flex-row items-center justify-between w-full mr-4">
        <div className="flex flex-row items-center gap-4 w-full mr-4">
        <Link href="#" className="text-gray-800 hover:underline font-semibold text-sm">Home</Link>
        <Link href="#" className="text-gray-800 hover:underline font-semibold text-sm">All Perfumes</Link>
        <Link href="#" className="text-gray-800 hover:underline font-semibold text-sm">About</Link>
        <Link href="#" className="text-gray-800 hover:underline font-semibold text-sm">Contact</Link>
        </div>
        <div className="flex flex-row items-center gap-4">
            <Link href="/login" className="bg-indigo-500 text-white px-5 py-2 rounded-md text-sm font-medium">Login</Link>
        </div>
      </div>
    </div>
  </div>;
}