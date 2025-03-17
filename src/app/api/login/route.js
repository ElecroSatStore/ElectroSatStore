import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { compare } from "bcrypt";

export async function POST(req) {
    try {
        const { email, password } = await req.json();
        const sql = neon(`${process.env.DATABASE_URL}`);

        // Fetch user by email (case insensitive)
        const user = await sql("SELECT * FROM admin WHERE LOWER(email) = LOWER($1)", [email.trim()]);

        console.log("User found:", user);

        if (user.length === 0) {
            throw new Error("Email incorrect");
        }

        // Compare password with hashed version in database
        const valid_password = await compare(password, user[0].password);
        if (!valid_password) {
            throw new Error("Mot de passe incorrect");
        }

        return NextResponse.json({ user: user[0] });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: err.message, status: 500 });
    }
}
