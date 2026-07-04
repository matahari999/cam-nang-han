"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { useKakaoMapsSdk } from "@/lib/useKakaoMapsSdk";

export type RadarPerson = {
  id: string;
  display_name: string | null;
  bio: string | null;
  distance_km: number;
  fuzzy_lat: number;
  fuzzy_lng: number;
};

function distLabel(km: number) {
  return km < 1 ? `${Math.round(km * 1000)}m` : `${km.toFixed(1)}km`;
}

export default function NearbyRadarMap({
  myLat,
  myLng,
  nearby,
  sentTo,
  onSayHi,
}: {
  myLat: number;
  myLng: number;
  nearby: RadarPerson[];
  sentTo: Set<string>;
  onSayHi: (id: string) => void;
}) {
  const status = useKakaoMapsSdk();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapObj = useRef<any>(null);
  const overlaysRef = useRef<any[]>([]);
  const [selected, setSelected] = useState<RadarPerson | null>(null);

  useEffect(() => {
    if (status !== "ready" || !mapRef.current) return;
    const kakao = window.kakao;
    const center = new kakao.maps.LatLng(myLat, myLng);

    if (!mapObj.current) {
      mapObj.current = new kakao.maps.Map(mapRef.current, {
        center,
        level: 6,
      });
    } else {
      mapObj.current.setCenter(center);
    }

    overlaysRef.current.forEach((o) => o.setMap(null));
    overlaysRef.current = [];

    const selfEl = document.createElement("div");
    selfEl.className = "radar-self";
    selfEl.innerHTML =
      '<div class="radar-ring"></div><div class="radar-ring"></div><div class="radar-ring"></div><div class="radar-dot"></div>';
    overlaysRef.current.push(
      new kakao.maps.CustomOverlay({
        position: center,
        content: selfEl,
        map: mapObj.current,
        zIndex: 1,
      })
    );

    nearby.forEach((p) => {
      const el = document.createElement("div");
      el.className = "person-pin";
      el.textContent = (p.display_name || "?").slice(0, 1).toUpperCase();
      el.addEventListener("click", () => setSelected(p));
      overlaysRef.current.push(
        new kakao.maps.CustomOverlay({
          position: new kakao.maps.LatLng(p.fuzzy_lat, p.fuzzy_lng),
          content: el,
          map: mapObj.current,
          zIndex: 2,
          yAnchor: 0.5,
        })
      );
    });
  }, [status, myLat, myLng, nearby]);

  if (status === "failed") {
    return (
      <div
        className="mb-5 rounded-lg p-4 border text-sm leading-relaxed text-ink"
        style={{
          borderColor: "color-mix(in srgb, var(--gold) 45%, transparent)",
          backgroundColor: "color-mix(in srgb, var(--gold) 10%, transparent)",
        }}
      >
        Bản đồ radar đang chờ KakaoMap kích hoạt — trong lúc chờ, danh sách bên
        dưới vẫn hoạt động bình thường.
      </div>
    );
  }

  return (
    <div className="mb-5">
      <div
        ref={mapRef}
        className="w-full rounded-lg border overflow-hidden"
        style={{
          height: "18rem",
          borderColor: "color-mix(in srgb, var(--ink) 15%, transparent)",
        }}
      >
        {status === "loading" && (
          <div className="h-full flex items-center justify-center text-sm text-ink/50">
            Đang tải bản đồ...
          </div>
        )}
      </div>
      <p className="mt-2 text-xs text-ink/50 leading-relaxed">
        Chấm đỏ ở giữa là vị trí của bạn. Ghim xanh đậm là người khác — vị trí
        đã được làm mờ (lệch 100–300m) để bảo vệ nơi ở/nơi làm việc thật của họ.
        Bấm vào ghim để xem thông tin và chào.
      </p>

      {selected && (
        <div className="paper-card p-4 mt-3 flex items-start gap-3">
          <span className="seal-mark h-10 w-10 text-sm shrink-0">
            {(selected.display_name || "?").slice(0, 1).toUpperCase()}
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-ink">
                {selected.display_name || "Người dùng ẩn danh"}
              </span>
              <span className="font-mono text-xs text-seal">
                {distLabel(selected.distance_km)}
              </span>
            </div>
            {selected.bio && (
              <p className="text-sm text-ink/70 mt-0.5">{selected.bio}</p>
            )}
          </div>
          <button
            type="button"
            onClick={() => onSayHi(selected.id)}
            disabled={sentTo.has(selected.id)}
            className="shrink-0 rounded-lg px-3 py-2 text-xs font-semibold text-paper transition-opacity hover:opacity-90 disabled:opacity-40"
            style={{ backgroundColor: "var(--navy)" }}
          >
            {sentTo.has(selected.id) ? "Đã chào" : "Chào bạn 👋"}
          </button>
        </div>
      )}
    </div>
  );
}
