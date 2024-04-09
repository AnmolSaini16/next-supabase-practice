"use client";

import { createClient } from "@/lib/supabase/client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const AuthForm = () => {
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") {
        router.refresh();
      }
    });

    return () => subscription.unsubscribe();
  });

  return (
    <div className="w-[400px] mx-auto mt-16  p-4">
      <button
        className="w-full p-2 bg-slate-100 rounded-sm text-black"
        onClick={() => {
          supabase.auth.signInWithOAuth({
            provider: "github",
            options: {
              redirectTo:
                location.origin + "/auth/callback?next=" + location.pathname,
            },
          });
        }}
      >
        Sign in through github
      </button>
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        view="sign_in"
        providers={[]}
        showLinks={false}
        redirectTo={"/"}
        theme="dark"
      />
    </div>
  );
};

export default AuthForm;
