---
titleTemplate: PHP 最佳实践 中文文档 | PHP | noob-coder | 菜鸟码农
description: 关于字符串到底该用单引号（‘）还是双引号（“）定义，已经有很多讨论。单引号字符串不会被解析，内容原样输出。双引号字符串会被解析，字符串中的 PHP 变量会被替换。此外，像 \n（换行）、\t（制表）这样的转义字符，单引号不会解析，双引号会解析。
  由于双引号字符串在运行时会被解析，有人认为用单引号字符串性能更好，因为 PHP 不需要解析每个字符串。理论上在某些场景下可能如此，但对于一般实际应用来说，差异非常小，可以忽略不计。所以对于普通应用，选哪种都无所谓。极高负载的应用可能会有一点影响。根据你的需求选择，但无论选哪种，请保持一致。
head:
  - - meta
    - name: keywords
      content: 单引号,双引号,性能差异,转义字符,PHP最佳实践,PHP标准规范,PHP Standards Recommendations,PSR,PHP,noob-coder,菜鸟码农
---

# 单引号与双引号的性能差异

## 实际上没什么影响

关于字符串到底该用单引号（`‘`）还是双引号（`“`）定义，已经有很多讨论。单引号字符串不会被解析，内容原样输出。双引号字符串会被解析，字符串中的 PHP 变量会被替换。此外，像 `\n`（换行）、`\t`（制表）这样的转义字符，单引号不会解析，双引号会解析。

由于双引号字符串在运行时会被解析，有人认为用单引号字符串性能更好，因为 PHP 不需要解析每个字符串。理论上在某些场景下可能如此，但对于一般实际应用来说，差异非常小，可以忽略不计。所以对于普通应用，选哪种都无所谓。极高负载的应用可能会有一点影响。根据你的需求选择，但无论选哪种，请保持一致。

## 延伸阅读

- [PHP 手册：字符串](https://www.php.net/manual/zh/language.types.string.php)
- [The PHP Benchmark（下拉查看 Quote Types 部分）](http://phpbench.com/) 
- [Stack Overflow：PHP 单引号和双引号有性能差异吗？](http://stackoverflow.com/questions/482202/is-there-a-performance-benefit-single-quote-vs-double-quote-in-php)
