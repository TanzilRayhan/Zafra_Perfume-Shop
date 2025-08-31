export default function HeroSection() {
  return <div className="flex flex-col items-center justify-center h-screen w-full mt-16">
    <div className="w-full h-full relative">
        <div className="w-full h-full relative">
            <img src="https://img.myshopline.com/image/store/1672306822234/940fccb2-b209-4350-b2cf-e410dc72baaa-CR0,0,970,600-PT0-SX970-V1-.jpeg?w=970&h=600" alt="hero-image" className="w-full h-full" />
            <div className="w-full h-full bg-black/40 absolute top-0 left-0 backdrop-blur-xs"/>
        </div>
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center bg">
            <div className="flex flex-col items-center justify-center gap-6">
                <p className="text-indigo-500 text-6xl font-extrabold uppercase tracking-widest text-shadow-lg">Welcome to Zafra</p>
                <p className="text-white text-sm">Discover the best perfumes for every occasion</p>
                <div className="flex flex-row items-center justify-center">
                    <button className="bg-indigo-500 text-white px-5 py-2 rounded-md text-sm font-medium shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 cursor-pointer">Shop Now</button>
                </div>
            </div>
        </div>
    </div>
  </div>;
}