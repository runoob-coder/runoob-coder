---
titleTemplate: 相关文章 | Composer中文文档 - PHP 的依赖管理器 | PHP | noob-coder | 菜鸟码农
head:
  - - meta
    - name: keywords
      content: 过滤包,默认行为,非规范仓库,规范仓库,repositories,仓库优先级,Composer,依赖管理器,PHP,libraries,dependency,noob-coder,菜鸟码农
  - - meta
    - name: description
      content: 配置哪些包在哪些仓库中被找到
---

# 仓库优先级

## 规范仓库

当 Composer 解析依赖关系时，它会在最顶层的仓库中查找给定的包。如果该仓库不包含这个包，它会继续在下一个仓库中查找，直到找到包含该包的仓库为止，然后过程结束。

规范仓库有以下几个优势：

- **性能方面**：一旦在某个地方找到包就停止查找会更高效。同时，如果同一个包存在于多个仓库中，这样可以避免加载重复的包。
- **安全方面**：以规范方式处理更安全，这意味着你期望从最重要的仓库获取的包永远不会从其他仓库加载。比如说你有一个非规范的私有仓库，并且你需要你的私有包 `foo/bar ^2.0`。现在如果有人在 packagist.org 上发布了 `foo/bar 2.999`，Composer 会突然选择那个包，因为它的版本比你的最新版本（比如 2.4.3）更高，结果你最终安装了可能并非本意的内容。但是，如果私有仓库是规范的，那么来自 packagist.org 的 2.999 版本将完全不会被考虑。

不过，有些情况下你可能希望从特定仓库加载某些包，但不是全部包。或者你可能希望某个仓库不是规范的，只有当它包含的包版本高于下面定义的仓库时才优先使用。

## 默认行为

默认情况下，Composer 2.x 中所有仓库都是规范仓库。Composer 1.x 将所有仓库视为非规范仓库。

另一个默认行为是，除非你 [禁用](../repositories.md#disabling-packagist-org) packagist.org 仓库，否则它总是被隐式地添加为最后一个仓库。

## 使仓库成为非规范仓库

你可以向任何仓库添加 `canonical` 选项来禁用此默认行为，并确保 Composer 在找到包后继续在其他仓库中查找，即使该仓库包含给定的包。

```json
{
    "repositories": [
        {
            "type": "composer",
            "url": "https://example.org",
            "canonical": false
        }
    ]
}
```

## 过滤包

你也可以过滤仓库能够加载的包，可以通过选择你想要的包，或者排除你不想要的包。

例如，这里我们只想从这个 Composer 仓库中选取 `foo/bar` 包和 `some-vendor/` 下的所有包。

```json
{
    "repositories": [
        {
            "type": "composer",
            "url": "https://example.org",
            "only": ["foo/bar", "some-vendor/*"]
        }
    ]
}
```

在另一个例子中，我们从仓库中排除 `toy/package`，这可能是我们在这个项目中不想加载的包。

```json
{
    "repositories": [
        {
            "type": "composer",
            "url": "https://example.org",
            "exclude": ["toy/package"]
        }
    ]
}
```

`only` 和 `exclude` 都应该是包名数组，其中也可以包含通配符（`*`），可以匹配任何字符。
