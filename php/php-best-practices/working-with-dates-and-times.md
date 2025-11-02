---
titleTemplate: PHP 最佳实践 中文文档 | PHP | noob-coder | 菜鸟码农
head:
  - - meta
    - name: keywords
      content: PHP最佳实践,PHP标准规范,PHP Standards Recommendations,PSR,PHP,noob-coder,菜鸟码农
---

# 处理日期和时间

## 使用 [DateTime](https://www.php.net/manual/zh/class.datetime.php) 类

在 PHP 的糟糕时代，我们不得不使用 [date()](https://www.php.net/manual/zh/function.date.php)、[gmdate()](https://www.php.net/manual/zh/function.gmdate.php)、[date_timezone_set()](https://www.php.net/manual/zh/function.date-timezone-set.php)、[strtotime()](https://www.php.net/manual/zh/function.strtotime.php) 等一系列令人眼花缭乱的函数组合起来处理日期和时间。遗憾的是，你仍然可以在网上找到很多教程使用这些难以理解和过时的函数。

幸运的是，在我们讨论的 PHP 版本中，提供了更友好的 [DateTime](https://www.php.net/manual/zh/class.datetime.php) 类。这个类将所有旧日期函数的功能（甚至更多）封装在一个易于使用的类中，并且使时区转换变得更加简单。始终在 PHP 中使用 DateTime 类来创建、比较、更改和显示日期。

## 示例

```php
<?php
// 构造一个新的 UTC 日期。除非你真的知道自己在做什么，否则始终指定 UTC！
$date = new DateTime('2011-05-04 05:00:00', new DateTimeZone('UTC'));

// 在初始日期上增加十天
$date->add(new DateInterval('P10D'));

print($date->format('Y-m-d h:i:s')); // 2011-05-14 05:00:00

// 遗憾的是，我们没有中土世界（Middle Earth）的时区
// 将我们的 UTC 日期转换为 PST（或 PDT，视情况而定）时区
$date->setTimezone(new DateTimeZone('America/Los_Angeles'));

// 注意，如果你自己运行这一行代码，它可能会根据夏令时的不同而相差一个小时
print($date->format('Y-m-d h:i:s')); // 2011-05-13 10:00:00

$later = new DateTime('2012-05-20', new DateTimeZone('UTC'));

// 比较两个日期
if ($date < $later) {
    print('是的，你可以使用这些简单的操作符来比较日期！');
}

// 找出两个日期之间的差异
$difference = $date->diff($later);

print('第二个日期比第一个日期晚 ' . $difference->days . ' 天。');
?>
```

## 注意事项

- 如果你不指定时区，[`DateTime::__construct()`](https://www.php.net/manual/zh/datetime.construct.php) 将把结果日期的时区设置为你正在运行的计算机的时区。这可能会导致以后出现严重的头痛问题。**除非你真的知道自己在做什么，否则在创建新日期时始终指定 UTC 时区。**
- 如果你在 DateTime::__construct() 中使用 Unix 时间戳，无论你在第二个参数中指定了什么，时区都将被设置为 UTC。
- 将零日期（例如“0000-00-00”，这是 MySQL 中 DateTime 列的默认值）传递给 DateTime::__construct() 将产生一个无意义的日期，而不是“0000-00-00”。
- 在 32 位系统上使用 [`DateTime::getTimestamp()`](https://www.php.net/manual/zh/datetime.gettimestamp.php) 将无法表示 2038 年之后的日期。64 位系统则可以正常工作。

> [!NOTE] 译者注
> 在 32 位系统上，Unix时间戳使用 32 位有符号整数存储，这种数据类型的最大值是 **2^31 - 1 = 2147483647**，这个最大值对应的时间是 2038年1月19日 03:14:07 UTC。
> 
> 这个也被称为 **Y2K38** 问题。

## 延伸阅读

- [PHP 手册：DateTime 类](https://www.php.net/manual/zh/class.datetime.php)
- [Stack Overflow：访问 2038 年之后的日期](http://stackoverflow.com/questions/5319710/accessing-dates-in-php-beyond-2038)


> [!NOTE] 译者注
> 为了更好地操作 DateTime 类，推荐使用 [Carbon](https://packagist.org/packages/nesbot/carbon) 库。
