"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type NearbyPerson = {
  id: string;
  display_name: string | null;
  bio: string | null;
  distance_km: number;
  last_seen: string;
};

type MatchedPerson = {
  id: string;
  display_name: string | null;
  bio: string | null;
  connected_at: string;
};

function distLabel(km: number) {
  return km < 1 ? `${Math.round(km * 1000)}m` : `${km.toFixed(1)}km`;
}

export default function KetBanClient({ userId }: { userId: string }) {
  const [supabase] = useState(() => createClient());

  const [visible, setVisible] = useState<boolean | null>(null); // null = đang tải
  const [bio, setBio] = useState("");
  const [bioSaved, setBioSaved] = useState("");
  const [nearby, setNearby] = useState<NearbyPerson[]>([]);
  const [matched, setMatched] = useState<MatchedPerson[]>([]);
  const [sentTo, setSentTo] = useState<Set<string>>(new Set());
  const [status, setStatus] = useState<
    "idle" | "locating" | "loading" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const loadMatched = useCallback(async () => {
    const { data } = await supabase.rpc("matched_friends", {
      my_user_id: userId,
    });
    setMatched(data ?? []);
  }, [supabase, userId]);

  const loadSentGreetings = useCallback(async () => {
    const { data } = await supabase
      .from("friend_greetings")
      .select("to_id")
      .eq("from_id", userId);
    setSentTo(new Set((data ?? []).map((r: { to_id: string }) => r.to_id)));
  }, [supabase, userId]);

  useEffect(() => {
    async function init() {
      const { data: profile } = await supabase
        .from("profiles")
        .select("visible_nearby, bio")
        .eq("id", userId)
        .maybeSingle();
      setVisible(profile?.visible_nearby ?? false);
      setBio(profile?.bio ?? "");
      setBioSaved(profile?.bio ?? "");
      await Promise.all([loadMatched(), loadSentGreetings()]);
    }
    init();
  }, [supabase, userId, loadMatched, loadSentGreetings]);

  function findNearby() {
    if (!navigator.geolocation) {
      setStatus("error");
      setErrorMsg("Trình duyệt không hỗ trợ định vị.");
      return;
    }
    setStatus("locating");
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        setStatus("loading");
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        await supabase
          .from("profiles")
          .update({
            lat,
            lng,
            last_seen: new Date().toISOString(),
            visible_nearby: true,
            bio: bio || null,
          })
          .eq("id", userId);
        setVisible(true);
        setBioSaved(bio);

        const { data, error } = await supabase.rpc("nearby_friends", {
          my_lat: lat,
          my_lng: lng,
          my_user_id: userId,
          radius_km: 15,
        });
        if (error) {
          setStatus("error");
          setErrorMsg("Không tải được danh sách. Thử lại sau.");
          return;
        }
        setNearby(data ?? []);
        setStatus("idle");
      },
      () => {
        setStatus("error");
        setErrorMsg(
          "Không lấy được vị trí — hãy cho phép truy cập vị trí trong trình duyệt."
        );
      }
    );
  }

  async function turnOff() {
    await supabase
      .from("profiles")
      .update({ visible_nearby: false })
      .eq("id", userId);
    setVisible(false);
    setNearby([]);
  }

  async function sayHi(toId: string) {
    setSentTo((prev) => new Set(prev).add(toId)); // optimistic
    const { error } = await supabase
      .from("friend_greetings")
      .insert({ from_id: userId, to_id: toId });
    if (error) return;
    await loadMatched();
  }

  if (visible === null) {
    return <p className="text-sm text-ink/50">Đang tải...</p>;
  }

  return (
    <div>
      <div
        className="rounded-lg p-4 border mb-6"
        style={{
          borderColor: "color-mix(in srgb, var(--seal) 35%, transparent)",
          backgroundColor: "color-mix(in srgb, var(--seal) 6%, transparent)",
        }}
      >
        <p className="text-sm font-bold text-seal mb-1">⚠️ An toàn trước tiên</p>
        <ul className="text-xs text-ink/75 leading-relaxed list-disc pl-4 space-y-0.5">
          <li>Lần đầu gặp, hẹn ở nơi công cộng, đông người (quán cà phê, trung tâm thương mại).</li>
          <li>Báo cho bạn bè/người thân biết bạn đang gặp ai, ở đâu.</li>
          <li>Không chuyển tiền hay chia sẻ số tài khoản cho người mới quen.</li>
          <li>Thấy điều gì bất thường, dừng lại và rời đi ngay.</li>
        </ul>
      </div>

      {!visible ? (
        <div className="paper-card p-5">
          <p className="text-sm text-ink/80 mb-3">
            Bật vị trí để tìm người Việt gần bạn. Vị trí của bạn{" "}
            <span className="font-semibold text-navy">
              chỉ hiển thị dưới dạng khoảng cách
            </span>
            , không ai thấy tọa độ chính xác. Bạn có thể tắt bất cứ lúc nào.
          </p>
          <label className="block text-xs font-semibold text-navy mb-1">
            Giới thiệu ngắn về bạn (tùy chọn)
          </label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            maxLength={120}
            rows={2}
            placeholder="VD: Công nhân ở Ansan, rảnh cuối tuần, thích cà phê..."
            className="w-full rounded-lg border px-3 py-2 text-sm bg-white/60 mb-4"
            style={{
              borderColor: "color-mix(in srgb, var(--ink) 18%, transparent)",
            }}
          />
          <button
            type="button"
            onClick={findNearby}
            disabled={status === "locating" || status === "loading"}
            className="w-full rounded-lg px-4 py-3 text-sm font-semibold text-paper transition-opacity hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: "var(--seal)" }}
          >
            {status === "locating"
              ? "Đang lấy vị trí..."
              : status === "loading"
                ? "Đang tìm..."
                : "Bật & tìm người gần đây"}
          </button>
          {status === "error" && (
            <p className="mt-2 text-xs text-seal">{errorMsg}</p>
          )}
        </div>
      ) : (
        <>
          <div className="paper-card p-4 mb-5 flex items-center justify-between gap-3">
            <p className="text-sm text-ink/75">
              Đang hiển thị cho người gần bạn{bioSaved ? ` · "${bioSaved}"` : ""}
            </p>
            <div className="flex gap-2 shrink-0">
              <button
                type="button"
                onClick={findNearby}
                className="rounded-lg border px-3 py-1.5 text-xs font-semibold text-navy"
                style={{
                  borderColor: "color-mix(in srgb, var(--navy) 30%, transparent)",
                }}
              >
                Làm mới
              </button>
              <button
                type="button"
                onClick={turnOff}
                className="rounded-lg border px-3 py-1.5 text-xs font-semibold text-seal"
                style={{
                  borderColor: "color-mix(in srgb, var(--seal) 30%, transparent)",
                }}
              >
                Tắt hiển thị
              </button>
            </div>
          </div>

          {status === "error" && (
            <p className="mb-4 text-sm text-seal">{errorMsg}</p>
          )}

          {nearby.length === 0 ? (
            <p className="text-sm text-ink/50 py-6 text-center">
              Chưa có ai gần bạn bật chế độ này. Quay lại sau nhé.
            </p>
          ) : (
            <ul className="flex flex-col gap-3 mb-8">
              {nearby.map((p) => (
                <li key={p.id} className="paper-card p-4 flex items-start gap-3">
                  <span className="seal-mark h-10 w-10 text-sm shrink-0">
                    {(p.display_name || "?").slice(0, 1).toUpperCase()}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-ink">
                        {p.display_name || "Người dùng ẩn danh"}
                      </span>
                      <span className="font-mono text-xs text-seal">
                        {distLabel(p.distance_km)}
                      </span>
                    </div>
                    {p.bio && (
                      <p className="text-sm text-ink/70 mt-0.5">{p.bio}</p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => sayHi(p.id)}
                    disabled={sentTo.has(p.id)}
                    className="shrink-0 rounded-lg px-3 py-2 text-xs font-semibold text-paper transition-opacity hover:opacity-90 disabled:opacity-40"
                    style={{ backgroundColor: "var(--navy)" }}
                  >
                    {sentTo.has(p.id) ? "Đã chào" : "Chào bạn 👋"}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      {matched.length > 0 && (
        <section className="pt-2">
          <h2 className="text-lg font-bold text-ink mb-3">
            🎉 Đã kết nối ({matched.length})
          </h2>
          <ul className="flex flex-col gap-3">
            {matched.map((m) => (
              <li key={m.id} className="paper-card p-4 flex items-start gap-3">
                <span className="seal-mark h-10 w-10 text-sm shrink-0">
                  {(m.display_name || "?").slice(0, 1).toUpperCase()}
                </span>
                <div>
                  <span className="font-semibold text-ink">
                    {m.display_name || "Người dùng ẩn danh"}
                  </span>
                  {m.bio && (
                    <p className="text-sm text-ink/70 mt-0.5">{m.bio}</p>
                  )}
                  <p className="text-xs text-ink/50 mt-1">
                    Cả hai đã chào nhau — hãy nhắn qua KakaoTalk hoặc Zalo để
                    hẹn gặp.
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
