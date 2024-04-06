import { supabase } from "@/lib/supabase";

export default async function Home() {
  const { data, error } = await supabase
    .from("notes")
    .insert({ title: "test" });

  console.log("data", data);
  console.log("eror", error);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Hi</h1>
    </main>
  );
}
