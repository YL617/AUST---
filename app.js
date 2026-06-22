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
