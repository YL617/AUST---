/**
 * ============================================
 * 交互逻辑文件 - 安理工学生工具门户
 * ============================================
 * 
 * 本文件包含所有页面交互逻辑：
 * 1. 页面初始化
 * 2. Tab导航切换
 * 3. 搜索功能
 * 4. 通知筛选
 * 5. 工具页面Tab切换
 * 6. 关于页反馈表单
 * 
 * 【修改指南】
 * - 大部分功能已封装成函数，方便理解和修改
 * - 如需添加新功能，在对应区域添加代码
 */

// ============================================
// 1. 页面初始化
// ============================================

/**
 * 页面加载完成后执行初始化
 */
document.addEventListener('DOMContentLoaded', function() {
    // 初始化顶部导航
    initHeader();
    
    // 初始化底部Tab导航
    initTabBar();
    
    // 初始化首页内容
    initHomePage();
    
    // 初始化工具页
    initToolsPage();
    
    // 初始化通知页
    initNoticePage();
    
    // 初始化关于页
    initAboutPage();
    
    console.log('✅ 安理工学生工具门户初始化完成');
});

// ============================================
// 2. 顶部导航功能
// ============================================

/**
 * 初始化顶部导航
 * - 设置网站名称
 * - 设置免责声明
 * - 配置全局搜索
 */
function initHeader() {
    const headerTitle = document.getElementById('headerTitle');
    const headerDisclaimer = document.getElementById('headerDisclaimer');
    const globalSearch = document.getElementById('globalSearch');
    
    // 设置网站名称（从配置读取）
    if (headerTitle && SITE_CONFIG) {
        headerTitle.textContent = SITE_CONFIG.siteName;
    }
    
    // 设置免责声明
    if (headerDisclaimer && SITE_CONFIG) {
        headerDisclaimer.textContent = SITE_CONFIG.disclaimer;
    }
    
    // 全局搜索功能
    if (globalSearch) {
        globalSearch.addEventListener('input', debounce(handleGlobalSearch, 300));
    }
}

/**
 * 全局搜索处理函数
 * 在首页、工具、通知页面中搜索
 * 
 * @param {string} keyword - 搜索关键词
 */
function handleGlobalSearch(keyword) {
    keyword = keyword.trim().toLowerCase();
    
    if (!keyword) {
        // 关键词为空，恢复原状
        resetAllPages();
        return;
    }
    
    // 获取当前活动页面
    const activePage = document.querySelector('.page.active');
    const pageId = activePage ? activePage.id : 'homePage';
    
    switch (pageId) {
        case 'homePage':
            searchHomePage(keyword);
            break;
        case 'toolsPage':
            searchToolsPage(keyword);
            break;
        case 'noticePage':
            searchNoticePage(keyword);
            break;
        default:
            break;
    }
    
    // 显示搜索结果提示
    showToast(`搜索: ${keyword}`, 1500);
}

/**
 * 搜索首页内容（快捷工具 + 通知）
 */
function searchHomePage(keyword) {
    // 搜索快捷工具
    const quickToolItems = document.querySelectorAll('.quick-tool-item');
    quickToolItems.forEach(item => {
        const name = item.querySelector('.name').textContent.toLowerCase();
        item.style.display = name.includes(keyword) ? '' : 'none';
    });
    
    // 搜索通知
    const noticeCards = document.querySelectorAll('.home-notice-card');
    noticeCards.forEach(card => {
        const title = card.querySelector('.notice-title').textContent.toLowerCase();
        card.style.display = title.includes(keyword) ? '' : 'none';
    });
}

/**
 * 搜索工具页面
 */
function searchToolsPage(keyword) {
    const toolCards = document.querySelectorAll('.tool-card');
    toolCards.forEach(card => {
        const name = card.querySelector('.name').textContent.toLowerCase();
        const desc = card.querySelector('.desc').textContent.toLowerCase();
        card.style.display = (name.includes(keyword) || desc.includes(keyword)) ? '' : 'none';
    });
}

/**
 * 搜索通知页面
 */
function searchNoticePage(keyword) {
    const noticeCards = document.querySelectorAll('.notice-full-card');
    noticeCards.forEach(card => {
        const title = card.querySelector('.notice-title').textContent.toLowerCase();
        card.style.display = title.includes(keyword) ? '' : 'none';
    });
}

/**
 * 重置所有页面显示
 */
function resetAllPages() {
    // 重置快捷工具
    document.querySelectorAll('.quick-tool-item').forEach(item => {
        item.style.display = '';
    });
    
    // 重置通知
    document.querySelectorAll('.home-notice-card').forEach(card => {
        card.style.display = '';
    });
    
    // 重置工具卡片
    document.querySelectorAll('.tool-card').forEach(card => {
        card.style.display = '';
    });
    
    // 重置通知卡片
    document.querySelectorAll('.notice-full-card').forEach(card => {
        card.style.display = '';
    });
}

// ============================================
// 3. 底部Tab导航功能
// ============================================

/**
 * 初始化底部Tab导航
 */
function initTabBar() {
    const tabItems = document.querySelectorAll('.tab-bar-item');
    
    tabItems.forEach(item => {
        item.addEventListener('click', function() {
            // 获取目标页面ID
            const targetPage = this.dataset.page;
            
            // 切换Tab高亮状态
            tabItems.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // 切换页面显示
            showPage(targetPage);
        });
    });
}

/**
 * 显示指定页面
 * 
 * @param {string} pageId - 页面ID（不含Page后缀）
 */
function showPage(pageId) {
    // 隐藏所有页面
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // 显示目标页面
    const targetPage = document.getElementById(pageId + 'Page');
    if (targetPage) {
        targetPage.classList.add('active');
    }
}

// ============================================
// 4. 首页内容初始化
// ============================================

/**
 * 初始化首页内容
 */
function initHomePage() {
    // 渲染快捷工具入口
    renderQuickTools();
    
    // 渲染通知公告
    renderHomeNotices();
}

/**
 * 渲染首页快捷工具入口
 * 从TOOLS_DATA中选取最常用的工具
 */
function renderQuickTools() {
    const container = document.getElementById('quickTools');
    if (!container) return;
    
    // 选取快捷工具（取官方工具的前12个，涵盖更多分类）
    const quickTools = TOOLS_DATA.official.slice(0, 12);
    
    let html = '';
    quickTools.forEach(tool => {
        html += `
            <a href="${tool.url}" 
               class="quick-tool-item" 
               target="_blank" 
               rel="noopener noreferrer"
               title="${tool.name}: ${tool.desc}">
                <span class="icon">${tool.icon}</span>
                <span class="name">${tool.name}</span>
            </a>
        `;
    });
    
    container.innerHTML = html;
}

/**
 * 渲染首页通知公告
 * 只显示最新的5条
 */
function renderHomeNotices() {
    const container = document.getElementById('homeNotices');
    if (!container) return;
    
    // 取最新5条通知
    const recentNotices = NOTICES_DATA.slice(0, 5);
    
    let html = '';
    recentNotices.forEach(notice => {
        html += `
            <div class="notice-card home-notice-card">
                <span class="notice-icon">📢</span>
                <div class="notice-content">
                    <div class="notice-title">${notice.title}</div>
                    <div class="notice-meta">
                        <span>${notice.source}</span>
                        <span>·</span>
                        <span>${notice.date}</span>
                    </div>
                    <div class="notice-tags">
                        ${notice.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// ============================================
// 5. 工具页面功能
// ============================================

/**
 * 初始化工具页面
 */
function initToolsPage() {
    renderAllTools();
    
    // 初始化工具页Tab切换
    initToolsTabs();
}

/**
 * 渲染所有工具
 */
function renderAllTools() {
    // 渲染官方工具
    renderOfficialTools();
    
    // 渲染通用工具
    renderGeneralTools();
}

/**
 * 渲染官方/校内工具
 */
function renderOfficialTools() {
    const container = document.getElementById('officialTools');
    if (!container) return;
    
    // 按分类分组
    const grouped = groupByCategory(TOOLS_DATA.official);
    
    let html = '';
    for (const [category, tools] of Object.entries(grouped)) {
        html += `
            <div class="tools-category">
                <h3 class="tools-category-title">${category}</h3>
                <div class="tools-grid">
                    ${tools.map(tool => createToolCard(tool)).join('')}
                </div>
            </div>
        `;
    }
    
    container.innerHTML = html;
}

/**
 * 渲染通用实用工具
 */
function renderGeneralTools() {
    const container = document.getElementById('generalTools');
    if (!container) return;
    
    // 按分类分组
    const grouped = groupByCategory(TOOLS_DATA.general);
    
    let html = '';
    for (const [category, tools] of Object.entries(grouped)) {
        html += `
            <div class="tools-category">
                <h3 class="tools-category-title">${category}</h3>
                <div class="tools-grid">
                    ${tools.map(tool => createToolCard(tool)).join('')}
                </div>
            </div>
        `;
    }
    
    container.innerHTML = html;
}

/**
 * 创建工具卡片HTML
 * 
 * @param {Object} tool - 工具对象
 * @returns {string} HTML字符串
 */
function createToolCard(tool) {
    return `
        <a href="${tool.url}" 
           class="tool-card" 
           target="_blank" 
           rel="noopener noreferrer"
           title="${tool.desc}">
            <span class="icon">${tool.icon}</span>
            <div class="info">
                <div class="name">${tool.name}</div>
                <div class="desc">${tool.desc}</div>
            </div>
        </a>
    `;
}

/**
 * 按分类分组工具
 * 
 * @param {Array} tools - 工具数组
 * @returns {Object} 分组后的对象
 */
function groupByCategory(tools) {
    return tools.reduce((acc, tool) => {
        const category = tool.category;
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(tool);
        return acc;
    }, {});
}

/**
 * 初始化工具页的Tab切换
 */
function initToolsTabs() {
    const tabItems = document.querySelectorAll('.tools-tab-item');
    const officialSection = document.getElementById('officialTools');
    const generalSection = document.getElementById('generalTools');
    
    tabItems.forEach(item => {
        item.addEventListener('click', function() {
            const target = this.dataset.tab;
            
            // 切换Tab高亮
            tabItems.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // 切换内容显示
            if (target === 'official') {
                officialSection.style.display = 'block';
                generalSection.style.display = 'none';
            } else {
                officialSection.style.display = 'none';
                generalSection.style.display = 'block';
            }
        });
    });
}

// ============================================
// 6. 通知页面功能
// ============================================

/**
 * 初始化通知页面
 */
function initNoticePage() {
    renderNoticeFilters();
    renderAllNotices();
    initNoticeFilterTabs();
}

/**
 * 渲染通知筛选标签
 */
function renderNoticeFilters() {
    const container = document.getElementById('noticeFilters');
    if (!container) return;
    
    let html = '';
    NOTICE_TAGS.forEach((tag, index) => {
        const isActive = index === 0 ? 'active' : '';
        html += `
            <button class="tab-item notice-filter-tag ${isActive}" 
                    data-tag="${tag}">
                ${tag}
            </button>
        `;
    });
    
    container.innerHTML = html;
}

/**
 * 初始化通知筛选Tab点击事件
 */
function initNoticeFilterTabs() {
    const container = document.getElementById('noticeFilters');
    if (!container) return;
    
    container.addEventListener('click', function(e) {
        const tagBtn = e.target.closest('.notice-filter-tag');
        if (!tagBtn) return;
        
        const tag = tagBtn.dataset.tag;
        
        // 切换Tab高亮
        container.querySelectorAll('.notice-filter-tag').forEach(t => {
            t.classList.remove('active');
        });
        tagBtn.classList.add('active');
        
        // 筛选通知
        filterNoticesByTag(tag);
    });
}

/**
 * 按标签筛选通知
 * 
 * @param {string} tag - 标签名称
 */
function filterNoticesByTag(tag) {
    const noticeCards = document.querySelectorAll('.notice-full-card');
    
    noticeCards.forEach(card => {
        const tags = card.dataset.tags.split(',');
        
        if (tag === '全部' || tags.includes(tag)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

/**
 * 渲染所有通知（完整列表）
 */
function renderAllNotices() {
    const container = document.getElementById('allNotices');
    if (!container) return;
    
    // 按日期降序排序
    const sortedNotices = [...NOTICES_DATA].sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    });
    
    let html = '';
    sortedNotices.forEach(notice => {
        html += `
            <div class="notice-card notice-full-card" data-tags="${notice.tags.join(',')}">
                <span class="notice-icon">📢</span>
                <div class="notice-content">
                    <div class="notice-title">${notice.title}</div>
                    <div class="notice-meta">
                        <span>${notice.source}</span>
                        <span>·</span>
                        <span>${notice.date}</span>
                    </div>
                    ${notice.content ? `<p style="font-size:12px;color:#666;margin-top:4px;">${notice.content}</p>` : ''}
                    <div class="notice-tags">
                        ${notice.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// ============================================
// 7. 关于页面功能
// ============================================

/**
 * 初始化关于页面
 */
function initAboutPage() {
    // 渲染版本信息
    const versionEl = document.getElementById('versionInfo');
    if (versionEl && SITE_CONFIG) {
        versionEl.textContent = `${SITE_CONFIG.version} · 最后更新: ${SITE_CONFIG.lastUpdate}`;
    }
    
    // 绑定反馈表单提交
    initFeedbackForm();
}

/**
 * 初始化反馈表单
 */
function initFeedbackForm() {
    const form = document.getElementById('feedbackForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('feedbackName').value.trim();
        const contact = document.getElementById('feedbackContact').value.trim();
        const content = document.getElementById('feedbackContent').value.trim();
        
        // 简单验证
        if (!content) {
            showToast('请填写反馈内容', 2000);
            return;
        }
        
        // MVP阶段：显示提示信息
        // 实际项目中这里会发送到后端API
        showToast('反馈已收到，感谢您的建议！', 3000);
        
        // 清空表单
        form.reset();
        
        console.log('反馈内容:', { name, contact, content });
    });
}

// ============================================
// 8. 工具函数
// ============================================

/**
 * 防抖函数
 * 在事件触发n毫秒后执行，n毫秒内再次触发则重新计时
 * 
 * @param {Function} fn - 要执行的函数
 * @param {number} delay - 延迟时间（毫秒）
 * @returns {Function} 防抖后的函数
 */
function debounce(fn, delay) {
    let timer = null;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}

/**
 * 显示Toast提示
 * 
 * @param {string} message - 提示文本
 * @param {number} duration - 显示时长（毫秒）
 */
function showToast(message, duration = 2000) {
    // 检查是否已有Toast
    let existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // 创建Toast元素
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 80px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0,0,0,0.8);
        color: #fff;
        padding: 10px 20px;
        border-radius: 20px;
        font-size: 14px;
        z-index: 9999;
        animation: fadeIn 0.2s ease-out;
    `;
    
    document.body.appendChild(toast);
    
    // 自动移除
    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.2s ease-out';
        setTimeout(() => toast.remove(), 200);
    }, duration);
}

/**
 * 格式化日期
 * 
 * @param {string} dateStr - 日期字符串
 * @returns {string} 格式化后的日期
 */
function formatDate(dateStr) {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// ============================================
// 9. 预留扩展接口
// ============================================

/**
 * 【扩展指南】
 * 如需接入后端API，可按以下格式扩展：
 */

/**
 * 获取通知列表（API版本）
 * @param {Object} params - 查询参数
 * @returns {Promise} 通知列表
 */
/*
async function fetchNoticesAPI(params) {
    try {
        const response = await fetch('/api/notices?' + new URLSearchParams(params));
        const data = await response.json();
        return data.list;
    } catch (error) {
        console.error('获取通知失败:', error);
        return [];
    }
}
*/

/**
 * 提交反馈（API版本）
 * @param {Object} feedback - 反馈内容
 * @returns {Promise} 提交结果
 */
/*
async function submitFeedbackAPI(feedback) {
    try {
        const response = await fetch('/api/feedback', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(feedback)
        });
        return await response.json();
    } catch (error) {
        console.error('提交反馈失败:', error);
        throw error;
    }
}
*/

// ============================================
// 10. 附加样式（渐出动画）
// ============================================

// 添加fadeOut动画到页面
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(styleSheet);
