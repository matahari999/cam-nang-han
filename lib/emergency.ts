export type EmergencyContact = {
  number: string;
  name: string;
  desc: string;
  vietnamese: boolean; // hỗ trợ tiếng Việt
  always: boolean; // 24/7
  urgent?: boolean; // khẩn cấp thực sự
};

export const emergencyContacts: EmergencyContact[] = [
  {
    number: "112",
    name: "Cảnh sát (경찰)",
    desc: "Trộm cướp, bạo lực, tai nạn, lừa đảo — mọi việc cần cảnh sát. Có thể yêu cầu phiên dịch qua điện thoại.",
    vietnamese: true,
    always: true,
    urgent: true,
  },
  {
    number: "119",
    name: "Cứu hỏa · Cấp cứu (소방/구급)",
    desc: "Cháy nổ, cấp cứu y tế, gọi xe cứu thương. Nói chậm địa chỉ trước tiên; có hỗ trợ phiên dịch ba bên.",
    vietnamese: true,
    always: true,
    urgent: true,
  },
  {
    number: "1345",
    name: "Tổng đài người nước ngoài (외국인종합안내센터)",
    desc: "Mọi câu hỏi về visa, cư trú, thủ tục xuất nhập cảnh — có nhân viên tiếng Việt, có thể phiên dịch ba bên với cơ quan khác.",
    vietnamese: true,
    always: false,
  },
  {
    number: "1350",
    name: "Tư vấn lao động (고용노동부)",
    desc: "Nợ lương, sa thải bất công, tai nạn lao động, hợp đồng. Yêu cầu hỗ trợ tiếng Việt khi gọi.",
    vietnamese: true,
    always: false,
  },
  {
    number: "1577-1366",
    name: "Danuri — phụ nữ di trú (다누리콜센터)",
    desc: "Tư vấn 24 giờ bằng tiếng Việt cho phụ nữ di trú: hôn nhân, gia đình, thai sản, bạo lực gia đình, nơi tạm lánh khẩn cấp.",
    vietnamese: true,
    always: true,
  },
  {
    number: "1588-5644",
    name: "BBB Korea — phiên dịch miễn phí",
    desc: "Tình nguyện viên phiên dịch qua điện thoại miễn phí 24/7. Đưa điện thoại cho người Hàn đối diện khi không hiểu nhau.",
    vietnamese: true,
    always: true,
  },
  {
    number: "1330",
    name: "Đường dây du lịch Hàn Quốc (관광안내)",
    desc: "Chỉ đường, thông tin đi lại, hỗ trợ khi gặp khó ngoài đường — đa ngôn ngữ, 24 giờ.",
    vietnamese: true,
    always: true,
  },
  {
    number: "129",
    name: "Tổng đài phúc lợi (보건복지상담센터)",
    desc: "Tư vấn y tế – phúc lợi: hỗ trợ sinh hoạt khó khăn, sức khỏe tâm thần, bảo vệ trẻ em.",
    vietnamese: false,
    always: true,
  },
  {
    number: "02-720-5124",
    name: "Đại sứ quán Việt Nam tại Hàn Quốc",
    desc: "Cấp lại hộ chiếu, xác nhận giấy tờ, bảo hộ công dân. Địa chỉ: 123 Bukchon-ro, Jongno-gu, Seoul. Số hotline lãnh sự khẩn cấp xem tại website chính thức của Đại sứ quán.",
    vietnamese: true,
    always: false,
  },
];

export const callTips = [
  {
    title: "Gọi 119 khi cấp cứu — nói gì?",
    body: "Nói chậm và rõ: ① địa chỉ hoặc tên tòa nhà gần nhất (quan trọng nhất), ② chuyện gì xảy ra (아파요 – đau ốm / 다쳤어요 – bị thương / 불이 났어요 – cháy), ③ số điện thoại của bạn. Không biết địa chỉ? Đọc mã số trên cột điện hoặc bật định vị điện thoại.",
  },
  {
    title: "Không nói được tiếng Hàn?",
    body: "Cứ gọi và nói \"베트남어\" (tiếng Việt) — 112/119 có dịch vụ phiên dịch ba bên. Hoặc gọi BBB 1588-5644 trước rồi gọi ba bên cùng lúc.",
  },
  {
    title: "Lưu địa chỉ nhà bằng tiếng Hàn",
    body: "Ngay bây giờ, lưu địa chỉ nhà và công ty (bằng tiếng Hàn) vào ghi chú điện thoại. Lúc khẩn cấp bạn sẽ không kịp tra.",
  },
];
