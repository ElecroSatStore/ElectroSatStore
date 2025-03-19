import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export async function GET() {
    try {
        const sql = neon(`${process.env.DATABASE_URL}`);

        const userCountResult = await sql("SELECT COUNT(DISTINCT user_number) AS user_count FROM commande");
        const productCountResult = await sql("SELECT COUNT(*) AS product_count FROM product");
        const orderCountResult = await sql("SELECT COUNT(*) AS order_count FROM commande");

        const user_count = userCountResult[0]?.user_count || 0;
        const product_count = productCountResult[0]?.product_count || 0;
        const order_count = orderCountResult[0]?.order_count || 0;

        return NextResponse.json({
            user_count,
            product_count,
            order_count,
            status: 200,
        });

    } catch (err) {
        console.error("Error fetching data:", err);
        return NextResponse.json({ message: "Internal server error", status: 500 });
    }
}
