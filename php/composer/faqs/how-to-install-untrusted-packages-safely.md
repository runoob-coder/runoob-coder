---
titleTemplate: 常见问题 | Composer中文文档 - PHP 的依赖管理器 | PHP | noob-coder | 菜鸟码农
head:
  - - meta
    - name: keywords
      content: update,install,exec,--no-scripts,--no-plugins,COMPOSER_ALLOW_SUPERUSER,Do not run Composer as root/super user,超级用户,root,composer.json,vendor,Composer,依赖管理器,PHP,libraries,dependency,noob-coder,菜鸟码农
  - - meta
    - name: description
      content: 如何安全地安装不受信任的包？以超级用户或root身份运行Composer是否安全？
---

# 如何安全地安装不受信任的包？以超级用户或root身份运行Composer是否安全？

## 为什么我会看到“Do not run Composer as root/super user”警告/错误？

出于以下详细原因，**始终不建议以 root 身份运行 Composer**。

从 Composer 2.4.2 开始，当以 root 身份运行且没有明确迹象表明用户有意这样做时，插件会自动禁用。用户同意有两种方式：

- 如果你以交互方式运行，Composer 会提示你是否确定要继续以 root 身份运行；
- 如果你设置 [COMPOSER_ALLOW_SUPERUSER](../cli.md#composer-allow-superuser) 环境变量为 `1`，这也表明你有意以 root 身份运行 Composer 并接受这样做的风险。

## 以超级用户或 root 身份运行 Composer 是否安全？

某些 Composer 命令，包括 `exec`、`install` 和 `update` 允许第三方代码在你的系统上执行。这来自于其“插件”和“脚本”功能。插件和脚本对运行 Composer 的用户账户具有完全访问权限。因此，强烈建议**避免以超级用户/root 身份运行 Composer**。所有命令都会分发插件可以捕获的事件，除非明确禁用，否则已安装的插件将被每个 Composer 命令加载/执行。

你可以在包安装或更新期间使用以下语法禁用插件和脚本，这样只有 Composer 的代码会执行，而不会执行第三方代码：

```shell
php composer.phar install --no-plugins --no-scripts ...
php composer.phar update --no-plugins --no-scripts ...
```

根据操作系统不同，我们见过可以通过精心制作的 `composer.json` 触发仓库中文件执行的情况。因此，如果你确实想要安装不受信任的依赖项，应该将它们完全沙箱化到容器或等效环境中。

另请注意，`exec` 命令将始终以运行 `composer` 的用户身份执行第三方代码。

有关如何禁用警告的更多信息，请参见 [COMPOSER_ALLOW_SUPERUSER](../cli.md#composer-allow-superuser) 环境变量。

## 在 Docker/Podman 容器内运行 Composer

Composer 会尽力检测是否在容器内运行，如果是，则允许以 root 身份运行而不会出现任何问题。但如果检测失败，你将看到警告，并且插件会被禁用，除非你设置了 [COMPOSER_ALLOW_SUPERUSER](../cli.md#composer-allow-superuser) 环境变量。
