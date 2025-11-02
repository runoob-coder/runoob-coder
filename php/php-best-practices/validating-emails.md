---
titleTemplate: PHP 最佳实践 中文文档 | PHP | noob-coder | 菜鸟码农
head:
  - - meta
    - name: keywords
      content: PHP最佳实践,PHP标准规范,PHP Standards Recommendations,PSR,PHP,noob-coder,菜鸟码农
---

# 验证邮箱地址
## 使用 [filter_var()](https://www.php.net/manual/zh/function.filter-var.php) 函数

你的 Web 应用常常需要检查用户输入的邮箱地址是否有效。网上有各种复杂的正则表达式号称能解决这个问题，但最简单的方法是使用 PHP 内置的 [filter_var()](https://www.php.net/manual/zh/function.filter-var.php) 函数来验证邮箱地址。


## 示例

```php
<?php
filter_var('noob-coder@qq.com', FILTER_VALIDATE_EMAIL); // 返回 "noob-coder@qq.com"，这是一个有效的邮箱地址。
filter_var('sauron@mordor', FILTER_VALIDATE_EMAIL); // 返回布尔值 false！这不是一个有效的邮箱地址。
?>
```

## 延伸阅读

- [PHP 手册：filter_var()](https://www.php.net/manual/zh/function.filter-var.php)
- [PHP 手册：过滤器预定义常量](https://www.php.net/manual/zh/filter.constants.php)
