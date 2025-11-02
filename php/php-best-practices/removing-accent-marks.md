---
titleTemplate: PHP 最佳实践 中文文档 | PHP | noob-coder | 菜鸟码农
aside: false
head:
  - - meta
    - name: keywords
      content: PHP最佳实践,PHP标准规范,PHP Standards Recommendations,PSR,PHP,noob-coder,菜鸟码农
---

# 移除重音符号（变音符号）

大多数网络指南会建议使用 PHP 的 [`iconv()`](https://www.php.net/manual/zh/function.iconv.php) 函数来移除变音符号。然而 `iconv()` 经常在处理 UTF-8 输入时遇到问题，有时会产生令人意外的错误。

更好的方法是使用 PHP 的 [intl](https://www.php.net/manual/zh/book.intl.php) 库。可以通过以下命令安装：

```bash
sudo apt install php-intl
```

安装完成后，使用 [`Transliterator`](https://www.php.net/manual/zh/class.transliterator.php) 类从文本中移除变音符号：

```php
<?php
$transliterator = Transliterator::createFromRules(':: Any-Latin; :: Latin-ASCII; :: NFD; :: [:Nonspacing Mark:] Remove; :: NFC;', Transliterator::FORWARD);
 
 // 输出：El sila erin lu e-govaned vin.
print($transliterator->transliterate('Êl síla erin lû e-govaned vîn.'));
?>
```
