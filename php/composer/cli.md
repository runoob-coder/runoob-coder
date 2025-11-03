---
titleTemplate: Composer中文文档 - PHP 的依赖管理器 | PHP | noob-coder | 菜鸟码农
head:
  - - meta
    - name: description
      content: 你已经学会了如何使用命令行界面来执行一些操作。本章将记录所有可用的命令。要从命令行获取帮助，可以运行 composer 或 composer list 来查看完整的命令列表，然后将 --help 与其中任何一个命令结合使用可以获取更多信息。由于 Composer 使用了 symfony/console，如果命令名称没有歧义，你可以使用简短名称来调用命令。
  - - meta
    - name: keywords
      content: symfony/console,SHELL_VERBOSITY,COMPOSER_WITH_ALL_DEPENDENCIES,COMPOSER_WITH_DEPENDENCIES,COMPOSER_IGNORE_PLATFORM_REQ,COMPOSER_MINIMAL_CHANGES,COMPOSER_PREFER_DEV_OVER_PRERELEASE,COMPOSER_PREFER_LOWEST,COMPOSER_PREFER_STABLE,COMPOSER_NO_DEV,COMPOSER_NO_AUDIT,COMPOSER_SKIP_SCRIPTS,COMPOSER_DEBUG_EVENTS,COMPOSER_DISABLE_NETWORK,COMPOSER_SELF_UPDATE_TARGET,COMPOSER_IPRESOLVE,COMPOSER_MAX_PARALLEL_PROCESSES,COMPOSER_MAX_PARALLEL_HTTP,COMPOSER_AUDIT_ABANDONED,HTTPS_PROXY_REQUEST_FULLURI,HTTP_PROXY_REQUEST_FULLURI,http_proxy,COMPOSER_RUNTIME_ENV,COMPOSER_VENDOR_DIR,COMPOSER_ROOT_VERSION,COMPOSER_PROCESS_TIMEOUT,COMPOSER_NO_INTERACTION,COMPOSER_MIRROR_PATH_REPOS,COMPOSER_MEMORY_LIMIT,COMPOSER_HTACCESS_PROTECT,config.json,COMPOSER_HOME,COMPOSER_FUND,COMPOSER_DISCARD_CHANGES,COMPOSER_DISABLE_XDEBUG_WARN,COMPOSER_CAFILE,COMPOSER_CACHE_DIR,COMPOSER_BIN_DIR,COMPOSER_AUTH,COMPOSER_ALLOW_XDEBUG,COMPOSER_ALLOW_SUPERUSER,audit,archive,diagnose,run-script,clear-cache,dump-autoload,dumpautoload,create-project,repository,repo,config,self-update,selfupdate,status,validate,prohibits,why-not,depends,why,fund,--by-suggestion,--by-package,suggests,browse,home,-patch-only,--minor-only,--major-only,outdated,show,info,--only-vendor,php-cs-fixer,global,check-platform-reqs,reinstall,--no-dev-only,--dev-only,Dependency Hell,依赖地狱,bump,--unused,rm,uninstall,remove,--sort-packages,--update-with-all-dependencies,--update-no-dev,require-dev,mirrors,--bump-after-update,--root-reqs,--interactive,--patch-only,--minimal-changes,--prefer-lowest,--prefer-stable,--with-all-dependencies,--with-dependencies,--with,--lock,--ignore-platform-req,--ignore-platform-reqs,--apcu-autoloader-prefix,APCu,--apcu-autoloader,自动加载器,类映射,--classmap-authoritative,classmap,--optimize-autoloader,--audit-format,--audit,--no-progress,--no-autoloader,--no-dev,--dev,--dry-run,--prefer-install,require,upgrade,update,completion.bash,--help,cli,install,dump-autoload,--help,composer.lock,Composer,PHP,libraries,dependency,noob-coder,菜鸟码农
---

# 命令行界面 / 命令

你已经学会了如何使用命令行界面来执行一些操作。本章将记录所有可用的命令。

要从命令行获取帮助，可以运行 `composer` 或 `composer list` 来查看完整的命令列表，然后将 `--help` 与其中任何一个命令结合使用可以获取更多信息。

由于 Composer 使用了 [symfony/console](https://github.com/symfony/console)，如果命令名称没有歧义，你可以使用简短名称来调用命令。

```shell
php composer.phar dump
```

上述命令将调用 `composer dump-autoload`。

## Bash 自动补全

要安装 bash 自动补全功能，你可以运行 `composer completion bash > completion.bash`。 这将在当前目录下创建一个 `completion.bash` 文件。

然后执行 `source completion.bash` 来在当前终端会话中启用它。

将 `completion.bash` 文件移动并重命名为 `/etc/bash_completion.d/composer`，这样就可以在新终端中自动加载。

## 全局选项 {#global-options}

以下选项可用于所有命令：

* **--verbose (-v):** 增加消息的详细程度。
* **--help (-h):** 显示帮助信息。
* **--quiet (-q):** 不输出任何消息。
* **--no-interaction (-n):** 不询问任何交互式问题。
* **--no-plugins:** 禁用插件。
* **--no-scripts:** 跳过执行在 `composer.json` 中定义的脚本。
* **--no-cache:** 禁用缓存目录的使用。等同于将 `COMPOSER_CACHE_DIR` 环境变量设置为 /dev/null（在 Windows 上为 NUL）。
* **--working-dir (-d):** 如果指定，使用给定目录作为工作目录。
* **--profile:** 显示进程耗费时间和内存使用信息。
* **--ansi:** 强制使用 ANSI 输出。
* **--no-ansi:** 禁用 ANSI 输出。
* **--version (-V):** 显示此应用程序的版本。

## 进程退出代码 {#process-exit-codes}

* **0:** 正常
* **1:** 通用/未知错误代码
* **2:** 依赖解析错误代码

## 初始化 init {#init}

在 [库（资源包）](libraries.md) 章节中，我们学习了如何手动创建 `composer.json` 文件。此外，也可以使用 `init` 命令来完成此操作。

运行该命令时，它会交互式地要求你填写字段，同时使用一些智能默认值。

```shell
php composer.phar init
```

### 选项

* **--name:** 包的名称。
* **--description:** 包的描述。
* **--author:** 包的作者姓名。
* **--type:** 包的类型。
* **--homepage:** 包的主页。
* **--require:** 引入的包及其版本约束。格式应为 `foo/bar:1.0.0`。
* **--require-dev:** 开发环境依赖，参见 **--require**。
* **--stability (-s):** `minimum-stability` 字段的值。
* **--license (-l):** 包的许可证。
* **--repository:** 提供一个（或多个）自定义仓库。它们将被存储在生成的 composer.json 中，并在提示输入依赖列表时用于自动补全。每个仓库可以是指向 `composer` 仓库的 HTTP URL，或类似于 [repositories](schema.md#repositories) 键接受的 JSON 字符串。
* **--autoload (-a):** 向 composer.json 添加 PSR-4 自动加载映射。自动将包的命名空间映射到提供的目录。（期望相对路径，例如 src/）另请参见 [PSR-4 自动加载](schema.md#psr-4)。

## install / i

`install` 命令从当前目录读取 `composer.json` 文件，解析依赖关系，并将它们安装到 `vendor` 目录中。

```shell
php composer.phar install
```

如果当前目录中有 `composer.lock` 文件，它将使用其中的确切版本，而不是重新解析依赖版本。这确保了使用该库的每个人都能够获得相同版本的依赖项。

如果当前目录中没有 `composer.lock` 文件，Composer 将在依赖解析完成后创建一个。

### 选项

* **--prefer-install：** 下载包有两种方式：`source`（源码）和 `dist`（发行版）。Composer 默认使用 `dist`。如果你传递 `--prefer-install=source`（或 `--prefer-source`），Composer 将从 `source` 安装（如果有源码）。这在你想对项目进行 bug 修复并直接获取依赖项的本地 git 克隆时非常有用。要获得 Composer 对包的开发版本自动使用 `source` 的传统行为，请使用 `--prefer-install=auto`。另请参见 [config.preferred-install](config.md#preferred-install)。传递此标志将覆盖配置值。
* **--dry-run：** 如果你想在不实际安装包的情况下运行安装过程，可以使用 `--dry-run` 参数。这将模拟安装过程，并向你展示将要发生什么。
* **--download-only：** 仅下载，不安装包。
* **--dev：** 安装 `require-dev` 中列出的包（这是默认行为）。
* **--no-dev：** 跳过安装 `require-dev` 中列出的包。自动加载器生成将跳过 `autoload-dev` 规则。另请参见 [COMPOSER_NO_DEV](#composer-no-dev)。
* **--no-autoloader：** 跳过自动加载器生成。
* **--no-progress：** 移除进度显示，因为某些终端或脚本无法处理退格字符。
* **--audit：** 安装完成后运行安全审计。
* **--audit-format：** 安全审计输出格式。必须是 "table"、"plain"、"json" 或 "summary"（默认）。
* **--optimize-autoloader (-o):** 将 PSR-0/4 自动加载转换为类映射（classmap）以获得更快的自动加载速度。**这一点特别推荐用于生产环境**，但由于运行时需要一些时间，所以目前默认情况下不执行此操作。
* **--classmap-authoritative (-a):** 仅从类映射（classmap）中自动加载类。隐式启用 `--optimize-autoloader` 选项。
* **--apcu-autoloader:** 使用 [APCu](https://www.php.net/manual/zh/book.apcu.php) 来缓存找到/未找到的类。
* **--apcu-autoloader-prefix:** 为 [APCu](https://www.php.net/manual/zh/book.apcu.php) 自动加载器缓存使用自定义前缀。隐式启用 `--apcu-autoloader` 选项。
* **--ignore-platform-reqs:** 忽略所有平台要求（`php`、`hhvm`、`lib-*` 和 `ext-*`），即使本地机器不满足这些要求也强制安装。另请参见 [`platform`](config.md#platform) 配置选项。
* **--ignore-platform-req:** 忽略特定的平台要求（`php`、`hhvm`、`lib-*` 和 `ext-*`），即使本地机器不满足该要求也强制安装。可以通过通配符忽略多个要求。追加 `+` 号只会忽略要求的上限。例如，如果一个包要求 `php: ^7`，那么选项 `--ignore-platform-req=php+` 将允许在 PHP 8 上安装，但仍然无法在 PHP 5.6 上安装。

## update / u / upgrade {#update-u}

为了获取依赖项的最新版本并更新 `composer.lock` 文件，你应该使用 `update` 命令。该命令也被称为 `upgrade` 别名，因为它与 `apt-get` 或类似包管理器中的 `upgrade` 命令作用相同。

```shell
php composer.phar update
```

这将解析项目的所有依赖关系，并将确切的版本写入 `composer.lock` 文件。

如果你只想更新部分包而不是全部包，可以按如下方式罗列出来：

```shell
php composer.phar update vendor/package vendor/package2
```

你也可以使用通配符一次性更新一批包：

```shell
php composer.phar update "vendor/*"
```

如果你想在不修改 `composer.json` 的情况下将某个包降级到特定版本，可以使用 `--with` 参数并提供自定义版本约束：

```shell
php composer.phar update --with vendor/package:2.0.1
```

注意，使用上述命令时所有包都会被更新。如果你只想更新使用 `--with` 提供自定义约束的包，可以省略 `--with` 参数，而是使用部分更新的约束语法：

```shell
php composer.phar update vendor/package:2.0.1 vendor/package2:3.0.*
```

> [!NOTE] 注意
> 对于 composer.json 中也引入的包，自定义约束必须是现有约束的子集。composer.json 中的约束仍然适用，且 composer.json 不会因这些临时更新约束而被修改。

### 选项

* **--prefer-install:** 下载包有两种方式：`source`（源码）和 `dist`（发行版）。Composer 默认使用 `dist`。如果你传递 `--prefer-install=source`（或 `--prefer-source`），Composer 将从 `source` 安装（如果有源码）。这在你想对项目进行 bug 修复并直接获取依赖项的本地 git 克隆时非常有用。要获得 Composer 对包的开发版本自动使用 `source` 的传统行为，请使用 `--prefer-install=auto`。另请参见 [config.preferred-install](config.md#preferred-install)。传递此标志将覆盖配置值。
* **--dry-run:** 模拟命令执行而不实际执行任何操作。
* **--dev:** 安装 `require-dev` 中列出的包（这是默认行为）。
* **--no-dev:** 跳过安装 `require-dev` 中列出的包。自动加载器生成将跳过 `autoload-dev` 规则。另请参见 [COMPOSER_NO_DEV](#composer-no-dev)。
* **--no-install:** 在更新 composer.lock 文件后不运行安装步骤。
* **--no-audit:** 在更新 composer.lock 文件后不运行审计步骤。另请参见 [COMPOSER_NO_AUDIT](#composer-no-audit)。
* **--audit-format:** 审计输出格式。必须是 "table"、"plain"、"json" 或 "summary"（默认）。
* **--lock:** 覆盖锁文件哈希值以抑制关于锁文件过期的警告，而无需更新包版本。如果包的元数据（如镜像和URL）发生了变化，这些信息会被更新。
* **--with:** 临时添加的版本约束，例如 foo/bar:1.0.0 或 foo/bar=1.0.0
* **--no-autoloader:** 跳过自动加载器生成。
* **--no-progress:** 移除进度显示，因为某些终端或脚本无法处理退格字符。
* **--with-dependencies (-w):** 同时更新参数列表中包的依赖项，但不包括作为根依赖的包。也可以通过设置 COMPOSER_WITH_DEPENDENCIES=1 环境变量来启用。
* **--with-all-dependencies (-W):** 同时更新参数列表中包的依赖项，包括作为根依赖的包。也可以通过设置 COMPOSER_WITH_ALL_DEPENDENCIES=1 环境变量来启用。
* **--optimize-autoloader (-o):** 将 PSR-0/4 自动加载转换为类映射（classmap）以获得更快的自动加载速度。**这一点特别推荐用于生产环境**，但由于运行时需要一些时间，所以目前默认情况下不执行此操作。
* **--classmap-authoritative (-a):** 仅从类映射（classmap）中自动加载类。隐式启用 `--optimize-autoloader` 选项。
* **--apcu-autoloader:** 使用 APCu 来缓存找到/未找到的类。
* **--apcu-autoloader-prefix:** 为 APCu 自动加载器缓存使用自定义前缀。隐式启用 `--apcu-autoloader` 选项。
* **--ignore-platform-reqs:** 忽略所有平台要求（`php`、`hhvm`、`lib-*` 和 `ext-*`），即使本地机器不满足这些要求也强制安装。另请参见 [`platform`](config.md#platform) 配置选项。
* **--ignore-platform-req:** 忽略特定的平台要求（`php`、`hhvm`、`lib-*` 和 `ext-*`），即使本地机器不满足该要求也强制安装。可以通过通配符忽略多个要求。追加 `+` 号只会忽略要求的上限。例如，如果一个包要求 `php: ^7`，那么选项 `--ignore-platform-req=php+` 将允许在 PHP 8 上安装，但仍然无法在 PHP 5.6 上安装。
* **--prefer-stable:** 优先使用依赖项的稳定版本。也可以通过设置 COMPOSER_PREFER_STABLE=1 环境变量来启用。
* **--prefer-lowest:** 优先使用依赖项的最低版本。这对于测试要求的最低版本很有用，通常与 `--prefer-stable` 一起使用。也可以通过设置 COMPOSER_PREFER_LOWEST=1 环境变量来启用。
* **--minimal-changes (-m):** 仅对依赖项进行绝对必要的更改。如果包无法保持当前锁定的版本，则会更新它们。对于部分更新，允许列表中的包总是会被完全更新。也可以通过设置 COMPOSER_MINIMAL_CHANGES=1 环境变量来启用。
* **--patch-only:** 仅允许对当前安装的依赖项进行补丁版本更新。
* **--interactive:** 交互式界面，带有自动补全功能，用于选择要更新的包。
* **--root-reqs:** 限制更新范围为你的第一层依赖项（根依赖项）。
* **--bump-after-update:** 在执行更新后运行 `bump` 命令。设置为 `dev` 或 `no-dev` 来仅更新那些依赖项。

指定参数 `mirrors`、`lock` 或 `nothing` 中的任意一个，其效果与指定选项 `--lock` 相同。例如，`composer update mirrors` 与 `composer update --lock` 完全等价。

## require / r

`require` 命令会将新的包添加到当前目录下的 `composer.json` 文件中。如果该文件不存在，则会自动创建一个。

如果你没有指定具体的包，Composer 会提示你搜索包，并在给出搜索结果后，提供一个可选包的列表供你选择引入。

```shell
php composer.phar require
```

在添加或修改依赖引入后，修改后的引入将会被安装或更新。

如果你不想以交互方式选择依赖引入，可以直接将它们传递给命令。

```shell
php composer.phar require "vendor/package:2.*" vendor/package2:dev-master
```

如果你没有指定版本约束，Composer 将根据可用的包版本选择一个合适的版本。

```shell
php composer.phar require vendor/package vendor/package2
```

如果你不想立即安装新的依赖项，可以使用 `--no-update` 参数调用该命令。

### 选项

* **--dev:** 将包添加到 `require-dev` 中。
* **--dry-run:** 模拟命令执行而不实际执行任何操作。
* **--prefer-install:** 下载包有两种方式：`source`（源码）和 `dist`（发行版）。Composer 默认使用 `dist`。如果你传递 `--prefer-install=source`（或 `--prefer-source`），Composer 将从 `source` 安装（如果有源码）。这在你想对项目进行 bug 修复并直接获取依赖项的本地 git 克隆时非常有用。要获得 Composer 对包的开发版本自动使用 `source` 的传统行为，请使用 `--prefer-install=auto`。另请参见 [config.preferred-install](config.md#preferred-install)。传递此标志将覆盖配置值。
* **--no-progress:** 移除进度显示，因为某些终端或脚本无法处理退格字符。
* **--no-update:** 禁用依赖项的自动更新（隐含 --no-install）。
* **--no-install:** 在更新 composer.lock 文件后不运行安装步骤。
* **--no-audit:** 在更新 composer.lock 文件后不运行审计步骤。另请参见 [COMPOSER_NO_AUDIT](#composer-no-audit)。
* **--audit-format:** 审计输出格式。必须是 "table"、"plain"、"json" 或 "summary"（默认）。
* **--update-no-dev:** 使用 `--no-dev` 选项运行依赖项更新。另请参见 [COMPOSER_NO_DEV](#composer-no-dev)。
* **--update-with-dependencies (-w):** 同时更新新引入包的依赖项，但不包括作为根依赖项的包。也可以通过设置 COMPOSER_WITH_DEPENDENCIES=1 环境变量来启用。
* **--update-with-all-dependencies (-W):** 同时更新新引入包的依赖项，包括作为根依赖项的包。也可以通过设置 COMPOSER_WITH_ALL_DEPENDENCIES=1 环境变量来启用。
* **--ignore-platform-reqs:** 忽略所有平台要求（`php`、`hhvm`、`lib-*` 和 `ext-*`），即使本地机器不满足这些要求也强制安装。另请参见 [`platform`](config.md#platform) 配置选项。
* **--ignore-platform-req:** 忽略特定的平台要求（`php`、`hhvm`、`lib-*` 和 `ext-*`），即使本地机器不满足该要求也强制安装。可以通过通配符忽略多个要求。追加 `+` 号只会忽略要求的上限。例如，如果一个包要求 `php: ^7`，那么选项 `--ignore-platform-req=php+` 将允许在 PHP 8 上安装，但仍然无法在 PHP 5.6 上安装。
* **--prefer-stable:** 优先使用依赖项的稳定版本。也可以通过设置 COMPOSER_PREFER_STABLE=1 环境变量来启用。
* **--prefer-lowest:** 优先使用依赖项的最低版本。这对于测试要求的最低版本很有用，通常与 `--prefer-stable` 一起使用。也可以通过设置 COMPOSER_PREFER_LOWEST=1 环境变量来启用。
* **--minimal-changes (-m):** 在使用 `-w`/`-W` 进行更新时，仅对传递依赖项进行绝对必要的更改。也可以通过设置 COMPOSER_MINIMAL_CHANGES=1 环境变量来启用。
* **--sort-packages:** 保持 `composer.json` 中的包按顺序排列。
* **--optimize-autoloader (-o):** 将 PSR-0/4 自动加载转换为类映射（classmap）以获得更快的自动加载速度。**这一点特别推荐用于生产环境**，但由于运行时需要一些时间，所以目前默认情况下不执行此操作。
* **--classmap-authoritative (-a):** 仅从类映射（classmap）中自动加载类。隐式启用 `--optimize-autoloader` 选项。
* **--apcu-autoloader:** 使用 APCu 来缓存找到/未找到的类。
* **--apcu-autoloader-prefix:** 为 APCu 自动加载器缓存使用自定义前缀。隐式启用 `--apcu-autoloader` 选项。

## remove / rm / uninstall

`remove` 命令会从当前目录下的 `composer.json` 文件中移除指定的包。

```shell
php composer.phar remove vendor/package vendor/package2
```

在移除依赖引入后，被修改的依赖引入将会被卸载。

### 选项

* **--unused:** 移除不再作为直接或间接依赖项的未使用包。
* **--dev:** 将包从 `require-dev` 中移除。
* **--dry-run:** 模拟命令执行而不实际执行任何操作。
* **--no-progress:** 移除进度显示，因为某些终端或脚本无法处理退格字符。
* **--no-update:** 禁用依赖项的自动更新（隐含 --no-install）。
* **--no-install:** 在更新 composer.lock 文件后不运行安装步骤。
* **--no-audit:** 在更新 composer.lock 文件后不运行审计步骤。另请参见 [COMPOSER_NO_AUDIT](#composer-no-audit)。
* **--audit-format:** 审计输出格式。必须是 "table"、"plain"、"json" 或 "summary"（默认）。
* **--update-no-dev:** 使用 `--no-dev` 选项运行依赖项更新。另请参见 [COMPOSER_NO_DEV](#composer-no-dev)。
* **--update-with-dependencies (-w):** 同时更新被移除包的依赖项。也可以通过设置 COMPOSER_WITH_DEPENDENCIES=1 环境变量来启用。（已弃用，现在是默认行为）
* **--update-with-all-dependencies (-W):** 允许更新所有继承的依赖项，包括那些作为根依赖项的包。也可以通过设置 COMPOSER_WITH_ALL_DEPENDENCIES=1 环境变量来启用。
* **--minimal-changes (-m):** 在使用 `-w`/`-W` 进行更新时，仅对传递依赖项进行绝对必要的更改。也可以通过设置 COMPOSER_MINIMAL_CHANGES=1 环境变量来启用。
* **--ignore-platform-reqs:** 忽略所有平台要求（`php`、`hhvm`、`lib-*` 和 `ext-*`），即使本地机器不满足这些要求也强制安装。另请参见 [`platform`](config.md#platform) 配置选项。
* **--ignore-platform-req:** 忽略特定的平台要求（`php`、`hhvm`、`lib-*` 和 `ext-*`），即使本地机器不满足该要求也强制安装。可以通过通配符忽略多个要求。追加 `+` 号只会忽略要求的上限。例如，如果一个包要求 `php: ^7`，那么选项 `--ignore-platform-req=php+` 将允许在 PHP 8 上安装，但仍然无法在 PHP 5.6 上安装。
* **--optimize-autoloader (-o):** 将 PSR-0/4 自动加载转换为类映射（classmap）以获得更快的自动加载速度。**这一点特别推荐用于生产环境**，但由于运行时需要一些时间，所以目前默认情况下不执行此操作。
* **--classmap-authoritative (-a):** 仅从类映射（classmap）中自动加载类。隐式启用 `--optimize-autoloader` 选项。
* **--apcu-autoloader:** 使用 APCu 来缓存找到/未找到的类。
* **--apcu-autoloader-prefix:** 为 APCu 自动加载器缓存使用自定义前缀。隐式启用 `--apcu-autoloader` 选项。

## bump

`bump` 命令会将你的 `composer.json` 要求的下限版本提升到当前已安装的版本。这有助于确保你的依赖项不会因为其他冲突而意外降级，并且可以通过限制 Composer 需要查看的包版本数量来略微提高依赖项解析性能。

**不建议**在库（libraries）上盲目运行此命令，因为它会缩小允许的依赖项范围，可能导致用户遇到依赖地狱（Dependency Hell）问题。然而，在库上使用 `--dev-only` 选项运行该命令可能是可以的，因为开发要求是库本地的，不会影响包的使用者。

### 选项

* **--dev-only:** 仅更新 "require-dev" 中的引入。
* **--no-dev-only:** 仅更新 "require" 中的引入。
* **--dry-run:** 输出将要更新的包，但不执行任何操作。

## reinstall

`reinstall` 命令通过名称查找已安装的包，卸载它们并重新安装。如果你修改了包的文件，或者想要使用 `--prefer-install` 更改安装类型，这个命令可以让你对包进行干净的重新安装。

```shell
php composer.phar reinstall acme/foo acme/bar
```

你可以指定多个包名称进行重新安装，或者使用通配符一次选择多个包：

```shell
php composer.phar reinstall "acme/*"
```

### 选项

* **--prefer-install:** 下载包有两种方式：`source`（源码）和 `dist`（发行版）。Composer 默认使用 `dist`。如果你传递 `--prefer-install=source`（或 `--prefer-source`），Composer 将从 `source` 安装（如果有源码）。这在你想对项目进行 bug 修复并直接获取依赖项的本地 git 克隆时非常有用。要获得 Composer 对包的开发版本自动使用 `source` 的传统行为，请使用 `--prefer-install=auto`。另请参见 [config.preferred-install](config.md#preferred-install)。传递此标志将覆盖配置值。
* **--no-autoloader:** 跳过自动加载器生成。
* **--no-progress:** 移除进度显示，因为某些终端或脚本无法处理退格字符。
* **--optimize-autoloader (-o):** 将 PSR-0/4 自动加载转换为类映射（classmap）以获得更快的自动加载速度。**这一点特别推荐用于生产环境**，但由于运行时需要一些时间，所以目前默认情况下不执行此操作。
* **--classmap-authoritative (-a):** 仅从类映射（classmap）中自动加载类。隐式启用 `--optimize-autoloader` 选项。
* **--apcu-autoloader:** 使用 APCu 来缓存找到/未找到的类。
* **--apcu-autoloader-prefix:** 为 APCu 自动加载器缓存使用自定义前缀。隐式启用 `--apcu-autoloader` 选项。
* **--ignore-platform-reqs:** 忽略所有平台要求。这仅在 `reinstall` 命令的自动加载器生成上下文中有效。
* **--ignore-platform-req:** 忽略特定的平台要求。这仅在 `reinstall` 命令的自动加载器生成上下文中有效。可以通过通配符忽略多个要求。

## check-platform-reqs

`check-platform-reqs` 命令用于检查你的 PHP 和扩展版本是否符合已安装包的平台要求。例如，这可以用来验证生产服务器在安装项目后是否具备运行该项目所需的所有扩展。

与 `update`/`install` 命令不同，此命令将忽略 `config.platform` 设置，直接检查真实的平台包，因此你可以确定自己是否具备所需的平台依赖项。

### 选项

* **--lock:** 仅从锁定文件检查要求，而不是从已安装的包检查。
* **--no-dev:** 禁用对 `require-dev` 包要求的检查。
* **--format (-f):** 输出格式：text（默认）或 json。

## global

`global` 命令允许你像在 [COMPOSER_HOME](cli.md#composer-home) 目录中运行一样执行其他命令，如 `install`、`remove`、`require` 或 `update`。

这只是一个辅助工具，用于管理存储在中心位置的项目，该位置可以存放你希望在任何地方都能使用的 CLI 工具或 Composer 插件。

这可以用于全局安装 CLI 实用程序。以下是一个示例：

```shell
php composer.phar global require friendsofphp/php-cs-fixer
```

现在 `php-cs-fixer` 二进制文件可以在全局范围内使用。请确保你的全局 [vendor binaries](articles/vendor-binaries.md) 目录在你的 `$PATH` 环境变量中，你可以通过以下命令获取其位置：

```shell
php composer.phar global config bin-dir --absolute
```

如果你想稍后更新该二进制文件，可以运行全局更新：

```shell
php composer.phar global update
```

## search

`search` 命令允许你在当前项目的包仓库中进行搜索。通常这将是 packagist。你可以传递想要搜索的词。

```shell
php composer.phar search monolog
```

你也可以通过传递多个参数来搜索多个词。

### 选项

* **--only-name (-N):** 仅在包名称中搜索。
* **--only-vendor (-O):** 仅搜索供应商/组织名称，结果只返回"vendor"。
* **--type (-t):** 搜索特定的包类型。
* **--format (-f):** 允许你在文本（默认）或json输出格式之间选择。请注意，在json中，只有名称和描述键是保证存在的。 其余字段（`url`、`repository`、`downloads` 和 `favers`）在 [Packagist.org](https://packagist.org/) 搜索结果中可用，其他仓库可能返回更多或更少的数据。

## show / info {#show}

要列出所有可用的包，可以使用 `show` 命令。

```shell
php composer.phar show
```

要过滤列表，可以使用通配符替换包名称。

```shell
php composer.phar show "monolog/*"
```

```text
monolog/monolog 2.4.0 Sends your logs to files, sockets, inboxes, databases and various web services
```

如果你想查看某个包的详细信息，可以传递包名称。

```shell
php composer.phar show monolog/monolog
```

```text
name     : monolog/monolog
descrip. : Sends your logs to files, sockets, inboxes, databases and various web services
keywords : log, logging, psr-3
versions : * 1.27.1
type     : library
license  : MIT License (MIT) (OSI approved) https://spdx.org/licenses/MIT.html#licenseText
homepage : http://github.com/Seldaek/monolog
source   : [git] https://github.com/Seldaek/monolog.git 904713c5929655dc9b97288b69cfeedad610c9a1
dist     : [zip] https://api.github.com/repos/Seldaek/monolog/zipball/904713c5929655dc9b97288b69cfeedad610c9a1 904713c5929655dc9b97288b69cfeedad610c9a1
names    : monolog/monolog, psr/log-implementation

support
issues : https://github.com/Seldaek/monolog/issues
source : https://github.com/Seldaek/monolog/tree/1.27.1

autoload
psr-4
Monolog\ => src/Monolog

requires
php >=5.3.0
psr/log ~1.0
```

你甚至可以传递包的版本号，这将告诉你该特定版本的详细信息。

```shell
php composer.phar show monolog/monolog 1.0.2
```

### 选项

* **--all:** 列出所有仓库中可用的包。
* **--installed (-i):** 列出已安装的包（默认启用，但已弃用）。
* **--locked:** 从 composer.lock 文件中列出已锁定的包。
* **--platform (-p):** 仅列出平台包（PHP 和扩展）。
* **--available (-a):** 仅列出可用的包。
* **--self (-s):** 列出根包信息。
* **--name-only (-N):** 仅列出包名称。
* **--path (-P):** 列出包路径。
* **--tree (-t):** 以树形结构列出依赖关系。如果传递包名称，将显示该包的依赖树。
* **--latest (-l):** 列出所有已安装的包，包括它们的最新版本。
* **--outdated (-o):** 隐含 --latest，但此选项仅列出有新版本可用的包。
* **--ignore:** 忽略指定的包。可以包含通配符（`*`）。如果你不想被告知某些包的新版本，可以与 --outdated 选项一起使用。
* **--no-dev:** 从包列表中过滤掉开发依赖。
* **--major-only (-M):** 与 --latest 或 --outdated 一起使用。仅显示有主要 SemVer（语义化）兼容更新的包。
* **--minor-only (-m):** 与 --latest 或 --outdated 一起使用。仅显示有次要 SemVer 兼容更新的包。
* **--patch-only:** 与 --latest 或 --outdated 一起使用。仅显示有补丁级别 SemVer 兼容更新的包。
* **--sort-by-age (-A):** 显示已安装版本的大小，并按从大到小排序包。与 --latest 或 --outdated 选项一起使用。
* **--direct (-D):** 将包列表限制为直接依赖项。
* **--strict:** 当存在过时包时返回非零退出代码。
* **--format (-f):** 允许在文本（默认）或 json 输出格式之间选择。
* **--ignore-platform-reqs:** 忽略所有平台要求（`php`、`hhvm`、`lib-*` 和 `ext-*`），即使本地机器不满足这些要求也强制安装。与 --outdated 选项一起使用。
* **--ignore-platform-req:** 忽略特定平台要求（`php`、`hhvm`、`lib-*` 和 `ext-*`），即使本地机器不满足该要求也强制安装。可以通过通配符忽略多个要求。与 --outdated 选项一起使用。

## outdated

`outdated` 命令显示已安装的包的列表，这些包有可用的更新，包括它们当前和最新的版本。这基本上是 `composer show -lo` 的别名。

颜色编码如下：

- **<font color="green">绿色 (=)</font>**：依赖项是最新版本并且是最新的。
- **<font color="yellow">黄色 (~)</font>**：依赖项有新版本可用，根据语义化版本控制，该版本包括向后兼容性破坏，因此在可以时升级，但这可能涉及一些工作。
- **<font color="red">红色 (!)</font>**：依赖项有新的语义化版本兼容版本，你应该升级它。

### 选项

* **--all (-a):** 显示所有包，而不仅仅是过时的包（`composer show --latest` 的别名）。
* **--direct (-D):** 将包列表限制为直接依赖项。
* **--strict:** 如果有任何包过时，则返回非零退出代码。
* **--ignore:** 忽略指定的包。可以包含通配符（`*`）。如果你不想被告知某些包的新版本，可以使用此选项。
* **--major-only (-M):** 仅显示有主要 SemVer（语义化版本）兼容更新的包。
* **--minor-only (-m):** 仅显示有次要 SemVer 兼容更新的包。
* **--patch-only (-p):** 仅显示有补丁级别 SemVer 兼容更新的包。
* **--sort-by-age (-A):** 显示已安装版本的大小，并按从大到小排序包。
* **--format (-f):** 允许在文本（默认）或 json 输出格式之间选择。
* **--no-dev:** 不显示过时的开发依赖项。
* **--locked:** 显示来自锁定文件的包的更新，无论 vendor 目录中当前有什么。
* **--ignore-platform-reqs:** 忽略所有平台要求（`php`、`hhvm`、`lib-*` 和 `ext-*`），即使本地机器不满足这些要求也强制安装。
* **--ignore-platform-req:** 忽略特定平台要求（`php`、`hhvm`、`lib-*` 和 `ext-*`），即使本地机器不满足该要求也强制安装。可以通过通配符忽略多个要求。

## browse / home

`browse` 命令（别名为 `home`）在浏览器中打开包的仓库 URL 或主页。

### 选项

* **--homepage (-H):** 打开主页而不是仓库 URL。
* **--show (-s):** 仅显示主页或仓库 URL。

## suggests

列出当前安装的包集合所建议的所有包。你可以选择性地传递一个或多个 `vendor/package` 格式的包名称，以将输出限制为仅显示这些包的建议。

使用 `--by-package`（默认）或 `--by-suggestion` 标志，可以分别按提供推荐的包或被推荐的包对输出进行分组。

如果你只想要建议的包名称列表，请使用 `--list`。

### 选项

* **--by-package:** 按建议包分组输出（默认）。
* **--by-suggestion:** 按被建议的包分组输出。
* **--all:** 显示来自所有依赖项的建议，包括传递依赖项（默认情况下仅显示直接依赖项的建议）。
* **--list:** 仅显示建议的包名称列表。
* **--no-dev:** 排除来自 `require-dev` 包的建议。

## fund

发现如何帮助资助你的依赖项的维护。这会列出已安装依赖项的所有资助链接。使用 `--format=json` 可以获得机器可读的输出。

### 选项

* **--format (-f):** 允许你在文本（默认）或 json 输出格式之间选择。

## depends / why

`depends` 命令用于告诉你哪些其他包依赖于某个特定包。与安装时一样，`require-dev` 关系仅对根包进行考虑。

```shell
php composer.phar depends doctrine/lexer
```

```text
doctrine/annotations  1.13.3 requires doctrine/lexer (1.*)
doctrine/common       2.13.3 requires doctrine/lexer (^1.0)
```

你可以选择性地在包名后指定版本约束来限制搜索范围。

添加 `--tree` 或 `-t` 标志可以显示包被依赖的递归树状结构，例如：

```shell
php composer.phar depends psr/log -t
```

```text
psr/log 1.1.4 Common interface for logging libraries
├──composer/composer 2.4.x-dev (requires psr/log ^1.0 || ^2.0 || ^3.0)
├──composer/composer dev-main (requires psr/log ^1.0 || ^2.0 || ^3.0)
├──composer/xdebug-handler 3.0.3 (requires psr/log ^1 || ^2 || ^3)
│  ├──composer/composer 2.4.x-dev (requires composer/xdebug-handler ^2.0.2 || ^3.0.3)
│  └──composer/composer dev-main (requires composer/xdebug-handler ^2.0.2 || ^3.0.3)
└──symfony/console v5.4.11 (conflicts psr/log >=3) (circular dependency aborted here)
```

### 选项

* **--recursive (-r):** 递归解析到根包。
* **--tree (-t):** 以嵌套树形结构打印结果，隐含 -r 选项。

## prohibits / why-not

`prohibits` 命令用于告知你哪些包阻止了给定包的安装。你可以指定版本约束来验证是否可以在你的项目中执行升级，如果不能，还会说明原因。请看下面的示例：

```shell
php composer.phar prohibits symfony/symfony 3.1
```

```text
laravel/framework v5.2.16 requires symfony/var-dumper (2.8.*|3.0.*)
```

注意，你也可以指定平台要求，例如检查是否可以将服务升级到 PHP 8.0：

```shell
php composer.phar prohibits php 8
```

```text
doctrine/cache        v1.6.0 requires php (~5.5|~7.0)
doctrine/common       v2.6.1 requires php (~5.5|~7.0)
doctrine/instantiator 1.0.5  requires php (>=5.3,<8.0-DEV)
```

与 `depends` 命令一样，你可以请求递归查找，这将列出所有依赖于引起冲突的包的包。

### 选项

* **--recursive (-r):** 递归解析到根包。
* **--tree (-t):** 以嵌套树形结构打印结果，隐含 -r 选项。

## validate

```shell
php composer.phar validate
```

你应该始终在提交你的 `composer.json` 文件（以及 `composer.lock`（如果存在）[如适用](basic-usage.md#commit-your-composer-lock-file-to-version-control)）之前，以及在标记发布版本之前运行 `validate` 命令。

该命令将检查你的 `composer.json` 是否有效。如果存在 `composer.lock` 文件，它还会检查该文件是否与 `composer.json` 保持同步。

### 选项

* **--no-check-all:** 如果 `composer.json` 中的依赖要求使用了无限制或过于严格的版本约束，不发出警告。
* **--no-check-lock:** 如果存在 `composer.lock` 文件且不是最新时，不报错。
* **--check-lock** 检查锁文件是否为最新（即使 [config.lock](config.md#lock) 设置为 false）。
* **--no-check-publish:** 如果 `composer.json` 不适合在 Packagist 上作为包发布但其他方面有效时，不报错。
* **--no-check-version:** 如果存在版本字段时不发出错误。
* **--with-dependencies:** 同时验证所有已安装依赖项的 `composer.json` 文件。
* **--strict:** 对警告和错误都返回非零退出代码。

## status

如果你经常需要修改依赖项的源代码，且这些依赖项是以源码形式安装的，那么 `status` 命令可以帮助你检查这些依赖项是否存在本地修改。

```shell
php composer.phar status
```

使用 `--verbose` 选项，你可以获得关于更改内容的更多信息：

```shell
php composer.phar status -v
```

```text
You have changes in the following dependencies:
vendor/seld/jsonlint:
    M README.mdown
```

## self-update / selfupdate

要将 Composer 本身更新到最新版本，请运行 `self-update` 命令。该命令会用最新版本替换你的 `composer.phar` 文件。

```shell
php composer.phar self-update
```

如果你想更新到特定版本，可以指定版本号：

```shell
php composer.phar self-update 2.4.0-RC1
```

如果你是为整个系统安装的 Composer（参见[全局安装](intro.md#globally)），你可能需要使用 `root` 权限来运行该命令：

```shell
sudo -H composer self-update
```

如果 Composer 不是作为 PHAR 文件安装的，则此命令不可用。（当 Composer 由操作系统包管理器安装时，有时会出现这种情况。）

### 选项

* **--rollback (-r):** 回滚到你之前安装的最后一个版本。
* **--clean-backups:** 在更新过程中删除旧的备份。这使得更新后当前版本的 Composer 成为唯一可用的备份。
* **--no-progress:** 不输出下载进度。
* **--update-keys:** 提示用户更新密钥。
* **--stable:** 强制更新到稳定版本通道。
* **--preview:** 强制更新到预览版本通道。
* **--snapshot:** 强制更新到快照版本通道。
* **--1:** 强制更新到稳定版本通道，但仅使用 1.x 版本。
* **--2:** 强制更新到稳定版本通道，但仅使用 2.x 版本。
* **--set-channel-only:** 仅将通道存储为默认通道，然后退出。

## config

`config` 命令允许你编辑 Composer 配置设置和仓库，可以在本地的 `composer.json` 文件或全局的 `config.json` 文件中进行编辑。

此外，它还允许你编辑本地 `composer.json` 文件中的大部分属性。

```shell
php composer.phar config --list
```

### 使用

`setting-key` 是配置选项的名称，`setting-value1` 是配置值。对于可以接受值数组的设置（如 `github-protocols`），允许多个设置值参数。

你也可以编辑以下属性的值：

`description`、`homepage`、`keywords`、`license`、`minimum-stability`、
`name`、`prefer-stable`、`type` 和 `version`。

有关有效的配置选项，请参见 [配置](config.md) 章节。

### 选项

* **--global (-g):** 操作位于 `$COMPOSER_HOME/config.json` 的全局配置文件。不使用此选项时，该命令会影响本地的 `composer.json` 文件或由 `--file` 指定的文件。
* **--editor (-e):** 使用 `EDITOR` 环境变量定义的文本编辑器打开本地 `composer.json` 文件。与 `--global` 选项一起使用时，会打开全局配置文件。
* **--auth (-a):** 影响认证配置文件（仅用于 --editor）。
* **--unset:** 移除由 `setting-key` 命名的配置元素。
* **--list (-l):** 显示当前配置变量列表。与 `--global` 选项一起使用时，仅列出全局配置。
* **--file="..." (-f):** 操作指定文件而不是 `composer.json`。注意此选项不能与 `--global` 选项结合使用。
* **--absolute:** 获取 `*-dir` 配置值时返回绝对路径而不是相对路径。
* **--json:** 对设置值进行 JSON 解码，用于 `extra.*` 键。
* **--merge:** 将设置值与当前值合并，与 `--json` 结合使用于 `extra.*` 键。
* **--append:** 添加仓库时，将其追加（最低优先级）到现有仓库而不是前置（最高优先级）。
* **--source:** 显示配置值的加载来源。

### 修改仓库

除了修改配置部分外，`config` 命令还支持通过以下方式修改仓库配置：

```shell
php composer.phar config repositories.foo vcs https://github.com/foo/bar
```

如果你的仓库需要更多的配置选项，你可以传递其 JSON 表示形式：

```shell
php composer.phar config repositories.foo '{"type": "vcs", "url": "http://svn.example.org/my-project/", "trunk-path": "master"}'
```

### 修改额外配置值

除了修改配置部分外，`config` 命令还支持通过以下方式修改额外部分：

```shell
php composer.phar config extra.foo.bar value
```

点号表示数组嵌套，最多允许 3 层深度。上述命令会设置 `"extra": { "foo": { "bar": "value" } }`。

如果你需要添加/修改复杂的值，可以使用 `--json` 和 `--merge` 标志以 JSON 格式编辑额外字段：

```shell
php composer.phar config --json extra.foo.bar '{"baz": true, "qux": []}'
```

## repository / repo

`repo` 命令允许你在 `composer.json` 中管理仓库。它是 `composer config repositories.*` 的更强大替代方案。

### 使用

```shell
php composer.phar repo list
php composer.phar repo add foo vcs https://github.com/acme/foo
php composer.phar repo add bar '{"type":"composer","url":"https://repo.example.org"}'
php composer.phar repo add baz vcs https://example.org --before foo
php composer.phar repo add qux vcs https://example.org --after bar
php composer.phar repo remove foo
php composer.phar repo set-url foo https://git.example.org/acme/foo
php composer.phar repo get-url foo
php composer.phar repo disable packagist
php composer.phar repo enable packagist
```

### 选项

- **--global (-g):** 修改全局 `$COMPOSER_HOME/config.json` 文件。
- **--file (-f):** 修改指定文件而不是 `composer.json`。
- **--append:** 添加一个优先级较低的仓库（默认情况下仓库会被前置，因此具有比现有仓库更高的优先级）。
- **--before \<name\>:** 在名为 `<name>` 的现有仓库之前插入新仓库。
- **--after \<name\>:** 在名为 `<name>` 的现有仓库之后插入新仓库。`<name>` 必须与现有仓库名称匹配。

## create-project

你可以使用 Composer 从现有的包创建新项目。这相当于执行 `git clone/svn checkout` 然后对 `vendor` 目录执行 `composer install`。

这有以下几种应用场景：

1. 你可以部署应用程序包。
2. 你可以签出任何包并开始开发补丁等。
3. 多开发者的项目可以使用此功能来引导初始应用程序的开发。

要使用 Composer 创建新项目，可以使用 `create-project` 命令。传递一个包名和要创建项目的目录。你也可以提供版本作为第三个参数，否则将使用最新版本。

如果目录当前不存在，则会在安装过程中创建。

```shell
php composer.phar create-project doctrine/orm path "2.2.*"
```

也可以在包含现有 `composer.json` 文件的目录中不带参数运行该命令来引导项目。

默认情况下，该命令会在 [packagist.org](https://packagist.org/) 上检查包。

```shell
php composer.phar create-project doctrine/orm path "2.2.*"
```

### 选项

* **--stability (-s):** 包的最低稳定性。默认为 `stable`。
* **--prefer-install:** 下载包有两种方式：`source`（源码）和 `dist`（发行版）。Composer 默认使用 `dist`。如果你传递 `--prefer-install=source`（或 `--prefer-source`），Composer 将从 `source` 安装（如果有源码）。这在你想对项目进行 bug 修复并直接获取依赖项的本地 git 克隆时非常有用。要获得 Composer 对包的开发版本自动使用 `source` 的传统行为，请使用 `--prefer-install=auto`。另请参见 [config.preferred-install](config.md#preferred-install)。传递此标志将覆盖配置值。
* **--repository:** 提供一个自定义仓库来搜索包，这将替代 packagist。可以是一个指向 `composer` 仓库的 HTTP URL，一个本地 `packages.json` 文件的路径，或一个类似于 [repositories](schema.md#repositories) 键接受的 JSON 字符串。你可以多次使用此选项来配置多个仓库。
* **--add-repository:** 在 composer.json 中添加自定义仓库。如果存在锁文件，它将被删除并运行更新而不是安装。
* **--dev:** 安装 `require-dev` 中列出的包。
* **--no-dev:** 禁用安装 `require-dev` 包。
* **--no-scripts:** 禁用执行根包中定义的脚本。
* **--no-progress:** 移除可能干扰某些终端或不支持退格字符的脚本的进度显示。
* **--no-secure-http:** 在安装根包时临时禁用 secure-http 配置选项。**使用时风险自负。** 使用此标志是个坏主意。
* **--keep-vcs:** 跳过删除创建项目的 VCS 元数据。这在非交互模式下运行命令时特别有用。
* **--remove-vcs:** 强制删除 VCS 元数据而不提示。
* **--no-install:** 禁用安装供应商包。
* **--no-audit:** 安装完成后不运行审计步骤。另请参见 [COMPOSER_NO_AUDIT](#composer-no-audit)。
* **--audit-format:** 审计输出格式。必须是 "table"、"plain"、"json" 或 "summary"（默认）。
* **--ignore-platform-reqs:** 忽略所有平台要求（`php`、`hhvm`、`lib-*` 和 `ext-*`），即使本地机器不满足这些要求也强制安装。另请参见 [`platform`](config.md#platform) 配置选项。
* **--ignore-platform-req:** 忽略特定平台要求（`php`、`hhvm`、`lib-*` 和 `ext-*`），即使本地机器不满足该要求也强制安装。可以通过通配符忽略多个要求。
* **--ask:** 要求用户为新项目提供目标目录。

## dump-autoload / dumpautoload

如果你需要更新自动加载器（例如由于 classmap 包中新增了类），你可以使用 `dump-autoload` 命令来完成，而无需执行安装或更新操作。

此外，它还可以导出一个优化的自动加载器，出于性能原因将 PSR-0/4 包转换为 classmap 包。在包含大量类的大型应用程序中，自动加载器可能会占用每个请求的大量时间。在开发中对所有内容使用 classmap 不太方便，但使用此选项时，你仍然可以为了便利性使用 PSR-0/4，同时为了性能使用 classmap。

### 选项

* **--optimize (-o):** 将 PSR-0/4 自动加载转换为类映射(classmap) 以获得更快的自动加载器。这特别推荐用于生产环境，但由于需要一些时间来运行，所以目前默认情况下不执行此操作。
* **--classmap-authoritative (-a):** 仅从类映射中自动加载类。隐式启用 `--optimize`。
* **--apcu:** 使用 APCu 来缓存找到/未找到的类。
* **--apcu-prefix:** 为 APCu 自动加载器缓存使用自定义前缀。隐式启用 `--apcu`。
* **--dry-run:** 输出操作但不执行任何操作。
* **--no-dev:** 禁用 autoload-dev 规则。Composer 默认会根据上一次 `install` 或 `update` 命令的 `--no-dev` 状态自动推断此设置。
* **--dev:** 启用 autoload-dev 规则。Composer 默认会根据上一次 `install` 或 `update` 命令的 `--no-dev` 状态自动推断此设置。
* **--ignore-platform-reqs:** 忽略所有 `php`、`hhvm`、`lib-*` 和 `ext-*` 要求，并跳过这些要求的[平台检查](runtime.md#platform-check)。另请参见 [`platform`](config.md#platform) 配置选项。
* **--ignore-platform-req:** 忽略特定平台要求（`php`、`hhvm`、`lib-*` 和 `ext-*`）并跳过该要求的[平台检查](runtime.md#platform-check)。可以通过通配符忽略多个要求。
* **--strict-psr:** 如果当前项目中存在 PSR-4 或 PSR-0 映射错误（不包括依赖项），则返回失败退出代码(1)。需要 `--optimize` 才能工作。
* **--strict-ambiguous:** 如果在多个文件中找到相同的类，则返回失败退出代码(2)。需要 `--optimize` 才能工作。

## clear-cache / clearcache / cc

删除 Composer 缓存目录中的所有内容。

### 选项

* **--gc:** 仅运行垃圾回收，不完全清除缓存

## licenses

列出每个已安装包的名称、版本和许可证。使用 `--format=json` 可获得机器可读的输出。

### 选项

* **--format:** 输出格式：text、json 或 summary（默认："text"）。
* **--no-dev:** 从输出中移除开发依赖。

## run-script / run

要手动运行 [脚本](articles/scripts.md) ，可以使用此命令，提供脚本名称和可选的必要参数。

### 选项

* **--timeout:** 设置脚本超时时间（秒），设为 0 表示无超时。
* **--dev:** 设置开发模式。
* **--no-dev:** 禁用开发模式。
* **--list (-l):** 列出用户定义的脚本。

## exec

执行一个供应商提供的二进制文件/脚本。你可以执行任何命令，这将确保在命令运行之前，Composer 的 bin-dir 被添加到你的 PATH 环境变量中。

### 选项

* **--list (-l):** 列出可用的 Composer 二进制文件。

## diagnose

如果你认为自己发现了bug，或者某些东西行为异常，你可能想要运行 `diagnose` 命令来对许多常见问题执行自动化检查。

```shell
php composer.phar diagnose
```

## archive

此命令用于为指定版本的包生成 zip/tar 归档文件。它也可以用来归档整个项目，不包括被排除/忽略的文件。

```shell
php composer.phar archive vendor/package 2.0.21 --format=zip
```

### 选项

* **--format (-f):** 生成归档文件的格式：tar、tar.gz、tar.bz2 或 zip（默认："tar"）。
* **--dir:** 将归档文件写入此目录（默认："."）。
* **--file:** 使用给定的文件名写入归档文件。

## audit

此命令用于审计已安装的包是否存在潜在的安全问题。它默认使用 [Packagist.org API](https://packagist.org/apidoc#list-security-advisories) 检查并列出安全漏洞公告，或者如果在 `composer.json` 的 `repositories` 部分中指定了其他仓库，则使用这些仓库。

该命令还会检测被遗弃的包。

`audit` 命令会确定是否存在易受攻击或被遗弃的包，并根据检查结果返回以下退出代码：

* `0` 无问题；
* `1` 存在易受攻击的包；
* `2` 存在被遗弃的包；
* `3` 既存在易受攻击的包，也存在被遗弃的包。

```shell
php composer.phar audit
```

### 选项

* **--no-dev:** 禁用对 require-dev 包的审计。
* **--format (-f):** 审计输出格式。必须是 "table"（默认）、"plain"、"json" 或 "summary"。
* **--locked:** 从锁定文件审计包，无论 vendor 目录中当前有什么。
* **--abandoned:** 对被遗弃包的处理行为。必须是 "ignore"、"report" 或 "fail"。另请参见 [config.abandoned](config.md#abandoned)。传递此标志将覆盖配置值和环境变量。
* **--ignore-severity:** 忽略特定严重级别的公告。可以传递一次或多次来忽略多个严重级别。

## help

要获取某个特定命令的更多信息，你可以使用 `help` 命令。

```shell
php composer.phar help install
```

## 命令行补全 {#command-line-completion}

可以通过运行 `composer completion --help` 命令并按照说明来启用命令行补全功能。

## 环境变量 {#environment-variables}

你可以设置一些环境变量来覆盖特定的配置选项。虽然环境变量可以实现配置覆盖，但建议尽可能在 `composer.json` 文件的 `config` 部分中定义这些设置。需要注意的是，环境变量的优先级总是高于 `composer.json` 文件中的配置值。

### COMPOSER

通过设置 `COMPOSER` 环境变量，可以将 `composer.json` 文件名更改为其他名称。

例如：

```shell
COMPOSER=composer-other.json php composer.phar install
```

生成的锁定文件将使用相同的名称：在此示例中为 `composer-other.lock`。

### COMPOSER_ALLOW_SUPERUSER

如果设置为 1，此环境变量将禁用以 root/super 用户身份运行命令时的警告提示。它还会禁用 sudo 会话的自动清除功能，因此只有在你始终以超级用户身份使用 Composer 时（例如在 Docker 容器中）才应该设置此变量。

### COMPOSER_ALLOW_XDEBUG

如果设置为 1，这个环境变量将允许在启用 Xdebug 扩展的情况下运行 Composer，而无需重新启动不带该扩展的 PHP。

### COMPOSER_AUTH

`COMPOSER_AUTH` 变量允许你将认证信息设置为环境变量。该变量的内容应该是一个 JSON 格式的对象，包含 [http-basic、github-oauth、bitbucket-oauth 等所需对象](articles/authentication-for-private-packages.md)，并遵循 [配置中的规范](config.md)。

### COMPOSER_BIN_DIR

通过设置此选项，你可以将 `bin` 目录（[Vendor 二进制文件](articles/vendor-binaries.md)）更改为 `vendor/bin` 以外的其他目录。

### COMPOSER_CACHE_DIR

`COMPOSER_CACHE_DIR` 变量允许你更改 Composer 缓存目录，该目录也可以通过 [`cache-dir`](config.md#cache-dir) 选项进行配置。

默认情况下，在 Windows 系统上它指向 `C:\Users\<user>\AppData\Local\Composer`（或 `%LOCALAPPDATA%/Composer`）。在遵循 [XDG Base Directory Specifications](https://specifications.freedesktop.org/basedir-spec/basedir-spec-latest.html) 的 *nix 系统上，它指向 `$XDG_CACHE_HOME/composer`。在其他 *nix 系统和 macOS 上，它指向 `$COMPOSER_HOME/cache`。

### COMPOSER_CAFILE

通过设置这个环境变量，你可以设置一个证书包文件的路径，该文件将在 SSL/TLS 对等验证期间使用。

### COMPOSER_DISABLE_XDEBUG_WARN

如果设置为 1，当 Composer 在启用 Xdebug 扩展的情况下运行时，此环境变量将抑制警告。

### COMPOSER_DISCARD_CHANGES

这个环境变量控制 [`discard-changes`](config.md#discard-changes) 配置选项。

### COMPOSER_FUND

如果设置为 0，此环境变量在安装时会隐藏资金支持的消息通知。

```text
X packages you are using are looking for funding.
Use the `composer fund` command to find out more!
```

### COMPOSER_HOME {#composer-home}

`COMPOSER_HOME` 变量允许你更改 Composer 的主目录。这是一个隐藏的、全局的（每台机器上的用户级别）目录，所有项目共享。

使用 `composer config --global home` 命令可以查看主目录的位置。

默认情况下，在 Windows 系统上它指向 `C:\Users\<user>\AppData\Roaming\Composer`，在 macOS 上指向 `/Users/<user>/.composer`。在遵循 [XDG Base Directory Specifications](https://specifications.freedesktop.org/basedir-spec/basedir-spec-latest.html) 的 *nix 系统上，它指向 `$XDG_CONFIG_HOME/composer`。在其他 *nix 系统上，它指向 `/home/<user>/.composer`。

#### COMPOSER_HOME/config.json

你可以在 `COMPOSER_HOME` 指向的目录添加一个 `config.json` 文件。当你运行 `install` 和 `update` 命令时，Composer 会将这个配置文件与你的项目的 `composer.json` 进行部分合并（仅合并 `config` 和 `repositories` 键）。

这个文件允许你为用户的项目设置 [仓库](repositories.md) 和 [配置](config.md) 。

当全局配置与本地配置冲突时，项目中 composer.json 的本地配置总是优先。

### COMPOSER_HTACCESS_PROTECT

默认值为 `1`。如果设置为 `0`，Composer 将不会在 Composer 主目录、缓存目录和数据目录中创建 `.htaccess` 文件。

### COMPOSER_MEMORY_LIMIT

如果设置，该值将用作 PHP 的 memory_limit。

### COMPOSER_MIRROR_PATH_REPOS

如果设置为 1，此环境变量会将默认的路径仓库策略从 `symlink` 更改为 `mirror`。由于这是默认策略，仍然可以通过仓库（repository）选项进行覆盖。

### COMPOSER_NO_INTERACTION

如果设置为 1，这个环境变量将使 Composer 的行为就像你给每个命令都传递了 `--no-interaction` 标志一样。这可以在构建服务器/CI 环境中设置。

### COMPOSER_PROCESS_TIMEOUT

这个环境变量控制 Composer 等待命令（如 git 命令）执行完成的时间。默认值是 300 秒（5 分钟）。

### COMPOSER_ROOT_VERSION

通过设置这个变量，你可以指定根包的版本，当无法从 VCS 信息中自动检测到版本且 `composer.json` 文件中未明确指定时使用。

### COMPOSER_VENDOR_DIR

通过设置这个变量，你可以让 Composer 将依赖项安装到 `vendor` 以外的目录中。

### COMPOSER_RUNTIME_ENV

这允许你提示 Composer 正在哪个环境下运行，这可以帮助 Composer 解决一些环境特定的问题。目前唯一支持的值是 `virtualbox`，它会启用一些短暂的 `sleep()` 调用，以等待文件系统正确写入文件，然后我们才尝试读取它们。如果你使用 Vagrant 或 VirtualBox，并且在安装过程中遇到文件找不到的问题（尽管它们应该存在），你可以设置这个环境变量。

### http_proxy 或 HTTP_PROXY
### HTTP_PROXY_REQUEST_FULLURI
### HTTPS_PROXY_REQUEST_FULLURI
### no_proxy 或 NO_PROXY

有关如何使用代理环境变量的更多详细信息，请参见 [代理文档](faqs/how-to-use-composer-behind-a-proxy.md)。

### COMPOSER_AUDIT_ABANDONED

设置为 `ignore`、`report` 或 `fail` 以覆盖 [audit.abandoned](config.md#abandoned) 配置选项。

### COMPOSER_MAX_PARALLEL_HTTP

设置一个整数以配置可以并行下载的文件数量。默认值为 12，数值必须在 1 到 50 之间。如果你的代理在并发方面有问题，可能需要降低此值。增加此值通常不会带来性能提升。

### COMPOSER_MAX_PARALLEL_PROCESSES

设置一个整数以配置可以并行执行的进程数量。默认值为 10，数值必须在 1 到 50 之间。

### COMPOSER_IPRESOLVE

设置为 `4` 或 `6` 以强制使用 IPv4 或 IPv6 DNS 解析。这仅在使用 curl 扩展进行下载时有效。

### COMPOSER_SELF_UPDATE_TARGET

如果设置，会使 self-update 命令将新的 Composer phar 文件写入该路径，而不是覆盖自身。这对于在只读文件系统上更新 Composer 非常有用。

### COMPOSER_DISABLE_NETWORK

如果设置为 `1`，则禁用网络访问（尽最大可能）。这可以用于调试，或在飞机或网络连接不良的宇宙飞船上运行 Composer。

如果设置为 `prime`，GitHub VCS 仓库将预缓存，这样就可以在离线状态下使用 `1` 来完全离线工作。

### COMPOSER_DEBUG_EVENTS

如果设置为 `1`，则输出有关事件分发的信息，这对于插件作者识别确切的触发时间和内容非常有用。

### COMPOSER_SKIP_SCRIPTS

接受逗号分隔的事件名称列表，例如 `post-install-cmd`，用于指定应跳过执行的脚本。

### COMPOSER_NO_AUDIT

如果设置为 1，相当于向 `require`、`update`、`remove` 或 `create-project` 命令传递了 `--no-audit` 选项。

### COMPOSER_NO_DEV

如果设置为 `1`，相当于向 `require` 命令传递了 `--update-no-dev` 选项，或向 `install` 或 `update` 命令传递了 `--no-dev` 选项。你可以通过设置 `COMPOSER_NO_DEV=0` 来为单个命令覆盖此设置。

### COMPOSER_PREFER_STABLE

如果设置为 `1`，相当于向 `update` 或 `require` 命令传递了 `--prefer-stable` 选项。

### COMPOSER_PREFER_LOWEST

如果设置为 `1`，相当于向 `update` 或 `require` 命令传递了 `--prefer-lowest` 选项。

### COMPOSER_PREFER_DEV_OVER_PRERELEASE

If set to `1`, when resolving dependencies with both `--prefer-stable` and
`--prefer-lowest` enabled, dev versions are treated as more stable than
alpha/beta/RC versions in cases where no stable release exists. This is useful
to test lowest versions while still preferring branches that may contain
critical fixes over prerelease versions.

### COMPOSER_MINIMAL_CHANGES

如果设置为 `1`，相当于向 `update`、`require` 或 `remove` 命令传递了 `--minimal-changes` 选项。

### COMPOSER_IGNORE_PLATFORM_REQ 或 COMPOSER_IGNORE_PLATFORM_REQS {#composer-ignore-platform-req-or-composer-ignore-platform-reqs}

如果 `COMPOSER_IGNORE_PLATFORM_REQS` 设置为 `1`，相当于传递了 `--ignore-platform-reqs` 参数。否则，在 `COMPOSER_IGNORE_PLATFORM_REQ` 中指定逗号分隔的列表将忽略这些特定需求。

例如，如果开发工作站永远不会运行数据库查询，这可以用来忽略数据库扩展可用性的引入。如果设置 `COMPOSER_IGNORE_PLATFORM_REQ=ext-oci8`，那么即使未启用 `oci8` PHP 扩展，Composer 也会允许安装包。

### COMPOSER_WITH_DEPENDENCIES

如果设置为 `1`，则等同于向 `update`、`require` 或 `remove` 命令传递 `--with-dependencies` 选项。

### COMPOSER_WITH_ALL_DEPENDENCIES

如果设置为 `1`，则等同于向 `update`、`require` 或 `remove` 命令传递 `--with-all-dependencies` 选项。

### SHELL_VERBOSITY

由于 Composer 使用了 [symfony/console](https://github.com/symfony/console)，你可以定义 输出 [详细级别](https://symfony.com/doc/current/console/verbosity.html)。设置 `SHELL_VERBOSITY=-1` 可以隐藏 Composer 的输出（这等同于使用 CLI 选项 `--quiet`）。

请注意，这将影响所有依赖于 `symfony/console` 的工具，你可以在调用完 Composer 后设置 `SHELL_VERBOSITY=0` 来恢复默认的详细级别。
