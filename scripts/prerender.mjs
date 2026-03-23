import puppeteer from 'puppeteer';
import { preview } from 'vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.resolve(__dirname, '../dist');

const staticRoutes = [
  '/',
  '/vignoble', '/vins', '/cuvee-des-apprentis', '/oenotourisme',
  '/partenaires', '/sponsoring', '/contact', '/connexion',
  '/a-propos', '/conditions-generales', '/actualites', '/checkout',
  '/en', '/en/vineyard', '/en/wines', '/en/apprentice-wines',
  '/en/wine-tourism', '/en/partners', '/en/sponsorship', '/en/contact',
  '/en/login', '/en/about', '/en/terms', '/en/news', '/en/checkout',
  '/de', '/de/weinberg', '/de/weine', '/de/lehrlingsweine',
  '/de/weintourismus', '/de/partner', '/de/sponsoring', '/de/kontakt',
  '/de/anmelden', '/de/ueber-uns', '/de/agb', '/de/aktuelles', '/de/checkout',
];

const productSlugs = [
  'fendant', 'johannisberg', 'paien', 'petite-arvine', 'humagne-blanc',
  'marsanne', 'sion-doux', 'rose-de-syrah', 'gamay', 'pinot-noir',
  'humagne-rouge', 'syrah', 'cornalin', 'merlot', 'e-boe', 'torpa',
  'lo-grafion', 'purple-rain', 'lo-teron', 'gota', 'lo-grafion-reserve',
  'lo-mota', 'valentine', 'tire-bouchon', 'huile-lo-grafion',
  'huile-petite-arvine', 'huile-syrah', 'isovin-product', 'e-boe-noel',
];

const productRoutes = productSlugs.flatMap(slug => [
  `/vins/${slug}`,
  `/en/wines/${slug}`,
  `/de/weine/${slug}`,
]);

const blogSlugs = [
  'filet-mignon', 'poisson-creme', 'roti-cerf', 'magret-figues',
  'veloute-chataigne', 'magret-cornalin', 'feuillete-volaille', 'truffes-choco',
  'panna-cotta', 'risotto-paien', 'vin-chaud', 'dinde-pinot',
  'oenotourisme-blog', 'millesime-2004', 'millesime-2005', 'millesime-2006',
  'millesime-2007', 'millesime-2008', 'millesime-2009', 'millesime-2010',
  'millesime-2011', 'millesime-2012', 'millesime-2013', 'millesime-2014',
  'millesime-2015', 'millesime-2016',
];

const blogRoutes = blogSlugs.flatMap(slug => [
  `/actualites/${slug}`,
  `/en/news/${slug}`,
  `/de/aktuelles/${slug}`,
]);

const allRoutes = [...staticRoutes, ...productRoutes, ...blogRoutes];

async function prerender() {
  console.log(`\n🚀 Prerendering ${allRoutes.length} routes...\n`);

  const server = await preview({
    preview: { port: 4567, strictPort: true },
  });

  const port = 4567;
  console.log(`📡 Preview server on port ${port}`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  let success = 0;
  let failed = 0;

  for (let i = 0; i < allRoutes.length; i += 4) {
    const batch = allRoutes.slice(i, i + 4);
    await Promise.all(batch.map(async (route) => {
      try {
        const page = await browser.newPage();
        await page.goto(`http://localhost:${port}${route}`, {
          waitUntil: 'networkidle0',
          timeout: 15000,
        });

        await page.waitForSelector('#root', { timeout: 5000 });
        // Wait for API data to load (product descriptions, etc.)
        await new Promise(r => setTimeout(r, 4000));

        let html = await page.content();

        html = html.replace(
          '<div id="root"',
          '<div id="root" data-server-rendered="true"'
        );

        const routePath = route === '/' ? '/index.html' : `${route}/index.html`;
        const outputPath = path.join(DIST_DIR, routePath);
        const outputDir = path.dirname(outputPath);

        fs.mkdirSync(outputDir, { recursive: true });
        fs.writeFileSync(outputPath, html);

        success++;
        process.stdout.write(`  ✅ ${route}\n`);
        await page.close();
      } catch (err) {
        failed++;
        process.stdout.write(`  ❌ ${route}: ${err.message.substring(0, 80)}\n`);
      }
    }));
  }

  await browser.close();
  server.close();

  console.log(`\n📊 Done: ${success}/${allRoutes.length} routes prerendered\n`);

  const checkFiles = ['index.html', 'en/index.html', 'vins/index.html', 'vins/fendant/index.html'];
  for (const f of checkFiles) {
    const fp = path.join(DIST_DIR, f);
    if (fs.existsSync(fp)) {
      const content = fs.readFileSync(fp, 'utf-8');
      const hasContent = content.includes('Maison Rouge') || content.includes('Fendant');
      const size = (fs.statSync(fp).size / 1024).toFixed(1);
      console.log(`  📄 ${f}: ${size} KB ${hasContent ? '(content ✅)' : '(empty ❌)'}`);
    }
  }
}

prerender().catch(err => {
  console.error('Prerender failed:', err);
  process.exit(1);
});
