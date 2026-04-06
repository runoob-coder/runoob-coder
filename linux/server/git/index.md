---
titleTemplate: Git | 个人服务器环境搭建 | noob-coder | 菜鸟码农
head:
  - - meta
    - name: description
      content: 项目仓库使用git管理，需要安装git。部署公钥允许以只读的方式访问仓库，主要用于仓库在生产服务器的部署上，免去 HTTP 方式每次操作都要输入密码和普通 SSH 方式担心不小心修改仓库代码的麻烦。
  - - meta
    - name: keywords
      content: deploy,GPG keys,GitLab,GitHub,id_ed25519,ssh-keygen,SSH密钥对,服务器优化,www,dnf,yum,Linux,服务器环境搭建,宝塔面板一键部署,服务器运维面板,宝塔,nginx,Apache,mysql,redis,ssl,supervisor,git,composer,php,noob-coder,菜鸟码农
---

# 安装Git

项目仓库使用git管理，需要安装git。

```bash
yum install git -y
```

## 配置 SSH 密钥

::: tip 注
请不要使用 root 用户进行配置，请使用普通用户（如 `deploy`）进行配置。
:::

部署公钥允许以只读的方式访问仓库，主要用于仓库在生产服务器的部署上，免去 HTTP 方式每次操作都要输入密码和普通 SSH 方式担心不小心修改仓库代码的麻烦。

部署公钥配置后的机器，只支持 `clone` 与 `pull` 等只读操作。

### 生成 SSH 密钥对

请替换你实际的邮箱。

```bash
ssh-keygen -t ed25519 -C "noob-coder@qq.com"
```

按提示选择密钥保存路径（默认 `~/.ssh/id_ed25519`），并设置密码（可选，生产环境建议设置）。

如果系统不支持 `ed25519`，可使用 `rsa`：

```bash
ssh-keygen -t rsa -b 4096 -C "你的邮箱@example.com"
```

### 将公钥添加到远程仓库

```bash
cat ~/.ssh/id_ed25519.pub
```

复制输出的全部内容，然后登录你的 GitHub/GitLab 等平台，在 Settings → SSH and GPG keys 中添加该公钥。
