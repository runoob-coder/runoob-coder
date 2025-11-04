---
titleTemplate: 相关文章 | Composer中文文档 - PHP 的依赖管理器 | PHP | noob-coder | 菜鸟码农
head:
  - - meta
    - name: keywords
      content: bin-dir,COMPOSER_BIN_DIR,.bat,COMPOSER_RUNTIME_BIN_DIR,composer_bin_dir,composer-runtime-api,composer_autoload_path,composer install,代理文件,Windows/WSL,vendor,二进制文件,bin,composer.json,命令行脚本,构建,编译脚本,供应商二进制文件,composer.json,bin,供应商二进制文件,vendor/bin,Composer,依赖管理器,PHP,libraries,dependency,noob-coder,菜鸟码农
  - - meta
    - name: description
      content: 暴露包中的命令行脚本
---

# 供应商二进制文件和 `vendor/bin` 目录

## 什么是供应商二进制文件？

任何 Composer 包希望传递给安装该包的用户的命令行脚本都应该被列为供应商二进制文件。

如果一个包包含其他不需要包用户使用的脚本（如构建或编译脚本），这些代码不应列为供应商二进制文件。

## 如何定义？

通过在项目的 `composer.json` 中添加 `bin` 键来定义。它被指定为文件数组，因此可以为任何给定项目添加多个二进制文件。

```json
{
    "bin": ["bin/my-script", "bin/my-other-script"]
}
```

## 在 composer.json 中定义供应商二进制文件的作用是什么？

它指示 Composer 将包的二进制文件安装到 `vendor/bin` 目录中，适用于任何**依赖**于该项目的项目。

这是一种便捷的方式，可以暴露那些否则会被隐藏在 `vendor/` 目录深处的有用脚本。

## 当对定义了供应商二进制文件的 composer.json 运行 Composer 时会发生什么？

对于包直接定义的二进制文件，不会发生任何事情。

## 当对具有列出供应商二进制文件依赖项的 composer.json 运行 Composer 时会发生什么？

Composer 会查找所有依赖项中定义的二进制文件。从每个依赖项的二进制文件创建一个代理文件（在 Windows/WSL 上是两个）到 `vendor/bin`。

假设包 `my-vendor/project-a` 的二进制文件设置如下：

```json
{
    "name": "my-vendor/project-a",
    "bin": ["bin/project-a-bin"]
}
```


对此 `composer.json` 运行 `composer install` 不会对 `bin/project-a-bin` 做任何处理。

假设项目 `my-vendor/project-b` 的依赖设置如下：

```json
{
    "name": "my-vendor/project-b",
    "require": {
        "my-vendor/project-a": "*"
    }
}
```

对此 `composer.json` 运行 `composer install` 会查看 project-a 的所有二进制文件并将它们安装到 `vendor/bin`。

在这种情况下，Composer 会将 `vendor/my-vendor/project-a/bin/project-a-bin` 作为 `vendor/bin/project-a-bin` 提供使用。

## 从二进制文件中查找 Composer 自动加载器 {#finding-the-composer-autoloader-from-a-binary}

从 Composer 2.2 版本开始，bin 代理文件定义了一个新的 `$_composer_autoload_path` 全局变量，这样当你的二进制文件被执行时，它可以使用这个变量轻松定位项目的自动加载器。

但是，当运行由根包自身定义的二进制文件时，这个全局变量将不可用，因此你需要设置一个备用方案。

例如，可以这样写：

```php
<?php

include $_composer_autoload_path ?? __DIR__ . '/../vendor/autoload.php';
```

如果你想在包中依赖此功能，应该同时要求 `"composer-runtime-api": "^2.2"`，以确保包能够使用支持该功能的 Composer 版本进行安装。

## 从二进制文件中查找 Composer bin 目录 {#finding-the-composer-bin-dir-from-a-binary}

从 Composer 2.2.2 版本开始，bin 代理文件定义了一个新的 `$_composer_bin_dir` 全局变量，这样当你的二进制文件被执行时，它可以使用这个变量轻松定位项目的 Composer bin 目录。

对于非 PHP 二进制文件，从 Composer 2.2.6 版本开始，bin 代理会设置一个 `COMPOSER_RUNTIME_BIN_DIR` 环境变量。

但是，当运行由根包自身定义的二进制文件时，这个全局变量将不可用，因此你需要设置一个备用方案。

例如，可以这样写：

```php
<?php

$binDir = $_composer_bin_dir ?? __DIR__ . '/../vendor/bin';
```

```php
#!/bin/bash

if [[ -z "$COMPOSER_RUNTIME_BIN_DIR" ]]; then
  BIN_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
else
  BIN_DIR="$COMPOSER_RUNTIME_BIN_DIR"
fi
```

如果你想在包中依赖此功能，应该同时要求 `"composer-runtime-api": "^2.2.2"`，以确保包能够使用支持该功能的 Composer 版本进行安装。

## Windows 和 .bat 文件怎么办？

完全由 Composer 管理的包不需要包含任何用于 Windows 兼容性的 `.bat` 文件。Composer 在 Windows 环境中运行时会以特殊方式处理二进制文件的安装：

- 自动生成一个 `.bat` 文件来引用二进制文件；
- 同时生成一个与二进制文件同名的 Unix 风格代理文件，这对 WSL、Linux 虚拟机等环境很有用。

需要支持可能不包含 Composer 的工作流程的包可以维护自定义的 `.bat` 文件。在这种情况下，包不应该将 `.bat` 文件列为二进制文件，因为它是不需要的。

## 供应商二进制文件能否安装到 `vendor/bin` 以外的其他位置？

是的，有两种方式可以指定替代的供应商二进制文件位置：

1. 在 `composer.json` 中设置 `bin-dir` 配置选项
2. 设置环境变量 `COMPOSER_BIN_DIR`

前者的示例如下：

```json
{
    "config": {
        "bin-dir": "scripts"
    }
}
```

对此 `composer.json` 运行 `composer install` 将导致所有供应商二进制文件被安装到 `scripts/` 而不是 `vendor/bin/`。

你可以将 `bin-dir` 设置为 `./` 来将二进制文件放在项目根目录中。
