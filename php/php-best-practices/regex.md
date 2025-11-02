---
titleTemplate: PHP 最佳实践 中文文档 | PHP | noob-coder | 菜鸟码农
head:
  - - meta
    - name: keywords
      content: PHP最佳实践,PHP标准规范,PHP Standards Recommendations,PSR,PHP,noob-coder,菜鸟码农
---


# PHP 与正则表达式

## 使用 [`PCRE（preg_*）`](https://www.php.net/manual/zh/book.pcre.php) 家族函数

在 PHP 7 之前，PHP 有两种使用正则表达式的方法：[`PCRE`](https://www.php.net/manual/zh/book.pcre.php)（兼容 Perl 的 preg_* 函数）和 POSIX（扩展 ereg_* 函数）。

每个函数族使用的正则表达式语法略有不同。幸运的是，ereg_* 函数在 PHP 7 中已被移除，这种混淆已经不存在了。

## 注意事项

使用正则表达式时，请记得加上 /u 标志，以确保在 Unicode 模式下工作。

## 延伸阅读

- [PHP 手册：PCRE](https://www.php.net/manual/zh/book.pcre.php)
- [PHP 正则表达式入门](http://www.noupe.com/php/php-regular-expressions.html)
