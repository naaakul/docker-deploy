import mysql from "mysql2/promise";
import { NextResponse } from "next/server";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

export async function GET() {
  const [rows] = await pool.query("SELECT * FROM users ORDER BY id");
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const { name } = await req.json();
  await pool.query("INSERT INTO users (name) VALUES (?)", [name]);
  return NextResponse.json({ success: true });
}
