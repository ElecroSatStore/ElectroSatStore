import { Circle, Person } from "../../../svg";


export default function Stat({title,desc,nb,type,loading}) {
  return (
    <div className="border rounded-xl border-gray-300 p-4 relative">
        <div className="flex gap-2">
            <span className="rounded-md border border-gray-300 flex justify-center items-center p-4 w-fit h-fit">{type}</span>
            <div>
                <h3 className="text-lg font-bold">{title}</h3>
                <p className="text-sm text-[#484848]">{desc}</p>
            </div>
        </div>
        <p className="text-[#484848] text-sm font-medium mt-3">Total Earnings</p>
        {
          loading ? <div className="py-2.5 w-2/12 bg-gray-300 rounded animate-pulse"></div> : <h1 className="text-2xl font-bold">{nb}</h1>

        }
        <Circle/>
    </div>
  )
}
