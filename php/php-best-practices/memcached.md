---
titleTemplate: PHP 最佳实践 中文文档 | PHP | noob-coder | 菜鸟码农
head:
  - - meta
    - name: keywords
      content: PHP最佳实践,PHP标准规范,PHP Standards Recommendations,PSR,PHP,noob-coder,菜鸟码农
---

# PHP 与 Memcached

## 如果你需要分布式缓存，使用 [`Memcached`](https://www.php.net/manual/zh/book.memcached.php) 客户端库。否则请用 [`APCu`](http://pecl.php.net/package/APCu)。

缓存系统通常能提升应用性能。[`Memcached`](https://www.php.net/manual/zh/book.memcached.php) 是一个流行选择，支持多种语言，包括 PHP。

但在 PHP 脚本中访问 Memcached 服务器时，有两个名字非常相似的客户端库：[`Memcache`](https://www.php.net/manual/zh/book.memcache.php) 和 [`Memcached`](https://www.php.net/manual/zh/book.memcached.php)。它们是不同的库，名字几乎一样，都能访问 Memcached 实例。

实际上，Memcached 库对 Memcached 协议的实现更好，功能比 Memcache 多，开发支持也更活跃。

但如果你不需要从多台分布式服务器访问 Memcached 实例，建议用 [`APCu`](http://pecl.php.net/package/APCu)。APCu 由 PHP 官方支持，功能与 Memcached 类似。

## 安装 Memcached 客户端库

安装好 Memcached 服务器后，还需安装 Memcached 客户端库，否则 PHP 脚本无法与 Memcached 服务器通信。

在 Ubuntu 16.04 上安装 Memcached 客户端库的命令如下：

```shell
sudo apt-get install php-memcached
```

## 使用 APCu 代替

在 Ubuntu 14.04 之前，APC 项目既是操作码缓存，也是类似 Memcached 的键值存储。自 Ubuntu 14.04 起，PHP 已内置 [操作码缓存](./opcode-cache.md)，APC 被拆分为 APCu 项目，专注于用户缓存（即 APCu 中的“u”），不再包含操作码缓存功能。

## 安装 APCu

在 Ubuntu 16.04 上安装 APCu 的命令如下：

```shell
sudo apt-get install php-apcu
```

## 示例

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

## 注意事项

如果你从 16.04 之前的 APCu 版本迁移代码，注意函数名已从 apc_* 改为 `apcu_*`。例如 apc_store() 变为 apcu_store()。

## 延伸阅读

- [PHP 手册：Memcached](https://www.php.net/manual/zh/book.memcached.php)
- [PECL：APCu](http://pecl.php.net/package/APCu)
- [Stack Overflow：PHP 使用 Memcache 与 Memcached](http://stackoverflow.com/questions/1442411/using-memcache-vs-memcached-with-php)  
- [Stack Overflow：Memcached 与 APC，如何选择？](http://stackoverflow.com/questions/815041/memcached-vs-apc-which-one-should-i-choose)
