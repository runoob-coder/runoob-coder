---
titleTemplate: Composer中文文档 - PHP 的依赖管理器 | PHP | noob-coder | 菜鸟码农
head:
  - - meta
    - name: description
      content: 本章将解释包和仓库的概念，介绍可用的仓库类型以及它们的工作原理。
  - - meta
    - name: keywords
      content: Packagist.org,Path,Artifact,Satis,Private Packagist,packagist,clearcache,git-bitbucket,Fossil,Mercurial,Subversion,Bitbucket,GitHub,私有仓库,VCS,PHP 上下文选项和参数,ext-curl,stream,cURL,providers-api,providers-url,provider-includes,available-package-patterns,available-packages,metadata-url,notify-batch,packages,source,dist,依赖管理器,包,package,仓库,repositories,Composer,PHP,libraries,dependency,noob-coder,菜鸟码农
---

# 仓库 {#repositories}

本章将解释包和仓库的概念，介绍可用的仓库类型以及它们的工作原理。

## 概念

在我们了解已有的不同类型的仓库之前，我们需要理解 Composer 构建的一些基本概念。

### 包 {#package}

Composer 是一个依赖管理器。它在本地安装包。包本质上是一个包含某些内容的目录。在这种情况下，它是 PHP 代码，但理论上它可以是任何东西。它包含一个包描述，其中有名称和版本。名称和版本用于标识包。

实际上，Composer 在内部将每个版本都视为一个单独的包。虽然在使用 Composer 时这种区别并不重要，但当你想要修改它时，这很重要。

除了名称和版本之外，还有有用的元数据。与安装最相关的信息是源定义，它描述了从哪里获取包内容。包数据指向包的内容。这里有两种选择：`dist` 和 `source`。

**Dist:** dist 是包数据的打包版本。通常是发布版本，通常是稳定版本。

**Source:** source 用于开发。这通常来自源代码仓库，如 git。当你想要修改下载的包时，可以获取这个。

包可以提供其中任何一个，甚至两者都可以。根据某些因素，如用户提供的选项和包的稳定性，其中一个将被优先选择。

### 仓库

仓库是包的来源。它是一个包/版本的列表。Composer 将在所有仓库中查找项目所需的包。

默认情况下，Composer 中只注册了 Packagist.org 仓库。你可以通过在 `composer.json` 中声明来向项目添加更多仓库。

仓库仅对根包可用，你在依赖项中定义的仓库将不会被加载。如果你想了解原因，请阅读 [FAQ 条目](faqs/why-cant-composer-load-repositories-recursively.md)。

在解析依赖关系时，包会从仓库中从上到下查找，默认情况下，一旦在某个仓库中找到包，Composer 就会停止在其他仓库中查找。更多详情以及如何更改此行为，请阅读 [仓库优先级](articles/repository-priorities.md) 文章。

## 仓库类型

### Composer

`composer` 是主要的仓库类型。它使用一个单独的 `packages.json` 文件，其中包含所有包的元数据。

这也是 packagist 使用的仓库类型。要引用一个 `composer` 仓库，需要提供 `packages.json` 文件之前的路径。对于 packagist，该文件位于 `/packages.json`，所以仓库的 URL 将是 `repo.packagist.org`。对于 `example.org/packages.json`，仓库 URL 将是 `example.org`。

```json
{
    "repositories": [
        {
            "type": "composer",
            "url": "https://example.org"
        },
        {
            "type": "composer",
            "url": "https://mirrors.tencent.com/composer"
        }
    ]
}
```

#### packages

唯一必需的字段是 `packages`。JSON 结构如下：

```json
{
    "packages": {
        "vendor/package-name": {
            "dev-master": { @composer.json },
            "1.0.x-dev": { @composer.json },
            "0.0.1": { @composer.json },
            "1.0.0": { @composer.json }
        }
    }
}
```

`@composer.json` 标记表示该包版本的 `composer.json` 内容，至少包括：

* name
* version
* dist 或 source

下面是一个最小化的包定义：

```json
{
    "name": "smarty/smarty",
    "version": "3.1.7",
    "dist": {
        "url": "https://www.smarty.net/files/Smarty-3.1.7.zip",
        "type": "zip"
    }
}
```

它可能包含 [架构](schema.md) 中指定的任何其他字段。

#### notify-batch

`notify-batch` 字段允许你指定一个 URL，每当用户安装包时都会调用该 URL。该 URL 可以是绝对路径（将使用与仓库相同的域名），也可以是完整的全路径 URL。

示例值：

```json
{
    "notify-batch": "/downloads/"
}
```

对于包含 `monolog/monolog` 包的 `example.org/packages.json`，这将向 `example.org/downloads/` 发送一个 POST 请求，请求体为以下 JSON：

```json
{
    "downloads": [
        {"name": "monolog/monolog", "version": "1.2.1.0"}
    ]
}
```

version 字段将包含版本号的规范化表示。

此字段是可选的。

#### metadata-url, available-packages 和 available-package-patterns

`metadata-url` 字段允许你提供一个 URL 模板，用于提供仓库中的所有包。它必须包含占位符 `%package%`。

这个字段是 Composer v2 中新增的，如果同时存在 `provider-includes` 和 `providers-url` 字段，该字段会被优先使用。为了兼容 Composer v1 和 v2，理想情况下你应该同时提供这两个字段。但新的仓库实现可能只需要支持 v2。

示例：

```json
{
    "metadata-url": "/p2/%package%.json"
}
```

每当 Composer 查找一个包时，它会将 `%package%` 替换为包名，并获取该 URL。如果允许该包的开发版本稳定性，它还会再次加载 URL，但这次是用 `$packageName~dev`（例如 `/p2/foo/bar~dev.json` 来查找 `foo/bar` 的开发版本）。

包含包版本的 `foo/bar.json` 和 `foo/bar~dev.json` 文件必须只包含 foo/bar 包的版本，格式为 `{"packages":{"foo/bar":[ ... versions here ... ]}}`。

缓存通过使用 [If-Modified-Since](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Reference/Headers/If-Modified-Since) 头部实现，所以请确保返回 [Last-Modified](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Reference/Headers/Last-Modified) 头部并且它们是准确的。

版本数组也可以选择性地使用 [composer/metadata-minifier](https://packagist.org/packages/composer/metadata-minifier) 中的 `Composer\MetadataMinifier\MetadataMinifier::minify()` 进行压缩。如果你这样做，应该在顶层添加 `"minified": "composer/2.0"` 键，以指示 Composer 必须将版本列表扩展回原始数据。示例请见 https://repo.packagist.org/p2/monolog/monolog.json。

任何不存在的请求包必须返回 404 状态码，这将向 Composer 表明该包在你的仓库中不存在。确保 404 响应快速返回，以避免阻塞 Composer。避免重定向到其他 404 页面。

如果你的仓库只有少量包，并且你想避免 404 请求，你也可以在 `packages.json` 中指定一个 `"available-packages"` 键，它应该是一个包含你的仓库中所有包名的数组。或者你可以指定一个 `"available-package-patterns"` 键，它是一个包名模式数组（`*` 匹配任何字符串，例如 `vendor/*` 会让 Composer 在这个仓库中查找每个匹配的包名）。

这个字段是可选的。

#### providers-api

`providers-api` 字段允许你提供一个 URL 模板，用于提供所有声明提供特定包名的包，但不包括具有该名称的实际包（即使存在）。它必须包含占位符 `%package%`。

例如 https://packagist.org/providers/psr/log-implementation.json 列出了具有一些 "provide" 规则的包，这些包声明提供 psr/log-implementation。

```json
{
    "providers-api": "https://packagist.org/providers/%package%.json"
}
```

#### list

`list` 字段允许你返回匹配给定过滤器的包名称（如果没有过滤器则返回所有名称）。它应该接受一个可选的 `?filter=xx` 查询参数，该参数可以包含 `*` 作为通配符来匹配任何子字符串。

在这里不应考虑替换/提供规则。

它必须返回一个包名称数组：

```json
{
    "packageNames": [
        "a/b",
        "c/d"
    ]
}
```

例如参见 <https://packagist.org/packages/list.json?filter=composer/*>。

此字段是可选的。

#### provider-includes 和 providers-url

`provider-includes` 字段允许你列出一组文件，这些文件包含了由此仓库提供的包名称列表。在这种情况下，哈希值应该是文件的 sha256 值。

`providers-url` 描述了在服务器上如何找到提供者文件。它是一个从仓库根目录开始的绝对路径。它必须包含占位符 `%package%` 和 `%hash%`。

这些字段被 Composer v1 使用，或者在你的仓库没有设置 `metadata-url` 字段时使用。

示例：

```json
{
    "provider-includes": {
        "providers-a.json": {
            "sha256": "f5b4bc0b354108ef08614e569c1ed01a2782e67641744864a74e788982886f4c"
        },
        "providers-b.json": {
            "sha256": "b38372163fac0573053536f5b8ef11b86f804ea8b016d239e706191203f6efac"
        }
    },
    "providers-url": "/p/%package%$%hash%.json"
}
```

这些文件包含包名称和哈希值列表，用于验证文件完整性，例如：

```json
{
    "providers": {
        "acme/foo": {
            "sha256": "38968de1305c2e17f4de33aea164515bc787c42c7e2d6e25948539a14268bb82"
        },
        "acme/bar": {
            "sha256": "4dd24c930bd6e1103251306d6336ac813b563a220d9ca14f4743c032fb047233"
        }
    }
}
```

上面的文件声明了 acme/foo 和 acme/bar 可以在这个仓库中找到，通过加载 `providers-url` 引用的文件，将 `%package%` 替换为带有供应商命名空间的包名，将 `%hash%` 替换为 sha256 字段。这些文件本身包含包定义，如[上面](#packages)所述。

这些字段是可选的。对于你自己的自定义仓库，你可能不需要它们。

#### cURL 或 stream 选项

仓库可以通过 cURL（使用 Composer 2 并启用 ext-curl 扩展）或 PHP 流来访问。你可以使用 options 参数设置额外的选项。对于 PHP 流，你可以设置任何有效的 PHP 流上下文选项。更多信息请参见 [PHP 上下文选项和参数](https://www.php.net/manual/zh/context.php)。当使用 cURL 时，只能配置有限的 http 和 ssl 选项。

```json
{
    "repositories": [
        {
            "type": "composer",
            "url": "https://example.org",
            "options": {
                "http": {
                    "timeout": 60
                }
            }
        }
    ],
    "require": {
        "acme/package": "^1.0"
    }
}
```

### VCS

VCS 是版本控制系统（Version Control System）的缩写。这包括像 git、svn、fossil 或 hg 这样的版本控制系统。Composer 有一种仓库类型，可以从这些系统中安装包。

#### 从 VCS 仓库中加载包

这里有几种使用场景。最常见的一种是维护第三方库的自己的分支。如果你在项目中使用某个库，并且决定在该库中修改一些内容，你会希望你的项目使用修补后的版本。如果该库在 GitHub 上（大多数情况下都是这样），你可以在那里 fork 它并将你的更改推送到你的 fork 仓库。之后你更新项目的 `composer.json`。你只需要做的就是将你的 fork 添加为仓库，并更新版本约束指向你的自定义分支。在 `composer.json` 中，你应该为你的自定义分支名加上前缀 `"dev-"`（不要将其作为实际分支名的一部分）。有关版本约束命名约定的更多信息，请参见 [库（资源包）](libraries.md)。

假设你在 monolog 的 `bugfix` 分支中提交了补丁来修复一个 bug，示例如下：

```json
{
    "repositories": [
        {
            "type": "vcs",
            "url": "https://github.com/igorw/monolog"
        }
    ],
    "require": {
        "monolog/monolog": "dev-bugfix"
    }
}
```

当你运行 `php composer.phar update` 时，你应该会得到你修改后的 `monolog/monolog` 版本，而不是来自 packagist 的版本。

请注意，除非你真的打算长期 fork 该包并完全脱离原始包，否则不要重命名包。Composer 会正确地优先选择你的包而不是原始包，因为自定义仓库比 packagist 具有优先级。如果你想重命名包，你应该在默认分支中（通常是 master）进行，而不是在功能分支（feature）中进行，因为包名是从默认分支获取的。

还要注意，如果你在 fork 的仓库的 `composer.json` 文件中更改了 `name` 属性，覆盖将不会生效，因为这需要与原始包匹配才能使覆盖生效。

如果其他依赖项依赖于你 fork 的包，可以对其进行内联别名，使其匹配原本无法匹配的约束。更多信息请参见 [别名文章](articles/aliases.md)。

#### 使用私有仓库

完全相同的解决方案允许你在 GitHub 和 Bitbucket 上使用你的私有仓库：

```json
{
    "repositories": [
        {
            "type": "vcs",
            "url":  "git@bitbucket.org:vendor/my-private-repo.git"
        }
    ],
    "require": {
        "vendor/my-private-repo": "dev-master"
    }
}
```

唯一的前提是为 git 客户端安装 SSH 密钥。

#### Git 的替代方案

Git 并不是 VCS 仓库唯一支持的版本控制系统。VCS 支持以下几种：

* **Git:** [git-scm.com](https://git-scm.com)
* **Subversion:** [subversion.apache.org](https://subversion.apache.org)
* **Mercurial:** [mercurial-scm.org](https://www.mercurial-scm.org)
* **Fossil**: [fossil-scm.org](https://www.fossil-scm.org/)

要从这些系统获取包，你需要安装它们各自的客户端。这可能不太方便。因此，GitHub 和 Bitbucket 提供了特殊支持，可以在无需安装对应的版本控制系统客户端的情况下，即可通过这些网站提供的 API 获取包。VCS 仓库为这些平台提供 `dist` 包，以 zip 文件的形式获取包。

* **GitHub:** [github.com](https://github.com) (Git)
* **Bitbucket:** [bitbucket.org](https://bitbucket.org) (Git)

要使用的 VCS 驱动程序会根据 URL 自动检测。但是，如果你出于其他原因需要指定一个，你可以使用 `bitbucket`、`github`、`gitlab`、`perforce`、`fossil`、`git`、`svn` 或 `hg` 作为仓库类型，而不是 `vcs`。

如果你在 GitHub 仓库上将 `no-api` 键设置为 `true`，它将像其他 Git 仓库一样克隆仓库，而不是使用 GitHub API。但与直接使用 `git` 驱动程序不同的是，Composer 仍会尝试使用 GitHub 的 zip 文件。

请注意：
* **要让 Composer 选择使用哪个驱动程序**，仓库类型需要定义为 "vcs"
* **如果你已经使用了私有仓库**，这意味着 Composer 应该已经在缓存中克隆了它。如果你想使用驱动程序安装相同的包，记得运行 `composer clearcache` 命令，然后运行 `composer update` 命令来更新 Composer 缓存并从 dist 安装包。
* VCS 驱动程序 `git-bitbucket` 已被弃用，推荐使用 `bitbucket`。

#### Bitbucket 驱动配置

> [!NOTE] 注意
> Bitbucket 仓库的端点需要使用 https，而不是 git。

在设置好你的 Bitbucket 仓库后，你还需要 [配置身份验证](articles/authentication-for-private-packages.md#bitbucket-oauth)。

#### Subversion 选项

由于 Subversion 没有原生的分支和标签概念，Composer 默认假定代码位于 `$url/trunk`、`$url/branches` 和 `$url/tags`。如果你的仓库布局不同，可以自行修改这些路径。例如，如果你使用了大写名称，可以这样配置仓库：

```json
{
    "repositories": [
        {
            "type": "vcs",
            "url": "http://svn.example.org/projectA/",
            "trunk-path": "Trunk",
            "branches-path": "Branches",
            "tags-path": "Tags"
        }
    ]
}
```

如果没有分支或标签目录，可以通过将 `branches-path` 或 `tags-path` 设置为 `false` 来完全禁用它们。

如果包位于子目录（如 `/trunk/foo/bar/composer.json` 和 `/tags/1.0/foo/bar/composer.json`），可以通过设置 `"package-path"` 选项让 Composer 访问该子目录，例如 `"package-path": "foo/bar/"`。

如果你有私有的 Subversion 仓库，可以在配置文件的 http-basic 部分保存凭据（详见 [配置](config.md#http-basic)）：

```json
{
    "http-basic": {
        "svn.example.org": {
            "username": "username",
            "password": "password"
        }
    }
}
```

如果你的 Subversion 客户端默认配置为保存凭据，这些凭据会保存到当前用户，并覆盖该服务器已保存的凭据。要更改此行为，可以在仓库配置中设置 `"svn-cache-credentials"` 选项：

```json
{
    "repositories": [
        {
            "type": "vcs",
            "url": "http://svn.example.org/projectA/",
            "svn-cache-credentials": false
        }
    ]
}
```

### Package

如果你想使用一个项目，而该项目不支持通过上述任何方式使用 Composer，你仍然可以通过使用 `package` 仓库类型来自己定义这个包。

基本上，你定义的信息与 `composer` 仓库的 `packages.json` 中包含的信息相同，但仅针对单个包。同样，必需的最小字段是 `name`、`version`，以及 `dist` 或 `source` 中的任意一个。

以下是 Smarty 模板引擎的一个示例：

```json
{
    "repositories": [
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
                    "url": "http://smarty-php.googlecode.com/svn/",
                    "type": "svn",
                    "reference": "tags/Smarty_3_1_7/distribution/"
                },
                "autoload": {
                    "classmap": ["libs/"]
                }
            }
        }
    ],
    "require": {
        "smarty/smarty": "3.1.*"
    }
}
```

通常，你可以省略 source 部分，因为你并不真正需要它。

如果包含了 source 键，reference 字段应该是对将要安装的版本的引用。当 type 字段是 `git` 时，reference 字段将是提交 ID、分支名或标签名。

> [!NOTE] 注意
> 不建议在 reference 字段中使用 git 分支名。虽然这在 `git checkout` 中是有效的，但分支名是可变的，因此无法被锁定。

当 type 字段是 `svn` 时，reference 字段应包含在运行 `svn co` 时附加到 URL 后面的引用。

> [!NOTE] 注意
> 这种仓库类型有一些限制，应尽可能避免使用：
>
> - 除非你更改 `version` 字段，否则 Composer 不会更新包。
> - Composer 不会更新提交引用，所以如果你使用 `master` 作为引用，你将不得不删除包来强制更新，并且必须处理不稳定的 lock 文件。

`package` 仓库类型中的 `"package"` 键可以设置为数组，以定义包的多个版本：

```json
{
    "repositories": [
        {
            "type": "package",
            "package": [
                {
                    "name": "foo/bar",
                    "version": "1.0.0",
                    ...
                },
                {
                    "name": "foo/bar",
                    "version": "2.0.0",
                    ...
                }
            ]
        }
    ]
}
```

## 托管你自己的仓库

虽然你可能大部分时间都想把你的包放在 packagist 上，但也有一些使用场景需要托管你自己的仓库。

* **私有公司包：** 如果你所在的公司内部使用 Composer 管理包，你可能希望将这些包保持私有。

* **独立生态系统：** 如果你有一个项目拥有自己的生态系统，而这些包对于更广泛的 PHP 社区来说并不真正可重用，你可能希望将它们与 packagist 分开。一个典型的例子就是 WordPress 插件。

对于托管你自己的包，建议使用原生的 `composer` 类型仓库，因为它能提供最佳性能。

有一些工具可以帮助你创建 `composer` 仓库。

### Private Packagist

[Private Packagist](https://packagist.com/) 是一个托管或自托管的应用程序，提供私有包托管以及 GitHub、Packagist.org 和其他包仓库的镜像服务。

查看 [Packagist.com](https://packagist.com/) 获取更多信息。

### Satis

Satis 是一个静态的 `composer` 仓库生成器。它有点像一个超轻量级的、基于静态文件的 packagist 版本。

你提供一个包含仓库定义的 `composer.json` 文件，通常是 VCS 和包仓库的定义。它会获取所有 `require` 的包，并生成一个 `packages.json` 文件，这就是你的 `composer` 仓库。

查看 [satis GitHub 仓库](https://github.com/composer/satis) 和 [处理私有包](articles/handling-private-packages.md) 文章获取更多信息。

### Artifact

在某些情况下，无法使用前面提到的任何一种在线仓库类型，甚至包括 VCS 仓库。一个典型的例子是通过构建构件进行跨组织的库交换。当然，大多数时候这些构件都是私有的。要直接使用这些归档文件，可以使用 `artifact` 类型的仓库，该仓库包含一个文件夹，里面存放着这些私有包的 ZIP 或 TAR 归档文件：

```json
{
    "repositories": [
        {
            "type": "artifact",
            "url": "path/to/directory/with/zips/"
        }
    ],
    "require": {
        "private-vendor-one/core": "15.6.2",
        "private-vendor-two/connectivity": "*",
        "acme-corp/parser": "10.3.5"
    }
}
```

每个 zip 构件都是一个 ZIP 归档文件，根文件夹中包含 `composer.json`：

```shell
unzip -l acme-corp-parser-10.3.5.zip
```
```text
composer.json
...
```

如果存在两个包含包不同版本的归档文件，它们都会被导入。当在构件文件夹中添加了一个更新版本的归档文件并运行 `update` 时，该版本也会被导入，Composer 将更新到最新版本。

### Path

除了 `artifact` 仓库外，你还可以使用 `path` 仓库，它允许你依赖于本地目录，可以是绝对路径或相对路径。在处理单体式仓库（monolithic repositories）时，这特别有用。

例如，如果你的仓库中有以下目录结构：

```text
...
├── apps
│   └── my-app
│       └── composer.json
├── packages
│   └── my-package
│       └── composer.json
...
```

然后，要将 `my/package` 包作为依赖项添加到你的 `apps/my-app/composer.json` 文件中，你可以使用以下配置：

```json
{
    "repositories": [
        {
            "type": "path",
            "url": "../../packages/my-package"
        }
    ],
    "require": {
        "my/package": "*"
    }
}
```

如果该包是一个本地 VCS 仓库，版本可以通过当前签出的分支或标签来推断。否则，版本应该在包的 `composer.json` 文件中明确定义。如果通过这些方式无法解析版本，则假定为 `dev-master`。

当无法从本地VCS仓库推断版本，或者你想要覆盖版本时，可以在声明仓库时使用 `versions` 选项：


```json
{
    "repositories": [
        {
            "type": "path",
            "url": "../../packages/my-package",
            "options": {
                "versions": {
                    "my/package": "4.2-dev"
                }
            }
        }
    ]
}
```

本地包如果可能的话会被创建符号链接，在这种情况下，控制台输出将显示 `Symlinking from ../../packages/my-package`。如果无法创建符号链接，则会复制包。在这种情况下，控制台将输出 `Mirrored from ../../packages/my-package`。

除了默认的回退策略外，你可以强制使用符号链接（`"symlink": true`）或强制使用镜像复制（`"symlink": false`）选项。在部署或从单体仓库生成包时，强制镜像复制可能会很有用。

> [!NOTE] 注意
> 在 Windows 系统上，目录符号链接是使用 [NTFS](https://learn.microsoft.com/zh-cn/windows-server/storage/file-server/ntfs-overview) 连接点实现的，因为非管理员用户也可以创建。在 Windows 7 以下版本或 `proc_open` 被禁用时，将始终使用镜像复制。

```json
{
    "repositories": [
        {
            "type": "path",
            "url": "../../packages/*",
            "options": {
                "symlink": false
            }
        }
    ]
}
```

开头的波浪号（`~`）会展开为当前用户的主文件夹，环境变量会解析为 Windows 和 Linux/Mac 两种表示法。例如 `~/git/mypackage` 将自动从 `/home/<username>/git/mypackage` 加载 mypackage 克隆，相当于 `$HOME/git/mypackage` 或 `%USERPROFILE%/git/mypackage`。

> [!NOTE] 注意
> 仓库路径也可以包含通配符如 `*` 和 `?`。详情请参见 [PHP glob 函数](https://php.net/glob)。

你可以配置包的 dist 引用（出现在 composer.lock 文件中）的构建方式。

存在以下模式：
- `none` - 引用将始终为 null。这有助于减少 lock 文件中的冲突，但会降低关于上次更新时间和包是否处于最新状态的清晰度。
- `config` - 引用基于包的 composer.json 和仓库配置的哈希值构建
- `auto`（默认使用）- 引用像 `config` 模式一样基于哈希值构建，但如果包文件夹包含 git 仓库，则使用 HEAD 提交的哈希值作为引用。

```json
{
    "repositories": [
        {
            "type": "path",
            "url": "../../packages/*",
            "options": {
                "reference": "config"
            }
        }
    ]
}
```

## 禁用 Packagist.org {#disabling-packagist-org}

你可以通过在 `composer.json` 中添加以下内容来禁用默认的 Packagist.org 仓库：

```json
{
    "repositories": [
        {
            "packagist.org": false
        }
    ]
}
```

你可以通过使用全局配置标志来全局禁用 Packagist.org：

```shell
php composer.phar config -g repo.packagist.org false
```

