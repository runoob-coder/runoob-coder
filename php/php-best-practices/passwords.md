---
titleTemplate: PHP 最佳实践 中文文档 | PHP | noob-coder | 菜鸟码农
head:
  - - meta
    - name: keywords
      content: PHP最佳实践,PHP标准规范,PHP Standards Recommendations,PSR,PHP,noob-coder,菜鸟码农
---

# 密码存储

## 使用内置的密码哈希函数进行密码加密和比对

哈希是保护用户密码在存入数据库前的标准方法。许多常见的哈希算法（如 md5、甚至 sha1）都不安全，因为黑客可以轻易破解这些算法加密的密码。

PHP 提供了内置的 [密码哈希库](https://www.php.net/manual/zh/function.password-hash.php)，采用 bcrypt 算法，目前被认为是密码哈希的最佳选择。

## 示例

```php
<?php
// 对密码进行哈希加密，$hashedPassword 会是一个 60 字符的字符串
$hashedPassword = password_hash('my super cool password', PASSWORD_DEFAULT);

// 现在可以安全地将 $hashedPassword 存入数据库！

// 用户输入密码时，通过比对哈希值判断密码是否正确
password_verify('the wrong password', $hashedPassword); // false

password_verify('my super cool password', $hashedPassword); // true
?>
```

## 注意事项

很多资料会建议你在哈希前给密码加“盐”。这是个好主意，而 [`password_hash()`](https://www.php.net/manual/zh/function.password-hash.php) 已经自动为你加盐了，所以你无需自己处理。

> [!WARNING] 警告
> 盐值（salt）选项已废弃（deprecated）。 现在最好仅选择使用默认产生的盐值。 从 PHP 8.0.0 起，明确指定的 salt 值会被忽略。

## 延伸阅读

[如何安全地存储密码](http://codahale.com/how-to-safely-store-a-password/)
