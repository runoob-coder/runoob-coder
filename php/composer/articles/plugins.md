---
titleTemplate: 相关文章 | Composer中文文档 - PHP 的依赖管理器 | PHP | noob-coder | 菜鸟码农
head:
  - - meta
    - name: keywords
      content: PHPStan 配置文件,phpstan/rules.neon,phpstan/extension-installer,PHPStan Extension Installer,PHPStan,PHP静态分析支持,插件自动加载,allow-plugins,plugin-optional,plugin-modifies-install-path,plugin-modifies-downloads,插件助手,异步助手 SyncHelper,Promise,DownloaderInterface,--no-plugins,COMPOSER_HOME,手动运行脚本,run-script,custom-plugin-command,CommandProvider,命令提供者,Capable,COMPOSER_DEBUG_EVENTS,getSubscribedEvents,EventDispatcher,EventSubscriberInterface,IOInterface,activate,PluginInterface,composer-plugin-api,composer-plugin,插件包,plugin package,Composer,依赖管理器,PHP,libraries,dependency,noob-coder,菜鸟码农
  - - meta
    - name: description
      content: 修改和扩展 Composer 的功能
---

# 设置和使用插件

修改和扩展 Composer 的功能

## 概述

你可能希望通过自己的方式来修改或扩展 Composer 的功能。例如，如果你的环境对 Composer 的行为提出了特殊要求，而这些要求不适用于大多数用户，或者你希望以大多数用户不需要的方式使用 Composer 完成某些事情。

在这种情况下，你可以考虑创建一个插件来处理你的特定逻辑。

## 创建插件

插件是一个常规的 Composer 包，它将代码作为包的一部分发布，也可以依赖其他包。

### 插件包 {#plugin-package}

插件包的文件与其他包文件相同，但有以下要求：

1. [type](../schema.md#type) 属性必须是 `composer-plugin`。
2. [extra](../schema.md#extra) 属性必须包含一个 `class` 元素，用于定义插件的类名（包括命名空间）。如果一个包包含多个插件，这可以是一个类名数组。
3. 你必须依赖一个名为 `composer-plugin-api` 的特殊包，以定义你的插件与哪些插件 API 版本兼容。依赖这个包实际上不会包含任何额外的依赖项，它只是指定要使用的插件 API 版本。

> [!NOTE] 注意
> 在开发插件时，虽然不是必需的，但添加对 `composer/composer` 的 require-dev 依赖项有助于在 IDE 中获得 Composer 类的自动补全功能。

`composer-plugin-api` 的所需版本遵循与普通包相同的[规则](../basic-usage.md#package-versions)。

当前的 Composer 插件 API 版本是 `2.6.0`。

一个有效的插件 `composer.json` 文件示例（省略了自动加载部分，并可选择性地添加对 `composer/composer` 的 require-dev 依赖以实现 IDE 自动补全）：

```json
{
    "name": "my/plugin-package",
    "type": "composer-plugin",
    "require": {
        "composer-plugin-api": "^2.0"
    },
    "require-dev": {
        "composer/composer": "^2.0"
    },
    "extra": {
        "class": "My\\Plugin"
    }
}
```

### 插件类

每个插件都必须提供一个实现 [`Composer\Plugin\PluginInterface`](https://github.com/composer/composer/blob/main/src/Composer/Plugin/PluginInterface.php) 接口的类。插件的 `activate()` 方法在插件加载后被调用，并接收 [`Composer\Composer`](https://github.com/composer/composer/blob/main/src/Composer/Composer.php) 实例和 [`Composer\IO\IOInterface`](https://github.com/composer/composer/blob/main/src/Composer/IO/IOInterface.php) 实例。使用这两个对象可以读取所有配置，并根据需要操作所有内部对象和状态。

示例：

```php
<?php

namespace phpDocumentor\Composer;

use Composer\Composer;
use Composer\IO\IOInterface;
use Composer\Plugin\PluginInterface;

class TemplateInstallerPlugin implements PluginInterface
{
    public function activate(Composer $composer, IOInterface $io)
    {
        $installer = new TemplateInstaller($io, $composer);
        $composer->getInstallationManager()->addInstaller($installer);
    }
}
```

## 事件处理器

此外，插件可以实现 [`Composer\EventDispatcher\EventSubscriberInterface`](https://github.com/composer/composer/blob/main/src/Composer/EventDispatcher/EventSubscriberInterface.php) 接口，以便在插件加载时将其事件处理器自动注册到 `EventDispatcher`。

要将方法注册到事件，请实现 `getSubscribedEvents()` 方法并让它返回一个数组。数组键必须是[事件名称](./scripts.md#event-names)，值是要调用的类中方法的名称。

> [!NOTE] 注意
> 如果你不知道要监听哪个事件，可以运行带有 COMPOSER_DEBUG_EVENTS=1 环境变量设置的 Composer 命令，这可能有助于你识别要查找的事件。

```php
public static function getSubscribedEvents()
{
    return array(
        'post-autoload-dump' => 'methodToBeCalled',
        // ^ 事件名称 ^            ^ 方法名称 ^
    );
}
```

默认情况下，事件处理器的优先级设置为 0。可以通过附加一个元组来更改优先级，其中第一个值是方法名称，第二个值是表示优先级的整数。更高的整数代表更高的优先级。优先级 2 在优先级 1 之前调用，以此类推。

```php
public static function getSubscribedEvents()
{
    return array(
        // 将在优先级为 0 的事件之前调用
        'post-autoload-dump' => array('methodToBeCalled', 1)
    );
}
```

如果应该调用多个方法，则可以将元组数组附加到每个事件。元组不需要包含优先级。如果省略，将默认为 0。

```php
public static function getSubscribedEvents()
{
    return array(
        'post-autoload-dump' => array(
            array('methodToBeCalled'      ), // 优先级默认为 0
            array('someOtherMethodName', 1), // 这个先触发
        )
    );
}
```

这是一个完整的示例：

```php
<?php

namespace Naderman\Composer\AWS;

use Composer\Composer;
use Composer\EventDispatcher\EventSubscriberInterface;
use Composer\IO\IOInterface;
use Composer\Plugin\PluginInterface;
use Composer\Plugin\PluginEvents;
use Composer\Plugin\PreFileDownloadEvent;

class AwsPlugin implements PluginInterface, EventSubscriberInterface
{
    protected $composer;
    protected $io;

    public function activate(Composer $composer, IOInterface $io)
    {
        $this->composer = $composer;
        $this->io = $io;
    }

    public function deactivate(Composer $composer, IOInterface $io)
    {
    }

    public function uninstall(Composer $composer, IOInterface $io)
    {
    }

    public static function getSubscribedEvents()
    {
        return array(
            PluginEvents::PRE_FILE_DOWNLOAD => array(
                array('onPreFileDownload', 0)
            ),
        );
    }

    public function onPreFileDownload(PreFileDownloadEvent $event)
    {
        $protocol = parse_url($event->getProcessedUrl(), PHP_URL_SCHEME);

        if ($protocol === 's3') {
            // ...
        }
    }
}
```

## 插件功能

Composer 定义了一套标准功能，插件可以实现这些功能。其目标是通过为常见的插件需求提供明确的扩展点，减少对 [`Composer\Composer`](https://github.com/composer/composer/blob/main/src/Composer/Composer.php) 内部状态的干扰，从而使插件生态系统更加稳定。

具备功能的插件类必须实现 [`Composer\Plugin\Capable`](https://github.com/composer/composer/blob/main/src/Composer/Plugin/Capable.php) 接口，并在 `getCapabilities()` 方法中声明其功能。该方法必须返回一个数组，其中 _key_ 为 Composer 功能类名，_value_ 为插件对该功能的实现类名：

```php
<?php

namespace My\Composer;

use Composer\Composer;
use Composer\IO\IOInterface;
use Composer\Plugin\PluginInterface;
use Composer\Plugin\Capable;

class Plugin implements PluginInterface, Capable
{
    public function activate(Composer $composer, IOInterface $io)
    {
    }

    public function getCapabilities()
    {
        return array(
            'Composer\Plugin\Capability\CommandProvider' => 'My\Composer\CommandProvider',
        );
    }
}
```

### 命令提供者

[`Composer\Plugin\Capability\CommandProvider`](https://github.com/composer/composer/blob/main/src/Composer/Plugin/Capability/CommandProvider.php) 功能允许为 Composer 注册额外的命令：

```php
<?php

namespace My\Composer;

use Composer\Plugin\Capability\CommandProvider as CommandProviderCapability;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Composer\Command\BaseCommand;

class CommandProvider implements CommandProviderCapability
{
    public function getCommands()
    {
        return array(new Command);
    }
}

class Command extends BaseCommand
{
    protected function configure(): void
    {
        $this->setName('custom-plugin-command');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $output->writeln('Executing');

        return 0;
    }
}
```

现在 `custom-plugin-command` 命令可以与 Composer 命令一起使用了。

> _Composer命令基于 [Symfony Console Component](https://symfony.com/doc/current/components/console.html)。_

## 手动运行插件

事件的插件可以通过 `run-script` 命令手动运行。这与 [手动运行脚本](scripts.md#running-scripts-manually) 的方式相同。

如果是其他类型的插件，最好的测试方式可能是使用 [path repository](../repositories.md#path) 在测试项目中引入插件。如果你在本地开发并希望频繁测试，可以确保路径仓库使用符号链接，因为更改会立即更新。否则，每次你想重新安装/运行时都必须执行 `rm -rf vendor && composer update`。

## 使用插件

插件包一旦安装就会自动加载，并且如果在当前项目的已安装包列表中找到，将在 Composer 启动时加载。此外，使用 Composer 全局命令安装在 `COMPOSER_HOME` 目录中的所有插件包都会在本地项目插件加载之前加载。

> 你可以向 Composer 命令传递 `--no-plugins` 选项来禁用所有已安装的插件。如果任何插件导致错误并且你希望更新或卸载它，这可能特别有帮助。

## 插件助手

从 Composer 2 开始，由于 `DownloaderInterface` 有时会返回 `Promise` 并且被拆分成比以前更多的步骤，我们提供了一个 [异步助手 SyncHelper](https://github.com/composer/composer/blob/main/src/Composer/Util/SyncHelper.php) 来简化包的下载和安装。

## 插件额外属性

通过在插件的 `composer.json` 文件中使用额外属性，可以解锁一些特殊的插件功能。

### class

[请参见上文](#plugin-package)了解 `class` 属性的说明及其工作原理。

### plugin-modifies-downloads

某些特殊插件需要在包下载之前更新包的下载 URL。

从 Composer 2.0 开始，所有包都会在安装之前被下载。这意味着在首次安装时，当下载发生时你的插件尚未安装，因此无法及时更新 URL。

在你的 `composer.json` 中指定 `{"extra": {"plugin-modifies-downloads": true}}` 会提示 Composer 在继续下载其他包之前，应该先单独安装该插件。不过这会稍微减慢整体安装过程，因此请不要在不绝对需要此功能的插件中使用它。

### plugin-modifies-install-path

某些特殊插件会修改包的安装路径。

从 Composer 2.2.9 开始，你可以在 `composer.json` 中指定 `{"extra": {"plugin-modifies-install-path": true}}`，以提示 Composer 应尽快激活插件，防止 Composer 假设包安装在与实际位置不同的地方而产生不良副作用。

### plugin-optional

由于 Composer 插件可用于执行安装可工作应用程序所必需的操作，例如修改存储路径文件的位置，意外跳过必需插件可能导致应用程序损坏。因此，在非交互模式下，如果新插件未列在 ["allow-plugins"](../config.md#allow-plugins) 中，Composer 将失败，以强制用户决定是否要执行该插件，避免静默失败。

从 Composer 2.5.3 开始，你可以在插件上使用设置 `{"extra": {"plugin-optional": true}}`，告诉 Composer 跳过该插件不会产生灾难性后果，如果该插件尚未列在 ["allow-plugins"](../config.md#allow-plugins) 中，则可以在非交互模式下安全地禁用它。Composer 的下一次交互式运行仍将提示用户选择是否启用或禁用该插件。

## 插件自动加载

由于插件是在 Composer 运行时加载的，并且为了确保依赖其他包的插件能够正常工作，每当插件加载时都会创建一个运行时自动加载器。该自动加载器仅配置为加载插件的依赖项，因此你可能无法访问所有已安装的包。

## 静态分析支持

从 Composer 2.3.7 开始，我们提供了一个 `phpstan/rules.neon` PHPStan 配置文件，在开发 Composer 插件时提供额外的错误检查。

### 与 [PHPStan Extension Installer](https://github.com/phpstan/extension-installer#usage) 一起使用

如果你的插件项目声明了对 `phpstan/extension-installer` 的依赖，必要的配置文件会自动加载。

### 替代的手动安装方式

要使用它，你的 Composer 插件项目需要一个 [PHPStan 配置文件](https://phpstan.org/config-reference#multiple-files)，其中包含 `phpstan/rules.neon` 文件：

```neon
includes:
	- vendor/composer/composer/phpstan/rules.neon

// 你的其余配置..
```
