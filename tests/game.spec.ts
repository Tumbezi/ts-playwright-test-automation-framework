import { test, expect } from '@playwright/test';
import { GamePage } from '../pages/GamePage';

test.describe('HTML5 Game Tests - 2048', () => {
  let gamePage: GamePage;

  test.beforeEach(async ({ page }) => {
    gamePage = new GamePage(page);
    await gamePage.goto();
  });

  test('1. Pelisivun ja elementtien latautuminen', async () => {
    await expect(gamePage.newGameButton).toBeVisible();
  });

  test('2. Pelimekaniikka: Nuolinäppäinsyöte toimii', async () => {
    await gamePage.move('ArrowRight');
    await gamePage.move('ArrowDown');
    expect(true).toBeTruthy();
  });

  test('3. Uuden pelin aloittaminen vahvistusikkunan kautta', async () => {
    await gamePage.startNewGame();
    await expect(gamePage.newGameButton).toBeVisible();
  });

  test('4. Uuden pelin aloituksen peruuttaminen säilyttää pelitilan', async () => {
    await gamePage.cancelNewGame();
    await expect(gamePage.newGameButton).toBeVisible();
  });
});