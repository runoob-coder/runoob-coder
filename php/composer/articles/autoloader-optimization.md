---
titleTemplate: 相关文章 | Composer中文文档 - PHP 的依赖管理器 | PHP | noob-coder | 菜鸟码农
head:
  - - meta
    - name: keywords
      content: APCu,--apcu-autoloader,--classmap-authoritative,class_exists,opcache,classmap,--optimize-autoloader,dump-autoload,类映射生成,PSR-0,PSR-4,autoloader,优化自动加载器,Composer,依赖管理器,PHP,libraries,dependency,noob-coder,菜鸟码农
  - - meta
    - name: description
      content: 如何减少自动加载器的性能影响
---

# 优化自动加载器

默认情况下，Composer 自动加载器运行速度相对较快。然而，由于 PSR-4 和 PSR-0 自动加载规则的设置方式，它需要在最终确定解析类名之前检查文件系统。这会使速度变慢不少，但在开发环境中很方便，因为当你添加新类时，它可以立即被发现和使用，而无需重新构建 `autoloader` 配置。

然而，问题是在生产环境中，你通常希望事情尽可能快速地发生，因为你可以在每次部署时重新构建配置，而在部署之间不会随机出现新类。

因此，Composer 提供了几种策略来优化自动加载器。

> [!NOTE] 注意
> **你不应该在开发环境中启用任何这些优化**，因为它们在添加/删除类时都会导致各种问题。在开发环境中，这些性能提升带来的麻烦是不值得的。

## 优化级别 1：类映射生成

### 如何运行？

有几种方式可以启用此功能：

- 在 `composer.json` 的 `config` 键中设置 `"optimize-autoloader": true`
- 调用 `install` 或 `update` 命令时使用 `-o` / `--optimize-autoloader` 参数
- 调用 `dump-autoload` 命令时使用 `-o` / `--optimize` 参数

### 它的作用是什么？

类映射生成本质上是将 PSR-4/PSR-0 规则转换为 `classmap` 规则。这使得一切变得更快，因为对于已知类，类映射会立即返回路径，Composer 可以保证类在那里，因此不需要文件系统检查。

在 PHP 5.6+ 版本中，类映射也会被缓存在 [opcache](https://www.php.net/manual/zh/book.opcache.php) 中，这大大改善了初始化时间。如果你确保启用了 opcache，那么类映射应该几乎瞬间加载，然后类加载就会很快。

### 权衡考虑

这种方法没有真正的权衡问题。**在生产环境中应该始终启用它。**

唯一的问题是它不跟踪自动加载未命中（即当它找不到给定类时），所以这些会回退到 PSR-4 规则，仍然可能导致缓慢的文件系统检查。为了解决这个问题，存在两个级别 2 的优化选项，如果你的项目中有很多针对不存在类的 `class_exists` 检查，你可以决定启用其中一个。

## 优化级别 2/A：权威类映射

### 如何运行？

有几种方式可以启用此功能：

- 在 `composer.json` 的 `config` 键中设置 `"classmap-authoritative": true`
- 调用 `install` 或 `update` 命令时使用 `-a` / `--classmap-authoritative` 参数
- 调用 `dump-autoload` 命令时使用 `-a` / `--classmap-authoritative` 参数

### 它的作用是什么？

启用此选项会自动启用级别 1 的类映射优化。

此选项表示如果在 `classmap` 中找不到某个类，那么该类就不存在，自动加载器不应尝试根据 PSR-4 规则在文件系统中查找。

### 权衡考虑

此选项使自动加载器总是快速返回。但另一方面，这也意味着如果由于某种原因在运行时生成了类，该类将不被允许自动加载。如果你的项目或任何依赖项这样做，那么你可能会在生产环境中遇到"找不到类"的问题。请谨慎启用此选项。

> [!NOTE] 注意
> 这不能与级别 2/B 优化结合使用。你必须选择其中一个，因为它们以不同的方式解决相同的问题。

## 优化级别 2/B：APCu 缓存

### 如何运行？

有几种方式可以启用此功能：

- 在 `composer.json` 的 `config` 键中设置 `"apcu-autoloader": true`
- 调用 `install` 或 `update` 命令时使用 `--apcu-autoloader` 参数
- 调用 `dump-autoload` 命令时使用 `--apcu` 参数

### 它的作用是什么？

此选项为类映射添加了一个 [APCu](https://www.php.net/manual/zh/book.apcu.php) 缓存作为后备。但它不会自动生成类映射，所以如果你愿意，仍应手动启用级别 1 优化。

无论是否找到类，这个事实都会被缓存在 APCu 中，因此可以在下一个请求中快速返回。

### 权衡考虑

此选项需要 APCu，而 APCu 可能对你可用也可能不可用。它还会使用 APCu 内存用于自动加载目的，但使用它是安全的，不会像上面的权威类映射优化那样导致找不到类。

> [!NOTE] 注意
> 这不能与级别 2/A 优化结合使用。你必须选择其中一个，因为它们以不同的方式解决相同的问题。
