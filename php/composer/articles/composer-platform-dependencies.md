---
titleTemplate: 相关文章 | Composer中文文档 - PHP 的依赖管理器 | PHP | noob-coder | 菜鸟码农
head:
  - - meta
    - name: keywords
      content: 自动加载器,runtime,plugins,composer-runtime-api,composer-plugin-api,lib-*,ext-*,php-debug,php-zts,php-ipv6,php-64bit,平台配置,replace,provide,conflict,require,Composer平台依赖,Composer,依赖管理器,PHP,libraries,dependency,noob-coder,菜鸟码农
  - - meta
    - name: description
      content: 让你的包依赖特定的 Composer 版本
---

# Composer 平台依赖

## 什么是平台依赖

Composer 将 Composer 运行环境的信息作为虚拟包提供。这允许其他包对平台的不同方面（如 PHP、扩展或系统库，包括版本约束）定义依赖关系（[require](../schema.md#require)、[conflict](../schema.md#conflict)、[provide](../schema.md#provide)、[replace](../schema.md#replace)）。

当你需要其中一个平台包时，不会安装任何代码。平台包的版本号来自 Composer 执行的环境，它们不能被更新或删除。但是，为了依赖关系解析的目的，可以通过[平台配置](../config.md#platform)覆盖它们。

**例如：** 如果你使用版本为 `7.4.42` 的 PHP 解释器执行 `composer update`，那么 Composer 会自动向可用包池中添加一个名为 `php` 的包，并为其分配版本 `7.4.42`。

这就是包如何添加对所使用 PHP 版本的依赖：

```json
{
    "require": {
        "php": ">=7.4"
    }
}
```

Composer 在运行 composer 命令时会根据当前使用的 PHP 版本检查此要求。

### 不同类型的平台包

存在以下几种类型的平台包，可以对其产生依赖：

1. PHP (`php` 及其子类型：`php-64bit`、`php-ipv6`、`php-zts`、`php-debug`)
2. PHP 扩展 (`ext-*`，例如 `ext-mbstring`)
3. PHP 库 (`lib-*`，例如 `lib-curl`)
4. Composer (`composer`、`composer-plugin-api`、`composer-runtime-api`)

要查看环境中可用的完整平台包列表，可以运行 `php composer.phar show --platform`（或简写为 `show -p`）。

本文档将进一步解释各种 Composer 平台包之间的差异。

## 插件包 `composer-plugin-api`

你可以通过[插件](plugins.md)包来修改 `Composer` 的行为。`Composer` 为插件提供了一组带版本的 API。由于 `Composer` 的内部变更可能**不会**改变插件 API，因此 API 版本不一定会随着 `Composer` 版本的增加而增加。例如，在 `Composer` 版本 `2.3.12` 中，`composer-plugin-api` 的版本可能仍然是 `2.2.0`。

## 运行时包 `composer-runtime-api`

当使用 Composer 安装的应用程序运行时（无论是在 CLI 还是通过 Web 请求），它们需要 `vendor/autoload.php` 文件，这通常是执行代码的第一行之一。调用 Composer 自动加载器被认为是应用程序的"运行时"。

从 2.0 版本开始，Composer 除了注册类自动加载器外，还向应用程序运行时环境提供了[额外功能](../runtime.md)。

与 `composer-plugin-api` 类似，并非每个 Composer 版本都会添加新的运行时功能，因此 `composer-runtime-api` 的版本也会独立于 Composer 的版本增加。

## Composer 包 `composer`

从 Composer 2.2.0 开始，提供了一个新的平台包 `composer`，它代表了正在执行的 Composer 确切版本。依赖于这个平台包的包因此可以依赖（或冲突）于单独的 Composer 版本，以覆盖那些 `composer-runtime-api` 版本和 `composer-plugin-api` 都没有改变的边缘情况。

由于这个选项是在 Composer 2.2.0 中引入的，建议添加一个至少为 `>=2.2.0` 的 `composer-plugin-api` 依赖，以便为运行较旧 Composer 版本的用户提供更有意义的错误信息。

通常情况下，建议依赖 `composer-plugin-api` 或 `composer-runtime-api`，而不是通过 `composer` 平台包依赖具体的 Composer 版本。
