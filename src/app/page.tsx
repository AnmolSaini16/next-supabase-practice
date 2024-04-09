import AddTodo from "@/components/AddTodo";
import Nav from "@/components/Nav";
import Todo from "@/components/Todo";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: todos } = await supabase
    .from("todos")
    .select()
    .eq("userId", user?.id as string)
    .order("created_at", { ascending: true });

  return (
    <>
      <Nav />
      <main className="flex justify-center items-center h-[90vh] font-mono">
        <div className="bg-slate-800 shadow-lg h-[550px] w-[500px] border border-slate-700 rounded-md px-3 py-4 space-y-6">
          <h1 className="text-2xl font-bold">Your Todos</h1>
          <AddTodo />

          {!todos?.length ? (
            <p className=" text-gray-400 text-center">No Todos</p>
          ) : (
            <div className="space-y-3 h-[400px] overflow-y-auto">
              {todos?.map((todo) => (
                <Todo todo={todo} key={todo.id} />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
