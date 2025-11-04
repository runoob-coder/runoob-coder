---
titleTemplate: 相关文章 | Composer中文文档 - PHP 的依赖管理器 | PHP | noob-coder | 菜鸟码农
head:
  - - meta
    - name: keywords
      content: notify-batch,archive-format,archive-dir,config,providers,require-dependencies,require-dev-dependencies,解析依赖关系,twig-template,Twig模板,output-html,dist,sha1,校验和,checksum,blacklist,whitelist,absolute-directory,output-dir,skip-dev,prefix-url,客户端证书,HTTPS,SSL/TLS,认证,ssl 上下文选项,ssh2 上下文选项,options,仓库,VCS,package.json,CLI,SSH,GitHub,GitLab,BitBucket,Subversion,Mercurial,Git,--no-interaction,bin/satis,satis.json,Docker,开源,Satis,托管和安装私有Composer包,Packagist.org,Private Packagist,Composer,依赖管理器,PHP,libraries,dependency,noob-coder,菜鸟码农
  - - meta
    - name: description
      content: 托管和安装私有Composer包
---


# 私有包处理

托管和安装私有 Composer 包

## Private Packagist

[Private Packagist](https://packagist.com) 是一个商业包托管产品，提供专业支持和基于 Web 的私有和公共包管理，以及细粒度的访问权限控制。Private Packagist 为包的 zip 文件提供镜像服务，这使得安装更快且独立于第三方系统——例如，即使 GitHub 宕机你也可以部署，因为你的 zip 文件已被镜像。

Private Packagist 提供托管的 SaaS 解决方案或本地自托管包，提供交互式设置体验。

Private Packagist 的部分收入用于支付 Composer 和 Packagist.org 的开发和托管费用，因此使用它是支持这些开源项目维护的良好方式。你可以在 [Packagist.com](https://packagist.com) 上找到更多关于如何设置自己的包存档的信息。

## Satis

另一方面，Satis 是开源的，但只是一个静态的 `composer` 仓库生成器。它有点像超轻量级的、基于静态文件的 packagist 版本，可用于托管公司私有包或你自己包的元数据。你可以使用 [Composer](https://github.com/composer/satis?tab=readme-ov-file#run-from-source) 或 [Docker](https://github.com/composer/satis?tab=readme-ov-file#run-as-docker-container) 来安装它。

### 设置

例如，假设你有一些想在公司内部重复使用的包，但又不想开源。你首先需要定义一个 Satis 配置：一个 JSON 文件，列出你精心挑选的 [repositories](../repositories.md)。

默认文件名是 `satis.json`，但你可以使用任何你喜欢的名称。

下面是一个示例配置，你可以看到它包含了一些 VCS 仓库，但这些可以是任何类型的 [repositories](../repositories.md)。然后它使用 `"require-all": true`，这会选择你在仓库中定义的所有包的所有版本。

Satis 默认查找的文件是仓库根目录下的 `satis.json`。

```json
{
    "name": "my/repository",
    "homepage": "http://packages.example.org",
    "repositories": [
        { "type": "vcs", "url": "https://github.com/mycompany/privaterepo" },
        { "type": "vcs", "url": "http://svn.example.org/private/repo" },
        { "type": "vcs", "url": "https://github.com/mycompany/privaterepo2" }
    ],
    "require-all": true
}
```

如果你想挑选特定的包，你可以在经典的 composer `require` 键中列出你希望在 satis 仓库中包含的所有包，使用 `"*"` 约束来确保选择所有版本，或者使用其他约束来获取特定版本。

```json
{
    "repositories": [
        { "type": "vcs", "url": "https://github.com/mycompany/privaterepo" },
        { "type": "vcs", "url": "http://svn.example.org/private/repo" },
        { "type": "vcs", "url": "https://github.com/mycompany/privaterepo2" }
    ],
    "require": {
        "company/package": "*",
        "company/package2": "*",
        "company/package3": "2.0.0"
    }
}
```


完成这些设置后，你可以运行：

```bash
php bin/satis build <configuration file> <build dir>
```

当你完善了这个过程后，通常的做法是在服务器上将此命令作为 cron 定时任务运行。它会像 Packagist 一样更新你所有的包信息。

请注意，如果你的私有包托管在 GitHub 上，你的服务器应该有一个 SSH 密钥来访问这些包，然后你应该在命令中添加 `--no-interaction`（或 `-n`）标志，以确保它回退到 SSH 密钥认证而不是提示输入密码。这对于持续集成服务器也是一个很好的技巧。

设置一个指向 `web/` 目录的虚拟主机，比如说 `packages.example.org`。或者，使用 PHP >= 5.4.0，你可以使用内置的 CLI 服务器 `php -S localhost:port -t satis-output-dir/` 作为临时解决方案。

#### 部分更新

你可以告诉 Satis 只选择性地更新特定的包，或者只处理具有给定 URL 的仓库。这可以减少重建 `package.json` 文件所需的时间，如果你使用（自定义）webhook 在代码推送到你的仓库时触发重建，这会很有帮助。

要只重建特定的包，可以在命令行中传递包名，如下所示：

```bash
php bin/satis build satis.json web/ this/package that/other-package
```

请注意，这仍然需要拉取和扫描你所有的 VCS 仓库，因为任何 VCS 仓库都可能（在任何分支上）包含选定的包之一。

如果你只想扫描选定的包而不是所有 VCS 仓库，你需要为所有包声明一个 *name*（这仅适用于 VCS 仓库类型）：

```json
{
    "repositories": [
        { "name": "company/privaterepo", "type": "vcs", "url": "https://github.com/mycompany/privaterepo" },
        { "name": "private/repo", "type": "vcs", "url": "http://svn.example.org/private/repo" },
        { "name": "mycompany/privaterepo2", "type": "vcs", "url": "https://github.com/mycompany/privaterepo2" }
    ]
}
```

如果你想只扫描单个仓库并更新其中找到的所有包，可以将 VCS 仓库 URL 作为可选参数传递：

```bash
php bin/satis build --repository-url https://only.my/repo.git satis.json web/
```

### 使用

现在在你的项目中，你只需要添加自己的 Composer 仓库，并使用 `packages.example.org` 作为 URL，然后就可以引入你的私有包，一切都会顺利运行。你不再需要在每个项目中复制所有的仓库配置。只需要配置那一个会自动更新的唯一仓库即可。

```json
{
    "repositories": [ { "type": "composer", "url": "http://packages.example.org/" } ],
    "require": {
        "company/package": "1.2.0",
        "company/package2": "1.5.2",
        "company/package3": "dev-master"
    }
}
```

#### 安全性 {#security}

为了保护你的私有仓库，你可以通过 SSH 或使用客户端证书的 SSL 方式来托管它。在你的项目中，可以通过 `options` 参数指定与服务器连接的相关选项。

使用 SSH 的自定义仓库示例（需要安装 SSH2 PECL 扩展）：

```json
{
    "repositories": [{
        "type": "composer",
        "url": "ssh2.sftp://example.org",
        "options": {
            "ssh2": {
                "username": "composer",
                "pubkey_file": "/home/composer/.ssh/id_rsa.pub",
                "privkey_file": "/home/composer/.ssh/id_rsa"
            }
        }
    }]
}
```

> [!NOTE] 提示
> 更多信息请参见 [ssh2 上下文选项](https://www.php.net/manual/zh/wrappers.ssh2.php#refsect1-wrappers.ssh2-options)。

使用客户端证书的 SSL/TLS（HTTPS）示例：

```json
{
    "repositories": [{
         "type": "composer",
         "url": "https://example.org",
         "options": {
             "ssl": {
                 "local_cert": "/home/composer/.ssl/composer.pem"
             }
         }
    }]
}
```

> [!NOTE] 提示
> 更多信息请参见 [ssl 上下文选项](https://www.php.net/manual/zh/context.ssl.php)。

使用自定义 HTTP 头部字段进行令牌认证的示例：

```json
{
    "repositories": [{
        "type": "composer",
        "url": "https://example.org",
        "options":  {
            "http": {
                "header": [
                    "API-TOKEN: YOUR-API-TOKEN"
                ]
            }
        }
    }]
}
```

#### 认证

认证可以通过 [几种不同的方式](authentication-for-private-packages.md) 来处理。

#### 下载 {#downloads}

当 GitHub、GitLab 或 BitBucket 仓库在本地 satis 上镜像时，构建过程将包含这些平台提供的下载位置。这意味着仓库和你的设置依赖于这些服务的可用性。

同时，这也意味着所有托管在其他地方（在其他服务上或例如 Subversion 中）的代码将没有可用的下载，因此安装通常需要更长的时间。

要使你的 satis 安装能够为所有（Git、Mercurial 和 Subversion）包创建下载，请在你的 `satis.json` 中添加以下内容：

```json
{
    "archive": {
        "directory": "dist",
        "format": "tar",
        "prefix-url": "https://amazing.cdn.example.org",
        "skip-dev": true
    }
}
```


#### 选项说明

* `directory`：必需，dist 文件的位置（在 `output-dir` 内部）
* `format`：可选，`zip`（默认）或 `tar`
* `prefix-url`：可选，下载的位置，默认为 homepage（来自 `satis.json`）后跟 `directory`
* `skip-dev`：可选，默认为 `false`，启用时（`true`）satis 将不会为分支创建下载
* `absolute-directory`：可选，一个本地目录，dist 文件将被转储到此处而不是 `output-dir`/`directory`
* `whitelist`：可选，如果设置为包名列表，satis 将只转储这些包的 dist 文件
* `blacklist`：可选，如果设置为包名列表，satis 将不会转储这些包的 dist 文件
* `checksum`：可选，默认为 `true`，禁用时（`false`）satis 将不会为 dist 文件提供 sha1 校验和

一旦启用，所有下载（包括来自 GitHub 和 BitBucket 的下载）将被替换为本地版本。

#### prefix-url

如果下载文件最终存储在私有 Amazon S3 存储桶或 CDN 主机上，将 URL 前缀设置为另一个主机特别有用。CDN 可以大幅改善下载时间，从而加快包的安装速度。

示例：当 `prefix-url` 设置为 `https://my-bucket.s3.amazonaws.com`（且 `directory` 设置为 `dist`）时，创建的下载 URL 如下所示：

`https://my-bucket.s3.amazonaws.com/dist/vendor-package-version-ref.zip`

#### Web 输出

* `output-html`：可选，默认为 `true`，当禁用时（`false`）satis 将不会生成 `output-dir/index.html` 页面。
* `twig-template`：可选，指向个性化 [Twig](https://twig.sensiolabs.org/) 模板的路径，用于 `output-dir/index.html` 页面。

#### 废弃包

要使你的 satis 安装能够标识某些包已废弃，请在你的 `satis.json` 中添加以下内容：

```json
{
    "abandoned": {
        "company/package": true,
        "company/package2": "company/newpackage"
    }
}
```

`true` 值表示该包真正被废弃了，而 `"company/newpackage"` 值指定了该包被 `company/newpackage` 包所替代。

注意，在其自身的 `composer.json` 文件中标记为废弃的包也将被标记为废弃。

#### 解析依赖关系

可以让 satis 自动解析并添加项目的所有依赖项。这可以与下载功能一起使用，以拥有包的完整本地镜像。将以下内容添加到你的 `satis.json` 中：

```json
{
    "require-dependencies": true,
    "require-dev-dependencies": true
}
```

在搜索包时，satis 将尝试从列出的仓库中解析所有必需的包。因此，如果你需要从 Packagist 获取一个包，你需要在你的 `satis.json` 中定义它。

只有当 `require-dev-dependencies` 参数设置为 true 时，才会打包开发依赖项。

#### 其他选项

* `providers`：可选，默认为 `false`，当启用时（`true`）每个包将被转储到一个单独的包含文件中，该文件只有在真正需要包时才会被 Composer 加载。可以加速处理包含大量包的仓库（如 packagist）。
* `output-dir`：可选，定义在调用 `build` 命令时如果没有作为参数提供，则在哪里输出仓库文件。
* `config`：可选，让你定义所有 composer 配置选项，除了 `archive-format` 和 `archive-dir`，因为配置是通过 [archive](#downloads) 完成的。更多详情请参见 [配置](../config.md) 文档。
* `notify-batch`：可选，指定每次用户安装包时将调用的 URL。参见 [notify-batch](../repositories.md#notify-batch)。
