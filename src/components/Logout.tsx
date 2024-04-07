"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import React from "react";

const Logout = () => {
  const router = useRouter();
  const supabase = createClient();
  return (
    <button
      className="border bg-white text-black rounded-md py-1 px-2"
      onClick={async () => {
        await supabase.auth.signOut();
        router.refresh();
      }}
    >
      Sign out
    </button>
  );
};

export default Logout;
