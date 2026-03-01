import { Logo } from "@/components/ui/logo";
import Link from "next/link";
import { useStoreInfo } from "@/hooks/use-store-info";

export default function Footer() {
  const { storeInfoQuery } = useStoreInfo();
  const { data: storeInfo } = storeInfoQuery;

  return (
    <footer className="bg-black py-20 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 flex flex-col items-center text-center">
        <div className="mb-12">
          <Logo />
        </div>

        <nav className="flex flex-wrap justify-center gap-x-12 gap-y-6 mb-16">
          {[
            { name: "Shop", href: "/shop" },
            { name: "Collections", href: "/collections" },
            { name: "Offers", href: "/offers" },
            { name: "Story", href: "/story" },
            { name: "Store", href: "/store" }
          ].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="font-sans text-[11px] uppercase tracking-[0.2em] text-muted hover:text-white transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="w-12 h-[1px] bg-gold mb-12" />

        <div className="flex flex-col md:flex-row gap-8 md:gap-16 text-subtle font-sans text-[10px] uppercase tracking-[0.15em] mb-16">
          <div className="flex flex-col gap-2">
            <span className="text-gold/40 text-[9px] mb-1">Located</span>
            {storeInfo?.address || 'NH, Taliparamba, Kerala'}
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-gold/40 text-[9px] mb-1">Contact</span>
            {storeInfo?.phone || '+91 9895884796'}
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-gold/40 text-[9px] mb-1">Archive</span>
            {storeInfo?.instagram || '@kl59fashion'}
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between w-full pt-8 border-t border-white/5 gap-4">
          <p className="font-body text-[11px] text-subtle uppercase tracking-wider">
            © {new Date().getFullYear()} KL-59 Men&apos;s Fashion
          </p>
          <p className="font-body text-[11px] text-subtle uppercase tracking-wider">
            Crafted by <a href="https://ekodrix.com" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-gold transition-colors">Ekodrix</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
