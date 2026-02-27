export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-3">
          <span className="font-sans font-black text-2xl text-white animate-pulse">KL</span>
          <span className="w-8 h-[2px] bg-gold animate-pulse" />
          <span className="font-sans font-black text-2xl text-white animate-pulse">59</span>
        </div>
        <div className="w-32 h-[1px] bg-white/10 overflow-hidden">
          <div className="w-full h-full bg-gold animate-loading-bar" />
        </div>
      </div>
    </div>
  )
}
