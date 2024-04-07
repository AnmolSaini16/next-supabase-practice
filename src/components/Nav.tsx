"use client";

import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {};

const Nav = (props: Props) => {
  const [userData, setUserData] = useState<User | null>(null);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const getUserData = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUserData(data?.user);
      }
    };
    getUserData();
  }, []);

  return (
    <>
      {userData && (
        <div className="w-full  bg-slate-800 p-4">
          <div className="w-full flex justify-between text-center">
            <p>{userData?.email}</p>
            <button
              className="border bg-white text-black rounded-sm p-1"
              onClick={async () => {
                await supabase.auth.signOut();
                router.refresh();
              }}
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Nav;
