import { NextResponse } from "next/server";
import { translateText, type TranslateDirection } from "@/lib/gemini";

export const runtime = "nodejs";

const MAX_CHARS = 1000;

export async function POST(request: Request) {
  let body: { text?: unknown; direction?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Yêu cầu không hợp lệ." },
      { status: 400 }
    );
  }

  const text = typeof body.text === "string" ? body.text.trim() : "";
  const direction = body.direction === "ko-vi" ? "ko-vi" : "vi-ko";

  if (!text) {
    return NextResponse.json(
      { error: "Chưa nhập nội dung cần dịch." },
      { status: 400 }
    );
  }

  if (text.length > MAX_CHARS) {
    return NextResponse.json(
      { error: `Nội dung quá dài (tối đa ${MAX_CHARS} ký tự).` },
      { status: 400 }
    );
  }

  try {
    const translated = await translateText(text, direction as TranslateDirection);
    return NextResponse.json({ translated });
  } catch (err) {
    if (err instanceof Error && err.message === "MISSING_API_KEY") {
      return NextResponse.json(
        { error: "Tính năng này chưa được cấu hình. Vui lòng quay lại sau." },
        { status: 503 }
      );
    }
    return NextResponse.json(
      { error: "Không dịch được lúc này. Vui lòng thử lại." },
      { status: 502 }
    );
  }
}
