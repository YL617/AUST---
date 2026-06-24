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
    version: 'v2.1.0',
    lastUpdate: '2025-06-22'
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
        name: '学习通',
        url: 'https://www.chaoxing.com',
        category: '安理工·教务学习',
        icon: '📖'
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
        name: '智慧树',
        url: 'https://www.zhihuishu.com',
        category: '安理工·教务学习',
        icon: '📊'
    },
    {
        name: 'MOOC',
        url: 'https://www.icourse163.org',
        category: '安理工·教务学习',
        icon: '💻'
    },

    // ===== 编程开发 =====
    {
        name: 'GitHub',
        url: 'https://github.com',
        category: '编程开发',
        icon: '🐙'
    },
    {
        name: 'Gitee',
        url: 'https://gitee.com',
        category: '编程开发',
        icon: '🦒'
    },
    {
        name: 'LeetCode',
        url: 'https://leetcode.cn',
        category: '编程开发',
        icon: '🧩'
    },
    {
        name: 'CSDN',
        url: 'https://www.csdn.net',
        category: '编程开发',
        icon: '📝'
    },
    {
        name: 'VS Code在线版',
        url: 'https://vscode.dev',
        category: '编程开发',
        icon: '💻'
    },
    {
        name: 'PTA',
        url: 'https://pintia.cn',
        category: '编程开发',
        icon: '🎯'
    },

    // ===== 安理工 · 生活 =====
    {
        name: '朵朵校友圈',
        url: 'https://www.duoduo.link/',
        category: '安理工·生活',
        icon: '🌸'
    },
    {
        name: 'BiliBili',
        url: 'https://www.bilibili.com',
        category: '安理工·生活',
        icon: '📺'
    },
    {
        name: '爱奇艺',
        url: 'https://www.iqiyi.com',
        category: '安理工·生活',
        icon: '🎬'
    },
    {
        name: '腾讯视频',
        url: 'https://v.qq.com',
        category: '安理工·生活',
        icon: '🎥'
    },
    {
        name: '优酷',
        url: 'https://www.youku.com',
        category: '安理工·生活',
        icon: '🍿'
    },
    {
        name: 'CCTV',
        url: 'https://www.cctv.com',
        category: '安理工·生活',
        icon: '📡'
    },

    // ===== 学术搜索 · 查重 =====
    { name: '朱雀AI检测', url: 'https://matrix.tencent.com/ai-detect/ai_gen', category: '学术搜索·查重', icon: '🔍' },
    { name: '中国知网', url: 'https://www.cnki.net', category: '学术搜索·查重', icon: '📖' },
    { name: '谷歌学术', url: 'https://scholar.google.com', category: '学术搜索·查重', icon: '🌐' },
    { name: '必应学术', url: 'https://www.bing.com/academic', category: '学术搜索·查重', icon: '🔎' },
    { name: '百度学术', url: 'https://xueshu.baidu.com', category: '学术搜索·查重', icon: '🔍' },
    { name: '维普网', url: 'https://www.cqvip.com', category: '学术搜索·查重', icon: '📄' },
    { name: '爱学术', url: 'https://www.ixueshu.com', category: '学术搜索·查重', icon: '📝' },
    { name: '万方数据', url: 'https://www.wanfangdata.com.cn', category: '学术搜索·查重', icon: '📊' },
    { name: 'WOS', url: 'https://www.webofscience.com', category: '学术搜索·查重', icon: '🌍' },
    { name: 'Sci-Hub', url: 'https://sci-hub.se', category: '学术搜索·查重', icon: '🔓' },

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
    {
        name: '豆包',
        url: 'https://www.doubao.com/chat/',
        category: 'AI工具',
        icon: '🫘'
    },
    {
        name: 'DeepSeek',
        url: 'https://chat.deepseek.com/',
        category: 'AI工具',
        icon: '🧠'
    },
    {
        name: '智谱',
        url: 'https://chatglm.cn/main/detail',
        category: 'AI工具',
        icon: '💡'
    },
    {
        name: '扣子',
        url: 'https://www.coze.cn/space',
        category: 'AI工具',
        icon: '🧩'
    },

    // ===== 实用工具 =====
    {
        name: 'Type Words',
        url: 'https://typewords.cc/',
        category: '实用工具',
        icon: '⌨️'
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
    },
    {
        name: '牛客网',
        url: 'https://www.nowcoder.com',
        category: '求职就业',
        icon: '🐮'
    },
    {
        name: '应届生求职网',
        url: 'https://www.yingjiesheng.com',
        category: '求职就业',
        icon: '🎓'
    },
    {
        name: '实习僧',
        url: 'https://www.shixiseng.com',
        category: '求职就业',
        icon: '🧑‍💼'
    },
    {
        name: '前程无忧',
        url: 'https://www.51job.com',
        category: '求职就业',
        icon: '🌅'
    },

    // ===== 考研考公 =====
    {
        name: '中国研究生招生信息网',
        url: 'https://yz.chsi.com.cn',
        category: '考研考公',
        icon: '🎓'
    },
    {
        name: '小木虫',
        url: 'https://muchong.com',
        category: '考研考公',
        icon: '🐛'
    },
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
    '编程开发',
    '安理工·生活',
    '学术搜索·查重',
    'AI工具',
    '实用工具',
    '求职就业',
    '考研考公'
];
