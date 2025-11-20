---
titleTemplate: PHP 最佳实践 中文文档 | PHP | noob-coder | 菜鸟码农
description: 传统上，PHP 使用 define() 函数定义常量。但后来 PHP 也支持用 const 关键字声明常量。那么定义常量时该用哪种方式？由于 define() 更灵活，除非你确实需要类常量，否则建议优先使用 define()。const 通常代码更易读，但灵活性较差。
head:
  - - meta
    - name: keywords
      content: 命名空间,条件常量,类常量,const,define,PHP最佳实践,PHP标准规范,PHP Standards Recommendations,PSR,PHP,noob-coder,菜鸟码农
---

# [define()](https://www.php.net/manual/zh/function.define.php) 与 [const](https://www.php.net/manual/zh/language.constants.php)

## 除非你关心可读性、类常量或微优化，否则建议使用 `define()`

传统上，PHP 使用 define() 函数定义常量。但后来 PHP 也支持用 const 关键字声明常量。那么定义常量时该用哪种方式？

答案在于两者的细微差别：

- define() 在运行时定义常量，而 const 在编译时定义常量。这让 const 有极小的速度优势，但除非你在开发大型软件，否则无需担心。
- define() 会把常量放在全局作用域，虽然你可以在常量名中包含命名空间，但不能用 define() 定义类常量。
- define() 支持在常量名和常量值中使用表达式，而 const 都不支持。这让 define() 更灵活。
- define() 可以在 if() 语句块中调用，而 const 不行。

## 示例

```php
<?php
// 看看两种方式对命名空间的处理
namespace MiddleEarthCreatures\Dwarves;
const GIMLI_ID = 1;
define('MiddleEarth\Creatures\Elves\LEGOLAS_ID', 2);

print(\MiddleEarth\Creatures\Dwarves\GIMLI_ID); // 1
print(\MiddleEarth\Creatures\Elves\LEGOLAS_ID); // 2；注意用 define() 也能识别命名空间

// 位移常量，表示进入 Mordor 的方式
define('TRANSPORT_METHOD_SNEAKING', 1 << 0); // 可以！
const TRANSPORT_METHOD_WALKING = 1 << 1; // 编译错误！const 不能用表达式做值

// 条件常量
define('HOBBITS_FRODO_ID', 1);

if($isGoingToMordor){
    define('TRANSPORT_METHOD', TRANSPORT_METHOD_SNEAKING); // 可以！
    const PARTY_LEADER_ID = HOBBITS_FRODO_ID // 编译错误：const 不能用于 if 语句块
}

// 类常量
class OneRing{
    const MELTING_POINT_CELSIUS = 1000000; // 可以！
    define('MELTING_POINT_ELVISH_DEGREES', 200); // 编译错误：不能在类中用 define()
}
?>
```

由于 define() 更灵活，除非你确实需要类常量，否则建议优先使用 define()。const 通常代码更易读，但灵活性较差。

无论用哪种方式，请保持一致！

## 延伸阅读

- [Stack Overflow：define() vs const](http://stackoverflow.com/questions/2447791/define-vs-const)
- [PHP 手册：常量](https://www.php.net/manual/zh/language.constants.syntax.php)
- [Stack Overflow：define() vs variable](http://stackoverflow.com/questions/1225082/define-vs-variable-in-php)
