/* Cẩm Nang Hàn service worker
 * - Trang HTML: network-first, offline thì dùng bản cache
 * - Tài nguyên tĩnh (_next/static, ảnh, font): cache-first
 * - Chú ý: khi thêm slug mới vào lib/checklists.ts, thêm vào PRECACHE_PAGES
 *   và tăng VERSION để người dùng nhận bản mới.
 */
const VERSION = "v3";
const PAGE_CACHE = `cnh-pages-${VERSION}`;
const STATIC_CACHE = `cnh-static-${VERSION}`;

const PRECACHE_PAGES = [
  "/",
  "/cam-nang",
  "/khan-cap",
  "/ung-dung",
  "/ban-do",
  "/ket-ban",
  "/cam-nang/kham-benh-lan-dau",
  "/cam-nang/gia-han-the-cu-tru",
  "/cam-nang/mo-tai-khoan-ngan-hang",
  "/cam-nang/hop-dong-thue-nha",
  "/cam-nang/chuan-bi-ho-so-xin-viec",
  "/cam-nang/dang-ky-sim-dien-thoai",
  "/cam-nang/doi-bang-lai-xe",
  "/cam-nang/khai-bao-chuyen-nha",
  "/cam-nang/mat-giay-to",
  "/cam-nang/gui-tien-ve-viet-nam",
  "/cam-nang/quyet-toan-thue-cuoi-nam",
  "/cam-nang/bi-no-luong",
  "/cam-nang/tai-nan-lao-dong",
  "/cam-nang/chuan-bi-ve-nuoc",
  "/cam-nang/mang-thai-sinh-con",
  "/cam-nang/cho-con-vao-truong",
];

const PRECACHE_STATIC = [
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/apple-touch-icon.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const pageCache = await caches.open(PAGE_CACHE);
      // Từng trang một để một trang lỗi không làm hỏng cả quá trình cài
      await Promise.allSettled(
        PRECACHE_PAGES.map((url) => pageCache.add(url))
      );
      const staticCache = await caches.open(STATIC_CACHE);
      await Promise.allSettled(
        PRECACHE_STATIC.map((url) => staticCache.add(url))
      );
      await self.skipWaiting();
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter(
            (key) =>
              key.startsWith("cnh-") &&
              key !== PAGE_CACHE &&
              key !== STATIC_CACHE
          )
          .map((key) => caches.delete(key))
      );
      await self.clients.claim();
    })()
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  // Không đụng vào request ra ngoài (Supabase, analytics...)
  if (url.origin !== self.location.origin) return;
  // Không cache các route auth (đăng nhập/đăng xuất phải luôn tươi)
  if (url.pathname.startsWith("/auth") || url.pathname.startsWith("/login"))
    return;

  // Điều hướng trang: network-first
  if (request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const fresh = await fetch(request);
          if (fresh.ok) {
            const cache = await caches.open(PAGE_CACHE);
            cache.put(request, fresh.clone());
          }
          return fresh;
        } catch {
          const cached = await caches.match(request, { ignoreSearch: true });
          if (cached) return cached;
          // Offline mà chưa có trang này → đưa về trang khẩn cấp/trang chủ
          return (
            (await caches.match("/khan-cap")) ||
            (await caches.match("/")) ||
            Response.error()
          );
        }
      })()
    );
    return;
  }

  // Tài nguyên tĩnh: cache-first (file _next/static có hash, bất biến)
  if (
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.startsWith("/icons/") ||
    url.pathname.endsWith(".png") ||
    url.pathname.endsWith(".svg") ||
    url.pathname.endsWith(".woff2")
  ) {
    event.respondWith(
      (async () => {
        const cached = await caches.match(request);
        if (cached) return cached;
        const fresh = await fetch(request);
        if (fresh.ok) {
          const cache = await caches.open(STATIC_CACHE);
          cache.put(request, fresh.clone());
        }
        return fresh;
      })()
    );
  }
});
