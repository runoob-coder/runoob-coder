---
titleTemplate: Composer中文文档 - PHP 的依赖管理器 | PHP | noob-coder | 菜鸟码农
head:
  - - meta
    - name: keywords
      content: non-feature-branches,comment,abandoned,archive,bin,extra,scripts,config,repositories,prefer-stable,minimum-stability,target-dir,include-path,优化自动加载器,classmap,自动加载器,PSR-0,PSR-4,autoload,suggest,provide,replace,conflict,require-dev,require,包链接,Package links,funding,support,authors,LGPL,GPL,BSD,Apache,MIT,许可证,license,time,Packagist,Packagist.org,GitHub,README.md,readme,homepage,keywords,php-ext-zend,php-ext,composer-plugin,metapackage,project,library,type,RC,beta,alpha,patch,version,description,name,properties,root-only（仅根包）,root-package,根包,composer.json,Composer,PHP,libraries,dependency,noob-coder,菜鸟码农
---

# composer.json 架构

本章将解释 `composer.json` 中所有可用的字段。

## JSON 架构

我们有一个 [JSON 架构](https://json-schema.org)，用于记录格式规范并可用来验证你的 `composer.json` 文件。实际上，`validate` 命令就是基于此架构实现的。你可以通过以下链接获取该架构文件：https://getcomposer.org/schema.json

## 根包 {#root-package}

根包是由项目根目录下的 `composer.json` 定义的包。它是定义项目需求的主要 composer.json。

某些字段仅在根包上下文中适用。其中一个例子是 `config` 字段。只有根包可以定义配置。依赖项的配置会被忽略。这使得 `config` 字段成为 `root-only（仅根包）` 字段。

> [!NOTE] 注意
> 一个包是否为根包取决于上下文。 例如，如果你的项目依赖于 `monolog` 库，那么你的项目就是根包。但是，如果你从 GitHub 克隆 `monolog` 来修复其中的错误，那么 `monolog` 就是根包。

## 属性 {#properties}

### name

包的名称。它由供应商名称和项目名称组成，用 `/` 分隔。例如：

* monolog/monolog
* igorw/event-source
* noob-coder/blog

名称必须是小写字母，由 `-`、`.` 或 `_` 分隔的单词组成。 完整名称应匹配正则表达式 `^[a-z0-9]([_.-]?[a-z0-9]+)*/[a-z0-9](([_.]|-{1,2})?[a-z0-9]+)*$`。

对于发布的包（库）来说，`name` 属性是必需的。

> [!NOTE] 注意
> 在 Composer 2.0 版本之前，名称可以包含任何字符，包括空格。

### description

包的简短描述。通常是一行长度。

对于发布的包（库）来说是必需的。

### version

包的版本。在大多数情况下这不是必需的，应该省略（见下文）。

版本号必须遵循 `X.Y.Z` 或 `vX.Y.Z` 的格式，可选的后缀为 `-dev`、`-patch`（`-p`）、`-alpha`（`-a`）、`-beta`（`-b`）或 `-RC`。patch、alpha、beta 和 RC 后缀后面也可以跟一个数字。

示例：

- 1.0.0
- 1.0.2
- 1.1.0
- 0.2.5
- 1.0.0-dev
- 1.0.0-alpha3
- 1.0.0-beta2
- 1.0.0-RC5
- v2.0.4-p1

如果包仓库可以从某处推断出版本，则为可选，例如 VCS 仓库中的 VCS 标签名。在这种情况下也建议省略它。

> [!NOTE] 注意
> Packagist 使用 VCS 仓库，所以上述声明对 Packagist 也非常适用。自己指定版本很可能会因为人为错误而在某个时候产生问题。

### type

包的类型。默认为 `library`。

包类型用于自定义安装逻辑。如果你有一个需要特殊逻辑的包，你可以定义一个自定义类型。这可以是 `symfony-bundle`、`wordpress-plugin` 或 `typo3-cms-extension`。这些类型都特定于某些项目，它们需要提供一个能够安装该类型包的安装程序。

Composer 开箱即支持以下几种类型：

- **library：** 这是默认类型。它会将文件复制到 `vendor` 目录。
- **project：** 这表示是一个项目而不是库。例如 [Symfony 标准版](https://github.com/symfony/symfony-standard) 这样的应用程序框架，[Silverstripe 安装程序](https://github.com/silverstripe/silverstripe-installer) 这样的 CMS，或者作为包分发的完整应用程序。例如，IDE 可以使用此类型在创建新工作区时提供项目初始化列表。
- **metapackage：** 一个空包，包含依赖引入并会触发它们的安装，但不包含任何文件，也不会向文件系统写入任何内容。因此，它不需要 dist 或 source 键即可安装。
- **composer-plugin：** 类型为 `composer-plugin` 的包可以为其他具有自定义类型的包提供安装程序。更多详情请参阅 [这篇文章](articles/custom-installers.md)。
- **php-ext** 和 **php-ext-zend**：这些名称保留给用 C 语言编写的 PHP 扩展包。不要将这些类型用于用 PHP 语言编写的包。

只有在安装过程中需要自定义逻辑时才使用自定义类型。建议省略此字段，让它默认为 `library`。

### keywords

一个包含与包相关的关键词的数组。这些关键词可以用于搜索和过滤。

示例：

- logging
- events
- database
- redis
- templating

> [!NOTE] 注意
> 某些特殊关键词会在执行 composer require 命令（不带 --dev 选项）时触发，提示用户是否要将这些包添加到 `require-dev` 而不是 `require` 中。这些关键词包括：`dev`、`testing`、`static analysis`。

> [!NOTE] 注意
> 字符串中允许的字符范围限制为 Unicode 字母或数字、空格 `" "`、点号 `.`、下划线 `_` 和短横线 `-`。（正则表达式：`'{^[\p{N}\p{L} ._-]+$}u'`）
> 
> 使用其他字符在运行 `composer validate` 时会发出警告，并会导致包在 Packagist.org 上更新失败。

可选字段。

### homepage

项目的网站 URL 地址。

可选字段。

### readme

README 文档的相对路径。默认为 `README.md`。

这主要对非 GitHub 上的包有用，因为对于 GitHub 包，Packagist.org 将使用 README API 来获取 GitHub 检测到的 README 文件。

可选字段。

### time

版本的发布日期。

必须采用 UTC 时区的 `YYYY-MM-DD` 或 `YYYY-MM-DD HH:MM:SS` 格式。

可选字段。

### license

包的许可证。这可以是一个字符串或字符串数组。

以下是最常见许可证的推荐表示法（按字母顺序排列）：

- Apache-2.0
- BSD-2-Clause
- BSD-3-Clause
- BSD-4-Clause
- GPL-2.0-only / GPL-2.0-or-later
- GPL-3.0-only / GPL-3.0-or-later
- LGPL-2.1-only / LGPL-2.1-or-later
- LGPL-3.0-only / LGPL-3.0-or-later
- MIT

此字段是可选的，但强烈建议提供。更多标识符可以在 [SPDX 开源许可证注册表](https://spdx.org/licenses/) 中找到。

> [!NOTE] 注意
> 对于闭源软件，你可以使用 `"proprietary"` 作为许可证标识符。

示例：

```json
{
    "license": "MIT"
}
```

对于一个包，当存在许可证选择时（"析取许可证"），可以指定多个许可证作为数组。

析取许可证示例：

```json
{
    "license": [
        "LGPL-2.1-only",
        "GPL-3.0-or-later"
    ]
}
```

或者可以用"or"分隔并用括号括起来：

```json
{
    "license": "(LGPL-2.1-only or GPL-3.0-or-later)"
}
```

同样，当需要应用多个许可证时（"合取许可证"），应该用"and"分隔并用括号括起来。

### authors

包的作者。这是一个对象数组。

每个作者对象可以有以下属性：

* **name：** 作者的姓名。通常是他们的真实姓名。
* **email：** 作者的电子邮件地址。
* **homepage：** 作者网站的 URL。
* **role：** 作者在项目中的角色（例如开发者或翻译者等）

示例：

```json
{
    "authors": [
        {
            "name": "Nils Adermann",
            "email": "naderman@naderman.de",
            "homepage": "https://www.naderman.de",
            "role": "Developer"
        },
        {
            "name": "Jordi Boggiano",
            "email": "j.boggiano@seld.be",
            "homepage": "https://seld.be",
            "role": "Developer"
        },
        {
            "name": "noob-coder",
            "email": "noob-coder@qq.com",
            "homepage": "https://noob-coder.com",
            "role": "Translator"
        }
    ]
}
```

可选字段，**但强烈推荐填写**。

### support

关于项目支持的各种信息。

支持信息包括以下内容：

* **email：** 支持的电子邮件地址。
* **issues：** 问题跟踪器的 URL。
* **forum：** 论坛的 URL。
* **wiki：** Wiki 的 URL。
* **irc：** IRC 支持频道，格式为 irc://server/channel。
* **source：** 浏览或下载源码的 URL。
* **docs：** 文档的 URL。
* **rss：** RSS 订阅的 URL。
* **chat：** 聊天频道的 URL。
* **security：** 漏洞披露政策 (VDP) 的 URL。

示例：

```json
{
    "support": {
        "email": "support@example.org",
        "irc": "irc://irc.freenode.org/composer"
    }
}
```

可选字段。

### funding

一个 URL 列表，用于为包作者提供资金支持，以维护和开发新功能。

每个条目包含以下内容：

* **type：** 资助类型，或提供资助的平台，例如 patreon、opencollective、tidelift 或 github。
* **url：** 包含详细信息的网站 URL，以及资助包的方式。

示例：

```json
{
    "funding": [
        {
            "type": "patreon",
            "url": "https://www.patreon.com/phpdoctrine"
        },
        {
            "type": "tidelift",
            "url": "https://tidelift.com/subscription/pkg/packagist-doctrine_doctrine-bundle"
        },
        {
            "type": "other",
            "url": "https://www.doctrine-project.org/sponsorship.html"
        }
    ]
}
```

可选字段。

### Package links（包链接）{#package-links}

以下所有字段都接受一个对象，该对象通过版本约束将包名称映射到包的版本。有关版本的更多信息请参阅 [这里](articles/versions.md)。

示例：

```json
{
    "require": {
        "monolog/monolog": "1.0.*"
    }
}
```

所有链接都是可选字段。

`require` 和 `require-dev` 还额外支持 稳定性标志 [（仅限根包）](schema.md#root-package)。 它们采用 "约束@稳定性标志" 的形式。

这些标志允许你进一步限制或扩展包的稳定性，超出 [minimum-stability](schema.md#minimum-stability) 设置的范围。你可以将它们应用于约束，或者如果你想要允许依赖项的不稳定包，可以将它们应用于空的约束。

示例：

```json
{
    "require": {
        "monolog/monolog": "1.0.*@beta",
        "acme/foo": "@dev"
    }
}
```

如果你的某个依赖项依赖于一个不稳定的包，你需要明确地引入它，并附带足够的稳定性标志。

示例：

假设 `doctrine/doctrine-fixtures-bundle` 引入 `"doctrine/data-fixtures": "dev-master"`， 那么在根 `composer.json` 中你需要添加第二行来允许 `doctrine/data-fixtures` 包的开发版本：

```json
{
    "require": {
        "doctrine/doctrine-fixtures-bundle": "dev-master",
        "doctrine/data-fixtures": "@dev"
    }
}
```

`require` 和 `require-dev` 还额外支持对开发版本的显式引用（即提交哈希），以确保即使运行更新时它们也被锁定到给定状态。这些功能只有在你明确引入开发版本并在引用后附加 `#<ref>` 时才有效。这也是一个 [仅限根包](schema.md#root-package) 的功能，在依赖项中会被忽略。

示例：

```json
{
    "require": {
        "monolog/monolog": "dev-master#2eb0c0978d290a1c45346a1955188929cb4e5db7",
        "acme/foo": "1.0.x-dev#abc123"
    }
}
```

> [!WARNING] 注意 ⚠️
> 此功能有严重的技术限制，因为 composer.json 元数据仍将从你在哈希之前指定的分支名称中读取。因此，你应仅在开发过程中将此作为临时解决方案来修复即时问题，直到可以切换到标记版本。Composer 团队不会积极支持此功能，也不会接受与此相关的错误报告。

也可以内联别名包约束，使其匹配原本不会匹配的约束。更多信息请参阅 [别名](articles/aliases.md) 这遍文章。

`require` 和 `require-dev` 还支持引用特定的 PHP 版本和项目成功运行所需的 PHP 扩展。

示例：

```json
{
    "require": {
        "php": ">=7.4",
        "ext-mbstring": "*"
    }
}
```

> [!NOTE] 注意
> 列出项目所需的 PHP 扩展非常重要。
> 
> 并非所有 PHP 安装都相同：有些可能缺少你认为是标准的扩展（例如 `ext-mysqli` 在 Fedora/CentOS 最小安装系统中默认不安装）。未能列出所需的 PHP 扩展可能导致糟糕的用户体验：Composer 会毫无错误地安装你的包，但在运行时会失败。
> 
> `composer show --platform` 命令会列出系统上所有可用的 PHP 扩展。你可以使用它来帮助你编译所使用和需要的扩展列表。或者，你可以使用第三方工具来分析项目所使用的扩展列表。

#### require

此包所依赖的包映射。只有满足这些依赖引用时，包才会被安装。

#### require-dev ([仅限根包](schema.md#root-package)) {#require-dev-root-only}

开发此包或运行测试等所需的包映射。根包的开发依赖默认会被安装。

`install` 和 `update` 命令都支持 `--no-dev` 选项，该选项可以防止安装开发依赖。

#### conflict

与此包的此版本不兼容的包映射。这些包将不允许与你的包一起安装。

请注意，当在 `conflict` 链接中指定像 `<1.0 >=1.1` 这样的范围时，这将表示与所有小于 1.0 **并且** 大于等于 1.1 的版本同时冲突，这可能不是你想要的。在这种情况下，你可能想要使用 `<1.0 || >=1.1`。

#### replace

由此包替换的包映射。这允许你 fork 一个包，用不同的名称发布它并使用自己的版本号，而依赖原始包的包仍能正常使用你的 fork，因为它替换了原始包。

这对于包含子包的包也很有用，例如主包 symfony/symfony 包含所有 Symfony 组件，这些组件也可以作为独立包使用。如果你引入主包，它将自动满足各个独立组件的任何需求，因为它替换了它们。

在使用 replace 实现上述子包目的时需要谨慎。在这种情况下，你通常应该只使用 `self.version` 作为版本约束，以确保主包只替换该确切版本的子包，而不是其他版本，否则将是不正确的。

#### provide

由此包提供的包映射。这主要用于常见接口的实现。一个包可以依赖于某些虚拟包，例如 `psr/log-implementation`，任何实现此记录器接口的库都会在 `provide` 中列出它。实现者可以在 [Packagist.org](https://packagist.org/providers/psr/log-implementation) 上找到。

使用 `provide` 时，如果指定的是实际包的名称而不是虚拟包，这意味着该包的代码也会被一起提供，在这种情况下，`replace` 通常是更好的选择。对于提供接口并依赖其他包来提供实现的包（例如 PSR 接口），常见的约定是使用 `-implementation` 后缀来命名与接口包对应的虚拟包。

#### suggest

建议的包，可以增强或与该包良好协作。这些是信息性的，在包安装后显示，以提示用户可以添加更多包，即使它们不是必需的。

其格式与上面的包链接类似，但值是任意字符串，而不是版本约束。

示例：

```json
{
    "suggest": {
        "monolog/monolog": "Allows more advanced logging of the application flow",
        "ext-xml": "Needed to support XML format in class Foo"
    }
}
```

### autoload

PHP 自动加载器的自动加载映射。

支持 [`PSR-4`](https://www.php-fig.org/psr/psr-4/) 和 [`PSR-0`](http://www.php-fig.org/psr/psr-0/) 自动加载、`classmap` 生成和 `files` 包含。

PSR-4 是推荐的方式，因为它更易于使用（添加类时无需重新生成自动加载器）。

#### PSR-4

在 `psr-4` 键下，你可以定义从命名空间到路径的映射，路径是相对于包根目录的。当自动加载像 `Foo\\Bar\\Baz` 这样的类时，指向目录 `src/` 的命名空间前缀 `Foo\\` 意味着自动加载器会查找名为 `src/Bar/Baz.php` 的文件，如果存在则引入它。注意，与旧的 PSR-0 风格不同，前缀（`Foo\\`）在文件路径中是**不存在**的。

命名空间前缀必须以 `\\` 结尾，以避免相似前缀之间的冲突。例如，`Foo` 会匹配 `FooBar` 命名空间中的类，所以结尾的反斜杠解决了这个问题：`Foo\\` 和 `FooBar\\` 是不同的。

PSR-4 引用在安装/更新期间会被合并到一个单独的键值数组中，该数组可以在生成的文件 `vendor/composer/autoload_psr4.php` 中找到。

示例：

```json
{
    "autoload": {
        "psr-4": {
            "Monolog\\": "src/",
            "Vendor\\Namespace\\": ""
        }
    }
}
```

如果你需要在多个目录中搜索相同的前缀，可以将它们指定为数组，如下所示：

```json
{
    "autoload": {
        "psr-4": { "Monolog\\": ["src/", "lib/"] }
    }
}
```

如果你想要一个备用目录，在其中查找任何命名空间，可以使用空前缀，如下所示：

```json
{
    "autoload": {
        "psr-4": { "": "src/" }
    }
}
```

#### PSR-0

在 `psr-0` 键下，你可以定义从命名空间到路径的映射，路径是相对于包根目录的。注意，这也支持 PEAR 风格的非命名空间约定。

请注意，命名空间声明应该以 `\\ `结尾，以确保自动加载器能准确响应。例如 `Foo` 会匹配 `FooBar`，所以结尾的反斜杠解决了这个问题：`Foo\\` 和 `FooBar\\` 是不同的。

PSR-0 引用在安装/更新期间会被合并到一个单独的键值数组中，该数组可以在生成的文件 `vendor/composer/autoload_namespaces.php` 中找到。

示例：

```json
{
    "autoload": {
        "psr-0": {
            "Monolog\\": "src/",
            "Vendor\\Namespace\\": "src/",
            "Vendor_Namespace_": "src/"
        }
    }
}
```

如果你需要在多个目录中搜索相同的前缀，可以将它们指定为数组，如下所示：

```json
{
    "autoload": {
        "psr-0": { "Monolog\\": ["src/", "lib/"] }
    }
}
```

PSR-0 风格不仅限于命名空间声明，还可以指定到类级别。这对于全局命名空间中只有一个类的库很有用。如果 PHP 源文件也位于包的根目录中，例如，可以这样声明：

```json
{
    "autoload": {
        "psr-0": { "UniqueGlobalClass": "" }
    }
}
```

如果你想要一个备用目录，在其中可以放置任何命名空间，可以使用空前缀，如下所示：

```json
{
    "autoload": {
        "psr-0": { "": "src/" }
    }
}
```

#### Classmap

`classmap` 引用在安装/更新期间会被合并到一个单独的键值数组中，该数组可以在生成的文件 `vendor/composer/autoload_classmap.php` 中找到。这个映射是通过扫描给定目录/文件中的所有 `.php` 和 `.inc` 文件中的类来构建的。

你可以使用 classmap 生成支持来为所有不遵循 PSR-0/4 的库定义自动加载。要配置这个功能，你需要指定要搜索类的所有目录或文件。

示例：

```json
{
    "autoload": {
        "classmap": ["src/", "lib/", "Something.php"]
    }
}
```

classmap 路径中也支持通配符（`*`），并且会扩展为匹配任何目录名称：

示例：

```json
{
    "autoload": {
        "classmap": ["src/addons/*/lib/", "3rd-party/*", "Something.php"]
    }
}
```

#### Files

如果你想在每次请求时都明确地引入某些文件，那么你可以使用 `files` 自动加载机制。如果你的包包含一些 PHP 函数，而这些函数无法通过 PHP 自动加载，那么这个机制会很有用。

示例：

```json
{
    "autoload": {
        "files": ["src/MyLibrary/functions.php"]
    }
}
```

每当 `vendor/autoload.php` 被引入时，文件自动加载规则就会在自动加载器注册之后被包含进来。包含的顺序取决于包的依赖关系，因此如果包 A 依赖于包 B，那么包 B 中的文件会先被包含，以确保包 B 完全初始化并准备好在引入包 A 的文件时使用。

如果两个包具有相同数量的依赖项或者没有依赖项，则按字母顺序排列。

根包中的文件总是最后加载的，你不能使用文件自动加载来覆盖依赖项中的函数。如果你想实现这一点，我们建议你在引入 Composer 的 `vendor/autoload.php` 之前引入你自己的函数。

#### 从 classmaps 中排除文件 {#exclude-files-from-classmaps}

如果你想从类映射中排除一些文件或文件夹，可以使用 `exclude-from-classmap` 属性。

这在生产环境中排除测试类时很有用，因为这些文件即使在构建优化的自动加载器时也会被跳过。

类映射生成器会忽略这里配置路径中的所有文件。路径是相对于包根目录（即 composer.json 文件所在位置）的绝对路径，支持使用 `*` 匹配除斜杠外的任何字符，使用 `**` 匹配任何内容。`**` 会隐式添加到路径的末尾。

示例：

```json
{
    "autoload": {
        "exclude-from-classmap": ["/Tests/", "/test/", "/tests/"]
    }
}
```

#### 优化自动加载器 {#optimizing-the-autoloader}

自动加载器可能会对你的请求时间产生相当大的影响（在使用大量类的大型框架中，每个请求约 50-100 毫秒）。有关如何减少这种影响的更多详细信息，请参阅 [关于优化自动加载器的文章](articles/autoloader-optimization.md) 。

### autoload-dev ([仅根包](schema.md#root-package)) {#autoload-dev-root-only}

此部分允许为开发目的定义自动加载规则。

运行测试套件所需的类不应包含在主自动加载规则中，以避免在生产环境中和其他人将你的包作为依赖项使用时污染自动加载器。

因此，建议为单元测试设置专用路径，并在 autoload-dev 部分中进行配置。

示例：

```json
{
    "autoload": {
        "psr-4": { "MyLibrary\\": "src/" }
    },
    "autoload-dev": {
        "psr-4": { "MyLibrary\\Tests\\": "tests/" }
    }
}
```

### include-path

> [!WARNING] 已弃用 ⚠️
> 此功能仅用于支持旧项目，所有新代码应优先使用自动加载。因此这是一种已弃用的做法，但该功能本身不太可能从 Composer 中消失。

一个路径列表，这些路径应该被追加到 PHP 的 `include_path` 中。

示例：

```json
{
    "include-path": ["lib/"]
}
```

可选字段。

### target-dir

> [!WARNING] 已弃用 ⚠️
> 此功能仅用于支持旧的 PSR-0 风格自动加载，所有新代码应优先使用不带 target-dir 的 PSR-4，鼓励使用 PSR-0 和 PHP 命名空间的项目迁移到 PSR-4。

定义安装目录。

如果包根目录在命名空间声明之下，则无法正确自动加载。`target-dir` 解决了这个问题。

比如 Symfony，各个组件都有独立的包。Yaml 组件位于 `Symfony\Component\Yaml` 下。包根目录是 `Yaml` 目录。为了使自动加载成为可能，我们需要确保它不是安装到 `vendor/symfony/yaml`，而是安装到 `vendor/symfony/yaml/Symfony/Component/Yaml`，这样自动加载器才能从 `vendor/symfony/yaml` 加载它。

为此，`autoload` 和 `target-dir` 定义如下：

```json
{
    "autoload": {
        "psr-0": { "Symfony\\Component\\Yaml\\": "" }
    },
    "target-dir": "Symfony/Component/Yaml"
}
```

可选字段。

### minimum-stability ([仅根包](schema.md#root-package)) {#minimum-stability}

这定义了按稳定性过滤包的默认行为。默认为 `stable`，所以如果你依赖于 `dev` 包，你应该在文件中指定它以避免意外。

每个包的所有版本都会检查稳定性，当解析项目依赖关系时，那些稳定性低于 `minimum-stability` 设置的包将被忽略。（注意，你也可以在 `require` 块中指定的版本约束中使用稳定性标志来按包指定稳定性要求（更多详情请参见 [包链接](#package-links)）。

可用选项（按稳定性排序）有 `dev`、`alpha`、`beta`、`RC` 和 `stable`。

### prefer-stable ([仅根包](schema.md#root-package))

当启用此选项时，Composer 在可能找到兼容的稳定包时，会优先选择更稳定的包而不是不稳定的包。如果你需要一个开发版本或者某个包只有 alpha 版本可用，只要 minimum-stability 允许，这些版本仍然会被选择。

使用 `"prefer-stable": true` 来启用此功能。

### repositories ([仅根包](schema.md#root-package)) {#repositories}

自定义包仓库以供使用。

默认情况下，Composer 只使用 packagist 仓库。通过指定仓库，你可以从其他地方获取包。

仓库不会递归解析。你只能将它们添加到你的主 `composer.json` 中。依赖项的 `composer.json` 中的仓库声明会被忽略。

支持以下仓库类型：

* **composer：** Composer 仓库是一个通过网络（HTTP、FTP、SSH）提供的 `packages.json` 文件，其中包含带有额外 `dist` 和/或 `source` 信息的 `composer.json` 对象列表。`packages.json` 文件使用 PHP 流加载。你可以使用 `options` 参数在该流上设置额外选项。
* **vcs：** 版本控制系统仓库可以从 git、svn、fossil 和 hg 仓库中获取包。
* **package：** 如果你依赖的项目完全不支持 Composer，你可以使用 `package` 仓库内联定义包。你基本上是内联了 `composer.json` 对象。

有关这些的更多信息，请参见 [仓库](repositories.md)。

示例：

```json
{
    "repositories": [
        {
            "type": "composer",
            "url": "http://packages.example.com"
        },
        {
            "type": "composer",
            "url": "https://packages.example.com",
            "options": {
                "ssl": {
                    "verify_peer": "true"
                }
            }
        },
        {
            "type": "vcs",
            "url": "https://github.com/Seldaek/monolog"
        },
        {
            "type": "package",
            "package": {
                "name": "smarty/smarty",
                "version": "3.1.7",
                "dist": {
                    "url": "https://www.smarty.net/files/Smarty-3.1.7.zip",
                    "type": "zip"
                },
                "source": {
                    "url": "https://smarty-php.googlecode.com/svn/",
                    "type": "svn",
                    "reference": "tags/Smarty_3_1_7/distribution/"
                }
            }
        }
    ]
}
```

> [!NOTE] 注意
> 这里的顺序很重要。当查找包时，Composer 会从第一个仓库到最后一个仓库依次查找，并选择第一个匹配项。默认情况下 Packagist 被添加到最后，这意味着自定义仓库可以覆盖其中的包。

也可以使用 JSON 对象符号。但是，JSON 键/值对被认为是无序的，因此无法保证一致的行为，这种做法已被弃用（2.8.13版本起）。

```json
{
    "repositories": {
        "foo": {
            "type": "composer",
            "url": "http://packages.foo.com"
        }
    }
}
```

它将被 `name` 属性所取代：

```json
{
    "repositories": [
        {
            "name": "foo",
            "type": "composer",
            "url": "http://packages.foo.com"
        }
    ]
}
```

### config ([仅根包](schema.md#root-package))

一组配置选项。仅用于项目。有关每个单独选项的描述，请参见 [配置](config.md)。

### scripts ([仅根包](schema.md#root-package))

Composer 允许你通过使用脚本来 hook 到安装过程的各个部分。

有关事件详情和示例，请参见 [脚本](articles/scripts.md)。

### extra

供 `scripts` 使用的任意额外数据。

这可以是几乎任何内容。要从脚本事件处理程序中访问它，你可以这样做：

```php
$extra = $event->getComposer()->getPackage()->getExtra();
```

可选字段。

### bin

一组应被视为二进制文件并放入 `bin-dir`（来自配置）中的文件。

更多详情请参见 [供应商二进制文件](articles/vendor-binaries.md)。

可选字段。

### archive

用于创建包归档文件的一组选项。

支持以下选项：

* **name：** 允许配置归档文件的基名称。默认情况下（如果没有配置，并且命令行参数中没有传递 `--file`），会使用 `preg_replace('#[^a-z0-9-_]#i', '-', name)`。

示例：

```json
{
    "name": "org/strangeName",
    "archive": {
        "name": "Strange_name"
    }
}
```


* **exclude：** 允许配置排除路径的模式列表。模式语法与 .gitignore 文件匹配。开头的感叹号（!）将导致任何匹配的文件被包含，即使之前的模式排除了它们。开头的斜杠只会匹配项目相对路径的开头。星号不会扩展为目录分隔符。

示例：

```json
{
    "archive": {
        "exclude": ["/foo/bar", "baz", "/*.test", "!/foo/bar/baz"]
    }
}
```

该示例将包含 `/dir/foo/bar/file`、`/foo/bar/baz`、`/file.php`、`/foo/my.test`，但会排除 `/foo/bar/any`、`/foo/baz` 和 `/my.test`。

可选字段。

### abandoned

表示此包是否已被废弃。

它可以是布尔值，也可以是包名称/URL以指向推荐的替代方案。

示例：

使用 `"abandoned": true` 表示此包已被废弃。

使用 `"abandoned": "monolog/monolog"` 表示此包已被废弃，并且推荐的替代方案是 `monolog/monolog`。

默认为 false。

可选字段。

### _comment

顶级键，用于存放注释（可以是字符串或字符串数组）。

```json
{
    "_comment": [
        "The package foo/bar was required for business logic",
        "Remove package foo/baz when removing foo/bar"
    ]
}
```

默认为空。

可选字段。

### non-feature-branches

一个包含分支名称正则表达式模式的列表，这些分支名称是非数字的（例如 "latest" 或其他类似名称），这些分支将不会被当作功能分支处理。这是一个字符串数组。

如果你有非数字的分支名称，例如 "latest"、"current"、"latest-stable" 或其他不像版本号的名称，Composer 会将这些分支当作功能分支处理。这意味着它会搜索父分支，这些父分支看起来像版本号或者以特殊分支（如 master ）结束，根包的版本号会变成父分支的版本号，或者至少是 master 或其他特殊分支的版本号。

要将非数字命名的分支作为版本处理，而不是搜索具有有效版本或特殊分支名称（如 master ）的父分支，你可以为分支名称设置模式，这些分支名称应作为开发版本分支处理。

当你有依赖项使用 "self.version" 时，这非常有用，这样安装的就不是 dev-master，而是相同的分支（例如：latest-testing ）。

示例:

如果你有一个测试分支，在测试阶段被大量维护并部署到你的预发布环境中，通常 `composer show -s` 会返回 `versions : * dev-master` 给你 。

如果你像这样配置 `latest-.*` 作为非功能分支的模式：

```json
{
    "non-feature-branches": ["latest-.*"]
}
```

那么 `composer show -s` 会返回 `versions : * dev-latest-testing` 给你。

可选字段。

