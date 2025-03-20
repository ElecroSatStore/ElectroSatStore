import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export async function GET() {
    try {
        const products = await sql(`
            SELECT commande.*, 
                   product.name, 
                   product.img, 
                   product.desc_s, 
                   product.qte AS product_qte
            FROM commande
            INNER JOIN product ON commande.id_product = product.id_product
            order by id_cmd
        `);

        if (products.length > 0) {
            return NextResponse.json({ products, status: 200 });
        } else {
            return NextResponse.json({ message: "No products found", status: 404 });
        }
    } catch (err) {
        console.error("Database error:", err);
        return NextResponse.json({ message: "Internal Server Error", status: 500 });
    }
}
