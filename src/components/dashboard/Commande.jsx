import Table from "./Table"
export default function Commande() {
  return (
    <>
        <div className="mb-5">
                    <h1 className="text-3xl font-bold mb-0">Commandes</h1>
                </div>
        <section className="flex justify-center items-center ">
                    <section className="table_container">
                        <Table/>
                    </section>
        </section> 
    </>
  )
}
