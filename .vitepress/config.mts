import {defineConfig} from 'vitepress'
import footnote from 'markdown-it-footnote'
import {sidebar} from './sidebar'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "noob-coder 🧑🏻‍💻",
    description: "菜鸟码农",
    head: [
        ['link', {rel: 'icon', type: 'image/svg+xml', href: '/laptop-code.svg'}],
        ['meta', {name: 'theme-color', content: '#c5964b'}],
        ['meta', {property: 'og:type', content: 'website'}],
        ['meta', {property: 'og:site_name', content: 'noob-coder 菜鸟码农'}],
        ['meta', {property: 'og:url', content: 'https://www.noob-coder.com/'}],
    ],
    lang: 'zh-cn',
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            {text: '主页', link: '/'},
            {
                text: '408',
                items: [
                    {text: '计算机组成原理', link: '/408/computer-organization'},
                    {text: '操作系统', link: '/408/operating-system'},
                    {text: '计算机网络', link: '/408/computer-network'},
                    {text: '数据结构与算法', link: '/408/data-structure'},
                    {
                        text: '学习参考',
                        items: [
                            {text: '王道计算机教育', link: 'https://space.bilibili.com/95228778'},
                            {text: '湖科大教书匠', link: 'https://space.bilibili.com/360996402'},
                        ]
                    },
                ]
            },
            {
                text: '数学',
                activeMatch: '/math/',
                items: [
                    {text: '高等数学', link: '/math/advanced-mathematics'},
                    {text: '线性代数', link: '/math/linear-algebra'},
                    {text: '概率论与统计', link: '/math/probability&statistics'},
                    {text: '离散数学', link: '/math/discrete-mathematics'},
                    {
                        text: '考研数学公式速查速记掌中宝',
                        link: '/math/kaoyan-pamphlet/',
                        activeMatch: '/math/kaoyan-pamphlet/',
                    },
                    {text: '高中数学笔记', link: '/math/high-school-math-notes'},
                    {
                        text: '工具及参考', items: [
                            {text: '【推荐】线性代数的本质', link: 'https://www.bilibili.com/video/BV1ys411472E/',},
                            {text: 'Paul的在线笔记', link: 'https://tutorial.math.lamar.edu/'},
                            {text: 'LaTeX', link: '/math/tools/LaTeX'},
                            {text: 'LaTeX公式编辑器', link: 'https://www.latexlive.com/home'},
                        ]
                    },
                ]
            },
            {
                text: 'Web',
                items: [
                    {
                        text: '基础',
                        items: [
                            {text: 'HTML&CSS', link: '/web/'},
                            {text: 'JS', link: '/web/js'},
                            {text: 'TS', link: '/web/ts'},
                        ],
                    },
                    {
                        text: '框架',
                        items: [
                            {text: 'Vue', link: '/web/frameworks/vue'},
                            {text: 'React', link: '/web/frameworks/react'},
                        ],
                    },
                    {
                        text: '应用',
                        items: [
                            {text: 'uniapp', link: '/web/uniapp'},
                            {text: '微信小程序', link: '/web/miniprogram'},
                            {text: 'React Native', link: '/web/rn'},
                            {text: 'Electron', link: '/web/electron'},
                        ],
                    },
                    {text: '学习参考', link: '/web/references'},
                ]
            },
            {
                text: 'Flutter',
                items: [
                    {
                        text: '学习参考',
                        items: [
                            {text: 'Awesome Flutter', link: '/flutter/awesome'},
                            {text: '《Flutter实战·第二版》', link: 'https://book.flutterchina.club/'},
                            {text: 'GSY Flutter Book', link: 'https://github.com/CarGuo/gsy_flutter_book'},
                        ]
                    },
                ]
            },
            {
                text: 'PHP',
                activeMatch: '/php/',
                items: [
                    {
                        text: '框架',
                        items: [
                            {text: 'Hyperf', link: '/php/frameworks/hyperf'},
                            {text: 'Laravel', link: '/php/frameworks/laravel'},
                            {text: 'ThinkPHP', link: '/php/frameworks/thinkphp'},
                        ],
                    },
                    {text: 'Composer 依赖管理', link: '/php/composer', activeMatch: '/php/composer/',},
                    {text: 'PHP PSR 标准规范', link: '/php/php-fig/psr/', activeMatch: '/php/php-fig/psr/',},
                    {text: 'PHP 最佳实践', link: '/php/php-best-practices/', activeMatch: '/php/php-best-practices/',},
                    {text: '学习参考', link: '/php/references'},
                    {text: 'PHP中文手册', link: 'https://www.php.net/manual/zh/'},
                ]
            },
            {
                text: 'DB',
                items: [
                    {
                        text: '数据库',
                        link: '/database/',
                    },
                    {
                        text: 'MySQL',
                        items: [
                            {
                                text: '参考',
                                items: [
                                    {
                                        text: '阿里开发手册',
                                        link: '/database/mysql/references/alibaba_coding_guidelines'
                                    },
                                ]
                            },
                            {text: '学习参考', link: '/database/mysql/references/'},
                            {
                                text: '阿里开发手册',
                                link: '/database/mysql/references/alibaba_coding_guidelines'
                            },
                        ],
                    },
                    {
                        text: 'Redis',
                        items: [
                            {text: '学习参考', link: '/database/redis/references/'},
                        ],
                    },
                    {
                        text: 'MongoDB',
                        items: [],
                    },
                    {
                        text: '搜索引擎',
                        items: [
                            {text: 'Solr', link: '/database/solr'},
                            {text: 'ElasticSearch', link: '/database/elasticsearch'},
                        ],
                    },
                ]
            },
            {
                text: 'Linux',
                activeMatch: '/linux',
                items: [
                    {
                        text: '发行版',
                        items: [
                            {text: 'CentOS', link: '/linux/CentOS'},
                            {text: 'Debian', link: '/linux/debian/'},
                            {
                                text: 'deepin', link: '/linux/deepin/', activeMatch: '/linux/deepin/',
                            },
                            {text: 'Ubuntu', link: '/linux/ubuntu'},
                            {text: 'Arch', link: '/linux/arch'},
                        ]
                    },
                    {
                        text: '服务器环境',
                        items: [
                            {text: '前期准备', link: '/linux/server/preparation'},
                            {
                                text: 'Nginx',
                                link: '/linux/server/nginx/compile-and-install',
                                activeMatch: '/linux/server/nginx/'
                            },
                            {
                                text: 'PHP',
                                link: '/linux/server/php/compile-and-install',
                                activeMatch: '/linux/server/php/'
                            },
                            {
                                text: 'Supervisor',
                                link: '/linux/server/supervisor/install',
                                activeMatch: '/linux/server/supervisor/'
                            },
                            {
                                text: 'SSL证书',
                                link: '/linux/server/ssl/acmesh',
                                activeMatch: '/linux/server/ssl/'
                            },
                            {
                                text: '宝塔面板一键部署 🚀',
                                link: 'https://www.bt.cn/u/1lohGU',
                            },
                        ]
                    },
                    {
                        text: '包管理',
                        items: [
                            {text: 'apt', link: '/linux/package-manager/apt'},
                            {text: 'yum', link: '/linux/package-manager/yum'},
                            {text: 'dnf', link: '/linux/package-manager/dnf'},
                        ]
                    },
                    {text: '内核', link: '/linux/references'},
                    {text: '学习参考', link: '/linux/references'},
                    {text: 'LinuxCN', link: 'https://linux.cn/'},
                    {text: '鸟哥的 Linux 私房菜', link: 'https://linux.vbird.org/'},
                ]
            },
            {
                text: '单片机',
                activeMatch: '/embedded-system',
                items: [
                    {text: '学习参考', link: '/embedded-system/references'},
                    {
                        text: '活死人墓',
                        items: [
                            {
                                text: '从欧姆定律到微型计算机',
                                link: '/embedded-system/cookmoon/mcu/',
                                activeMatch: '/embedded-system/cookmoon/mcu/',
                            },
                            {
                                text: 'IBM-PC机汇编语言实战精解',
                                link: '/embedded-system/cookmoon/asm/',
                                activeMatch: '/embedded-system/cookmoon/asm/',
                            },
                        ],
                    },
                ]
            },
            {text: '关于', link: '/README'},
            {
                text: '📝',
                items: [
                    {text: '提问的智慧', link: 'https://github.com/ryanhanwu/How-To-Ask-Questions-The-Smart-Way'},
                    {text: '中文技术文档写作规范', link: '/document-style-guide'},
                    {text: '代码安全指南', link: '/secguide', activeMatch: '/secguide/'},
                ]
            },
        ],

        sidebar: sidebar,

        editLink: {
            pattern: 'https://github.com/runoob-coder/runoob-coder/edit/main/docs/:path',
            text: '在 GitHub 上编辑此页面'
        },
        socialLinks: [
            {icon: 'github', link: 'https://github.com/runoob-coder'},
            {icon: 'alipay', ariaLabel: '支付宝红包福利', link: '/alipay'},
            // {icon: 'bilibili', link: 'https://space.bilibili.com/1787631752'},
            // {icon: 'juejin', link: 'https://juejin.cn/user/4020229690108109'},
            {
                icon: 'alibabacloud',
                ariaLabel: '阿里云专享特惠',
                link: 'https://www.aliyun.com/minisite/goods?source=5176.29345612&userCode=xnll3b0k'
            },
            {
                icon: {
                    svg: `<svg viewBox="0 0 30 22" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="navbar-logo"><defs><polygon id="Fg0w3r5QIV__path-1" points="0 0 30.5205 0 30.5205 20.33 0 20.33"></polygon></defs><g id="Fg0w3r5QIV__\u9996\u9875" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Fg0w3r5QIV__\u5207\u56FE" transform="translate(-96.000000, -54.000000)"><g id="Fg0w3r5QIV__\u7F16\u7EC4" transform="translate(96.000000, 54.000000)"><g transform="translate(0.000000, 0.080025)"><mask id="Fg0w3r5QIV__mask-2" fill="white"><use xlink:href="#Fg0w3r5QIV__path-1"></use></mask><g id="Fg0w3r5QIV__Clip-2"></g><path d="M30.520525,0.2356 C30.006775,0.05935 29.581775,0.2741 29.338025,0.45735 C25.957025,4.4536 20.905275,6.99135 15.260275,6.99135 C13.320775,6.99135 11.451275,6.69185 9.695525,6.13635 C9.238275,4.4771 8.915025,3.2991 8.915025,3.2991 C8.915025,3.2991 8.535275,2.1431 7.250025,2.34135 L7.619525,5.3361 C5.127025,4.19885 2.931025,2.5236 1.182525,0.45685 C0.938525,0.2741 0.513775,0.05935 2.5e-05,0.2356 C1.460525,4.14235 4.378775,7.3366 8.092025,9.16035 L9.104775,17.36185 C9.104775,17.36185 9.557525,20.5001 12.502025,20.5001 L18.800025,20.5001 C21.744525,20.5001 22.197275,17.36185 22.197275,17.36185 L22.909025,11.48435 C20.996775,11.3286 19.794275,12.6611 19.412775,13.9761 C18.772525,16.19035 18.773275,16.33185 18.647025,16.7181 C18.388525,17.50885 17.540275,17.6031 17.540275,17.6031 L13.762025,17.6031 C13.762025,17.6031 12.913275,17.50885 12.654775,16.7181 C12.488275,16.20885 11.656775,13.22985 10.819775,10.2076 C12.231525,10.60685 13.721025,10.8211 15.260275,10.8211 C22.249525,10.8211 28.209025,6.41835 30.520525,0.2356" id="Fg0w3r5QIV__Fill-1" fill="#00A6E0" mask="url(#Fg0w3r5QIV__mask-2)"></path></g></g></g></g></svg>`
                },
                ariaLabel: '七牛云',
                link: 'https://s.qiniu.com/f2UjUv'
            },
            {
                icon: {
                    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 442.95 442.95"><defs><style>.a{fill:#20a43a;}.b{fill:#18842d;}.c{fill:#18852d;}.d{fill:#20a53a;}.e{fill:#21a53b;}.f{fill:#24a53e;}.g{fill:#fefefe;}.h{fill:#fdfefd;}</style></defs><path class="a" d="M206.36,441.93a22.57,22.57,0,0,1-1.22-6.14q0-23.24,0-46.47,0-121.24,0-242.5c0-3.06,0-6.11-.35-9.16a1,1,0,0,1,.67-1.08,4.71,4.71,0,0,1,2.82.31c9.08,2.51,18.13,5.11,27.25,7.45,2.35.6,2.89,1.67,2.85,3.89-.13,7,.11,14.06-.13,21.08-.09,2.86.85,3.91,3.58,4.45,5.8,1.15,11.37,3.31,17.26,4.15a1.06,1.06,0,0,0,.5,0c2.16-.74,3.56.44,5.34,1.18a1.15,1.15,0,0,0,.41.08c4,0,.63-1.76,1.41-2.57-.44-6-.19-12-.17-17.92,0-1.5.16-3,1.49-3.94a1,1,0,0,1,.84-.12c9.13,2.6,18.25,5.21,27.4,7.77,1.81.51,1.73,1.81,1.73,3.23,0,6.91.06,13.82,0,20.72,0,2.21.43,3.36,2.85,3.9,5.51,1.23,10.95,2.83,16.41,4.29a1.16,1.16,0,0,0,.64,0c2.58-.93,4.83,1.15,7.31,1.08a1,1,0,0,0,.95-.73c.9-3.1.19-6.27.28-9.4a72.46,72.46,0,0,0-.22-11.69c0-.26.06-.5,0-.74-.08-1.32.49-.94,1.29-.71,9,2.58,18,5.26,27.09,7.75,2.42.67,1.82,2.38,1.83,3.88q.19,34,.33,68c.09,27.83.09,55.67.26,83.5a20,20,0,0,1-2.21,9.4c-7.33,14.66-17.89,26.75-29.94,37.62-22.08,19.92-47.84,33.77-75.11,45.1-12.67,5.27-25.76,8.83-38.66,13.82-1.1.43-1.38.55-1.51.58l-.3.12a15.83,15.83,0,0,1-2.81.92"/><path class="b" d="M204.85,137.06a1.83,1.83,0,0,1,1.65,2.12c0,1.13,0,2.27,0,3.4V443l-1-.28s-17.77-5.83-26.56-9c-30.35-11-59.19-24.91-84.37-45.51-13.95-11.41-26.14-24.38-35-40.25a28.69,28.69,0,0,1-3.78-14.69q.49-74.44.53-148.88c0-2.94.93-4.12,3.7-4.85,8.74-2.32,17.4-4.91,26.09-7.4h0c1.26,1.33,1.08,3,1.09,4.63,0,4.9,0,9.8,0,14.7,0,3.72.34,3.94,3.91,3.3a9.78,9.78,0,0,1,4.1-.19h0c5.83-1.49,11.64-3.07,17.49-4.45,2-.48,2.12-1.69,2.1-3.33,0-7,0-14.07,0-21.1,0-1.42-.11-2.73,1.72-3.24,9.29-2.61,18.56-5.28,27.84-7.93h0c1.37,1.45,1,3.28,1.06,5,.18,6.27-.32,12.56.28,18.82h0c2.09,1.84,4-.31,6-.25,1.07-.32,1.58.22,3.2.05,5.34-1.46,10.64-3.09,16-4.29,2.69-.6,3.68-1.59,3.58-4.47-.24-7.17-.07-14.36-.08-21.55,0-1.41-.11-2.61,1.82-3.11C185.88,142.23,195.36,139.62,204.85,137.06Z"/><path class="a" d="M206.42,68.23c4.46.31,7.33,2,8,7,.55,4.2,1,9.39,3.6,12s7.88,2.74,12,3.89q75.12,21.06,150.21,42.15c2.56.73,4.62.74,6.51-1.21.17-.18.43-.27.6-.45,7-7.08,15.24-9.18,24.92-5.27.25.73-.85,1.27-1.4,2-7.91,10.44-15.9,20.83-23.75,31.32-1.48,2-2.69,2.59-5.29,1.84q-86-24.94-172.09-49.7a13.12,13.12,0,0,0-5.55-.52c1.41-4.5,1-9.13,1-13.73,0-8,0-16,0-24C205.23,71.74,205.07,69.81,206.42,68.23Z"/><path class="b" d="M206.42,68.23c0,12.89,0,25.77,0,38.65,0,2-.2,3.66-2.28,4.49-15.71,4.6-31.4,9.26-47.12,13.81Q94,143.38,31,161.51c-1.54.44-2.92,1.33-4.34-.55C18,149.41,9.16,137.94,0,125.91l13.83-1.69a2.67,2.67,0,0,1,2.11.6,19.51,19.51,0,0,1,1.83,1.33c7.14,7.49,14.83,7.56,24.69,4.67,49.68-14.53,99.61-28.18,149.48-42.07,2.43-.68,3.91-1.62,4.34-4.3.49-3.1,1.84-6.09,2.15-9.19C198.92,70.2,202,68.54,206.42,68.23Z"/><path class="a" d="M206.4.34c6.92-.36,6.93-.36,8.19,6.39,1.59,8.54,3.24,17.07,4.69,25.64a3.88,3.88,0,0,0,3.15,3.57q69.87,20.91,139.7,42a4,4,0,0,0,4.2-.69c.19-.17.43-.27.62-.44,7.5-6.71,15.73-10.23,25.92-5.26.13.76-1.18,1.21-1.91,1.93C382.05,82.2,373,90.83,364.23,99.67c-2.15,2.16-4,2.57-6.9,1.74q-73.95-20.86-148-41.51c-1.21-.34-2.46-.55-3.68-.81a7.17,7.17,0,0,1-.51-3.69c0-16.44,0-32.88,0-49.33C205.22,4.11,204.86,2,206.4.34Z"/><path class="b" d="M206.4.34q0,27.18,0,54.36c0,1.5.16,3-.72,4.39Q169.33,69.35,133,79.62c-25.69,7.22-51.42,14.31-77.07,21.69-3.43,1-5.51.37-7.81-2.14-8.93-9.74-18-19.35-26.62-28.56,2.81-.4,7.22-1,11.61-1.67,1.75-.26,3,.8,4,1.81,7.32,7.59,15.13,7,24.81,4C104.2,61.43,146.79,49,189.3,36.32c2.81-.84,4-2.09,4.46-5.05,1.37-8.71,3.4-17.31,4.68-26,.58-4,1.92-5.9,6.08-5A14.6,14.6,0,0,0,206.4.34Z"/><path class="a" d="M95.18,194.48a41.77,41.77,0,0,1-7.41,2.1c-2,.4-1.69-1.61-1.7-2.79-.06-7.26,0-14.51,0-21.77a1.18,1.18,0,0,1,.37-.05c8.72,1.39,8.72,1.39,8.73,10.07C95.13,186.18,95.16,190.33,95.18,194.48Z"/><path class="c" d="M326.77,172v1.4a150.22,150.22,0,0,1,0,23.43c-3.25-.47-6.1-1.56-9.16-2.29,0-5.67.22-11.34,0-17-.11-2.84.79-4.2,3.63-4.47C323.11,172.93,324.83,171.88,326.77,172Z"/><path class="c" d="M264.47,179.43a52.17,52.17,0,0,1-5.09-1.47c0-6.15.18-12.3-.09-18.43-.12-2.79.94-3.84,3.42-4.13,1.94-.22,3.73-1.42,5.79-1-1.47,3.12-.63,6.42-.73,9.63-.13,4.63,0,9.27,0,13.9C267.88,179.87,268,180.33,264.47,179.43Z"/><path class="d" d="M151.9,178.71a27.68,27.68,0,0,0,3-.64c-2.07-.1-1.42-1.68-1.43-2.78-.05-5.51,0-11,0-16.53,0-1.21.31-2.55-1.54-2.86-2.53-.44-4.91-1.7-7.58-1.48,0,7.3,0,14.6,0,21.9,0,.43-.16,3.62.74,3.92a4.26,4.26,0,0,0,1.36-.18,9,9,0,0,0,1.3-.25"/><path class="f" d="M326.77,196.86q0-11.72,0-23.43c1.23,1.1.69,2.56.74,3.87.25,6.31-.43,12.65.35,19,0,.28-.28.62-.5.87C327.33,197.18,327,197,326.77,196.86Z"/></svg>`
                },
                ariaLabel: '宝塔服务器面板，一键全能部署及管理',
                link: 'https://www.bt.cn/u/1lohGU'
            },
        ],
        outline: {
            level: 'deep',
            label: '目录'
        },
        lastUpdated: {
            text: '最后更新于',
            formatOptions: {
                dateStyle: 'full',
                timeStyle: 'medium'
            }
        },
        footer: {
            message: '学习｜思考｜实践<br>学而不思则罔，思而不学则殆。',
        },
        docFooter: {
            prev: '上一页',
            next: '下一页'
        },
        notFound: {
            title: '页面未找到',
            quote:
                '但如果你不改变方向，并且继续寻找，你可能最终会到达你所前往的地方。',
            linkLabel: '前往首页',
            linkText: '带我回首页'
        },
        darkModeSwitchLabel: '暗黑模式',
        lightModeSwitchTitle: '切换到浅色模式',
        darkModeSwitchTitle: '切换到深色模式',
        skipToContentLabel: '跳转到内容',
        sidebarMenuLabel: '菜单',
        returnToTopLabel: '返回顶部',
        externalLinkIcon: true,
        search: {
            provider: 'local',
            options: {
                locales: {
                    root: {
                        translations: {
                            button: {
                                buttonText: '搜索文档',
                                buttonAriaLabel: '搜索文档'
                            },
                            modal: {
                                noResultsText: '无法找到相关结果',
                                resetButtonTitle: '清除查询条件',
                                footer: {
                                    selectText: '选择',
                                    navigateText: '切换',
                                    closeText: '关闭'
                                }
                            }
                        }
                    }
                }
            }
        },
    },
    markdown: {
        languages: [
            {
                name: 'neon',
                scopeName: 'source.vue-yaml'
            }
        ],
        image: {
            // 图片懒加载
            lazyLoading: true
        },
        math: true,
        config: (md) => {
            // 使用更多的 Markdown-it 插件！
            md.use(footnote)
        }
    },
    lastUpdated: true,
    sitemap: {
        hostname: 'https://www.noob-coder.com'
    },
    vite: {
        plugins: []
    }
})
