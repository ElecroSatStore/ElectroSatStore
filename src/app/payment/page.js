
export default function Index() {
  return (
    <main  className="mt-10 px-5 sm:px-24 md:px-32 md:h-[75vh]">
        <h1 className="mb-0 text-2xl sm:text-3xl font-bold mt-20">Methodes de payments</h1>
        <div className="mt-10">
            <h1 className="text-[#484848] font-bold text-xl underline">1) Payment à livraison</h1>
            <p className="text-base mb-0">Le paiement à la livraison est l'un des modes de paiement disponibles dans notre boutique. Le client peut effectuer ses achats en ligne, choisir le produit souhaité, passer commande et choisir son mode de paiement dès réception. Le paiement est ainsi différé jusqu'à la réception du produit commandé par voie électronique.</p>
        </div>
        <div className="mt-5">
    <h1 className="text-[#484848] font-bold text-xl underline">2) Paiement par virement bancaire</h1>
    <p className="text-base mb-0">
        Le paiement par virement bancaire est l'un des modes de paiement disponibles dans notre boutique. 
        Le paiement s'effectue en transférant le montant convenu sur notre compte bancaire, 
        par mandat bancaire ou via une agence de transfert d'argent au nom convenu. 
        Une fois le paiement effectué, le produit est expédié à l'adresse convenue.
    </p>
</div>

<div className="mt-5">
    <h1 className="text-[#484848] font-bold text-xl underline">3) Paiement via PayPal</h1>
    <p className="text-base mb-0">
        Le paiement via PayPal est l'un des modes de paiement disponibles dans notre boutique. 
        Le paiement s'effectue en transférant le montant convenu sur notre compte PayPal. 
        Une fois le paiement reçu, le produit est expédié à l'adresse convenue.
    </p>
</div>
    <div className="mt-5">
            <h2 className="text-lg mb-2.5 font-semibold text-gray-800">Les options de payments</h2>
            <p className="text-[#484848] font-medium text-sm">
                Pour les produits physiques, le paiement se fait <span className="text-[#11843C]">à la livraison</span>. 
                Pour les autres produits non phisiques, comme l’IPTV, veuillez nous contacter via WhatsApp au  
                <a href="tel:0557007322" className="pl-1 text-[#11843C] underline">0557007322</a>.
                </p>
        </div>
    </main>
  )
}
