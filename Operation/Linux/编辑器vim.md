# vim

## 1. vi

vi 编辑器是所有 Unix、Linux 系统下的标志编辑器。
在终端中 vi 尤其重要。

**关于 vim**：

vi、vim 都是 Linux 中的编辑器；vim 比较高级，可以认为 vim 是 vi 的升级版，vim 更适合写代码。

vim 的重点

* 光标的移动
* 模式切换
* 删除
* 查找
* 替换
* 复制
* 粘贴
* 撤销

## 2. vim 的三种模式

有三种模式（大众的认知）

* 命令模式
* 编辑模式（输入模式）
* 末行模式（尾行模式）

**命令模式**：

打开文件后默认进入该模式。

不能对文件直接编辑，可以输入快捷键进行操作（删除行、移动光标、复制粘贴）

**编辑模式**：

可对文件内容进行编辑

**末行模式**：

可在末行输入命令来对文件进行操作（搜索、替换、保存、退出、撤销、高亮）

## 3. vim 打开文件的方式

* `vim 文档路径` ：打开指定的文件
* `vim +数字 文档路径` ：打开指定的文档，并移动到指定行
* `vim +/关键字 文档路径` ：打开指定的文档，并高亮显示关键字
* `vim 文档路径1 文档路径2 文档路径n` ：同时打开多个文件

## 4. 命令模式

打开文件即可进入。

* 光标移动到
  * 行首：`Shift + 6` (`$`)
  * 行尾：`Shift + 4` (`^`)
  * 首行：`gg`
  * 末行：`Shift + g` (`G`)
  * 上翻：`Ctrl + b`
  * 下翻：`Ctrl + f`
  * 指定行： `数字 + G`
  * 向上移动 n 行： `数字 + 上方向键`
  * 向下移动 n 行： `数字 + 下方向键`
  * 向左移动 n 字符： `数字 + 左方向键`
  * 向右移动 n 字符： `数字 + 右方向键`
* 粘贴
  * 粘贴到光标所在行之下：`p`
* 复制
  * 光标所在行：`yy`
  * 向下复制指定行：`数字 + yy` (包含光标所在行)
  * 块操作：`Ctrl + v`
    * 按方向键选中需要复制的区块
    * 按 `yy` 进行复制，按 `p` 进行粘贴
    * 按两下 `Esc` 退出操作
* 剪切(删除)
  * 光标所在行：`dd` (删除后，下行上移)
  * 向下剪切指定行： `数字 + dd`
  * 删到行尾：`Shift + d`
* 撤销
  * `u` (undo)
* 恢复
  * `Ctrl + r`

## 5. 模式切换

命令模式 ===`Shift + ;`===> 末行模式

命令模式 ===`a/i`===> 编辑模式

末行模式 ===`Esc`===> 命令模式

编辑模式 ===`Esc`===> 命令模式

## 6. 末行模式

按下`:`(`Shift + ;`)进入该模式。

* 移动到指定行
  * `:数字` ↙
* 保存文件（write）
  * 保存：`:w` ↙
  * 另存： `:w 路径` ↙
* 退出（quit）
  * 退出：`:q` ↙
* 保存并退出
  * `:wq` ↙
* 强制操作
  * 强制退出，不保存修改：`:q!`
* 调用外部命令
  * `:! 命令` ↙，如 `:! ls`
* 搜索/查找
  * `/关键字` ↙ ，如 `/sbin`
  * 下一个：`n`
  * 上一个：`N`（`Shift + n`）
  * 取消高亮：`:nohl`
* 替换（`%` 表示整个文档，`g` 表示全局）
  * 光标所在行，符合条件的第一个：`:s/关键字/新的内容`
  * 光标所在行，符合条件的所有：`:s/关键字/新的内容/g`
  * 每行第一个符合条件的：`:%s/关键字/新的内容`
  * 所有：`:%s/关键字/新的内容/g`
* 显示行号
  * 显示：`:set nu`（临时显示）
  * 隐藏：`:set nonu`

使用 vim 打开多个文件，进行切换

```shell
# 打开多个文件
➜  ~ vim 1.txt 2.txt

# 查看打开的文件
:files
  1 %a   "1.txt"                        line 25
  2      "2.txt"                        line 0

# 切换到指定名称的文件
:open 2.txt

:files
  1 #    "1.txt"                        line 25
  2 %a   "2.txt"                        line 1

# 打开新的文件
:open 3.txt

:files
  1      "1.txt"                        line 25
  2 #    "2.txt"                        line 1
  3 %a   "3.txt"                        line 2

# 切换到上一个文件（back prev）
:bp

# 切换到下一个文件（back next）
:bn
```

`%a` 表示当前文件，active

`#` 表示上一个打开的文件

## 7. 编辑模式

命令模式进入编辑模式

* `i`：在光标所在字符前插入
* `a`：在光标所在字符后插入
* `o`：在光标所在行下，另起一行插入
* `I`：行首插入
* `A`：行尾插入
* `O`：在光标所在行上，另起一行插入

退出编辑模式：`Esc`

## 8. 实用功能

代码着色（语法高亮），临时设置

* 显示：`:syntax on`
* 关闭：`:syntax off`

vim 中计算器的使用

1. 进入编辑模式
2. 按下 `Ctrl + r`
3. 按下 `=`
4. 输入公式，如 `100 + 88`

## 9. 扩展

### 9.1. vim 的配置文件

vim 是一款编辑器，有相应的配置文件。

vim 配置有三种情况：

* 在末行模式下的配置（临时的）
* 个人配置文件
  * 路径：`~/.vimrc`
  * 每个用户都可以单独设置，默认没有
  * 该文件中的配置项优先级高于全局配置
* 全局配置文件（vim 自带的）
  * 路径：`/etc/vimrc`
  * 不建议修改

配置项：

```text
# set line num
set nu

" syntax highlight
syntax on
```

### 9.2. 异常退出

在编辑文件后，并没有正常退出（`:wq` 或 `:q!`），而是直接关闭终端：

1. `vim 1.txt`
2. 进入编辑模式，输入内容
3. 关闭终端

此时在目录存在以下文件

```shell
➜  test ls -a
.          ..         .1.txt.swp
```

再次去编辑 `1.txt`，会显示如下结果

```shell
➜  test vim 1.txt


E325: ATTENTION
Found a swap file by the name ".1.txt.swp"
          owned by: forwardNow   dated: Tue Oct  9 21:03:25 2018
         file name: ~forwardNow/Downloads/test/1.txt
          modified: YES
         user name: forwardNow   host name: wuqinfeis-iMac.local
        process ID: 5851
While opening file "1.txt"

(1) Another program may be editing the same file.  If this is the case,
    be careful not to end up with two different instances of the same
    file when making changes.  Quit, or continue with caution.
(2) An edit session for this file crashed.
    If this is the case, use ":recover" or "vim -r 1.txt"
    to recover the changes (see ":help recovery").
    If you did this already, delete the swap file ".1.txt.swp"
    to avoid this message.

Swap file ".1.txt.swp" already exists!
[O]pen Read-Only, (E)dit anyway, (R)ecover, (D)elete it, (Q)uit, (A)bort:
```

解决方法就是删除交换文件，按下 `d` 键即可。

### 9.3. 别名机制

给命令指定别名。（用于给比较长的命令指定别名）

通过别名映射文件（`~/.bashrc`）实现的。

```shell
➜  ~ cat ~/.bashrc
# .bashrc

# User specific aliases and functions

alias rm='rm -i'
alias cp='cp -i'
alias mv='mv -i'

# Source global definitions
if [ -f /etc/bashrc ]; then
  . /etc/bashrc
fi
```

例如，添加清屏别名 `alias cls='clear'`。

修改完毕后，如果想让它生效，需要重新登录用户。

### 9.4. 退出方式

退出 vim 的方式

* `:q`
* `:wq`（如果未修改而使用该命令，会更新最后修改时间，造成修改时间的混淆）
* `:x`（修改过，则保存退出；未修改过，则直接退出）

注意：`:X` 是对文件进行加密（或解密，输入空密码）。加密后需要保存。