---
titleTemplate: 常见问题 | Composer中文文档 - PHP 的依赖管理器 | PHP | noob-coder | 菜鸟码农
aside: false
head:
  - - meta
    - name: keywords
      content: installer,composer-setup,getcomposer,提交哈希,GitHub,安装程序,UNIX工具脚本,安装Composer,校验和,Checksum,composer.json,vendor,Composer,依赖管理器,PHP,libraries,dependency,noob-coder,菜鸟码农
  - - meta
    - name: description
      content: 正如下载页面所指出的，安装脚本包含一个校验和（Checksum），当安装程序代码发生变化时该校验和也会改变，因此长期来看不应依赖于此。
---

# 如何以编程方式安装 Composer？

正如下载页面所指出的，安装脚本包含一个校验和（Checksum），当安装程序代码发生变化时该校验和也会改变，因此长期来看不应依赖于此。

另一种方法是使用以下仅适用于 UNIX 工具的脚本：

```shell
#!/bin/sh

EXPECTED_CHECKSUM="$(php -r 'copy("https://composer.github.io/installer.sig", "php://stdout");')"
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
ACTUAL_CHECKSUM="$(php -r "echo hash_file('sha384', 'composer-setup.php');")"

if [ "$EXPECTED_CHECKSUM" != "$ACTUAL_CHECKSUM" ]
then
    >&2 echo 'ERROR: Invalid installer checksum'
    rm composer-setup.php
    exit 1
fi

php composer-setup.php --quiet
RESULT=$?
rm composer-setup.php
exit $RESULT
```

该脚本在失败时退出码为 1，成功时为 0，且在无错误发生时保持静默。

或者，如果你想依赖安装程序的精确副本，可以从 GitHub 历史记录中获取特定版本。只要你能信任 GitHub 服务器，提交哈希就足以保证其唯一性和真实性。例如：

```shell
wget https://raw.githubusercontent.com/composer/getcomposer.org/f3108f64b4e1c1ce6eb462b159956461592b3e3e/web/installer -O - -q | php -- --quiet
```

你可以将提交哈希替换为 https://github.com/composer/getcomposer.org/commits/main 上的最新提交哈希。
