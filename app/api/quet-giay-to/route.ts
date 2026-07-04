import { NextResponse } from "next/server";
import { interpretDocumentImage } from "@/lib/gemini";

export const runtime = "nodejs";

const MAX_BYTES = 8 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"];

export async function POST(request: Request) {
  let file: File | null;
  try {
    const formData = await request.formData();
    const entry = formData.get("image");
    file = entry instanceof File ? entry : null;
  } catch {
    return NextResponse.json(
      { error: "Không đọc được ảnh gửi lên. Vui lòng thử lại." },
      { status: 400 }
    );
  }

  if (!file) {
    return NextResponse.json(
      { error: "Chưa có ảnh nào được chọn." },
      { status: 400 }
    );
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: "Chỉ nhận file ảnh (JPG, PNG, WEBP, HEIC)." },
      { status: 400 }
    );
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "Ảnh quá lớn (tối đa 8MB). Vui lòng chụp lại hoặc chọn ảnh nhỏ hơn." },
      { status: 400 }
    );
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const result = await interpretDocumentImage(
      buffer.toString("base64"),
      file.type
    );
    return NextResponse.json(result);
  } catch (err) {
    if (err instanceof Error && err.message === "MISSING_API_KEY") {
      return NextResponse.json(
        { error: "Tính năng này chưa được cấu hình. Vui lòng quay lại sau." },
        { status: 503 }
      );
    }
    return NextResponse.json(
      {
        error:
          "Không đọc được nội dung ảnh này. Vui lòng chụp rõ hơn (đủ sáng, không mờ, không cắt góc) rồi thử lại.",
      },
      { status: 502 }
    );
  }
}
