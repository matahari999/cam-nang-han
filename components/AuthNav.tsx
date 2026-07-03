import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function AuthNav() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <Link
        href="/login"
        className="rounded-lg px-4 py-2 text-sm font-semibold text-paper transition-opacity hover:opacity-90"
        style={{ backgroundColor: "var(--navy)" }}
      >
        Đăng nhập / Đăng ký
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <span className="hidden sm:inline max-w-[12rem] truncate font-mono text-xs text-ink/60">
        {user.email}
      </span>
      <form action="/auth/signout" method="post">
        <button
          type="submit"
          className="rounded-lg border px-3 py-2 text-sm font-semibold text-navy transition-colors hover:bg-navy/5"
          style={{
            borderColor: "color-mix(in srgb, var(--navy) 30%, transparent)",
          }}
        >
          Đăng xuất
        </button>
      </form>
    </div>
  );
}
