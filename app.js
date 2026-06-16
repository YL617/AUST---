/**
 * ============================================
 * 应用脚本 - 安理工学生工具门户
 * ============================================
 * 功能：
 * 1. 渲染工具链接分类列表
 * 2. 搜索过滤
 * 3. 深色模式切换
 * 4. 通知标签筛选
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
let currentTag = '全部'; // 当前选中的筛选标签
let searchQuery = '';    // 当前搜索关键词

// ============================================
// 初始化
// ============================================
function init() {
    // 初始化深色模式
    initTheme();

    // 渲染版本信息
    renderVersion();

    // 渲染工具分类列表
    renderTools();

    // 渲染通知标签
    renderNoticeTags();

    // 渲染通知列表
    renderNotices();

    // 绑定事件
    bindEvents();
}

// ============================================
// 深色模式相关
// ============================================

/**
 * 初始化深色模式
 * 检查用户偏好或系统设置
 */
function initTheme() {
    // 优先级：localStorage > 系统偏好
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
        setTheme(savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('dark');
    } else {
        setTheme('light');
    }

    // 监听系统主题变化
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
    // 按分类分组工具
    const groupedTools = {};

    TOOLS_DATA.forEach(tool => {
        if (!groupedTools[tool.category]) {
            groupedTools[tool.category] = [];
        }
        groupedTools[tool.category].push(tool);
    });

    // 按指定顺序排列分类
    const sortedCategories = CATEGORY_ORDER.filter(cat => groupedTools[cat]);
    const extraCategories = Object.keys(groupedTools).filter(cat => !CATEGORY_ORDER.includes(cat));
    const allCategories = [...sortedCategories, ...extraCategories];

    // 生成HTML
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
 * 创建单个工具链接HTML
 * @param {Object} tool - 工具数据
 * @returns {string} HTML字符串
 */
function createToolLink(tool) {
    return `
        <a href="${tool.url}" 
           class="tool-link" 
           target="_blank" 
           rel="noopener noreferrer"
           data-name="${tool.name}"
           data-category="${tool.category}">
            <span class="tool-icon">${tool.icon || '🔗'}</span>
            <span class="tool-name">${tool.name}</span>
        </a>
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
    // 过滤通知
    let filteredNotices = NOTICES_DATA;

    // 按标签筛选
    if (currentTag !== '全部') {
        filteredNotices = filteredNotices.filter(notice =>
            notice.tags.includes(currentTag)
        );
    }

    // 按搜索关键词筛选
    if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filteredNotices = filteredNotices.filter(notice =>
            notice.title.toLowerCase().includes(query) ||
            notice.source.toLowerCase().includes(query) ||
            notice.tags.some(tag => tag.toLowerCase().includes(query))
        );
    }

    // 生成HTML
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

    // 过滤工具链接
    const allToolLinks = document.querySelectorAll('.tool-link');
    const allSections = document.querySelectorAll('#toolsContainer .section');

    if (searchQuery) {
        // 显示/隐藏工具链接
        allToolLinks.forEach(link => {
            const name = link.dataset.name.toLowerCase();
            const category = link.dataset.category.toLowerCase();
            const match = name.includes(searchQuery) || category.includes(searchQuery);
            link.style.display = match ? '' : 'none';
        });

        // 隐藏空分类
        allSections.forEach(section => {
            const visibleLinks = section.querySelectorAll('.tool-link:not([style*="display: none"])');
            section.style.display = visibleLinks.length > 0 ? '' : 'none';
        });
    } else {
        // 显示所有
        allToolLinks.forEach(link => {
            link.style.display = '';
        });
        allSections.forEach(section => {
            section.style.display = '';
        });
    }

    // 重新渲染通知
    renderNotices();
}

// ============================================
// 事件绑定
// ============================================

function bindEvents() {
    // 搜索输入
    searchInput.addEventListener('input', (e) => {
        handleSearch(e.target.value);
    });

    // 搜索框获得焦点时执行搜索（用于空搜索时的通知筛选）
    searchInput.addEventListener('focus', () => {
        handleSearch(searchInput.value);
    });

    // 深色模式切换
    themeToggle.addEventListener('click', toggleTheme);

    // 通知标签点击（使用事件委托）
    filterTags.addEventListener('click', (e) => {
        if (e.target.classList.contains('filter-tag')) {
            currentTag = e.target.dataset.tag;

            // 更新标签样式
            document.querySelectorAll('.filter-tag').forEach(tag => {
                tag.classList.toggle('active', tag.dataset.tag === currentTag);
            });

            // 重新渲染通知
            renderNotices();
        }
    });
}

// ============================================
// 启动应用
// ============================================
document.addEventListener('DOMContentLoaded', init);
