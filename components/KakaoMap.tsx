"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    kakao: any;
  }
}

type Category = {
  id: string;
  label: string; // tiếng Việt
  keyword: string; // từ khóa tìm kiếm tiếng Hàn
  emoji: string;
};

const CATEGORIES: Category[] = [
  { id: "benh-vien", label: "Bệnh viện", keyword: "병원", emoji: "🏥" },
  { id: "nha-thuoc", label: "Nhà thuốc", keyword: "약국", emoji: "💊" },
  { id: "ngan-hang", label: "Ngân hàng", keyword: "은행", emoji: "🏦" },
  { id: "xuat-nhap-canh", label: "VP xuất nhập cảnh", keyword: "출입국외국인청", emoji: "🛂" },
  { id: "trung-tam-hanh-chinh", label: "TT hành chính (주민센터)", keyword: "주민센터", emoji: "🏛️" },
  { id: "tram-y-te", label: "Trạm y tế công (보건소)", keyword: "보건소", emoji: "🩺" },
  { id: "da-van-hoa", label: "TT gia đình đa văn hóa", keyword: "다문화가족지원센터", emoji: "👨‍👩‍👧" },
  { id: "canh-sat", label: "Đồn cảnh sát", keyword: "경찰서", emoji: "🚓" },
  { id: "quan-ca-phe", label: "Quán cà phê gần đây", keyword: "카페", emoji: "☕" },
  { id: "quan-nhau", label: "Quán nhậu, quán ăn", keyword: "술집", emoji: "🍻" },
];

type Place = {
  id: string;
  name: string;
  address: string;
  phone: string;
  x: string;
  y: string;
  distance: string;
};

const SDK_TIMEOUT_MS = 8000;

export default function KakaoMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapObj = useRef<any>(null);
  const markers = useRef<any[]>([]);
  const infoWindow = useRef<any>(null);

  const [status, setStatus] = useState<"loading" | "ready" | "failed">("loading");
  const [active, setActive] = useState<Category | null>(null);
  const [places, setPlaces] = useState<Place[]>([]);
  const [searching, setSearching] = useState(false);
  const [locationNote, setLocationNote] = useState<string | null>(null);

  // Tải SDK Kakao Maps
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;
    if (!key) {
      setStatus("failed");
      return;
    }
    if (window.kakao?.maps) {
      setStatus("ready");
      return;
    }

    let cancelled = false;
    const timeout = setTimeout(() => {
      if (!cancelled) setStatus("failed");
    }, SDK_TIMEOUT_MS);

    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${key}&libraries=services&autoload=false`;
    script.async = true;
    script.onload = () => {
      if (cancelled) return;
      window.kakao.maps.load(() => {
        clearTimeout(timeout);
        if (!cancelled) setStatus("ready");
      });
    };
    script.onerror = () => {
      clearTimeout(timeout);
      if (!cancelled) setStatus("failed");
    };
    document.head.appendChild(script);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, []);

  // Khởi tạo bản đồ khi SDK sẵn sàng
  useEffect(() => {
    if (status !== "ready" || !mapRef.current || mapObj.current) return;

    const kakao = window.kakao;
    // Mặc định: Tòa thị chính Seoul
    const center = new kakao.maps.LatLng(37.5665, 126.978);
    mapObj.current = new kakao.maps.Map(mapRef.current, { center, level: 5 });
    infoWindow.current = new kakao.maps.InfoWindow({ zIndex: 2 });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const loc = new kakao.maps.LatLng(
            pos.coords.latitude,
            pos.coords.longitude
          );
          mapObj.current.setCenter(loc);
          new kakao.maps.Marker({
            map: mapObj.current,
            position: loc,
            title: "Vị trí của bạn",
          });
        },
        () => {
          setLocationNote(
            "Không lấy được vị trí của bạn — đang hiển thị trung tâm Seoul. Hãy cho phép truy cập vị trí để tìm quanh bạn."
          );
        },
        { timeout: 6000 }
      );
    }
  }, [status]);

  const clearMarkers = () => {
    markers.current.forEach((m) => m.setMap(null));
    markers.current = [];
    infoWindow.current?.close();
  };

  const search = useCallback((cat: Category) => {
    if (!mapObj.current || !window.kakao?.maps?.services) return;
    setActive(cat);
    setSearching(true);
    setPlaces([]);
    clearMarkers();

    const kakao = window.kakao;
    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(
      cat.keyword,
      (data: any[], searchStatus: string) => {
        setSearching(false);
        if (searchStatus !== kakao.maps.services.Status.OK || !data.length) {
          setPlaces([]);
          return;
        }
        const bounds = new kakao.maps.LatLngBounds();
        const found: Place[] = data.map((d) => {
          const pos = new kakao.maps.LatLng(Number(d.y), Number(d.x));
          const marker = new kakao.maps.Marker({
            map: mapObj.current,
            position: pos,
            title: d.place_name,
          });
          kakao.maps.event.addListener(marker, "click", () => {
            infoWindow.current.setContent(
              `<div style="padding:6px 10px;font-size:12px;color:#201C14;">${d.place_name}</div>`
            );
            infoWindow.current.open(mapObj.current, marker);
          });
          markers.current.push(marker);
          bounds.extend(pos);
          return {
            id: d.id,
            name: d.place_name,
            address: d.road_address_name || d.address_name,
            phone: d.phone,
            x: d.x,
            y: d.y,
            distance: d.distance,
          };
        });
        mapObj.current.setBounds(bounds);
        setPlaces(found);
      },
      {
        location: mapObj.current.getCenter(),
        radius: 10000,
        size: 15,
        sort: kakao.maps.services.SortBy.DISTANCE,
      }
    );
  }, []);

  function focusPlace(p: Place) {
    if (!mapObj.current) return;
    const kakao = window.kakao;
    const pos = new kakao.maps.LatLng(Number(p.y), Number(p.x));
    mapObj.current.setCenter(pos);
    mapObj.current.setLevel(3);
    infoWindow.current.setContent(
      `<div style="padding:6px 10px;font-size:12px;color:#201C14;">${p.name}</div>`
    );
    const marker = markers.current.find(
      (m) => m.getTitle && m.getTitle() === p.name
    );
    if (marker) infoWindow.current.open(mapObj.current, marker);
  }

  // SDK chưa dùng được (chưa bật quyền Kakao Map) → nút mở thẳng KakaoMap
  if (status === "failed") {
    return (
      <div>
        <div
          className="rounded-lg p-4 border mb-5"
          style={{
            borderColor: "color-mix(in srgb, var(--gold) 45%, transparent)",
            backgroundColor: "color-mix(in srgb, var(--gold) 10%, transparent)",
          }}
        >
          <p className="text-sm leading-relaxed text-ink">
            Bản đồ nhúng đang được kích hoạt. Trong lúc chờ, bấm nút bên dưới —
            KakaoMap sẽ mở với kết quả tìm kiếm gần vị trí của bạn (không cần
            biết tiếng Hàn, cứ bấm là được).
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {CATEGORIES.map((c) => (
            <a
              key={c.id}
              href={`https://map.kakao.com/link/search/${encodeURIComponent(c.keyword)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="paper-card p-4 flex items-center gap-3 transition-transform hover:-translate-y-0.5"
            >
              <span className="text-2xl" aria-hidden>
                {c.emoji}
              </span>
              <span>
                <span className="block font-semibold text-ink">{c.label}</span>
                <span className="block font-mono text-xs text-ink/50">
                  {c.keyword} — mở KakaoMap ↗
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => search(c)}
            disabled={status !== "ready"}
            className="rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors disabled:opacity-50"
            style={
              active?.id === c.id
                ? {
                    backgroundColor: "var(--seal)",
                    borderColor: "var(--seal)",
                    color: "var(--paper)",
                  }
                : {
                    borderColor:
                      "color-mix(in srgb, var(--navy) 30%, transparent)",
                    color: "var(--navy)",
                  }
            }
          >
            {c.emoji} {c.label}
          </button>
        ))}
      </div>

      {locationNote && (
        <p className="mb-3 text-xs text-ink/60">{locationNote}</p>
      )}

      <div
        ref={mapRef}
        className="w-full rounded-lg border overflow-hidden"
        style={{
          height: "24rem",
          borderColor: "color-mix(in srgb, var(--ink) 15%, transparent)",
        }}
      >
        {status === "loading" && (
          <div className="h-full flex items-center justify-center text-sm text-ink/50">
            Đang tải bản đồ...
          </div>
        )}
      </div>

      {searching && (
        <p className="mt-4 text-sm text-ink/60">Đang tìm kiếm...</p>
      )}

      {active && !searching && places.length === 0 && (
        <p className="mt-4 text-sm text-ink/60">
          Không tìm thấy kết quả gần đây. Thử phóng to bản đồ ra vị trí khác rồi
          bấm lại.
        </p>
      )}

      {places.length > 0 && (
        <ul className="mt-4 flex flex-col gap-2">
          {places.map((p) => (
            <li key={p.id} className="paper-card p-3">
              <button
                type="button"
                onClick={() => focusPlace(p)}
                className="text-left w-full"
              >
                <span className="block font-semibold text-ink text-sm">
                  {p.name}
                </span>
                <span className="block text-xs text-ink/60 mt-0.5">
                  {p.address}
                  {p.distance && (
                    <span className="font-mono text-seal">
                      {" "}
                      · {(Number(p.distance) / 1000).toFixed(1)}km
                    </span>
                  )}
                </span>
              </button>
              <div className="mt-2 flex flex-wrap gap-3 text-xs font-medium">
                {p.phone && (
                  <a href={`tel:${p.phone}`} className="text-navy underline underline-offset-2">
                    📞 {p.phone}
                  </a>
                )}
                <a
                  href={`https://map.kakao.com/link/to/${encodeURIComponent(p.name)},${p.y},${p.x}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-navy underline underline-offset-2"
                >
                  🧭 Chỉ đường
                </a>
                <a
                  href={`https://place.map.kakao.com/${p.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-navy underline underline-offset-2"
                >
                  Xem trên KakaoMap ↗
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
