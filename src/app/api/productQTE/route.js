import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

// Initialize the Neon database connection once
const sql = neon(process.env.DATABASE_URL);

export async function POST(req) {
    try {
        const { id_product, qte } = await req.json();
        console.log("Updating product ID:", id_product, "with QTE:", qte);

        const result = await sql(
            "UPDATE product SET qte = $1 WHERE id_product = $2 RETURNING *",
            [qte, id_product]
        );

        if (result.length > 0) {
            return NextResponse.json({ message: "Product updated successfully", product: result[0], status: 200 });
        } else {
            return NextResponse.json({ message: "No product found with given ID", status: 404 });
        }
    } catch (err) {
        console.error("Database error:", err);
        return NextResponse.json({ message: "Internal Server Error", status: 500 });
    }
}
