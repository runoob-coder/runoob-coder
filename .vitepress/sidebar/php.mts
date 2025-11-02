import DefaultTheme from "vitepress/theme";

export function sidebarPHPComposer(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: 'Composer',
            base: '/php/composer/',
            link: 'index',
            collapsed: false,
            items: [
                {
                    text: '介绍',
                    link: 'intro',
                },
                {
                    text: '基本用法',
                    link: 'basic-usage',
                },
                {
                    text: '库（资源包）',
                    link: 'libraries'
                },
                {
                    text: '命令行',
                    link: 'cli'
                },
                {
                    text: '架构',
                    link: 'schema'
                },
                {
                    text: '仓库',
                    link: 'repositories'
                },
                {
                    text: '配置',
                    link: 'config'
                },
                {
                    text: '运行时',
                    link: 'runtime'
                },
                {
                    text: '社区',
                    link: 'community'
                },
                {
                    text: '相关文章',
                    base: '/php/composer/articles/',
                    collapsed: false,
                    items: [
                        {
                            text: '版本与约束',
                            link: 'versions'
                        }
                    ]
                },
                {
                    text: '常见问题',
                    base: '/php/composer/faqs/',
                    collapsed: false,
                    items: []
                }
            ]
        },
    ]
}

export function sidebarPSR(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: 'PSR标准规范',
            base: '/php/php-fig/psr/',
            link: 'index',
            collapsed: false,
            items: [
                {
                    text: 'PSR-0 自动加载规范（已弃用）',
                    link: 'PSR-0-autoloading-standard',
                },
            ]
        },
    ]
}

export function sidebarPhpBestPractices(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: 'PHP 最佳实践',
            base: '/php/php-best-practices/',
            link: 'index',
            collapsed: false,
            items: [
                {
                    text: '介绍',
                    link: 'introduction',
                },
                {
                    text: '我们使用的是哪个 PHP 版本？',
                    link: 'version',
                },
                {
                    text: '密码存储',
                    link: 'passwords',
                },
                {
                    text: 'MySQL数据库的连接与查询',
                    link: 'mysql',
                },
                {
                    text: 'PHP 标记',
                    link: 'php-tags',
                },
                {
                    text: '自动加载类',
                    link: 'auto-loading',
                },
                {
                    text: '单引号与双引号的性能差异',
                    link: 'quotes',
                },
                {
                    text: 'define() 与 const',
                    link: 'constants',
                },
                {
                    text: 'Opcache',
                    link: 'opcode-cache'
                },
                {
                    text: 'PHP 与 Memcached',
                    link: 'memcached'
                },
                {
                    text: 'PHP 与正则表达式',
                    link: 'regex'
                },
                {
                    text: '通过 Web 服务器运行 PHP',
                    link: 'serving-php'
                },
                {
                    text: '发送邮件',
                    link: 'email'
                },
                {
                    text: '验证邮箱地址',
                    link: 'validating-emails'
                },
                {
                    text: '过滤 HTML 输入和输出',
                    link: 'sanitizing-html'
                },
                {
                    text: 'PHP 与 UTF-8',
                    link: 'utf-8'
                },
                {
                    text: '处理日期和时间',
                    link: 'working-with-dates-and-times'
                },
                {
                    text: '检查值是否为 null 或 false',
                    link: 'checking-for-null'
                },
                {
                    text: '移除重音符号（变音符号）',
                    link: 'removing-accent-marks'
                },
                {
                    text: '建议和更正',
                    link: 'suggestions'
                },
                {
                    text: '最后修订和维护者',
                    link: 'maintainers',
                },

            ]
        },
    ]
}
