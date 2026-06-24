const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const ICONS_DIR = path.join(__dirname, 'icons');

if (!fs.existsSync(ICONS_DIR)) {
    fs.mkdirSync(ICONS_DIR, { recursive: true });
}

// 从 data.js 中提取所有 URL
const dataJs = fs.readFileSync(path.join(__dirname, 'data.js'), 'utf-8');
const urlMatches = dataJs.matchAll(/url:\s*'([^']+)'/g);
const urls = [...new Set([...urlMatches].map(m => m[1]))];

function getDomain(url) {
    try {
        return new URL(url).hostname;
    } catch {
        return null;
    }
}

function download(url, filePath, timeout = 8000) {
    return new Promise((resolve) => {
        const isHttps = url.startsWith('https');
        const mod = isHttps ? https : http;
        const options = {
            timeout,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
                'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
            }
        };
        const req = mod.get(url, options, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                const redirectUrl = new URL(res.headers.location, url).toString();
                download(redirectUrl, filePath, timeout).then(resolve).catch(() => resolve(false));
                return;
            }
            if (res.statusCode !== 200) {
                res.resume();
                resolve(false);
                return;
            }
            const file = fs.createWriteStream(filePath);
            res.pipe(file);
            file.on('finish', () => {
                file.close();
                const stat = fs.statSync(filePath);
                if (stat.size > 0) {
                    resolve(true);
                } else {
                    fs.unlinkSync(filePath);
                    resolve(false);
                }
            });
            file.on('error', () => {
                fs.unlinkSync(filePath).catch(() => {});
                resolve(false);
            });
        });
        req.on('error', () => resolve(false));
        req.on('timeout', () => {
            req.destroy();
            resolve(false);
        });
    });
}

async function extractFaviconFromHtml(domain) {
    const safeName = domain.replace(/[^a-zA-Z0-9.-]/g, '_');
    const pageUrls = [`https://${domain}/`, `http://${domain}/`];

    for (const pageUrl of pageUrls) {
        try {
            const html = await new Promise((resolve, reject) => {
                const mod = pageUrl.startsWith('https') ? https : http;
                const req = mod.get(pageUrl, {
                    timeout: 8000,
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                        'Accept': 'text/html,application/xhtml+xml',
                    }
                }, (res) => {
                    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                        const redirectUrl = new URL(res.headers.location, pageUrl).toString();
                        // Follow redirect with same logic
                        const mod2 = redirectUrl.startsWith('https') ? https : http;
                        mod2.get(redirectUrl, {
                            timeout: 8000,
                            headers: {
                                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                                'Accept': 'text/html,application/xhtml+xml',
                            }
                        }, (res2) => {
                            let data = '';
                            res2.on('data', chunk => data += chunk);
                            res2.on('end', () => resolve(data));
                        }).on('error', reject);
                        return;
                    }
                    let data = '';
                    res.on('data', chunk => data += chunk);
                    res.on('end', () => resolve(data));
                });
                req.on('error', reject);
                req.on('timeout', () => { req.destroy(); reject(new Error('timeout')); });
            });

            // Try to find favicon link in HTML
            const faviconMatch = html.match(/<link[^>]+(?:icon|shortcut icon)[^>]+href=["']([^"']+)["']/i)
                || html.match(/href=["']([^"']*favicon[^"']*)["'][^>]*>/i)
                || html.match(/href=["']([^"']*\.ico)["'][^>]*>/i);

            if (faviconMatch) {
                let faviconUrl = faviconMatch[1];
                if (faviconUrl.startsWith('//')) {
                    faviconUrl = (pageUrl.startsWith('https') ? 'https:' : 'http:') + faviconUrl;
                } else if (faviconUrl.startsWith('/')) {
                    faviconUrl = `${new URL(pageUrl).origin}${faviconUrl}`;
                } else if (!faviconUrl.startsWith('http')) {
                    faviconUrl = new URL(faviconUrl, pageUrl).toString();
                }
                const ext = path.extname(new URL(faviconUrl).pathname) || '.ico';
                const filePath = path.join(ICONS_DIR, safeName + ext);
                const ok = await download(faviconUrl, filePath);
                if (ok) return filePath;
            }
        } catch (e) {
            // continue to next
        }
    }
    return null;
}

async function tryDownloadFavicon(domain) {
    const safeName = domain.replace(/[^a-zA-Z0-9.-]/g, '_');
    const candidates = [
        `https://${domain}/favicon.ico`,
        `http://${domain}/favicon.ico`,
        `https://${domain}/favicon.png`,
        `https://${domain}/apple-touch-icon.png`,
        `https://${domain}/apple-touch-icon-precomposed.png`,
    ];

    for (const url of candidates) {
        const ext = path.extname(new URL(url).pathname) || '.ico';
        const filePath = path.join(ICONS_DIR, safeName + ext);
        if (fs.existsSync(filePath)) {
            const stat = fs.statSync(filePath);
            if (stat.size > 0) return filePath;
        }
        const ok = await download(url, filePath);
        if (ok) return filePath;
    }

    // Try extracting from HTML
    const htmlPath = await extractFaviconFromHtml(domain);
    if (htmlPath) return htmlPath;

    // Try DuckDuckGo favicon service as fallback
    const ddgUrl = `https://icons.duckduckgo.com/ip3/${domain}.ico`;
    const ddgPath = path.join(ICONS_DIR, safeName + '_ddg.ico');
    if (!fs.existsSync(ddgPath) || fs.statSync(ddgPath).size === 0) {
        const ok = await download(ddgUrl, ddgPath);
        if (ok) return ddgPath;
    }

    return null;
}

async function main() {
    console.log(`Found ${urls.length} unique URLs\n`);

    for (const url of urls) {
        const domain = getDomain(url);
        if (!domain) continue;

        console.log(`Downloading ${domain}...`);
        const iconPath = await tryDownloadFavicon(domain);
        if (iconPath) {
            console.log(`  ✓ ${iconPath}`);
        } else {
            console.log(`  ✗ Failed`);
        }
    }

    generateManifest();
    console.log('\nDone!');
}

function generateManifest() {
    const files = fs.readdirSync(ICONS_DIR).filter(f => /\.(ico|png|svg|jpg)$/i.test(f));
    const manifest = {};

    files.forEach(file => {
        const domain = file.replace(/_ddg\.(ico|png)$/i, '.$1').replace(/\.(ico|png|svg|jpg)$/i, '');
        if (!manifest[domain] || !file.includes('_ddg')) {
            manifest[domain] = file;
        }
    });

    const content = `/**
 * 本地图标映射（由 download-icons.js 自动生成）
 * key: 域名  value: icons/ 目录下的文件名
 */
const ICON_MANIFEST = ${JSON.stringify(manifest, null, 4)};
`;
    fs.writeFileSync(path.join(ICONS_DIR, 'manifest.js'), content, 'utf-8');
    console.log(`\nGenerated icons/manifest.js (${Object.keys(manifest).length} icons)`);
}

main().catch(console.error);
