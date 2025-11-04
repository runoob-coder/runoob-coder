---
titleTemplate: 常见问题 | Composer中文文档 - PHP 的依赖管理器 | PHP | noob-coder | 菜鸟码农
aside: false
head:
  - - meta
    - name: keywords
      content: PHP框架,自定义路径,drupal-theme,Drupal,installer-paths,wp-content,WordPress,composer.json,composer/installers,vendor,Composer,依赖管理器,PHP,libraries,dependency,noob-coder,菜鸟码农
  - - meta
    - name: description
      content: 每个框架可能有一个或多个不同的必需包安装路径。通过使用 composer/installers，可以将包安装到默认 vendor 文件夹以外的其他文件夹中。
---

# 如何将包安装到框架的自定义路径？

每个框架可能有一个或多个不同的必需包安装路径。通过使用 [composer/installers](https://github.com/composer/installers)，可以将包安装到默认 `vendor` 文件夹以外的其他文件夹中。

如果你是**包作者**，并且希望将你的包安装到自定义目录中，请依赖 `composer/installers` 并设置适当的 `type`（包类型）。指定包类型将覆盖默认的安装路径。当你的包是为特定框架（如 CakePHP、Drupal 或 WordPress）设计时，这种做法很常见。以下是一个 WordPress 主题的示例 `composer.json` 文件：

```json
{
    "name": "you/themename",
    "type": "wordpress-theme",
    "require": {
        "composer/installers": "~1.0"
    }
}
```

现在，当你的主题通过 Composer 安装时，它将被放置到 `wp-content/themes/themename/` 文件夹中。请查看 [当前支持的类型](https://github.com/composer/installers#current-supported-package-types) 来了解你的包所支持的类型。

作为**包使用者**，你可以通过配置 `installer-paths` extra 来设置或覆盖需要 composer/installers 的包的安装路径。一个有用的示例是 Drupal 多站点设置，其中包应该安装到你站点的子目录中。在这里，我们覆盖了使用 composer/installers 的模块的安装路径，同时将所有 `drupal-theme` 类型的包放入 themes 文件夹：

```json
{
    "extra": {
        "installer-paths": {
            "sites/example.com/modules/{$name}": ["vendor/package"],
            "sites/example.com/themes/{$name}": ["type:drupal-theme"]
        }
    }
}
```

现在包将被安装到你指定的文件夹位置，而不是 composer/installers 确定的默认位置。此外，`installer-paths` 是依赖顺序的，这意味着按名称移动包应该放在匹配相同包的 `type:*` 安装路径之前。

> [!NOTE] 注意
> 你不能使用此方法更改任何包的路径。这仅适用于需要 `composer/installers` 并使用其处理的自定义类型的包。

