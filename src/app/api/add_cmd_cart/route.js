import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

// Initialize the Neon client
const sql = neon(process.env.DATABASE_URL);

export async function POST(req) {
  try {
    const { products, name, number, wilaya, city } = await req.json();

    // Retrieve the current maximum id_cmd
    const [{ max: currentMaxId }] = await sql`SELECT MAX(id_cmd) FROM commande`;
    const newIdCmd = (currentMaxId || 0) + 1;

    // Prepare values for insertion
    const values = products.map((product, index) => [
      newIdCmd,
      product.id_product,
      name,
      number,
      product.quantity,
      product.price * product.quantity,
      'en attente',
      wilaya,
      city,
    ]);

    // Construct the SQL query for inserting multiple rows
    const query = `
      INSERT INTO commande (id_cmd, id_product, user_name, user_number, qte, price, status, wilaya, city)
      VALUES ${values
        .map(
          (row, rowIndex) =>
            `(${row
              .map((_, colIndex) => `$${rowIndex * row.length + colIndex + 1}`)
              .join(', ')})`
        )
        .join(', ')}
      RETURNING *;
    `;

    // Flatten the values array for parameterized query
    const flattenedValues = values.flat();

    // Execute the insertion query
    const result = await sql(query, flattenedValues);

    if (result.length === 0) {
      return NextResponse.json({ message: 'Insertion failed', status: 500 });
    }

    return NextResponse.json({ products: result, status: 200 });
  } catch (error) {
    console.error('Error inserting products:', error);
    return NextResponse.json({ message: 'Internal Server Error', status: 500 });
  }
}
