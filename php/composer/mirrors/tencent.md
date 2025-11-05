---
titleTemplate: Composer国内镜像 | Composer中文文档 - PHP 的依赖管理器 | PHP | noob-coder | 菜鸟码农
head:
  - - meta
    - name: keywords
      content: Composer国内镜像,repositories,Packagist,composer.json,monolog/monolog,Composer,PHP,libraries,dependency,noob-coder,菜鸟码农
  - - meta
    - name: description
      content: 腾讯云 Composer 全量镜像
---

# 腾讯云 Composer 全量镜像

## Composer 安装

```shell
# 一、下载：
wget https://mirrors.tencent.com/composer/composer.phar

# 二、安装：
mv composer.phar /usr/local/bin/composer
```

更多信息请参考 composer 文档 [安装使用](../intro.md#installation-linux-unix-macos) 部分。

## 腾讯源配置

配置镜像地址：

```shell
composer config -g repos.packagist composer https://mirrors.tencent.com/composer/
```

取消全局配置：

```shell
composer config -g --unset repos.packagist
```

## Composer调试

composer 命令增加 `-vvv` 输出详细的信息：

```shell
composer -vvv require tencentcloud/tencentcloud-sdk-php
```

将Composer版本升级到最新：

```shell
composer self-update
```

执行诊断命令：

```shell
composer diagnose
```

清除缓存：

```shell
composer clear
```

若项目之前已通过其他源安装，则需要更新 composer.lock 文件，执行命令：

```shell
composer update --lock
```

更多信息请参考 composer 文档 [命令行界面 / 命令](../cli.md) 部分。

## 《Composer V1 停止服务公告》

根据[《packagist公告》](https://blog.packagist.com/shutting-down-packagist-org-support-for-composer-1-x/)，请使用 composer v1 的用户尽快升级至v2 —— Composer 1.x 存在架构问题，使其难以管理拥有 40 万个包和超过 450 万个版本的包存储库。因此，我们在 2021 年 2 月弃用了 Composer 1.x 支持，并引入了元数据更新的延迟和对新包的访问限制。为了将我们的精力集中在支持和增强 Composer 2.x 上，我们现在宣布在 Packagist.org 上完全关闭 Composer 1.x 元数据访问。

### 关键日期
- 2025 年 2 月 1 日: Composer 1.x 元数据将变为只读。在此日期之后，Composer 1.x 用户将无法看到新的包或新版本。
- 2025 年 8 月 1 日: Composer 1.x 元数据访问将完全关闭。使用 Composer 1.x 尝试更新包将不再起作用。
