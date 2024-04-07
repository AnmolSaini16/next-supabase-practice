import Nav from "@/components/Nav";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = createClient();

  const { data, error } = await createClient().from("notes").select();

  console.log("data", data);
  console.log("eror", error);

  return (
    <>
      <Nav />
      <main className="flex">
        <h1 className="text-2xl">Home Page</h1>
      </main>
    </>
  );
}
