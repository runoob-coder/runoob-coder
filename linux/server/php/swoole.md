---
titleTemplate: PHP | 个人服务器环境搭建 | noob-coder | 菜鸟码农
head:
  - - meta
    - name: description
      content: Swoole 扩展是按照 PHP 标准扩展构建的。使用 phpize 来生成编译检测脚本，./configure 来做编译配置检测，make 进行编译，make install 进行安装。
  - - meta
    - name: keywords
      content: swoole,pecl,现代php,PHP开发工具,phpize,php-config,gcc,make.m4,libtool,automake,autoconf,zip,Packagist,php扩展,php安装工具,PIE,服务器优化,www,dnf,yum,Linux,服务器环境搭建,宝塔面板一键部署,服务器运维面板,宝塔,nginx,Apache,mysql,redis,ssl,supervisor,git,composer,php,noob-coder,菜鸟码农
---

# 编译安装swoole扩展

官网文档：https://wiki.swoole.com/zh-cn/#/environment

::: code-group

```bash [PIE]
pie install swoole/swoole --enable-sockets --enable-mysqlnd --enable-swoole-curl --enable-cares --enable-brotli --enable-swoole-thread --enable-iouring --enable-uring-socket --enable-zstd
```

```bash [pecl]
pecl install swoole --enable-sockets --enable-mysqlnd --enable-swoole-curl --enable-cares --enable-brotli --enable-swoole-thread --enable-iouring --enable-uring-socket --enable-zstd
```
:::

```
[root@test php-8.5.4]# pie install swoole/swoole --enable-sockets --enable-mysqlnd --enable-swoole-curl --enable-brotli --enable-zstd
🥧 PHP Installer for Extensions (PIE) 1.3.10, from The PHP Foundation
You are running PHP 8.5.4
Target PHP installation: 8.5.4 nts, on Linux/OSX/etc x86_64 (from /usr/local/php/php85/bin/php)
Found package: swoole/swoole:v6.2.0 which provides ext-swoole
Extracted swoole/swoole:v6.2.0 source to: /root/.config/pie/php8.5_8ed61784f2d318209b3eaa24119e1036/vendor/swoole/swoole
phpize complete.
Configure complete with options: --enable-brotli --enable-mysqlnd --enable-sockets --enable-swoole-curl --enable-zstd --with-php-config=/usr/local/php/php85/bin/php-config
Build complete: /root/.config/pie/php8.5_8ed61784f2d318209b3eaa24119e1036/vendor/swoole/swoole/modules/swoole.so
Install complete: /usr/local/php/php85/lib/php/extensions/no-debug-non-zts-20250925/swoole.so
✅ Extension is enabled and loaded in /usr/local/php/php85/bin/php
```

## 安装问题

https://wiki.swoole.com/zh-cn/#/question/install

### error "swoole thread must be used with ZTS"

Swoole 扩展要求 PHP 必须是以 ZTS（Zend Thread Safety）模式编译的，但当前安装的 PHP 可能是非线程安全（NTS）版本。Swoole 的某些特性（特别是多线程支持）需要 ZTS。

详见：https://wiki.swoole.com/zh-cn/#/thread/thread
