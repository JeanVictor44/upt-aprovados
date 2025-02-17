import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Inicio() {
  const supabase = await createClient()

  const {data: {user}} = await supabase.auth.getUser()
  if(user) return redirect("/aprovados");

  redirect("/login");

  return null;
}