export type Category = {
  id: string;
  name: string;
  emoji: string;
};

export const categories: Category[] = [
  { id: "giay-to", name: "Giấy tờ & Cư trú", emoji: "🪪" },
  { id: "y-te", name: "Y tế & Gia đình", emoji: "🏥" },
  { id: "tien-bac", name: "Tiền bạc & Thuế", emoji: "💰" },
  { id: "cong-viec", name: "Công việc & Quyền lợi", emoji: "💼" },
  { id: "doi-song", name: "Đời sống hằng ngày", emoji: "🏠" },
];

export type Situation = {
  slug: string;
  title: string;
  short: string;
  emoji: string;
  category: string;
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
    category: "y-te",
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
    category: "giay-to",
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
    category: "tien-bac",
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
    category: "doi-song",
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
    category: "cong-viec",
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
  {
    slug: "dang-ky-sim-dien-thoai",
    title: "Đăng ký SIM điện thoại chính chủ",
    short:
      "Mở số điện thoại Hàn Quốc đứng tên mình — chìa khóa cho mọi dịch vụ online tại Hàn.",
    emoji: "📱",
    category: "doi-song",
    items: [
      {
        label: "Thẻ đăng ký người nước ngoài (외국인등록증)",
        why: "Bắt buộc để đăng ký SIM trả sau (후불) chính chủ. Số điện thoại chính chủ là điều kiện để xác thực danh tính (본인인증) khi dùng app ngân hàng, trang chính phủ, mua vé...",
      },
      {
        label: "Hộ chiếu (nếu chưa có ARC)",
        why: "Chưa có ARC vẫn có thể mua SIM trả trước (선불) bằng hộ chiếu tại sân bay hoặc cửa hàng nhà mạng, nhưng một số dịch vụ xác thực sẽ bị hạn chế.",
      },
      {
        label: "Tài khoản ngân hàng hoặc thẻ để trừ cước tự động (자동이체)",
        why: "SIM trả sau yêu cầu đăng ký phương thức thanh toán cước hàng tháng. Chưa có tài khoản thì dùng SIM trả trước trước, mở tài khoản rồi chuyển sang trả sau.",
      },
      {
        label: "Kiểm tra thời hạn lưu trú còn lại trên ARC",
        why: "Nhà mạng thường chỉ cho ký hợp đồng (đặc biệt trả góp máy) trong phạm vi thời hạn visa còn lại. Visa sắp hết hạn nên gia hạn trước rồi mới ký gói dài.",
      },
      {
        label: "So sánh nhà mạng lớn (SKT/KT/LG U+) và mạng giá rẻ (알뜰폰)",
        why: "알뜰폰 (MVNO) dùng chung sóng với nhà mạng lớn nhưng cước rẻ hơn nhiều, phù hợp nếu bạn không cần mua máy trả góp. Có thể đăng ký online.",
      },
    ],
    tip: "Tuyệt đối không đứng tên hộ SIM cho người khác và không dùng SIM đứng tên người khác — nếu số đó bị dùng vào việc xấu (lừa đảo, vay nợ), người đứng tên phải chịu trách nhiệm.",
  },
  {
    slug: "doi-bang-lai-xe",
    title: "Đổi bằng lái xe Việt Nam sang bằng Hàn Quốc",
    short:
      "Thủ tục đổi bằng lái xe Việt Nam sang bằng lái Hàn Quốc tại trung tâm sát hạch (운전면허시험장).",
    emoji: "🚗",
    category: "doi-song",
    items: [
      {
        label: "Bằng lái xe Việt Nam bản gốc (còn hiệu lực)",
        why: "Là căn cứ để được miễn một phần kỳ thi. Bằng hết hạn hoặc bị mờ thông tin có thể không được chấp nhận.",
      },
      {
        label: "Giấy xác nhận bằng lái của Đại sứ quán Việt Nam (대사관 확인서)",
        why: "Cơ quan Hàn Quốc cần xác minh bằng lái Việt Nam là thật. Liên hệ Đại sứ quán/Lãnh sự quán Việt Nam để xin giấy xác nhận hoặc hợp pháp hóa lãnh sự trước.",
      },
      {
        label: "Hộ chiếu + thẻ đăng ký người nước ngoài (외국인등록증)",
        why: "Xác định danh tính và nơi cư trú. Cần cư trú hợp pháp tại Hàn để được cấp bằng.",
      },
      {
        label: "Ảnh thẻ 3.5 x 4.5 cm (2–3 tấm, nền trắng)",
        why: "Dùng cho hồ sơ và in bằng lái mới. Chụp đúng chuẩn để không phải chụp lại tại chỗ với giá đắt hơn.",
      },
      {
        label: "Kiểm tra sức khỏe tại chỗ (신체검사) + lệ phí",
        why: "Trung tâm sát hạch có phòng khám sức khỏe ngay tại chỗ (kiểm tra thị lực là chính). Chuẩn bị vài chục nghìn won cho phí khám và lệ phí cấp bằng.",
      },
      {
        label: "Ôn thi lý thuyết (학과시험) — có đề thi tiếng Việt",
        why: "Người đổi bằng từ Việt Nam thường phải thi đậu lý thuyết. Kỳ thi có hỗ trợ tiếng Việt trên máy tính, ôn trước bằng app/sách đề thi để đậu ngay lần đầu.",
      },
    ],
    tip: "Thủ tục có thể khác nhau theo thời điểm và nơi cấp — kiểm tra trước trên trang 안전운전 통합민원 (safedriving.or.kr) hoặc gọi 1345. Lưu ý: khi đổi sang bằng Hàn, bản gốc bằng Việt Nam thường bị giữ lại.",
  },
  {
    slug: "khai-bao-chuyen-nha",
    title: "Chuyển nhà — khai báo địa chỉ mới",
    short:
      "Sau khi chuyển nhà phải khai báo nơi cư trú mới (전입신고 / 체류지 변경신고) trong 14 ngày.",
    emoji: "📦",
    category: "giay-to",
    items: [
      {
        label: "Thẻ đăng ký người nước ngoài (외국인등록증)",
        why: "Địa chỉ trên hệ thống xuất nhập cảnh phải khớp nơi ở thật. Khai báo muộn quá 14 ngày có thể bị phạt tiền và ảnh hưởng gia hạn visa sau này.",
      },
      {
        label: "Hợp đồng thuê nhà mới (임대차계약서 bản gốc)",
        why: "Là bằng chứng bạn thực sự chuyển đến địa chỉ mới. Nếu ở nhờ nhà người khác, cần giấy xác nhận cung cấp chỗ ở (숙소제공 확인서) của chủ nhà.",
      },
      {
        label: "Đến 주민센터 khu vực mới hoặc khai online",
        why: "Người nước ngoài có thể khai báo thay đổi nơi cư trú tại trung tâm hành chính (주민센터) nơi ở mới hoặc văn phòng xuất nhập cảnh. Một số trường hợp khai được online qua Hi Korea/정부24.",
      },
      {
        label: "Làm luôn xác nhận ngày (확정일자) cho hợp đồng mới",
        why: "Nếu bạn thuê nhà có tiền cọc, làm 확정일자 ngay khi khai báo chuyển đến giúp bảo vệ quyền ưu tiên nhận lại tiền cọc nếu chủ nhà vỡ nợ.",
      },
      {
        label: "Cập nhật địa chỉ với ngân hàng, công ty, nhà mạng",
        why: "Thư quan trọng (thẻ mới, giấy báo thuế, giấy tờ bảo hiểm) gửi về địa chỉ cũ rất dễ thất lạc. Cập nhật ngay sau khi khai báo.",
      },
    ],
    tip: "Khai báo địa chỉ đúng hạn tưởng nhỏ nhưng rất quan trọng: đây là một trong các mục bị kiểm tra khi gia hạn visa, và cũng là điều kiện để nhận nhiều hỗ trợ theo khu vực.",
  },
  {
    slug: "mat-giay-to",
    title: "Mất thẻ ARC / hộ chiếu — làm lại thế nào",
    short:
      "Các bước cần làm ngay khi mất thẻ đăng ký người nước ngoài hoặc hộ chiếu tại Hàn Quốc.",
    emoji: "🆘",
    category: "giay-to",
    items: [
      {
        label: "Báo mất với cảnh sát (분실신고) — lấy giấy xác nhận nếu cần",
        why: "Báo mất giúp tránh bị người khác lạm dụng giấy tờ của bạn, và giấy xác nhận báo mất thường cần cho hồ sơ cấp lại hộ chiếu. Có thể báo tại đồn cảnh sát gần nhất hoặc qua tổng đài 112.",
      },
      {
        label: "Xin cấp lại ARC tại văn phòng xuất nhập cảnh trong 14 ngày",
        why: "Luật quy định phải xin cấp lại thẻ trong vòng 14 ngày kể từ khi biết mất. Mang hộ chiếu, ảnh thẻ 3.5x4.5cm và lệ phí (khoảng 30.000 KRW). Đặt lịch hẹn trước trên Hi Korea.",
      },
      {
        label: "Mất hộ chiếu: liên hệ Đại sứ quán Việt Nam tại Seoul",
        why: "Chỉ cơ quan đại diện Việt Nam mới cấp lại được hộ chiếu. Chuẩn bị giấy báo mất của cảnh sát, ảnh thẻ, và giấy tờ tùy thân còn lại (bản sao hộ chiếu cũ nếu có).",
      },
      {
        label: "Ảnh thẻ 3.5 x 4.5 cm (chuẩn bị sẵn vài tấm)",
        why: "Cả cấp lại ARC lẫn hộ chiếu đều cần ảnh chuẩn hộ chiếu, nền trắng, chụp gần đây.",
      },
      {
        label: "Khóa/báo ngân hàng và nhà mạng nếu mất cả ví",
        why: "Nếu mất kèm thẻ ngân hàng hoặc điện thoại, gọi ngay ngân hàng khóa thẻ và nhà mạng khóa SIM để tránh bị rút tiền hoặc mạo danh.",
      },
    ],
    tip: "Ngay từ bây giờ: chụp ảnh hộ chiếu, ARC, hợp đồng nhà và lưu vào email/cloud của bạn. Khi mất giấy tờ, có bản chụp sẽ giúp mọi thủ tục cấp lại nhanh hơn rất nhiều.",
  },
  {
    slug: "gui-tien-ve-viet-nam",
    title: "Gửi tiền về Việt Nam an toàn",
    short:
      "Cách gửi tiền về cho gia đình đúng luật, phí thấp, tránh rủi ro mất tiền.",
    emoji: "💸",
    category: "tien-bac",
    items: [
      {
        label: "Thẻ đăng ký người nước ngoài + tài khoản ngân hàng chính chủ",
        why: "Gửi tiền quốc tế qua kênh chính thức luôn yêu cầu định danh người gửi. Tài khoản chính chủ cũng là bằng chứng nguồn tiền hợp pháp (lương).",
      },
      {
        label: "Thông tin người nhận chính xác (họ tên đúng CMND/CCCD, số tài khoản, tên ngân hàng)",
        why: "Sai một chữ trong tên người nhận có thể khiến tiền bị treo hoặc trả lại, mất thêm phí và thời gian. Chụp màn hình thông tin để đối chiếu.",
      },
      {
        label: "So sánh kênh gửi: ngân hàng vs app chuyển tiền được cấp phép (GME, E9pay, Hanpass, Sentbe...)",
        why: "Các app chuyển tiền quốc tế được cấp phép thường có tỷ giá tốt và phí thấp hơn quầy ngân hàng, thao tác hoàn toàn bằng tiếng Việt. So sánh tỷ giá thực nhận trước khi gửi.",
      },
      {
        label: "Giấy tờ chứng minh thu nhập nếu gửi số tiền lớn",
        why: "Gửi vượt hạn mức nhất định, ngân hàng có thể yêu cầu hợp đồng lao động hoặc bảng lương để xác nhận nguồn tiền. Chuẩn bị sẵn để không bị chặn giao dịch.",
      },
      {
        label: "Tuyệt đối tránh chuyển tiền tay ba / 환치기 (kênh không phép)",
        why: "Nhờ người 'đổi tiền tay' tuy nhanh nhưng là hành vi vi phạm luật ngoại hối — có thể bị phạt nặng, và nếu bị lừa thì không được pháp luật bảo vệ, mất trắng.",
      },
    ],
    tip: "Đăng ký một app chuyển tiền được cấp phép ngay khi có ARC và tài khoản — vừa rẻ hơn, vừa có lịch sử giao dịch rõ ràng (hữu ích khi khai thuế hoặc chứng minh gửi tiền nuôi gia đình).",
  },
  {
    slug: "quyet-toan-thue-cuoi-nam",
    title: "Quyết toán thuế cuối năm (연말정산)",
    short:
      "Người đi làm tại Hàn đều phải quyết toán thuế đầu năm — chuẩn bị đúng sẽ được hoàn tiền.",
    emoji: "🧾",
    category: "tien-bac",
    items: [
      {
        label: "Đăng nhập được Hometax (홈택스) — cần xác thực danh tính",
        why: "Từ giữa tháng 1, dịch vụ 연말정산 간소화 trên Hometax tự động gom hầu hết chứng từ khấu trừ (y tế, thẻ tín dụng, bảo hiểm...). Cần SIM chính chủ hoặc chứng thư số để đăng nhập.",
      },
      {
        label: "Chứng từ tiền thuê nhà nếu muốn khấu trừ tiền thuê (월세 세액공제)",
        why: "Người thu nhập dưới ngưỡng quy định thuê nhà wolse có thể được khấu trừ một phần tiền thuê: cần hợp đồng thuê nhà, bằng chứng chuyển khoản tiền thuê, và đã khai báo chuyển đến (전입신고) tại địa chỉ đó.",
      },
      {
        label: "Giấy tờ người phụ thuộc ở Việt Nam (nếu khai)",
        why: "Muốn khai bố mẹ/vợ chồng/con ở Việt Nam là người phụ thuộc, cần giấy tờ chứng minh quan hệ gia đình (dịch công chứng) và thường kèm bằng chứng gửi tiền chu cấp. Khai đúng sẽ giảm đáng kể thuế.",
      },
      {
        label: "Nộp hồ sơ cho công ty đúng hạn công ty yêu cầu",
        why: "Công ty tổng hợp hồ sơ của nhân viên thường trong tháng 1–2. Trễ hạn có thể phải tự khai riêng vào tháng 5 (종합소득세 신고), phiền hơn nhiều.",
      },
      {
        label: "Kiểm tra lựa chọn thuế suất cố định cho người nước ngoài (외국인 단일세율)",
        why: "Người lao động nước ngoài có thể chọn áp dụng thuế suất cố định (khoảng 19%, cộng thuế địa phương) thay cho biểu thuế lũy tiến. Lương cao thì có lợi, lương thấp thì thường bất lợi — nhờ kế toán công ty tính thử cả hai.",
      },
    ],
    tip: "연말정산 là quyền lợi chứ không chỉ là nghĩa vụ: rất nhiều người nước ngoài được hoàn thuế về tài khoản vào tháng 2–3. Đừng bỏ qua vì thấy phức tạp — hỏi phòng kế toán công ty, họ có nghĩa vụ hỗ trợ.",
  },
  {
    slug: "bi-no-luong",
    title: "Bị nợ lương (임금체불) — cách đòi lại",
    short:
      "Chủ không trả lương hoặc trả thiếu? Đây là các bước và giấy tờ để đòi lại tiền của bạn.",
    emoji: "⚖️",
    category: "cong-viec",
    items: [
      {
        label: "Hợp đồng lao động (근로계약서) hoặc bằng chứng thỏa thuận lương",
        why: "Là bằng chứng mạnh nhất về mức lương đã thỏa thuận. Không có hợp đồng thì gom tin nhắn, ghi âm, thông báo tuyển dụng có ghi mức lương.",
      },
      {
        label: "Bằng chứng đã làm việc: bảng chấm công, lịch làm, ảnh chụp tại nơi làm, tin nhắn với quản lý",
        why: "Cơ quan lao động cần xác định bạn đã làm bao nhiêu giờ/ngày để tính số tiền bị nợ. Càng cụ thể càng đòi được nhanh.",
      },
      {
        label: "Sao kê tài khoản nhận lương các tháng trước",
        why: "Cho thấy lịch sử trả lương và tháng nào bị thiếu/không trả. In hoặc chụp màn hình từ app ngân hàng.",
      },
      {
        label: "Thông tin nơi làm việc: tên công ty/quán, địa chỉ, tên chủ, số điện thoại",
        why: "Cần để cơ quan lao động triệu tập chủ. Chụp biển hiệu, danh thiếp, hoặc giấy phép kinh doanh treo trong quán nếu có.",
      },
      {
        label: "Nộp đơn khiếu nại (진정서) lên Văn phòng Lao động (고용노동부)",
        why: "Nộp online tại minwon.moel.go.kr hoặc đến trực tiếp 노동청 khu vực. Đây là thủ tục miễn phí, có thể yêu cầu phiên dịch. Chủ bị triệu tập và đa số vụ được giải quyết ở bước này.",
      },
      {
        label: "Gọi 1350 (Bộ Lao động) hoặc trung tâm hỗ trợ lao động nước ngoài (외국인노동자지원센터)",
        why: "Tư vấn miễn phí bằng tiếng Việt về cách viết đơn, chuẩn bị bằng chứng, và các chế độ như tiền lương thay thế (대지급금) khi công ty phá sản.",
      },
    ],
    tip: "Tiền lương của bạn được pháp luật Hàn Quốc bảo vệ. Đừng im lặng chịu thiệt vì sợ tiếng Hàn kém — các trung tâm hỗ trợ có phiên dịch tiếng Việt và đã xử lý hàng nghìn vụ tương tự.",
  },
  {
    slug: "tai-nan-lao-dong",
    title: "Tai nạn lao động (산재) — xin bồi thường",
    short:
      "Bị thương khi làm việc: cách được điều trị và nhận bồi thường qua bảo hiểm tai nạn lao động.",
    emoji: "🩹",
    category: "cong-viec",
    items: [
      {
        label: "Điều trị ngay và giữ toàn bộ hồ sơ y tế (진단서, hóa đơn viện phí)",
        why: "Sức khỏe trước tiên. Giấy chẩn đoán của bác sĩ ghi rõ thương tích và thời gian điều trị là căn cứ chính để xét bồi thường.",
      },
      {
        label: "Bằng chứng tai nạn xảy ra khi làm việc: ảnh hiện trường, đồng nghiệp làm chứng, tin nhắn báo cho quản lý",
        why: "Cần chứng minh thương tích xảy ra trong lúc làm việc hoặc do công việc. Ghi lại ngay khi còn mới — để lâu rất khó thu thập.",
      },
      {
        label: "Đơn xin trợ cấp điều trị (요양급여신청서) nộp cho Công đoàn phúc lợi lao động (근로복지공단)",
        why: "Đây là hồ sơ chính thức xin bảo hiểm 산재. Quan trọng: người lao động tự nộp được, không cần chủ đồng ý hay ký tên.",
      },
      {
        label: "Thông tin nơi làm việc và hợp đồng lao động (nếu có)",
        why: "Để xác định nơi làm việc có tham gia bảo hiểm 산재. Kể cả khi chủ chưa đóng bảo hiểm, người lao động vẫn được bồi thường — nhà nước truy thu chủ sau.",
      },
      {
        label: "Gọi 1350 hoặc trung tâm hỗ trợ lao động nước ngoài trước khi ký bất kỳ giấy gì với chủ",
        why: "Nhiều chủ đề nghị 'thỏa thuận riêng' (공상처리) để không báo bảo hiểm. Nhận tiền riêng có thể khiến bạn mất quyền điều trị dài hạn và bồi thường di chứng về sau.",
      },
    ],
    tip: "Bảo hiểm tai nạn lao động áp dụng cho hầu hết người lao động tại Hàn, kể cả người làm việc không đúng tư cách lưu trú. Đừng vì lo visa mà bỏ quyền được điều trị và bồi thường.",
  },
  {
    slug: "chuan-bi-ve-nuoc",
    title: "Về nước — nhận lại các khoản tiền của bạn",
    short:
      "Trước khi rời Hàn Quốc, đừng quên các khoản tiền bạn có quyền nhận: trợ cấp thôi việc, bảo hiểm, lương hưu.",
    emoji: "✈️",
    category: "cong-viec",
    items: [
      {
        label: "Trợ cấp thôi việc (퇴직금) — làm đủ 1 năm trở lên là có quyền nhận",
        why: "Luật quy định làm liên tục từ 1 năm được nhận trợ cấp thôi việc tương đương ít nhất 1 tháng lương mỗi năm làm việc. Xác nhận với công ty trước ngày nghỉ.",
      },
      {
        label: "Bảo hiểm mãn hạn xuất cảnh (출국만기보험) — dành cho lao động E-9",
        why: "Công ty đóng thay khoản này hàng tháng cho lao động E-9. Khi về nước hẳn, đăng ký nhận qua ngân hàng/공단 — nhận tại sân bay hoặc chuyển vào tài khoản sau khi xuất cảnh.",
      },
      {
        label: "Hoàn trả lương hưu quốc dân (국민연금 반환일시금)",
        why: "Người lao động Việt Nam đã đóng 국민연금 có thể được nhận lại một lần khi rời Hàn Quốc hẳn. Hỏi Cơ quan Hưu trí quốc dân (tổng đài 1355) hoặc chi nhánh tại sân bay Incheon về điều kiện của bạn.",
      },
      {
        label: "Hộ chiếu, ARC, vé máy bay một chiều, số tài khoản nhận tiền",
        why: "Hồ sơ nhận các khoản tiền trên đều cần chứng minh bạn xuất cảnh hẳn (vé máy bay) và nơi nhận tiền (tài khoản Hàn còn dùng được hoặc tài khoản Việt Nam).",
      },
      {
        label: "Quyết toán bảo hiểm y tế, hủy SIM, hủy tự động thanh toán",
        why: "Tránh phát sinh nợ cước sau khi về nước (rất khó xử lý từ Việt Nam). Ra ngân hàng và nhà mạng hủy hoặc đổi trước ngày bay.",
      },
      {
        label: "Xin giấy xác nhận kinh nghiệm làm việc (경력증명서) từ công ty",
        why: "Giấy này rất giá trị khi xin việc ở Việt Nam hoặc khi muốn quay lại Hàn theo diện lao động lành nghề sau này.",
      },
    ],
    tip: "Bắt đầu chuẩn bị các thủ tục nhận tiền ít nhất 1 tháng trước ngày bay. Về nước rồi mới đòi từ xa rất mất thời gian và có khoản sẽ mất quyền nhận sau vài năm.",
  },
  {
    slug: "mang-thai-sinh-con",
    title: "Mang thai & sinh con tại Hàn Quốc",
    short:
      "Các hỗ trợ và giấy tờ cần biết khi mang thai, sinh con và khai sinh cho bé tại Hàn.",
    emoji: "🤰",
    category: "y-te",
    items: [
      {
        label: "Giấy xác nhận mang thai (임신확인서) từ phòng khám sản",
        why: "Là giấy đầu tiên cần có để đăng ký các chế độ hỗ trợ thai sản. Khám ở phòng khám sản phụ khoa (산부인과) gần nhà.",
      },
      {
        label: "Đăng ký thẻ hỗ trợ chi phí khám thai (국민행복카드)",
        why: "Người tham gia bảo hiểm y tế được hỗ trợ khoảng 100만 won chi phí khám thai và sinh nở qua thẻ này. Đăng ký tại ngân hàng hoặc công ty thẻ với giấy xác nhận mang thai.",
      },
      {
        label: "Đăng ký thai phụ tại trạm y tế công (보건소)",
        why: "보건소 phát miễn phí axit folic, viên sắt, và nhiều nơi có khám thai, xét nghiệm miễn phí. Nhiều địa phương hỗ trợ cả mẹ bầu người nước ngoài — mang ARC đến hỏi.",
      },
      {
        label: "Kế hoạch khai sinh cho bé trong 90 ngày sau sinh",
        why: "Bé sinh tại Hàn cần: khai sinh với Đại sứ quán Việt Nam (nhận quốc tịch VN) và/hoặc đăng ký khai sinh Hàn nếu bố hoặc mẹ là người Hàn. Bé mang quốc tịch nước ngoài phải đăng ký lưu trú (외국인등록) trong 90 ngày.",
      },
      {
        label: "Tìm hiểu trung tâm hỗ trợ gia đình đa văn hóa (다문화가족지원센터) khu vực",
        why: "Nếu bạn là gia đình đa văn hóa (vợ/chồng người Hàn), trung tâm có lớp tiền sản, phiên dịch đi khám, thăm sản phụ sau sinh — miễn phí và có tiếng Việt.",
      },
      {
        label: "Tổng đài Danuri 1577-1366 (tiếng Việt, 24 giờ)",
        why: "Tư vấn mọi vấn đề thai sản, nuôi con, và cả bạo lực gia đình cho phụ nữ di trú. Có thể gọi bất cứ lúc nào, hoàn toàn bằng tiếng Việt.",
      },
    ],
    tip: "Các khoản hỗ trợ sinh con (tiền thưởng sinh con, trợ cấp nuôi con...) khác nhau tùy tư cách lưu trú và địa phương. Gọi 1577-1366 hoặc đến 주민센터 hỏi trực tiếp danh sách hỗ trợ bạn được nhận — nhiều người bỏ lỡ tiền vì không biết.",
  },
  {
    slug: "cho-con-vao-truong",
    title: "Cho con vào trường học tại Hàn",
    short:
      "Thủ tục nhập học tiểu học/trung học cho con em gia đình Việt Nam đang sống tại Hàn Quốc.",
    emoji: "🎒",
    category: "y-te",
    items: [
      {
        label: "Giấy tờ cư trú của bé (ARC của bé hoặc giấy tờ chứng minh đang sống tại khu vực)",
        why: "Trẻ em được nhận vào tiểu học và trung học cơ sở kể cả khi tư cách lưu trú chưa hoàn chỉnh — hợp đồng thuê nhà hoặc hóa đơn điện nước cũng có thể dùng chứng minh nơi ở.",
      },
      {
        label: "Hộ chiếu và giấy khai sinh của bé (kèm bản dịch)",
        why: "Trường cần xác định danh tính, tuổi để xếp lớp. Giấy khai sinh Việt Nam nên có bản dịch tiếng Hàn (công chứng càng tốt).",
      },
      {
        label: "Sổ/giấy xác nhận tiêm chủng (dịch sang tiếng Hàn)",
        why: "Trường yêu cầu lịch sử tiêm chủng để bổ sung mũi còn thiếu theo lịch của Hàn. Thiếu sổ thì đến 보건소 xét nghiệm và tiêm bổ sung.",
      },
      {
        label: "Học bạ/giấy xác nhận học tập ở Việt Nam (nếu chuyển cấp giữa chừng)",
        why: "Để xếp đúng lớp tương ứng. Không có giấy tờ, trường có thể xếp lớp qua phỏng vấn/kiểm tra — liên hệ 교육지원청 (phòng giáo dục khu vực) để được hướng dẫn.",
      },
      {
        label: "Đăng ký lớp tiếng Hàn hỗ trợ (한국어학급 / chương trình đa văn hóa)",
        why: "Nhiều trường có lớp tiếng Hàn riêng cho học sinh mới đến. Học kèm tiếng Hàn giúp con hòa nhập nhanh, không bị hụt kiến thức.",
      },
      {
        label: "Liên hệ trung tâm hỗ trợ gia đình đa văn hóa (다문화가족지원센터)",
        why: "Có dịch vụ hỗ trợ nhập học, phiên dịch buổi họp phụ huynh, và chương trình học kèm cho con em gia đình đa văn hóa — miễn phí.",
      },
    ],
    tip: "Giáo dục tiểu học và THCS công lập tại Hàn miễn học phí. Quyền đi học của trẻ em được đảm bảo bất kể tình trạng visa của bố mẹ — đừng để con gián đoạn việc học vì lo lắng giấy tờ.",
  },
];

export function getSituation(slug: string): Situation | undefined {
  return checklists.find((s) => s.slug === slug);
}

export function getCategory(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}
