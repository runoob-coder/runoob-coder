---
titleTemplate: 相关文章 | Composer中文文档 - PHP 的依赖管理器 | PHP | noob-coder | 菜鸟码农
title: 解决合并冲突
head:
  - - meta
    - name: keywords
      content: 团队协作,Lock file errors,git 历史,Semantic Versioning 2.0.0,composer update,semver,语义化版本控制,版本约束,balbuf/composer-git-merge-driver,git 自动化解决合并冲突,git,composer validate,解决合并冲突,composer.lock,composer.json,Composer,依赖管理器,PHP,libraries,dependency,noob-coder,菜鸟码农
  - - meta
    - name: description
      content: 在合并时优雅地解决冲突。
---

在合并时优雅地解决冲突。

## 解决合并冲突

当作为团队在同一个 Composer 项目上工作时，你最终会遇到这样的情况：多个人在多个分支中对 `composer.json` 和 `composer.lock` 文件进行了添加、更新或删除操作。当这些分支最终合并在一起时，就会出现合并冲突。解决这些合并冲突不像其他文件那样直接，特别是对于 `composer.lock` 文件。

> [!NOTE] 注意
> 文本合并为什么不能用于锁文件可能不是立即显而易见的，所以让我们想象以下例子，我们要合并两个分支；
>
> - 分支 1 添加了 A 包，它依赖 B 包。B 包锁定在版本 `1.0.0`。
> - 分支 2 添加了 C 包，它与 B 包的所有低于 `1.2.0` 的版本冲突。
>
> 基于文本的合并会导致 A 包版本 `1.0.0`，B 包版本 `1.0.0` 和 C 包版本 `1.0.0`。
> 这是一个无效的结果，因为没有考虑到 C 包的冲突，并且需要升级 B 包。

### 1. 重新应用更改

合并 Composer 文件最安全的方法是接受一个分支的版本并应用另一个分支的更改。

例如我们有两个分支的情况：

1. 添加了 'A' 包；
2. 删除了 'B' 包并添加了 'C' 包；

当我们合并这两个分支时解决冲突：

- 我们选择变化最多的那个分支，并接受来自该分支的 `composer.json` 和 `composer.lock` 文件。在这种情况下，我们选择分支 2 的 Composer 文件。
- 我们重新应用另一个分支（分支 1）的更改。在这种情况下我们必须再次运行 `composer require package/A`。

### 2. 验证合并后的文件

在提交之前，确保生成的 `composer.json` 和 `composer.lock` 文件有效。为此，运行以下命令：

```shell
php composer.phar validate
php composer.phar install [--dry-run]
```

### 使用 git 自动化解决合并冲突

通过使用自定义 git 合并驱动程序，*可以*在一定程度上改进 git 的冲突解决功能。

这方面的一个例子可以在 [balbuf 的 composer git 合并驱动程序](https://github.com/balbuf/composer-git-merge-driver) 中找到。

#### 处理简单情况

在少数情况下，只有 `content-hash` 会显示为冲突，因为版本控制系统可能能够干净地合并文件中的其余文本。这种情况通常发生在合并的两侧添加或更新了两个不同的包，且这些包没有重叠或冲突的依赖关系时。当这种情况发生时，运行 `composer update --lock` 可能就足以移除冲突标记并更新锁文件的哈希值。你也可以运行任何其他变体的 `composer update` 来移除冲突标记，并可能更新包。

### 重要注意事项

请记住，当锁定文件发生合并冲突时，关于某个分支中新包的确切版本信息将会丢失。当分支 1 中的 A 包被约束为 `^1.2.0` 并锁定为 `1.2.0` 时，如果使用分支 2 作为基线并执行新的 `composer require package/A:^1.2.0`，它可能会被更新，因为这将在可能的情况下使用约束允许的最新版本。现在可能已经有该包的 `1.3.0` 版本可用，将会使用这个版本代替。

选择正确的 [版本约束](../articles/versions.md) 并确保包遵循 [语义化版本控制](https://semver.org/lang/zh-CN/)，在使用 [下一个重要发布运算符](versions.md#next-significant-release-operators) 时应该能保证合并分支不会因意外更新依赖项而破坏任何东西。

## 从错误解决的合并冲突中恢复

如果未遵循上述步骤而进行了基于文本的合并，你的 Composer 项目可能会处于一种观察到意外行为的状态，因为 `composer.lock` 文件与 `composer.json` 文件未（完全）同步。

这里可能发生两件事：

1. `composer.json` 文件的 `require` 或 `require-dev` 部分中的包不在锁定文件中，因此从未安装；

   > **注意：** 从 Composer 2.5 版本开始，当运行 `install` 时，存在所需但未在 `composer.lock` 中的包会导致错误。

2. `composer.lock` 文件中的包不是任何所需包的直接或间接依赖项。结果是即使运行 `composer why vendor/package` 显示不需要该包，它仍然会被安装。

有几种方法可以修复这些问题：

### A. 从头开始

最简单但影响最大的选项是运行 `composer update` 从头开始解决恢复到正确状态。

这样做的缺点是以前锁定的包版本现在会被更新，因为之前包版本的信息已经丢失。如果你的所有依赖项都遵循 [语义化版本控制](https://semver.org/lang/zh-CN/) 并且你的 [版本约束](../articles/versions.md) 正在使用 [下一个重要发布运算符](versions.md#next-significant-release-operators)，这应该不是问题，否则你可能会无意中断开应用程序。

### B. 从 git 历史重建

在许多情况下可能不太可行但值得一提的选项：

可以通过回到 git 历史中找到最近有效的 `composer.lock` 文件，并从那里重新引入新依赖项来重建正确的包状态。

### C. 手动解决问题

有一种选项可以在不挖掘 git 历史或从头开始的情况下恢复 `composer.json` 和 `composer.lock` 文件之间的差异。为此，我们需要分别解决第 1 和第 2 个问题。

#### 1. 检测和修复缺失的必需包

要检测任何必需但未安装的包，你可以简单地运行：

```shell
php composer.phar validate
```

如果有必需但未安装的包，你应该得到类似以下的输出：

```shell
./composer.json is valid but your composer.lock has some errors
# Lock file errors
- Required package "vendor/package-name" is not present in the lock file.
This usually happens when composer files are incorrectly merged or the composer.json file is manually edited.
Read more about correctly resolving merge conflicts https://getcomposer.org/doc/articles/resolving-merge-conflicts.md
and prefer using the "require" command over editing the composer.json file directly https://getcomposer.org/doc/03-cli.md#require
```

要从中恢复，只需为这里列出的每个包运行 `composer update vendor/package-name`。在为这里列出的每个包执行此操作后，再次运行 `composer validate` 应该不会出现锁定文件错误：

```shell
./composer.json is valid
```

#### 2. 检测和修复多余的包

要检测和修复已锁定但不是直接/间接依赖项的包，你可以运行以下命令：

```shell
php composer.phar remove --unused
```

如果没有锁定非依赖项的包，该命令将有以下输出：

```shell
No unused packages to remove
```

如果有包需要清理，输出将如下所示：

```shell
vendor/package-name is not required in your composer.json and has not been removed
./composer.json has been updated
Running composer update vendor/package-name
Loading composer repositories with package information
Updating dependencies
Lock file operations: 0 installs, 0 updates, 1 removal
  - Removing vendor/package-name (1.0)
Writing lock file
Installing dependencies from lock file (including require-dev)
Nothing to install, update or remove
```
