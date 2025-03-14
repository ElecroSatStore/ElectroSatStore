import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
export async function GET() {
   try {
      const sql = neon(`${process.env.DATABASE_URL}`)
      const query = "select * from product order by date desc limit 7"
      const products = await sql(query)
      if(products.length === 0){
        return NextResponse({message :'Products not found',status : 404})
      }
      return NextResponse.json({products,status : 200})
   } catch (error) {
      console.log(error)
   }
}
