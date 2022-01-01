# Walking Calculator 后端

## 📱 前端

> https://github.com/HongDing97/walking_calc

## ⛏ 技术栈

- Node.js 14 (16版本有一个库不兼容)
- Express
- MongoDB

## 🌟 Run & Build

在 **/module/dataBase.js** 中修改 `mongodb` 连接字符串，数据库需要自己手动创建。

```js
class DataBase {
  static connectionStr = 'mongodb://localhost'
  static dbName = 'walking_calc'		// 需要自己创建数据库
  ...
}
```

默认端口`3500`，修改请在 **app.js** 文件中

```js
app.listen(3500)
```

### 手动运行

```bash
mpm start
```

### 使用 Docker Compose

可以一同部署 mongodb 数据库和后端

修改 **docker-compose.yml** 中数据库的用户名和密码，也可以修改后端的端口映射

```yml
mongo:
  environment:
    MONGO_INITDB_ROOT_USERNAME: <username>
    MONGO_INITDB_ROOT_PASSWORD: <password>
node:
  ports:
    - "3500:3500"
```

```bash
docker-compose up -d
```

## 🔍 API

### 返回示例

```json
{
    "code": 200,
    "result": "ok",
    "data": { 
        
     }
}
```

### `post` /register

Body 参数 (multipart/form-data)

| 参数名 | 必填 | 备注   |
| ------ | ---- | ------ |
| uid    | ✅    | string |
| name   | ✅    | string |
| avatar | ✅    | file   |

### `get` /login

| 参数名 | 必填 | 备注 |
| ------ | ---- | ---- |
| uid    | ✅    | string |

### `get` /getUserAvatar

| 参数名 | 必填 | 备注 |
| ------ | ---- | ---- |
| uid    | ✅    | string |

### `get` /getUsers

| 参数名  | 必填 | 备注              |
| ------- | ---- | ----------------- |
| uid     | ⚠️    | 根据 uid 查询     |
| name    | ⚠️    | 根据 name 查询    |
| keyword | ⚠️    | 根据 keyword 查询 |

### `get` /createGroup

| 参数名    | 必填 | 备注   |
| --------- | ---- | ------ |
| groupName | ✅    | string |
| creator   | ✅    | string |
| member1   | ❌    | string |
| member... | ❌    | string |

### `get` /joinGroup	

| 参数名  | 必填 | 备注   |
| ------- | ---- | ------ |
| groupID | ✅    | string |
| uid     | ✅    | string |

### `get` /getGroup	

| 参数名  | 必填 | 备注              |
| ------- | ---- | ----------------- |
| groupID | ⚠️    | 根据 groupID 查询 |
| uid     | ⚠️    | 根据 uid 查询     |

### `get` /addRecord

| 参数名     | 必填 | 备注                     |
| ---------- | ---- | ------------------------ |
| groupID    | ✅    | string                   |
| who        | ✅    | string                   |
| piad       | ✅    | number                   |
| type       | ✅    | 账单类别 emoji 图标      |
| typeText   | ✅    | 账单类别字符串           |
| forWhom1   | ✅    | 必须要有一个被支付的对象 |
| forWhom... | ❌     | string                   |

### `get` /modifyRecord

| 参数名     | 必填 | 备注                     |
| ---------- | ---- | ------------------------ |
| groupID    | ✅    | string                   |
| recordID   | ✅    | string                   |
| who        | ✅    | string                   |
| piad       | ✅    | number                   |
| type       | ✅    | 账单类别 emoji 图标      |
| typeText   | ✅    | 账单类别字符串           |
| forWhom1   | ✅    | 必须要有一个被支付的对象 |
| forWhom... | ❌    | string                   |

### `get` /deleteRecord	

| 参数名   | 必填 | 备注   |
| -------- | ---- | ------ |
| groupID  | ✅    | string |
| recordID | ✅    | string |

