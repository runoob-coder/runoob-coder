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
                            text: '别名',
                            link: 'aliases'
                        },
                        {
                            text: '私有托管包和存储库的身份验证',
                            link: 'authentication-for-private-packages'
                        },
                        {
                            text: '优化自动加载器',
                            link: 'autoloader-optimization'
                        },
                        {
                            text: 'Composer 平台依赖',
                            link: 'composer-platform-dependencies'
                        },
                        {
                            text: '设置和使用自定义安装器',
                            link: 'custom-installers'
                        },
                        {
                            text: '私有包处理',
                            link: 'handling-private-packages'
                        },
                        {
                            text: '插件',
                            link: 'plugins'
                        },
                        {
                            text: '仓库优先级',
                            link: 'repository-priorities'
                        },
                        {
                            text: '脚本',
                            link: 'scripts'
                        },
                        {
                            text: '供应商二进制文件和 vendor/bin 目录',
                            link: 'vendor-binaries'
                        },
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
                    items: [
                        {
                            text: '如何将包安装到框架的自定义路径？',
                            link: 'how-do-i-install-a-package-to-a-custom-path-for-my-framework.md'
                        },
                        {
                            text: '如何以编程方式安装 Composer？',
                            link: 'how-to-install-composer-programmatically.md'
                        },
                        {
                            text: '如何安全地安装不受信任的包？以超级用户或root身份运行Composer是否安全？',
                            link: 'how-to-install-untrusted-packages-safely.md'
                        },
                        {
                            text: '如何在代理服务器后使用 Composer？',
                            link: 'how-to-use-composer-behind-a-proxy.md'
                        },
                        {
                            text: '我应该提交 vendor 目录中的依赖项吗？',
                            link: 'should-i-commit-the-dependencies-in-my-vendor-directory.md'
                        },
                        {
                            text: 'Composer 本身使用哪种版本编号系统？',
                            link: 'which-version-numbering-system-does-composer-itself-use.md'
                        },
                        {
                            text: '为什么无限制的版本约束是一个坏主意？',
                            link: 'why-are-unbound-version-constraints-a-bad-idea.md'
                        },
                        {
                            text: '为什么组合使用比较运算符和通配符的版本约束是一个坏主意？',
                            link: 'why-are-version-constraints-combining-comparisons-and-wildcards-a-bad-idea.md'
                        },
                        {
                            text: '为什么 Composer 不能递归加载仓库？',
                            link: 'why-cant-composer-load-repositories-recursively.md'
                        },
                    ]
                }
            ]
        },
        {
            text: 'PHP PSR标准规范',
            base: '/php/php-fig/psr/',
            link: 'index',
        },
        {
            text: 'PHP 最佳实践',
            base: '/php/php-best-practices/',
            link: 'index',
        }
    ]
}

export function sidebarPSR(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: 'PSR 标准规范',
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
        {
            text: 'Composer',
            base: '/php/composer/',
            link: 'index',
        },
        {
            text: 'PHP 最佳实践',
            base: '/php/php-best-practices/',
            link: 'index',
        }
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
        {
            text: 'PHP PSR标准规范',
            base: '/php/php-fig/psr/',
            link: 'index',
        },
        {
            text: 'Composer',
            base: '/php/composer/',
            link: 'index',
        }
    ]
}
