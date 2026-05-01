export interface FaqItem {
  id: string
  question: string
  answer: string
}

export const faqItems: FaqItem[] = [
  {
    id: 'faq-booking',
    question: 'Làm sao đặt lịch?',
    answer:
      'Bạn vào mục "Đặt lịch" trên trang chủ, chọn chi nhánh, dịch vụ, kỹ thuật viên và khung giờ mong muốn. Sau khi xác nhận, mã lịch hẹn sẽ được gửi qua Zalo và lưu trong "Lịch hẹn của tôi".',
  },
  {
    id: 'faq-cancellation',
    question: 'Chính sách hủy lịch?',
    answer:
      'Bạn có thể hủy miễn phí trước giờ hẹn 2 tiếng. Nếu hủy trong vòng 2 tiếng sẽ tính phí 20% giá trị dịch vụ; vắng mặt không báo trước sẽ tính phí 50%.',
  },
  {
    id: 'faq-points',
    question: 'Tích điểm như thế nào?',
    answer:
      'Mỗi lần đặt lịch hoàn tất, bạn được tích 2% giá trị hóa đơn (hạng Silver). Điểm có thể đổi voucher trong mục "Đổi điểm" và sẽ được cập nhật vào ví ngay sau khi đổi.',
  },
  {
    id: 'faq-change-technician',
    question: 'Có thể đổi KTV không?',
    answer:
      'Bạn có thể đổi kỹ thuật viên trước giờ hẹn ít nhất 1 tiếng bằng cách vào "Lịch hẹn của tôi" và chọn "Đổi KTV". Nếu KTV mới còn trống slot, hệ thống sẽ tự cập nhật lịch ngay.',
  },
  {
    id: 'faq-payment',
    question: 'Các hình thức thanh toán?',
    answer:
      'Salon hỗ trợ thanh toán tại quầy bằng tiền mặt, thẻ ngân hàng, ZaloPay, Momo và VNPay. Một số chi nhánh còn cho phép trả trước qua Zalo Mini App khi đặt lịch.',
  },
]
