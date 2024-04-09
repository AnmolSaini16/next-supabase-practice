"use client";

import { useRouter } from "next/navigation";

export default async function ErrorPage() {
  const router = useRouter();
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <p className="text-lg font-medium">
        Opps! Something went wrong while signing in.
        <button
          className="p-2 border border-slate-400 rounded-md"
          onClick={() => router.push("/login")}
        >
          Sign in again
        </button>
      </p>
    </div>
  );
}
