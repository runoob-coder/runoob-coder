> 原文：https://phpbestpractices.org/
>
> 作者：[Alex Cabal](https://alexcabal.com/)

> 译文：https://www.noob-coder.com/php/php-best-practices/
>
> 译者：[noob-coder](https://www.noob-coder.com)

## PHP 最佳实践 中文文档 | PHP Best Practices

## 介绍

[PHP](https://www.php.net/) 是一门复杂的语言，经历了多年的变革、调整和各种“补丁”。它高度不一致，有时还会有一些 bug。每个版本都有自己独特的特性、缺陷和怪癖，很难跟踪哪个版本有什么问题。也难怪它有时会被人“黑”得这么厉害。

尽管如此，PHP 仍然是目前 Web 上最流行的语言。由于其历史悠久，你会发现网上有大量关于密码哈希、数据库访问等基础操作的教程。问题在于，五篇教程可能会教你五种完全不同的方法。哪种才是“正确”的？其他方法是否有隐藏的 bug 或坑？很难分辨，你可能会在网上到处查找，试图找到最靠谱的答案。

这也是为什么新的 PHP 程序员经常被批评代码丑陋、过时或不安全的原因之一。他们没办法，如果 Google 搜索结果第一条就是四年前的文章，教的还是五年前的方法！

本文档试图解决这些问题。它旨在整理出一套针对 PHP 常见且容易混淆的问题和任务的最佳实践。如果某个底层任务在 PHP 中有多种且容易混淆的方法，这里就会收录。


#### 本文档是什么

这是一份指南，建议在面对 PHP 程序员可能遇到的常见低级任务时采取最佳方向，这些任务由于 PHP 可能提供的多种选择而变得不明确。例如：连接数据库是一个常见任务，在 PHP 中有大量的可能解决方案，并非所有解决方案都是好的——因此，它被包含在本文档中。
这是一系列简短的入门解决方案。示例应该能让你在基本环境中启动和运行，你应该自己做研究来充实它们，使其对你有用。
它指向我们认为的 PHP 最新技术。然而，这意味着如果你使用的是较旧版本的 PHP，执行这些解决方案所需的某些功能可能对你不可用。
这是一份活文档，我会尽我所能随着 PHP 的不断发展而保持更新。

这是一份指南，建议你在面对 PHP 常见底层任务时选择最佳方向，尤其是那些因为 PHP 提供了太多选项而让人困惑的场景。例如：连接数据库是 PHP 中很常见的任务，但解决方案五花八门，并非都靠谱 —— 因此这里会给出推荐做法。

这里提供的是一系列简短的入门解决方案。示例可以帮助你在基础环境下快速上手，具体细化还需要你自己查资料完善。

它指向我们认为的 PHP 领域的最佳实践。不过，这也意味着如果你用的是较老版本的 PHP，某些方案可能无法实现。

这是一个持续更新的文档，随着 PHP 的不断发展我会尽量保持内容最新。

#### 本文档不是什么

本文档不是 PHP 教程。你应该在其他地方学习语言基础和语法。

它不是关于常见的 Web 应用问题指南，比如 cookie 存储、缓存、代码风格、文档等

它不是安全指南。虽然会涉及一些安全相关问题，但你需要自己查资料确保 PHP 应用安全。尤其是，任何方案在实际使用前都要仔细评估。你的代码和复制粘贴，责任自负。

它不推崇某种代码风格、设计模式或框架。

它不推荐某种高层任务的做法，比如用户注册、登录系统等。本文只关注 PHP 长期发展过程中容易让人困惑的底层任务。

它不是万能方案，也不是唯一方案。下面介绍的方法未必适合你的具体场景，达成同样目标的方法有很多。尤其是高负载 Web 应用，可能需要更特殊的解决方案。

## 我们使用的是哪个 PHP 版本？

`PHP 7.2.10` `ubuntu 18.04.1`, 安装在 Ubuntu 18.04 LTS 上。

PHP 就像是 Web 世界里的百年老龟，壳上刻满了丰富、复杂且曲折的历史。在共享主机环境下，PHP 的配置可能会限制你的操作。

为了保持思路清晰，我们只关注一个 PHP 版本：`PHP 7.2.10` `ubuntu 18.04.1`。这是你在 Ubuntu 18.04 LTS 服务器上通过 apt-get
安装时获得的版本，也就是许多人使用的默认版本。

你可能会发现，这些方案在其他或更老的 PHP 版本上也能用。如果遇到这种情况，请自行查阅相关资料，了解旧版本可能存在的细微 bug
或安全隐患。

> **译者注**
>
> 随着时间的推移和PHP不断地更新迭代，本文档中提到的版本可能会过时。请根据实际情况选择合适的PHP版本。

## 密码存储

#### 使用内置的密码哈希函数进行密码加密和比对

哈希是保护用户密码在存入数据库前的标准方法。许多常见的哈希算法（如 md5、甚至 sha1）都不安全，因为黑客可以轻易破解这些算法加密的密码。

PHP 提供了内置的 [密码哈希库](https://www.php.net/manual/zh/function.password-hash.php)，采用 bcrypt 算法，目前被认为是密码哈希的最佳选择。

#### 示例

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

#### 注意事项

很多资料会建议你在哈希前给密码加“盐”。这是个好主意，而 [`password_hash()`](https://www.php.net/manual/zh/function.password-hash.php) 已经自动为你加盐了，所以你无需自己处理。

> **警告**
>
> 盐值（salt）选项已废弃（deprecated）。 现在最好仅选择使用默认产生的盐值。 从 PHP 8.0.0 起，明确指定的 salt 值会被忽略。

#### 延伸阅读

[如何安全地存储密码](http://codahale.com/how-to-safely-store-a-password/)

## MySQL数据库的连接与查询

#### 推荐使用 [PDO](https://www.php.net/manual/zh/book.pdo.php) 及其预处理语句功能

连接 MySQL 数据库的方法有很多，[PDO（PHP 数据对象）](https://www.php.net/manual/zh/book.pdo.php) 是最新且最强大的方式。PDO 提供了统一的接口，支持多种数据库类型，采用面向对象方式，并支持新数据库的更多特性。

你应该使用 PDO 的 [预处理语句](https://www.php.net/manual/zh/pdo.prepared-statements.php) 功能来防止 SQL 注入攻击。使用 [`bindValue()`](https://www.php.net/manual/zh/pdostatement.bindvalue.php) 方法可以确保你的 SQL 免受第一类 SQL 注入攻击。（虽然并非百分百安全，详情见“延伸阅读”。）过去需要用一些复杂的“魔术引号”函数来实现这些安全措施，而 PDO 让这些繁琐操作变得不再必要。

#### 示例

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

#### 注意事项

如果连接字符串未设置 utf8mb4 字符集，可能导致 Unicode 数据存储异常，具体取决于你的配置。

即使连接声明了 utf8mb4，也要确保数据库表本身使用 utf8mb4 字符集。关于为什么用 utf8mb4 而不是 utf8，详见 [PHP 与 UTF-8](./utf-8.md) 章节。

启用持久连接可能会导致奇怪的并发问题，这不是 PHP 层面的问题，而是应用层面的问题。只要你了解后果，持久连接是安全的，详见相关 [Stack Overflow 问题](http://stackoverflow.com/questions/3332074/what-are-the-disadvantages-of-using-persistent-connection-in-pdo)。

#### 延伸阅读

- [PHP 手册：PDO](https://www.php.net/manual/zh/book.pdo.php)
- [为什么应该用 PDO 访问数据库](https://code.tutsplus.com/why-you-should-be-using-phps-pdo-for-database-access--net-12059t)
- [Stack Overflow：PHP PDO 与普通 mysql_connect 的区别](http://stackoverflow.com/questions/1402017/php-pdo-vs-normal-mysql-connect)
- [Stack Overflow：PDO 预处理语句能否完全防止 SQL 注入？](http://stackoverflow.com/questions/134099/are-pdo-prepared-statements-sufficient-to-prevent-sql-injection)
- [Stack Overflow：是否需要使用 “SET NAMES”](https://stackoverflow.com/questions/1650591/whether-to-use-set-names)

## PHP 标记

#### 使用 `<?php ?>`

PHP 代码块有几种分隔方式：`<?php ?>`、`<?= ?>`、`<? ?>` 和 `<% %>`。虽然短标记更方便输入，但它们默认是禁用的，必须通过配置 PHP 服务器的 [short_open_tag](https://www.php.net/manual/zh/ini.core.php##ini.short-open-tag) 选项才能启用。因此，唯一能在所有 PHP 服务器上保证可用的方法是 `<?php ?>`。如果你打算将 PHP 部署到无法控制配置的服务器，建议始终使用 `<?php ?>`。

幸运的是，`<?=` 无论 short tags 是否启用都可以使用，所以用它来代替 `<?php print() ?>` 是安全的简写方式。

如果你只为自己开发，并能控制 PHP 配置，短标记可能更方便。但要注意 `<? ?>` 可能与 XML 声明冲突，`<% %>` 实际上是 ASP 风格。

无论选择哪种方式，请保持一致！

#### 注意事项

在纯 PHP 文件（如只包含类定义的文件）中包含结束 `?>` 标记时，确保不要在其后留有多余的换行。PHP 解析器会自动“吃掉”一个换行符，但多余的换行可能会输出到浏览器，影响后续 HTTP 头的输出。

如果你的 Web 应用需要兼容旧版 IE，注意不要在结束 `?>` 标记和 `html <!doctype>` 标记之间留有换行。旧版 IE 遇到任何空白（包括换行）会进入 [怪异模式](https://www.quirksmode.org/css/quirksmode.html)。新版 IE 及其他主流浏览器不会有这个问题。

> **注意**
>
> 因为短标记可以被禁用，所以建议使用普通标记 (`<?php ?>` 和 `<?= ?>`) 来最大化兼容性。

#### 延伸阅读

- [PHP 手册：PHP 标记](https://www.php.net/manual/zh/language.basic-syntax.phptags.php##language.basic-syntax.phptags)
- [Stack Overflow：PHP 短标记可以使用吗？](http://stackoverflow.com/questions/200640/are-php-short-tags-acceptable-to-use)

## 自动加载类

#### 使用 [spl_autoload_register()](https://www.php.net/manual/zh/function.spl-autoload-register.php) 注册你的自动加载函数

PHP 提供了多种自动加载未被加载的类文件的方法。较老的方式是使用一个名为 [`__autoload()`](https://www.php.net/manual/zh/function.autoload.php) 的魔术全局函数。但你一次只能定义一个 __autoload()，如果你引入的库也用 __autoload()，就会发生冲突。

正确做法是将你的自动加载函数命名为唯一名称，然后用 [`spl_autoload_register()`](https://www.php.net/manual/zh/function.spl-autoload-register.php) 注册。这个函数允许定义多个自动加载函数，因此不会和其他代码的自动加载冲突。

#### 示例

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

#### 延伸阅读
- [PHP 手册：spl_autoload_register()](https://www.php.net/manual/zh/function.spl-autoload-register.php)
- [PSR-4: Autoloader](https://www.php-fig.org/psr/psr-4/)
- [Stack Overflow：高效的 PHP 自动加载与命名策略](http://stackoverflow.com/questions/791899/efficient-php-auto-loading-and-naming-strategies)

## 单引号与双引号的性能差异

#### 实际上没什么影响

关于字符串到底该用单引号（`‘`）还是双引号（`“`）定义，已经有很多讨论。单引号字符串不会被解析，内容原样输出。双引号字符串会被解析，字符串中的 PHP 变量会被替换。此外，像 `\n`（换行）、`\t`（制表）这样的转义字符，单引号不会解析，双引号会解析。

由于双引号字符串在运行时会被解析，有人认为用单引号字符串性能更好，因为 PHP 不需要解析每个字符串。理论上在某些场景下可能如此，但对于一般实际应用来说，差异非常小，可以忽略不计。所以对于普通应用，选哪种都无所谓。极高负载的应用可能会有一点影响。根据你的需求选择，但无论选哪种，请保持一致。

#### 延伸阅读

- [PHP 手册：字符串](https://www.php.net/manual/zh/language.types.string.php)
- [The PHP Benchmark（下拉查看 Quote Types 部分）](http://phpbench.com/)
- [Stack Overflow：PHP 单引号和双引号有性能差异吗？](http://stackoverflow.com/questions/482202/is-there-a-performance-benefit-single-quote-vs-double-quote-in-php)

## [define()](https://www.php.net/manual/zh/function.define.php) 与 [const](https://www.php.net/manual/zh/language.constants.php)

#### 除非你关心可读性、类常量或微优化，否则建议使用 `define()`

传统上，PHP 使用 define() 函数定义常量。但后来 PHP 也支持用 const 关键字声明常量。那么定义常量时该用哪种方式？

答案在于两者的细微差别：

- define() 在运行时定义常量，而 const 在编译时定义常量。这让 const 有极小的速度优势，但除非你在开发大型软件，否则无需担心。
- define() 会把常量放在全局作用域，虽然你可以在常量名中包含命名空间，但不能用 define() 定义类常量。
- define() 支持在常量名和常量值中使用表达式，而 const 都不支持。这让 define() 更灵活。
- define() 可以在 if() 语句块中调用，而 const 不行。

#### 示例

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

#### 延伸阅读

- [Stack Overflow：define() vs const](http://stackoverflow.com/questions/2447791/define-vs-const)
- [PHP 手册：常量](https://www.php.net/manual/zh/language.constants.syntax.php)
- [Stack Overflow：define() vs variable](http://stackoverflow.com/questions/1225082/define-vs-variable-in-php)

## 缓存 PHP 操作码

#### 幸运的是：PHP 内置了操作码缓存！

在旧版本的 PHP 中，每次执行脚本时都需要重新编译，即使之前已经编译过。操作码缓存是一种额外的软件，可以保存之前编译好的 PHP 代码，从而提升一些性能。过去有多种缓存方案可选。

幸运的是，Ubuntu 18.04 附带的 PHP 版本已经默认启用了内置的操作码缓存。所以你无需做任何额外操作！

#### Opcache 简介

OPcache 通过将 PHP 脚本预编译的字节码存储到共享内存中来提升 PHP 的性能， 存储预编译字节码的好处就是 省去了每次加载和解析 PHP 脚本的开销。

PHP 5.5.0 及后续版本中已经绑定了 OPcache 扩展。 对于 PHP 5.2，5.3 和 5.4 版本可以使用 [» PECL](https://pecl.php.net/package/ZendOpcache) 扩展中的 OPcache 库。

#### 延伸阅读

- [PHP 手册：Opcache](https://www.php.net/manual/zh/book.opcache.php)

## PHP 与 Memcached

#### 如果你需要分布式缓存，使用 [`Memcached`](https://www.php.net/manual/zh/book.memcached.php) 客户端库。否则请用 [`APCu`](http://pecl.php.net/package/APCu)。

缓存系统通常能提升应用性能。[`Memcached`](https://www.php.net/manual/zh/book.memcached.php) 是一个流行选择，支持多种语言，包括 PHP。

但在 PHP 脚本中访问 Memcached 服务器时，有两个名字非常相似的客户端库：[`Memcache`](https://www.php.net/manual/zh/book.memcache.php) 和 [`Memcached`](https://www.php.net/manual/zh/book.memcached.php)。它们是不同的库，名字几乎一样，都能访问 Memcached 实例。

实际上，Memcached 库对 Memcached 协议的实现更好，功能比 Memcache 多，开发支持也更活跃。

但如果你不需要从多台分布式服务器访问 Memcached 实例，建议用 [`APCu`](http://pecl.php.net/package/APCu)。APCu 由 PHP 官方支持，功能与 Memcached 类似。

#### 安装 Memcached 客户端库

安装好 Memcached 服务器后，还需安装 Memcached 客户端库，否则 PHP 脚本无法与 Memcached 服务器通信。

在 Ubuntu 16.04 上安装 Memcached 客户端库的命令如下：

```shell
sudo apt-get install php-memcached
```

#### 使用 APCu 代替

在 Ubuntu 14.04 之前，APC 项目既是操作码缓存，也是类似 Memcached 的键值存储。自 Ubuntu 14.04 起，PHP 已内置 [操作码缓存](./opcode-cache.md)，APC 被拆分为 APCu 项目，专注于用户缓存（即 APCu 中的“u”），不再包含操作码缓存功能。

#### 安装 APCu

在 Ubuntu 16.04 上安装 APCu 的命令如下：

```shell
sudo apt-get install php-apcu
```

#### 示例

```php
<?php
// 将一些值存入 APCu 缓存。可以传递过期时间（TTL），但本例中值会一直存在，直到被 APCu 垃圾回收。
apcu_store('username-1532', 'Frodo Baggins');
apcu_store('username-958', 'Aragorn');
apcu_store('username-6389', 'Gandalf');

// 也可以存储数组和对象。
apcu_store('creatures', array('ent', 'dwarf', 'elf'));
apcu_store('saruman', new Wizard());

// 存储后，任何 PHP 脚本都能随时访问这些值！
$value = apcu_fetch('username-958', $success);
if($success === true){
    print($value); // Aragorn
}

$value = apcu_fetch('creatures', $success);
if($success === true){
    print_r($value);
}

$value = apcu_fetch('username-1', $success); // $success 会被设为 false，因为该键不存在。
if($success !== true){ // 注意 !==，严格判断 true 的布尔值，而不是“假值”如 0 或空字符串。
    print('Key not found');
}

apcu_delete('username-958'); // 该键将不可用。
?>
```

#### 注意事项

如果你从 16.04 之前的 APCu 版本迁移代码，注意函数名已从 apc_* 改为 `apcu_*`。例如 apc_store() 变为 apcu_store()。

#### 延伸阅读

- [PHP 手册：Memcached](https://www.php.net/manual/zh/book.memcached.php)
- [PECL：APCu](http://pecl.php.net/package/APCu)
- [Stack Overflow：PHP 使用 Memcache 与 Memcached](http://stackoverflow.com/questions/1442411/using-memcache-vs-memcached-with-php)
- [Stack Overflow：Memcached 与 APC，如何选择？](http://stackoverflow.com/questions/815041/memcached-vs-apc-which-one-should-i-choose)

## PHP 与正则表达式

#### 使用 [`PCRE（preg_*）`](https://www.php.net/manual/zh/book.pcre.php) 家族函数

在 PHP 7 之前，PHP 有两种使用正则表达式的方法：[`PCRE`](https://www.php.net/manual/zh/book.pcre.php)（兼容 Perl 的 preg_* 函数）和 POSIX（扩展 ereg_* 函数）。

每个函数族使用的正则表达式语法略有不同。幸运的是，ereg_* 函数在 PHP 7 中已被移除，这种混淆已经不存在了。

#### 注意事项

使用正则表达式时，请记得加上 /u 标志，以确保在 Unicode 模式下工作。

#### 延伸阅读

- [PHP 手册：PCRE](https://www.php.net/manual/zh/book.pcre.php)
- [PHP 正则表达式入门](http://www.noupe.com/php/php-regular-expressions.html)

## 通过 Web 服务器运行 PHP

#### 使用 [PHP-FPM](https://www.php.net/manual/zh/install.fpm.php)

配置 Web 服务器以运行 PHP 有多种方式。早期常用 Apache 的 [`mod_php`](http://stackoverflow.com/questions/2712825/what-is-mod-php)。mod_php 会将 PHP 绑定到 Apache，但 Apache 管理 PHP 的方式很差，一旦有真实流量就会遇到严重的内存问题。

后来出现了两个新方案：[`mod_fastcgi`](http://www.fastcgi.com/mod_fastcgi/docs/mod_fastcgi.html) 和 [`mod_fcgid`](http://httpd.apache.org/mod_fcgid/)。它们会保持有限数量的 PHP 进程运行，Apache 将请求发送给这些接口，由它们代为执行 PHP。由于这些库限制了 PHP 进程数量，内存占用大幅降低，性能却不受影响。

一些聪明的人专门为 PHP 设计了 fastcgi 的实现，称为 [`PHP-FPM`](https://www.php.net/manual/zh/install.fpm.php)。从 Ubuntu 12.04 起，这成为 Web 服务器的标准方案。

自 Ubuntu 12.04 之后，Apache 推出了与 PHP-FPM 交互的新方式：[`mod_proxy_fcgi`](http://httpd.apache.org/docs/2.4/mod/mod_proxy_fcgi.html)。我们会用这个模块将 Apache 接收到的 PHP 请求转发给 FPM 实例。

以下示例适用于 Apache 2.4.29，但 PHP-FPM 也支持 Nginx 等其他 Web 服务器。

#### 安装 PHP-FPM 和 Apache

在 Ubuntu 18.04 上，可以通过以下命令安装 PHP-FPM 和 Apache：

```shell
sudo apt-get install apache2 php-fpm
sudo a2enmod proxy_fcgi rewrite
``` 

首先，我们要创建一个新的 PHP FPM 池来服务我们的应用。

将以下内容粘贴到 `/etc/php/7.2/fpm/pool.d/mysite.conf`：

```conf
[mysite]  
user = www-data  
group = www-data

listen = /run/php/mysite.sock  
listen.owner = www-data  
listen.group = www-data

pm = ondemand  
pm.max_children = 10
```

（配置 PHP-FPM 池时还有很多其他的选项，尤其是 `php_admin_value[include_path]`。）

接下来，配置 Apache 虚拟主机，将 PHP 请求转发到 PHP-FPM 进程。在 Ubuntu 默认配置文件 `/etc/apache2/sites-available/000-default.conf` 的 `<VirtualHost>` 指令中粘贴以下内容：

```conf
<VirtualHost *:80>  
<Directory />  
Require all granted  
</Directory>

    ## FPM 接收 Transfer-Encoding: chunked 的 POST 数据所需
    ## 需要 Apache 2.4.47+ 的 bug 修复
    SetEnv proxy-sendcl 1

    RewriteEngine on  
    RewriteCond %{REQUEST_FILENAME} .php$  
    RewriteCond %{DOCUMENT_ROOT}%{REQUEST_FILENAME} -f  
    RewriteRule . proxy:unix:/run/php/mysite.sock|fcgi://localhost%{DOCUMENT_ROOT}%{REQUEST_FILENAME} [P]  
</VirtualHost>
```

最后，重启 Apache 和 FPM 进程：

```shell
sudo systemctl restart apache2.service php7.2-fpm.service
```

#### 延伸阅读

- [PHP 手册：PHP-FPM](https://www.php.net/manual/zh/install.fpm.php)
- [PHP-FPM 官网](https://php-fpm.org/)
- [Apache2 与 php fpm 性能优化——分步指南](https://medium.com/@sbuckpesch/apache2-and-php-fpm-performance-optimization-step-by-step-guide-1bfecf161534)

- [Franken PHP ：现代 PHP 应用服务器](https://frankenphp.dev/cn/)


## 发送邮件

#### 推荐使用 [PHPMailer](https://github.com/PHPMailer/PHPMailer)

已使用 `PHPMailer 6.0.6` 进行测试。

PHP 提供了一个看起来非常简单易用的 [`mail()`](https://www.php.net/manual/zh/function.mail.php) 函数。但不幸的是，和 PHP 许多东西一样，它的简单性是有欺骗性的，直接使用会带来严重的安全问题。

电子邮件是一套协议，其历史比 PHP 还要曲折。可以说，发送邮件有太多坑，光是靠近 PHP 的 [`mail()`](https://www.php.net/manual/zh/function.mail.php) 函数都让人不寒而栗。

[PHPMailer](https://github.com/PHPMailer/PHPMailer) 是一个流行且成熟的开源库，能为安全发送邮件提供简单接口。它帮你处理各种坑，让你专注于更重要的事情。

#### 示例

```php
<?php
// 引入 PHPMailer 库 （取决于你安装的版本，建议使用 composer 进行安装）
require_once('phpmailer-5.2.7/PHPMailerAutoload.php');
 
// 传参为 true 启用异常处理，可选，默认 false
$mailer = new PHPMailer(true);
 
// 发送一封邮件，从 比尔博·巴金斯 发给 甘道夫
 
// 设置收件人、发件人和邮件内容。内容不一定要是 HTML，详情请查阅 PHPMailer 文档。
$mailer->Sender = 'bbaggins@example.com';
$mailer->AddReplyTo('bbaggins@example.com', '比尔博·巴金斯');
$mailer->SetFrom('bbaggins@example.com', '比尔博·巴金斯');
$mailer->AddAddress('gandalf@example.com');
$mailer->Subject = 'South Farthing 最好的烟草';
$mailer->MsgHTML('<p>你真的该试试，甘道夫！</p><p>-比尔博</p>');
 
// 设置连接信息
$mailer->IsSMTP();
$mailer->SMTPAuth = true;
$mailer->SMTPSecure = 'ssl';
$mailer->Port = 465;
$mailer->Host = '我的 smtp 主机';
$mailer->Username = '我的 smtp 用户名';
$mailer->Password = '我的 smtp 密码';
 
// 发送邮件
$mailer->Send();
?>
```

#### 延伸阅读

- [PHPMailer Github 仓库](https://github.com/PHPMailer/PHPMailer)


#### 政治立场

> **译者注**
>
> 自俄乌战争以来，该开源库将政治立场注入技术项目，违背了开源精神所倡导的中立性与包容性！

相关讨论：

- [Do not turn Github into a space for protests, fools.](https://github.com/PHPMailer/PHPMailer/issues/2923)
- [Stop ukraine propaganda](https://github.com/PHPMailer/PHPMailer/issues/3209)
- [Suggestion: Consider Including a Banner Supporting Gaza](https://github.com/PHPMailer/PHPMailer/issues/3209)

## 验证邮箱地址
#### 使用 [filter_var()](https://www.php.net/manual/zh/function.filter-var.php) 函数

你的 Web 应用常常需要检查用户输入的邮箱地址是否有效。网上有各种复杂的正则表达式号称能解决这个问题，但最简单的方法是使用 PHP 内置的 [filter_var()](https://www.php.net/manual/zh/function.filter-var.php) 函数来验证邮箱地址。


#### 示例

```php
<?php
filter_var('noob-coder@qq.com', FILTER_VALIDATE_EMAIL); // 返回 "noob-coder@qq.com"，这是一个有效的邮箱地址。
filter_var('sauron@mordor', FILTER_VALIDATE_EMAIL); // 返回布尔值 false！这不是一个有效的邮箱地址。
?>
```

#### 延伸阅读

- [PHP 手册：filter_var()](https://www.php.net/manual/zh/function.filter-var.php)
- [PHP 手册：过滤器预定义常量](https://www.php.net/manual/zh/filter.constants.php)


## 过滤 HTML 输入和输出

#### 对于简单过滤使用 [htmlentities()](https://www.php.net/manual/zh/function.htmlentities.php) 函数，对于复杂过滤使用 [HTML Purifier](http://htmlpurifier.org/) 库。

测试版本：[HTML Purifier](http://htmlpurifier.org/) 4.10.0。

在任何 Web 应用中显示用户输入内容时，首先必须对其进行"安全过滤"，以清除任何潜在危险的 HTML 代码。恶意用户可能精心构造 HTML 代码，如果你的 Web 应用直接输出这些内容，对浏览者来说可能存在安全风险。

虽然使用正则表达式来过滤 HTML 看似简便，但请避免这样做。HTML 是一门复杂的标记语言，几乎可以肯定的是，任何试图用正则表达式来过滤 HTML 的尝试最终都会失败。

你可能还会看到有人建议使用 [strip_tags()](https://www.php.net/manual/zh/function.strip-tags.php) 函数。虽然从技术角度来说 strip_tags() 是安全的，但它是一个"简单粗暴"的函数。如果输入的是无效 HTML（例如缺少结束标签），strip_tags() 可能会移除比预期多得多的内容。因此这也不是一个理想的选择，因为非技术用户在交流中经常使用 < 和 > 字符。

如果你阅读了 [验证邮箱地址](./validating-emails.md) 的章节，你可能也在考虑使用 [filter_var()](https://www.php.net/manual/zh/function.filter-var.php) 函数。但是 [filter_var() 函数在处理换行符方面存在问题](http://stackoverflow.com/questions/3150413/filter-sanitize-special-chars-problem-with-line-breaks)，并且需要非直观的配置才能达到与 [htmlentities()](https://www.php.net/manual/zh/function.htmlentities.php) 函数相似的效果。因此它也不是一个好选择。

#### 简单需求的过滤

如果你的 Web 应用只需要完全转义 HTML（从而使 HTML 安全，但不完全移除），请使用 PHP 内置的 [htmlentities()](https://www.php.net/manual/zh/function.htmlentities.php) 函数。这个函数比 HTML Purifier 快得多，因为它不对 HTML 执行任何验证——只是转义所有内容。

htmlentities() 与 [htmlspecialchars()](https://www.php.net/manual/zh/function.htmlspecialchars.php) 的区别在于它编码所有适用的 HTML 实体，而不仅仅是小部分。

###### 示例

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

#### 复杂需求的过滤

对于许多 Web 应用来说，简单地转义 HTML 是不够的。你可能想要完全移除任何 HTML，或者允许一小部分 HTML 通过。要做到这一点，请使用 [HTML Purifier](http://htmlpurifier.org/) 库。

HTML Purifier 是一个经过良好测试但速度较慢的库。这就是为什么如果你的需求不那么复杂，你应该使用 htmlentities()，因为它会快得多。

相比 [strip_tags()](https://www.php.net/manual/zh/function.strip-tags.php)，HTML Purifier 的优势在于它会在过滤 HTML 之前先验证 HTML 的有效性。这意味着如果用户输入了无效的 HTML，HTML Purifier 比 strip_tags() 更有可能保留 HTML 的预期含义。它也是高度可定制的，允许你将 HTML 的子集列入白名单，从而保留在输出中。

缺点是它相当慢，在共享主机环境中可能需要一些设置，而且文档通常比较复杂难懂。以下示例是基本配置；查看 [文档](http://htmlpurifier.org/docs) 了解 HTML Purifier 提供的更多高级功能。

###### 示例

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

#### 注意事项

- 使用 htmlentities() 时使用错误的字符编码可能导致意外输出。调用函数时请始终确保指定字符编码，并且它与被过滤字符串的编码匹配。有关详细信息，请参见 [UTF-8](./utf-8.md) 章节。
- 使用 htmlentities() 时始终包含 ENT_QUOTES（既转换双引号也转换单引号） 和字符编码参数。默认情况下，htmlentities() 不编码单引号。这是多么愚蠢的默认值！
- HTML Purifier 在处理复杂 HTML 时极其缓慢。考虑设置像 [APCu](https://phpbestpractices.org/##opcode-cache)/[Redis](https://redis.io/) 这样的缓存解决方案来存储过滤结果供以后使用。

#### 延伸阅读

- [PHP HTML 过滤器比较](http://htmlpurifier.org/comparison)
- [Stack Overflow：使用 strip_tags() 防止 XSS？](http://stackoverflow.com/questions/3605629/php-prevent-xss-with-strip-tags)
- [Stack Overflow：使用 PHP 过滤用户输入的最佳方法是什么？](http://stackoverflow.com/questions/129677/whats-the-best-method-for-sanitizing-user-input-with-php)
- [Stack Overflow：FILTER_SANITIZE_SPECIAL_CHARS 与换行符的问题](http://stackoverflow.com/questions/3150413/filter-sanitize-special-chars-problem-with-line-breaks)

## PHP 与 UTF-8

#### 没有一行代码的解决方案。需要小心、详细和保持一致性。

PHP 中的 UTF-8 很糟糕。抱歉。

目前 PHP 在底层不支持 Unicode。有办法确保 UTF-8 字符串被正确处理，但这并不容易，需要深入到 Web 应用的几乎所有层面，从 HTML 到 SQL 再到 PHP。我们将力求提供一个简明实用的总结。

#### PHP 层面的 UTF-8
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

#### 操作系统层面的 UTF-8

通常你会发现自己的文件内容或文件名使用某种 Unicode 编码。PHP 能够在各种操作系统上运行，包括 Linux 和 Windows；但遗憾的是，由于操作系统层面的差异，它在每个平台上处理 Unicode 文件名的方式都不同。

Linux 和 OSX 似乎能够很好地处理 UTF-8 文件名。然而 Windows 却不行。如果你尝试在 Windows 中使用 PHP 写入文件名包含非 ASCII 字符的文件，你可能会发现文件名显示为奇怪或损坏的字符（乱码）。

在这方面，很难找到一个简单且跨平台的通用解决办法。在 Linux 和 OSX 中你可以使用 UTF-8 编码文件名，但在 Windows 中你必须记住使用 ISO-8859-1 编码。

如果你不想麻烦地让你的脚本检查是否在 Windows 上运行，你可以始终在写入文件前对所有文件名进行 URL 编码。这通过用 ASCII 子集表示 Unicode 字符有效地绕过了 Unicode 的怪癖。

如果你不想麻烦地让你的脚本检查是否在 Windows 上运行，你可以始终在写入文件前对所有文件名进行 URL 编码。这通过用 ASCII 子集表示 Unicode 字符有效地绕过了 Unicode 的兼容性问题。

#### MySQL 层面的 UTF-8

如果你的 PHP 脚本访问 MySQL，即使你遵循了上述所有预防措施，你的字符串仍有可能以非 UTF-8 字符串的形式存储在数据库中。

为了确保你的字符串从 PHP 到 MySQL 都是 UTF-8，确保你的数据库和表都设置为 utf8mb4 字符集和排序规则，并且在 PDO 连接字符串中使用 utf8mb4 字符集。有关示例，请参见 [MySQL数据库的连接与查询](./mysql.md) 部分。这至关重要。

请注意，要获得完整的 UTF-8 支持，你必须使用 utf8mb4 字符集，而不是 utf8 字符集！原因请参见 [延伸阅读](##延伸阅读)。

#### 浏览器层面的 UTF-8

使用 [`mb_http_output()`](https://www.php.net/manual/zh/function.mb-http-output.php) 函数确保你的 PHP 脚本向浏览器输出 UTF-8 字符串。在你的 HTML 中，在页面的 `<head>` 标签中包含 charset 元标签。

#### 示例

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

#### 延伸阅读

- [PHP 手册：多字节字符串函数](https://www.php.net/manual/zh/ref.mbstring.php)
- [PHP UTF-8 速查表](https://www.loftdigital.com/php-utf-8-cheatsheet/)
- [Stack Overflow：哪些因素使 PHP 不兼容 Unicode？](http://stackoverflow.com/questions/571694/what-factors-make-php-unicode-incompatible)
- [Stack Overflow：PHP 和 MySQL 国际字符串的最佳实践](http://stackoverflow.com/questions/140728/best-practices-in-php-and-mysql-with-international-strings)
- [如何在 MySQL 数据库中支持完整 Unicode](http://mathiasbynens.be/notes/mysql-utf8mb4)
- [文件系统编码与 PHP](https://evertpot.com/filesystem-encoding-and-php/)


## 处理日期和时间

#### 使用 [DateTime](https://www.php.net/manual/zh/class.datetime.php) 类

在 PHP 的糟糕时代，我们不得不使用 [date()](https://www.php.net/manual/zh/function.date.php)、[gmdate()](https://www.php.net/manual/zh/function.gmdate.php)、[date_timezone_set()](https://www.php.net/manual/zh/function.date-timezone-set.php)、[strtotime()](https://www.php.net/manual/zh/function.strtotime.php) 等一系列令人眼花缭乱的函数组合起来处理日期和时间。遗憾的是，你仍然可以在网上找到很多教程使用这些难以理解和过时的函数。

幸运的是，在我们讨论的 PHP 版本中，提供了更友好的 [DateTime](https://www.php.net/manual/zh/class.datetime.php) 类。这个类将所有旧日期函数的功能（甚至更多）封装在一个易于使用的类中，并且使时区转换变得更加简单。始终在 PHP 中使用 DateTime 类来创建、比较、更改和显示日期。

#### 示例

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

#### 注意事项

- 如果你不指定时区，[`DateTime::__construct()`](https://www.php.net/manual/zh/datetime.construct.php) 将把结果日期的时区设置为你正在运行的计算机的时区。这可能会导致以后出现严重的头痛问题。**除非你真的知道自己在做什么，否则在创建新日期时始终指定 UTC 时区。**
- 如果你在 DateTime::__construct() 中使用 Unix 时间戳，无论你在第二个参数中指定了什么，时区都将被设置为 UTC。
- 将零日期（例如“0000-00-00”，这是 MySQL 中 DateTime 列的默认值）传递给 DateTime::__construct() 将产生一个无意义的日期，而不是“0000-00-00”。
- 在 32 位系统上使用 [`DateTime::getTimestamp()`](https://www.php.net/manual/zh/datetime.gettimestamp.php) 将无法表示 2038 年之后的日期。64 位系统则可以正常工作。

> **译者注**
>
> 在 32 位系统上，Unix时间戳使用 32 位有符号整数存储，这种数据类型的最大值是 **2^31 - 1 = 2147483647**，这个最大值对应的时间是 2038年1月19日 03:14:07 UTC。
>
> 这个也被称为 **Y2K38** 问题。

#### 延伸阅读

- [PHP 手册：DateTime 类](https://www.php.net/manual/zh/class.datetime.php)
- [Stack Overflow：访问 2038 年之后的日期](http://stackoverflow.com/questions/5319710/accessing-dates-in-php-beyond-2038)


> **译者注**
>
> 为了更好地操作 DateTime 类，推荐使用 [Carbon](https://packagist.org/packages/nesbot/carbon) 库。

## 检查值是否为 null 或 false

#### 使用 [===](https://www.php.net/manual/zh/language.operators.comparison.php) 操作符检查 null 和 false 布尔值

PHP 的松散类型系统提供了许多不同的方式来检查变量的值。然而这也带来了很多问题。使用 [==](https://www.php.net/manual/zh/language.operators.comparison.php) 来检查值是否为 null 或 false，如果值实际上是空字符串或 0，可能会返回假阳性（true）结果。[`isset()`](https://www.php.net/manual/zh/function.isset.php) 检查变量是否具有非 null 的值，但不会检查布尔 false。

[`is_null()`](https://www.php.net/manual/zh/function.is-null.php) 函数可以准确检查值是否为 null，[`is_bool()`](https://www.php.net/manual/zh/function.is-bool.php) 函数检查它是否为布尔值（如 false），但还有一个更好的选择：[===](https://www.php.net/manual/zh/language.operators.comparison.php) 操作符。=== 检查值是否完全相同，这在 PHP 的松散类型世界中与相等是不同的概念。它也比 `is_null()` 和 `is_bool()` 稍快一些，而且比使用函数进行比较看起来更美观。

#### 示例

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

#### 注意事项

在测试可能返回 0 或布尔 false 的函数（如 `strpos()`）的返回值时，始终使用 === 和 !==，否则你会遇到问题。

#### 延伸阅读
- [PHP 手册：比较操作符](https://www.php.net/manual/zh/language.operators.comparison.php)
- [Stack Overflow：is_null() vs ===](http://stackoverflow.com/questions/8228837/is-nullx-vs-x-null-in-php)


## 移除重音符号（变音符号）

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

## 建议和更正

感谢你的阅读！如果你还没有意识到的话，PHP 是一门复杂的语言，充满了陷阱。由于我也是凡人，这份文档中可能存在错误。

如果你想为这份文档提供改进建议或更正，请在 [最后修订和维护者](./maintainers.md) 部分的信息与我联系。


## 最后修订和维护者

本文档最后审查于 2021 年 7 月 26 日。最后修改于 2021 年 7 月 26 日。

由我，[Alex Cabal](https://alexcabal.com/about) 维护。

我写 PHP 已经很长时间了，目前我运营着 [Scribophile](https://www.scribophile.com/)（一个为专业作家提供的在线写作小组）、[Writerfolio](https://writerfolio.com/)（一个为自由职业者提供的简易在线写作作品集），以及 [Standard Ebooks](https://standardebooks.org/)（一个开源项目，为真正的爱书人制作高质量的电子书）。

如果你认为我可以帮助你解决某些问题，或者对本文档有建议或更正，请 [与我联系](mailto:alex@alexcabal.com)。

#### 译者

noob-coder（菜鸟码农）翻译并维护此中文版。
