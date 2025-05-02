import { CopyRight } from "../../svg";

export default function Footer() {
  return (
    <footer>
    <div className="mt-10 bg-gray-900 flex justify-between px-10 py-5">
        <h1 className="mb-0 font-bold text-white text-2xl">SatStore</h1>
        <div className="flex items-center gap-1">
            <p className="mb-0 text-sm text-white font-medium">Tous droits réservés</p>
            <CopyRight width={12} height={12} color={'white'}/>
            <p className="mb-0 text-sm text-white font-medium">2025, Yahia Slimani</p>
        </div>
    

    </div>
      <div className="mt-10 bg-gray-900 flex justify-between px-10 py-5">
              <div className="flex items-center gap-4">
        <a 
            href="https://www.instagram.com/info_elecro_sat/?igsh=djl4cmN4djAyaHRz" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white text-sm font-medium hover:underline"
        >
            Instagram
        </a>
        <a 
            href="https://www.tiktok.com/@raouf_sat?_t=ZN-8vzvpi56Smc&_r=1" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white text-sm font-medium hover:underline"
        >
            TikTok
        </a>
    </div>
        </div>
    </footer>
  )
}
