import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
export async function GET(req){
    try{
        const sql = neon(`${process.env.DATABASE_URL}`);
        const products = await sql('select * from product')
        if(products.length > 0){
            return NextResponse.json({products , status : 200});
        }else{
            return NextResponse.json({message: "No products found",status : 404});
        }
    }catch(err){
        console.log(err)
    }
}