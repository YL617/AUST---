/**
 * ============================================
 * 数据文件 - 安理工学生工具门户
 * ============================================
 * 
 * 本文件包含网站的所有数据：
 * 1. TOOLS_DATA - 工具数据（分官方和通用两类）
 * 2. NOTICES_DATA - 通知公告数据
 * 3. CATEGORIES - 分类数据
 * 
 * 【修改指南】
 * 如需添加/修改工具或通知，直接在对应数组中添加对象即可。
 * 每个对象都有明确的字段说明。
 */

// ============================================
// 工具数据
// ============================================

/**
 * 工具数据 - 包含安理工专属工具和通用实用工具
 * 
 * 字段说明：
 * - name: 工具名称（显示在卡片上）
 * - url: 工具链接地址
 * - category: 所属分类
 * - desc: 简短描述
 * - icon: emoji图标（显示在卡片左上角）
 * 
 * 【注意】标记为 TODO: 的链接需要确认实际地址
 */
const TOOLS_DATA = {
    
    // ------------------- 官方/校内工具 -------------------
    official: [
        // ===== 教务学习类 =====
        {
            name: '教务系统',
            url: 'https://www.aust.edu.cn/index/ggfw.htm',  // 已需确认实际地址
            category: '教务学习',
            desc: '选课、查课表、查成绩',
            icon: '📚'
        },
        {
            name: '教务处官网',
            url: 'http://jwc.aust.edu.cn',  //  已需确认实际地址
            category: '教务学习',
            desc: '教务通知、教学公告',
            icon: '🏛️'
        },
        {
            name: '图书馆',
            url: 'http://lib.aust.edu.cn',  // 已需确认实际地址
            category: '教务学习',
            desc: '图书检索、借阅续借',
            icon: '📖'
        },
        {
            name: '四六级报名',
            url: 'https://cet.neea.edu.cn/',  // 已需确认实际地址
            category: '教务学习',
            desc: '英语四六级考试报名',
            icon: '✍️'
        },
        {
            name: '成绩查询',
            url: 'https://jw.aust.edu.cn/score',  // TODO: 需确认实际地址
            category: '教务学习',
            desc: '查询各学期成绩',
            icon: '📊'
        },
        {
            name: '尔雅/慕课平台',
            url: 'https://mooc1.aust.edu.cn',  // TODO: 需确认实际地址
            category: '教务学习',
            desc: '在线课程学习',
            icon: '💻'
        },
        
        // ===== 办事服务类 =====
        {
            name: '校园卡服务',
            url: 'http://ecard.aust.edu.cn',  // TODO: 需确认实际地址
            category: '办事服务',
            desc: '校园卡充值、挂失',
            icon: '💳'
        },
        {
            name: 'OA办公系统',
            url: 'http://oa.aust.edu.cn',  // TODO: 需确认实际地址
            category: '办事服务',
            desc: '行政办公、审批流程',
            icon: '📋'
        },
        {
            name: '就业信息网',
            url: 'http://jy.aust.edu.cn',  // TODO: 需确认实际地址
            category: '办事服务',
            desc: '招聘信息、就业指导',
            icon: '💼'
        },
        {
            name: '离校手续办理',
            url: 'https://lixiao.aust.edu.cn',  // TODO: 需确认实际地址
            category: '办事服务',
            desc: '毕业生离校手续',
            icon: '🎓'
        },
        
        // ===== 特定工具/APP =====
        {
            name: '今日校园(打卡)',
            url: 'https://aust.campusphere.net/iap/login/pc.html?_2lBepC=22b30edb72174e06a31032990b19fd55',  // 已填入实际APP或网页地址
            category: '每日打卡',
            desc: '健康打卡、请假审批',
            icon: '📱'
        },
        {
            name: '学科竞赛系统',
            url: 'http://competition.aust.edu.cn',  // TODO: 需确认实际地址
            category: '竞赛管理',
            desc: '竞赛报名、获奖查询',
            icon: '🏆'
        },
        {
            name: '创新创业平台',
            url: 'http://cxcy.aust.edu.cn',  // TODO: 需确认实际地址
            category: '竞赛管理',
            desc: '大创项目、创业孵化',
            icon: '💡'
        },
        {
            name: '一网通办',
            url: 'http://ehall.aust.edu.cn',  // TODO: 需确认实际地址
            category: '办事服务',
            desc: '综合办事大厅',
            icon: '🔐'
        }
    ],
    
    // ------------------- 通用实用工具 -------------------
    general: [
        // ===== 学习工具 =====
        {
            name: '中国知网',
            url: 'https://www.cnki.net',
            category: '学习工具',
            desc: '文献检索、论文查重',
            icon: '📚'
        },
        {
            name: '万方数据',
            url: 'https://www.wanfangdata.com.cn',
            category: '学习工具',
            desc: '学术文献资源库',
            icon: '📖'
        },
        {
            name: '百度学术',
            url: 'https://xueshu.baidu.com',
            category: '学习工具',
            desc: '学术搜索、文献求助',
            icon: '🔍'
        },
        {
            name: 'iLovePDF',
            url: 'https://www.ilovepdf.com',
            category: '学习工具',
            desc: 'PDF合并、转换、压缩',
            icon: '📄'
        },
        {
            name: 'Word转PDF在线',
            url: 'https://www.ilovepdf.com/word_to_pdf',
            category: '学习工具',
            desc: 'Word文档转PDF',
            icon: '📝'
        },
        {
            name: '有道云笔记',
            url: 'https://note.youdao.com',
            category: '学习工具',
            desc: '云端笔记、文档同步',
            icon: '📓'
        },
        {
            name: '幕布',
            url: 'https://mubu.com',
            category: '学习工具',
            desc: '思维导图、清单管理',
            icon: '🧠'
        },
        
        // ===== AI工具（仅官方入口） =====
        {
            name: '文心一言',
            url: 'https://yiyan.baidu.com',
            category: 'AI工具',
            desc: '百度AI助手',
            icon: '🤖'
        },
        {
            name: '通义千问',
            url: 'https://www.qianwen.com/?source=tongyigw',
            category: 'AI工具',
            desc: '阿里AI助手',
            icon: '🖥️'
        },
        {
            name: 'Kimi',
            url: 'https://kimi.moonshot.cn',
            category: 'AI工具',
            desc: '长文本AI助手',
            icon: '🌙'
        },
        {
            name: '秘塔AI搜索',
            url: 'https://metaso.cn',
            category: 'AI工具',
            desc: '无广告AI搜索引擎',
            icon: '🔎'
        },
        
        // ===== 生活服务 =====
        {
            name: '校车时刻表',
            url: '#',  // TODO: 填入校车时刻表链接或说明页
            category: '生活服务',
            desc: '校车发车时间查询',
            icon: '🚌'
        },
        {
            name: '菜鸟驿站',
            url: 'https://daws Express.com',
            category: '生活服务',
            desc: '快递取件查询',
            icon: '📦'
        },
        {
            name: '智联招聘',
            url: 'https://www.zhaopin.com',
            category: '生活服务',
            desc: '实习兼职信息',
            icon: '🎯'
        },
        {
            name: 'BOSS直聘',
            url: 'https://www.zhipin.com',
            category: '生活服务',
            desc: '找实习/工作',
            icon: '👔'
        }
    ]
};

// ============================================
// 通知公告数据
// ============================================

/**
 * 通知数据 - 手动整理的通知列表
 * 
 * 字段说明：
 * - title: 通知标题
 * - date: 发布日期（格式：YYYY-MM-DD）
 * - tags: 标签数组，用于分类筛选
 * - source: 来源部门
 * - content: 通知摘要（可选）
 * - url: 通知原文链接（可选）
 * 
 * 【修改指南】定期更新通知数据，保持内容时效性
 */
const NOTICES_DATA = [
    {
        title: '关于2024-2025学年第一学期注册的通知',
        date: '2024-08-28',
        tags: ['教务', '注册'],
        source: '教务处',
        content: '全体本科生、研究生请于9月1日-5日完成学籍注册...',
        url: '#'  // TODO: 填入通知原文链接
    },
    {
        title: '关于举办2024年"互联网+"大学生创新创业大赛的通知',
        date: '2024-08-20',
        tags: ['竞赛', '创新创业'],
        source: '创新创业学院',
        content: '校赛报名已启动，具体事项详见附件...',
        url: '#'
    },
    {
        title: '2024年下半年全国大学英语四六级考试报名通知',
        date: '2024-08-15',
        tags: ['教务', '四六级'],
        source: '教务处',
        content: '报名时间：9月1日-9月10日，笔试时间：12月14日...',
        url: '#'
    },
    {
        title: '关于开展2024年暑期社会实践活动的通知',
        date: '2024-07-01',
        tags: ['学生活动', '社会实践'],
        source: '校团委',
        content: '鼓励各学院组织学生开展暑期社会实践活动...',
        url: '#'
    },
    {
        title: '关于2024年度国家奖学金评选工作的通知',
        date: '2024-09-10',
        tags: ['评奖评优', '奖学金'],
        source: '学生处',
        content: '国家奖学金每生每年8000元，名额有限，请符合条件的同学积极申报...',
        url: '#'
    },
    {
        title: '【就业讲座】如何写好一份让HR眼前一亮的简历',
        date: '2024-09-05',
        tags: ['就业', '讲座'],
        source: '就业指导中心',
        content: '特邀资深HR为你讲解简历撰写技巧，地点：图书馆报告厅...',
        url: '#'
    },
    {
        title: '关于图书馆暑假开放安排的通知',
        date: '2024-07-10',
        tags: ['图书馆', '通知'],
        source: '图书馆',
        content: '暑假期间图书馆开放时间调整，详见图书馆官网...',
        url: '#'
    },
    {
        title: '关于2025年硕士研究生招生考试报名的提示',
        date: '2024-09-12',
        tags: ['考研', '招生'],
        source: '研究生院',
        content: '预报名时间：9月24日-27日，正式报名：10月8日-25日...',
        url: '#'
    },
    {
        title: '校园网络安全警示：防范钓鱼邮件',
        date: '2024-08-30',
        tags: ['网络安全', '通知'],
        source: '信息化处',
        content: '近期发现钓鱼邮件攻击，请师生提高警惕，不要点击可疑链接...',
        url: '#'
    },
    {
        title: '关于开展2024年度大学生体质健康测试的通知',
        date: '2024-09-01',
        tags: ['体育', '体测'],
        source: '体育学院',
        content: '2024级新生体测时间安排见附件，请提前做好准备...',
        url: '#'
    }
];

// ============================================
// 分类数据
// ============================================

/**
 * 分类数据 - 用于页面导航和筛选
 * 
 * 包含三个维度的分类：
 * - grade: 按年级分类
 * - direction: 按发展方向分类
 * - hobby: 按兴趣爱好分类
 */
const CATEGORIES = {
    
    // 按年级分类
    grade: [
        { name: '新生专区', icon: '🌟', desc: '录取查询、入学指南' },
        { name: '大一大二', icon: '📗', desc: '基础课程、公共课' },
        { name: '大三大四', icon: '📘', desc: '专业课、毕业设计' },
        { name: '研究生专区', icon: '🎓', desc: '科研、论文、答辩' }
    ],
    
    // 按发展方向分类
    direction: [
        { name: '学习深造', icon: '📚', desc: '考研、保研、出国' },
        { name: '学生工作', icon: '👥', desc: '学生会、社团、班委' },
        { name: '求职就业', icon: '💼', desc: '实习、就业、创业' },
        { name: '考公考研', icon: '✍️', desc: '公务员、研究生备考' },
        { name: '生活休闲', icon: '🎮', desc: '娱乐、社交、校园生活' }
    ],
    
    // 按兴趣爱好分类
    hobby: [
        { name: '数码科技', icon: '💻', desc: '电脑、手机、数码产品' },
        { name: '运动户外', icon: '⚽', desc: '体育、健身、户外运动' },
        { name: '文艺创作', icon: '🎨', desc: '摄影、写作、设计' },
        { name: '学术竞赛', icon: '🏆', desc: '建模、编程、创新大赛' }
    ]
};

// ============================================
// 通知标签筛选选项
// ============================================

/**
 * 通知标签 - 用于通知页面的筛选
 * 【修改指南】可根据实际通知类型增删标签
 */
const NOTICE_TAGS = [
    '全部',
    '教务',
    '竞赛',
    '四六级',
    '奖学金',
    '就业',
    '讲座',
    '图书馆',
    '考研',
    '通知'
];

// ============================================
// 页面配置
// ============================================

/**
 * 网站配置信息
 * 【修改指南】可根据实际情况修改
 */
const SITE_CONFIG = {
    siteName: '安理工学生工具门户',
    slogan: '你的校园生活小助手',
    disclaimer: '非官方·学生自制公益工具站',
    // 版本信息
    version: 'v1.0.0',
    lastUpdate: '2024-09-15'
};

// ============================================
// 导出数据（兼容ES6模块和全局变量）
// ============================================

// 如果使用 ES6 模块，可以取消下面的注释：
// export { TOOLS_DATA, NOTICES_DATA, CATEGORIES, NOTICE_TAGS, SITE_CONFIG };

// 当前为全局变量模式，无需导出，直接在window对象上可用
