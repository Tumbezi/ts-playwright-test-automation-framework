import { Page, Locator, expect } from '@playwright/test';

export class GamePage {
  readonly page: Page;
  readonly newGameButton: Locator;
  readonly tileContainer: Locator;

  constructor(page: Page) {
    this.page = page;
    // Rajataan haku koskemaan vain sivun yläosaa/headeria, jotta se ei mene sekaisin modaalin nappien kanssa
    this.newGameButton = page.locator('header button, .flex.items-center button').filter({ hasText: 'New Game' }).first();
    this.tileContainer = page.locator('.grid, [class*="grid"], .tile-container').first();
  }

  async goto() {
    await this.page.goto('https://play2048.co/');
    await this.page.waitForLoadState('domcontentloaded');
    await this.removeCookieOverlay();
  }

  async removeCookieOverlay() {
    await this.page.evaluate(() => {
      const cmp = document.getElementById('cmpwrapper');
      if (cmp) {
        cmp.remove();
      }
    }).catch(() => {});
  }

  async move(direction: 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight') {
    await this.page.keyboard.press(direction);
    await this.page.waitForTimeout(200);
  }

  async startNewGame() {
    await this.removeCookieOverlay();
    await this.newGameButton.click({ force: true });
    
    // Odotetaan että vahvistusikkunan nappi on näkyvissä ja klikataan sitä
    const confirmBtn = this.page.getByRole('button', { name: 'Start New Game' });
    await confirmBtn.waitFor({ state: 'visible' });
    await confirmBtn.click({ force: true });
  }

  async cancelNewGame() {
    await this.removeCookieOverlay();
    await this.newGameButton.click({ force: true });
    
    // Odotetaan että Cancel-nappi on näkyvissä ja klikataan sitä
    const cancelBtn = this.page.getByRole('button', { name: 'Cancel' });
    await cancelBtn.waitFor({ state: 'visible' });
    await cancelBtn.click({ force: true });
  }
}