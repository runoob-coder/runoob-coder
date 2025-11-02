---
titleTemplate: 第一章 行列式 | 线性代数 | 考研数学公式速查速记掌中宝 | noob-coder | 菜鸟码农
head:
  - - meta
    - name: keywords
      content: 逆序数,n阶行列式的定义,排列,行列式,线性代数,高等数学,考研数学,考研数学公式速查速记掌中宝,数学一,数学二,数学三,11408,22408,noob-coder,菜鸟码农
---

# 二、n阶行列式的定义

$n$ 阶行列式

$$
D=
\begin{vmatrix}
a_{11} & a_{12} & \cdots & a_{1n} \\
a_{21} & a_{22} & \cdots & a_{2n} \\
\vdots & \vdots &   & \vdots \\
a_{n1} & a_{n2} & \cdots & a_{nn}
\end{vmatrix}
，
$$

所有取自不同行不同列的 $n$ 个元素乘积

$$ a_{1p_1} a_{2p_2} a_{np_n} $$

的代数和 $\sum(-1)^τa_{1p_1} a_{2p_2} a_{np_n}$，其中 $p_1,p_2,\cdots,p_n$ 为自然数 $1,2,\cdots,n$ 的一个排列，$τ$ 为这个排列的逆序数，称为 $n$ 阶行列式。

简记作 $det(a_{ij})$，即 $det(a_{ij}) = \sum(-1)^τa_{1p_1} a_{2p_2} a_{np_n}$ ，这里 $\sum$ 表示对所有 $n$ 阶排列求和。
