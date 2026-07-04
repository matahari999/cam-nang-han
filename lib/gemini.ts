import { GoogleGenAI, Type } from "@google/genai";

const MODEL = "gemini-2.5-flash";

function getClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("MISSING_API_KEY");
  }
  return new GoogleGenAI({ apiKey });
}

export type DocumentInterpretation = {
  docType: string;
  summary: string;
  items: { label: string; explanation: string }[];
  notes: string;
};

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    docType: {
      type: Type.STRING,
      description:
        "Tên loại giấy tờ bằng tiếng Việt, kèm tên tiếng Hàn gốc trong ngoặc, ví dụ: Bảng lương (급여명세서)",
    },
    summary: {
      type: Type.STRING,
      description: "Tóm tắt 1-2 câu bằng tiếng Việt về nội dung chính của giấy tờ này",
    },
    items: {
      type: Type.ARRAY,
      description:
        "Từng mục/dòng quan trọng trong giấy tờ, giải thích riêng bằng tiếng Việt",
      items: {
        type: Type.OBJECT,
        properties: {
          label: {
            type: Type.STRING,
            description: "Tên mục theo tiếng Hàn gốc trong giấy tờ, ví dụ: 국민연금",
          },
          explanation: {
            type: Type.STRING,
            description: "Giải thích ý nghĩa của mục này bằng tiếng Việt, ngắn gọn dễ hiểu",
          },
        },
        required: ["label", "explanation"],
      },
    },
    notes: {
      type: Type.STRING,
      description:
        "Lưu ý thêm bằng tiếng Việt nếu có (ví dụ: nên hỏi lại công ty/cơ quan điều gì), để trống nếu không có",
    },
  },
  required: ["docType", "summary", "items", "notes"],
};

const PROMPT = `Bạn là trợ lý giúp người Việt đang sống tại Hàn Quốc đọc hiểu giấy tờ tiếng Hàn (bảng lương, thư từ cơ quan nhà nước, hóa đơn, hợp đồng...).

Hãy nhìn ảnh giấy tờ được đính kèm và:
1. Xác định đây là loại giấy tờ gì.
2. Tóm tắt ngắn gọn nội dung chính.
3. Liệt kê từng mục/dòng quan trọng trong giấy tờ (đặc biệt là các khoản tiền, khoản khấu trừ, ngày hạn, yêu cầu hành động) và giải thích ý nghĩa từng mục bằng tiếng Việt đơn giản, dễ hiểu.
4. Nếu có mục nào người dùng cần xác nhận lại với công ty/cơ quan hoặc có hạn chót cần chú ý, ghi vào phần lưu ý.

Trả lời hoàn toàn bằng tiếng Việt (trừ tên gốc tiếng Hàn của từng mục). Không suy đoán số liệu nếu ảnh mờ hoặc không đọc rõ — hãy ghi rõ là không đọc được thay vì đoán bừa.`;

export async function interpretDocumentImage(
  imageBase64: string,
  mimeType: string
): Promise<DocumentInterpretation> {
  const ai = getClient();

  const result = await ai.models.generateContent({
    model: MODEL,
    contents: [
      {
        role: "user",
        parts: [
          { text: PROMPT },
          { inlineData: { mimeType, data: imageBase64 } },
        ],
      },
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema,
    },
  });

  const text = result.text;
  if (!text) {
    throw new Error("EMPTY_RESPONSE");
  }

  return JSON.parse(text) as DocumentInterpretation;
}

export type TranslateDirection = "vi-ko" | "ko-vi";

export async function translateText(
  text: string,
  direction: TranslateDirection
): Promise<string> {
  const ai = getClient();

  const targetLang = direction === "vi-ko" ? "tiếng Hàn" : "tiếng Việt";
  const sourceLang = direction === "vi-ko" ? "tiếng Việt" : "tiếng Hàn";

  const result = await ai.models.generateContent({
    model: MODEL,
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `Dịch đoạn văn bản sau từ ${sourceLang} sang ${targetLang}. Đây là câu nói dùng trong đời sống hàng ngày (ở bệnh viện, trung tâm hành chính, nói chuyện với gia đình), vì vậy hãy dịch tự nhiên, dễ hiểu, đúng văn hóa giao tiếp, không dịch từng từ máy móc. Chỉ trả về đúng phần đã dịch, không thêm giải thích hay ghi chú nào khác.\n\nVăn bản cần dịch:\n${text}`,
          },
        ],
      },
    ],
  });

  const translated = result.text;
  if (!translated) {
    throw new Error("EMPTY_RESPONSE");
  }

  return translated.trim();
}
