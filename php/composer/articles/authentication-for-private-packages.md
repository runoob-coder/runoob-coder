---
titleTemplate: 相关文章 | Composer中文文档 - PHP 的依赖管理器 | PHP | noob-coder | 菜鸟码农
head:
  - - meta
    - name: keywords
      content: codeberg.org,forgejo-domains,Forgejo,passphrase,local_pk,local_cert,SSL 上下文选项,BitBucket REST API,github.com,Tokens (classic),经典令牌,细粒度令牌,Fine-grained tokens,gitlab-domains,COMPOSER_AUTH,command-line,命令行配置,client-tls-certificates,客户端 TLS 证书,auth.json,forgejo-token,客户端 TLS 证书,bitbucket-oauth,github-oauth,gitlab-token,gitlab-oauth,inline-custom-headers,内联自定义 Headers,自定义 Headers,HTTP Bearer,inline-http-basic,内联 http-basic,http-basic,身份验证原理,私有包服务器,Composer,依赖管理器,PHP,libraries,dependency,noob-coder,菜鸟码农
  - - meta
    - name: description
      content: 你的私有包服务器或版本控制系统可能通过一种或多种身份验证选项进行保护。为了让你的项目能够访问这些包和存储库，你需要告诉 Composer 如何与托管它们的服务器进行身份验证。
---

# 私有托管包和存储库的身份验证

你的 [私有包服务器](handling-private-packages.md) 或版本控制系统可能通过一种或多种身份验证选项进行保护。为了让你的项目能够访问这些包和存储库，你需要告诉 Composer 如何与托管它们的服务器进行身份验证。

## 身份验证原理

每当 Composer 遇到受保护的 Composer 仓库时，它会首先尝试使用已定义的凭据进行身份验证。当这些凭据都不适用时，它会提示输入凭据并保存它们（或者如果 Composer 能够获取到令牌，则保存令牌）。

|                  认证类型                   | 由提示生成？ |
|:---------------------------------------:|:------:|
|        [http-basic](#http-basic)        |  yes   |
|   [内联 http-basic](#inline-http-basic)   |   no   |
|       [HTTP Bearer](#http-bearer)       |   no   |
|     [自定义 Headers](#custom-headers)      |   no   |
| [内联自定义 Headers](#inline-custom-headers) |   no   |
|      [gitlab-oauth](#gitlab-oauth)      |  yes   |
|      [gitlab-token](#gitlab-token)      |  yes   |
|      [github-oauth](#github-oauth)      |  yes   |
|   [bitbucket-oauth](#bitbucket-oauth)   |  yes   |
| [客户端 TLS 证书](#client-tls-certificates)  |   no   |
|     [forgejo-token](#forgejo-token)     |  yes   |

有时自动身份验证不可行，或者你可能希望预定义身份验证凭据。

凭据可以存储在 4 个不同的位置：项目的 `auth.json` 文件中、全局的 `auth.json` 文件中、`composer.json` 文件本身中，或者在 `COMPOSER_AUTH` 环境变量中。

### 项目中的 auth.json 身份验证

在这种身份验证存储方法中，`auth.json` 文件将存在于与项目 `composer.json` 文件相同的文件夹中。你可以使用命令行创建和编辑此文件，或手动编辑或创建它。

> [!NOTE] 注意
> **确保 `auth.json` 文件在 `.gitignore` 中**，以避免将凭据泄露到你的 git 历史记录中。

### 全局身份验证凭据

如果你不想为每个项目都提供凭据，那么全局存储你的凭据可能是一个更好的想法。这些凭据存储在你的 Composer 主目录中的全局 `auth.json` 文件里。

#### 命令行全局凭据编辑 {#command-line-global-credential-editing}

对于以下所有身份验证方法，都可以使用命令行进行编辑；

- [http-basic](#command-line-http-basic)
- [内联 http-basic](#command-line-inline-http-basic)
- [HTTP Bearer](#command-line-http-bearer-authentication)
- [自定义 Headers](#command-line-custom-headers)
- [gitlab-oauth](#command-line-gitlab-oauth)
- [gitlab-token](#command-line-gitlab-token)
- [github-oauth](#command-line-github-oauth)
- [bitbucket-oauth](#command-line-bitbucket-oauth)
- [forgejo-token](#command-line-forgejo-token)

#### 手动编辑全局身份验证凭据

> [!NOTE] 注意
> 不建议手动编辑你的身份验证选项，因为这可能导致无效的 JSON。
> 相反，最好使用 [命令行](#command-line-global-credential-editing)。

要手动编辑，请运行：

```shell
php composer.phar config --global --editor [--auth]
```

有关特定身份验证实现，请参见其章节：

- [http-basic](#manual-http-basic)
- [内联 http-basic](#manual-inline-http-basic)
- [HTTP Bearer](#http-bearer)
- [自定义 Headers](#manual-custom-headers)
- [内联自定义 Headers](#manual-inline-custom-headers)
- [gitlab-oauth](#manual-gitlab-oauth)
- [gitlab-token](#manual-gitlab-token)
- [github-oauth](#manual-github-oauth)
- [bitbucket-oauth](#manual-bitbucket-oauth)
- [客户端 TLS 证书](#manual-client-certificates)
- [forgejo-token](#manual-forgejo-token)

手动编辑此文件而不是使用命令行可能会导致无效的 JSON 错误。要解决此问题，你需要在编辑器中打开文件并修复错误。要找到全局 `auth.json` 的位置，请执行：

```shell
php composer.phar config --global home
```

如果存在，该文件夹将包含你的全局 `auth.json` 文件。

你可以在你喜欢的编辑器中打开此文件并修复错误。

### 在 composer.json 文件本身中进行身份验证

> [!NOTE] 注意
> **不建议这样做**，因为这些凭据对任何能够访问 `composer.json` 文件的人都是可见的，无论是在通过 git 等版本控制系统共享时，还是当攻击者获得对生产服务器文件的（读取）访问权限时。

也可以在 `config` 部分或直接在仓库定义中，按项目为基础将凭据添加到 `composer.json` 文件中。

### 使用 COMPOSER_AUTH 环境变量进行身份验证

> [!NOTE] 注意
> 使用命令行环境变量方法也有安全影响。
> 这些凭据很可能会存储在内存中，
> 并且在关闭会话时可能持久化到类似 `~/.bash_history`（Linux）或 `ConsoleHost_history.txt`（Windows 上的 PowerShell）的文件中。

为 Composer 提供凭据的最终选项是使用 `COMPOSER_AUTH` 环境变量。
这些变量可以作为命令行变量传递，或在实际环境变量中设置。
更多关于此环境变量的使用信息请参见[这里](../cli.md#composer-auth)。

## 身份验证方法

### http-basic {#http-basic}

#### 命令行配置 http-basic {#command-line-http-basic}

```shell
php composer.phar config [--global] http-basic.repo.example.org username password
```

在上述命令中，配置键 `http-basic.repo.example.org` 由两部分组成：

- `http-basic` 是身份验证方法。
- `repo.example.org` 是仓库主机名，你应该将其替换为你的仓库主机名。

#### 手动配置 http-basic {#manual-http-basic}

```shell
php composer.phar config [--global] --editor --auth
```

```json
{
  "http-basic": {
    "example.org": {
      "username": "username",
      "password": "password"
    }
  }
}
```

### 内联 http-basic {#inline-http-basic}

对于内联 http-basic 身份验证方法，凭据不会存储在项目或全局的单独 `auth.json` 文件中，而是存储在 `composer.json` 或全局配置中
Composer 仓库定义所在的位置。

确保用户名和密码按照 [RFC 3986](https://www.rfc-editor.org/rfc/rfc3986#section-2.1) (2.1. 百分号编码)
进行编码。如果用户名是电子邮件地址，则需要以 `name%40example.com` 的形式传递。

#### 命令行配置内联 http-basic {#command-line-inline-http-basic}

```shell
php composer.phar config [--global] repositories.unique-name composer https://username:password@repo.example.org
```

#### 手动配置内联 http-basic {#manual-inline-http-basic}

```shell
php composer.phar config [--global] --editor
```

```json
{
  "repositories": [
    {
      "type": "composer",
      "url": "https://username:password@example.org"
    }
  ]
}
```

### HTTP Bearer

#### 命令行配置 HTTP Bearer 认证 {#command-line-http-bearer-authentication}

```shell
php composer.phar config [--global] bearer.repo.example.org token
```

在上述命令中，配置键 `bearer.repo.example.org` 由两部分组成：

- `bearer` 是身份验证方法。
- `repo.example.org` 是仓库主机名，你应该将其替换为你的仓库主机名。

#### 手动配置 HTTP Bearer 认证

```shell
php composer.phar config [--global] --editor --auth
```

```json
{
  "bearer": {
    "example.org": "TOKEN"
  }
}
```

### 自定义 Headers {#custom-headers}

使用自定义 HTTP headers 进行身份验证，适用于需要基于 header 认证的私有仓库。

#### 命令行配置自定义 Headers {#command-line-custom-headers}

```shell
php composer.phar config [--global] custom-headers.repo.example.org "API-TOKEN: YOUR-API-TOKEN" "X-CUSTOM-HEADER: Value"
```

在上述命令中，配置键 `custom-headers.repo.example.org` 由两部分组成：

- `custom-headers` 是身份验证方法。
- `repo.example.org` 是仓库主机名，你应该将其替换为你的仓库主机名。

你可以提供多个自定义 headers 作为独立参数。每个 header 必须采用标准 HTTP header 格式 `"Header-Name: Header-Value"`。

#### 手动配置自定义 Headers {#manual-custom-headers}

```shell
php composer.phar config [--global] --editor --auth
```

```json
{
  "custom-headers": {
    "repo.example.org": [
      "API-TOKEN: YOUR-API-TOKEN",
      "X-CUSTOM-HEADER: Value"
    ]
  }
}
```

### 内联自定义 Headers {#inline-custom-headers}

#### 手动配置内联自定义 Headers {#manual-inline-custom-headers}

对于内联自定义 headers 身份验证方法，自定义 headers 直接在你的 `composer.json` 文件中作为仓库配置的一部分进行定义。

```shell
php composer.phar config [--global] --editor
```

```json
{
  "repositories": [
    {
      "type": "composer",
      "url": "https://repo.example.org",
      "options": {
        "http": {
          "header": [
            "API-TOKEN: YOUR-API-TOKEN",
            "X-CUSTOM-HEADER: Value"
          ]
        }
      }
    }
  ]
}
```

### gitlab-oauth

> [!NOTE] 注意
> 要使 gitlab 身份验证在私有 gitlab 实例上工作，[`gitlab-domains`](../config.md#gitlab-domains) 部分也应包含 URL。

#### 命令行配置 gitlab-oauth {#command-line-gitlab-oauth}

```shell
php composer.phar config [--global] gitlab-oauth.gitlab.example.org token
```

在上述命令中，配置键 `gitlab-oauth.gitlab.example.org` 由两部分组成：

- `gitlab-oauth` 是身份验证方法。
- `gitlab.example.org` 是你的 GitLab 实例的主机名，你应该将其替换为你的 GitLab 实例的主机名，如果没有自托管的 GitLab 实例，则使用 `gitlab.com`。

#### 手动配置 gitlab-oauth {#manual-gitlab-oauth}

```shell
php composer.phar config [--global] --editor --auth
```

```json
{
  "gitlab-oauth": {
    "example.org": "token"
  }
}
```

### gitlab-token

> [!NOTE] 注意
> 要使 gitlab 身份验证在私有 gitlab 实例上工作，[`gitlab-domains`](../config.md#gitlab-domains) 部分也应包含 URL。

要创建新的访问令牌，请前往你的 [GitLab 访问令牌部分](https://gitlab.com/-/user_settings/personal_access_tokens)（或私有实例上的等效 URL）并创建新令牌。另请参阅 [GitLab 访问令牌文档](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html#creating-a-personal-access-token)
了解更多信息。

手动创建 gitlab 令牌时，请确保它具有 `read_api` 或 `api` 范围权限。

#### 命令行配置 gitlab-token {#command-line-gitlab-token}

```shell
php composer.phar config [--global] gitlab-token.gitlab.example.org token
```

在上述命令中，配置键 `gitlab-token.gitlab.example.org` 由两部分组成：

- `gitlab-token` 是身份验证方法。
- `gitlab.example.org` 是你的 GitLab 实例的主机名，你应该将其替换为你的 GitLab 实例的主机名，如果没有自托管的 GitLab 实例，则使用 `gitlab.com`。

#### 手动配置 gitlab-token {#manual-gitlab-token}

```shell
php composer.phar config [--global] --editor --auth
```

```json
{
  "gitlab-token": {
    "example.org": "token"
  }
}
```

### github-oauth

GitHub 目前提供了两种类型的访问令牌：

- [细粒度令牌（Fine-grained tokens）](https://github.com/settings/personal-access-tokens)
- [经典令牌（Tokens (classic)）](https://github.com/settings/personal-access-tokens)

你可以在 [Settings](https://github.com/settings/profile) 中找到这些令牌，位于左侧菜单的最底部（[Developer](https://github.com/settings/apps)选项）。要创建一个新的访问令牌，请前往你的 [GitHub 令牌设置部分](https://github.com/settings/personal-access-tokens) 并 [生成一个新令牌](https://github.com/settings/personal-access-tokens/new)。

了解更多关于 [个人访问令牌](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) 的信息。

官方 [推荐](https://docs.github.com/zh/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#%E5%88%9B%E5%BB%BA-fine-grained-personal-access-token) 使用细粒度令牌，因为你可以更精确地控制哪些资源可以被访问。Composer 需要对仓库元数据和内容的只读访问权限。

在大多数情况下，拥有对公共仓库只读权限的细粒度令牌可能已经足够了。即使没有任何额外权限，这类令牌也能 [提高你的 API 请求频率限制](https://docs.github.com/zh/rest/using-the-rest-api/rate-limits-for-the-rest-api)。

在以下情况中，你可能需要额外的权限：

- 你在 `composer.json` 文件中使用了指向私有仓库的 `vcs` 类型的 `repositories` 条目。
- 你正在通过 HTTPS（而非 SSH）克隆私有仓库的 `source` 或下载 `dist` 文件。

在这些情况下，请创建一个对“内容”具有只读权限的细粒度令牌。这个令牌可以绑定到你的所有仓库或组织的所有仓库，甚至可以限定为仅某些特定仓库。

截至 2025 年 11 月，细粒度令牌有一个限制：你只能使用它来访问单个用户 **或** 单个组织的私有仓库。你可能需要查看 [GitHub 文档](https://docs.github.com/zh/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#fine-grained-personal-access-tokens-%E9%99%90%E5%88%B6) 获取详细信息。如果你需要操作来自不同组织的仓库，可以检查是否可以通过目录级别的认证配置来满足需求。

最后的选择是使用带有 `repo` 范围权限的“经典”令牌，它将授予对你所有私有仓库的广泛访问权限——包括写入权限和其他更多权限。完整的权限列表请参见 [OAuth 应用的范围 文档](https://docs.github.com/zh/apps/oauth-apps/building-oauth-apps/scopes-for-oauth-apps)。使用这种类型的令牌时请务必小心。

无论使用哪种类型的令牌，我们都建议使用具有有限生命周期的令牌。这样可以在令牌泄露时减少风险暴露。

#### 命令行配置 github-oauth {#command-line-github-oauth}

```shell
php composer.phar config [--global] github-oauth.github.com token
```

在上述命令中，配置键 `github-oauth.github.com` 由两部分组成：

- `github-oauth` 是身份验证方法。
- `github.com` 是此令牌适用的主机名。对于 GitHub，你很可能不需要更改此项。

#### 手动配置 github-oauth {#manual-github-oauth}

```shell
php composer.phar config [--global] --editor --auth
```

```json
{
  "github-oauth": {
    "github.com": "token"
  }
}
```

### bitbucket-oauth {#bitbucket-oauth}

BitBucket 驱动程序使用 OAuth 通过 BitBucket REST API 访问你的私有仓库，你需要创建一个 OAuth 消费者来使用该驱动程序，请参考 [Atlassian 文档](https://support.atlassian.com/bitbucket-cloud/docs/use-oauth-on-bitbucket-cloud/)。你需要填写回调 URL 来满足 BitBucket 的要求，但该地址不需要指向任何地方，Composer 也不会使用它。

#### 命令行配置 bitbucket-oauth {#command-line-bitbucket-oauth}

```shell
php composer.phar config [--global] bitbucket-oauth.bitbucket.org consumer-key consumer-secret
```

在上述命令中，配置键 `bitbucket-oauth.bitbucket.org` 由两部分组成：

- `bitbucket-oauth` 是身份验证方法。
- `bitbucket.org` 是此令牌适用的主机名。除非你有私有实例，否则不需要更改此项。

#### 手动配置 bitbucket-oauth {#manual-bitbucket-oauth}

```shell
php composer.phar config [--global] --editor --auth
```

```json
{
  "bitbucket-oauth": {
    "bitbucket.org": {
      "consumer-key": "key",
      "consumer-secret": "secret"
    }
  }
}
```

### 客户端 TLS 证书 {#client-tls-certificates}

访问需要客户端 TLS 证书的私有仓库。

有关全局/项目范围的配置，请参见[处理私有包：安全部分](handling-private-packages.md#security)。

#### 手动配置客户端证书 {#manual-client-certificates}

```shell
php composer.phar config [--global] --editor --auth
```

```json
{
  "client-certificate": {
    "repo.example.org": {
      "local_cert": "/path/to/certificate",
      "local_pk": "/path/to/key",
      "passphrase": "MySecretPassword"
    }
  }
}
```

支持的选项有 `local_cert`（必需）、`local_pk`、`passphrase`。

有关选项的更多信息，请参见 [SSL 上下文选项](https://www.php.net/manual/zh/context.ssl.php)。

可以省略的选项：

- `local_pk`：当证书和私钥保存在单个文件中时；
- `passphrase`：当私钥没有密码时。

### forgejo-token

> [!NOTE] 注意
> 要使 forge 认证在私有 Forgejo 实例上工作，[`forgejo-domains`](../config.md#forgejo-domains) 部分也应包含域名。

要创建新的访问令牌，请前往你的 [Forgejo 应用程序部分](https://codeberg.org/user/settings/applications)（或私有实例上的等效 URL）并创建新的访问令牌。另请参阅 [Forgejo 访问令牌文档](https://docs.codeberg.org/advanced/access-token/)了解更多信息。

创建 Forgejo 访问令牌时，请确保它具有 `read:repository` 范围权限。

#### 命令行配置 forgejo-token {#command-line-forgejo-token}

```shell
php composer.phar config [--global] forgejo-token.forgejo.example.org username access-token
```

在上述命令中，配置键 `forgejo-token.forgejo.example.org` 由两部分组成：

- `forgejo-token` 是身份验证方法。
- `forgejo.example.org` 是你的 Forgejo 实例的主机名，你应该将其替换为你的 Forgejo 实例的主机名，如果没有自托管的 Forgejo 实例，则使用 `codeberg.org`。

#### 手动配置 forgejo-token {#manual-forgejo-token}

```shell
php composer.phar config [--global] --editor --auth
```

```json
{
  "forgejo-token": {
    "forgejo.example.org": {
      "username": "forgejo-user",
      "token": "access-token"
    }
  }
}
```
