 # MongoDB

## 1. 参考

菜鸟教程：http://www.runoob.com/mongodb/mongodb-tutorial.html

## 2. 关系型数据库和非关系型数据库

### 2.1. 关系型数据库

表就是关系，或者说表与表之间存在关系。

**特点**：

* 需要通过 SQL 语言来操作
* 在操作数据之前都需要设计表结构
* 数据表支持约束
    * 唯一性约束
    * 主键
    * 默认值
    * 非空

**关系**：

* 一对一
* 一对多
* 多对对

**关系型数据库**：

* Oracle
* SQLServer
* MySQL

### 2.2. 非关系型数据库

非常灵活，有的非关系型数据库就是 key-value 对。

而 MongoDB 是长得最像关系型数据库的非关系型数据库：

* 数据库
* 数据表 => 集合（collection）
* 表记录 => 对象（object）

MongoDB 不需要设计表结构，
也就是说可以任意往里面存数据，没有结构一说，
也就是说可以往集合里插入任意结构的对象。

## 3. 下载与安装

官网：https://www.mongodb.com/

### 3.1. OSX

文档： https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/

```shell
# 安装
$ brew install mongodb

# 测试
$ mongod --version
db version v4.0.1
git version: 54f1582fc6eb01de4d4c42f26fc133e623f065fb
allocator: system
modules: none
build environment:
    distarch: x86_64
    target_arch: x86_64
```

## 4. 启动与停止

### 4.1. 默认数据存储目录

默认数据存储目录为 `/data/db`，此目录需要手动创建并给予读写权限

```shell
$ sudo mkdir -p /data/db
$ sudo chmod -R 777 /data/db
```

### 4.2. 启动

```shell
# 使用默认数据存储目录
$ mongod

# 使用指定数据存储目录
$ mongod --dbpath=数据存储目录路径
```

### 4.3. 停止

通过 `Ctrl + C` 停止。

## 5. 连接数据库


```shell
$ mongo
MongoDB shell version v4.0.1
connecting to: mongodb://127.0.0.1:27017
MongoDB server version: 4.0.1
Welcome to the MongoDB shell.
>
# 退出
> exit
bye
```

## 6. 基本命令

### 6.1. `show dbs`

查看所有数据库

```
> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB
```

### 6.2. `db`

查看当前数据库。

【注】：如果数据库中没有数据，则不会在 `show dbs` 中显示。

```
> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB
> db
test
```

### 6.3. `use 数据库名称`

切换到指定的数据库（如果没有则新建）

```
> use mydb
switched to db mydb
> db
mydb
> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB
```

### 6.4. 插入数据

在 `mydb` 数据库中创建集合（表） `students`，并插入一条数据（对象）

```
> db
mydb
> db.students.insertOne({"name": "wuqinfei"});
{
	"acknowledged" : true,
	"insertedId" : ObjectId("5b853e3a26fb7dc36213f272")
}
> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB
mydb    0.000GB
```

### 6.5. 查询数据

```shell
# 查询所有集合（表）
> show collections
insert

# 查询指定集合的所有数据
> db.students.find()
{ "_id" : ObjectId("5b853e3a26fb7dc36213f272"), "name" : "wuqinfei" }
```