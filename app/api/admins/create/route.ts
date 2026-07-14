import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  const body = await req.json();

  const { name, email, role } = body;

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: user, error: authError } =
    await supabaseAdmin.auth.admin.createUser({
      email,
      email_confirm: true,
    });

  if (authError) {
    return NextResponse.json(
      { error: authError.message },
      { status: 400 }
    );
  }

  const { error: dbError } = await supabaseAdmin
    .from("admins")
    .insert({
      name,
      email,
      role,
      auth_user_id: user.user.id,
      active: true,
    });

  if (dbError) {
    return NextResponse.json(
      { error: dbError.message },
      { status: 400 }
    );
  }

  return NextResponse.json({
    success: true,
  });
}