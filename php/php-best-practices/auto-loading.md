---
titleTemplate: PHP 最佳实践 中文文档 | PHP | noob-coder | 菜鸟码农
description: 使用 spl_autoload_register() 注册你的自动加载函数
head:
  - - meta
    - name: keywords
      content: include_once,高效的 PHP 自动加载与命名策略,PSR-4,__autoload(),spl_autoload_register,PHP最佳实践,中文文档,PHP标准规范,PHP Standards Recommendations,PSR,PHP,noob-coder,菜鸟码农
---

# 自动加载类

## 使用 [spl_autoload_register()](https://www.php.net/manual/zh/function.spl-autoload-register.php) 注册你的自动加载函数

PHP 提供了多种自动加载未被加载的类文件的方法。较老的方式是使用一个名为 [`__autoload()`](https://www.php.net/manual/zh/function.autoload.php) 的魔术全局函数。但你一次只能定义一个 __autoload()，如果你引入的库也用 __autoload()，就会发生冲突。

正确做法是将你的自动加载函数命名为唯一名称，然后用 [`spl_autoload_register()`](https://www.php.net/manual/zh/function.spl-autoload-register.php) 注册。这个函数允许定义多个自动加载函数，因此不会和其他代码的自动加载冲突。

## 示例

```php
<?php
// 首先，定义你的自动加载函数。
function MyAutoload($className){
    include_once($className . '.php');
}

// 然后，用 PHP 注册它。
spl_autoload_register('MyAutoload');

// 试试看！
// 由于我们还没有包含定义 MyClass 对象的文件，自动加载器会自动加载 MyClass.php。
// 本例假设 MyClass 类定义在 MyClass.php 文件中。
$var = new MyClass();
?>
```

## 延伸阅读
- [PHP 手册：spl_autoload_register()](https://www.php.net/manual/zh/function.spl-autoload-register.php)
- [PSR-4: Autoloader](https://www.php-fig.org/psr/psr-4/)
- [Stack Overflow：高效的 PHP 自动加载与命名策略](http://stackoverflow.com/questions/791899/efficient-php-auto-loading-and-naming-strategies)
