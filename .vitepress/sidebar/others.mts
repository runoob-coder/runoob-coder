import {DefaultTheme} from "vitepress/theme";

export function sidebarSecGuide(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: '代码安全指南',
            base: '/secguide/',
            collapsed: true,
            items: [
                {text: 'C & C++', link: 'C&C++'},
                {text: 'JavaScript', link: 'JavaScript'},
            ]
        },
    ]
}
