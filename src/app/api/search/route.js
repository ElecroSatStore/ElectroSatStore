import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export async function POST(req) {
    try {
        const { value } = await req.json();
        const sql = neon(process.env.DATABASE_URL);
        
        const products = await sql(
            "SELECT * FROM product WHERE name ILIKE '%' || $1 || '%'", 
            [value]
        );

        if (products.length > 0) {
            return NextResponse.json({ products: products, status: 200 });
        } else {
            return NextResponse.json({ message: "No products found", status: 404 });
        }
    } catch (err) {
        console.error("Database error:", err);
        return NextResponse.json({ message: "Internal Server Error", status: 500 });
    }
}
