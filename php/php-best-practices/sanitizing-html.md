---
titleTemplate: PHP 最佳实践 中文文档 | PHP | noob-coder | 菜鸟码农
description: 对于简单过滤使用 htmlentities() 函数，对于复杂过滤使用 HTML Purifier 库。
head:
  - - meta
    - name: keywords
      content: 过滤用户输入,htmlspecialchars,filter_var,验证邮箱地址,strip_tags,安全过滤,HTML Purifier,htmlentities,过滤HTML,HTML,PHP最佳实践,PHP标准规范,PHP Standards Recommendations,PSR,PHP,noob-coder,菜鸟码农
---

# 过滤 HTML 输入和输出

## 对于简单过滤使用 [htmlentities()](https://www.php.net/manual/zh/function.htmlentities.php) 函数，对于复杂过滤使用 [HTML Purifier](http://htmlpurifier.org/) 库。

测试版本：[HTML Purifier](http://htmlpurifier.org/) 4.10.0。

在任何 Web 应用中显示用户输入内容时，首先必须对其进行"安全过滤"，以清除任何潜在危险的 HTML 代码。恶意用户可能精心构造 HTML 代码，如果你的 Web 应用直接输出这些内容，对浏览者来说可能存在安全风险。

虽然使用正则表达式来过滤 HTML 看似简便，但请避免这样做。HTML 是一门复杂的标记语言，几乎可以肯定的是，任何试图用正则表达式来过滤 HTML 的尝试最终都会失败。

你可能还会看到有人建议使用 [strip_tags()](https://www.php.net/manual/zh/function.strip-tags.php) 函数。虽然从技术角度来说 strip_tags() 是安全的，但它是一个"简单粗暴"的函数。如果输入的是无效 HTML（例如缺少结束标签），strip_tags() 可能会移除比预期多得多的内容。因此这也不是一个理想的选择，因为非技术用户在交流中经常使用 < 和 > 字符。

如果你阅读了 [验证邮箱地址](./validating-emails.md) 的章节，你可能也在考虑使用 [filter_var()](https://www.php.net/manual/zh/function.filter-var.php) 函数。但是 [filter_var() 函数在处理换行符方面存在问题](http://stackoverflow.com/questions/3150413/filter-sanitize-special-chars-problem-with-line-breaks)，并且需要非直观的配置才能达到与 [htmlentities()](https://www.php.net/manual/zh/function.htmlentities.php) 函数相似的效果。因此它也不是一个好选择。

## 简单需求的过滤

如果你的 Web 应用只需要完全转义 HTML（从而使 HTML 安全，但不完全移除），请使用 PHP 内置的 [htmlentities()](https://www.php.net/manual/zh/function.htmlentities.php) 函数。这个函数比 HTML Purifier 快得多，因为它不对 HTML 执行任何验证——只是转义所有内容。

htmlentities() 与 [htmlspecialchars()](https://www.php.net/manual/zh/function.htmlspecialchars.php) 的区别在于它编码所有适用的 HTML 实体，而不仅仅是小部分。

### 示例

```php
<?php
// 糟糕！用户提交了恶意 HTML，我们不得不在 Web 应用中显示它！
$evilHtml = '<div onclick="xss();">Mua-ha-ha!  Twiddling my evil mustache...</div>';
 
// 使用 ENT_QUOTES 标志确保单引号和双引号都被转义。
// 如果你将文本存储为 UTF-8（你应该这样做），请使用 UTF-8 字符编码。
// 有关详细信息，请参见本文档中的 UTF-8 部分。
// $safeHtml 现在是完全转义的 HTML。你可以放心地将 $safeHtml 输出给用户！
$safeHtml = htmlentities($evilHtml, ENT_QUOTES, 'UTF-8'); 
?>
```

## 复杂需求的过滤

对于许多 Web 应用来说，简单地转义 HTML 是不够的。你可能想要完全移除任何 HTML，或者允许一小部分 HTML 通过。要做到这一点，请使用 [HTML Purifier](http://htmlpurifier.org/) 库。

HTML Purifier 是一个经过良好测试但速度较慢的库。这就是为什么如果你的需求不那么复杂，你应该使用 htmlentities()，因为它会快得多。

相比 [strip_tags()](https://www.php.net/manual/zh/function.strip-tags.php)，HTML Purifier 的优势在于它会在过滤 HTML 之前先验证 HTML 的有效性。这意味着如果用户输入了无效的 HTML，HTML Purifier 比 strip_tags() 更有可能保留 HTML 的预期含义。它也是高度可定制的，允许你将 HTML 的子集列入白名单，从而保留在输出中。

缺点是它相当慢，在共享主机环境中可能需要一些设置，而且文档通常比较复杂难懂。以下示例是基本配置；查看 [文档](http://htmlpurifier.org/docs) 了解 HTML Purifier 提供的更多高级功能。

### 示例

```php
<?php
// 引入 HTML Purifier 库
require_once('htmlpurifier-4.6.0/HTMLPurifier.auto.php');
 
// 糟糕！用户提交了恶意 HTML，我们不得不在 Web 应用中显示它！
$evilHtml = '<div onclick="xss();">Mua-ha-ha!  Twiddling my evil mustache...</div>';
 
// 使用默认配置设置 HTML Purifier 对象。
$purifier = new HTMLPurifier(HTMLPurifier_Config::createDefault());
 
// $safeHtml 现在已被过滤。你可以放心地将 $safeHtml 输出给用户！
$safeHtml = $purifier->purify($evilHtml); 
?>
```

## 注意事项

- 使用 htmlentities() 时使用错误的字符编码可能导致意外输出。调用函数时请始终确保指定字符编码，并且它与被过滤字符串的编码匹配。有关详细信息，请参见 [UTF-8](./utf-8.md) 章节。
- 使用 htmlentities() 时始终包含 ENT_QUOTES（既转换双引号也转换单引号） 和字符编码参数。默认情况下，htmlentities() 不编码单引号。这是多么愚蠢的默认值！
- HTML Purifier 在处理复杂 HTML 时极其缓慢。考虑设置像 [APCu](https://phpbestpractices.org/#opcode-cache)/[Redis](https://redis.io/) 这样的缓存解决方案来存储过滤结果供以后使用。

## 延伸阅读

- [PHP HTML 过滤器比较](http://htmlpurifier.org/comparison)
- [Stack Overflow：使用 strip_tags() 防止 XSS？](http://stackoverflow.com/questions/3605629/php-prevent-xss-with-strip-tags)
- [Stack Overflow：使用 PHP 过滤用户输入的最佳方法是什么？](http://stackoverflow.com/questions/129677/whats-the-best-method-for-sanitizing-user-input-with-php)
- [Stack Overflow：FILTER_SANITIZE_SPECIAL_CHARS 与换行符的问题](http://stackoverflow.com/questions/3150413/filter-sanitize-special-chars-problem-with-line-breaks)
