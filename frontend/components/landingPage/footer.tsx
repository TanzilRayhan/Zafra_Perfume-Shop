export default function Footer() {
  return (
    <div className="flex flex-col items-center justify-center w-full bg-indigo-500 p-8">
      <div className="flex flex-row items-center justify-between w-full max-w-7xl">
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-bold text-white">Zafra</h3>
          <p className="text-white/80">Your Premium Perfume Destination</p>
        </div>
        
        <div className="flex flex-col gap-4">
          <h4 className="text-lg font-semibold text-white">Quick Links</h4>
          <div className="flex flex-col gap-2">
            <a href="#" className="text-white/80 hover:text-white">Home</a>
            <a href="#" className="text-white/80 hover:text-white">All Perfumes</a>
            <a href="#" className="text-white/80 hover:text-white">About</a>
            <a href="#" className="text-white/80 hover:text-white">Contact</a>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-lg font-semibold text-white">Contact Us</h4>
          <div className="flex flex-col gap-2">
            <p className="text-white/80">Email: info@zafra.com</p>
            <p className="text-white/80">Phone: +1 234 567 890</p>
          </div>
        </div>
      </div>
      
      <div className="w-full max-w-7xl border-t border-white/20 mt-8 pt-4">
        <p className="text-white/60 text-center">© 2024 Zafra. All rights reserved.</p>
      </div>
    </div>
  );
}