import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export async function POST(req) {
    try {
        const values = await req.json();
        console.log(values.img)
        const date = new Date().toISOString().split("T")[0]; 

        const result = await sql(
            "INSERT INTO product (name, price, img, qte, type, desc_s, desc_b, date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
            [values.name, values.price, values.img, Number(values.qte), values.type, values.desc_s, values.desc_b, date]
        );
        if (result.length > 0) {
            return NextResponse.json({ message: "Product added successfuly", product: result[0], status: 200 });
        } else {
            return NextResponse.json({ message: "Error in add product", status: 404 });
        }    
    } catch (err) {
        console.error("Database error:", err);
        return NextResponse.json({ message: "Internal Server Error", status: 500 });
    }
}
