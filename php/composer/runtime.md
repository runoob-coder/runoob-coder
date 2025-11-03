---
titleTemplate: Composer中文文档 - PHP 的依赖管理器 | PHP | noob-coder | 菜鸟码农
head:
  - - meta
    - name: description
      content: 虽然 Composer 主要用于在你的项目中安装依赖项，但也有一些功能可以在运行时使用。如果你需要依赖特定版本的这些功能，你可以引入 composer-runtime-api 包。
  - - meta
    - name: keywords
      content: vendor/autoload.php,composer_bin_dir,bin-dir,composer_autoload_path,lib-*,php-only,InstalledVersions,getInstallPath,getInstalledPackagesByType,getInstallPath,getReference,getPrettyVersion,getVersion,require-dev,vendor/package,虚拟包,已安装的版本,installed-versions,自动加载器,autoload,composer-runtime-api,Composer,PHP,libraries,dependency,noob-coder,菜鸟码农
---


# 运行时 Composer 工具

虽然 Composer 主要用于在你的项目中安装依赖项，但也有一些功能可以在运行时使用。

如果你需要依赖特定版本的这些功能，你可以引入 `composer-runtime-api` 包。

## 自动加载 {#autoload}

自动加载器是最常用的，已经在我们的 [基本使用指南](basic-usage.md#autoloading) 中介绍过。它在所有 Composer 版本中都可用。

## 已安装的版本 {#installed-versions}

composer-runtime-api 2.0 引入了一个新的 `Composer\InstalledVersions` 类，它提供了一些静态方法来检查当前安装了哪些版本。只要你包含了 Composer 自动加载器，这个功能就会自动在你的代码中可用。

这个类的主要使用场景如下：

### 检查包 X（或虚拟包）是否存在

```php
\Composer\InstalledVersions::isInstalled('vendor/package'); // 返回 bool 值
\Composer\InstalledVersions::isInstalled('psr/log-implementation'); // 返回 bool 值
```

从 Composer 2.1 开始，你还可以通过传递 false 作为第二个参数来检查某个包是否通过 require-dev 安装：

```php
// 假设此包已安装，返回 true
\Composer\InstalledVersions::isInstalled('vendor/package');
// 如果 vendor/package 在 require 中则返回 true，在 require-dev 中则返回 false
\Composer\InstalledVersions::isInstalled('vendor/package', false);
```

请注意，这不能用于检查 [平台包](basic-usage.md#platform-packages) 是否已安装。

### 检查包 X 是否以 Y 版本安装

> [!NOTE] 注意
> 要使用此功能，你的包必须引入 `"composer/semver": "^3.0"`。

```php
use Composer\Semver\VersionParser;

\Composer\InstalledVersions::satisfies(new VersionParser, 'vendor/package', '2.0.*');
\Composer\InstalledVersions::satisfies(new VersionParser, 'psr/log-implementation', '^1.0');
```

例如，如果 vendor/package 以匹配 `2.0.*` 的版本安装，这将返回 true，但如果给定的包名被其他包替换或提供，也会返回 true。

### 获取包 X 的版

> [!NOTE] 注意
> 如果你查询的包名本身没有被安装，而只是由另一个包提供或替换，这将返回 null。因此我们建议至少在库代码中使用 satisfies() 方法。在应用程序代码中你有更多的控制权，这就不那么重要了。

```php
// 如果 vendor/package 已安装，返回标准化版本（例如 1.2.3.0），
// 如果已提供/替换，则返回 null，
// 如果包根本未安装，则抛出 OutOfBoundsException 异常。
\Composer\InstalledVersions::getVersion('vendor/package');
```

```php
// 如果 vendor/package 已安装，返回原始版本（例如 v1.2.3），
// 如果已提供/替换，则返回 null，
// 如果包根本未安装，则抛出 OutOfBoundsException 异常。
\Composer\InstalledVersions::getPrettyVersion('vendor/package');
```

```php
// 如果 vendor/package 已安装，返回包的 dist 或 source 引用（例如 git 提交哈希），
// 如果已提供/替换，则返回 null，
// 如果包根本未安装，则抛出 OutOfBoundsException 异常。
\Composer\InstalledVersions::getReference('vendor/package');
```

### 获取包自身已安装的版本

如果你只关心获取某个包自身的版本，例如在 acme/foo 的源码中，你希望知道当前运行的是哪个版本以便展示给用户，那么可以直接使用 `getVersion`、`getPrettyVersion` 或 `getReference` 方法。

上述警告在这种情况下不适用，因为你确定包已存在且没有被替换，只要你的代码正在运行即可。

不过，建议你在处理返回值时，务必优雅地处理 `null`，以确保安全。

----

如需更复杂的用法，还有其他方法可用，请参考 [该类的源码和注释](https://github.com/composer/composer/blob/main/src/Composer/InstalledVersions.php)。

### 获取包的安装路径

可以使用 `getInstallPath` 方法获取某个包的绝对安装路径。

> [!NOTE] 注意
> 路径虽然是绝对路径，但可能包含 `../` 或符号链接。如果你需要真实路径，建议使用 `realpath()` 进行处理。

```php
// 如果 vendor/package 已安装，返回包的绝对安装路径；
// 如果包已提供/替换，或是 metapackage，则返回 null；
// 如果包根本未安装，则抛出 OutOfBoundsException 异常。
\Composer\InstalledVersions::getInstallPath('vendor/package');
```

> 该方法自 Composer 2.1 起可用（即 `composer-runtime-api ^2.1`）

### 获取已安装的指定类型包

`getInstalledPackagesByType` 方法接受一个包类型参数（例如 foo-plugin），并列出已安装的该类型包。你可以使用上面的方法进一步获取每个包的详细信息。

此方法可以避免自定义安装器将插件放在特定路径，而是直接留在 vendor 目录。你可以通过 `InstalledVersions` 在运行时查找并初始化插件，同时可通过 `getInstallPath` 获取其路径。

```php
\Composer\InstalledVersions::getInstalledPackagesByType('foo-plugin');
```

> 该方法自 Composer 2.1 起可用（即 `composer-runtime-api ^2.1`）

## 平台检查 {#platform-check}

composer-runtime-api 2.0 引入了一个新的 `vendor/composer/platform_check.php` 文件，当你引入 Composer 自动加载器时会自动加载。

它会验证当前运行的 PHP 进程是否满足平台要求（如 PHP 版本和 PHP 扩展）。如果不满足要求，脚本会打印缺失项的警告，并以 104 退出码终止。

为避免线上环境因缺少某些 PHP 扩展而出现白屏死机，你可以在部署或构建流程中运行 `composer check-platform-reqs`，如果返回码不为 0，则应中止流程。

默认值为 `php-only`，只检查 PHP 版本。

如果你不想使用此安全检查，愿意承担运行时错误风险，可以通过设置 [`platform-check`](config.md#platform-check) 配置项为 `false` 来禁用。

如果你希望检查包含 PHP 扩展，则将配置项设为 `true`。此时会验证 `ext-*` 依赖，但出于性能考虑，Composer 只检查扩展是否存在，不会校验其具体版本。

`lib-*` 依赖不会被平台检查功能支持或校验。

## 二进制文件中的自动加载器路径

composer-runtime-api 2.2 引入了一个新的 `$_composer_autoload_path` 全局变量，在使用 Composer 安装的二进制文件运行时会被设置。详细内容请参阅 [供应商二进制文档](articles/vendor-binaries.md#finding-the-composer-autoloader-from-a-binary)。

该变量由二进制代理设置，因此不会通过 Composer 的 `vendor/autoload.php` 提供给项目，因为这样做没有意义——它只会指向自身。

## 二进制文件（bin-dir）路径

composer-runtime-api 2.2.2 引入了一个新的 `$_composer_bin_dir` 全局变量，在使用 Composer 安装的二进制文件运行时会被设置。详细内容请参阅 [供应商二进制文档](articles/vendor-binaries.md#finding-the-composer-bin-dir-from-a-binary)。

该变量由二进制代理设置，因此不会通过 Composer 的 `vendor/autoload.php` 提供给项目。
