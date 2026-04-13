import {DefaultTheme} from "vitepress/theme";

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
            items: []
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
            collapsed: true,
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
            collapsed: true,
            items: [
                {text: '2005-04-09：这种基础也行？', link: '2005-04-09：这种基础也行？'},
                {text: '2005-04-13：什么是电', link: '2005-04-13：什么是电'},
                {text: '2005-04-16：发电与放电', link: '2005-04-16：发电与放电'},
                {text: '2005-04-19：认识电池', link: '2005-04-19：认识电池'},
                {text: '2005-04-20：电工材料', link: '2005-04-20：电工材料'},
                {text: '2005-04-21：接插件', link: '2005-04-21：接插件'},
                {text: '2005-04-23：印刷电路板', link: '2005-04-23：印刷电路板'},
            ]
        },
        {
            text: '第2章 初试欧姆定律',
            base: '/embedded-system/cookmoon/mcu/2/',
            link: '初试欧姆定律',
            collapsed: true,
            items: [
                {text: '2005-04-29：认识电阻器（一）', link: '2005-04-29：认识电阻器（一）'},
                {text: '2005-04-30：认识电阻器（二）', link: '2005-04-30：认识电阻器（二）'},
                {text: '2005-05-02：用开关搭电路', link: '2005-05-02：用开关搭电路'},
                {text: '2005-05-03：开关与电阻', link: '2005-05-03：开关与电阻'},
                {text: '2005-05-04：数字与模拟', link: '2005-05-04：数字与模拟'},
                {text: '2005-05-05：二进制数', link: '2005-05-05：二进制数'},
            ]
        },
        {
            text: '第3章 晶体二极管',
            base: '/embedded-system/cookmoon/mcu/3/',
            link: '晶体二极管',
            collapsed: true,
            items: [
                {text: '2005-05-09：半导体', link: '2005-05-09：半导体'},
                {text: '2005-05-10：PN 结原理', link: '2005-05-10：PN 结原理'},
                {text: '2005-05-12：晶体二极管', link: '2005-05-12：晶体二极管'},
                {text: '2005-05-15：二极管电路（一）', link: '2005-05-15：二极管电路（一）'},
                {text: '2005-05-17：二极管电路（二）', link: '2005-05-17：二极管电路（二）'},
                {text: '2005-05-18：二极管电路（三）', link: '2005-05-18：二极管电路（三）'},
                {text: '2005-05-20：发光二极管', link: '2005-05-20：发光二极管'},
            ]
        },
        {
            text: '第4章 基本电路定理',
            base: '/embedded-system/cookmoon/mcu/4/',
            link: '基本电路定理',
            collapsed: true,
            items: [
                {text: '2005-05-23：内阻，极其重要', link: '2005-05-23：内阻，极其重要'},
                {text: '2005-05-24：戴维南定理', link: '2005-05-24：戴维南定理'},
                {
                    text: '小花絮 第一次实验', items: [
                        {text: '2005-05-29：点亮LED数码管', link: '2005-05-29：点亮LED数码管'},
                    ]
                }
            ]
        },
        {
            text: 'IBM-PC机汇编语言实战精解',
            link: '/embedded-system/cookmoon/asm/'
        }
    ]
}
