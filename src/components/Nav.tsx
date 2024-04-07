import { createClient } from "@/lib/supabase/server";
import React from "react";
import Logout from "./Logout";
import Image from "next/image";

type Props = {};

const Nav = async (props: Props) => {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  return (
    <>
      {data?.user && (
        <div className="w-full  bg-slate-800 p-4">
          <div className="w-full flex justify-between text-center">
            <div className="flex items-center gap-2">
              <Image
                src={data?.user?.user_metadata?.avatar_url}
                width={40}
                height={40}
                alt="profile-pic"
                className="rounded-full"
              />
              <p>{data?.user?.email}</p>
            </div>

            <Logout />
          </div>
        </div>
      )}
    </>
  );
};

export default Nav;
