import DefaultTheme from "vitepress/theme"

/**
 * 考研数学公式
 * 速查速记掌中宝
 */
export function kaoYanPamphlet(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: '前言',
            link: 'preface',
        },
        {
            text: '高等数学',
            collapsed: true,
            base: '/math/kaoyan-pamphlet/高等数学/',
            items: [
                {
                    text: '第一章 函数、极限、连续',
                    base: '/math/kaoyan-pamphlet/高等数学/第一章 函数、极限、连续/',
                    collapsed: true,
                    items: [
                        {
                            text: '一、函数',
                            link: '一、函数'
                        },
                        {
                            text: '二、极限',
                            link: '二、极限',
                        },
                        {
                            text: '三、函数的连续与间断',
                            link: '三、函数的连续与间断',
                        },
                    ]
                },
                {
                    text: '第二章 一元函数微分学',
                    base: '/math/kaoyan-pamphlet/高等数学/第二章 一元函数微分学/',
                    collapsed: true,
                    items: [
                        {
                            text: '一、导数与微分',
                            link: '一、导数与微分',
                        },
                        {
                            text: '二、中值定理',
                            link: '二、中值定理'
                        },
                        {
                            text: '三、洛必达法则',
                            link: '三、洛必达法则'
                        },
                        {
                            text: '四、导数的应用',
                            link: '四、导数的应用'
                        },
                    ]
                },
                {
                    text: '第三章 一元函数积分学',
                    base: '/math/kaoyan-pamphlet/高等数学/第三章 一元函数积分学/',
                    collapsed: true,
                    items: [
                        {
                            text: '一、不定积分',
                            link: '一、不定积分'
                        },
                        {
                            text: '二、定积分',
                            link: '二、定积分'
                        },
                        {
                            text: '三、不定积分与定积分的关系',
                            link: '三、不定积分与定积分的关系'
                        },
                        {
                            text: '四、不定积分与定积分的计算',
                            link: '四、不定积分与定积分的计算'
                        },
                        {
                            text: '五、反常积分及其计算',
                            link: '五、反常积分及其计算'
                        }
                    ],
                },
                {
                    text: '第四章 向量代数与空间解析几个[数学一]',
                    link: '',
                },
                {
                    text: '第五章 多元函数微分学',
                    link: '',
                },
                {
                    text: '第六章 多元函数积分学',
                    link: '',
                },
                {
                    text: '第七章 无穷级数[数学一、数学三]',
                    link: '',
                },
                {
                    text: '第八章 常微分方程与差分方程',
                    link: '',
                },
            ]
        },
        {
            text: '线性代数',
            collapsed: true,
            base: '/math/kaoyan-pamphlet/线性代数/',
            items: [
                {
                    text: '第一章 行列式',
                    base: '/math/kaoyan-pamphlet/线性代数/第一章 行列式/',
                    collapsed: true,
                    items: [
                        {
                            text: '一、排列',
                            link: '一、排列',
                        },
                        {
                            text: '二、n阶行列式的定义',
                            link: '二、n阶行列式的定义',
                        },
                        {
                            text: '三、行列式的性质',
                            link: '三、行列式的性质',
                        },
                        {
                            text: '四、行列式按行（列）展开',
                            link: '四、行列式按行（列）展开',
                        }
                    ]
                },
                {
                    text: '第二章 矩阵',
                    base: '/math/kaoyan-pamphlet/线性代数/第二章 矩阵/',
                    collapsed: true,
                    items: [
                        {
                            text: '一、矩阵的概念及运算',
                            link: '一、矩阵的概念及运算',
                        },
                        {
                            text: '二、可逆矩阵与伴随矩阵',
                            link: '二、可逆矩阵与伴随矩阵',
                        },
                        {
                            text: '三、初等变换、初等矩阵',
                            link: '三、初等变换、初等矩阵',
                        },
                        {
                            text: '四、矩阵的秩',
                            link: '四、矩阵的秩',
                        },
                        {
                            text: '五、分块矩阵',
                            link: '五、分块矩阵',
                        }
                    ]
                },
                {
                    text: '第三章 向量',
                    base: '/math/kaoyan-pamphlet/线性代数/第三章 向量/',
                    collapsed: true,
                    items: [
                        {
                            text: '一、向量组及其线性组合',
                            link: '一、向量组及其线性组合',
                        },
                        {
                            text: '二、向量组的线性相关性',
                            link: '二、向量组的线性相关性',
                        },
                        {
                            text: '三、极大线性无关组、秩',
                            link: '三、极大线性无关组、秩',
                        },
                        {
                            text: '四、向量的内积、长度及正交性',
                            link: '四、向量的内积、长度及正交性',
                        },
                        {
                            text: '五、向量空间［数学一］',
                            link: '五、向量空间',
                        }
                    ]
                },
                {
                    text: '第四章 线性方程组',
                    base: '/math/kaoyan-pamphlet/线性代数/第四章 线性方程组/',
                    collapsed: true,
                    items: [
                        {
                            text: '一、线性方程组的概念',
                            link: '一、线性方程组的概念',
                        },
                        {
                            text: '二、克拉默法则',
                            link: '二、克拉默法则',
                        },
                        {
                            text: '三、齐次线性方程组',
                            link: '三、齐次线性方程组',
                        },
                        {
                            text: '四、非齐次线性方程组',
                            link: '四、非齐次线性方程组',
                        }
                    ]
                },
                {
                    text: '第五章 矩阵的特征值、特征向量、相似矩阵',
                    base: '/math/kaoyan-pamphlet/线性代数/第五章 矩阵的特征值、特征向量、相似矩阵/',
                    collapsed: true,
                    items: [
                        {
                            text: '一、特征值、特征向量',
                            link: '一、特征值、特征向量',
                        },
                        {
                            text: '二、相似矩阵',
                            link: '二、相似矩阵',
                        },
                        {
                            text: '三、矩阵的相似对角化',
                            link: '三、矩阵的相似对角化',
                        },
                        {
                            text: '四、（实）对称矩阵的对角化',
                            link: '四、（实）对称矩阵的对角化'
                        }
                    ]
                },
                {
                    text: '第六章 二次型',
                    base: '/math/kaoyan-pamphlet/线性代数/第六章 二次型/',
                    collapsed: true,
                    items: [
                        {
                            text: '一、二次型的概念、矩阵表示',
                            link: '一、二次型的概念、矩阵表示'
                        },
                        {
                            text: '二、化二次型为标准形、规范形',
                            link: '二、化二次型为标准形、规范形',
                        },
                        {
                            text: '三、正定二次型、正定矩阵',
                            link: '三、正定二次型、正定矩阵',
                        },
                    ],

                }

            ]
        },
        {
            text: '概率论与数理统计',
            collapsed: true,
            base: '/math/kaoyan-pamphlet/概率论与数理统计/',
            items: [
                {
                    text: '第一章 随机事件和概率',
                    base: '/math/kaoyan-pamphlet/概率论与数理统计/第一章 随机事件和概率/',
                    collapsed: true,
                    items: [
                        {
                            text: '一、事件、样本空间、事件间的关系与运算',
                            link: '一、事件、样本空间、事件间的关系与运算'
                        },
                        {
                            text: '二、概率与条件概率',
                            link: '二、概率与条件概率'
                        },
                        {
                            text: '三、古典型概率与几何型概率',
                            link: '三、古典型概率与几何型概率'
                        },
                        {
                            text: '四、五大公式',
                            link: '四、五大公式'
                        },
                        {
                            text: '五、事件独立性',
                            link: '五、事件独立性'
                        }
                    ]
                },
                {
                    text: '第二章 随机变量及其概率分布',
                    base: '/math/kaoyan-pamphlet/概率论与数理统计/第二章 随机变量及其概率分布/',
                    collapsed: true,
                    items: [
                        {
                            text: '一、随机变量及其分布函数',
                            link: '一、随机变量及其分布函数'
                        },
                        {
                            text: '二、离散型随机变量和连续型随机变量',
                            link: '二、离散型随机变量和连续型随机变量'
                        },
                        {
                            text: '三、随机变量的函数的分布',
                            link: '三、随机变量的函数的分布'
                        }
                    ]
                },
                {
                    text: '第三章 多维随机变量及其分布',
                    base: '/math/kaoyan-pamphlet/概率论与数理统计/第三章 多维随机变量及其分布/',
                    collapsed: true,
                    items: [
                        {
                            text: '一、二维随机变量及其分布',
                            link: '一、二维随机变量及其分布'
                        },
                        {
                            text: '二、二维离散型随机变量的概率分布、边缘分布和条件分布',
                            link: '二、二维离散型随机变量的概率分布、边缘分布和条件分布'
                        },
                        {
                            text: '三、二维连续型随机变量的概率密度、边缘分布和条件分布',
                            link: '三、二维连续型随机变量的概率密度、边缘分布和条件分布'
                        },
                        {
                            text: '四、随机变量的独立性',
                            link: '四、随机变量的独立性'
                        },
                        {
                            text: '五、两个重要的二维分布',
                            link: '五、两个重要的二维分布'
                        },
                        {
                            text: '六、两个随机变量的函数的分布',
                            link: '六、两个随机变量的函数的分布'
                        }
                    ]
                },
                {
                    text: '第四章 随机变量的数字特征',
                    base: '/math/kaoyan-pamphlet/概率论与数理统计/第四章 随机变量的数字特征/',
                    collapsed: true,
                    items: [
                        {
                            text: '一、随机变量的数学期望和方差',
                            link: '一、随机变量的数学期望和方差'
                        },
                        {
                            text: '二、矩、协方差和相关系数',
                            link: '二、矩、协方差和相关系数',
                        }
                    ],
                },
                {
                    text: '第五章 大数定律和中心极限定理',
                    base: '/math/kaoyan-pamphlet/概率论与数理统计/第五章 大数定律和中心极限定理/',
                    collapsed: true,
                    items: [
                        {
                            text: '一、切比雪夫不等式',
                            link: '一、切比雪夫不等式'
                        },
                        {
                            text: '二、大数定律',
                            link: '二、大数定律',
                        }
                    ],
                },
            ]
        }
    ]
}
