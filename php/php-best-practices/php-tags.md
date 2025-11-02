---
titleTemplate: PHP 最佳实践 中文文档 | PHP | noob-coder | 菜鸟码农
head:
  - - meta
    - name: keywords
      content: PHP最佳实践,PHP标准规范,PHP Standards Recommendations,PSR,PHP,noob-coder,菜鸟码农
---


# PHP 标记

## 使用 `<?php ?>`

PHP 代码块有几种分隔方式：`<?php ?>`、`<?= ?>`、`<? ?>` 和 `<% %>`。虽然短标记更方便输入，但它们默认是禁用的，必须通过配置 PHP 服务器的 [short_open_tag](https://www.php.net/manual/zh/ini.core.php#ini.short-open-tag) 选项才能启用。因此，唯一能在所有 PHP 服务器上保证可用的方法是 `<?php ?>`。如果你打算将 PHP 部署到无法控制配置的服务器，建议始终使用 `<?php ?>`。

幸运的是，`<?=` 无论 short tags 是否启用都可以使用，所以用它来代替 `<?php print() ?>` 是安全的简写方式。

如果你只为自己开发，并能控制 PHP 配置，短标记可能更方便。但要注意 `<? ?>` 可能与 XML 声明冲突，`<% %>` 实际上是 ASP 风格。

无论选择哪种方式，请保持一致！

## 注意事项

在纯 PHP 文件（如只包含类定义的文件）中包含结束 `?>` 标记时，确保不要在其后留有多余的换行。PHP 解析器会自动“吃掉”一个换行符，但多余的换行可能会输出到浏览器，影响后续 HTTP 头的输出。

如果你的 Web 应用需要兼容旧版 IE，注意不要在结束 `?>` 标记和 `html <!doctype>` 标记之间留有换行。旧版 IE 遇到任何空白（包括换行）会进入 [怪异模式](https://www.quirksmode.org/css/quirksmode.html)。新版 IE 及其他主流浏览器不会有这个问题。

> [!NOTE] 注意
> 因为短标记可以被禁用，所以建议使用普通标记 (`<?php ?>` 和 `<?= ?>`) 来最大化兼容性。

## 延伸阅读

- [PHP 手册：PHP 标记](https://www.php.net/manual/zh/language.basic-syntax.phptags.php#language.basic-syntax.phptags)
- [Stack Overflow：PHP 短标记可以使用吗？](http://stackoverflow.com/questions/200640/are-php-short-tags-acceptable-to-use)
