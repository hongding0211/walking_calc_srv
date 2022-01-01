# Walking Calculator 后端

## 📱 前端

> https://github.com/HongDing97/walking_calc

## ⛏ 技术栈

- Node.js + Express
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

运行服务器

```bash
mpm start
```

## 🔍 API

### 返回示例

```json
{
    "code": 200,
    "result": "ok",
    "data": { ... }
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
| uid    | ✅    |      |

### `get` /getUserAvatar

| 参数名 | 必填 | 备注 |
| ------ | ---- | ---- |
| uid    | ✅    |      |

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
| forWhom... |      | string                   |

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

