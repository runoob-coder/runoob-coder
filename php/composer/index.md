---
layout: home
title: Composer中文文档 - PHP 的依赖管理器
titleTemplate: PHP | noob-coder | 菜鸟码农
head:
  - - meta
    - name: keywords
      content: Composer,PHP,libraries,dependency,noob-coder,菜鸟码农

hero:
  name: "Composer"
  text: "PHP 的依赖管理器"
  tagline: "它允许你声明项目所依赖的库，并且会为你管理（安装/更新）这些库。"
  image:
    src: /php/composer/logo.avif
    alt: Composer
  actions:
    - theme: brand
      text: 官网
      link: https://getcomposer.org/
    - theme: alt
      text: Github
      link: https://github.com/composer/composer
    - theme: brand
      text: Packagist
      link: https://packagist.org/
    - theme: alt
      text: 腾讯云 Composer 全量镜像
      link: https://mirrors.cloud.tencent.com/help/composer.html
features:
  - title: 介绍
    details: Composer 是 PHP 的依赖管理工具。它允许你声明项目所依赖的库，并且会为你管理（安装/更新）这些库。
    icon: 🚀
    link: ./intro
    linkText: 立即安装
  - title: 基本用法
    details: 在本章节的基本用法介绍中，我们将安装 monolog/monolog —— 一个日志记录库。如果你还没有安装 Composer，请参考 介绍 章节。
    icon: 📖
    link: ./basic-usage
    linkText: 入门使用
  - title: 库（资源包）
    details: 本章节将告诉你如何通过 Composer 来安装你的库。
    icon: 📦
    link: ./libraries
    linkText: 从创建到发布
  - title: 命令行
    details: 你已经学会了如何使用命令行界面来执行一些操作。本章将记录所有可用的命令。
    icon: 💻
    link: ./cli
    linkText: 查阅命令
  - title: 架构
    details: 本章将解释 composer.json 中所有可用的字段。
    icon: 📄
    link: ./schema
    linkText: 查看字段
  - title: 仓库
    details: 本章将解释包和仓库的概念，介绍可用的仓库类型以及它们的工作原理。
    icon: 🏪
    link: ./repositories
    linkText: 了解更多
  - title: 配置
    details: 本章节将描述 composer.json 架构 中的 config 部分。
    icon: ⚙️
    link: ./config
    linkText: 查看配置
  - title: 运行时
    details: 虽然 Composer 主要用于在你的项目中安装依赖项，但也有一些功能可以在运行时使用。
    icon: ⚡️
    link: ./runtime
    linkText: Runtime
  - title: 社区
    details: 已经有很多人在使用 Composer，其中不少人也在积极贡献。
    icon: 👥
    link: ./community
    linkText: 加入社区
---

## 相关文章

- [别名](./articles/aliases.md)
- [私有托管包和存储库的身份验证](./articles/authentication-for-private-packages.md)
- [优化自动加载器](./articles/autoloader-optimization.md)
- [Composer 平台依赖](./articles/composer-platform-dependencies.md)
- [设置和使用自定义安装器](./articles/custom-installers.md)
- [私有包处理](./articles/handling-private-packages.md)
- [插件](./articles/plugins.md)
- [仓库优先级](./articles/repository-priorities.md)
- [解决合并冲突](./articles/resolving-merge-conflicts.md)
- [脚本](./articles/scripts.md)
- [故障排除](./articles/troubleshooting.md) 
- [供应商二进制文件和 vendor/bin 目录](./articles/vendor-binaries.md)
- [版本与约束](./articles/versions.md)

## 常见问题

- [如何将包安装到框架的自定义路径？](./faqs/how-do-i-install-a-package-to-a-custom-path-for-my-framework.md)
- [如何以编程方式安装 Composer？](./faqs/how-to-install-composer-programmatically.md)
- [如何安全地安装不受信任的包？以超级用户或root身份运行Composer是否安全？](./faqs/how-to-install-untrusted-packages-safely.md)
- [如何在代理服务器后使用 Composer？](./faqs/how-to-use-composer-behind-a-proxy.md)
- [我应该提交 vendor 目录中的依赖项吗？](./faqs/should-i-commit-the-dependencies-in-my-vendor-directory.md)
- [Composer 本身使用哪种版本编号系统？](./faqs/which-version-numbering-system-does-composer-itself-use.md)
- [为什么无限制的版本约束是一个坏主意？](./faqs/why-are-unbound-version-constraints-a-bad-idea.md)
- [为什么组合使用比较运算符和通配符的版本约束是一个坏主意？](./faqs/why-are-version-constraints-combining-comparisons-and-wildcards-a-bad-idea.md)
- [为什么 Composer 不能递归加载仓库？](./faqs/why-cant-composer-load-repositories-recursively.md)
