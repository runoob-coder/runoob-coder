---
titleTemplate: Composer中文文档 - PHP 的依赖管理器 | PHP | noob-coder | 菜鸟码农
head:
  - - meta
    - name: keywords
      content: psr-4,自动加载,autoload,vendor,repositories,Packagist,composer.json,monolog/monolog,Composer,PHP,libraries,dependency,noob-coder,菜鸟码农
  - - meta
    - name: description
      content: 在本章节的基本用法介绍中，我们将安装 monolog/monolog —— 一个日志记录库。如果您还没有安装 Composer，请参考介绍章节。
---


# 基本用法 {#basic-usage}

## 介绍 {#introduction}

在本章节的基本用法介绍中，我们将安装 `monolog/monolog` —— 一个日志记录库。如果您还没有安装 `Composer`，请参考 [介绍](intro.md) 章节。

> [!NOTE] 注意 
> 为了简单起见，本介绍将假设您已经执行了 Composer 的 [本地](intro.md#locally) 安装。

## `composer.json`: 项目设置

要在你的项目中开始使用 `Composer`，你只需要一个 `composer.json` 文件。这个文件描述了你的项目的依赖关系，也可能包含其他元数据。它通常应该放在你的 项目/VCS 仓库的最顶层目录中。从技术上讲，你可以在任何地方运行 `Composer`，但如果你想将包发布到 [Packagist.org](https://packagist.org/)，它必须能够在你的 `VCS` 仓库的顶层目录找到这个文件。

### `require` 键

你在 `composer.json` 中指定的第一个内容是 [require](schema.md#require) 键。你通过这个键值告诉 `Composer` 你的项目依赖于哪些包。

```json
{
    "require": {
        "monolog/monolog": "2.0.*"
    }
}
```

如你所见，[require](schema.md#require) 接受一个对象，该对象将**包名称**（例如 `monolog/monolog`）映射到**版本约束**（例如 `1.0.*`）。

`Composer` 使用你在 [`repositories`](schema.md#repositories) 键中注册的包"仓库"信息，或者在 [Packagist.org](https://packagist.org)（默认的包仓库）中搜索正确的文件集。在上面的示例中，由于 `composer.json` 文件中没有注册其他仓库，因此假定 `monolog/monolog` 包已在 [Packagist.org](https://packagist.org/packages/monolog/monolog) 上注册。（了解更多关于 [Packagist](#packagist) 和关于 [repositories](repositories.md) 的信息）。

### 包名

包名由供应商名称和项目名称组成。通常容易产生相同的项目名称 —— 供应商名称的存在只是为了防止命名冲突。例如，它允许两个不同的人创建一个名为 `json` 的库。一个可能命名为 `igorw/json`，而另一个可能命名为 `seldaek/json`。

了解更多关于 [发布包和包命名](libraries.md) 的信息。（注意，你也可以指定"平台包"作为依赖项，允许你要求特定版本的服务器软件。请参见下面的 [平台包](#platform-packages)。）

### 包版本约束

在我们的示例中，我们要求 Monolog 包的版本约束为 [`2.0.*`](https://semver.madewithlove.com/?package=monolog%2Fmonolog&constraint=2.0.*)。它表示 `2.0` 开发分支中的任何版本，或者大于等于 2.0 且小于 2.1 的版本（`>=2.0 <2.1`）。

请阅读 [版本章节](articles/versions.md) 了解有关版本管理、版本间关系以及版本约束的详细信息。

> [!NOTE] Composer 是如何下载正确文件的？
> 
> 当你在 c`omposer.json` 中指定一个依赖项时，Composer 首先获取你请求的包名称，并在你使用 `repositories` 键注册的任何仓库中搜索它。如果你没有注册任何额外的仓库，或者在你指定的仓库中找不到该名称的包，它会回退到 Packagist.org（[详见下文](#packagist)）。 
> 
> 当 Composer 在 Packagist.org 或你指定的仓库中找到正确的包时，它会使用该包的 VCS（即分支和标签）的版本功能，尝试找到与你指定的版本约束最佳匹配的版本。请务必阅读 [版本章节](articles/versions.md) 中关于版本和包解析的内容。
>

> [!NOTE] 注意
> 如果你尝试引入一个包但 Composer 抛出关于包稳定性的错误，可能是因为你指定的版本不符合你的默认最低稳定性要求。默认情况下，在你的 VCS 中搜索有效包版本时，只考虑稳定版本。
> 
> 如果你尝试引入包的 dev、alpha、beta 或 RC 版本，可能会遇到这种情况。更多关于稳定性标志和 `minimum-stability` 键的信息，请参阅 [schema](schema.md) 规则章节。

## 安装依赖

要初始安装项目中定义的依赖项，你应该运行 [update](cli.md#update-u) 命令。

```shell
php composer.phar update
```

这将使 Composer 做两件事：

- 它会解析你在 `composer.json` 文件中列出的所有依赖项，并将所有包及其确切版本写入 `composer.lock` 文件，将项目锁定到这些特定版本。你应该将 `composer.lock` 文件提交到你的项目仓库中，这样所有参与项目的人员都会使用相同版本的依赖项（详见下文）。这是 `update` 命令的主要作用。

- 然后它会隐式运行 [`install`](cli.md#install-i) 命令。这会将依赖项的文件下载到你项目中的 `vendor` 目录。（`vendor` 目录是项目中放置所有第三方代码的常规位置）。在我们上面的示例中，你会在 `vendor/monolog/monolog/` 中得到 Monolog 的源文件。由于 Monolog 依赖于 [`psr/log`](https://packagist.org/packages/psr/log)，该包的文件也可以在 `vendor/` 中找到。

> [!TIP] 提示
> 如果你在项目中使用 `git`，你可能想要在 `.gitignore` 中添加 vendor。你真的不希望将所有这些第三方代码添加到你的版本仓库中。
> 
> **译者注**：同理，如果你使用 `svn`，请将 vendor 添加到主目录的 `svn:ignore` 属性中。

### 将你的 `composer.lock` 文件提交到版本控制 {#commit-your-composer-lock-file-to-version-control}

**将此文件提交到版本控制非常重要**，因为它将使任何设置项目的人使用与你正在使用的依赖项完全相同的版本。你的 CI 服务器、生产服务器、团队中的其他开发人员，所有的一切和每个人都在使用相同的依赖项，这减轻了只影响部署某些部分的潜在错误。即使你独自开发，六个月后重新安装项目时，你也可以确信安装的依赖项仍在正常工作，即使依赖项在此期间发布了许多新版本。（请参阅下面关于使用 `update` 命令的说明。）

> [!NOTE] 注意
> 对于库（包）来说，提交 lock 文件不是必需的，另请参见：[库 - Lock 文件](libraries.md#lock-file)。

### 从 `composer.lock` 安装

如果项目文件夹中已经存在 `composer.lock` 文件，这意味着要么你之前运行过 `update` 命令，要么项目中的其他人运行过 `update` 命令并将 `composer.lock` 文件提交到了项目中（这是好事）。

无论哪种情况，当存在 `composer.lock` 文件时运行 `install` 命令，会解析并安装你在 `composer.json` 中列出的所有依赖项，但 Composer 会使用 `composer.lock` 中列出的确切版本，以确保项目中每个工作的人都使用一致的包版本。因此，你将拥有 `composer.json` 文件要求的所有依赖项，但它们可能不是最新的可用版本（`composer.lock` 文件中列出的一些依赖项可能在文件创建后发布了更新的版本）。这是设计上的考虑，确保你的项目不会因为依赖项的意外更改而损坏。

所以在从你的 VCS 仓库获取新更改后，建议运行 Composer `install` 命令，以确保 vendor 目录与你的 `composer.lock` 文件保持同步。

```shell
php composer.phar install
```

Composer 默认启用可重现构建。这意味着多次运行相同命令将产生包含文件的 `vendor/` 目录，这些文件是相同的（**除了时间戳**），包括自动加载器（autoloader）文件。这对于需要严格验证过程的环境特别有益，也适用于旨在以安全和可预测方式打包 PHP 应用程序的 Linux 发行版。

## 更新依赖到最新版本

如上所述，`composer.lock` 文件会阻止你自动获取依赖项的最新版本。要更新到最新版本，请使用 [update](cli.md#update-u) 命令。这将获取最新的匹配版本（根据你的 `composer.json` 文件）并用新版本更新 lock 文件。

```shell
php composer.phar update
```

> [!NOTE] 注意
> 如果自 composer.json 文件发生可能影响依赖解析的更改以来，`composer.lock` 文件尚未更新，Composer 在执行 `install` 命令时将显示警告。

> [!WARNING]
> The lock file is not up to date with the latest changes in composer.json. You may be getting outdated dependencies. It is recommended that you run `composer update` or `composer update <package name>`.

如果你只想安装、升级或移除一个依赖项，可以明确地将其作为参数列出：

```shell
php composer.phar update monolog/monolog [...]
```

## Packagist


[Packagist.org](https://packagist.org/) 是主要的 Composer 仓库。Composer 仓库基本上就是一个包的来源：你可以从中获取包的地方。Packagist 旨在成为每个人都使用的中央仓库。这意味着你可以自动 `require`（引入）那里可用的任何包，而无需进一步指定 Composer 应该在哪里寻找包。

如果你访问 [Packagist.org 网站](https://packagist.org/)，你可以浏览和搜索包。

建议任何使用 Composer 的开源项目将其包发布到 Packagist 上。库不一定需要发布在 Packagist 上也能被 Composer 使用，但在 Packagist 上能帮助其他开发者更快地发现和采用。

## 平台包 {#platform-packages}

Composer 有平台包，这些是针对系统上已安装但无法通过 Composer 实际安装的组件的**虚拟包**。这包括 PHP 本身、PHP 扩展和一些系统库。

- `php` 代表用户的 PHP 版本，允许你应用约束条件，例如 `^7.1`。要使用 64 位版本的 PHP，你可以引入 `php-64bit` 包。

- `hhvm` 代表 HHVM 运行时的版本，允许你应用约束条件，例如 `^2.3`。

- `ext-<name>` 允许你引入 PHP 扩展（包括核心扩展）。这里的版本控制可能相当不一致，所以通常建议将约束条件设置为 `*`。PHP 扩展包的一个示例是 `ext-gd`。

- `lib-<name>` 允许对 PHP 使用的库版本进行约束。以下是可用的库：`curl`、`iconv`、`icu`、`libxml`、`openssl`、`pcre`、`uuid`、`xsl`。

你可以使用 [`show --platform`](cli.md#show) 来获取本地可用平台包的列表。

## 自动加载 {#autoloading}

对于指定了自动加载信息的库，Composer 会生成一个 `vendor/autoload.php` 文件。你可以引入这个文件，然后直接开始使用这些库提供的类，无需任何额外的操作：

```php
require __DIR__ . '/vendor/autoload.php';

$log = new Monolog\Logger('name');
$log->pushHandler(new Monolog\Handler\StreamHandler('app.log', Monolog\Logger::WARNING));
$log->warning('Foo');
```

你甚至可以通过在 `composer.json` 中添加 [`autoload`](schema.md#autoload) 字段来将你自己的代码添加到自动加载器中：

```json
{
    "autoload": {
        "psr-4": {"Acme\\": "src/"}
    }
}
```

Composer 将为 `Acme` 命名空间注册一个 [PSR-4](https://www.php-fig.org/psr/psr-4/) 自动加载器。

你定义从命名空间到目录的映射。`src` 目录应该在你的项目根目录中，与 `vendor` 目录处于同一层级。比如文件名为 `src/Foo.php`，其中包含 `Acme\Foo` 类。

添加 [`autoload`](schema.md#autoload) 字段后，你必须重新运行以下命令：

```shell
php composer.phar dump-autoload
```

该命令将重新生成 `vendor/autoload.php` 文件。更多信息请参见 [`dump-autoload`](cli.md#dump-autoload-dumpautoload) 章节。

引入该文件也会返回自动加载器实例，因此你可以将 include 调用的返回值存储在变量中并添加更多命名空间。例如，这在测试套件中自动加载类时非常有用：

```php
$loader = require __DIR__ . '/vendor/autoload.php';
$loader->addPsr4('Acme\\Test\\', __DIR__);
```

除了 PSR-4 自动加载外，Composer 还支持 PSR-0、类映射（classmap）和文件（files）自动加载。更多信息请参见 [`autoload`](schema.md#autoload) 参考文档。

另请参阅关于 [优化自动加载器](articles/autoloader-optimization.md) 的文档。

> [!NOTE] 注意
> Composer 提供了自己的自动加载器。如果你不想使用这个自动加载器，可以引入 `vendor/composer/autoload_*.php` 文件，这些文件会返回关联数组，允许你配置自己的自动加载器。
