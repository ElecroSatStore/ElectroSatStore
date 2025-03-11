import First from "@/components/product/First"
import Seconde from "@/components/product/Seconde"


export default function Index({params}) {
  const {id} = params
  return (
    <main className="flex flex-col md:flex-row px-5 sm:px-10 gap-8 w-full mt-10">
        <First/>
        <Seconde/>
    </main>
  )
}
