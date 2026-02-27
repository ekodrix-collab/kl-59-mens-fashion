import { Montserrat, Playfair_Display } from 'next/font/google';

interface LogoProps {
  size?: 'small' | 'default' | 'large';
  light?: boolean;
}

export function Logo({ size = 'default', light = true }: LogoProps) {
  const sizes = {
    small: { main: 'text-lg', sub: 'text-[7px] tracking-[0.2em]', dash: 'w-4' },
    default: { main: 'text-2xl', sub: 'text-[9px] tracking-[0.25em]', dash: 'w-5' },
    large: { main: 'text-5xl md:text-6xl', sub: 'text-[11px] md:text-sm tracking-[0.3em]', dash: 'w-8 md:w-10' },
  };
  
  const s = sizes[size];
  const textColor = light ? 'text-white' : 'text-black';

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex items-center gap-3">
        <span className={`font-sans font-black ${s.main} ${textColor} tracking-wider`}>KL</span>
        <span className={`${s.dash} h-[1.5px] bg-gold`} />
        <span className={`font-sans font-black ${s.main} ${textColor} tracking-wider`}>59</span>
      </div>
      <span className={`font-sans font-normal ${s.sub} uppercase ${light ? 'text-muted' : 'text-subtle'}`}>
        Men&apos;s Fashion
      </span>
    </div>
  );
}
