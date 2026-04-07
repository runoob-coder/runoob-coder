import { DefaultTheme } from "vitepress/theme";

export function sidebarSTC8051(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: '前言',
            link: 'preface',
        },
        {
            text: '环境搭建',
            base: '/embedded-system/STC8051/',
            link: '',
            collapsed: false,
            items: [

            ]
        }
    ]
}

export function sidebarCookmoonMCU(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: '第一季剧透',
            link: '第一季剧透',
        },
        {
            text: '前言',
            link: '前言',
        },
        {
            text: '第0章 引子',
            base: '/embedded-system/cookmoon/mcu/0/',
            link: '引子',
            collapsed: false,
            items: [
                {text: '一、我是一棵小小草', link: '我是一棵小小草'},
                {text: '二、我的寨主叔叔', link: '我的寨主叔叔'},
                {text: '三、我的电脑', link: '我的电脑'},
                {text: '四、拜师学艺', link: '拜师学艺'},
            ]
        },
        {
            text: '第1章 千里之行，始于足下',
            base: '/embedded-system/cookmoon/mcu/1/',
            link: '千里之行，始于足下',
            collapsed: false,
            items: [
                {text: '2005-04-09：这种基础也行？', link: '2005-04-09：这种基础也行？'},
                {text: '2005-04-13：什么是电', link: '2005-04-13：什么是电'},
                {text: '2005-04-16：发电与放电', link: '2005-04-16：发电与放电'},
                {text: '2005-04-19：认识电池', link: '2005-04-19：认识电池'},
                {text: '2005-04-20：电工材料', link: '2005-04-20：电工材料'},
                {text: '2005-04-21：接插件', link: '2005-04-21：接插件'},
            ]
        },
        {
            text: 'IBM-PC机汇编语言实战精解',
            link: '/embedded-system/cookmoon/asm/'
        }
    ]
}
