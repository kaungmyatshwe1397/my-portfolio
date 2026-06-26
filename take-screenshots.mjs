import { chromium } from 'playwright';
import { mkdir } from 'fs/promises';
import { join } from 'path';

const SECTIONS = [
  { name: 'about', id: 'about' },
  { name: 'techstack', id: 'skills' },
  { name: 'github', id: 'github' },
  { name: 'cta-footer', id: 'contact' },
];

const VIEWPORTS = {
  desktop: { width: 1280, height: 800, label: 'desktop' },
  mobile: { width: 390, height: 844, label: 'mobile' },
};

async function takeScreenshots() {
  const screenshotDir = join(process.cwd(), 'screenshots');
  await mkdir(screenshotDir, { recursive: true });

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    env: {
      ...process.env,
      LD_LIBRARY_PATH: '/tmp/libs/usr/lib/x86_64-linux-gnu:' + (process.env.LD_LIBRARY_PATH || ''),
    },
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  console.log('Loading portfolio...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 60000 });

  // Wait for loading screen to finish
  await page.waitForTimeout(6000);

  for (const [viewportKey, viewport] of Object.entries(VIEWPORTS)) {
    console.log(`\n--- ${viewport.label.toUpperCase()} (${viewport.width}x${viewport.height}) ---`);
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.waitForTimeout(1000);

    for (const section of SECTIONS) {
      // Scroll to the section
      const scrolled = await page.evaluate((id) => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'instant', block: 'start' });
          return true;
        }
        return false;
      }, section.id);

      if (!scrolled) {
        console.log(`  ⚠ Section #${section.id} not found, skipping...`);
        continue;
      }

      await page.waitForTimeout(2000);

      const filename = `${section.name}-${viewport.label}.png`;
      const filepath = join(screenshotDir, filename);

      await page.screenshot({ path: filepath, fullPage: false });
      console.log(`  ✓ ${filename}`);
    }
  }

  await browser.close();
  console.log('\n✅ All screenshots saved to ./screenshots/');
}

takeScreenshots().catch(console.error);
