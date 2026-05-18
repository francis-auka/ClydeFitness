import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import bcrypt from "bcryptjs";
import fs from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { oldPassword, newPassword } = await req.json();

  const valid = await bcrypt.compare(oldPassword, process.env.ADMIN_PASSWORD_HASH as string);
  if (!valid) return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 });

  const newHash = await bcrypt.hash(newPassword, 10);

  // Update .env file
  try {
    const envPath = path.join(process.cwd(), ".env");
    let envContent = await fs.readFile(envPath, "utf8");
    envContent = envContent.replace(/ADMIN_PASSWORD_HASH=.*/, `ADMIN_PASSWORD_HASH=${newHash}`);
    await fs.writeFile(envPath, envContent);
  } catch {
    console.error("Could not update .env — update ADMIN_PASSWORD_HASH manually.");
  }

  return NextResponse.json({ success: true });
}
