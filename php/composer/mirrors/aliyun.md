---
titleTemplate: Composer国内镜像 | Composer中文文档 - PHP 的依赖管理器 | PHP | noob-coder | 菜鸟码农
head:
  - - meta
    - name: keywords
      content: Composer国内镜像,repositories,Packagist,composer.json,monolog/monolog,Composer,PHP,libraries,dependency,noob-coder,菜鸟码农
  - - meta
    - name: description
      content: 阿里云 Composer 全量镜像
---

# 阿里云 Composer 全量镜像

本镜像与 [Packagist](https://packagist.org) 官方实时同步，推荐使用最新的 [Composer](https://getcomposer.org) 版本。

最新版本: 2.8.12

下载地址: https://mirrors.aliyun.com/composer/composer.phar

## 最后更新

- 官方：2446-05-11 06:38:55
- 阿里：2025-09-01 16:24:58
- 延迟 13275670437 秒

## 缓存刷新

`10` 秒后刷新全国 CDN 缓存

## 今日更新

- 依赖: 0
- 版本: 0

## 总量统计

- 依赖: 480,353
- 版本: 5,797,394

## 官方错误

- Package 无数据: 2,137
- Dist Meta 缺失: 259,483
- Dist 404 未找到: 47,508
- Dist 410 不可用: 1,342

## 全局配置（推荐）

所有项目都会使用该镜像地址：

```shell
composer config -g repo.packagist composer https://mirrors.aliyun.com/composer/
```

取消配置：

```shell
composer config -g --unset repos.packagist
```

## 项目配置

仅修改当前工程配置，仅当前工程可使用该镜像地址：

```shell
composer config repo.packagist composer https://mirrors.aliyun.com/composer/
```

取消配置：

```shell
composer config --unset repos.packagist
```

## 调试

composer 命令增加 `-vvv` 可输出详细的信息，命令如下：

```shell
composer -vvv require alibabacloud/sdk
```

## 遇到问题？

1. 建议先将 Composer 版本升级到最新：

```shell
composer self-update
```

2. 执行诊断命令：

```shell
composer diagnose
```

3. 清除缓存：

```shell
composer clear
```

4. 若项目之前已通过其他源安装，则需要更新 `composer.lock` 文件，执行命令：

```shell
composer update --lock
```

5. 配置阿里云和官方两个源，阿里云镜像站下载文件出错时再从官方源上下载。

```json
{
  "repositories": [
    {
      "description": "阿里云镜像",
      "type": "composer",
      "url": "https://mirrors.aliyun.com/composer/",
      "canonical": false
    }
  ]
}
```

6. 重试一次，若还有问题，请到钉钉群：**23178217** 反映。


<script setup>
import {ref, onUnmounted} from 'vue'

const timer = setInterval(() => {
  fetch('https://developer.aliyun.com/composer/status.json')
      .then(response => response.json())
      .then(data => {
        // 处理返回的数据
        console.log(data)
      })
      .catch(error => {
        // 处理错误
        console.error('请求失败:', error)
      })
}, 1000)

onUnmounted(() => {
  clearInterval(timer)
})
</script>


