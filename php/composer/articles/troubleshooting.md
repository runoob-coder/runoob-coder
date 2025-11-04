---
titleTemplate: 相关文章 | Composer中文文档 - PHP 的依赖管理器 | PHP | noob-coder | 菜鸟码农
title: 解决合并冲突
head:
  - - meta
    - name: keywords
      content: COMPOSER_POOL_OPTIMIZER,7-Zip,unzip,ZipArchive,SSH,ControlMaster,setv6automatic,networksetup,Mac OS X,Windows,Linux,COMPOSER_IPRESOLVE,IPv6,Packagist,降级模式,Travis,Windows Null Service,No such file or directory,proc_open(NUL),failed to open stream,proc_open(),fork failed,GitHub,CA证书,无法获取本地颁发者证书,SSL 证书问题,注册表编辑器,HKEY_LOCAL_MACHINE,AutoRun,COMPOSER_ALLOW_XDEBUG,Xdebug,cPanel,fork炸弹,COMPOSER_MEMORY_LIMIT,php.ini,memory_limit,PHP Fatal error,Allowed memory size of,内存限制错误,commit-ref,repositories,local branch,Jenkins,default_socket_timeout,Operation timed out after,curl error 28 while downloading,curl 错误,网络超时问题,依赖解析问题,CI/CD,环境变量,版本控制系统,VCS,.git,COMPOSER_ROOT_VERSION,CI持续集成,dev-main,--with-dependencies,replace,Packagist,minimum-stability,package not found,清除Composer缓存,composer clear-cache,composer diagnose,cself-update,omposer.lock,composer.json,Composer,依赖管理器,PHP,libraries,dependency,noob-coder,菜鸟码农
  - - meta
    - name: description
      content: 下面列出了使用 Composer 时常见的问题，以及如何避免它们。
---

# 故障排除

下面列出了使用 Composer 时常见的问题，以及如何避免它们。

## 一般问题

1. 面对任何类型的 Composer 问题时，请确保**使用最新版本**。详情请参见[self-update](../cli.md#self-update)。

2. 在询问任何人之前，运行 [`composer diagnose`](../cli.md#diagnose) 检查常见问题。如果一切正常，继续下一步。

3. 通过运行 `curl -sS https://getcomposer.org/installer | php -- --check` 确保你的设置没有问题。

4. 尝试通过运行 `composer clear-cache` 清除 Composer 缓存。

5. 在故障排除时，确保你是**直接从你的`composer.json`安装供应商包**，通过 `rm -rf vendor && composer update -v` 命令以排除任何现有供应商安装或 `composer.lock` 条目的可能干扰。

## 找不到包 {#package-not-found}

1. 仔细检查你的 `composer.json` 或仓库分支和标签名称中**没有拼写错误**。

2. 确保**设置了正确的[minimum-stability](../schema.md#minimum-stability)**。要开始或确保这不是问题，将 `minimum-stability` 设置为 "dev"。

3. **不是来自 [Packagist](https://packagist.org/) **的包应该始终**在根包中定义**（依赖所有供应商的包）。

4. 在你的仓库的所有分支和标签中使用**相同的供应商和包名称**，特别是在维护第三方派生库和使用 `replace` 时。

5. 如果你正在更新到最近发布的包版本，请注意 Packagist 在新包对 Composer 可见之前最多有 1 分钟的延迟。

6. 如果你正在更新单个包，它本身可能依赖于更新的版本。在这种情况下，添加 `--with-dependencies` 参数**或者**将所有需要更新的依赖项添加到命令中。

## 包未更新到预期版本

尝试运行以下命令：

```shell 
php composer.phar why-not [package-name] [expected-version]
```

## 对根包的依赖 {#dependencies-on-the-root-package}

当你的根包依赖于一个最终又依赖（直接或间接）回根包本身的包时，在两种情况下可能出现问题：

1. 在开发过程中，如果你在像 `dev-main` 这样的分支上，并且该分支没有定义 [分支别名](aliases.md#branch-alias)，而对根包的依赖要求版本 `^2.0`，那么 `dev-main` 版本将无法满足要求。这里的最佳解决方案是确保首先定义分支别名。

2. 在 CI（持续集成）运行中，问题可能是 Composer 无法正确检测根包的版本。如果是 git 克隆，通常是可以的，Composer 会检测当前分支的版本，但有些 CI 会进行浅克隆，因此在测试拉取请求和功能分支时该过程可能会失败。在这种情况下，分支别名可能不被识别。最佳解决方案是通过名为 `COMPOSER_ROOT_VERSION` 的环境变量定义你所在的版本。例如，你可以将其设置为 `dev-main` 来定义根包的版本为 `dev-main`。使用例如： `COMPOSER_ROOT_VERSION=dev-main composer install` 仅为调用 Composer 导出变量，或者你可以在 CI 环境变量中全局定义它。

## 根包版本检测

Composer 依靠知道根包的版本来有效地解析依赖关系。根包的版本使用分层方法确定：

1. **composer.json 版本字段**：首先，Composer 在项目的根 `composer.json` 文件中查找 `version` 字段。如果存在，该字段直接指定根包的版本。通常不推荐这样做，因为它需要不断更新，但这是一种选择。

2. **环境变量**：然后 Composer 检查 `COMPOSER_ROOT_VERSION` 环境变量。用户可以显式设置此变量来定义根包的版本，提供了一种直接的方式告诉 Composer 确切的版本，特别是在 CI/CD 环境中或 VCS 方法不适用时。

3. **版本控制系统（VCS）检查**：然后 Composer 尝试通过与项目的版本控制系统接口来猜测版本。例如，在使用 Git 版本控制的项目中，Composer 执行特定的 Git 命令来根据标签、分支和提交历史推断项目的当前版本。如果缺少 `.git` 目录或历史记录不完整（因为 CI 使用浅克隆），此检测可能无法找到正确的版本。

4. **回退**：如果所有其他方法都失败，Composer 使用 `1.0.0` 作为默认版本。

请注意，依赖默认/回退版本可能会导致依赖解析问题，特别是当根包依赖于最终又依赖（直接或间接）[回根包本身](#dependencies-on-the-root-package)的包时。

## 网络超时问题，curl 错误

如果你看到类似以下内容：

```
Failed to download * curl error 28 while downloading * Operation timed out after 300000 milliseconds
```

这意味着你的网络可能太慢，请求花费了超过 300 秒才完成。这是 Composer 将使用的最小超时时间，但你可以通过增加 php.ini 中的 `default_socket_timeout` 值来增加它。

## Jenkins 构建中找不到包

1. 检查上面的 ["找不到包"](#package-not-found) 项目。

2. `Jenkins` 内的 git 克隆/签出会使分支处于"分离 HEAD"状态。因此，Composer 可能无法识别当前签出分支的版本，并且可能无法解析对[根包的依赖](#dependencies-on-the-root-package)。要解决此问题，你可以在 Jenkins 作业的 Git 设置中使用 "Additional Behaviours" -> "Check out to specific local branch"，其中你的 "local branch" 应与你正在签出的分支相同。使用此方法，签出将不再处于分离状态，对根包的依赖应该得到满足。

## 我有一个依赖在其 composer.json 中包含"repositories"定义，但它似乎被忽略了

[`repositories`](../schema.md#repositories) 配置属性被定义为[仅限根包](../schema.md#root-package)。它不会被继承。你可以在"[为什么 Composer 不能递归加载仓库？](../faqs/why-cant-composer-load-repositories-recursively.md)"文章中了解更多相关信息。对此限制的最简单解决方法是将 `repositories` 定义移动或复制到你的根 `composer.json` 中。

## 我已将依赖锁定到特定提交但得到意外结果

虽然 Composer 支持使用 `#commit-ref` 语法将依赖锁定到特定提交，但需要注意某些注意事项。最重要的一点已在[包链接](../schema.md#package-links)文档中说明，但经常被忽视：

> [!NOTE] 注意
> 虽然这有时很方便，但不应该是你长期使用包的方式，因为它带有技术限制。`composer.json` 元数据仍将从你在哈希之前指定的分支名称读取。因此在某些情况下这不是一个实用的解决方法，你应该总是尽快切换到标记版本。

对此限制没有简单的解决方法。因此**强烈建议你不要使用它**。

## 需要覆盖包版本

假设你的项目依赖于包 A，而包 A 又依赖于包 B 的特定版本（比如 0.1）。但你需要包 B 的不同版本（比如 0.11）。

你可以通过将版本 0.11 别名为 0.1 来解决这个问题：

`composer.json：`

```json
{
    "require": {
        "A": "0.2",
        "B": "0.11 as 0.1"
    }
}
```

更多信息请参见[别名](aliases.md)。

## 查找配置值来源

使用以下命令查看每个配置值的来源：

```shell
php composer.phar config --list --source
```

## 内存限制错误

首先要做的事是确保你运行的是 Composer 2，如果可能的话是 2.2.0 或更高版本。

Composer 1 使用更多内存，升级到最新版本会给你带来更好更快的结果。

Composer 在某些命令上有时会失败，并显示此消息：

`PHP Fatal error:  Allowed memory size of XXXXXX bytes exhausted <...>`

在这种情况下，应增加 PHP 的 `memory_limit`。

> [!NOTE] 注意
> Composer 内部将 `memory_limit` 增加到 `1.5G`。

要获取当前的 `memory_limit` 值，运行：

```shell
php -r "echo ini_get('memory_limit').PHP_EOL;"
```

尝试在你的 `php.ini` 文件中增加限制（例如 Debian 类系统的 `/etc/php5/cli/php.ini` ）：

```ini
; 使用 -1 表示无限制或定义明确的值如 2G
memory_limit = -1
```

Composer 也遵守由 `COMPOSER_MEMORY_LIMIT` 环境变量定义的内存限制：

```shell
COMPOSER_MEMORY_LIMIT=-1 composer.phar <...>
```

或者，你可以使用命令行参数增加限制：

```shell
php -d memory_limit=-1 composer.phar <...>
```

但是请注意，使用这些方法设置内存限制主要解决 Composer 本身及其直接进程内的内存问题。Composer 调用的子进程或外部命令如果有自己的内存需求，可能仍需要单独调整。

在激活了 shell fork 炸弹保护的 [cPanel](https://www.cpanel.net/) 实例上也可能发生此问题。有关 cPanel 站点上 fork 炸弹功能的更多信息，请参见 [文档](https://documentation.cpanel.net/display/68Docs/Shell+Fork+Bomb+Protection)。

## Xdebug 对 Composer 的影响

为了在启用 `Xdebug` 扩展时提高性能，Composer 会自动重启不带它的 PHP。
你可以使用环境变量 `COMPOSER_ALLOW_XDEBUG=1` 覆盖此行为。

Composer 在使用 Xdebug 时总是会显示警告，但你可以使用环境变量 `COMPOSER_DISABLE_XDEBUG_WARN=1` 覆盖此警告。如果你意外看到此警告，则重启过程已失败：请[报告此问题](https://github.com/composer/composer/issues)。

## "系统找不到指定的路径"(Windows)

1. 打开注册表编辑器。
2. 在 `HKEY_LOCAL_MACHINE\Software\Microsoft\Command Processor`、`HKEY_CURRENT_USER\Software\Microsoft\Command Processor` 或 `HKEY_LOCAL_MACHINE\Software\Wow6432Node\Microsoft\Command Processor` 中搜索 `AutoRun` 键。
3. 检查是否包含指向不存在文件的路径，如果是，则删除它们。

## SSL 证书问题：无法获取本地颁发者证书

1. 检查你的根证书存储/CA 包是否是最新的。运行 `composer diagnose -vvv` 并在输出的前几行中查找 `Checked CA file ...` 或` Checked directory ...` 行。这将显示 Composer 在哪里寻找 CA 包。你可以从 [cURL 获取新的 cacert.pem](https://curl.se/docs/caextract.html) 并存储在那里。
2. 如果尽管 Composer 找到了有效的 CA 包但仍未解决问题，请尝试禁用你的防病毒和防火墙软件看是否有帮助。我们见过 Windows 上的 Avast 会阻止 Composer 正常运行的问题。要在 Avast 中禁用 HTTPS 扫描，你可以进入 "Protection > Core Shields > Web Shield > **取消勾选** Enable HTTPS scanning"。如果这有帮助，你应该向软件供应商报告，以便他们能够改进。

## API 速率限制和 OAuth 令牌

由于 GitHub 对其 API 的速率限制，Composer 可能会提示进行身份验证，要求你的用户名和密码以便继续工作。

如果你不想向 Composer 提供 GitHub 凭据，你可以使用 [此处记录的过程](authentication-for-private-packages.md#github-oauth) 手动创建令牌。

现在 Composer 应该能够在不询问身份验证的情况下安装/更新。

## proc_open(): fork failed 错误

如果 Composer 在某些命令上显示 proc_open() fork failed：

`PHP Fatal error: Uncaught exception 'ErrorException' with message 'proc_open(): fork failed - Cannot allocate memory' in phar`

这可能是因为 VPS 内存耗尽且未启用交换空间。

```shell
free -m
```

```text
total used free shared buffers cached
Mem: 2048 357 1690 0 0 237
-/+ buffers/cache: 119 1928
Swap: 0 0 0
```

要启用交换内存，你可以使用如下设置：

```shell
/bin/dd if=/dev/zero of=/var/swap.1 bs=1M count=1024
/sbin/mkswap /var/swap.1
/bin/chmod 0600 /var/swap.1
/sbin/swapon /var/swap.1
```

你可以按照此 [教程](https://www.digitalocean.com/community/tutorials/how-to-add-swap-on-ubuntu-14-04) 创建永久交换文件。

## proc_open(): failed to open stream 错误(Windows)

如果 Composer 在 Windows 上显示 proc_open(NUL) 错误：

`proc_open(NUL): failed to open stream: No such file or directory`

这可能是因为你正在 _OneDrive_ 目录中工作，并且使用的 PHP 版本不支持此服务的文件系统语义。该问题已在 PHP 7.2.23 和 7.3.10 中修复。

或者可能是因为 `Windows Null Service` 未启用。有关更多信息，请参见此[问题](https://github.com/composer/composer/issues/7186#issuecomment-373134916)。

## 降级模式

由于 `Travis` 和其他系统上的一些间歇性问题，我们引入了降级网络模式，这有助于 Composer 成功完成但禁用了一些优化。当首次检测到问题时会自动启用。如果你偶尔看到此问题，你可能不必担心（慢速或过载的网络也会导致这些超时），但如果它反复出现，你可能需要查看以下选项来识别和解决问题。

如果有人将你指向此页面，你需要检查几件事：

- 如果你使用 ESET 防病毒软件，进入 "Advanced Settings" 并在 "web access protection" 下禁用 "HTTP-scanner"
- 如果你使用 IPv6，尝试禁用它。如果这解决了你的问题，请联系你的 ISP 或服务器主机，问题不在 Packagist 层面，而在你和 Packagist 之间的路由规则（即整个互联网）。解决这些问题的最佳方法是提高有权修复它的网络工程师的意识。请查看下一节了解 IPv6 解决方法。
- 如果以上都没有帮助，请[报告错误](https://github.com/composer/composer/issues)。

## 操作超时(IPv6 问题)

如果 IPv6 配置不正确，你可能会遇到错误。常见错误是：

```text
The "https://getcomposer.org/version" file could not be downloaded: failed to
open stream: Operation timed out
```

我们建议你修复 IPv6 设置。如果不可能，你可以尝试以下解决方法：

### 通用解决方法

设置[`COMPOSER_IPRESOLVE=4`](../cli.md#composer-ipresolve)环境变量，这将强制 curl 使用 IPv4 解析域名。这只在使用 curl 扩展进行下载时有效。

### Linux 解决方法

在 Linux 上，运行此命令似乎有助于使 IPv4 流量比 IPv6 具有更高的优先级，这是比完全禁用 IPv6 更好的替代方案：

```shell
sudo sh -c "echo 'precedence ::ffff:0:0/96 100' >> /etc/gai.conf"
```

### Windows 解决方法

在 Windows 上，恐怕唯一的方法是完全禁用 IPv6（在 Windows 或你的家庭路由器中）。

### Mac OS X 解决方法

获取你的网络设备名称：

```shell
networksetup -listallnetworkservices
```

在该设备上禁用 IPv6（在此例中为"Wi-Fi"）：

```shell
networksetup -setv6off Wi-Fi
```

运行 Composer...

你可以使用以下命令重新启用 IPv6：

```shell
networksetup -setv6automatic Wi-Fi
```

话虽如此，如果这解决了你的问题，请与你的 ISP 讨论此事，以尝试解决路由错误。这是让所有人都能解决问题的最佳方式。

## Composer 使用 SSH ControlMaster 挂起

当你尝试从 Git 仓库安装包并且为 SSH 连接使用 `ControlMaster` 设置时，Composer 可能会无限期挂起，你会在进程列表中看到一个 `sh` 进程处于 `defunct` 状态。

原因是 SSH Bug：https://bugzilla.mindrot.org/show_bug.cgi?id=1988

作为一种解决方法，在运行 Composer 之前打开到你的 Git 主机的 SSH 连接：

```shell
ssh -t git@mygitserver.tld
php composer.phar update
```

更多信息请参见 https://github.com/composer/composer/issues/4180。

## Zip 档案未正确解压

Composer 可以使用系统提供的 `unzip` 或 `7z`（7-Zip）工具，或 PHP 的原生 `ZipArchive` 类来解压 zip 文件。在 ZIP 文件可以包含权限和符号链接的操作系统上，我们建议安装 `unzip` 或` 7z`，因为这些功能不受 `ZipArchive` 支持。

## 禁用池优化器

在 Composer 中，`Pool` 类包含依赖解析过程中所有相关的包。这就是用来生成所有规则然后传递给依赖解析器的内容。为了提高性能，Composer 尝试通过提前移除无用的包信息来优化这个 `Pool`。

如果一切顺利，你应该永远不会注意到任何问题，但如果你遇到了意外结果，如无法解析的依赖集或冲突，而你认为 Composer 是错误的，你可能希望通过使用环境变量 `COMPOSER_POOL_OPTIMIZER` 来禁用优化器，并像这样再次运行更新：

```shell
COMPOSER_POOL_OPTIMIZER=0 php composer.phar update
```

现在仔细检查结果是否仍然相同。运行依赖解析过程将花费显著更长时间并使用更多内存。

如果结果不同，你可能遇到了池优化器中的问题。请[报告此问题](https://github.com/composer/composer/issues)以便修复。
