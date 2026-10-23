// tests/fixtures.js
const { test: base } = require('@playwright/test');

// Ghi đè fixture 'page' của Playwright
const test = base.extend({
  page: async ({ page }, use) => {
    // Lưu lại hàm fill gốc của Playwright
    const originalFill = page.fill.bind(page);

    // Tiến hành ghi đè hàm fill để nhận thêm cấu hình ẩn log
    page.fill = async (selector, value, options = {}) => {
      if (options.secret) {
        // Sử dụng một hàm test.step trống hoàn toàn, không đính kèm dòng mã nguồn (code snippet)
        return await base.step('Điền thông tin bảo mật [REDACTED]', async () => {
          // Thực hiện gán dữ liệu trực tiếp bằng mã JS chạy ngầm trên Browser, 
          // bỏ qua hoàn toàn cơ chế ghi log mặc định của lệnh .fill()
          // Đoạn code tối ưu hóa dựa trên file của bạn
          const element = page.locator(selector);
          await element.evaluate((el, val) => {
            el.value = val;
            // Kích hoạt 'input' để các framework cập nhật State (React/Vue)
            el.dispatchEvent(new Event('input', { bubbles: true }));
            // Kích hoạt thêm 'change' để đảm bảo form ghi nhận dữ liệu đã hoàn tất thay đổi
            el.dispatchEvent(new Event('change', { bubbles: true }));
          }, value);

        });
      }

      // Nếu không có option secret, chạy hàm fill bình thường
      return originalFill(selector, value, options);
    };

    await use(page);
  },
});

module.exports = { test, expect: base.expect };
