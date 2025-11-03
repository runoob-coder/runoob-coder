---
titleTemplate: 相关文章 | Composer中文文档 - PHP 的依赖管理器 | PHP | noob-coder | 菜鸟码农
head:
  - - meta
    - name: keywords
      content: branch-alias,内联别名依赖,分支别名,bugfix,dev-bugfix,dev-main,aliases,别名,Composer,依赖管理器,PHP,libraries,dependency,noob-coder,菜鸟码农
  - - meta
    - name: description
      content: 将分支名称别名为版本号
---

# 别名

将分支名称别名为版本号

## 为什么需要别名？

当你使用 VCS 仓库时，只有看起来像版本号的分支才能获得可比较的版本，比如 `2.0` 或 `2.0.x`。对于你的 `main` 分支，你会得到一个
`dev-main` 版本。对于你的 `bugfix` 分支，你会得到一个 `dev-bugfix` 版本。

如果你的 `main` 分支用于标记 `1.0` 开发线的发布版本，即 `1.0.1`、`1.0.2`、`1.0.3` 等，任何依赖它的包可能都需要 `1.0.*` 版本。

如果有人想要依赖最新的 `dev-main`，他们会遇到问题：其他包可能需要 `1.0.*`，所以依赖这个开发版本会导致冲突，因为 `dev-main`
不匹配 `1.0.*` 约束。

这时就需要别名来解决。

## 分支别名

`dev-main` 分支是你的主 VCS 仓库中的一个分支。通常情况下，有人会想要获取最新的主开发版本。因此，Composer 允许你将 `dev-main`
分支别名为 `1.0.x-dev` 版本。这是通过在 `composer.json` 文件中的 `extra` 字段下指定 `branch-alias` 来实现的：

```json
{
  "extra": {
    "branch-alias": {
      "dev-main": "1.0.x-dev"
    }
  }
}
```

如果你要为不可比较的版本（如 `dev-develop`）设置别名，`dev-` 必须作为分支名称的前缀。你也可以为可比较的版本（即以数字开头，以
`.x-dev` 结尾）设置别名，但只能设置为更具体的版本。例如，`1.x` 或 `1.x-dev` 分支可以从 `1.x-dev` 别名为 `1.2.x-dev`，因为后者更具体。

别名必须是一个可比较的开发版本（例如，你不能将 `dev-main` 别名为 `dev-master`），并且 `branch-alias` 必须存在于它所引用的分支上。要为
`dev-main` 设置别名，你需要在 `main` 分支上定义并提交它。

因此，现在任何人都可以依赖 `1.0.*`，Composer 会愉快地安装 `dev-main`。

要使用分支别名，你必须拥有被别名包的仓库。如果你想为第三方包设置别名而不维护它的 fork，可以使用下面描述的内联别名。

## 内联别名依赖

分支别名非常适合为主开发线设置别名。但是要使用它们，你需要对源代码仓库有控制权，并且需要将更改提交到版本控制系统中。

当你想要尝试某个作为本地项目依赖的库的bug修复时，这并不是一件很有趣的事。

因此，你可以在 `require` 和 `require-dev` 字段中为包设置别名。假设你在 `monolog/monolog` 包中发现了一个bug。你在 GitHub
上克隆了 [Monolog](https://github.com/Seldaek/monolog)，并在名为 `bugfix` 的分支中修复了这个问题。现在你想在本地项目中安装这个版本的
monolog。

你正在使用需要 `monolog/monolog` 版本 `1.*` 的 `symfony/monolog-bundle`。所以你的 `dev-bugfix` 需要匹配这个约束。

将以下内容添加到你项目的根目录 `composer.json` 中：

```json
{
  "repositories": [
    {
      "type": "vcs",
      "url": "https://github.com/you/monolog"
    }
  ],
  "require": {
    "symfony/monolog-bundle": "2.0",
    "monolog/monolog": "dev-bugfix as 1.0.x-dev"
  }
}
```

或者让 Composer 为你添加：

```shell
php composer.phar require "monolog/monolog:dev-bugfix as 1.0.x-dev"
```

这将从你的 GitHub 仓库获取 `monolog/monolog` 的 `dev-bugfix` 版本，并将其别名为 `1.0.x-dev`。

> [!NOTE] 注意
> 内联别名是仅限根项目的功能。如果需要一个带有内联别名的包，别名（`as` 右边的部分）将用作版本约束，`as` 左边的部分将被丢弃。
> 因此，如果 A 依赖 B，而 B 依赖 `monolog/monolog` 版本 `dev-bugfix as 1.0.x-dev`，安装 A 将使 B 依赖 `1.0.x-dev`
> ，这可能作为分支别名或实际的 `1.0` 分支存在。如果不存在，则必须在 A 的 `composer.json` 中再次进行内联别名设置。

> [!NOTE] 注意
> 应该避免使用内联别名，特别是对于已发布的包/库。如果你发现了 bug，尽量让你的修复合并到上游。这有助于避免包用户遇到问题。
