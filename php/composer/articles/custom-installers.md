---
titleTemplate: 相关文章 | Composer中文文档 - PHP 的依赖管理器 | PHP | noob-coder | 菜鸟码农
head:
  - - meta
    - name: keywords
      content: LibraryInstaller,isInstalled,getInstallPath,PluginInterface,composer-plugin,InstallerInterface,composer.json,phpdocumentor-template,getInstalledPackagesByType,vendor,Composer,依赖管理器,PHP,libraries,dependency,noob-coder,菜鸟码农
  - - meta
    - name: description
      content: 修改特定类型包的安装方式
---

# 设置和使用自定义安装器

## 概述

有时，包在安装过程中可能需要额外的操作，例如将包安装到默认的 `vendor` 库之外的位置。

在这种情况下，你可以考虑创建一个自定义安装器来处理特定的逻辑。

## Composer 2.1+ 自定义安装器的替代方案

从 Composer 2.1 版本开始，`Composer\InstalledVersions` 类提供了一个 [`getInstalledPackagesByType`](../runtime.md#knowing-which-packages-of-a-given-type-are-installed) 方法，该方法可以让你在运行时确定哪些插件/模块/扩展已被安装。

如果你正在构建新应用，强烈建议使用该方法而不是构建新的自定义安装器。这样做有一个优势：可以将所有供应商代码保留在 vendor 目录中，而不需要自定义安装器代码。

## 调用自定义安装器

假设你的项目已经为特定模块提供了自定义安装器，那么调用该安装器只需在你的包文件中定义正确的 [type](../schema.md#type) 即可。

> _有关如何创建自定义安装器的说明，请参见下一章。_

每个自定义安装器都会定义它能识别的 [type](../schema.md#type) 字符串。一旦被识别，它将完全覆盖默认安装器，仅应用自己的逻辑。

一个使用示例：

> phpDocumentor 提供了需要安装在默认 /vendor 文件夹结构之外的模板。因此，他们选择采用 `phpdocumentor-template`  [type](../schema.md#type)，并创建了一个插件来提供自定义安装器，将这些模板发送到正确的文件夹。

这样的模板包的示例 `composer.json` 如下：

```json
{
    "name": "phpdocumentor/template-responsive",
    "type": "phpdocumentor-template",
    "require": {
        "phpdocumentor/template-installer-plugin": "*"
    }
}
```

> [!NOTE] 注意
> 为确保在安装模板包时模板安装器存在，模板包应该依赖相应的插件包。

## 创建安装器

自定义安装器被定义为一个实现 [`Composer\Installer\InstallerInterface`](https://github.com/composer/composer/blob/main/src/Composer/Installer/InstallerInterface.php) 接口的类，通常以 Composer 插件的形式分发。

一个基本的安装器插件由以下三个文件组成：

1. 包文件：`composer.json`
2. 插件类，例如：`My\Project\Composer\Plugin.php`，包含一个实现 `Composer\Plugin\PluginInterface` 接口的类。
3. 安装器类，例如：`My\Project\Composer\Installer.php`，包含一个实现 `Composer\Installer\InstallerInterface` 接口的类。

### composer.json

包文件与任何其他包文件相同，但需满足以下要求：

1. [type](../schema.md#type) 属性必须为 `composer-plugin`。
2. [extra](../schema.md#extra) 属性必须包含一个 `class` 元素，用于定义插件的类名（包括命名空间）。如果一个包包含多个插件，这可以是一个类名数组。

示例：

```json
{
    "name": "phpdocumentor/template-installer-plugin",
    "type": "composer-plugin",
    "license": "MIT",
    "autoload": {
        "psr-0": {"phpDocumentor\\Composer": "src/"}
    },
    "extra": {
        "class": "phpDocumentor\\Composer\\TemplateInstallerPlugin"
    },
    "require": {
        "composer-plugin-api": "^1.0"
    },
    "require-dev": {
        "composer/composer": "^1.3"
    }
}
```

上面的示例在 `require-dev` 中包含了 Composer 本身，例如，这使得你可以在测试套件中使用 Composer 类。

### 插件类

定义 Composer 插件的类必须实现 [`Composer\Plugin\PluginInterface`](https://github.com/composer/composer/blob/main/src/Composer/Plugin/PluginInterface.php) 接口。然后可以在其 `activate()` 方法中注册自定义安装器。

该类可以放置在任何位置并使用任何名称，只要它是可自动加载的，并且与包定义中的 `extra.class` 元素匹配即可。

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

### 自定义安装器类

执行自定义安装的类应该实现 [`Composer\Installer\InstallerInterface`](https://github.com/composer/composer/blob/main/src/Composer/Installer/InstallerInterface.php) 接口（或扩展另一个实现该接口的安装器）。它在 `supports()` 方法中定义了将被使用此安装器的包所识别的 [type](../schema.md#type) 字符串。

> [!NOTE] 注意
> _请仔细选择你的 [type](../schema.md#type) 名称，建议遵循格式：`vendor-type`_。例如：`phpdocumentor-template`。

`InstallerInterface` 类定义了以下方法（请查看源代码获取确切签名）：

* **supports()**，在这里测试传入的 [type](../schema.md#type) 是否与你为此安装器声明的名称匹配（参见示例）。
* **isInstalled()**，确定支持的包是否已安装。
* **install()**，在这里可以确定安装时需要执行的操作。
* **update()**，在这里定义当使用 update 参数调用 Composer 时所需的行为。
* **uninstall()**，在这里可以确定当包被移除时需要执行的操作。
* **getInstallPath()**，此方法应返回包将要安装的绝对路径。路径 _不能以斜杠结尾_。

示例：

```php
<?php

namespace phpDocumentor\Composer;

use Composer\Package\PackageInterface;
use Composer\Installer\LibraryInstaller;

class TemplateInstaller extends LibraryInstaller
{
    /**
     * @inheritDoc
     */
    public function getInstallPath(PackageInterface $package)
    {
        $prefix = substr($package->getPrettyName(), 0, 23);
        if ('phpdocumentor/template-' !== $prefix) {
            throw new \InvalidArgumentException(
                'Unable to install template, phpdocumentor templates '
                .'should always start their package name with '
                .'"phpdocumentor/template-"'
            );
        }

        return 'data/templates/'.substr($package->getPrettyName(), 23);
    }

    /**
     * @inheritDoc
     */
    public function supports($packageType)
    {
        return 'phpdocumentor-template' === $packageType;
    }
}
```

该示例演示了可以扩展 [`Composer\Installer\LibraryInstaller`](https://github.com/composer/composer/blob/main/src/Composer/Installer/InstallerInterface.php) 类来去除前缀（`phpdocumentor/template-`），并使用剩余部分来组装一个完全不同的安装路径。

> _使用此安装器安装的包将不会被安装在 `/vendor` 目录中，而是会被放置在 `/data/templates/<去除前缀后的名称>` 文件夹中。_
