---
titleTemplate: PHP 最佳实践 中文文档 | PHP | noob-coder | 菜鸟码农
description: 连接 MySQL 数据库的方法有很多，PDO（PHP 数据对象） 是最新且最强大的方式。PDO 提供了统一的接口，支持多种数据库类型，采用面向对象方式，并支持新数据库的更多特性。
  你应该使用 PDO 的 预处理语句 功能来防止 SQL 注入攻击。使用 bindValue() 方法可以确保你的 SQL 免受第一类 SQL 注入攻击。（虽然并非百分百安全，详情见“延伸阅读”。）过去需要用一些复杂的“魔术引号”函数来实现这些安全措施，而 PDO 让这些繁琐操作变得不再必要。
head:
  - - meta
    - name: keywords
      content: mysql_connect,Unicode 字符串,utf8mb4,魔术引号,SQL 注入攻击,prepared-statements,bindValue,PHP 数据对象,预处理语句功,MySQL,数据库,PDO,PHP最佳实践,PHP标准规范,PHP Standards Recommendations,PSR,PHP,noob-coder,菜鸟码农
---

# MySQL数据库的连接与查询

## 推荐使用 [PDO](https://www.php.net/manual/zh/book.pdo.php) 及其预处理语句功能

连接 MySQL 数据库的方法有很多，[PDO（PHP 数据对象）](https://www.php.net/manual/zh/book.pdo.php) 是最新且最强大的方式。PDO 提供了统一的接口，支持多种数据库类型，采用面向对象方式，并支持新数据库的更多特性。

你应该使用 PDO 的 [预处理语句](https://www.php.net/manual/zh/pdo.prepared-statements.php) 功能来防止 SQL 注入攻击。使用 [`bindValue()`](https://www.php.net/manual/zh/pdostatement.bindvalue.php) 方法可以确保你的 SQL 免受第一类 SQL 注入攻击。（虽然并非百分百安全，详情见“延伸阅读”。）过去需要用一些复杂的“魔术引号”函数来实现这些安全措施，而 PDO 让这些繁琐操作变得不再必要。

## 示例

```php
<?php
// 创建新连接。
// 第一个参数建议将 hostname 替换为 localhost。
// 注意，我们在连接字符串中声明了 utf8mb4 字符集，这样可以确保传递 UTF-8 数据。根据你的配置可能不是必须，但如果你要存储 Unicode 字符串，这样做能避免后续麻烦，详见“注意事项”。
// 传递的 PDO 选项说明：
// PDO::ATTR_ERRMODE 启用异常错误处理，可选但很实用。
// PDO::ATTR_PERSISTENT 禁用持久连接，某些情况下可避免并发问题，详见“注意事项”。
$link = new PDO(
    'mysql:host=your-hostname;dbname=your-db;charset=utf8mb4',
    'your-username',
    'your-password',
    array(
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_PERSISTENT => false
    )
);

$handle = $link->prepare('select username from users where id = ? or username = ? limit ?');

$handle->bindValue(1, 100);
$handle->bindValue(2, 'Bilbo Baggins');
$handle->bindValue(3, 5);

$handle->execute();

// 如果你要查询的数据量非常大，使用 fetchAll() 可能会占用过多资源。
// 这种情况下可以用 fetch() 方法循环逐行处理结果。
// 你也可以返回数组或其他类型，详见 PDO 文档。
$result = $handle->fetchAll(PDO::FETCH_OBJ);

foreach($result as $row){
    print($row->Username);
}
?>
```

## 注意事项

如果连接字符串未设置 utf8mb4 字符集，可能导致 Unicode 数据存储异常，具体取决于你的配置。

即使连接声明了 utf8mb4，也要确保数据库表本身使用 utf8mb4 字符集。关于为什么用 utf8mb4 而不是 utf8，详见 [PHP 与 UTF-8](./utf-8.md) 章节。

启用持久连接可能会导致奇怪的并发问题，这不是 PHP 层面的问题，而是应用层面的问题。只要你了解后果，持久连接是安全的，详见相关 [Stack Overflow 问题](http://stackoverflow.com/questions/3332074/what-are-the-disadvantages-of-using-persistent-connection-in-pdo)。

## 延伸阅读

- [PHP 手册：PDO](https://www.php.net/manual/zh/book.pdo.php)
- [为什么应该用 PDO 访问数据库](https://code.tutsplus.com/why-you-should-be-using-phps-pdo-for-database-access--net-12059t)
- [Stack Overflow：PHP PDO 与普通 mysql_connect 的区别](http://stackoverflow.com/questions/1402017/php-pdo-vs-normal-mysql-connect)
- [Stack Overflow：PDO 预处理语句能否完全防止 SQL 注入？](http://stackoverflow.com/questions/134099/are-pdo-prepared-statements-sufficient-to-prevent-sql-injection)
- [Stack Overflow：是否需要使用 “SET NAMES”](https://stackoverflow.com/questions/1650591/whether-to-use-set-names)
