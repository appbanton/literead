import { createClient } from "@supabase/supabase-js";
import { auth } from "@clerk/nextjs/server";

// Regular Supabase client for authenticated requests
// Uses Clerk JWT token for authentication
export const createSupabaseClient = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      async accessToken() {
        return (await auth()).getToken();
      },
    }
  );
};

// Service role client for server actions that need to bypass RLS
// Should only be used in trusted server-side code
export const createSupabaseServerClient = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
};
