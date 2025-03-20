import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import cloudinary from "@/lib/cloudinary";

const sql = neon(process.env.DATABASE_URL);

export async function POST(req) {
    try {
        const { id_cmd, id_product, type, qte } = await req.json();

        if (!type) {
            const result = await sql(
                "DELETE FROM commande WHERE id_product = $1 AND id_cmd = $2 RETURNING *",
                [id_product, id_cmd]
            );

            if (result.length > 0) {
                return NextResponse.json({ 
                    message: "Commande supprimée avec succès", 
                    product: result[0], 
                    status: 200 
                });
            } else {
                return NextResponse.json({ 
                    message: "Erreur lors de la suppression", 
                    status: 404 
                });
            }
        } else {
            const stockCheck = await sql(
                "SELECT qte FROM product WHERE id_product = $1",
                [id_product]
            );

            if (stockCheck.length === 0) {
                return NextResponse.json({ 
                    message: "Produit non trouvé", 
                    status: 404 
                });
            }

            if (stockCheck[0].qte < qte) {
                return NextResponse.json({ 
                    message: "Quantité insuffisante en stock", 
                    status: 400 
                });
            }

            await sql(
                "UPDATE product SET qte = qte - $1 WHERE id_product = $2 RETURNING *",
                [qte, id_product]
            );

            const result = await sql(
                "UPDATE commande SET status = 'confirmé' WHERE id_cmd = $1 AND id_product = $2 RETURNING *",
                [id_cmd, id_product]
            );

            if (result.length > 0) {
                return NextResponse.json({ 
                    message: "Commande confirmée avec succès", 
                    product: result[0], 
                    status: 200 
                });
            } else {
                return NextResponse.json({ 
                    message: "Erreur lors de la confirmation", 
                    status: 404 
                });
            }
        }
    } catch (err) {
        console.error("Database error:", err);
        return NextResponse.json({ 
            message: "Internal Server Error", 
            status: 500 
        });
    }
}
