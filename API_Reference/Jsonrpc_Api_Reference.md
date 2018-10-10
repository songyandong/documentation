1.2 User JSON RPC Reference: methods
### 全局说明

"ppio", "ppio daemon", "ppio daemon start" 都会启动一个 ppio 用户节点

除了 "daemon start", "init", "help", "version" ，其他命令或者子命令都是通过RPC调用，访问或者控制该用户节点，故除非特别说明，它们都有相同的选项 rpchost 和 rpcport

"ppio daemon start" 也有选项 "rpchost 和 rpcport"，是用来临时覆盖默认配置文件中的RPC服务监听地址和端口

用法:

```
# 对于daemon启动命令
ppio daemon start [--rpchost=<rpchost>] [--rpcport=<rpcport>]

# 对于rpc命令
ppio COMMAND [SUB-COMMAND]
    [--rpchost=<rpchost>]
    [--rpcport=<rpcport>]
```

选项:

| 选项    | 默认值      | 描述         |
| --------- | ----------- | ------------ |
| --rpchost | "127.0.0.1" | RPC 服务地址 |
| --rpcport | 18060       | RPC 端口     |

例子:

```
# 启动用户节点，监听18061端口
> ppio --rpcport=18061

# 进行一个RCP调用，连接18060端口
> ppio config --rpcport=18060

> ppio config show --rpcport=18060
```

---------------
### ppio_config

描述:
```
管理用户节点的配置信息
```

子命令:

| 子命令                                  | 描述                       |
| --------------------------------------- | -------------------------- |
| [`ppio_config_show`](#ppio_config_show) | 列出当前用户节点的配置信息 |

---------------
### ppio_config_show

描述:

```
列出当前用户节点的配置信息
```

选项:

| 选项    | 默认值      | 描述         |
| --------- | ----------- | ------------ |
| --rpchost | "127.0.0.1" | RPC 服务地址 |
| --rpcport | 18060       | RPC 端口     |

例子:

```
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"ppio_config_show","params":[],"id":3}'

// Result
{
  "id":3,
  "jsonrpc": "2.0",
  "result": {
    "Net": {
      "BindIP": "127.0.0.1",
      "UDPPort": 8060,
      "TCPPort": 8060,
      "Debug": true,
      "DisableTCP": false
    },
    "RPCHost": "127.0.0.1",
    "RPCPort": 18060,
    "Bootstrap": {
      "IP": "127.0.0.1",
      "UDPPort": 8030,
      "TCPPort": 8030,
      "ID": ""
    },
    "UserAccount": "",
    "StroagePath": "storage",
    "StorageMax": "1024",
    "StorageGCThreshold": 0,
  }
}

```

---------------
### ppio_daemon

描述:
```
管理用户节点服务
```

子命令:

| 子命令                                  | 描述             |
| --------------------------------------- | ---------------- |
| [`ppio_daemon_stop`](#ppio_daemon_stop) | 关闭用户节点服务 |

---------------
#### ppio_daemon_stop

描述:

```
关闭用户节点服务
```

例子:

```
# 返回成功标识或失败标识及原因

// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"ppio_daemon_stop","params":[],"id":3}'

// Result
{
  "id":3,
  "jsonrpc": "2.0",
  "result": "Succeed!"
}
```

---------------
### ppio_metadata

描述:
```
管理用户的元数据
```

子命令:

| 子命令                                    | 描述                                 |
| ----------------------------------------- | ------------------------------------ |
| [`ppio_metadata_put`](#ppio_metadata_put) | 向 Indexer 上传用户 的 MetaData 信息 |
| [`ppio_metadata_get`](#ppio_metadata_get) | 向 Indexer 下载用户的 MetaData 信息  |

---------------
#### ppio_metadata_put

描述:

```
向 Indexer 上传用户的 MetaData 信息，限制该信息的最大占用空间为 1M
MetaData 用于存储用户相关的基本信息，使用场景不限
```

参数:

```
<meta-data>：待上传的 MetaData 内容，文本形式
```

例子:

```
# 返回成功或失败的标识

// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"ppio_metadata_put","params":{"meta-data":"Test MetaData"},"id":3}'

// Result
{
  "id":3,
  "jsonrpc": "2.0",
  "result": "Succeed!"
}
```

---------------
#### ppio_metadata_get

描述:

```
向 Indexer 下载用户的 MetaData 信息
```

例子:

```
# 命令执行成功后可获得用户 MetaData 的十六进制形式的字符串

// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"ppio_metadata_get","params":[],"id":3}'

// Result
{
  "id":3,
  "jsonrpc": "2.0",
  "result": "Test MetaData"
}
```

---------------
### ppio_net

描述:
```
管理用户节点的网络信息
```

子命令:

| 子命令                                  | 描述                                   |
| --------------------------------------- | -------------------------------------- |
| [`ppio_net_id`](#ppio_net_id)           | 显示当前节点的网络地址，十六进制字符串 |
| [`ppio_net_ping`](#ppio_net_ping)       | 检测与其他节点之间的连接情况           |
| [`ppio_net_peers`](#ppio_net_peers)     | 显示当前已连接的 peer 信息列表         |
| [`ppio_net_servers`](#ppio_net_servers) | 显示当前已连接的 Servers 信息列表      |

---------------
#### ppio_net_id

描述:

```
显示当前节点的网络地址
```

例子:

```
# 命令返回

// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"ppio_net_id","params":[],"id":3}'

// Result
{
  "id":3,
  "jsonrpc": "2.0",
  "result": "080a6fdb95cee6f852cb4b061525c866cbbe2c0a"
}
```

---------------
#### ppio_net_ping

描述:

```
检测与其他节点之间的连接情况
```

参数:

```
<target-peer-id>：待检测的目标 peer ID 值
```

例子:

```
# 命令返回内容格式：
# <target-peer-id> <out-latency> <in-latency>

// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"ppio_net_ping","params":{"target-peer-id":"080a6fdb95cee6f852cb4b061525c866cbbe2c0a"},"id":3}'

// Result
{
  "id":3,
  "jsonrpc": "2.0",
  "result": "080a6fdb95cee6f852cb4b061525c866cbbe2c0a 20ms 20ms"
}
```

---------------
#### ppio_net_peers

描述:

```
显示当前已连接的 Peer 信息列表
```

例子:

```
# 返回的记录格式
# <peer-id> <ip:port> <software-version> <in-latency> <out-latency>

// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"ppio_net_peers","params":[],"id":3}'

// Result
{
  "id":3,
  "jsonrpc": "2.0",
  "result": [{"080a6fdb95cee6f852cb4b061525c866cbbe2c0a 101.200.0.1:5000 v1.1 10ms 20ms"}, {"080a6fdb95cee6f852cb4b061525c866cbbe2c0a 101.200.0.3:5100 v1.1 10ms 20ms"}]
}
```

---------------
#### ppio_net_servers

描述:

```
显示当前已连接的 Servers 信息列表
```

例子:

```
# 返回的记录格式
# <index> [indexer | verifier] <ip>:<tcpport>:<udpport>

// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"ppio_net_servers","params":[],"id":3}'

// Result
{
  "id":3,
  "jsonrpc": "2.0",
  "result": [
    {"Indexers count":"1", "0":"indexer 127.0.0.1:8030:8030"},
    {"Verifiers count":"1", "0":"verifier 127.0.0.1:8040:8040"}
    ]
}
```

---------------
### ppio_object

描述:

```
管理用户的 Object
```

子命令:

| 子命令                                            | 描述                                                                    |
| ------------------------------------------------- | ----------------------------------------------------------------------- |
| [`ppio_object_import`](#ppio_object_import)       | 从本地文件系统或者管道导入一个文件到存储空间                            |
| [`ppio_object_export`](#ppio_object_export)       | 从本地存储空间导出一个 Object 到本地文件系统                            |
| [`ppio_object_put`](#ppio_object_put)             | 发布一个用于上传 Object 的合约                                          |
| [`ppio_object_get`](#ppio_object_get)             | 下载一个 Object 的所有内容到本地存储空间                                |
| [`ppio_object_copy`](#ppio_object_copy)           | 发起一个 Object 的拷贝合约，用来将某个 Object 拷贝到自己名下            |
| [`ppio_object_status`](#ppio_object_status)       | 获取某个 Object 相关的合约信息及执行情况，只能用于查看用户自己的 Object |
| [`ppio_object_list`](#ppio_object_list)           | 分页获取所有 Object 的合约执行情况                                      |
| [`ppio_object_delete`](#ppio_object_delete)       | 删除某个 Object 对应的合约                                              |
| [`ppio_object_renew`](#ppio_object_renew)         | 重新发布某个 Object 对应的合约                                          |
| [`ppio_object_updateacl`](#ppio_object_updateacl) | 更新某个 Object 的 ACL 信息                                             |
| [`ppio_object_auth`](#ppio_object_auth)           | 将本地存储空间里面的 Object 授权给其他用户                              |

---------------
#### ppio_object_import

描述:

```
从本地文件系统或者管道读入一个文件，对文件进行处理后将其存放到本地存储空间，最终存放到本地存储空间里的文件我们称之为 Object
文件处理的详细过程：
先对该文件进行加密，然后对加密后的文件进行切片以将其切成多个文件（称之为 Segment），Segment 的文件名为其内容的 Hash 值，将所有 Segment 内容的 Hash 值进行拼接后，对拼接后的内容进行 Hash 以生成 Object 的 Hash 值
Segment 在本地存储空间的位置如下所示：

<datadir>/storage/<object-hash>/<object-hash>.desc
<datadir>/storage/<object-hash>/<segment1-id>.dat
<datadir>/storage/<object-hash>/<segment2-id>.dat

# <object-hash> = HASH(<segment1-hash><segment2-hash>)
# <object-hash>.desc 的文件内容：
# <object-hash> <object-hash>   <segment-count>  <object-length>
# <segment1-id> <segment1-hash> <segment1-index> <segment1-length>
# <segment1-id> <segment2-hash> <segment2-index> <segment2-length>

文件成功导入后，可以通过 storage object 或者 storage objects 命令查看该 object 的信息
```

参数:

```
<local-file-path>： 待导入的本地文件路径
-：表示可通过管道传输文件数据
```

选项:

| 选项    | 默认值 | 描述                                                         |
| --------- | ------ | ------------------------------------------------------------ |
| --encrypt | "AES"  | 设置用于加密原始文件内容的加密算法，当前可选择的加密算法有：AES |
| --key     | ""     | 指定用于加密原始文件内容的密钥                                  |

例子:

```
# 如果导入成功，命令返回的是 Object 的 Hash 值；否则返回错误标识及错误原因

// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"ppio_object_import","params":{"local-file-path":"/home/u/1.txt"},"id":3}'

// Result
{
  "id":3,
  "jsonrpc": "2.0",
  "result": "98715955d14b4ea129fed7efd1ffdd2ba7a0cc4a2e46160058a740893bbaf2d1"
}


// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"ppio_object_import","params":{"encrypt":"AES", "key":"TEST_KEY", "local-file-path":"/home/u/1.txt"},"id":3}'

// Result
{
  "id":3,
  "jsonrpc": "2.0",
  "result": "98715955d14b4ea129fed7efd1ffdd2ba7a0cc4a2e46160058a740893bbaf2d1"
}


// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"ppio_object_import","params":{"encrypt":"AES", "key":"TEST_KEY", "local-file-path":"/home/u/1.txt"},"id":3}'

// Result
{
  "id":3,
  "jsonrpc": "2.0",
  "result": "98715955d14b4ea129fed7efd1ffdd2ba7a0cc4a2e46160058a740893bbaf2d1"
}

<TODO>
> echo "TEST" | ppio object import --encrypt=AES --key=TEST_KEY -
98715955d14b4ea129fed7efd1ffdd2ba7a0cc4a2e46160058a740893bbaf2d1

```

---------------
#### ppio_object_export

描述:

```
从本地存储空间导出一个 Object 到本地文件系统
具体流程：
如果本地存储空间中没有指定的 Object，则会先从 ppfs 网络中请求下载到空间；
准备好 Object 后，对 Object 中的 Segment 进行拼接、解密，然后将最终生成的文件存入本地文件系统

```

参数:

```
<object-hash>：待导出的 Object 的 Hash 值
```

选项:

| 选项    | 默认值   | 描述                                                         |
| --------- | -------- | ------------------------------------------------------------ |
| --encrypt | "AES"    | 设置用于解密原始文件内容的加密算法，和加密算法相对应         |
| --key     | ""       | 指定用于解密 Object 中内容的密钥                             |
| --output  | 当前目录 | 本地文件的路径，如果不指定，则以 <object-hash> 为文件名写入当前目录 |

例子:

```
# 命令执行成功后，返回导出文件的所在路径；否则返回错误码及错误原因
> pwd
/home/u/a/b/c/

// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"ppio_object_export","params":{"object-hash":"98715955d14b4ea129fed7efd1ffdd2ba7a0cc4a2e46160058a740893bbaf2d1"},"id":3}'

// Result
{
  "id":3,
  "jsonrpc": "2.0",
  "result": "Succeed to export to   /home/u/a/b/c/98715955d14b4ea129fed7efd1ffdd2ba7a0cc4a2e46160058a740893bbaf2d1"
}


// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"ppio_object_export","params":{"key":"TEST_KEY", "output":"/home/u/1.txt", "object-hash":"98715955d14b4ea129fed7efd1ffdd2ba7a0cc4a2e46160058a740893bbaf2d1"},"id":3}'

// Result
{
  "id":3,
  "jsonrpc": "2.0",
  "result": "Succeed to export to /home/u/1.txt"
}
```

---------------
#### ppio_object_put

描述:

```
发布一个用于上传 Object 的合约
```

参数:

```
<object-hash>：目标 Object 的 Hash 值
```

选项:

| 选项     | 默认值           | 描述                                                         |
| ---------- | ---------------- | ------------------------------------------------------------ |
| --copies   | 5                | 存储的副本个数，至少为 5 个                                  |
| --duration | 8640000，即100天 | Object 的存放时间，以 s（秒）为单位                          |
| --gasprice | 无               | Gas 单价，以 wei 为单位                                      |
| --acl      | public           | Object 的访问权限：设置为 public 代表该 Object 可以被任何人访问；设置为 private 代表该 Object 是私密的，需要被授权才能访问 |

例子:

```
# 合约发布成功，不代表 Indexer 一定会调度或 Object 已上传成功，可以通过 `ppio object status` 命令来查询该 Object 是否被成功上传
# 如果合约发布失败，会返回错误标识及错误原因

// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"ppio_object_put","params":{"copies":"3", "duration":"864000", "gasprice":"10000", "acl":"public", "object-hash":"98715955d14b4ea129fed7efd1ffdd2ba7a0cc4a2e46160058a740893bbaf2d1"},"id":3}'

// Result
{
  "id":3,
  "jsonrpc": "2.0",
  "result": "Succeed!"
}
```

---------------
#### ppio_object_get

描述:

```
下载一个 Object 的所有内容到本地存储空间
当 Object 为其他人所拥有时，有如下两种情况：
- 如果 Object 的 ACL 设置为 public，则可以直接通过 object get 来下载该 Object
- 如果 Object 的 ACL 设置为 private，则必须先拥有该 Object 的签名授权（通过 object auth命令），且在该签名有效期内，用户才能通过 object get 下载该 Object

```

参数:

```
<object-hash>：Object 的 Hash 值（可以是其他人的 Object）
```

选项:

| 选项     | 默认值 | 描述                                                         |
| ---------- | ------ | ------------------------------------------------------------ |
| --gasprice | 无     | Gas 单价，以 wei 为单位当 Object 为其他人所拥有时，需要设置该字段 |
| --owner    | 无     | 当 Object 为其他人所拥有时，该字段表示其他人的 user-id       |
| --auth     | 无     | 当 Object 为其他人所拥有且 Object 的 ACL 设置为 private 时，需要其他人提供该 Object 的签名用以授权 |

例子:

```
# 命令执行成功后则返回 Object 在本地存储空间中的目录信息，否则返回错误标识和错误信息

# 用户080a6fdb95cee6f852cb4b061525c866cbbe2c0a下自己的或者是Public的Object
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"ppio_object_get","params":{"gasprice":"1000", "object-hash":"98715955d14b4ea129fed7efd1ffdd2ba7a0cc4a2e46160058a740893bbaf2d1"},"id":3}'

// Result
{
  "id":3,
  "jsonrpc": "2.0",
  "result": "Succeed!"
}

# 用户080a6fdb95cee6f852cb4b061525c866cbbe2c0a给用户080a6fdb95cee6f852cb4b061525c866cbbe2c0a授权
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"ppio_object_auth","params":{"accessor":"fffffff95cee6f852cb4b061525c866cbbe2c0a", "duration":"86400", "object-hash":"98715955d14b4ea129fed7efd1ffdd2ba7a0cc4a2e46160058a740893bbaf2d1"},"id":3}'

// Result
{
  "id":3,
  "jsonrpc": "2.0",
  "result": {"Auth Info":"667b0377..."}
}

# 用户fffffff95cee6f852cb4b061525c866cbbe2c0a通过授权下载文件
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"ppio_object_get","params":{"gasprice":"1000", "auth":"667b0377...", "owner": "080a6fdb95cee6f852cb4b061525c866cbbe2cff", "object-hash": "98715955d14b4ea129fed7efd1ffdd2ba7a0cc4a2e46160058a740893bbaf2d1"},"id":3}'

// Result
{
  "id":3,
  "jsonrpc": "2.0",
  "result": "Succeed!"
}
```

---------------
#### ppio_object_copy

描述:

```
发起一个 Object 的拷贝合约，用来将某个 Object 拷贝到自己名下
```

参数:

```
<object-hash>：待拷贝的 Object 的 Hash 值
```

选项:

| 选项     | 默认值           | 描述                                                         |
| ---------- | ---------------- | ------------------------------------------------------------ |
| --copies   | 5                | 存储的副本个数，至少为 5 个                                  |
| --duration | 100天，即8640000 | Object 的存放时间，以 s（秒）为单位                          |
| --gasprice | 无               | Gas 单价，以 wei 为单位                                      |
| --acl      | public           | Object 的访问权限，设置为 public 代表该 Object 可以被任何人访问；设置为 private 代表该 Object 是私密的，需要被授权才能访问 |
| --owner    | 无               | 文件拥有者的id                                                                                                             |
| --auth     | 无               | 拷贝其他人的 Object 时所需，需要其他人提供的 Object 签名用以授权                                                           |

例子:

```
# 合约 Copy 成功后则直接返回成功标识，不代表 Indexer 一定会调度或 Object 已拷贝成功，可以通过 `object status` 命令来查询该 Object 是否被成功拷贝
# 合约 Copy 失败则返回错误标识及错误原因

// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"ppio_object_copy","params":{"copies":"5", "duration":"86400", "gasprice":"100", "auth":"0x1234", "owner": "080a6fdb95cee6f852cb4b061525c866cbbe2cff", "object-hash": "98715955d14b4ea129fed7efd1ffdd2ba7a0cc4a2e46160058a740893bbaf2d1"},"id":3}'

// Result
{
  "id":3,
  "jsonrpc": "2.0",
  "result": "Succeed!"
}
```

---------------
#### ppio_object_status

描述:

```
获取某个 Object 相关的合约信息及执行状况，只能用于查看自己的 Object
```

参数:

```
<object-hash>：待查询的 Object 的 Hash 值
```

例子:

```
# 命令执行成功，返回示例：
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"ppio_object_status","params":{"object-hash": "98715955d14b4ea129fed7efd1ffdd2ba7a0cc4a2e46160058a740893bbaf2d1"},"id":3}'

// Result
{
  "id":3,
  "jsonrpc": "2.0",
  "result": {
  //TODO format
      "Object Hash": "98715955d14b4ea129fed7efd1ffdd2ba7a0cc4a2e46160058a740893bbaf2d1",
"Storage Contracts":
[
  {
    "ObjectHash": "98715955d14b4ea129fed7efd1ffdd2ba7a0cc4a2e46160058a740893bbaf2d1",
    "ContractId": "3c10a30666e4a7f98893931e9823181e0d1e7fa14a94af33e2e3873b8feea857",
    "ContractStatus": "US_DEAL",
    "Copies": 1,
    "Duration": 864000,
    "StartTime": 1538633435,
    "GasPrice": 10000,
    "CopiesRecord": "AQ==",
    "MinerSegmentsInfo": {
      "SegmentCopyInfo": [
        {
          "SegmentInfo": {
            "BasicInfo": {
              "SegmentHash": "98715955d14b4ea129fed7efd1ffdd2ba7a0cc4a2e46160058a740893bbaf2d1",
              "SegmentId": "e2380dbf52d2d165042b120277fe4b55a485f508625c2877ad348062997070ff",
              "SegmentLength": 365
            }
          }
        }
      ]
    }
  }
]
  }
}
```

---------------
#### ppio_object_list

描述:

```
分页获取所有 Object 。和object status不同的是，object list 只是 Object 的列表，没有相对应的合约的执行情况等信息
```

选项:

| 选项       | 默认值 | 描述                         |
| ------------ | ------ | ---------------------------- |
| --start-page | 1      | 开始页，需大于等于 1         |
| --page-size  | 10     | 每页最多包含的 Object 记录数 |

例子:

```
# 命令输出格式：
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"ppio_object_list","params":[],"id":3}'

// Result
{
  "id":3,
  "jsonrpc": "2.0",
  // TODO format
  "result":
  [
  {
    "ObjectBasicInfo": {
      "ObjectHash": "98715955d14b4ea129fed7efd1ffdd2ba7a0cc4a2e46160058a740893bbaf2d1",
      "ObjectType": "file",
      "ObjectAclType": "Public"
    },
    "SegmentInfos": [
      {
        "BasicInfo": {
          "SegmentHash": "98715955d14b4ea129fed7efd1ffdd2ba7a0cc4a2e46160058a740893bbaf2d1",
          "SegmentId": "e2380dbf52d2d165042b120277fe4b55a485f508625c2877ad348062997070ff",
          "SegmentLength": 365
        }
      }
    ]
  }
]
}
```

---------------
#### ppio_object_delete

描述:

```
删除某个 Object 对应的合约
```

参数:

```
<object-hash>：待删除的 Object 的 Hash 值
```

例子:

```
# 删除合约成功后会返回成功标识，否则返回错误标识和原因
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"ppio_object_delete","params":{"object-hash": "98715955d14b4ea129fed7efd1ffdd2ba7a0cc4a2e46160058a740893bbaf2d1"},"id":3}'

// Result
{
  "id":3,
  "jsonrpc": "2.0",
  "result": "Succeed!"
}
```

---------------
#### ppio_object_renew

描述:

```
重新发布某个 Object 对应的合约
```

参数:

```
<object-hash>：待重新发布合约的 Object 的 Hash 值
```

选项:

| 选项     | 默认值           | 描述                                                         |
| ---------- | ---------------- | ------------------------------------------------------------ |
| --copies   | 5                | 存储副本的个数，不小于 5                                     |
| --duration | 100天，即8640000 | Object 的存放时间，以 s（秒）为单位                          |
| --gasprice | 无               | Gas 单价，以 wei 为单位                                      |
| --acl      | public           | Object 的访问权限，设置为 public 代表该 Object 可以被任何人访问；设置为 private 代表该 Object 是私密的，需要被授权才能访问 |

例子:

```
# 发布合约成功会返回成功标识，否则会返回失败标识及原因另外，发布合约成功，并不代表 Indexer 一定会调度
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"ppio_object_renew","params":{"duration":"864000", "gasprice":"100", "copies":"5", "acl":"public", "object-hash":"98715955d14b4ea129fed7efd1ffdd2ba7a0cc4a2e46160058a740893bbaf2d1"},"id":3}'

// Result
{
  "id":3,
  "jsonrpc": "2.0",
  "result": "Succeed!"
}
```

---------------
#### ppio_object_updateacl

描述:

```
更新某个 Object 的 ACL 信息
```

参数:

```
<object-hash>：待更新 ACL 信息的 Object 的 Hash 值
```

选项:

| 选项  | 默认值 | 描述                                                                                                                       |
| ----- | ------ | -------------------------------------------------------------------------------------------------------------------------- |
| --acl | public | Object 的访问权限，设置为 public 代表该 Object 可以被任何人访问；设置为 private 代表该 Object 是私密的，需要被授权才能访问 |

例子:

```
# 更新成功会返回成功标识，否则返回失败标识及原因
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"ppio_object_updateacl","params":{"acl": "public", "object-hash": "98715955d14b4ea129fed7efd1ffdd2ba7a0cc4a2e46160058a740893bbaf2d1"},"id":3}'

// Result
{
  "id":3,
  "jsonrpc": "2.0",
  "result": "Succeed!"
}
```

---------------
#### ppio_object_auth

描述:

```
将本地存储空间里面的 Object 授权给其他用户，如果该 Object 的 ACL 为 public，则该命令执行无实际效果。
授权时长不能超过该用户拥有该文件的剩余时长。
```

参数:

```
<object-hash>：待授权的 Object 的 Hash 值
```

选项:

| 选项       | 默认值       | 描述                             |
| ---------- | ------------ | -------------------------------- |
| --accessor | 无           | 被授权用户的id                   |
| --duration | 1天，即86400 | 授权有效持续时间，单位为 s（秒） |

例子:

```
# 授权成功，则返回授权的签名信息，用于被授权用户来获取 Object，否则返回错误标识和信息
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"ppio_object_auth","params":{"accessor": "080a6fdb95cee6f852cb4b061525c866cbbe2c0a", "duration": "86400", "object-hash": "98715955d14b4ea129fed7efd1ffdd2ba7a0cc4a2e46160058a740893bbaf2d1"},"id":3}'

// Result
{
  "id":3,
  "jsonrpc": "2.0",
  "result": {"Auth Info": "667b0377565b0bde135abca46dc724f1e7db610e0d849e06b34d5110d72f427f26ec6250d10f02c46a6fc3c339f0985cc8dd3ace423302bae2d77a4e656f79420198715955d14b4ea129fed7efd1ffdd2ba7a0cc4a2e46160058a740893bbaf2d127000000002508021221033fb36e1471d2153d0759e14386c6c294b1ad09244841ee8d043eadd1bfe7baaa14000000080a6fdb95cee6f852cb4b061525c866cbbe2c0a63f3b65b00000000"}
}
```

---------------
### ppio_status

描述:

```
显示当前 ppio 节点运行时的详细信息
```

例子:

```
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"ppio_status","params":[],"id":3}'

// Result
{
  "id":3,
  "jsonrpc": "2.0",
  "result": {
      "protocol-version": "v0.0.1",
      "version": "v0.1.0",
      "id": "QmfE6VMnNx1ZYdgihniprx4SKqBRDjrDqHWishLQ7CSdEj",
      "rpchost": "127.0.0.1",
      "rpcport": "18060"
  }
}
```

---------------
### ppio_storage

描述:
```
管理本地存储空间
```

子命令:

| 子命令                                            | 描述                                    |
| ------------------------------------------------- | --------------------------------------- |
| [`ppio_storage_object`](#ppio_storage_object)     | 显示当前节点指定object的信息            |
| [`ppio_storage_objects`](#ppio_storage_objects)   | 显示当前节点所有objects的信息           |
| [`ppio_storage_segments`](#ppio_storage_segments) | 显示当前节点所有segments的信息          |
| [`ppio_storage_keep`](#ppio_storage_keep)         | 将 Object 保持在本地存储空间中          |
| [`ppio_storage_usage`](#ppio_storage_usage)       | 查看本地存储空间的使用情况              |
| [`ppio_storage_gc`](#ppio_storage_gc)             | 清理掉本地存储空间中没有被保持的 Object |

---------------
#### ppio_storage_object

描述:

```
显示当前节点指定object的信息
```

参数:

```
<object-hash>：待显示的 Object 的 Hash 值，十六进制字符串
```

例子:

```
# 显示当前节点指定object的信息，包括其大小，segment的个数，以及各个segment的id和hash值

// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"ppio_storage_keep","params":{"object-hash": "7547df322cbaf84fd02248133bf5a1c2fae7296960eced0ef6bde2ff3ef37cf8"},"id":3}'

// Result
{
  "id":3,
  "jsonrpc": "2.0",
  "result": {
      "Hash": "7547df322cbaf84fd02248133bf5a1c2fae7296960eced0ef6bde2ff3ef37cf8",
      "Length": "87041",
      "Segment Count": "1",
      "Segment 0": "6ad3e2278e1251c1a1ebf3f842dcff2caf21d24b94148a8649896f915e574c1e 7547df322cbaf84fd02248133bf5a1c2fae7296960eced0ef6bde2ff3ef37cf8"
  }
}
```

---------------
#### ppio_storage_objects

描述:

```
显示当前节点所有objects的信息
```

例子:

```
# 显示当前节点所有objects的信息，包括每个 object 的hash值和大小

// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"ppio_storage_objects","params":[],"id":3}'

// Result
{
  "id":3,
  "jsonrpc": "2.0",
  "result": [
      {
          "Hash": "C9B351CA25F45D9A1D3830F16D987EEEB90668466768A03A38DC592FCA9937EC",
          "Length": "16777216"
      },
      {
          "Hash": "E949A1CC67C268D7E5294183B9A57B63BC00A0CC8A22909E83D2AAC181A4A9D6",
          "Length": "33554435"
      },
      {
          "Hash": "7547DF322CBAF84FD02248133BF5A1C2FAE7296960ECED0EF6BDE2FF3EF37CF8",
          "Length": "87041"
      },
      {
          "Hash": "BFA15DD67653A6C20A871D8F94E2136A4D053E587CF9CD1D5CF88B96C9370E28",
          "Length": "132098"
      },
      {
          "Hash": "C7E5A790B4D232C5BB7FF5F4618A2A0D1EBF7A96ACD08F57564BAA471E5671CD",
          "Length": "33554432"
      }
  ]
}
```

---------------
#### ppio_storage_segments

描述:

```
显示当前节点所有segments的信息
```

例子:

```
# 显示当前节点所有segments的信息，包括每个segment的id，hash，和大小

// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"ppio_storage_segments","params":[],"id":3}'

// Result
{
  "id":3,
  "jsonrpc": "2.0",
  "result": [
      {
          "Id": "6ad3e2278e1251c1a1ebf3f842dcff2caf21d24b94148a8649896f915e574c1e"，
          "Hash": "7547df322cbaf84fd02248133bf5a1c2fae7296960eced0ef6bde2ff3ef37cf8",
          "Length": "87041"
      },
      {
          "Id": "cc28362ef3b1102b7be2aacc4d98783b87f1bbfaa26f602fff53cbd62ef70632"，
          "Hash": "bfa15dd67653a6c20a871d8f94e2136a4d053e587cf9cd1d5cf88b96c9370e28",
          "Length": "132098"
      },
      {
          "Id": "44926864c68a02dec1722a873ebbdc649c59ef57efb82893d7fa979e49555e65"，
          "Hash": "c9b351ca25f45d9a1d3830f16d987eeeb90668466768a03a38dc592fca9937ec",
          "Length": "16777216"
      },
      {
          "Id": "53e36b79903add8f2c8102fb174ac67461bdca851387083726954c79f43f1ce4"，
          "Hash": "72bddba68e17c5ee3fef4f2dc8fa3489c1416abf826e73fdbf7f54c2d4f41172",
          "Length": "16777216"
      },
      {
          "Id": "4a09e20aa0bc0d351f21918e4f740e8cc064d7bce0295acda8ee167850004921"，
          "Hash": "c9b351ca25f45d9a1d3830f16d987eeeb90668466768a03a38dc592fca9937ec",
          "Length": "16777216"
      },
      {
          "Id": "f6cb55447cbff363854cab3d3bada54953143bb7269fd6380c2558a75428bda0"，
          "Hash": "c9b351ca25f45d9a1d3830f16d987eeeb90668466768a03a38dc592fca9937ec",
          "Length": "16777216"
      },
      {
          "Id": "56e60eeaf1744b4c1f2344ae26b07e958800ef12a4c9c1ba579c3bb240690e8f"，
          "Hash": "72bddba68e17c5ee3fef4f2dc8fa3489c1416abf826e73fdbf7f54c2d4f41172",
          "Length": "16777216"
      },
      {
          "Id": "4b5053da3189dc72a60ab4232a13d76f187227a12cbbd2e749c8f9785f05eb2d"，
          "Hash": "4a5577926eb696943ce694ca52d57a62588a3867535dadf23d2afa2863b67a36",
          "Length": "3"
      }
  ]
}
```

---------------
#### ppio_storage_keep

描述:

```
将某个 Object 保持在本地存储空间中
```

参数:

```
<object-hash>：待设置的 Object 的 Hash 值
```

例子:

```
# 返回成功或失败标识

// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"ppio_storage_keep","params":{"object-hash": "98715955d14b4ea129fed7efd1ffdd2ba7a0cc4a2e46160058a740893bbaf2d1"},"id":3}'

// Result
{
  "id":3,
  "jsonrpc": "2.0",
  "result": "Succeed!"
}
```

---------------
#### ppio_storage_usage

描述:

```
查看本地存储空间的使用情况
```

例子:

```
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"ppio_storage_usage","params":[],"id":3}'

// Result
{
  "id":3,
  "jsonrpc": "2.0",
  "result": {
      "Usage rate": "50%",    // Space usage rate
      "Total": "10G",         // Max storage space
      "Used": "5G",           // Used storage space
      "KetpTotal": "2G"       // Total space for kept objects
      "KeptCount": "3"        // Count of kept objects
  }
}
```

---------------
#### ppio_storage_gc

描述:

```
清理掉本地存储空间中没有被保持的 Object
```

例子:

```
# 返回成功或失败标识

// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"ppio_storage_gc","params":[],"id":3}'

// Result
{
  "id":3,
  "jsonrpc": "2.0",
  "result": "Succeed!"
}
```

---------------
### ppio_wallet

描述:
```
管理用户的钱包
```

子命令:

| 子命令                                        | 描述                             |
| --------------------------------------------- | -------------------------------- |
| [`ppio_wallet_address`](#ppio_wallet_address) | 显示当前钱包地址，十六进制字符串 |
| [`ppio_wallet_balance`](#ppio_wallet_balance) | 显示当前钱包地址的余额           |

---------------
#### ppio_wallet_address

描述:

```
显示当前钱包地址
```

例子:

```
# 返回当前钱包地址

// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"ppio_wallet_address","params":[],"id":3}'

// Result
{
  "id":3,
  "jsonrpc": "2.0",
  "result": "080a6fdb95cee6f852cb4b061525c866cbbe2c0a"
}
```

---------------
#### ppio_wallet_balance

描述:

```
显示当前钱包地址的余额
```

例子:

```
# 返回当前钱包地址的余额

// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"ppio_wallet_balance","params":[],"id":3}'

// Result
{
  "id":3,
  "jsonrpc": "2.0",
  "result": "1000000000"
}
```
