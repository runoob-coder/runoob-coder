---
titleTemplate: PHP 最佳实践 中文文档 | PHP | noob-coder | 菜鸟码农
description: OPcache 通过将 PHP 脚本预编译的字节码存储到共享内存中来提升 PHP 的性能， 存储预编译字节码的好处就是 省去了每次加载和解析 PHP 脚本的开销。
  PHP 5.5.0 及后续版本中已经绑定了 OPcache 扩展。 对于 PHP 5.2，5.3 和 5.4 版本可以使用 » PECL 扩展中的 OPcache 库。
head:
  - - meta
    - name: keywords
      content: 预编译,字节码,共享内存,PHP性能,OPcache,缓存 PHP 操作码,PHP最佳实践,PHP标准规范,PHP Standards Recommendations,PSR,PHP,noob-coder,菜鸟码农
---

# 缓存 PHP 操作码

## 幸运的是：PHP 内置了操作码缓存！

在旧版本的 PHP 中，每次执行脚本时都需要重新编译，即使之前已经编译过。操作码缓存是一种额外的软件，可以保存之前编译好的 PHP 代码，从而提升一些性能。过去有多种缓存方案可选。

幸运的是，Ubuntu 18.04 附带的 PHP 版本已经默认启用了内置的操作码缓存。所以你无需做任何额外操作！

## Opcache 简介

OPcache 通过将 PHP 脚本预编译的字节码存储到共享内存中来提升 PHP 的性能， 存储预编译字节码的好处就是 省去了每次加载和解析 PHP 脚本的开销。

PHP 5.5.0 及后续版本中已经绑定了 OPcache 扩展。 对于 PHP 5.2，5.3 和 5.4 版本可以使用 [» PECL](https://pecl.php.net/package/ZendOpcache) 扩展中的 OPcache 库。

## 延伸阅读

- [PHP 手册：Opcache](https://www.php.net/manual/zh/book.opcache.php)
