import { CopyRight } from "../../svg";

export default function Footer() {
  return (
    <footer className="mt-10 bg-gray-900 flex justify-between px-10 py-5">
        <h1 className="mb-0 font-bold text-white text-2xl">SatStore</h1>
        <div className="flex items-center gap-1">
            <p className="mb-0 text-sm text-white font-medium">Tous droits réservés</p>
            <CopyRight width={12} height={12} color={'white'}/>
            <p className="mb-0 text-sm text-white font-medium">2025, Yahia Slimani</p>
        </div>
          <div className="flex items-center gap-4">
        <a 
            href="https://www.facebook.com/toncompte" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white text-sm font-medium hover:underline"
        >
            Facebook
        </a>
        <a 
            href="https://www.tiktok.com/@toncompte" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white text-sm font-medium hover:underline"
        >
            TikTok
        </a>
    </div>
        <div>

        </div>
    </footer>
  )
}
