import DefaultTheme from "vitepress/theme";

export function sidebarLinuxDeepin(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: '安装',
            base: '/linux/deepin/',
            link: 'install',
            collapsed: true,
            // items: []
        },
    ]
}

export function sidebarLinuxServer(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: '个人服务器环境搭建',
            base: '/linux/server/',
            collapsed: false,
            items: [
                {text: '前期准备', link: 'index/',},
                {text: 'Git', link: 'git/',},
                {
                    text: 'Nginx服务',
                    base: '/linux/server/nginx/',
                    collapsed: true,
                    items: [
                        {text: 'Nginx编译安装', link: 'compile-and-install'},
                        {text: 'Nginx配置优化', link: 'config'},
                        {text: 'Brotli压缩', link: 'brotli'},
                        {text: 'Nginx常用命令', link: 'command-line'},
                        {text: '服务项目配置', link: 'server-config'},
                        {
                            base: '//',
                            text: 'Nginx管理员指南', link: 'docs.nginx.com/nginx/admin-guide/',
                            target: '_blank'
                        },
                    ]
                },
                {text: 'Redis', link: 'redis/',},
                {text: 'Mysql', link: 'mysql/',},
                {
                    text: 'PHP',
                    base: '/linux/server/php/',
                    collapsed: true,
                    items: [
                        {text: 'PHP编译安装', link: 'compile-and-install'},
                        {text: '安装Composer包管理器', link: '/php/composer', base: '/',},
                        {text: '安装PIE', link: 'pie'},
                        {text: '编译安装swoole扩展', link: 'swoole'},
                        {text: '编译安装redis扩展', link: 'redis'},
                    ]
                },
                {
                    text: 'Supervisor服务',
                    base: '/linux/server/supervisor/',
                    collapsed: true,
                    items: [
                        {text: '快速入门', link: 'install'},
                        {text: '配置与项目部署', link: 'config'},
                        {text: '命令行参数', link: 'command-line-options'},
                        {
                            base: '//',
                            text: 'Supervisor官网', link: 'supervisord.org/',
                            target: '_blank'
                        },
                    ]
                },
                {text: 'FrankenPHP', base: '//', link: 'https://frankenphp.dev/',},
            ]
        },
        {
            text: 'SSL证书',
            base: '/linux/server/ssl',
            collapsed: false,
            items: [
                {
                    text: 'acme.sh',
                    base: '/linux/server/ssl/acme.sh/',
                    collapsed: true,
                    items: [
                        {text: '安装与使用', link: 'index'},
                        {text: '实操', link: 'practical-operation'},
                        {
                            base: '//',
                            text: 'Github仓库', link: 'github.com/acmesh-official/acme.sh',
                            target: '_blank'
                        },
                    ]
                },
                {
                    text: 'Certbot',
                    base: '//',
                    link: 'https://github.com/certbot/certbot',
                },
            ]
        },
        {
            base: 'https://',
            text: '宝塔面板一键部署 🚀', link: 'www.bt.cn/u/1lohGU',
            target: '_blank'
        },
    ]
}

