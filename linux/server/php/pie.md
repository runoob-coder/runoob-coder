---
titleTemplate: PHP | 个人服务器环境搭建 | noob-coder | 菜鸟码农
head:
  - - meta
    - name: description
      content: PIE是PHP安装工具，可用于安装第三方PHP扩展，并支持便捷地进行安装与更新。它利用Packagist中的PHP扩展仓库来查找扩展的源代码以进行构建，或在存在时下载 Windows 二进制文件。若下载的是源代码，该工具还能自动完成构建和安装过程。
  - - meta
    - name: keywords
      content: pecl,现代php,PHP开发工具,phpize,php-config,gcc,make.m4,libtool,automake,autoconf,zip,Packagist,php扩展,php安装工具,PIE,服务器优化,www,dnf,yum,Linux,服务器环境搭建,宝塔面板一键部署,服务器运维面板,宝塔,nginx,Apache,mysql,redis,ssl,supervisor,git,composer,php,noob-coder,菜鸟码农
---

# PIE

`PIE` 是 `PHP` 安装工具，可用于安装第三方 `PHP` 扩展，并支持便捷地进行安装与更新。它利用 [Packagist](https://packagist.org) 中的 [PHP 扩展仓库](https://packagist.org/extensions) 来查找扩展的源代码以进行构建，或在存在时下载 Windows 二进制文件。若下载的是源代码，该工具还能自动完成构建和安装过程。

官方文档：
https://github.com/php/pie/blob/1.4.x/docs/zh/usage.md

## 一键安装

```bash
curl -fL --output /tmp/pie.phar https://github.com/php/pie/releases/latest/download/pie.phar \
  && sudo mv /tmp/pie.phar /usr/local/bin/pie \
  && sudo chmod +x /usr/local/bin/pie
```

## 先决条件

运行 PIE 需要 `PHP 8.1` 或更高版本。

除了 PHP，PIE 还需要系统上有以下工具才能下载、构建和安装扩展：

- 为运行 `PIE` 的 `PHP` 版本启用 `zip` 扩展，或使用 git 下载扩展源代码；
- `autoconf`、`automake`、`libtool`、`m4`、`make` 和 `gcc` 来构建扩展；
- PHP 开发工具（如 `php-config` 和 `phpize`）以准备构建扩展。

此外，每个扩展可能有自己的要求，例如额外的库。

```bash
sudo yum install git autoconf automake libtool m4 make gcc
```
