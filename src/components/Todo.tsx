"use client";

import { deleteTodo, editTodo } from "@/lib/actions";
import { Tables } from "@/types/supabase";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type Props = {
  todo: Tables<"todos">;
};

const Todo = ({ todo }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(todo.isCompleted);

  const handleDeleteTodo = async () => {
    setLoading(true);

    const { error } = await deleteTodo({ id: todo.id });
    if (error) {
      alert("Something went wrong while deleting todo. " + error.message);
      return;
    }
    router.refresh();
    setLoading(false);
  };

  const hanldeTodoCompleted = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setChecked((prev) => !prev);
    const { error } = await editTodo({
      isCompleted: e.target.checked,
      todo_id: todo.id,
    });
    if (error) {
      setChecked((prev) => !prev);
      alert("Something went wrong while editing todo. " + error.message);
      return;
    }
    router.refresh();
  };

  return (
    <div className="px-2 py-3 border border-slate-400 rounded-lg flex justify-between">
      <div className="flex space-x-2">
        <input
          type="checkbox"
          checked={checked}
          onChange={hanldeTodoCompleted}
        />
        <p className=" truncate">{todo.title}</p>
      </div>

      <div className="space-x-2">
        <button className="p-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
            />
          </svg>
        </button>
        <button
          onClick={handleDeleteTodo}
          disabled={loading}
          className="disabled:text-slate-600"
        >
          {loading ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="animate-spin w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default Todo;
