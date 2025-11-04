---
titleTemplate: 相关文章 | Composer中文文档 - PHP 的依赖管理器 | PHP | noob-coder | 菜鸟码农
head:
  - - meta
    - name: keywords
      content: @putenv,@additional_args,@no_additional_args,PHP_BINARY,@php,@composer,--timeout,COMPOSER_PROCESS_TIMEOUT,process-timeout,二进制文件,bin/phpunit,bin-dir,symfony/console,run-script,COMPOSER_DEV_MODE,classmap,pre-pool-create,HttpDownloader,post-file-download,pre-file-download,command,init,post-package-uninstall,pre-package-uninstall,post-package-update,pre-package-update,post-package-install,pre-package-install,pre-operations-exec,update,install,status,dump-autoload,create-project,post-create-project-cmd,post-root-package-install,post-autoload-dump,pre-autoload-dump,post-archive-cmd,pre-archive-cmd,post-status-cmd,pre-status-cmd,post-update-cmd,pre-update-cmd,post-install-cmd,pre-install-cmd,composer.json,Symfony Console Command,PHP 回调,脚本,Script,scripts,Composer,依赖管理器,PHP,libraries,dependency,noob-coder,菜鸟码农
  - - meta
    - name: description
      content: 脚本是在安装包之前/之后被调用的回调函数
---

# 脚本

## 什么是脚本？

在 Composer 的术语中，脚本可以是 PHP 回调（定义为静态方法）或任何命令行可执行命令。脚本在 Composer 执行过程中用于执行包的自定义代码或包特定命令非常有用。

从 Composer 2.5 开始，脚本也可以是 Symfony Console Command 类，这允许你轻松运行它们并传递选项。但不建议将此功能用于处理事件。

> [!NOTE] 注意
> 只有在根包的 `composer.json` 中定义的脚本才会被执行。如果根包的依赖项指定了自己的脚本，Composer 不会执行这些额外的脚本。

## 事件名称 {#event-names}

Composer 在其执行过程中会触发以下命名事件：

### 命令事件

- **pre-install-cmd**：在存在 lock 文件的情况下执行 `install` 命令之前发生。
- **post-install-cmd**：在存在 lock 文件的情况下执行 `install` 命令之后发生。
- **pre-update-cmd**：在执行 `update` 命令之前发生，或在没有 lock 文件的情况下执行 `install` 命令之前发生。
- **post-update-cmd**：在执行 `update` 命令之后发生，或在没有 lock 文件的情况下执行 `install` 命令之后发生。
- **pre-status-cmd**：在执行 `status` 命令之前发生。
- **post-status-cmd**：在执行 `status` 命令之后发生。
- **pre-archive-cmd**：在执行 `archive` 命令之前发生。
- **post-archive-cmd**：在执行 `archive` 命令之后发生。
- **pre-autoload-dump**：在 `install`/`update` 期间或通过 `dump-autoload` 命令转储自动加载器之前发生。
- **post-autoload-dump**：在 `install`/`update` 期间或通过 `dump-autoload` 命令转储自动加载器之后发生。
- **post-root-package-install**：在 `create-project` 命令期间安装根包之后发生（但在安装其依赖项之前）。
- **post-create-project-cmd**：在执行 `create-project` 命令之后发生。

### 安装器事件

- **pre-operations-exec**：在安装 lock 文件时执行 `install/upgrade` 等操作之前发生。需要挂钩到此事件的插件必须全局安装才能使用，否则在项目全新安装时这些插件还不会被加载。

### 包事件

- **pre-package-install**：在包安装之前发生。
- **post-package-install**：在包安装之后发生。
- **pre-package-update**：在包更新之前发生。
- **post-package-update**：在包更新之后发生。
- **pre-package-uninstall**：在包卸载之前发生。
- **post-package-uninstall**：在包卸载之后发生。

### 插件事件

- **init**：在 Composer 实例初始化完成后发生。
- **command**：在 CLI 上执行任何 Composer 命令之前发生。它为你提供对程序的输入和输出对象的访问权限。
- **pre-file-download**：在文件下载之前发生，允许你在根据要下载的 URL 下载文件之前操作 `HttpDownloader` 对象。
- **post-file-download**：在包的 dist 文件下载之后发生，允许你在需要时对文件执行额外检查。
- **pre-command-run**：在命令执行之前发生，允许你操作 `InputInterface` 对象的选项和参数来调整命令的行为。
- **pre-pool-create**：在包池创建之前发生，让你可以过滤将要进入求解器的包列表。

> [!NOTE] 注意
> Composer 不会对 `install` 或 `update` 之前的依赖状态做任何假设。因此，你不应在 `pre-update-cmd` 或 `pre-install-cmd` 事件钩子中指定需要 Composer 管理的依赖的脚本。如果你需要在 `install` 或 `update` 之前执行脚本，请确保它们在你的根包内是自包含的。

## 定义脚本

`composer.json` 中的根 JSON 对象应该有一个名为 `"scripts"` 的属性，其中包含命名事件和每个事件对应脚本的键值对。事件的脚本可以定义为字符串（仅适用于单个脚本）或数组（适用于单个或多个脚本）。

对于任何给定事件：

- 脚本按照定义的顺序在相应事件触发时执行。
- 连接到单个事件的脚本数组可以同时包含 PHP 回调和命令行可执行命令。
- 包含已定义回调的 PHP 类和命令必须能够通过 Composer 的自动加载功能进行自动加载。
- 回调只能从 `psr-0`、`psr-4` 和 `classmap` 定义中自动加载类。如果已定义的回调依赖于类外部定义的函数，则回调本身负责加载包含这些函数的文件。

脚本定义示例：

```json
{
    "scripts": {
        "post-update-cmd": "MyVendor\\MyClass::postUpdate",
        "post-package-install": [
            "MyVendor\\MyClass::postPackageInstall"
        ],
        "post-install-cmd": [
            "MyVendor\\MyClass::warmCache",
            "phpunit -c app/"
        ],
        "post-autoload-dump": [
            "MyVendor\\MyClass::postAutoloadDump"
        ],
        "post-create-project-cmd": [
            "php -r \"copy('config/local-example.php', 'config/local.php');\""
        ]
    }
}
```

使用上述定义示例，以下是可能用于执行 PHP 回调的 `MyVendor\MyClass` 类：

```php
<?php

namespace MyVendor;

use Composer\Script\Event;
use Composer\Installer\PackageEvent;

class MyClass
{
    public static function postUpdate(Event $event)
    {
        $composer = $event->getComposer();
        // 执行操作
    }

    public static function postAutoloadDump(Event $event)
    {
        $vendorDir = $event->getComposer()->getConfig()->get('vendor-dir');
        require $vendorDir . '/autoload.php';

        some_function_from_an_autoloaded_file();
    }

    public static function postPackageInstall(PackageEvent $event)
    {
        $installedPackage = $event->getOperation()->getPackage();
        // 执行操作
    }

    public static function warmCache(Event $event)
    {
        // 预热缓存
    }
}
```

> [!NOTE] 注意
> 在运行 Composer `install` 或 `update` 命令时，环境中会添加一个名为 `COMPOSER_DEV_MODE` 的变量。如果命令是使用 `--no-dev` 标志运行的，该变量将设置为 0，否则将设置为 1。该变量在 `dump-autoload` 运行时也可用，并且将设置为与上次运行 `install` 或 `update` 时相同的值。

## 事件类

当事件被触发时，你的 PHP 回调会接收一个 `Composer\EventDispatcher\Event` 对象作为第一个参数。该对象有一个 `getName()` 方法，可以让你获取事件名称。

根据[脚本类型](#event-names)，你会得到各种事件子类，其中包含各种获取器，用于获取相关数据和关联对象：

- 基类: [`Composer\EventDispatcher\Event`](https://github.com/composer/composer/blob/main/src/Composer/EventDispatcher/Event.php)
- 命令事件: [`Composer\Script\Event`](https://github.com/composer/composer/blob/main/src/Composer/Script/Event.php)
- 安装器事件: [`Composer\Installer\InstallerEvent`](https://github.com/composer/composer/blob/main/src/Composer/Installer/InstallerEvent.php)
- 包事件: [`Composer\Installer\PackageEvent`](https://github.com/composer/composer/blob/main/src/Composer/Installer/PackageEvent.php)
- 插件事件:
    - init: [`Composer\EventDispatcher\Event`](https://github.com/composer/composer/blob/main/src/Composer/EventDispatcher/Event.php)
    - command: [`Composer\Plugin\CommandEvent`](https://github.com/composer/composer/blob/main/src/Composer/Plugin/CommandEvent.php)
    - pre-file-download: [`Composer\Plugin\PreFileDownloadEvent`](https://github.com/composer/composer/blob/main/src/Composer/Plugin/PreFileDownloadEvent.php)
    - post-file-download: [`Composer\Plugin\PostFileDownloadEvent`](https://github.com/composer/composer/blob/main/src/Composer/Plugin/PostFileDownloadEvent.php)

## 手动运行脚本

如果你想手动运行事件的脚本，语法如下：

```shell
php composer.phar run-script [--dev] [--no-dev] script
```

例如 `composer run-script post-install-cmd` 将运行任何已定义的 **post-install-cmd** 脚本和[插件](plugins.md)。

你也可以通过追加 `--` 和处理程序参数来给脚本处理程序传递额外参数。例如 `composer run-script post-install-cmd -- --check` 会将 `--check` 传递给脚本处理程序。这些参数会被 CLI 处理程序作为 CLI 参数接收，而 PHP 处理程序可以通过 `$event->getArguments()` 以数组形式获取。

## 编写自定义命令

如果你添加的自定义脚本不符合上述预定义的事件名称，你可以通过 `run-script` 运行它们，或者将它们作为原生 Composer 命令运行。

例如，下面定义的处理程序可以通过运行 `composer test` 来执行：

```json
{
    "scripts": {
        "test": "phpunit",
        "do-something": "MyVendor\\MyClass::doSomething",
        "my-cmd": "MyVendor\\MyCommand"
    }
}
```

与 `run-script` 命令类似，你可以给脚本传递额外参数，例如 `composer test -- --filter <pattern>` 会将 `--filter <pattern>` 传递给 `phpunit` 脚本。

通过 `composer do-something arg` 使用 PHP 方法可以让你执行 `static function doSomething(\Composer\Script\Event $event)`，并且 `arg` 会在 `$event->getArguments()` 中可用。但这种方法不容易传递 `--flags` 形式的自定义选项。

使用 [symfony/console](https://packagist.org/packages/symfony/console) 的 `Command` 类可以更轻松地定义和访问参数与选项。

例如，使用下面的命令，你可以简单地调用 `composer my-cmd --arbitrary-flag`，甚至不需要 `--` 分隔符。要被识别为 symfony/console 命令，类名必须以 `Command` 结尾并继承 symfony 的 `Command` 类。另外请注意，这将使用 Composer 内置的 symfony/console 版本运行，该版本可能与你在项目中要求的版本不匹配，并且可能在 Composer 次要版本之间发生变化。如果你需要更多的安全保障，应该使用你自己的二进制文件，在独立的进程中运行你自己的 symfony/console 版本。

在 `Command` 类中定义的脚本名称和描述将覆盖 `composer.json` 中的详细信息：`scripts` 中的条目键（用作传递给 `run-script` 的命令）将被 `$defaultName` 或传递给 `setName()` 的值替换，类似的替换也会发生在 `scripts-descriptions` 中为该脚本类包含的任何内容上。

```php
<?php

namespace MyVendor;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

class MyCommand extends Command
{
    protected function configure(): void
    {
        $this
//          ->setName('custom-cmd') //如果包含此行，将使用 `composer custom-cmd` 执行
            ->setDescription('此命令的自定义描述')
            ->setDefinition([
                new InputOption('arbitrary-flag', null, InputOption::VALUE_NONE, '示例标志'),
                new InputArgument('foo', InputArgument::OPTIONAL, '可选参数'),
            ])
            ->setHelp(
                "在这里你可以为你的命令定义一个长描述\n".
                "这将在使用 composer my-cmd --help 时可见"
            );
    }

    public function execute(InputInterface $input, OutputInterface $output): int
    {
        if ($input->getOption('arbitrary-flag')) {
            $output->writeln('标志已被使用');
        }

        return 0;
    }
}
```


> [!NOTE] 注意
> 在执行脚本之前，Composer 的 bin-dir 会临时被推到 PATH 环境变量的顶部，这样依赖项的二进制文件就可以直接访问。在这个例子中，无论 `phpunit` 二进制文件实际在 `vendor/bin/phpunit` 还是 `bin/phpunit` 中，它都会被找到并执行。

## 管理进程超时

虽然 Composer 并非旨在管理长时间运行的进程和其他类似的 PHP 项目方面，但有时禁用自定义命令的进程超时会很方便。此超时默认为 300 秒，可以根据所需效果通过多种方式覆盖：

- 使用配置键 `process-timeout` 为所有命令禁用超时
- 使用环境变量 `COMPOSER_PROCESS_TIMEOUT` 为当前或未来的 Composer 调用禁用超时
- 对特定调用使用 `run-script` 命令的 `--timeout` 标志
- 为特定脚本使用静态助手类

要在 `composer.json` 中直接使用静态助手类为特定脚本禁用超时：

```json
{
    "scripts": {
        "test": [
            "Composer\\Config::disableProcessTimeout",
            "phpunit"
        ]
    }
}
```

要为给定项目中的每个脚本禁用超时，可以使用 `composer.json` 配置：

```json
{
    "config": {
        "process-timeout": 0
    }
}
```

也可以设置全局环境变量来禁用当前终端环境中所有后续脚本的超时：

```shell
export COMPOSER_PROCESS_TIMEOUT=0
```

要禁用单个脚本调用的超时，必须使用 `run-script` Composer 命令并指定 `--timeout` 参数：

```shell
php composer.phar run-script --timeout=0 test
```

## 引用脚本

为了实现脚本重用并避免重复，你可以通过在命令名称前加上 `@` 前缀来从一个脚本调用另一个脚本：

```json
{
    "scripts": {
        "test": [
            "@clearCache",
            "phpunit"
        ],
        "clearCache": "rm -rf cache/*"
    }
}
```

你也可以引用脚本并传递新参数给它：

```json
{
    "scripts": {
        "tests": "phpunit",
        "testsVerbose": "@tests -vvv"
    }
}
```

## 调用 Composer 命令

要调用 Composer 命令，你可以使用 `@composer`，它会自动解析为当前正在使用的 `composer.phar`：

```json
{
    "scripts": {
        "test": [
            "@composer install",
            "phpunit"
        ]
    }
}
```

这种方法的一个限制是，你不能像 `@composer install && @composer foo` 那样连续调用多个 Composer 命令。你必须将它们分割成一个命令的 JSON 数组。

## 执行 PHP 脚本

要执行 PHP 脚本，你可以使用 `@php`，它会自动解析为当前正在使用的 php 进程：

```json
{
    "scripts": {
        "test": [
            "@php script.php",
            "phpunit"
        ]
    }
}
```

这种方法的一个限制是，你不能像 `@php install && @php foo` 那样连续调用多个命令。你必须将它们分割成一个命令的 JSON 数组。

你也可以调用 shell/bash 脚本，该脚本中将包含 PHP 可执行文件的路径作为 `PHP_BINARY` 环境变量。

## 控制附加参数

For example running `composer run-commands ARG` with the below config:

从 Composer 2.8 开始，你可以控制附加参数如何传递给脚本命令。

当运行像 `composer script-name arg arg2` 或 `composer script-name -- --option` 这样的脚本时，Composer 默认会将 `arg`、`arg2` 和 `--option` 追加到脚本命令中。

如果你不希望在给定命令中包含这些参数，你可以在命令中任何位置放置 `@no_additional_args`，这将移除默认行为，并且在运行命令之前也会移除该标志。

如果你希望参数添加到除了末尾之外的其他位置，那么你可以放置 `@additional_args` 来准确选择它们应该去的位置。

例如，使用以下配置运行 `composer run-commands ARG`：

```json
{
    "scripts": {
        "run-commands": [
            "echo hello @no_additional_args",
            "command-with-args @additional_args && do-something-without-args --here"
        ]
    }
}
```

最终会执行这些命令：

```
echo hello
command-with-args ARG && do-something-without-args --here
```

## 设置环境变量

要以跨平台的方式设置环境变量，你可以使用 `@putenv`：

```json
{
    "scripts": {
        "install-phpstan": [
            "@putenv COMPOSER=phpstan-composer.json",
            "@composer install --prefer-dist"
        ]
    }
}
```

## 自定义描述

你可以在 `composer.json` 中设置自定义脚本描述：

```json
{
    "scripts-descriptions": {
        "test": "运行所有测试！"
    }
}
```

这些描述在 `composer list` 或 `composer run -l` 命令中使用，用于描述运行命令时脚本的作用。

> [!NOTE] 注意
> 你只能为自定义命令设置自定义描述。

## 自定义别名

从 Composer 2.7 开始，你可以在 `composer.json` 中设置自定义脚本别名：

```json
{
    "scripts-aliases": {
        "phpstan": ["stan", "analyze"]
    }
}
```

这些别名提供了替代的命令名称。

> [!NOTE] 注意
> 你只能为自定义命令设置自定义别名。
