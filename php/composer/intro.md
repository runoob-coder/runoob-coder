---
titleTemplate: Composer中文文档 - PHP 的依赖管理器 | PHP | noob-coder | 菜鸟码农
head:
  - - meta
    - name: keywords
      content: Packagist,Docker,PHAR,Git,gzip,bundler,npm,vendor,依赖管理,Composer,PHP,libraries,dependency,noob-coder,菜鸟码农
---

# 介绍 {#introduction}

`Composer` 是 `PHP` 的依赖管理工具。它允许你声明项目所依赖的库，并且会为你管理（安装/更新）这些库。

## 依赖管理 {#dependency-management}

Composer **不是**像 `Yum` 或 `Apt` 那样的包管理器。是的，它处理"包"或库，但它在每个项目的基础上进行管理，在你项目的某个目录中（例如 `vendor`）进行安装。默认情况下，它不会全局安装任何东西。因此，它只是一个依赖管理器。不过，为了方便起见，它支持通过 [global](cli.md#global) 命令管理“全局”项目。

这个想法并不新鲜，Composer 深受 node 的 [npm](https://www.npmjs.com/)  和 ruby 的 [bundler](https://bundler.io/) 的启发。

假设：

1. 你有一个项目依赖于许多库。
2. 其中一些库依赖于其他库。

Composer:

1. 使你能够声明所依赖的库。
2. 找出哪些版本的包可以并且需要被安装，并进行安装（即将它们下载到你的项目中）。
3. 你可以通过一个命令更新所有的依赖。

有关声明依赖的更多详细信息，请参见 [基本用法](basic-usage.md) 章节。

## 系统要求 {#system-requirements}

`Composer` 的最新版本需要 `PHP 7.2.5` 才能运行。长期支持版本（`2.2.x`）仍然为 `PHP 5.3.2+` 提供支持，以防您使用旧版 PHP 版本。还需要一些敏感的 PHP 设置和编译标志，但在使用安装程序时，您会被警告任何不兼容的情况。

`Composer` 需要以下几个应用程序才能正常工作，从而使处理包依赖的过程更加高效。对于解压文件，Composer 依赖于 `7z`（或 `7zz`）、`gzip`、`tar`、`unrar`、`unzip` 和 `xz` 等工具。至于版本控制系统，Composer 与 `Fossil`、`Git`、`Mercurial`、`Perforce` 和 `Subversion` 无缝集成，从而确保应用程序的平稳运行和库仓库的管理。在使用 Composer 之前，请确保这些依赖项已正确安装在您的系统上。

Composer 是跨平台的，我们努力使其在 `Windows`、`Linux` 和 `macOS` 上同样良好地运行。

## 安装 - Linux / Unix / macOS {#installation-linux-unix-macos}

### 下载 Composer 可执行文件 {#downloading-the-composer-executable}

`Composer` 提供了一个便捷的安装程序，您可以直接从命令行执行。如果您想了解更多关于安装程序内部工作原理的信息，可以随意 [下载此文件](https://getcomposer.org/installer) 或在 [GitHub](https://github.com/composer/getcomposer.org/blob/main/web/installer) 上查看。源代码是纯 `PHP`。

简而言之，有两种方式安装 Composer：一是作为项目的一部分本地安装，或者作为系统范围的全局可执行文件安装。

#### 本地安装 {#locally}

要在本地安装 Composer，请在您的项目目录中运行安装程序。请参阅 [下载页面](https://getcomposer.org/download/) 获取相关说明。

安装程序将检查一些 PHP 设置，然后将 `composer.phar` 下载到您的工作目录。这个文件就是 `Composer` 的二进制文件。它是一个 `PHAR`（PHP 归档文件），这是一种 PHP 的归档格式，可以在命令行等环境中运行。

现在可以运行 `php composer.phar` 来启动 `Composer`。

您可以通过使用 `--install-dir` 选项将 `Composer` 安装到特定目录，还可以使用 `--filename` 选项对其进行重命名。当按照 [下载页面说明](https://getcomposer.org/download/) 运行安装程序时，请添加以下参数：

```shell
php composer-setup.php --install-dir=bin --filename=composer
```

现在可以运行 `php bin/composer` 来启动 `Composer` 了。

#### 全局安装 {#globally}

你可以将 `Composer PHAR` 文件放置在任何你想放的位置。如果你将其放在属于你的 `PATH` 环境变量的目录中，你就可以全局访问它。在 `Unix` 系统上，你甚至可以使其可执行，而无需直接使用 php 解释器来调用它。

按照 [下载页面说明](https://getcomposer.org/download/) 运行安装程序后，你可以执行以下命令将 `composer.phar` 移动到你路径中的目录：

```shell
mv composer.phar /usr/local/bin/composer
```

如果你希望仅为你的用户安装并避免需要 `root` 权限，你可以使用 `~/.local/bin` 目录，该目录在某些 `Linux` 发行版中默认可用。

> [!NOTE] 注意 
> 如果上述操作因权限问题失败，你可能需要加上 `sudo` 并再次运行。

> [!NOTE] 注意 
> 在某些版本的 `macOS` 中，`/usr` 目录默认不存在。如果你收到错误提示 "/usr/local/bin/composer: No such file or directory"，那么你必须在执行上述命令之前手动创建该目录：`mkdir -p /usr/local/bin`。

> [!NOTE] 注意 
> 有关更改 `PATH` 的信息，请阅读 [Wikipedia 文章](https://en.wikipedia.org/wiki/PATH_(variable))  或自行去百度谷歌一下。

现在可以运行 `composer` 命令来启动 Composer，而不是 `php composer.phar`。

## 安装 - Windows {#installation-windows}

### 使用安装程序 {#using-the-installer}

这是在你的设备上安装 `Composer` 最简单的方法。

下载并运行 [Composer-Setup.exe](https://getcomposer.org/Composer-Setup.exe)。它将安装最新版本的 `Composer` 并设置你的 `PATH` 环境变量，这样你就可以在任何目录中使用命令行调用 `composer` 命令。

> [!NOTE] 注意
> **关闭你当前的终端。使用新终端测试**：这一点很重要，因为只有在终端启动时才会重载 `PATH` 环境变量。

### 手动安装 {#manual-installation}

切换到你 `PATH` 环境变量中的一个目录，然后按照 [下载页面说明](https://getcomposer.org/download/) 运行安装程序来下载 `composer.phar` 文件。

在 `composer.phar` 文件旁边创建一个新的 `composer.bat` 文件：


使用 `cmd.exe` 方式：

```shell
C:\bin> echo @php "%~dp0composer.phar" %*>composer.bat
```

使用 `PowerShell` 方式:

```shell
PS C:\bin> Set-Content composer.bat '@php "%~dp0composer.phar" %*'
```

如果目录尚未在你的 `PATH` 环境变量中，请将其添加进去。有关更改 `PATH` 环境变量的信息，请参阅 [这篇文章](https://www.computerhope.com/issues/ch000549.htm) 或使用你选择的搜索引擎。

关闭你当前的终端，使用新终端测试：

```shell
C:\Users\username>composer -V
```
```text
Composer version 2.4.0 2022-08-16 16:10:48
```

## Docker 镜像 {#docker-image}

`Composer` 以 `Docker` 容器的形式发布在几个地方，详情请参见 [composer/docker README](https://github.com/composer/docker) 中的列表。

使用示例：

```shell
docker pull composer/composer
docker run --rm -it -v "$(pwd):/app" composer/composer install
```

要将 `Composer` 添加到现有的 **`Dockerfile`** 中，你可以直接从预构建的小体积镜像中复制二进制文件：

```Dockerfile
# 最新版本
COPY --from=composer/composer:latest-bin /composer /usr/bin/composer

# 特定版本
COPY --from=composer/composer:2-bin /composer /usr/bin/composer
```

更多使用信息请阅读 [镜像说明](https://hub.docker.com/r/composer/composer)。

> [!NOTE] 注意
> Docker 相关的问题应该提交到 [composer/docker](https://github.com/composer/docker/issues) 仓库。

> [!NOTE] 注意
> 
> 你也可以使用 `composer` 而不是 composer/composer 作为上述镜像名称。它名称更短并且是 `Docker` 官方镜像，但不是由我们直接发布的，因此通常会在几天后才收到新版本。
> 
> **重点**：短别名镜像没有仅二进制文件的版本，所以对于 `COPY --from` 方式，最好使用 `composer/composer` 镜像。


## 使用 Composer {#using-composer}

现在你已经安装了 `Composer`，可以开始使用它了！前往[下一章节](basic-usage.md)查看简短的演示。

