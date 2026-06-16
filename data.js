/**
 * ============================================
 * 数据文件 - 安理工学生工具门户
 * ============================================
 * 
 * 本文件包含网站的所有数据：
 * 1. TOOLS_DATA - 工具数据
 * 2. NOTICES_DATA - 通知公告数据
 * 3. SITE_CONFIG - 网站配置
 */

// ============================================
// 网站配置
// ============================================
const SITE_CONFIG = {
    siteName: '安理工学生工具门户',
    slogan: '校园生活小助手',
    disclaimer: '非官方·学生自制公益工具站',
    version: 'v2.0.0',
    lastUpdate: '2024-09-15'
};

// ============================================
// 工具数据 - 按分类组织
// ============================================
const TOOLS_DATA = [
    // ===== 安理工 · 教务学习 =====
    {
        name: '教务系统',
        url: 'https://www.aust.edu.cn/index/ggfw.htm',
        category: '安理工·教务学习',
        icon: '📚'
    },
    {
        name: '教务处官网',
        url: 'http://jwc.aust.edu.cn',
        category: '安理工·教务学习',
        icon: '🏛️'
    },
    {
        name: '图书馆',
        url: 'http://lib.aust.edu.cn',
        category: '安理工·教务学习',
        icon: '📖'
    },
    {
        name: '四六级报名',
        url: 'https://cet.neea.edu.cn/',
        category: '安理工·教务学习',
        icon: '✍️'
    },
    {
        name: '成绩查询',
        url: 'https://jw.aust.edu.cn/score',
        category: '安理工·教务学习',
        icon: '📊'
    },
    {
        name: '尔雅/慕课平台',
        url: 'https://mooc1.aust.edu.cn',
        category: '安理工·教务学习',
        icon: '💻'
    },

    // ===== 安理工 · 办事服务 =====
    {
        name: '校园卡服务',
        url: 'http://ecard.aust.edu.cn',
        category: '安理工·办事服务',
        icon: '💳'
    },
    {
        name: 'OA办公系统',
        url: 'http://oa.aust.edu.cn',
        category: '安理工·办事服务',
        icon: '📋'
    },
    {
        name: '就业信息网',
        url: 'http://jy.aust.edu.cn',
        category: '安理工·办事服务',
        icon: '💼'
    },
    {
        name: '一网通办',
        url: 'http://ehall.aust.edu.cn',
        category: '安理工·办事服务',
        icon: '🔐'
    },

    // ===== 安理工 · 每日打卡 =====
    {
        name: '今日校园(打卡)',
        url: 'https://aust.campusphere.net/iap/login/pc.html',
        category: '安理工·每日打卡',
        icon: '📱'
    },
    {
        name: '学科竞赛系统',
        url: 'http://competition.aust.edu.cn',
        category: '安理工·每日打卡',
        icon: '🏆'
    },
    {
        name: '创新创业平台',
        url: 'http://cxcy.aust.edu.cn',
        category: '安理工·每日打卡',
        icon: '💡'
    },

    // ===== 安理工 · 生活 =====
    {
        name: '校车时刻表',
        url: '#',
        category: '安理工·生活',
        icon: '🚌'
    },
    {
        name: '菜鸟驿站',
        url: 'https://Cainiao.com',
        category: '安理工·生活',
        icon: '📦'
    },

    // ===== 学术搜索 · 查重 =====
    {
        name: '中国知网',
        url: 'https://www.cnki.net',
        category: '学术搜索·查重',
        icon: '📚'
    },
    {
        name: '万方数据',
        url: 'https://www.wanfangdata.com.cn',
        category: '学术搜索·查重',
        icon: '📖'
    },
    {
        name: '百度学术',
        url: 'https://xueshu.baidu.com',
        category: '学术搜索·查重',
        icon: '🔍'
    },
    {
        name: '谷歌学术',
        url: 'https://scholar.google.com',
        category: '学术搜索·查重',
        icon: '🌐'
    },

    // ===== AI工具 =====
    {
        name: '文心一言',
        url: 'https://yiyan.baidu.com',
        category: 'AI工具',
        icon: '🤖'
    },
    {
        name: '通义千问',
        url: 'https://www.qianwen.com',
        category: 'AI工具',
        icon: '🖥️'
    },
    {
        name: 'Kimi',
        url: 'https://kimi.moonshot.cn',
        category: 'AI工具',
        icon: '🌙'
    },
    {
        name: '秘塔AI搜索',
        url: 'https://metaso.cn',
        category: 'AI工具',
        icon: '🔎'
    },

    // ===== 实用工具 =====
    {
        name: 'iLovePDF',
        url: 'https://www.ilovepdf.com',
        category: '实用工具',
        icon: '📄'
    },
    {
        name: 'Word转PDF',
        url: 'https://www.ilovepdf.com/word_to_pdf',
        category: '实用工具',
        icon: '📝'
    },
    {
        name: '有道云笔记',
        url: 'https://note.youdao.com',
        category: '实用工具',
        icon: '📓'
    },
    {
        name: '幕布',
        url: 'https://mubu.com',
        category: '实用工具',
        icon: '🧠'
    },
    {
        name: '百度翻译',
        url: 'https://fanyi.baidu.com',
        category: '实用工具',
        icon: '🌏'
    },
    {
        name: '二维码生成器',
        url: 'https://cli.im',
        category: '实用工具',
        icon: '📱'
    },

    // ===== 求职就业 =====
    {
        name: '智联招聘',
        url: 'https://www.zhaopin.com',
        category: '求职就业',
        icon: '🎯'
    },
    {
        name: 'BOSS直聘',
        url: 'https://www.zhipin.com',
        category: '求职就业',
        icon: '👔'
    }
];

// ============================================
// 通知公告数据
// ============================================
const NOTICES_DATA = [
    {
        title: '关于2024-2025学年第一学期注册的通知',
        date: '2024-08-28',
        tags: ['教务', '注册'],
        source: '教务处'
    },
    {
        title: '关于举办2024年"互联网+"大学生创新创业大赛的通知',
        date: '2024-08-20',
        tags: ['竞赛', '创新创业'],
        source: '创新创业学院'
    },
    {
        title: '2024年下半年全国大学英语四六级考试报名通知',
        date: '2024-08-15',
        tags: ['教务', '四六级'],
        source: '教务处'
    },
    {
        title: '关于开展2024年暑期社会实践活动的通知',
        date: '2024-07-01',
        tags: ['学生活动', '社会实践'],
        source: '校团委'
    },
    {
        title: '关于2024年度国家奖学金评选工作的通知',
        date: '2024-09-10',
        tags: ['评奖评优', '奖学金'],
        source: '学生处'
    },
    {
        title: '【就业讲座】如何写好一份让HR眼前一亮的简历',
        date: '2024-09-05',
        tags: ['就业', '讲座'],
        source: '就业指导中心'
    },
    {
        title: '关于图书馆暑假开放安排的通知',
        date: '2024-07-10',
        tags: ['图书馆', '通知'],
        source: '图书馆'
    },
    {
        title: '关于2025年硕士研究生招生考试报名的提示',
        date: '2024-09-12',
        tags: ['考研', '招生'],
        source: '研究生院'
    },
    {
        title: '校园网络安全警示：防范钓鱼邮件',
        date: '2024-08-30',
        tags: ['网络安全', '通知'],
        source: '信息化处'
    },
    {
        title: '关于开展2024年度大学生体质健康测试的通知',
        date: '2024-09-01',
        tags: ['体育', '体测'],
        source: '体育学院'
    }
];

// ============================================
// 通知标签筛选选项
// ============================================
const NOTICE_TAGS = ['全部', '教务', '竞赛', '四六级', '奖学金', '就业', '图书馆', '考研', '通知'];

// ============================================
// 分类顺序（保持与页面一致）
// ============================================
const CATEGORY_ORDER = [
    '安理工·教务学习',
    '安理工·办事服务',
    '安理工·每日打卡',
    '安理工·生活',
    '学术搜索·查重',
    'AI工具',
    '实用工具',
    '求职就业'
];
