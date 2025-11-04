---
titleTemplate: 常见问题 | Composer中文文档 - PHP 的依赖管理器 | PHP | noob-coder | 菜鸟码农
aside: false
head:
  - - meta
    - name: keywords
      content: 忽略目录,ZSH,Bash,.git,preferred-install,--prefer-dist,svn:ignore,.gitignore,依赖项,vendor目录,composer.json,vendor,Composer,依赖管理器,PHP,libraries,dependency,noob-coder,菜鸟码农
  - - meta
    - name: description
      content: 一般建议是不要提交。vendor 目录（或依赖项安装的任何位置）应该添加到 .gitignore/svn:ignore 等忽略文件中。最佳实践是让所有开发人员使用 Composer 来安装依赖项。同样，构建服务器、CI、部署工具等应该被调整为在项目引导过程中运行 Composer。
---

# 我应该提交 vendor 目录中的依赖项吗？

一般建议是**不要提交**。`vendor` 目录（或依赖项安装的任何位置）应该添加到 `.gitignore`/`svn:ignore` 等忽略配置中。

最佳实践是让所有开发人员使用 Composer 来安装依赖项。同样，构建服务器、CI、部署工具等应该被调整为在项目引导过程中运行 Composer。

虽然在某些环境中提交 vendor 目录可能很诱人，但这会导致一些问题：

- 更新代码时 VCS 仓库体积大且差异大；
- 在你自己的 VCS 中复制所有依赖项的历史记录副本；
- 将通过 git 安装的依赖项添加到 git 仓库中会将它们显示为子模块。这是有问题的，因为它们不是真正的子模块，你会遇到问题。

如果你真的觉得必须这样做，你有几个选择：

1. 限制自己只安装标记发行的版本（无开发版本），这样你只会得到压缩包安装，避免 git “子模块”的问题；
2. 使用 `--prefer-dist` 或在 [config](../schema.md#config) 中将 `preferred-install` 设置为 `dist`；
3. 在安装后删除每个依赖项的 `.git` 目录，然后你可以将它们添加到你的 git 仓库中。在 ZSH 中可以用 `rm -rf vendor/**/.git` 命令，在 Bash 中可以用 `find vendor/ -type d -name ".git" -exec rm -rf {} \;` 命令来实现。但这意味着你在运行 `composer update` 之前必须从磁盘上删除这些依赖项；
4. 添加一个 .gitignore 规则（`/vendor/**/.git`）来忽略所有 vendor `.git` 文件夹。这种方法不需要在运行 `composer update` 之前从磁盘上删除依赖项。
