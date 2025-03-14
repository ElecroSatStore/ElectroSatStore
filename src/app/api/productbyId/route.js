import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
export async function POST(req){
    const { id } = await req.json();
    try{
        const sql = neon(`${process.env.DATABASE_URL}`);
        const product = await sql('select * from product where id_product = $1',[id])
        if(product.length > 0){
            return NextResponse.json({product : product[0] , status : 200});
        }else{
            return NextResponse.json({message: "No products found",status : 404});
        }
    }catch(err){
        console.log(err)
    }
}