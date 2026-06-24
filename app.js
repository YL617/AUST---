/**
 * ============================================
 * 应用脚本 - 安理工学生工具门户
 * ============================================
 * 功能：
 * 1. 渲染工具链接分类列表
 * 2. 搜索过滤
 * 3. 深色模式切换
 * 4. 通知标签筛选
 * 5. 外部链接跳转与状态恢复
 */

// ============================================
// DOM 元素引用
// ============================================
const searchInput = document.getElementById('searchInput');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.querySelector('.theme-icon');
const toolsContainer = document.getElementById('toolsContainer');
const filterTags = document.getElementById('filterTags');
const noticesList = document.getElementById('noticesList');
const versionText = document.getElementById('versionText');

// ============================================
// 状态管理
// ============================================
const PORTAL_STATE_KEY = 'portalState';

let currentTag = '全部';
let searchQuery = '';
let pendingScrollY = 0;
let pendingSearchQuery = '';

// ============================================
// 初始化
// ============================================
function init() {
    initStarfield();
    const restored = restorePortalState();

    if (!restored) {
        initTheme();
    }

    renderVersion();
    renderTools();
    renderNoticeTags();
    renderNotices();

    if (restored) {
        searchInput.value = pendingSearchQuery;
        handleSearch(pendingSearchQuery);
        renderNoticeTags();
        renderNotices();
        requestAnimationFrame(() => {
            window.scrollTo(0, pendingScrollY);
        });
    }

    bindEvents();
}

// ============================================
// 页面状态持久化（跳转外部站点前保存，后退返回时恢复）
// ============================================

/**
 * 保存当前页面状态到 sessionStorage
 */
function savePortalState() {
    const state = {
        theme: document.documentElement.getAttribute('data-theme') || 'light',
        searchQuery: searchInput.value.trim(),
        currentTag: currentTag,
        scrollY: window.scrollY || window.pageYOffset
    };
    sessionStorage.setItem(PORTAL_STATE_KEY, JSON.stringify(state));
}

/**
 * 从 sessionStorage 恢复页面状态（仅执行一次）
 * @returns {boolean} 是否成功恢复
 */
function restorePortalState() {
    const raw = sessionStorage.getItem(PORTAL_STATE_KEY);
    if (!raw) return false;

    try {
        const state = JSON.parse(raw);
        sessionStorage.removeItem(PORTAL_STATE_KEY);

        if (state.theme) {
            setTheme(state.theme);
            localStorage.setItem('theme', state.theme);
        }

        pendingSearchQuery = state.searchQuery || '';

        if (state.currentTag) {
            currentTag = state.currentTag;
        }

        pendingScrollY = state.scrollY || 0;
        return true;
    } catch {
        sessionStorage.removeItem(PORTAL_STATE_KEY);
        return false;
    }
}

/**
 * 跳转到外部工具页面（当前标签页）
 * @param {string} url - 目标 URL
 */
function navigateToExternal(url) {
    savePortalState();
    window.location.href = url;
}

// ============================================
// 深色模式相关
// ============================================

/**
 * 初始化深色模式
 * 检查用户偏好或系统设置
 */
function initTheme() {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
        setTheme(savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('dark');
    } else {
        setTheme('light');
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });
}

/**
 * 设置主题
 * @param {string} theme - 'light' 或 'dark'
 */
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

/**
 * 切换深色模式
 */
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
}

// ============================================
// 渲染函数
// ============================================

/**
 * 渲染版本信息
 */
function renderVersion() {
    versionText.textContent = `${SITE_CONFIG.siteName} ${SITE_CONFIG.version}`;
}

/**
 * 渲染工具分类列表
 */
function renderTools() {
    const groupedTools = {};

    TOOLS_DATA.forEach(tool => {
        if (!groupedTools[tool.category]) {
            groupedTools[tool.category] = [];
        }
        groupedTools[tool.category].push(tool);
    });

    const sortedCategories = CATEGORY_ORDER.filter(cat => groupedTools[cat]);
    const extraCategories = Object.keys(groupedTools).filter(cat => !CATEGORY_ORDER.includes(cat));
    const allCategories = [...sortedCategories, ...extraCategories];

    let html = '';

    allCategories.forEach(category => {
        const tools = groupedTools[category];
        if (!tools || tools.length === 0) return;

        html += `
            <section class="section" data-category="${category}">
                <h2 class="section-title">${category}</h2>
                <div class="tools-grid">
                    ${tools.map(tool => createToolLink(tool)).join('')}
                </div>
            </section>
        `;
    });

    toolsContainer.innerHTML = html;
}

/**
 * 创建单个工具链接 HTML
 * 点击后在当前标签页跳转，可通过浏览器后退返回
 * @param {Object} tool - 工具数据
 * @returns {string} HTML字符串
 */
function createToolLink(tool) {
    return `
        <button class="tool-link"
           data-url="${tool.url}"
           data-category="${tool.category}"
           title="即将跳转至外部网站，返回请使用浏览器后退按钮">
            <span class="tool-icon">${tool.icon || '🔗'}</span>
            <span class="tool-name">${tool.name}</span>
        </button>
    `;
}

/**
 * 渲染通知标签
 */
function renderNoticeTags() {
    const html = NOTICE_TAGS.map(tag => `
        <button class="filter-tag ${tag === currentTag ? 'active' : ''}" 
                data-tag="${tag}">
            ${tag}
        </button>
    `).join('');

    filterTags.innerHTML = html;
}

/**
 * 渲染通知列表
 * 根据当前筛选标签和搜索关键词过滤
 */
function renderNotices() {
    let filteredNotices = NOTICES_DATA;

    if (currentTag !== '全部') {
        filteredNotices = filteredNotices.filter(notice =>
            notice.tags.includes(currentTag)
        );
    }

    if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filteredNotices = filteredNotices.filter(notice =>
            notice.title.toLowerCase().includes(query) ||
            notice.source.toLowerCase().includes(query) ||
            notice.tags.some(tag => tag.toLowerCase().includes(query))
        );
    }

    if (filteredNotices.length === 0) {
        noticesList.innerHTML = `
            <div class="no-results">
                ${searchQuery ? '未找到匹配的通知' : '暂无通知'}
            </div>
        `;
        return;
    }

    const html = filteredNotices.map(notice => `
        <div class="notice-item">
            <div class="notice-header">
                <span class="notice-title">${notice.title}</span>
                <span class="notice-date">${notice.date}</span>
            </div>
            <div class="notice-meta">
                <span class="notice-source">${notice.source}</span>
                <div class="notice-tags">
                    ${notice.tags.map(tag => `<span class="notice-tag">${tag}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');

    noticesList.innerHTML = html;
}

// ============================================
// 搜索功能
// ============================================

/**
 * 处理搜索输入
 * @param {string} query - 搜索关键词
 */
function handleSearch(query) {
    searchQuery = query.trim().toLowerCase();

    const allToolLinks = document.querySelectorAll('.tool-link');
    const allSections = document.querySelectorAll('#toolsContainer .section');

    if (searchQuery) {
        allToolLinks.forEach(link => {
            const name = link.querySelector('.tool-name').textContent.toLowerCase();
            const category = link.dataset.category.toLowerCase();
            link.style.display = (name.includes(searchQuery) || category.includes(searchQuery)) ? '' : 'none';
        });

        allSections.forEach(section => {
            const visibleLinks = section.querySelectorAll('.tool-link:not([style*="display: none"])');
            section.style.display = visibleLinks.length > 0 ? '' : 'none';
        });
    } else {
        allToolLinks.forEach(link => {
            link.style.display = '';
        });
        allSections.forEach(section => {
            section.style.display = '';
        });
    }

    renderNotices();
}

// ============================================
// 星空背景动画
// ============================================
function initStarfield() {
    const canvas = document.getElementById('starfield');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height, stars, shootingStars;

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    function createStars(count) {
        const arr = [];
        const cx = width / 2;
        const cy = height / 2;
        const maxR = Math.sqrt(cx * cx + cy * cy);
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const dist = Math.pow(Math.random(), 0.6) * maxR * 1.05;
            arr.push({
                x: cx + Math.cos(angle) * dist,
                y: cy + Math.sin(angle) * dist,
                radius: Math.random() * 2.2 + 0.3,
                baseAlpha: Math.random() * 0.6 + 0.2,
                twinkleSpeed: Math.random() * 0.006 + 0.003,
                twinklePhase: Math.random() * Math.PI * 2,
                twinkleAmplitude: Math.random() * 0.4 + 0.25,
                orbitSpeed: (Math.random() * 0.00003 + 0.00004) * (dist < maxR * 0.35 ? 0.5 : 1),
                orbitAngle: angle,
                orbitRadius: dist,
                centerX: cx,
                centerY: cy
            });
        }
        return arr;
    }

    function spawnShootingStar() {
        return {
            x: Math.random() * width * 0.9,
            y: Math.random() * height * 0.4,
            length: Math.random() * 120 + 60,
            speed: Math.random() * 6 + 4,
            angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3,
            alpha: 1,
            life: 1
        };
    }

    function drawBackground() {
        const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
        if (isDark) {
            const gradient = ctx.createRadialGradient(
                width * 0.3, height * 0.3, 0,
                width * 0.5, height * 0.5, Math.max(width, height)
            );
            gradient.addColorStop(0, '#0d1b2a');
            gradient.addColorStop(0.5, '#0a1120');
            gradient.addColorStop(1, '#050a14');
            ctx.fillStyle = gradient;
        } else {
            ctx.fillStyle = '#ffffff';
        }
        ctx.fillRect(0, 0, width, height);
    }

    function drawStars(time) {
        const cx = width / 2;
        const cy = height / 2;
        stars.forEach(star => {
            star.orbitAngle += star.orbitSpeed;
            star.x = cx + Math.cos(star.orbitAngle) * star.orbitRadius;
            star.y = cy + Math.sin(star.orbitAngle) * star.orbitRadius;

            const alpha = star.baseAlpha + Math.sin(time * star.twinkleSpeed + star.twinklePhase) * star.twinkleAmplitude;
            const clamped = Math.max(0.05, Math.min(1, alpha));
            const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            if (isDark) {
                ctx.fillStyle = `rgba(220, 235, 255, ${clamped})`;
            } else {
                ctx.fillStyle = `rgba(180, 190, 210, ${clamped * 0.3})`;
            }
            ctx.fill();

            if (star.radius > 1.3 && isDark) {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius * 3, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(200, 220, 255, ${clamped * 0.12})`;
                ctx.fill();
            }
        });
    }

    function drawShootingStars(time) {
        shootingStars.forEach((s, i) => {
            s.x += Math.cos(s.angle) * s.speed;
            s.y += Math.sin(s.angle) * s.speed;
            s.life -= 0.008;
            s.alpha = s.life;

            if (s.life <= 0) {
                shootingStars.splice(i, 1);
                return;
            }

            const tailX = s.x - Math.cos(s.angle) * s.length;
            const tailY = s.y - Math.sin(s.angle) * s.length;

            const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
            if (isDark) {
                const gradient = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
                gradient.addColorStop(0, `rgba(255, 255, 255, 0)`);
                gradient.addColorStop(1, `rgba(255, 255, 255, ${s.alpha})`);
                ctx.beginPath();
                ctx.moveTo(tailX, tailY);
                ctx.lineTo(s.x, s.y);
                ctx.strokeStyle = gradient;
                ctx.lineWidth = 1.5;
                ctx.stroke();

                ctx.beginPath();
                ctx.arc(s.x, s.y, 2, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
                ctx.fill();
            }
        });
    }

    let animationId = null;
    let isRunning = true;

    function startAnimation() {
        if (animationId) return;
        function loop(time) {
            drawBackground();
            drawStars(time);
            drawShootingStars(time);

            if (Math.random() < 0.008) {
                const count = Math.random() < 0.2 ? Math.floor(Math.random() * 3) + 2 : 1;
                for (let i = 0; i < count; i++) {
                    shootingStars.push(spawnShootingStar());
                }
            }

            animationId = requestAnimationFrame(loop);
        }
        animationId = requestAnimationFrame(loop);
    }

    function stopAnimation() {
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
        ctx.clearRect(0, 0, width, height);
    }

    function syncAnimationState() {
        const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
        if (isDark && !isRunning) {
            isRunning = true;
            startAnimation();
        } else if (!isDark && isRunning) {
            isRunning = false;
            stopAnimation();
        }
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', syncAnimationState);

    const observer = new MutationObserver(syncAnimationState);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    resize();
    stars = createStars(Math.min(500, Math.floor((width * height) / 3000)));
    shootingStars = [];

    window.addEventListener('resize', () => {
        resize();
        const cx = width / 2;
        const cy = height / 2;
        stars.forEach(star => {
            star.centerX = cx;
            star.centerY = cy;
        });
        if (isRunning) {
            stars = createStars(Math.min(500, Math.floor((width * height) / 3000)));
        }
    });

    syncAnimationState();
}

// ============================================
// 事件绑定
// ============================================

function bindEvents() {
    toolsContainer.addEventListener('click', (e) => {
        const toolLink = e.target.closest('.tool-link');
        if (!toolLink) return;
        const url = toolLink.dataset.url;
        if (url) navigateToExternal(url);
    });

    searchInput.addEventListener('input', (e) => {
        handleSearch(e.target.value);
    });

    searchInput.addEventListener('focus', () => {
        handleSearch(searchInput.value);
    });

    themeToggle.addEventListener('click', toggleTheme);

    filterTags.addEventListener('click', (e) => {
        if (e.target.classList.contains('filter-tag')) {
            currentTag = e.target.dataset.tag;

            document.querySelectorAll('.filter-tag').forEach(tag => {
                tag.classList.toggle('active', tag.dataset.tag === currentTag);
            });

            renderNotices();
        }
    });
}

// ============================================
// 启动应用
// ============================================
document.addEventListener('DOMContentLoaded', init);
