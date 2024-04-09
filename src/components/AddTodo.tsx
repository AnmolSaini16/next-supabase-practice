"use client";

import { addTodo } from "@/lib/actions";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type Props = {};

const AddTodo = (props: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const handleAddTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const title = Object.fromEntries(formData)?.title as string;

    if (!title?.length) return;

    setLoading(true);
    const { error } = await addTodo({ title });
    if (error) {
      alert("Something went wrong while adding todo. " + error);
    }
    router.refresh();
    setLoading(false);
  };

  return (
    <form
      className="w-full flex items-center justify-between gap-2"
      onSubmit={handleAddTodo}
    >
      <input
        className="w-[80%] h-8 rounded-md bg-transparent  border border-bg-slate-400"
        name="title"
        key={`${loading}`}
        required
      />
      <button
        className="border border-slate-400 rounded-md px-4 py-1 w-[20%] disabled:border-slate-600 disabled:text-slate-600"
        type="submit"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add"}
      </button>
    </form>
  );
};

export default AddTodo;
