import {sidebar408ComputerNetwork} from "./408.mjs"
import {kaoYanPamphlet} from "./math.mjs";
import {sidebarPhpBestPractices, sidebarPHPComposer, sidebarPSR} from "./php.mjs";
import {sidebarSecGuide} from "./others.mjs";
import {sidebarLinuxServer} from "./linux.mjs";
import {sidebarCookmoonMCU} from "./embedded-system.mjs";

export const sidebar = {
    '/math/kaoyan-pamphlet/': {base: '/math/kaoyan-pamphlet/', items: kaoYanPamphlet()},
    '/php/composer/': {base: '/php/composer/', items: sidebarPHPComposer()},
    '/php/php-fig/psr/': {base: '/php/php-fig/psr/', items: sidebarPSR()},
    '/php/php-best-practices/': {base: '/php/php-best-practices/', items: sidebarPhpBestPractices()},
    '/secguide': {base: '/secguide', items: sidebarSecGuide()},
    '/linux/server/': {
        base: '/linux/server/',
        items: sidebarLinuxServer()
    },
    '/embedded-system/cookmoon/mcu/': {
        base: '/embedded-system/cookmoon/mcu/',
        items: sidebarCookmoonMCU()
    },
    // '/408/computer-network/': {base: '/408/computer-network/', items: sidebar408ComputerNetwork()},
    /*'/408/data-structure/': {base: '/408/data-structure/', items: sidebar408DataStructure()},
    '/database/mysql/references/': {
        base: '/database/mysql/references/',
        items: sidebarDatabaseMysqlReferences()
    },
    '/linux/deepin/': {
        base: '/linux/deepin/',
        items: sidebarLinuxDeepin()
    },
    '/linux/server/': {
        base: '/linux/server/',
        items: sidebarLinuxServer()
    },
    ,*/
}
