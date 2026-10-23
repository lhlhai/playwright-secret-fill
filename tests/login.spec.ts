// tests/login.spec.ts
import { test, expect } from './fixtures';

test('Thực hành Đăng Nhập Bảo Mật trên trang SauceDemo', async ({ page }) => {
  await page.goto('https://saucedemo.com');
  await page.fill('#user-name', 'standard_user');

  // Gọi biến môi trường qua `process.env`. Ép kiểu dữ liệu sang chuỗi ký tự bằng dấu `!`
  await page.fill('#password', process.env.SAUCE_PASSWORD!, { secret: true });

  await page.click('#login-button');
  await expect(page).toHaveURL('https://saucedemo.cominventory.html');
});
