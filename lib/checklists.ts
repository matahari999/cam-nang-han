export type Situation = {
  slug: string;
  title: string;
  short: string;
  emoji: string;
  items: { label: string; why: string }[];
  tip?: string;
};

export const checklists: Situation[] = [
  {
    slug: "kham-benh-lan-dau",
    title: "Khám bệnh lần đầu",
    short:
      "Chuẩn bị gì khi lần đầu đến bệnh viện hoặc phòng khám (의원) ở Hàn Quốc.",
    emoji: "🏥",
    items: [
      {
        label: "Thẻ đăng ký người nước ngoài (외국인등록증 / ARC)",
        why: "Bệnh viện dùng số ARC để tra cứu bảo hiểm y tế và lập hồ sơ bệnh án. Không có thẻ, bạn có thể bị tính giá tự trả toàn phần.",
      },
      {
        label: "Thẻ bảo hiểm y tế quốc gia (건강보험증) hoặc ảnh chụp",
        why: "Nếu bạn đã tham gia 국민건강보험, chi phí khám được giảm mạnh. Nhiều nơi chỉ cần số ARC nhưng nên mang theo để chắc chắn.",
      },
      {
        label: "Tiền mặt hoặc thẻ (khoảng 10.000–30.000 KRW cho lần khám thường)",
        why: "Phần đồng chi trả (본인부담금) thu ngay tại quầy sau khi khám. Một số phòng khám nhỏ ưu tiên tiền mặt.",
      },
      {
        label: "Danh sách thuốc đang dùng / tiền sử bệnh (ghi sẵn bằng tiếng Hàn nếu có)",
        why: "Bác sĩ cần biết bạn dị ứng thuốc gì, đang uống thuốc gì để tránh kê trùng hoặc gây phản ứng. Dịch sẵn ra tiếng Hàn giúp tránh hiểu nhầm.",
      },
      {
        label: "Điện thoại có ứng dụng dịch (Papago / Google Dịch)",
        why: "Đa số phòng khám không có nhân viên nói tiếng Việt. Ứng dụng dịch giúp mô tả triệu chứng chính xác hơn.",
      },
      {
        label: "Người phiên dịch hoặc số tổng đài 1345 (nếu cần)",
        why: "Tổng đài tư vấn cho người nước ngoài 1345 hỗ trợ tiếng Việt, có thể phiên dịch qua điện thoại ba bên trong tình huống khẩn.",
      },
    ],
    tip: "Ở Hàn nên đến 의원 (phòng khám nhỏ) trước cho bệnh thường; chỉ lên bệnh viện lớn (병원/종합병원) khi có giấy chuyển tuyến (진료의뢰서) để đỡ tốn tiền và thời gian chờ.",
  },
  {
    slug: "gia-han-the-cu-tru",
    title: "Gia hạn thẻ đăng ký người nước ngoài (ARC)",
    short:
      "Giấy tờ cần khi gia hạn thời gian lưu trú tại văn phòng xuất nhập cảnh (출입국·외국인청).",
    emoji: "🪪",
    items: [
      {
        label: "Hộ chiếu còn hiệu lực (bản gốc)",
        why: "Cơ quan xuất nhập cảnh đối chiếu thông tin và đóng/ghi trạng thái lưu trú. Hộ chiếu sắp hết hạn nên gia hạn trước.",
      },
      {
        label: "Thẻ đăng ký người nước ngoài hiện tại (외국인등록증)",
        why: "Bắt buộc để xác định tư cách lưu trú (E-9, D-2, F-6...) đang gia hạn.",
      },
      {
        label: "Đơn xin gia hạn thời gian lưu trú (체류기간 연장 신청서)",
        why: "Mẫu đơn chính thức. Có thể điền trước trên Hi Korea (hikorea.go.kr) khi đặt lịch hẹn để tiết kiệm thời gian.",
      },
      {
        label: "Ảnh thẻ 3.5 x 4.5 cm (nền trắng, chụp trong 6 tháng)",
        why: "Dùng để in lại thẻ nếu cần cấp mới. Chụp đúng chuẩn để tránh bị trả hồ sơ.",
      },
      {
        label: "Giấy tờ chứng minh tư cách lưu trú",
        why: "Tùy loại visa: hợp đồng lao động (E-9), giấy xác nhận đang học của trường (D-2), giấy đăng ký kết hôn + hộ khẩu vợ/chồng (F-6). Thiếu giấy này gần như chắc chắn bị từ chối.",
      },
      {
        label: "Giấy tờ về nơi ở (hợp đồng thuê nhà hoặc xác nhận cư trú)",
        why: "Cơ quan cần biết địa chỉ lưu trú hiện tại để cập nhật. Nếu chuyển nhà phải khai báo trong vòng 14 ngày.",
      },
      {
        label: "Lệ phí (thường 60.000 KRW, nộp bằng tem thu phí 수입인지)",
        why: "Không nộp lệ phí thì hồ sơ không được xử lý. Có quầy bán tem ngay tại văn phòng xuất nhập cảnh.",
      },
      {
        label: "Phiếu đặt lịch hẹn trên Hi Korea",
        why: "Hầu hết văn phòng chỉ tiếp nhận theo lịch hẹn đặt trước; đến ngẫu nhiên thường bị từ chối do quá tải.",
      },
    ],
    tip: "Nộp hồ sơ gia hạn sớm nhất là 4 tháng và muộn nhất là trước ngày hết hạn. Ở quá hạn (오버스테이) bị phạt tiền và ảnh hưởng lần xin visa sau.",
  },
  {
    slug: "mo-tai-khoan-ngan-hang",
    title: "Mở tài khoản ngân hàng",
    short: "Chuẩn bị gì để mở tài khoản và làm thẻ ở ngân hàng Hàn Quốc.",
    emoji: "🏦",
    items: [
      {
        label: "Thẻ đăng ký người nước ngoài (외국인등록증)",
        why: "Là giấy tờ tùy thân bắt buộc để mở tài khoản. Ngân hàng cần số ARC để định danh theo quy định phòng chống rửa tiền.",
      },
      {
        label: "Hộ chiếu (mang kèm để chắc chắn)",
        why: "Một số chi nhánh yêu cầu đối chiếu thêm hộ chiếu, nhất là khi ARC mới cấp.",
      },
      {
        label: "Số điện thoại Hàn Quốc đang dùng chính chủ",
        why: "Cần để đăng ký ngân hàng điện tử và nhận mã OTP. Số phải đứng tên bạn, không mượn số người khác.",
      },
      {
        label: "Giấy tờ chứng minh lý do mở tài khoản",
        why: "Do quy định siết chặt, ngân hàng thường hỏi: hợp đồng lao động, thẻ sinh viên/giấy nhập học, hoặc hợp đồng thuê nhà — để chứng minh bạn thực sự sống/làm việc gần đó.",
      },
      {
        label: "Địa chỉ nơi ở tại Hàn (bằng tiếng Hàn)",
        why: "Dùng để đăng ký thông tin tài khoản và gửi thẻ. Nên có sẵn địa chỉ chính xác ghi bằng tiếng Hàn.",
      },
      {
        label: "Tiền mặt để nạp lần đầu (tùy ngân hàng, có thể chỉ 1.000 KRW)",
        why: "Nhiều tài khoản cần một khoản gửi tối thiểu khi mở. Số tiền nhỏ nhưng nên chuẩn bị.",
      },
    ],
    tip: "Người nước ngoài mới đến thường bị giới hạn hạn mức chuyển khoản (한도계좌) trong thời gian đầu. Sau khi có bảng lương hoặc giao dịch đều đặn, mang giấy tờ đến để nâng hạn mức.",
  },
  {
    slug: "hop-dong-thue-nha",
    title: "Hợp đồng thuê nhà (jeonse / wolse)",
    short:
      "Những giấy tờ và bước cần kiểm tra để ký hợp đồng thuê nhà an toàn, tránh bị lừa tiền đặt cọc.",
    emoji: "🏠",
    items: [
      {
        label: "Thẻ đăng ký người nước ngoài (외국인등록증)",
        why: "Cần để ghi thông tin bên thuê trong hợp đồng và để đăng ký ngày chuyển đến (전입신고) sau này.",
      },
      {
        label: "Bản sao sổ đăng ký nhà đất (등기부등본)",
        why: "Cực kỳ quan trọng: cho biết ai là chủ thật sự và căn nhà có đang bị thế chấp/nợ ngân hàng không. Yêu cầu môi giới cho xem trước khi đặt cọc để tránh mất tiền jeonse.",
      },
      {
        label: "Giấy tờ tùy thân của chủ nhà và của môi giới (공인중개사)",
        why: "Xác minh người ký hợp đồng đúng là chủ nhà, và môi giới có giấy phép hành nghề hợp pháp. Đây là tuyến phòng vệ chống lừa đảo.",
      },
      {
        label: "Tiền đặt cọc (보증금) và phí môi giới (중개수수료)",
        why: "Chuẩn bị đúng số tiền đã thỏa thuận. Chỉ chuyển khoản vào tài khoản đứng tên chính chủ nhà, không chuyển cho bên thứ ba.",
      },
      {
        label: "Hợp đồng thuê nhà bản chính (임대차계약서)",
        why: "Đọc kỹ số tiền cọc, tiền thuê hàng tháng, thời hạn, điều kiện trả cọc. Giữ bản gốc để làm 확정일자 (xác nhận ngày) bảo vệ quyền ưu tiên nhận lại cọc.",
      },
      {
        label: "Kế hoạch đăng ký chuyển đến (전입신고) + xác nhận ngày (확정일자)",
        why: "Sau khi dọn vào, ra 주민센터 (trung tâm hành chính) làm 전입신고 và 확정일자. Đây là bước pháp lý giúp bạn được ưu tiên đòi lại tiền cọc nếu chủ nhà vỡ nợ.",
      },
    ],
    tip: "Với jeonse (đặt cọc lớn), nên cân nhắc bảo hiểm bảo lãnh tiền cọc (전세보증보험). Nhiều người Việt mất tiền vì bỏ qua bước kiểm tra 등기부등본 — đừng bao giờ đặt cọc trước khi xem giấy này.",
  },
  {
    slug: "chuan-bi-ho-so-xin-viec",
    title: "Chuẩn bị hồ sơ xin việc",
    short:
      "Giấy tờ và tài liệu cần khi đi xin việc hoặc ký hợp đồng lao động tại Hàn Quốc.",
    emoji: "💼",
    items: [
      {
        label: "Thẻ đăng ký người nước ngoài + kiểm tra tư cách lưu trú cho phép làm việc",
        why: "Không phải visa nào cũng được đi làm tự do. Ví dụ D-2 (du học) phải xin giấy phép làm thêm (시간제 취업허가). Làm việc sai tư cách có thể bị trục xuất.",
      },
      {
        label: "Sơ yếu lý lịch (이력서) bằng tiếng Hàn",
        why: "Nhà tuyển dụng Hàn quen với mẫu 이력서 theo định dạng riêng (ảnh, học vấn, kinh nghiệm). Có bản tiếng Hàn giúp tăng cơ hội được gọi phỏng vấn.",
      },
      {
        label: "Thư giới thiệu bản thân (자기소개서) nếu công ty yêu cầu",
        why: "Nhiều công ty Hàn coi trọng 자기소개서 để đánh giá thái độ và động lực. Chuẩn bị sẵn một bản chuẩn để chỉnh sửa cho từng nơi.",
      },
      {
        label: "Bằng cấp / chứng chỉ (TOPIK, chứng chỉ nghề...)",
        why: "Chứng chỉ TOPIK chứng minh trình độ tiếng Hàn; chứng chỉ nghề tăng lợi thế. Mang bản gốc và bản dịch công chứng nếu là giấy tờ từ Việt Nam.",
      },
      {
        label: "Số tài khoản ngân hàng Hàn Quốc",
        why: "Công ty trả lương qua chuyển khoản. Cần có sẵn tài khoản đứng tên bạn để nhận lương và đăng ký bảo hiểm.",
      },
      {
        label: "Giấy khám sức khỏe (건강검진) nếu ngành nghề yêu cầu",
        why: "Ngành thực phẩm, chăm sóc, một số nhà máy yêu cầu giấy khám sức khỏe trước khi nhận. Hỏi trước để chuẩn bị kịp.",
      },
      {
        label: "Hợp đồng lao động (근로계약서) — đọc kỹ trước khi ký",
        why: "Luật Hàn bắt buộc phải có hợp đồng ghi rõ lương, giờ làm, ngày nghỉ. Giữ một bản. Đây là bằng chứng bảo vệ bạn nếu bị nợ lương hoặc tranh chấp.",
      },
    ],
    tip: "Nếu bị nợ lương hoặc đối xử bất công, gọi tổng đài 1350 (Bộ Lao động) hoặc 1345 (hỗ trợ người nước ngoài, có tiếng Việt). Đừng tự chịu thiệt vì ngại ngôn ngữ.",
  },
];

export function getSituation(slug: string): Situation | undefined {
  return checklists.find((s) => s.slug === slug);
}
