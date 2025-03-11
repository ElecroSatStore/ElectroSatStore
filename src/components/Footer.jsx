import { CopyRight } from "../../svg";

export default function Footer() {
  return (
    <footer className="mt-10 bg-gray-900 flex justify-between px-10 py-5">
        <h1 className="mb-0 font-bold text-white text-2xl">IPDEMP</h1>
        <div className="flex items-center gap-1">
            <p className="mb-0 text-sm text-white font-medium">Tous les Droits</p>
            <CopyRight width={12} height={12} color={'white'}/>
            <p className="mb-0 text-sm text-white font-medium">Developé par Yahia Slimani</p>
        </div>
        <div>

        </div>
    </footer>
  )
}
