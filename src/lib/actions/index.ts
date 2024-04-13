import { createClient } from "../supabase/client";

export const addTodo = async ({ title }: { title: string }) => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return supabase.from("todos").insert({ userId: user?.id, title });
};

export const deleteTodo = ({ id }: { id: number }) => {
  const supabase = createClient();
  return supabase.from("todos").delete().eq("id", id);
};

export const editTodo = ({
  isCompleted,
  todo_id,
}: {
  isCompleted: boolean;
  todo_id: number;
}) => {
  const supabase = createClient();
  return supabase.rpc("edit_todo", { checked: isCompleted, todo_id });
};
