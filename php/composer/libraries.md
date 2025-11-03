---
titleTemplate: Composer中文文档 - PHP 的依赖管理器 | PHP | noob-coder | 菜鸟码农
head:
  - - meta
    - name: description
      content: 本章节将告诉你如何通过 Composer 来安装你的库。
  - - meta
    - name: keywords
      content: gitignore,composer.lock,lock-file,VCS,git,require,Packagist,Composer,PHP,libraries,dependency,noob-coder,菜鸟码农
---

# 库（资源包） {#libraries}

本章节将告诉你如何通过 Composer 来安装你的库。

## 每个项目都是一个包

一旦你在某个目录下拥有一个 `composer.json` 文件，该目录就成为一个包。当你在项目中添加一个 [`require`](schema.md#require) 时，你正在创建一个依赖于其他包的包。你的项目和库之间的唯一区别是你的项目是一个没有名称的包。

为了使该包可以安装，你需要给它一个名称。你可以通过在 `composer.json` 中添加 [`name`](schema.md#name) 属性来实现：

```json
{
    "name": "acme/hello-world",
    "require": {
        "monolog/monolog": "1.0.*"
    }
}
```

> [!NOTE] 注意
> 如果你不知道使用什么作为供应商名称，你的 GitHub 用户名通常是个不错的选择。包名必须是小写的，约定使用破折号进行单词分隔。
> 
> 比如 `noob-coder` 。

## 库的版本管理

在绝大多数情况下，你会使用某种版本控制系统（如 git、svn、hg 或 fossil）来维护你的库。在这种情况下，Composer 会从你的 VCS 中推断版本，你**不应该**在 `composer.json` 文件中指定版本。（参见 [版本文章](articles/versions.md) 了解 Composer 如何使用 VCS 分支和标签来解析版本约束。）

如果你是手动维护包（即不使用 VCS），你需要通过在 `composer.json` 文件中添加 `version` 值来显式指定版本：

```json
{
    "version": "1.0.0"
}
```

> [!NOTE] 注意
> 当你向 VCS 添加硬编码版本时，该版本会与标签名称冲突。Composer 将无法确定版本号。

### VCS 版本管理

Composer 会使用你的 VCS（版本控制系统）的分支和标签功能，将你在 [`require`](schema.md#require) 字段中指定的版本约束解析为特定的文件集合。在确定有效可用的版本时，Composer 会查看你的所有标签和分支，并将它们的名称转换为内部选项列表，然后与你提供的版本约束进行匹配。

有关 Composer 如何处理标签和分支以及如何解析包版本约束的更多信息，请阅读 [版本](articles/versions.md) 文章。

## Lock 文件 {#lock-file}

对于你的库/包（项目），如果你愿意，可以提交 `composer.lock` 文件。这可以帮助你的团队始终针对相同的依赖版本进行测试。但是，这个 lock 文件不会对依赖于它的其他项目产生任何影响。它只对主项目有效。

如果你不想提交 lock 文件，并且你使用的是 git，请将其添加到 `.gitignore` 中。

## 发布到 VCS

一旦你拥有一个包含 `composer.json` 文件的 VCS 仓库（版本控制系统，例如 git），你的库就已经可以使用 Composer 安装了。在本示例中，我们将会把 `acme/hello-world` 库发布到 GitHub 上，其地址为 `github.com/username/hello-world`。

接下来，我们通过创建一个本地测试项目来验证 `acme/hello-world` 包的安装。我们将这个项目命名为 `acme/blog`，它将依赖 `acme/hello-world` 包，而 `acme/hello-world` 又依赖于 `monolog/monolog`。我们可以在任意位置创建一个名为 `blog` 的新目录，并在其中添加一个 `composer.json` 配置文件：

```json
{
    "name": "acme/blog",
    "require": {
        "acme/hello-world": "dev-master"
    }
}
```

在本示例中可以不需要设置名称，因为我们不想将博客发布为库。这里添加名称只是为了明确正在描述哪个 `composer.json` 文件。

现在我们需要告诉博客应用程序在哪里找到 `hello-world` 依赖项。我们通过在博客的 `composer.json` 中添加包仓库属性来实现：

```json
{
    "name": "acme/blog",
    "repositories": [
        {
            "type": "vcs",
            "url": "https://github.com/username/hello-world"
        }
    ],
    "require": {
        "acme/hello-world": "dev-master"
    }
}
```

有关包仓库如何工作以及可用的其他类型详情，请参见 [Repositories](repositories.md)。

就是这样。你现在可以通过运行 Composer 的 [`install`](cli.md#install-i) 命令来安装依赖项了！

> [!IMPORTANT] 回顾
> 任何包含 `composer.json` 的 git/svn/hg/fossil 仓库都可以通过指定包仓库并在 require 字段中声明依赖项来添加到你的项目中。

## 发布到 Packagist

好了，现在你可以发布包了。但是每次都要指定 VCS 仓库很麻烦。你不想强迫所有用户都这样做。

你可能注意到的另一件事是我们并没有为 `monolog/monolog` 指定包仓库。这是怎么实现的呢？答案是 Packagist。

[Packagist](https://packagist.org/) 是 Composer 的主要包仓库，默认情况下是启用的。任何在 Packagist 上发布的包都可以通过 Composer 自动获取。由于 [Monolog 在 Packagist 上](https://packagist.org/packages/monolog/monolog)，我们可以依赖它而无需指定任何额外的仓库。

如果我们要与世界分享 `hello-world`，我们也会将其发布到 Packagist 上。

你可以访问 [Packagist](https://packagist.org) 并点击 "Submit" 提交按钮。如果还没有账户，系统会提示你注册，然后允许你提交你的 VCS 仓库 URL，此时 Packagist 将开始爬取它。一旦完成，任何人都可以使用你发布的包！ 🎉

## 轻量级分发包

一些无用的信息，如 `.github` 目录，或者大的示例、测试数据等，通常不应该包含在分发包中。

`.gitattributes` 文件是一个 git 特定文件，类似于 `.gitignore`，也位于你的库的根目录中。当该文件存在且被 Git 跟踪时，它会覆盖本地和全局配置（分别为 `.git/config` 和 `~/.gitconfig`）。

使用 `.gitattributes` 来防止不需要的文件膨胀 zip 分发包。

```text
// .gitattributes
/demo export-ignore
phpunit.xml.dist export-ignore
/.github/ export-ignore
```

通过手动检查生成的 zip 文件来测试：

```shell
git archive branchName --format zip -o file.zip
```

> [!NOTE] 注意
> 文件仍然会被 git 跟踪，只是不会包含在 zip 分发包中。这仅适用于从 GitHub、GitLab 或 Bitbucket 的 dist（即标记版本）安装的包。
