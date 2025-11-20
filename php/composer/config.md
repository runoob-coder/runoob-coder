---
titleTemplate: Composer中文文档 - PHP 的依赖管理器 | PHP | noob-coder | 菜鸟码农
head:
  - - meta
    - name: description
      content: 本章节将描述 composer.json 架构 中的 config 部分。
  - - meta
    - name: keywords
      content: forgejo-token,forgejo-domains,update-with-minimal-changes,allow-missing-requirements,bump-after-update,secure-svn-domains,platform-check,lock,htaccess-protect,archive-dir,archive-format,discard-changes,notify-on-install,use-github-api,github-expose-hostname,github-domains,apcu-autoloader,classmap-authoritative,sort-packages,optimize-autoloader,autoloader-suffix,prepend-autoloader,bin-compat,cache-read-only,cache-files-maxsize,cache-files-ttl,cache-vcs-dir,cache-repo-dir,cache-files-dir,cache-dir,data-dir,bin-dir,vendor-dir,check-platform-reqs,platform,Authorization,bearer,http-basic,capath,cafile,bitbucket-oauth,secure-http,disable-tls,gitlab-protocol,gitlab-token,gitlab-oauth,gitlab-domains,github-oauth,github-protocols,store-auths,use-parent-dir,ignore-severity,ignore-unreachable,block-insecure,block-abandoned,ignore-abandoned,abandoned,PKSA,GHSA,CVE,abandoned,ignore,audit,source,dist,preferred-install,use-include-path,allow-plugins,scripts,composer.json,composer.lock,process-timeout,Composer,PHP,libraries,dependency,noob-coder,菜鸟码农
---

# 配置

本章节将描述 `composer.json` [架构](schema.md) 中的 `config` 部分。

## process-timeout

进程执行的超时时间（秒），默认值为 300（5 分钟）。例如 `git clone` 等操作，超过此时间后 Composer 会认为进程已失效。如果你的网络较慢或依赖包较大，可以适当提高此值。

示例：

```json
{
    "config": {
        "process-timeout": 900
    }
}
```

### 为单独的脚本命令禁用超时

如果你想在 `scripts` 下的自定义命令中禁用进程超时，可以使用一个静态辅助方法：

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

这样设置后，`test` 命令执行时将不会受到超时限制。

## allow-plugins

默认值为 `{}`，即不允许加载任何插件。

从 Composer 2.2.0 起，`allow-plugins` 选项增加了一层安全保护，可以限制哪些 Composer 插件能在 Composer 运行期间执行代码。

当首次激活一个未在配置项中列出的新插件时，Composer 会打印警告。如果你在交互模式下运行 Composer，它会提示你是否允许该插件执行。

通过此设置，你可以只允许信任的包执行代码。将其设置为一个对象，键为包名匹配模式，值为 **true** 表示允许，**false** 表示禁止并且不再显示警告或提示。

```json
{
    "config": {
        "allow-plugins": {
            "third-party/required-plugin": true,
            "my-organization/*": true,
            "unnecessary/plugin": false
        }
    }
}
```

你也可以将该配置项设置为 `false`，表示禁止所有插件，或设置为 `true`，表示允许所有插件运行（不推荐）。例如：

```json
{
    "config": {
        "allow-plugins": false
    }
}
```


## use-include-path

默认值为 `false`。如果设置为 `true`，Composer 自动加载器会在 PHP 的 include path 中查找类。

## preferred-install

默认值为 `dist`，可选值有 `source`、`dist` 或 `auto`。此选项允许你设置 Composer 优先使用的安装方式。你也可以将其设置为对象，通过包名匹配模式实现更细粒度的安装偏好。

```json
{
    "config": {
        "preferred-install": {
            "my-organization/stable-package": "dist",
            "my-organization/*": "source",
            "partner-organization/*": "auto",
            "*": "dist"
        }
    }
}
```

- `source` 表示 Composer 会从源码安装包（如 git clone 或其他版本控制系统的签出），适合需要直接修改依赖包的情况。
- `auto` 是旧版行为，开发版本用 `source`，其他情况用 `dist`。
- `dist`（Composer 2.1 默认值）表示尽可能从分发包安装（通常是 zip 文件下载），速度更快。

> [!NOTE] 注意
> 匹配模式的顺序很重要，越具体的模式应放在越前面。当全局和包配置中混用字符串和对象写法时，字符串会被转换为 `*` 包模式。

## audit

安全审计和版本阻止配置选项。可以使用 `composer audit` 生成审计报告，并且在更新或引入命令结束时会自动报告简短格式的版本。版本阻止功能会根据配置，在解析依赖关系之前丢弃被识别为不安全或已废弃的包版本，确保它们无法被安装。

### ignore

一份在审计报告和（或）版本阻止中被忽略的咨询 ID、远程 ID 或 CVE ID 列表。

#### 带原因的简单格式：

```json
{
    "config": {
        "audit": {
            "ignore": {
                "CVE-1234": "受影响的组件未被使用。",
                "GHSA-xx": "安全修复已通过补丁应用。",
                "PKSA-yy": "由于已有缓解措施，更新可延后。"
            }
        }
    }
}
```

#### 不带原因的简单格式：

```json
{
    "config": {
        "audit": {
            "ignore": ["CVE-1234", "GHSA-xx", "PKSA-yy"]
        }
    }
}
```

#### 带应用范围的详细格式：

详细格式允许你控制忽略是仅应用于审计报告、仅应用于版本阻止，还是两者都应用。`apply` 字段接受以下值：

- `audit` - 仅在审计报告中忽略（咨询不会出现在审计报告中，但在更新期间仍然会阻止包）
- `block` - 仅在版本阻止中忽略（在更新期间可以使用包，但咨询仍会出现在审计报告中）
- `all` - 在审计报告和版本阻止中都忽略（默认行为）

```json
{
    "config": {
        "audit": {
            "ignore": {
                "CVE-1234": {
                    "apply": "audit",
                    "reason": "对我们不适用，所以不报告，但仍希望确保在更新中不使用此版本。"
                },
                "GHSA-xx": {
                    "apply": "block",
                    "reason": "已应用解决方法，下周才能修复，允许在更新中使用但在审计中仍报告。"
                },
                "PKSA-yy": {
                    "apply": "all",
                    "reason": "误报，所有上下文中完全忽略。"
                }
            }
        }
    }
}
```

所有格式可以在同一配置中混合使用。

### abandoned

自 Composer 2.7 起默认值为 `fail`（在 Composer 2.6 中添加该选项时默认值为 `report`）。定义审计报告是否以及如何报告已废弃的包。有三个可能的值：

- `ignore` 表示审计报告完全不考虑已废弃的包。
- `report` 表示已废弃的包作为错误报告，但不会导致 composer audit 命令返回非零退出代码。
- `fail` 表示已废弃的包会导致审计命令失败并返回非零退出代码。

请注意，这仅适用于审计报告，此设置不会影响不安全包版本的阻止。要配置已废弃包的阻止，请参见 [`block-abandoned`](#block-abandoned) 选项。

```json
{
    "config": {
        "audit": {
            "abandoned": "report"
        }
    }
}
```

自 Composer 2.7 起，可以通过 [`COMPOSER_AUDIT_ABANDONED`](cli.md#composer-audit-abandoned) 环境变量覆盖该选项。

自 Composer 2.8 起，可以通过 [`--abandoned`](cli.md#audit) 命令行选项覆盖该选项，其优先级高于配置值和环境变量。

### ignore-abandoned

一份在审计报告和（或）版本阻止中被忽略的已废弃包名称列表。允许你选择即使在已废弃状态下仍想继续使用的包。

#### 带原因的简单格式：

```json
{
    "config": {
        "audit": {
            "ignore-abandoned": {
                "acme/*": "计划下个月移除。",
                "acme/package": "传递依赖项但在我们的项目上下文中无法访问且未在使用。"
            }
        }
    }
}
```

#### 不带原因的简单格式：

```json
{
    "config": {
        "audit": {
            "ignore-abandoned": ["acme/*", "acme/package"]
        }
    }
}
```

#### 带应用范围的详细格式：

详细格式允许你控制忽略是仅应用于审计报告、仅应用于版本阻止，还是两者都应用。`apply` 字段接受以下值：

- `audit` - 仅在审计报告中忽略（包不会出现在审计报告中，但如果启用了 [`block-abandoned`](#block-abandoned)，在更新期间仍然会被阻止）
- `block` - 仅在版本阻止中忽略（即使启用了 [`block-abandoned`](#block-abandoned)，在更新期间也可以使用包，但仍然会出现在审计报告中）
- `all` - 在审计报告和版本阻止中都忽略（默认行为）

```json
{
    "config": {
        "audit": {
            "ignore-abandoned": {
                "acme/package": {
                    "apply": "block",
                    "reason": "在更新期间允许使用但仍然报告为已废弃。"
                },
                "vendor/*": {
                    "apply": "all",
                    "reason": "我们在内部维护这些包。"
                }
            }
        }
    }
}
```

所有格式可以在同一配置中混合使用。

### ignore-severity

默认值为 `[]`。一份在审计报告和（或）版本阻止中被忽略的严重性等级列表。

#### 简单格式：

```json
{
    "config": {
        "audit": {
            "ignore-severity": ["low", "medium"]
        }
    }
}
```

#### 带应用范围的详细格式：

详细格式允许你控制忽略是仅应用于审计报告、仅应用于版本阻止，还是两者都应用。`apply` 字段接受以下值：

- `audit` - 仅在审计报告中忽略（具有此严重性的咨询不会出现在审计报告中，但在更新期间仍然会阻止包）
- `block` - 仅在版本阻止中忽略（在更新期间可以使用包，但具有此严重性的咨询仍然会出现在审计报告中）
- `all` - 在审计报告和版本阻止中都忽略（默认行为）

```json
{
    "config": {
        "audit": {
            "ignore-severity": {
                "low": {
                    "apply": "all"
                },
                "medium": {
                    "apply": "block"
                }
            }
        }
    }
}
```

所有格式可以在同一配置中混合使用。

### ignore-unreachable

默认值为 `false`。在执行 `composer audit` 时是否应忽略无法访问的仓库。如果你在某些仓库无法访问的环境中运行该命令，这会很有帮助。此设置不适用于版本阻止或在 `composer audit` 命令之外生成的审计报告。

```json
{
    "config": {
        "audit": {
            "ignore-unreachable": true
        }
    }
}
```

### block-insecure

默认值为 `true`。如果为 `true`，任何受安全公告影响的包版本都将被阻止，在执行 composer update/require/delete 命令时无法使用，除非这些安全公告被忽略。如果启用了 [`block-abandoned`](#block-abandoned)，版本阻止还将防止使用已废弃的包。

```json
{
    "config": {
        "audit": {
            "block-insecure": false
        }
    }
}
```

### block-abandoned

默认值为 `false`。如果为 `true`，任何已废弃的包在执行 composer update/require/delete 命令时都无法使用。仅在未通过将 [`block-insecure`](#block-insecure) 设置为 false 来禁用版本阻止时适用。

```json
{
    "config": {
        "audit": {
            "block-abandoned": true
        }
    }
}
```

## use-parent-dir

当在没有 `composer.json` 的目录下运行 Composer，如果上级目录存在 `composer.json`，Composer 默认会询问你是否使用上级目录的配置文件。

如果你希望总是自动同意该提示，可以将此配置项设置为 `true`；如果不希望被询问，则设置为 `false`。默认值为 `"prompt"`。

> [!NOTE] 注意
> 此配置必须在全局用户配置中设置才会生效。例如可使用 `php composer.phar config --global use-parent-dir true` 进行设置。

## store-auths

用于控制身份验证后是否保存认证信息，可选值有：`true`（总是保存）、`false`（不保存）和 `"prompt"`（每次询问），默认值为 `"prompt"`。

## github-protocols

默认值为 `["https", "ssh", "git"]`。这是一个在从 github.com 克隆时使用的协议列表，按优先级排序。默认情况下，`git` 协议仅在禁用 [secure-http](#secure-http) 时可用，因为 git 协议不加密。如果你希望远程仓库的 push URL 使用 https 而不是 ssh（如 `git@github.com:...`），可将协议列表仅设置为 `["https"]`，Composer 会停止将 push URL 重写为 ssh URL。

## github-oauth

一个域名和 OAuth 密钥的列表。例如使用 `{"github.com": "oauthtoken"}` 作为该选项的值，将使用 `oauthtoken` 访问 GitHub 上的私有仓库，并绕过其基于 IP 的低速率限制。Composer 在需要时会提示输入凭证，但这些也可以手动设置。更多关于如何获取 GitHub OAuth 令牌和命令行语法的信息，请参见 [这里](articles/authentication-for-private-packages.md#github-oauth)。

## gitlab-domains

默认值为 `["gitlab.com"]`。GitLab 服务器的域名列表。当你使用 `gitlab` 仓库类型时会用到此配置。

## gitlab-oauth

一个域名和 OAuth 密钥的列表。例如使用 `{"gitlab.com": "oauthtoken"}` 作为该选项的值，将使用 `oauthtoken` 访问 GitLab 上的私有仓库。

请注意：如果包不是托管在 gitlab.com 上，还必须在 [`gitlab-domains`](config.md#gitlab-domains) 选项中指定域名。更多详细信息请参见 [这里](articles/authentication-for-private-packages.md#gitlab-oauth)。

## gitlab-token

一个域名和私有令牌的列表。私有令牌可以是简单的字符串，也可以是包含用户名和令牌的数组。例如使用 `{"gitlab.com": "privatetoken"}` 作为该选项的值，将使用 `privatetoken` 访问 GitLab 上的私有仓库。使用 `{"gitlab.com": {"username": "gitlabuser", "token": "privatetoken"}}` 将同时使用用户名和令牌来实现 GitLab 部署令牌功能（ https://docs.gitlab.com/ee/user/project/deploy_tokens/ ）。

请注意：如果包不是托管在 gitlab.com 上，还必须在 [`gitlab-domains`](config.md#gitlab-domains) 选项中指定域名。令牌必须具有 `api` 或 `read_api` 权限。更多详细信息请参见 [这里](articles/authentication-for-private-packages.md#gitlab-token)。

## gitlab-protocol

在为包元数据的 `source` 值创建仓库 URL 时强制使用的协议。可选值为 `git` 或 `http`（`https` 被视为 `http` 的同义词）。当处理引用私有仓库的项目时非常有用，这些项目稍后将在 GitLab CI 作业中使用 [GitLab CI_JOB_TOKEN](https://docs.gitlab.com/ee/ci/variables/predefined_variables.html#predefined-variables-reference) 和 HTTP 基本认证进行克隆。默认情况下，Composer 会为私有仓库生成基于 SSH 的 git URL，为公共仓库生成 HTTP(S) URL。

## forgejo-domains

默认值为 `["codeberg.org"]`。Forgejo 服务器的域名列表。
当你使用 `forgejo` 仓库类型时会用到此配置。

## forgejo-token

域名及其对应的用户名/访问令牌列表，用于身份验证。例如使用 `{"codeberg.org": {"username": "forgejo-user", "token": "access-token"}}` 作为该选项的值，将使 Composer 能够在 codeberg.org 上进行身份验证。

请注意：如果包不是托管在 codeberg.org 上，还必须在 [`forgejo-domains`](config.md#forgejo-domains) 选项中指定域名。
更多详细信息请参见[这里](articles/authentication-for-private-packages.md#forgejo-token)。

## disable-tls

默认值为 `false`。如果设置为 true，所有 HTTPS URL 都会尝试使用 HTTP 访问，并且不执行网络层加密。启用此选项存在安全风险，不推荐使用。更好的方式是在 php.ini 中启用 php_openssl 扩展。启用此选项会隐式禁用 `secure-http` 选项。

## secure-http

默认值为 `true`。如果设置为 true，只允许通过 Composer 下载 HTTPS URL。如果你确实绝对需要通过 HTTP 访问某些资源，可以禁用此选项，但通常使用 [Let's Encrypt](https://letsencrypt.org/) 获取免费 SSL 证书是更好的选择。

## bitbucket-oauth

一个域名和消费者凭证的列表。例如使用 `{"bitbucket.org": {"consumer-key": "myKey", "consumer-secret": "mySecret"}}`。更多详情请阅读 [这里](articles/authentication-for-private-packages.md#bitbucket-oauth)。

## cafile

本地文件系统上证书颁发机构（CA）文件的位置。在 PHP 5.6+ 中，建议通过 php.ini 中的 openssl.cafile 来设置，尽管 PHP 5.6+ 通常能自动检测系统 CA 文件。

## capath

如果未指定 cafile 或在该文件中找不到证书，则会在 capath 指向的目录中搜索合适的证书。capath 必须是正确哈希处理的证书目录。

## http-basic

域名及其对应的用户名/密码列表，用于身份验证。例如，使用 `{"example.org": {"username": "alice", "password": "foo"}}` 作为该选项的值，将使 Composer 能够在 example.org 上进行身份验证。更多详情请参见 [这里](articles/authentication-for-private-packages.md#http-basic)。

## bearer

域名及其对应的令牌列表，用于身份验证。例如，使用 `{"example.org": "foo"}` 作为该选项的值，将使 Composer 能够使用 `Authorization: Bearer foo` 头信息在 example.org 上进行身份验证。

## platform

允许你伪造平台包（PHP 和扩展），以便模拟生产环境或在配置中定义目标平台。例如：`{"php": "7.0.3", "ext-something": "4.0.3"}`。

这将确保无论你本地实际运行的 PHP 版本如何，都不会安装需要高于 PHP 7.0.3 版本的包。但这也意味着依赖关系不再被正确检查，如果你运行的是 PHP 5.6，虽然可以正常安装（因为它假设是 7.0.3），但在运行时会失败。这也意味着如果指定了 `{"php":"7.4"}`，则不会使用将 7.4.1 作为最低要求的包。

因此，如果你使用此功能，建议也将在部署策略中运行 [`check-platform-reqs`](cli.md#check-platform-reqs) 命令，这样更安全。

如果某个依赖项引用你本地未安装的扩展，你可以通过向 `update`、`install` 或 `require` 命令传递 `--ignore-platform-req=ext-foo` 参数来忽略它。但从长远来看，你应该安装所需的扩展，因为如果你现在忽略了一个扩展，而一个月后添加的新包也需要它，你可能会在生产环境中无意中引入问题。

如果你本地安装了某个扩展但**在生产环境中没有**，你可以使用 `{"ext-foo": false}` 来人为地将其从 Composer 中隐藏。

## vendor-dir

默认值为 `vendor`。如果你想将依赖项安装到不同的目录，可以修改此配置。在 `vendor-dir` 和以下所有 `*-dir` 选项中，`$HOME` 和 `~` 将被替换为你的主目录路径。

## bin-dir

默认值为 `vendor/bin`。如果项目包含可执行文件，它们将被符号链接到此目录中。

## data-dir

在 Windows 上默认为 `C:\Users\<user>\AppData\Roaming\Composer`，在遵循 XDG Base Directory 规范的 Unix 系统上默认为 `$XDG_DATA_HOME/composer`，在其他 Unix 系统上默认为 `$COMPOSER_HOME`。

目前该目录仅用于存储过去的 composer.phar 文件，以便能够回滚到旧版本。另请参见 [COMPOSER_HOME](cli.md#composer-home)。

## cache-dir

在 Windows 上默认为 `C:\Users\<user>\AppData\Local\Composer`，在 macOS 上默认为 `/Users/<user>/Library/Caches/composer`，在遵循 XDG Base Directory 规范的 Unix 系统上默认为 `$XDG_CACHE_HOME/composer`，在其他 Unix 系统上默认为 `$COMPOSER_HOME/cache`。

存储 Composer 使用的所有缓存。另请参见 [COMPOSER_HOME](cli.md#composer-home)。

## cache-files-dir

默认为 `$cache-dir/files`。存储包的 zip 归档文件。

## cache-repo-dir

默认为 `$cache-dir/repo`。存储 `composer` 类型的仓库元数据以及 `svn`、`fossil`、`github` 和 `bitbucket` 类型的 VCS 仓库元数据。

## cache-vcs-dir

默认为 `$cache-dir/vcs`。存储 VCS 克隆副本，用于加载 `git`/`hg` 类型的 VCS 仓库元数据并加速安装过程。

## cache-files-ttl

默认为 `15552000`（6个月）。Composer 会缓存所有下载的 dist（zip、tar 等）包。默认情况下，这些缓存在六个月未使用后会被清除。此选项允许你调整这个时长（以秒为单位），或者通过将其设置为 0 来完全禁用此功能。

## cache-files-maxsize

默认为 `300MiB`。Composer 会缓存所有下载的 dist（zip、tar 等）包。当定期运行垃圾回收时，这是缓存能够使用的最大大小。较旧（使用较少）的文件将首先被删除，直到缓存大小符合要求。

## cache-read-only

默认为 `false`。是否以只读模式使用 Composer 缓存。

## bin-compat

默认为 `auto`。决定要安装的二进制文件的兼容性。

如果设置为 `auto`，则 Composer 仅在 Windows 或 WSL 上安装 .bat 代理文件。如果设置为 `full`，则会为每个二进制文件同时安装 Windows 的 .bat 文件和基于 Unix 操作系统的脚本。这主要在你在 Linux 虚拟机中运行 Composer 但仍希望在 Windows 主机操作系统中使用 `.bat` 代理文件时很有用。如果设置为 `proxy`，Composer 将只创建 bash/Unix 风格的代理文件，即使在 Windows/WSL 上也不会创建 .bat 文件。

## prepend-autoloader

默认为 `true`。如果设置为 `false`，Composer 自动加载器将不会被添加到现有的自动加载器之前。有时需要这样做来解决与其他自动加载器的互操作性问题。

## autoloader-suffix

默认为 `null`。当设置为非空字符串时，该值将用作生成的 Composer 自动加载器的后缀。如果设置为 `null`，将使用 `composer.lock` 文件中的 `content-hash` 值（如果可用）；否则将生成一个随机后缀。

## optimize-autoloader

默认为 `false`。如果设置为 `true`，在转储自动加载器时总是进行优化。

## sort-packages

默认为 `false`。如果设置为 `true`，在添加新包时，`require` 命令会保持 `composer.json` 中包按名称排序。

## classmap-authoritative

默认为 `false`。如果设置为 `true`，Composer 自动加载器将只从类映射中加载类。这蕴含了 `optimize-autoloader` 的效果。

## apcu-autoloader

默认为 `false`。如果设置为 `true`，Composer 自动加载器会检查 APCu 扩展，并在启用该扩展时使用它来缓存找到/未找到的类。

## github-domains

默认为 `["github.com"]`。在 GitHub 模式下使用的域名列表。这用于 GitHub Enterprise 设置。

## github-expose-hostname

默认为 `true`。如果设置为 `false`，为访问 GitHub API 而创建的 OAuth 令牌将包含日期而不是机器主机名。

## use-github-api

默认为 `true`。与特定仓库上的 `no-api` 键类似，将 `use-github-api` 设置为 `false` 将定义所有 GitHub 仓库的全局行为，使其像其他 git 仓库一样克隆仓库，而不是使用 GitHub API。但与直接使用 `git` 驱动程序不同的是，Composer 仍会尝试使用 GitHub 的 zip 文件。

## notify-on-install

默认为 `true`。Composer 允许仓库定义一个通知 URL，这样每当安装该仓库中的包时，仓库就会收到通知。此选项允许你禁用该行为。

## discard-changes

默认为 `false`，可选值包括 `true`、`false` 或 `"stash"`。此选项允许你设置在非交互模式下处理脏更新的默认方式。`true` 将总是丢弃 vendor 目录中的变更，而 `"stash"` 会尝试暂存并重新应用变更。如果你倾向于修改 vendors 目录，可以在 CI 服务器或部署脚本中使用此选项。

## archive-format

默认为 `tar`。覆盖归档命令使用的默认格式。

## archive-dir

默认为 `.`。归档命令创建的归档文件的默认目标目录。

示例：

```json
{
    "config": {
        "archive-dir": "/home/user/.composer/repo"
    }
}
```

## htaccess-protect

默认为 `true`。如果设置为 `false`，Composer 将不会在 Composer 主目录、缓存目录和数据目录中创建 `.htaccess` 文件。

## lock

默认为 `true`。如果设置为 `false`，Composer 将不会创建 `composer.lock` 文件，如果存在该文件也会被忽略。

## platform-check {#platform-check}

默认为 `php-only`，只检查 PHP 版本。设置为 `true` 时还会检查扩展的存在。如果设置为 `false`，Composer 将不会创建和要求在自动加载器引入过程中使用 `platform_check.php` 文件。

## secure-svn-domains

默认为 `[]`。列出应被信任/标记为使用安全的 Subversion/SVN 传输协议的域名。默认情况下，svn:// 协议被视为不安全并会抛出异常，但你可以将此配置选项设置为 `["example.org"]` 来允许在该主机名上使用 svn URL。这是比完全禁用 `secure-http` 更好/更安全的替代方案。

## bump-after-update

默认为 `false`，可选值包括 `true`、`false`、`"dev"` 或 `"no-dev"`。如果设置为 true，Composer 在运行 `update` 命令后会执行 `bump` 命令。如果设置为 `"dev"` 或 `"no-dev"`，则只会相应地更新对应的依赖项。

## allow-missing-requirements

默认为 `false`。如果设置为 true，在 `install` 期间如果有缺失的依赖引入时将忽略错误 - 即 lock 文件没有与 `composer.json` 中的最新更改保持同步。

## update-with-minimal-changes

默认为 `false`。如果设置为 true，Composer 在更新期间只会对传递依赖项进行绝对必要的更改。也可以通过 `COMPOSER_MINIMAL_CHANGES=1` 环境变量来设置。
