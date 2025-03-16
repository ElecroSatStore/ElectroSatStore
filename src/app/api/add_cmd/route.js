import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export async function POST(req) {
  try {
    const { id_product, name, number, wilaya, city, quantity, price } = await req.json();

    const query = `
      INSERT INTO commande (id_product, user_name, user_number, qte, price, status, wilaya, city)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *;
    `;

    const values = [id_product, name, number, quantity, price, 'en attente', wilaya, city];
    const result = await sql(query, values);

    if (result.length === 0) {
      return NextResponse.json({ message: 'Insertion failed', status: 500 });
    }

    return NextResponse.json({ product: result[0], status: 200 });
  } catch (error) {
    console.error('Error inserting product:', error);
    return NextResponse.json({ message: 'Internal Server Error', status: 500 });
  }
}
