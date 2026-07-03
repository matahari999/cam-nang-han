"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Mode = "login" | "signup";
type Provider = "kakao" | "facebook";

export default function LoginPage() {
  const router = useRouter();
  const [supabase] = useState(() => createClient());

  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setNotice(null);

    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setError(
          error.code === "over_email_send_rate_limit" ||
            error.code === "over_request_rate_limit"
            ? "Quá nhiều yêu cầu. Vui lòng thử lại sau ít phút."
            : "Email hoặc mật khẩu không đúng. Vui lòng thử lại."
        );
        setLoading(false);
        return;
      }
      router.push("/cam-nang");
      router.refresh();
    } else {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) {
        setError(
          error.code === "over_email_send_rate_limit"
            ? "Quá nhiều yêu cầu đăng ký. Vui lòng thử lại sau ít phút."
            : error.code === "weak_password"
              ? "Mật khẩu cần ít nhất 6 ký tự."
              : "Không thể đăng ký. Vui lòng thử lại."
        );
        setLoading(false);
        return;
      }
      if (data.session) {
        router.push("/cam-nang");
        router.refresh();
      } else {
        setNotice(
          "Đã gửi email xác nhận. Vui lòng kiểm tra hộp thư để kích hoạt tài khoản."
        );
        setLoading(false);
      }
    }
  }

  async function handleOAuth(provider: Provider) {
    setError(null);
    setNotice(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      setError("Không thể đăng nhập bằng dịch vụ này. Vui lòng thử lại sau.");
    }
  }

  return (
    <main>
      <div className="mx-auto max-w-md px-5">
        <header className="pt-10 pb-4">
          <Link
            href="/"
            className="text-sm font-medium text-navy underline underline-offset-2"
          >
            ← Trang chủ
          </Link>
        </header>

        <section className="py-6">
          <div className="flex flex-col items-center text-center mb-8">
            <span className="seal-mark h-16 w-16 text-xs tracking-wider mb-4">
              CNH
            </span>
            <h1 className="text-2xl font-extrabold text-ink">
              {mode === "login" ? "Đăng nhập" : "Tạo tài khoản"}
            </h1>
            <p className="mt-2 text-sm text-ink/70 leading-relaxed">
              Đăng nhập để lưu tiến độ chuẩn bị giấy tờ của bạn.
            </p>
          </div>

          <div className="paper-card p-6">
            <div className="flex gap-2 mb-6">
              <button
                type="button"
                onClick={() => {
                  setMode("login");
                  setError(null);
                  setNotice(null);
                }}
                aria-pressed={mode === "login"}
                className="flex-1 rounded-lg py-2 text-sm font-semibold transition-colors"
                style={
                  mode === "login"
                    ? { backgroundColor: "var(--navy)", color: "var(--paper)" }
                    : {
                        backgroundColor:
                          "color-mix(in srgb, var(--ink) 6%, transparent)",
                        color: "var(--ink)",
                      }
                }
              >
                Đăng nhập
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode("signup");
                  setError(null);
                  setNotice(null);
                }}
                aria-pressed={mode === "signup"}
                className="flex-1 rounded-lg py-2 text-sm font-semibold transition-colors"
                style={
                  mode === "signup"
                    ? { backgroundColor: "var(--navy)", color: "var(--paper)" }
                    : {
                        backgroundColor:
                          "color-mix(in srgb, var(--ink) 6%, transparent)",
                        color: "var(--ink)",
                      }
                }
              >
                Đăng ký
              </button>
            </div>

            <form onSubmit={handleEmailSubmit} className="flex flex-col gap-4">
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-semibold text-navy">Email</span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  placeholder="ban@email.com"
                  className="rounded-lg border px-3 py-2.5 text-sm text-ink outline-none focus:border-navy"
                  style={{
                    backgroundColor:
                      "color-mix(in srgb, var(--paper) 60%, white)",
                    borderColor:
                      "color-mix(in srgb, var(--ink) 18%, transparent)",
                  }}
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-semibold text-navy">Mật khẩu</span>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete={
                    mode === "login" ? "current-password" : "new-password"
                  }
                  placeholder="Ít nhất 6 ký tự"
                  className="rounded-lg border px-3 py-2.5 text-sm text-ink outline-none focus:border-navy"
                  style={{
                    backgroundColor:
                      "color-mix(in srgb, var(--paper) 60%, white)",
                    borderColor:
                      "color-mix(in srgb, var(--ink) 18%, transparent)",
                  }}
                />
              </label>

              {error && (
                <p className="text-sm font-medium text-seal">{error}</p>
              )}
              {notice && (
                <p className="text-sm font-medium text-gold">{notice}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="rounded-lg px-4 py-2.5 text-sm font-semibold text-paper transition-opacity hover:opacity-90 disabled:opacity-60"
                style={{ backgroundColor: "var(--seal)" }}
              >
                {loading
                  ? "Đang xử lý…"
                  : mode === "login"
                    ? "Đăng nhập bằng email"
                    : "Đăng ký bằng email"}
              </button>
            </form>

            <div className="flex items-center gap-3 my-5">
              <span
                className="h-px flex-1"
                style={{
                  backgroundColor:
                    "color-mix(in srgb, var(--ink) 14%, transparent)",
                }}
              />
              <span className="text-xs text-ink/50">hoặc tiếp tục với</span>
              <span
                className="h-px flex-1"
                style={{
                  backgroundColor:
                    "color-mix(in srgb, var(--ink) 14%, transparent)",
                }}
              />
            </div>

            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={() => handleOAuth("kakao")}
                className="flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#FEE500", color: "#191600" }}
              >
                Tiếp tục với Kakao
              </button>
              <button
                type="button"
                onClick={() => handleOAuth("facebook")}
                className="flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#1877F2" }}
              >
                Tiếp tục với Facebook
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
