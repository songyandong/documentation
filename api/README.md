---
sidebarDepth: 2
---
# Jsonrpc APi Reference
## Overview  
This article uses `curl` to illustrate PPIO Jsonrpc Api. Developers can refer to this protocol to achieve RPC access to PPIO through other languages or tools.

In general, a PPIO command corresponds to a PPIO jsonrpc request (in addition to commands `ppio daemon start`, `ppio init`, `ppio help`, `ppio version`, etc.)

The `--rpchost` and `--rpcport` options in the PPIO command correspond to the RPC host and port specified in the jsonrpc request.

Other options and parameters in the PPIO command are passed in params in jsonrpc. The order is strictly as specified in this document, the parameter name is ignored.

- **curl options**:

  | params | default | description |
  | --------- | ----------- | ------------ |
  | -X | none | requested method name |
  | -H | none | request header |
  | --data | none | request params |

  ::: warning WARNING
    In the examples, unless otherwise specified, the service address and port of the RPC request are: `http://127.0.0.1:18060`, the -H option value is: `content-type:text/json;`, the value of the -X option is: `POST`.
  :::

- **data parameter**:

  | params    | default      | description        |
  | --------- | ----------- | ------------ |
  | id | none | rpc request ID |
  | jsonrpc | "2.0"       | jsonrpc version     |
  | method | none       | rpc request method name    |
  | params | none       | rpc request parmas |

  :::warning WARNING
    The parameters related to the currency pool are not considered in params.
  :::

- **Response**:

  | params    |default    | description        |
  | --------- | ----------- | ------------ |
  | id | none | rpc request ID(It's the same as the rpc request id.)  |
  | jsonrpc | "2.0"       | jsonrpc version     |
  | result | none       | If the rpc request is successful, result is a string indicating that the message is returned or none indicates no message |
  | error | none      | If the rpc request fails, error is a json object. `error.code` indicates the error code, `error.message` indicates the error message     |

- **Example**:
  ```
  # Command
  > ppio object import --rpchost=127.0.0.1 --rpcport=18060 --encrypt=AES --key=123 /home/u/ppio.txt

  # Request
  > curl -X POST -H 'content-type:text/json;' --data '{"id":1,"jsonrpc":"2.0","method":"ObjectImport","params":["/home/u/ppio.txt","AES","123"]}' http://127.0.0.1:18060

  # Response Result succeed
  '{"id":1,"jsonrpc":"2.0","result":"bc07088e505d35f10e51a1a782db06ebdfd057cfba984761c57b9307e0449810"}'

  # Response Result failed
  {"error":{"code":-1,"message":"open /home/u/ppio.txt: no such file or directory"},"id":1,"jsonrpc":"2.0"}

  ```

## ppio config
- **Description**:  
  Manage user node configuration information
- **Subcommand**:

  | subcommand      | description         |
  | --------------------------------------- | -------------------------- |
  | [`ConfigShow`](#configshow) | List the configuration information of the current user node. |

### ConfigShow
- **Description**:  
  List the configuration information of the current user node.
- **Options**:

  | options    | default      | description         |
  | --------- | ----------- | ------------ |
  | --rpchost | "127.0.0.1" | RPC service adress |
  | --rpcport | 18060       | RPC port     |
- **Example**:
  ```bash
  # Command
  > ppio config show

  # Request
  > curl --data '{"jsonrpc":"2.0","method":"ConfigShow","params":[],"id":3}' http://127.0.0.1:18060

  # Response
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
      "StorageMax": 1073741824,
      "StorageGCThreshold": 0.8,
    }
  }
  ```

## ppio daemon
- **Description**:  
  Manage user node services
- **Subcommand**:

  | subcommand      | description  |
  | --------------------------------------- | ---------------- |
  | [`DaemonStop`](#daemonstop) | stop user node service |

### DaemonStop
- **Description**:  
  stop user node service
- **params**:
  none
- **Success Response**:

  | result    |  description|
  | --------- | ----------- |
  | result | null |
- **Fail Response**:
  none
- **Example**:
  ```bash
  # Command
  > ppio daemon stop

  # Request
  > curl --data '{"jsonrpc":"2.0","method":"StopDaemon","params":[],"id":3}' http://127.0.0.1:18060

  # Response
  {
    "id":3,
    "jsonrpc": "2.0",
    "result": null
  }
  ```

## ppio metadata
- **Description**:
  Manage user node Metadata.
- **Subcommand**:

  | subcommand                      | description                            |
  | ----------------------------------------- | ------------------------------------ |
  | [`MetadataPut`](#metadataput) | Upload the user's MetaData information to the Indexer node |
  | [`MetadataGet`](#metadataget) | Download the user's MetaData information to the Indexer node |

### MetadataPut
- **Description**:
  Upload the user's MetaData information to the Indexer node, and limit the maximum occupied space of the information to 1M; MetaData is used to store basic information about users, and the usage scenarios are not limited.
- **params**:

  | options    | default | description       |
  | --------- | ------ | ------------------------------------------------------------ |
  | metadata | none  | Plain text metadata string entered by the user |
  | encoding | "RAW"     |"RAW": Upload the metadata string input by the user directly, "HEX": Convert the user-entered metadata in hexadecimal HEX string and upload it.|
- **Success Response**:

  | result    |  description         |
  | --------- | ----------- |
  | result | null |
- **Fail Response**:

  | result    |  error code         |  error message |
  | --------- | ----------- |----------- |
  | error | -1 |"meta-data exceeds it's limit length" |
  | error | -1 |"account not exists" |
- **Example**:
  ```
  # Command
  > ./ppio metadata put "Test MetaData"

  # Request
  > curl --data '{"id":1,"jsonrpc":"2.0","method":"MetadataPut","params":["Test MetaData",""]}' http://127.0.0.1:18060

  # Result
  {"id":3,"jsonrpc": "2.0","result": null}

  ```

### MetadataGet
- **Description**:
  Download the user's MetaData information to the Indexer node
- **params**:

  | options    | default | description                                                         |
  | --------- | ------ | ------------------------------------------------------------ |
  | encoding | "RAW"     | "RAW": returns the user's metadata directly, "HEX": Converts the user's metadata to a hexadecimal HEX string and returns.|
- **Success Responses**:

  | result    |  description         |
  | --------- | ----------- |
  | result | The metadata of the user node, encoded according to encoding|
- **Fail Responses**:

  | result    |  error code         |  error message |
  | --------- | ----------- |----------- |
  | error | -1 |"account not exists" |
- **Example**:
  ```bash
  # Command
  > ./ppio metadata get

  # Request
  > curl --data '{"id":1,"jsonrpc":"2.0","method":"MetadataGet","params":[""]}' http://127.0.0.1:18060

  # Result succeed
  {"id":1,"jsonrpc":"2.0","result":"Test MetaData"}

  # Result failed
  {"error":{"code":-1,"message":"account not exists"},"id":1,"jsonrpc":"2.0"}
  ```

## ppio net
- **Description**:
  Manage network information of user node.
- **Subcommand**:

  | subcommand        | description     |
  | --------------------| -------------------------------- |
  | [`NetId`](#netid)           | Display the current user node's network address, hex string |
  | [`NetPing`](#netping)       | Detect connections to other user nodes |
  | [`NetPeers`](#netpeers)     | Display the list of currently connected peer information  |
  | [`NetServers`](#netservers) | Display the list of currently connected server information |

### NetId
- **Description**:
  Display the current node's network address, hex string
- **params**:
  none
- **Success Responses**:

  | result    |  description         |
  | --------- | ----------- |
  | result | 当前节点的网络Id，以十六进制字符串表示|
- **Fail Responses**:
  none
- **Example**:
  ```bash
  # Request
  > curl --data '{"jsonrpc":"2.0","method":"NetId","params":[],"id":3}' http://127.0.0.1:18060

  # Result
  {"id":3,"jsonrpc":"2.0","result":"002508021221033fb36e1471d2153d0759e14386c6c294b1ad09244841ee8d043eadd1bfe7baaa"}
  ```

### NetPing
- **Description**:
  Detect connections to other user nodes.
- **params**:

  | name    | default | description                                                         |
  | --------- | ------ | ---------------------------- |
  | target-id | "none"     | 待检测的目标 peer id 值|
- **Success Responses**:

  | result    |  description         |
  | --------- | ----------- |
  | result | 待检测的目标的网络连接情况|
  | result.id | 待检测的目标的 peer id 值|
  | result.out-latency | 本节点到目标节点的去向延迟，单位ms|
  | result.in-latency | 目标节点到本节点的进向延迟，单位ms|
- **Fail Responses**:
  none
- **Example**:
  ```bash
  # Command
  > ppio net ping 080a6fdb95cee6f852cb4b061525c866cbbe2c0a

  # Request
  > curl --data '{"jsonrpc":"2.0","method":"NetPing","params":["080a6fdb95cee6f852cb4b061525c866cbbe2c0a"],"id":3}' http://127.0.0.1:18060

  # Result
  {
    "id":3,
    "jsonrpc": "2.0",
    "result": {
      "id": "080a6fdb95cee6f852cb4b061525c866cbbe2c0a"
      "out-latency": 20
      "in-latency": 20
    }
  }
  ```

### NetPeers
- **Description**:
  Display the list of currently connected peer information
- **params**:
  none
- **Success Responses**:

  | result    |  description         |
  | --------- | ----------- |
  | result | 所有已连接节点的网络连接情况|
  | result[i].id | 第 i 个已链接节点的 id 值|
  | result[i].out-latency | 本节点到第 i 个已链接节点的去向延迟，单位ms|
  | result[i].in-latency | 第 i 个已链接节点到本节点的进向延迟，单位ms|
- **Fail Responses**:
  none
- **Example**:
  ```bash
  # Command
  > ppio net peers

  # Request
  > curl --data '{"jsonrpc":"2.0","method":"NetPeers","params":["080a6fdb95cee6f852cb4b061525c866cbbe2c0a"],"id":3}' http://127.0.0.1:18060

  # Result
  {
    "id":3,
    "jsonrpc": "2.0",
    "result": [
      {
        "id": "080a6fdb95cee6f852cb4b061525c866cbbe2c0a"
        "out-latency": 20
        "in-latency": 20
      },
      {
        "id": "080a6fdb95cee6f852cb4b061525c866cbbe2c0b"
        "out-latency": 20
        "in-latency": 20
      }
    ]
  }
  ```

### NetServers
- **Description**:
  Display the list of currently connected server information.
- **params**:
  none
- **Success Responses**:

  | result    |  description         |
  | --------- | ----------- |
  | result | 所有已连接服务节点的状态|
  | result.Indexers[i]| 第 i 个Indexer节点的状态|
  | result.Verifiers[i]| 第 i 个Verifier节点的状态|
- **Fail Responses**:
  none
- **Example**:
  ```bash
  # 返回的记录格式
  # <index> [indexer | verifier] <ip>:<tcpport>:<udpport>

  # Request
  > curl --data '{"jsonrpc":"2.0","method":"NetServers","params":[],"id":3}' http://127.0.0.1:18060

  # Result
  {
      "id":3,
      "jsonrpc":"2.0",
      "result":{
          "Indexers":[
          {
              "Name":"indexer",
              "PeerID":"00250802122102ec8e7f2675863c26ba5f61c7b7972bd3a5c4a8276566de829390a6faf83470fc",
              "Address":
              {
                  "IP":"127.0.0.1",
                  "UDPPort":8030,
                  "TCPPort":8030
              }
          }
          ],
          "Verifiers":[
          {
          "Name":"verifier",
          "PeerID":"00250802122103974c318dc943780b89f526d2c91199c1f5847687250720cee1a7ae3086c7052e",
              "Address":
              {
                  "IP":"127.0.0.1",
                  "UDPPort":8040,
                  "TCPPort":8040
              }
          }
          ]
      }
  }
  ```

## ppio object
- **Description**:
  Manage the Object of the PPIO user node
- **Subcommand**:

  | subcommand | description    |
  | --------------------| --------------------------------|
  | [`ObjectImport`](#objectimport)       | Import a file from a local file system or pipe into storage|
  | [`ObjectExport`](#objectexport)       | Export an Object from the local storage to the local file system|
  | [`ObjectPut`](#objectput)             | Publish a contract to upload an Object |
  | [`ObjectGet`](#objectget)             | Download all the contents of an Object to the local storage |
  | [`ObjectCopy`](#objectcopy)           | Initiate a copy contract of Object and copy an Object to yourself  |
  | [`ObjectStatus`](#objectstatus)       | 	Obtain the contract information and execution status of an Object, which can only be used to view the user's own Object. |
  | [`ObjectList`](#objectlist)           | Get contract execution for all Objects |
  | [`ObjectDelete`](#objectdelete)       | Delete the contract for an Object |
  | [`ObjectRenew`](#objectrenew)         | Republish the contract for an Object |
  | [`ObjectUpdateacl`](#objectupdateacl) | Update ACL information for an Object |
  | [`ObjectAuth`](#objectauth)           | Authorize Objects in local storage to other users |

### ObjectImport
- **Description**:
  Import a file from the local file system or pipeline, process the file and store it in the local storage space. The file that is finally stored in the local storage space is called "Object".  

  **Detailed process of file processing:**
  1. Encrypt the file first
  2. The encrypted file is sliced to cut it into multiple files (called Segment), and the file name of the Segment is the Hash value of its content.
  3. After splicing the Hash values of all Segment contents, Hash the spliced content to generate the Hash value of the Object.

  **The location of the Segment in the local storage space is as follows:**
  ```bash
  <datadir>/storage/<object-hash>/<object-hash>.desc
  <datadir>/storage/<object-hash>/<segment1-id>.dat
  <datadir>/storage/<object-hash>/<segment2-id>.dat

  # <object-hash> = HASH(<segment1-hash><segment2-hash>)
  # the content of "<object-hash>.desc":
  # <object-hash> <object-hash>   <segment-count>  <object-length>
  # <segment1-id> <segment1-hash> <segment1-index> <segment1-length>
  # <segment1-id> <segment2-hash> <segment2-index> <segment2-length>
  ```  
  After the file is successfully imported, you can view the object information through the `ppio storage object` or `ppio storage objects` command.
- **params**:

  | name    | default | description                                                         |
  | --------- | ------ | ---------------------------- |
  | local-path | "none"     | 导入文件的本地路径|
  | encrypt | "AES"  | 设置用于加密原始文件内容的加密算法，当前可选择的加密算法有：AES |
  | key     | ""     | 指定用于加密原始文件内容的密钥                                  |
- **Success Responses**:

  | result    |  description         |
  | --------- | ----------- |
  | result | object-hash，以十六进制表示 |
- **Fail Responses**:

  | result    |  error code         |  error message |
  | --------- | ----------- |----------- |
  | error | -1 |"no such file or directory" |
- **Example**:
  ```
  # Command
  > ppio object import --rpchost=127.0.0.1 --rpcport=18060 --encrypt=AES --key=123 /home/u/ppio.txt

  # Request
  > curl --data '{"id":1,"jsonrpc":"2.0","method":"ObjectImport","params":["/home/u/ppio.txt","AES","123"]}' http://127.0.0.1:18060

  # Result succeed
  '{"id":1,"jsonrpc":"2.0","result":"bc07088e505d35f10e51a1a782db06ebdfd057cfba984761c57b9307e0449810"}'

  # Result failed
  {"error":{"code":-1,"message":"open /home/u/ppio.txt: no such file or directory"},"id":1,"jsonrpc":"2.0"}
  ```

### ObjectExport
- **Description**:
  Export an Object from the local storage to the local file system
  **Detailed process:**  
  1. If there is no specified Object in the local storage space, the download to the space is requested from the PPIO network first;
  2. Once the Object is ready, splicing, decrypting the Segments in the Object, and then saving the resulting file to the local file system
- **params**:

  | name    | default | description                                                         |
  | --------- | ------ | ---------------------------- |
  | object-hash | "none"     | 导出文件的 hash |
  | encrypt | "AES"  | 设置用于加密原始文件内容的加密算法，当前可选择的加密算法有：AES |
  | key     | ""     | 指定用于加密原始文件内容的密钥                                  |
  | output  | 当前目录或文件 | 本地文件的路径，如果不指定，则以 \<object-hash\> 为文件名写入当前目录 |
- **Success Responses**:

  | result    |  description         |
  | --------- | ----------- |
  | result | null |
- **Fail Responses**:

  | result    |  error code         |  error message |
  | --------- | ----------- |----------- |
  | error | -1 |"output can not open" |
- **Example**:
  ```
  # 命令执行成功后，返回导出文件的所在路径；否则返回error code及错误原因
  > pwd
  /home/u/

  # Command
  > ppio object export --output=/home/u/ppio.txt 7547DF322CBAF84FD02248133BF5A1C2FAE7296960ECED0EF6BDE2FF3EF37CF8

  # Request
  > curl --data '{"id":1,"jsonrpc":"2.0","method":"ObjectExport","params":["7547DF322CBAF84FD02248133BF5A1C2FAE7296960ECED0EF6BDE2FF3EF37CF8","","","/home/u/ppio.txt"]}' http://127.0.0.1:18060

  # Result succeed
  {"id":1,"jsonrpc":"2.0","result":null}

  # Result failed
  {"error":{"code":-1,"message":"output can not open"},"id":1,"jsonrpc":"2.0"}

  ```

### ObjectPut
- **Description**:
  Publish a contract to upload an Object用于上传 Object 的合约
- **params**:

  | name    | default | description                                                         |
  | --------- | ------ | ---------------------------- |
  | object-hash | "none"     | 目标 Object 的 Hash |
  | copies   | 5                | 存储的副本个数，至少为 5 个                                  |
  | duration | 8640000，即100天 | Object 的存放时间，以 s（秒）为单位                          |
  | gasprice | none               | Gas 单价，以 wei 为单位                                      |
  | acl      | public           | Object 的访问权限：设置为 public 代表该 Object 可以被任何人访问；设置为 private 代表该 Object 是私密的，需要被授权才能访问 |
- **Success Responses**:

  | result    |  description         |
  | --------- | ----------- |
  | result | null |
- **Fail Responses**:

  | result    |  error code         |  error message |
  | --------- | ----------- |----------- |
  | error | -1 |"invalid buffer size" |
  | error | 2017 |"contract has already exsited" |
- **Example**:
  ```
  # 合约发布成功，不代表 Indexer 一定会调度或 Object 已上传成功，可以通过 `ppio object status` 命令来查询该 Object 是否被成功上传

  > ppio object put --copies=5 --duration=864000 --gasprice=100 --acl=public 7547DF322CBAF84FD02248133BF5A1C2FAE7296960ECED0EF6BDE2FF3EF37CF8

  # Request
  > curl --data '{"id":1,"jsonrpc":"2.0","method":"ObjectPut","params":["7547DF322CBAF84FD02248133BF5A1C2FAE7296960ECED0EF6BDE2FF3EF37CF8",5,864000,100,"public"]}' http://127.0.0.1:18060

  # Result succeed
  {"id":1,"jsonrpc":"2.0","result":null}

  # Result failed
  {"error":{"code":-1,"message":"invalid buffer size"},"id":1,"jsonrpc":"2.0"}
  {"error":{"code":2017,"message":"contract has already exsited"},"id":1,"jsonrpc":"2.0"}
  ```

### ObjectGet
- **Description**:
  Download the contents of an Object to your local storage. When Object is owned by someone else, there are two situations:
  - If the ACL of the Object is set to public, you can download the Object directly via `ppio object get`
  - If the ACL of the Object is set to private, you must first have the signature authorization for the Object (via the `ppio object auth` command), and the user can download the object via `ppio object get` during the validity period of the signature.
- **params**:

  | name    | default | description                                                         |
  | --------- | ------ | ---------------------------- |
  | object-hash | none     | 目标 Object 的 Hash |
  | gasprice | none     | Gas 单价，以 wei 为单位当 Object 为其他人所拥有时，需要设置该字段 |
  | owner    | none     | 当 Object 为其他人所拥有时，该字段表示其他人的 user-id       |
  | access-duration   | none     | Object的拥有者授权别人多长时间之内可以访问某个Object |
  | access-signature  | none     | Object的拥有者授权别人多长时间之内可以访问某个Object时的签名 |
  | auth     | none              | Object的拥有者授权别人多长时间之内可以访问某个Object时的签名+签名内容 |
- **Success Responses**:

  | result    |  description         |
  | --------- | ----------- |
  | result | null |
- **Fail Responses**:

  | result    |  error code         |  error message |
  | --------- | ----------- |----------- |
  | error | 2003 |"failed to schedule task" |
- **Example**:
  ```
  # 用户 002508021221033fb36e1471d2153d0759e14386c6c294b1ad09244841ee8d043eadd1bfe7baaa 下载自己的或者是Public的Object

  > ppio object get --rpcport=18060 --gasprice=100 --owner=002508021221033fb36e1471d2153d0759e14386c6c294b1ad09244841ee8d043eadd1bfe7baaa 7547DF322CBAF84FD02248133BF5A1C2FAE7296960ECED0EF6BDE2FF3EF37CF8

  # Request
  > curl --data '{"id":1,"jsonrpc":"2.0","method":"ObjectGet","params":["7547DF322CBAF84FD02248133BF5A1C2FAE7296960ECED0EF6BDE2FF3EF37CF8",100,"002508021221033fb36e1471d2153d0759e14386c6c294b1ad09244841ee8d043eadd1bfe7baaa",86400,""]}' http://127.0.0.1:18060

  # Result
  {"id":1,"jsonrpc":"2.0","result":null}

  ```

  ```
  # 用户002508021221033fb36e1471d2153d0759e14386c6c294b1ad09244841ee8d043eadd1bfe7baaa给用户002508021221024d8a69222ab1b305aa6abd5615058ed0e7e9f4da04e190284bbfb5fae968b348授权

  # Command
  > ppio object auth --rpcport=18060 --accessor=002508021221024d8a69222ab1b305aa6abd5615058ed0e7e9f4da04e190284bbfb5fae968b348 --duration=86400 7547DF322CBAF84FD02248133BF5A1C2FAE72969
  60ECED0EF6BDE2FF3EF37CF8

  # Request
  > curl --data '{"jsonrpc":"2.0","method":"ObjectAuth","params":{"accessor":"002508021221024d8a69222ab1b305aa6abd5615058ed0e7e9f4da04e190284bbfb5fae968b348", "duration":"86400", "object-hash":"7547DF322CBAF84FD02248133BF5A1C2FAE7296960ECED0EF6BDE2FF3EF37CF8"},"id":3}' http://127.0.0.1:18060

  # Result
  {"id":1,"jsonrpc":"2.0","result":"4ef8d76685cf81675d5356e16f30b5c5f7ae63a3665a665dd3cf225ab7b4aa7372012029203d3aca5f3317bf4297be1507d171930726ede7e864a9b8a4d6c5b9007547df322cbaf84fd02248133bf5a1c2fae7296960eced0ef6bde2ff3ef37cf827000000002508021221033fb36e1471d2153d0759e14386c6c294b1ad09244841ee8d043eadd1bfe7baaa27000000002508021221024d8a69222ab1b305aa6abd5615058ed0e7e9f4da04e190284bbfb5fae968b348de93c05b00000000"}

  # 用户002508021221024d8a69222ab1b305aa6abd5615058ed0e7e9f4da04e190284bbfb5fae968b348通过授权下载文件

  # Command
  > ppio object get --gasprice=100 --rpcport=18061 --owner=002508021221033fb36e1471d2153d0759e14386c6c294b1ad09244841ee8d043eadd1bfe7baaa --auth=4ef8d76685cf81675d5356e16f30b5c5f7ae63a3665a665dd3cf225ab7b4aa7372012029203d3aca5f3317bf4297be1507d171930726ede7e864a9b8a4d6c5b9007547df322cbaf84fd02248133bf5a1c2fae7296960eced0ef6bde2ff3ef37cf827000000002508021221033fb36e1471d2153d0759e14386c6c294b1ad09244841ee8d043eadd1bfe7baaa27000000002508021221024d8a69222ab1b305aa6abd5615058ed0e7e9f4da04e190284bbfb5fae968b348de93c05b00000000 7547DF322CBAF84FD02248133BF5A1C2FAE7296960ECED0EF6BDE2FF3EF37CF8

  # Request
  > curl --data '{"id":1,"jsonrpc":"2.0","method":"ObjectGet","params":["7547DF322CBAF84FD02248133BF5A1C2FAE7296960ECED0EF6BDE2FF3EF37CF8",100,"002508021221033fb36e1471d2153d0759e14386c6c294b1ad09244841ee8d043eadd1bfe7baaa",86400,"",""]}' http://127.0.0.1:18060

  # Result
  {"id":1,"jsonrpc":"2.0","result":null}
  ```

### ObjectCopy
- **Description**:
  Initiate a copy contract of Object to copy an Object to your own
- **params**:

  | name    | default | description                                                         |
  | --------- | ------ | ---------------------------- |
  | object-hash | none     | 待拷贝的 Object 的 Hash 值 |
  | copies   | 5                | 存储的副本个数，至少为 5 个                                  |
  | duration | 100天，即8640000 | Object 的存放时间，以 s（秒）为单位                          |
  | gasprice | none               | Gas 单价，以 wei 为单位                                      |
  | acl      | public           | Object 的访问权限，设置为 public 代表该 Object 可以被任何人访问；设置为 private 代表该 Object 是私密的，需要被授权才能访问 |
  | auth     | none               | 拷贝其他人的 Object 时所需，需要其他人提供的 Object 签名用以授权 |
  | owner    | none               | 文件拥有者的id      |
- **Success Responses**:

  | result    |  description         |
  | --------- | ----------- |
  | result | null |
- **Fail Responses**:

  | result    |  error code         |  error message |
  | --------- | ----------- |----------- |
  | error | -1 |"failed to schedule copy-object" |
- **Example**:
  ```
  # 合约 Copy 成功后则直接返回成功标识，不代表 Indexer 一定会调度或 Object 已拷贝成功，可以通过 `object status` 命令来查询该 Object 是否被成功拷贝

  # Command
  > ppio object copy --rpcport=18060 --copies=5 --duration=86400 --gasprice=100 --acl=public --auth=4ef8d76685cf81675d5356e16f30b5c5f7ae63a3665a665dd3cf225ab7b4aa7372012029203d3aca5f3317bf4297be1507d171930726ede7e864a9b8a4d6c5b9007547df322cbaf84fd02248133bf5a1c2fae7296960eced0ef6bde2ff3ef37cf827000000002508021221033fb36e1471d2153d0759e14386c6c294b1ad09244841ee8d043eadd1bfe7baaa27000000002508021221024d8a69222ab1b305aa6abd5615058ed0e7e9f4da04e190284bbfb5fae968b348de93c05b00000000 --owner=002508021221033fb36e1471d2153d0759e14386c6c294b1ad09244841ee8d043eadd1bfe7baaa 7547DF322CBAF84FD02248133BF5A1C2FAE7296960ECED0EF6BDE2FF3EF37CF8

  # Request
  > curl --data '{"id":1,"jsonrpc":"2.0","method":"ObjectCopy","params":["7547DF322CBAF84FD02248133BF5A1C2FAE7296960ECED0EF6BDE2FF3EF37CF8",5,86400,100,"public","4ef8d76685cf81675d5356e16f30b5c5f7ae63a3665a665dd3cf225ab7b4aa7372012029203d3aca5f3317bf4297be1507d171930726ede7e864a9b8a4d6c5b9007547df322cbaf84fd02248133bf5a1c2fae7296960eced0ef6bde2ff3ef37cf827000000002508021221033fb36e1471d2153d0759e14386c6c294b1ad09244841ee8d043eadd1bfe7baaa27000000002508021221024d8a69222ab1b305aa6abd5615058ed0e7e9f4da04e190284bbfb5fae968b348de93c05b00000000","002508021221033fb36e1471d2153d0759e14386c6c294b1ad09244841ee8d043eadd1bfe7baaa"]}' http://127.0.0.1:18060

  # Result Succeed
  {"id":1,"jsonrpc":"2.0","result":null}

  # Result Failed
  {"error":{"code":-1,"message":"failed to schedule copy-object"},"id":1,"jsonrpc":"2.0"}
  ```

### ObjectStatus
- **Description**:
  Get the contract information and execution status of an Object, which can only be used to view your own Object.
- **params**:

  | name    | default | description                            |
  | --------- | ------ | ---------------------------- |
  | object-hash | none     | 待查询的 Object 的 Hash 值 |
- **Success Responses**:

  | result    |  description         |
  | --------- | ----------- |
  | result | Object的状态信息 |
- **Fail Responses**:

  | result    |  error code         |  error message |
  | --------- | ----------- |----------- |
  | error | -1 |"invalid buffer size" |
- **Example**:
  ```
  # 命令执行成功，返回示例：

  # Command
  > ppio object status --rpcport=18060  7547DF322CBAF84FD02248133BF5A1C2FAE7296960ECED0EF6BDE2FF3EF37CF8

  # Request
  > curl --data '{"id":1,"jsonrpc":"2.0","method":"ObjectStatus","params":[["7547DF322CBAF84FD02248133BF5A1C2FAE7296960ECED0EF6BDE2FF3EF37CF8"],null]}' http://127.0.0.1:18060

  # Result succeed
  {
    "id":3,
    "jsonrpc": "2.0",
    "result": {
        "Object Hash": "7547DF322CBAF84FD02248133BF5A1C2FAE7296960ECED0EF6BDE2FF3EF37CF8",
  "Storage Contracts":
  [
    {
      "ObjectHash": "7547DF322CBAF84FD02248133BF5A1C2FAE7296960ECED0EF6BDE2FF3EF37CF8",
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
                "SegmentHash": "7547DF322CBAF84FD02248133BF5A1C2FAE7296960ECED0EF6BDE2FF3EF37CF8",
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

  # Result failed
  {"error":{"code":-1,"message":"invalid buffer size"},"id":1,"jsonrpc":"2.0"}
  ```

### ObjectList
- **Description**:
  Paginate all Objects. Unlike ppio object status, ppio object list is just a list of Objects, and there is no information about the execution of the corresponding contract.
- **params**:
  none
- **Success Responses**:

  | result    |  description         |
  | --------- | ----------- |
  | result | 多个Object的状态信息 |
- **Fail Responses**:

  | result    |  error code         |  error message |
  | --------- | ----------- |----------- |
  | error | -1 |"invalid buffer size" |
- **Example**:
  ```
  # Command

  > ./ppio object list --rpcport=18060


  # Request
  > curl --data '{"id":1,"jsonrpc":"2.0","method":"ObjectList","params":[]}' http://127.0.0.1:18060

  # Result
  {
    "id":3,
    "jsonrpc": "2.0",
    // TODO format
    "result":
  [
    {
      "ObjectBasicInfo": {
        "ObjectHash": "7547df322cbaf84fd02248133bf5a1c2fae7296960eced0ef6bde2ff3ef37cf8",
        "ObjectType": "file",
        "ObjectAclType": "Public"
      },
      "SegmentInfos": [
        {
          "BasicInfo": {
            "SegmentHash": "7547df322cbaf84fd02248133bf5a1c2fae7296960eced0ef6bde2ff3ef37cf8",
            "SegmentId": "6ad3e2278e1251c1a1ebf3f842dcff2caf21d24b94148a8649896f915e574c1e",
            "SegmentLength": 87041
          }
        }
      ]
    },
    {
      "ObjectBasicInfo": {
        "ObjectHash": "0f32bbbb22778b52eed14e0c295dbb442e8dc6666ff6f04c21e00f8e16e1f918",
        "ObjectType": "file",
        "ObjectAclType": "Public"
      },
      "SegmentInfos": [
        {
          "BasicInfo": {
            "SegmentHash": "0f32bbbb22778b52eed14e0c295dbb442e8dc6666ff6f04c21e00f8e16e1f918",
            "SegmentId": "786445aba3770037357ff4f2c48cfdf46f1a5e15af7061a704c6fec83593685f",
            "SegmentLength": 45056
          }
        }
      ]
    }
  ]
  }
  ```

### ObjectDelete
- **Description**:
  Delete the contract of an Object
- **params**:

  | name    | default | description                            |
  | --------- | ------ | ---------------------------- |
  | object-hash | none     | 待查询的 Object 的 Hash 值 |
- **Success Responses**:

  | result    |  description         |
  | --------- | ----------- |
  | result | null |
- **Fail Responses**:

  | result    |  error code         |  error message |
  | --------- | ----------- |----------- |
  | error | -1 |"invalid buffer size" |
- **Example**:
  ```
  # 删除合约成功后会返回成功标识，否则返回错误标识和原因
  > ppio object delete --rpcport=18060 0F32BBBB22778B52EED14E0C295DBB
  442E8DC6666FF6F04C21E00F8E16E1F918

  # Request
  > curl --data '{"id":1,"jsonrpc":"2.0","method":"ObjectDelete","params":["0F32BBBB22778B52EED14E0C295DBB442E8DC6666FF6F04C21E00F8E16E1F918"]}' http://127.0.0.1:18060

  # Result
  {"id":1,"jsonrpc":"2.0","result":null}
  ```

### ObjectRenew
- **Description**:
  Republish the contract for an Object

- **params**:

  | name    | default | description                            |
  | --------- | ------ | ---------------------------- |
  | object-hash | none     | 待重新发布合约的 Object 的 Hash 值 |
  | copies   | 5                | 存储副本的个数，不小于 5                                     |
  | duration | 100天，即8640000 | Object 的存放时间，以 s（秒）为单位                          |
  | gasprice | none               | Gas 单价，以 wei 为单位                                      |
  | acl      | public           | Object 的访问权限，设置为 public 代表该 Object 可以被任何人访问；设置为 private 代表该 Object 是私密的，需要被授权才能访问 |

- **Success Responses**:

  | result    |  description         |
  | --------- | ----------- |
  | result | null |

- **Fail Responses**:

  | result    |  error code         |  error message |
  | --------- | ----------- |----------- |
  | error | -1 |"invalid buffer size" |
  | error | 2009 |"no need to renew object" |

- **Example**:

  ```
  # 发布合约成功会返回成功标识，否则会返回失败标识及原因另外，发布合约成功，并不代表 Indexer 一定会调度

  # Command
  > ppio object renew --rpcport=18060 --duration=864000 --gasprice=100 --copies=5 --acl=public 7547DF322CBAF84FD02248133BF5A1C2FAE7296960ECED0EF6BDE2FF3EF37CF8

  # Request
  > curl --data '{"id":1,"jsonrpc":"2.0","method":"ObjectRenew","params":["7547DF322CBAF84FD02248133BF5A1C2FAE7296960ECED0EF6BDE2FF3EF37CF8",5,864000,100,"public"]}'
  http://127.0.0.1:18060

  # Result succeed
  {"id":1,"jsonrpc":"2.0","result":null}

  # Result failed
  {"error":{"code":2009,"message":"no need to renew object"},"id":1,"jsonrpc":"2.0"}

  ```


### ObjectUpdateacl

- **Description**:

  ```
  更新某个 Object 的 ACL 信息
  ```

- **params**:

  | name    | default | description                            |
  | --------- | ------ | ---------------------------- |
  | object-hash | none     | 待重新发布合约的 Object 的 Hash 值 |                                 |
  | acl      | public           | Object 的访问权限，设置为 public 代表该 Object 可以被任何人访问；设置为 private 代表该 Object 是私密的，需要被授权才能访问 |

- **Success Responses**:

  | result    |  description         |
  | --------- | ----------- |
  | result | null |

- **Fail Responses**:

  | result    |  error code         |  error message |
  | --------- | ----------- |----------- |
  | error | -1 |"invalid buffer size" |

- **Example**:

  ```
  # 更新成功会返回成功标识，否则返回失败标识及原因

  # Command
  > ppio object updateacl --acl=private --rpcport=18060 7547DF322CBAF
  84FD02248133BF5A1C2FAE7296960ECED0EF6BDE2FF3EF37CF8

  # Request
  > curl --data '{"id":1,"jsonrpc":"2.0","method":"ObjectUpdateAcl","params":["7547DF322CBAF84FD02248133BF5A1C2FAE7296960ECED0EF6BDE2FF3EF37CF8","private"]}' http://127.0.0.1:18060

  # Result succeed
  {"id":1,"jsonrpc":"2.0","result":null}
  ```


### ObjectAuth

- **Description**:

  ```
  将本地存储空间里面的 Object 授权给其他用户，如果该 Object 的 ACL 为 public，则该命令执行none实际效果。
  授权时长不能超过该用户拥有该文件的剩余时长。
  ```

- **params**:

  | name    | default | description                            |
  | --------- | ------ | ---------------------------- |
  | object-hash | none     | 待授权的 Object 的 Hash 值  |
  | accessor | none           | 被授权用户的id           |
  | duration | 1天，即86400 | 授权有效持续时间，单位为 s（秒） |

- **Success Responses**:

  | result    |  description         |
  | --------- | ----------- |
  | result | null |

- **Fail Responses**:

  | result    |  error code         |  error message |
  | --------- | ----------- |----------- |
  | error | -1 |"invalid buffer size" |

- **Example**:

  ```
  # 授权成功，则返回授权的签名信息，用于被授权用户来获取 Object，否则返回错误标识和信息
  # 用户002508021221033fb36e1471d2153d0759e14386c6c294b1ad09244841ee8d043eadd1bfe7baaa给用户002508021221024d8a69222ab1b305aa6abd5615058ed0e7e9f4da04e190284bbfb5fae968b348授权

  # Command
  > ppio object auth --rpcport=18060 --accessor=002508021221024d8a69222ab1b305aa6abd5615058ed0e7e9f4da04e190284bbfb5fae968b348 --duration=86400 7547DF322CBAF84FD02248133BF5A1C2FAE72969
  60ECED0EF6BDE2FF3EF37CF8

  # Request
  > curl --data '{"jsonrpc":"2.0","method":"ObjectAuth","params":["7547DF322CBAF84FD02248133BF5A1C2FAE7296960ECED0EF6BDE2FF3EF37CF8","002508021221024d8a69222ab1b305aa6abd5615058ed0e7e9f4da04e190284bbfb5fae968b348", 864000]}' http://127.0.0.1:18060

  # Result
  {"id":1,"jsonrpc":"2.0","result":"4ef8d76685cf81675d5356e16f30b5c5f7ae63a3665a665dd3cf225ab7b4aa7372012029203d3aca5f3317bf4297be1507d171930726ede7e864a9b8a4d6c5b9007547df322cbaf84fd02248133bf5a1c2fae7296960eced0ef6bde2ff3ef37cf827000000002508021221033fb36e1471d2153d0759e14386c6c294b1ad09244841ee8d043eadd1bfe7baaa27000000002508021221024d8a69222ab1b305aa6abd5615058ed0e7e9f4da04e190284bbfb5fae968b348de93c05b00000000"}
  ```


  ### ppio status

- **Description**:

  ```
  显示当前 ppio 节点运行时的详细信息
  ```

- **params**:
  none

- **Success Responses**:

  | result    |  description         |
  | --------- | ----------- |
  | protocol-version | 当前节点的网络Id，以字符串表示|
  | version | 当前节点的网络Id，以字符串表示|
  | id | 当前节点的网络Id，以十六进制字符串表示|
  | rpchost | 当前节点的网络IP地址，以4段整数表示|
  | rpcport | 当前节点的网络端口，以整数表示|

- **Fail Responses**:
  none


- **Example**:

  ```
  # Command
  > ppio status --rpcport=18060

  # Request
  > curl --data '{"jsonrpc":"2.0","method":"ppio_status","params":[],"id":3}'

  # Result
  {
    "id":3,
    "jsonrpc": "2.0",
    "result": {
        "protocol-version": "v0.0.1",
        "version": "v0.1.0",
        "id": "002508021221033fb36e1471d2153d0759e14386c6c294b1ad09244841ee8d043eadd1bfe7baaa",
        "rpchost": "127.0.0.1",
        "rpcport": "18060"
    }
  }
  ```


  ### ppio storage

- **Description**:
  ```
  管理本地存储空间
  ```

- **Subcommand**:

  | subcommand                                            | description                                    |
  | ------------------------------------------------- | --------------------------------------- |
  | [`StorageObject`](#storageobject)     | 显示当前节点指定object的信息            |
  | [`StorageObjects`](#storageobjects)   | 显示当前节点所有objects的信息           |
  | [`StorageSegments`](#storagesegments) | 显示当前节点所有segments的信息          |
  | [`StorageKeep`](#storagekeep)         | 将 Object 保持在本地存储空间中          |
  | [`StorageUsage`](#storageusage)       | 查看本地存储空间的使用情况              |
  | [`StorageGc`](#storagegc)             | 清理掉本地存储空间中没有被保持的 Object |


### StorageObject

- **Description**:

  ```
  显示当前节点指定object的信息
  ```

- **params**:

  | name    | default | description                                                         |
  | --------- | ------ | ---------------------------- |
  | object-hash | "none"     | 指定object的 hash 值|

- **Success Responses**:

  | result    |  description         |
  | --------- | ----------- |
  | result | 当前节点指定object的信息|
  | result.Hash | 当前节点指定object的hash|
  | result.Length | 当前节点指定object的字节数|
  | result.Segments | 当前节点对应于指定object的segment|
  | result.Segments.Id | 相应segment的ID|
  | result.Segments.Hash| 相应segment的hash|
  | result.Segments.Length | 相应segment的字节数|

- **Fail Responses**:

  | result    |  description         |
  | --------- | ----------- |
  | error | 错误信息|
  | error.code | error code|
  | error.message | 详细错误信息|

- **Example**:

  ```
  # 显示当前节点指定object的信息，包括其大小，segment的个数，以及各个segment的id和hash值

  # Command
  > ppio storage object --rpcport=18060 D2837E475978764B0A14034306C9B79A5D325040A57793CBEBAE69257AC250CE

  # Request
  > curl --data '{"id":1,"jsonrpc":"2.0","method":"StorageObject","params":["D2837E475978764B0A14034306C9B79A5D325040A57793CBEBAE69257AC250CE"]}'  http://127.0.0.1:18060

  # Result
  {
    "id":1,
    "jsonrpc": "2.0",
    "result":
    {
      "Hash":"d2837e475978764b0a14034306c9b79a5d325040a57793cbebae69257ac250ce",
      "Length":13,
      "Segments":
       [
        {
        "Id":"eaf86f80081b8b3096fda5964da5deba0ddece4b9eff79d4cb14c8d853d22710",
        "Hash":"d2837e475978764b0a14034306c9b79a5d325040a57793cbebae69257ac250ce",
        "Length":13
        }
      ]
    }
  }

  # Result Error
  {
    "error":{
      "code":-1,
      "message":"no such object"
      },
    "id":1,
    "jsonrpc":"2.0"
  }
  ```


### StorageObjects

- **Description**:

  ```
  显示当前节点所有objects的信息
  ```
- **params**:
  none

- **Success Responses**:

  | result    |  description         |
  | --------- | ----------- |
  | result | 当前节点所有objects的信息|
  | result.Hash | 当前节点某一object的hash|
  | result.Length | 当前节点某一object的字节数|

- **Fail Responses**:
  none
- **Example**:

  ```
  # 显示当前节点所有objects的信息，包括每个 object 的hash值和大小

  # Command
  > ppio storage objects --rpcport=18060

  # Request
  > curl --data '{"jsonrpc":"2.0","method":"StorageObjects","params":[],"id":3}' http://127.0.0.1:18060

  # Result
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
    ]
  }
  ```


### StorageSegments

- **Description**:

  ```
  显示当前节点所有segments的信息
  ```

- **params**:  none

- **Success Responses**:

  | result    |  description         |
  | --------- | ----------- |
  | result | 当前节点所有segments的信息|
  | result.Id | 当前节点某一segment的Id|
  | result.Hash | 当前节点某一segment的hash|
  | result.Length | 当前节点某一segment的字节数|

- **Fail Responses**:
  none

- **Example**:

  ```
  # 显示当前节点所有segments的信息，包括每个segment的id，hash，和大小

  # Command
  > ppio storage segments --rpcport=18060

  # Request
  > curl --data '{"jsonrpc":"2.0","method":"StorageSegments","params":[],"id":3}' http://127.0.0.1:18060

  # Result
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

    ]
  }
  ```


### StorageKeep

- **Description**:

  ```
  将某个 Object 保持在本地存储空间中
  ```

- **params**:

  | name    | default | description                                                         |
  | --------- | ------ | ---------------------------- |
  | object-hash | "none"     | 待设置的 Object 的 Hash 值|


- **Success Responses**:

  | result    |  description         |
  | --------- | ----------- |
  | result | 成功或失败标识|


- **Fail Responses**:

  | result    |  description         |
  | --------- | ----------- |
  | result | 成功或失败标识|

- **Example**:

  ```
  # Command
  > ppio storage keep 7547DF322CBAF84FD02248133BF5A1C2FAE7296960ECED0EF6BDE2FF3EF37CF8

  # Request
  > curl --data '{"jsonrpc":"2.0","method":"StorageKeep","params":[7547DF322CBAF84FD02248133BF5A1C2FAE7296960ECED0EF6BDE2FF3EF37CF8],"id":3}' http://127.0.0.1:18060

  # Result
  {
    "id":3,
    "jsonrpc": "2.0",
    "result": "Succeed!"
  }
  ```


### StorageUsage

- **Description**:

  ```
  查看本地存储空间的使用情况
  ```

- **params**:
  none

- **Success Responses**:

  | result    |  description         |
  | --------- | ----------- |
  | result | 本地存储空间的使用情况|
  | result.UsageRate | 使用率|
  | result.Total | 总量|
  | result.Used | 已使用|
  | result.KetpTotal | kept objects总量|
  | result.KeptCount| kept objects数量|

- **Fail Responses**:
  none


- **Example**:

  ```
  # Command
  > ppio storage usage --rpcport=18060

  # Request
  > curl --data '{"jsonrpc":"2.0","method":"StorageUsage","params":[],"id":3}' http://127.0.0.1:18060

  # Result
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


### StorageGc

- **Description**:

  ```
  清理掉本地存储空间中没有被保持的 Object
  ```

- **params**:  none


- **Success Responses**:

  | result    |  description         |
  | --------- | ----------- |
  | result | 成功或失败标识|


- **Fail Responses**:

  | result    |  description         |
  | --------- | ----------- |
  | result | 成功或失败标识|


- **Example**:

  ```
  # Command
  > ppio storage gc --rpcport=18060

  # Request
  > curl --data '{"jsonrpc":"2.0","method":"StorageGc","params":[],"id":3}' http://127.0.0.1:18060

  # Result
  {
    "id":3,
    "jsonrpc": "2.0",
    "result": "Succeed!"
  }
  ```


  ### ppio wallet

- **Description**:
  ```
  管理用户的钱包
  ```

- **Subcommand**:

  | subcommand                                        | description                             |
  | --------------------------------------------- | -------------------------------- |
  | [`WalletAddress`](#walletaddress) | 显示当前钱包地址，十六进制字符串 |
  | [`WalletBalance`](#walletbalance) | 显示当前钱包地址的余额           |


### WalletAddress

- **Description**:

  ```
  显示当前钱包地址
  ```

- **params**:  none

- **Success Responses**:

  | result    |  description         |
  | --------- | ----------- |
  | result | 当前钱包地址|


- **Fail Responses**:
  none

- **Example**:

  ```
  # 返回当前钱包地址

  # Command
  > ppio wallet id --rpcport=18060

  # Request
  > curl --data '{"id":1,"jsonrpc":"2.0","method":"NetID","params":[]}'  http://127.0.0.1:18060

  # Result
  {
    "id":1,
    "jsonrpc": "2.0",
    "result": "002508021221033fb36e1471d2153d0759e14386c6c294b1ad09244841ee8d043eadd1bfe7baaa"
  }
  ```


### WalletBalance

- **Description**:

  ```
  显示当前钱包地址的余额
  ```

- **params**:  
  none

- **Success Responses**:

  | result    |  description         |
  | --------- | ----------- |
  | result | 当前钱包地址的余额|


- **Fail Responses**:
  none

- **Example**:

  ```
  # 返回当前钱包地址的余额

  # Command
  > ppio wallet balance --rpcport=18060

  # Request
  > curl --data '{"id":1,"jsonrpc":"2.0","method":"NetID","params":[]}' http://127.0.0.1:18060
  {
    "id":1,
    "jsonrpc": "2.0",
    "result": "002508021221033fb36e1471d2153d0759e14386c6c294b1ad09244841ee8d043eadd1bfe7baaa"
  }

  > curl --data '{"id":1,"jsonrpc":"2.0","method":"BalanceOf","params":["002508021221033fb36e1471d2153d0759e14386c6c294b1ad09244841ee8d043eadd1bfe7baaa"]}'  http://127.0.0.1:18070

  # Result
  {
    "id":3,
    "jsonrpc": "2.0",
    "result": "1000000000"
  }
  ```
