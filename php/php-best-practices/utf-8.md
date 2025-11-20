---
titleTemplate: PHP 最佳实践 中文文档 | PHP | noob-coder | 菜鸟码农
description: 目前 PHP 在底层不支持 Unicode。有办法确保 UTF-8 字符串被正确处理，但这并不容易，需要深入到 Web 应用的几乎所有层面，从 HTML 到 SQL 再到 PHP。我们将力求提供一个简明实用的总结。
head:
  - - meta
    - name: keywords
      content: mb_http_output,MySQL,ASCII,Linux,Windows,htmlentities,mb_http_output,mb_internal_encoding,mb_substr,php-mbstring,mbstring,多字节字符串函数,mb_strlen,mb_strpos,strlen,strpos,字符串运算符,SQL,HTML,Unicode,UTF-8,PHP最佳实践,PHP标准规范,PHP Standards Recommendations,PSR,PHP,noob-coder,菜鸟码农
---

# PHP 与 UTF-8

## 没有一行代码的解决方案。需要小心、详细和保持一致性。

PHP 中的 UTF-8 很糟糕。抱歉。

目前 PHP 在底层不支持 Unicode。有办法确保 UTF-8 字符串被正确处理，但这并不容易，需要深入到 Web 应用的几乎所有层面，从 HTML 到 SQL 再到 PHP。我们将力求提供一个简明实用的总结。

## PHP 层面的 UTF-8
基本的[字符串运算符](https://www.php.net/manual/zh/language.operators.string.php)，如连接两个字符串和将字符串赋值给变量，对于 UTF-8 不需要任何特殊处理。然而大多数字符串函数，如 [`strpos()`](https://www.php.net/manual/zh/function.strpos.php) 和 [`strlen()`](https://www.php.net/manual/zh/function.strlen.php)，确实需要特殊考虑。这些函数通常有一个 `mb_*` 对应函数：例如，[`mb_strpos()`](https://www.php.net/manual/zh/function.mb-strpos.php) 和 [`mb_strlen()`](https://www.php.net/manual/zh/function.mb-strlen.php)。这些对应的函数统称为[多字节字符串函数](https://www.php.net/manual/zh/ref.mbstring.php)。多字节字符串函数是专门为操作 Unicode 字符串而设计的。

在 Ubuntu 18.04 中这些函数默认不安装。你可以使用以下命令安装 [`mbstring`](https://www.php.net/manual/zh/mbstring.installation.php) 扩展：

```shell
sudo apt install php-mbstring
```

每当你操作 Unicode 字符串时都必须使用 `mb_*` 函数。例如，如果你在 UTF-8 字符串上使用 [`substr()`](https://www.php.net/manual/zh/function.substr.php)，结果很可能会包含一些乱码的半字符。正确的函数应该是多字节对应的 [`mb_substr()`](https://www.php.net/manual/zh/function.mb-substr.php)。

难点在于必须时刻保持警惕，确保始终使用 `mb_*` 函数。一旦有所疏漏，Unicode 字符串就可能在处理过程中出现乱码问题。

并非所有字符串函数都有 `mb_*` 对应函数。如果你想要做的事情没有对应的函数，那么你可能就倒霉了。

此外，你应该在每个 PHP 脚本的顶部（或全局包含脚本的顶部）使用 [`mb_internal_encoding()`](https://www.php.net/manual/zh/function.mb-internal-encoding.php) 函数，如果你的脚本要输出到浏览器，紧接着使用 [`mb_http_output()`](https://www.php.net/manual/zh/function.mb-http-output.php) 函数。在每个脚本中明确指定字符串的编码将为你省去很多头痛问题。

最后，许多操作字符串的 PHP 函数都有一个可选参数，允许你指定字符编码。在有选择时你应该始终明确指定 UTF-8。例如，[`htmlentities()`](https://www.php.net/manual/zh/function.htmlentities.php) 有字符编码（encoding）选项，如果处理此类字符串时你应该始终指定 UTF-8。

## 操作系统层面的 UTF-8

通常你会发现自己的文件内容或文件名使用某种 Unicode 编码。PHP 能够在各种操作系统上运行，包括 Linux 和 Windows；但遗憾的是，由于操作系统层面的差异，它在每个平台上处理 Unicode 文件名的方式都不同。

Linux 和 OSX 似乎能够很好地处理 UTF-8 文件名。然而 Windows 却不行。如果你尝试在 Windows 中使用 PHP 写入文件名包含非 ASCII 字符的文件，你可能会发现文件名显示为奇怪或损坏的字符（乱码）。

在这方面，很难找到一个简单且跨平台的通用解决办法。在 Linux 和 OSX 中你可以使用 UTF-8 编码文件名，但在 Windows 中你必须记住使用 ISO-8859-1 编码。

如果你不想麻烦地让你的脚本检查是否在 Windows 上运行，你可以始终在写入文件前对所有文件名进行 URL 编码。这通过用 ASCII 子集表示 Unicode 字符有效地绕过了 Unicode 的兼容性问题。

## MySQL 层面的 UTF-8

如果你的 PHP 脚本访问 MySQL，即使你遵循了上述所有预防措施，你的字符串仍有可能以非 UTF-8 字符串的形式存储在数据库中。

为了确保你的字符串从 PHP 到 MySQL 都是 UTF-8，确保你的数据库和表都设置为 utf8mb4 字符集和排序规则，并且在 PDO 连接字符串中使用 utf8mb4 字符集。有关示例，请参见 [MySQL数据库的连接与查询](./mysql.md) 部分。这至关重要。

请注意，要获得完整的 UTF-8 支持，你必须使用 utf8mb4 字符集，而不是 utf8 字符集！原因请参见 [延伸阅读](#延伸阅读)。

## 浏览器层面的 UTF-8

使用 [`mb_http_output()`](https://www.php.net/manual/zh/function.mb-http-output.php) 函数确保你的 PHP 脚本向浏览器输出 UTF-8 字符串。在你的 HTML 中，在页面的 `<head>` 标签中包含 charset 元标签。

## 示例

```php
<?php
// 告诉 PHP 我们在脚本结束前都使用 UTF-8 字符串
mb_internal_encoding('UTF-8');
 
// 告诉 PHP 我们将向浏览器输出 UTF-8
mb_http_output('UTF-8');
 
// 我们的 UTF-8 测试字符串
$string = 'Êl síla erin lû e-govaned vîn.';
 
// 使用多字节函数以某种方式转换字符串
// 注意我们如何在非 ASCII 字符处切割字符串以作演示
$string = mb_substr($string, 0, 15);
 
// 连接数据库以存储转换后的字符串
// 有关更多信息请参见本文档中的 PDO 示例
// 注意我们在 PDO 连接字符串中定义了字符集为 utf8mb4
$link = new PDO(    'mysql:host=your-hostname;dbname=your-db;charset=utf8mb4',
                    'your-username',
                    'your-password',
                    array(
                        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                        PDO::ATTR_PERSISTENT => false
                    )
                );
 
// 将我们转换后的字符串作为 UTF-8 存储到数据库中
// 你的数据库和表都使用 utf8mb4 字符集和排序规则，对吧？
$handle = $link->prepare('insert into ElvishSentences (Id, Body) values (?, ?)');
$handle->bindValue(1, 1);
$handle->bindValue(2, $string);
$handle->execute();
 
// 检索我们刚刚存储的字符串以证明它被正确存储
$handle = $link->prepare('select * from ElvishSentences where Id = ?');
$handle->bindValue(1, 1);
$handle->execute();
 
// 将结果存储到一个对象中，稍后在 HTML 中输出
$result = $handle->fetchAll(PDO::FETCH_OBJ);
?>
<!doctype html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>UTF-8 测试页面</title>
    </head>
    <body>
        <?php
        foreach($result as $row){
            print($row->Body);  // 这应该正确地将我们转换后的 UTF-8 字符串输出到浏览器
        }
        ?>
    </body>
</html>
```

## 延伸阅读

- [PHP 手册：多字节字符串函数](https://www.php.net/manual/zh/ref.mbstring.php)
- [PHP UTF-8 速查表](https://www.loftdigital.com/php-utf-8-cheatsheet/)
- [Stack Overflow：哪些因素使 PHP 不兼容 Unicode？](http://stackoverflow.com/questions/571694/what-factors-make-php-unicode-incompatible)
- [Stack Overflow：PHP 和 MySQL 国际字符串的最佳实践](http://stackoverflow.com/questions/140728/best-practices-in-php-and-mysql-with-international-strings)
- [如何在 MySQL 数据库中支持完整 Unicode](http://mathiasbynens.be/notes/mysql-utf8mb4)
- [文件系统编码与 PHP](https://evertpot.com/filesystem-encoding-and-php/)
