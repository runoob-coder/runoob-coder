---
titleTemplate: PHP 最佳实践 中文文档 | PHP | noob-coder | 菜鸟码农
head:
  - - meta
    - name: keywords
      content: PHP最佳实践,PHP标准规范,PHP Standards Recommendations,PSR,PHP,noob-coder,菜鸟码农
---


# 检查值是否为 null 或 false

## 使用 [===](https://www.php.net/manual/zh/language.operators.comparison.php) 操作符检查 null 和 false 布尔值

PHP 的松散类型系统提供了许多不同的方式来检查变量的值。然而这也带来了很多问题。使用 [==](https://www.php.net/manual/zh/language.operators.comparison.php) 来检查值是否为 null 或 false，如果值实际上是空字符串或 0，可能会返回假阳性（true）结果。[`isset()`](https://www.php.net/manual/zh/function.isset.php) 检查变量是否具有非 null 的值，但不会检查布尔 false。

[`is_null()`](https://www.php.net/manual/zh/function.is-null.php) 函数可以准确检查值是否为 null，[`is_bool()`](https://www.php.net/manual/zh/function.is-bool.php) 函数检查它是否为布尔值（如 false），但还有一个更好的选择：[===](https://www.php.net/manual/zh/language.operators.comparison.php) 操作符。=== 检查值是否完全相同，这在 PHP 的松散类型世界中与相等是不同的概念。它也比 `is_null()` 和 `is_bool()` 稍快一些，而且比使用函数进行比较看起来更美观。

## 示例

```php
<?php
$x = 0;
$y = null;
 
// $x 是 null 吗？
if($x == null){
    print('糟糕！$x 是 0，不是 null！');
}
 
// $y 是 null 吗？
if(is_null($y)){
    print('很好，但可以更快。');
}
 
if($y === null){
    print('完美！');
}
 
// 字符串 abc 包含字符 a 吗？
if(strpos('abc', 'a')){
    // 注意！strpos 返回 0，表示它希望返回第一个字符的位置。
    // 但 PHP 将 0 解释为 false，所以我们永远不会到达这个打印语句！
    print('找到了！');
}
 
// 解决方案：使用 !==（=== 的反面）来检查 strpos() 返回 0 还是布尔 false。
if(strpos('abc', 'a') !== false){
    print('这次真的找到了！');
}
?>
```

## 注意事项

在测试可能返回 0 或布尔 false 的函数（如 `strpos()`）的返回值时，始终使用 [===](https://www.php.net/manual/zh/language.operators.comparison.php) 和 `!==`，否则你会遇到问题。

## 延伸阅读
- [PHP 手册：比较操作符](https://www.php.net/manual/zh/language.operators.comparison.php)
- [Stack Overflow：is_null() vs ===](http://stackoverflow.com/questions/8228837/is-nullx-vs-x-null-in-php)
