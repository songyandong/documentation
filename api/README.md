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
  ```bash
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
  | --rpchost | "127.0.0.1" | RPC service address |
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
  ```bash
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
  | result | The network ID of the current node, hex string|
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

  | name    | default | description |
  | --------- | ------ | -------------- |
  | target-id | none  | Peer ID value of the |
- **Success Responses**:

  | result    |  description         |
  | --------- | ----------- |
  | result.id | Peer ID of the detected target |
  | result.out-latency | The going delay of this node to the target node, unit in milliseconds |
  | result.in-latency | The forward delay from the target node to the current node, unit in milliseconds |
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

  | result    |  description   |
  | --------- | ----------- |
  | result[i].id | The id value of the i-th connected node |
  | result[i].out-latency | The going delay of this node to the i-th connected node, unit in milliseconds|
  | result[i].in-latency | The forward delay of this node to the i-th connected node, unit in milliseconds|
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
  | result.Indexers[i]| Status of the i-th Indexer node |
  | result.Verifiers[i]|Status of the i-th Verifier node |
- **Fail Responses**:
  none
- **Example**:
  ```bash
  # return format
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
  | local-path | "none" | Local path to the import file |
  | encrypt | "AES"  | "AES"	Set the encryption algorithm used to encrypt the contents of the original file. The currently selectable encryption algorithms are: AES |
  | key     | ""     | Specify the key used to encrypt the contents of the original file |
- **Success Responses**:

  | result    |  description         |
  | --------- | ----------- |
  | result | object-hash, hex string |
- **Fail Responses**:

  | result    |  error code  |  error message |
  | --------- | ----------- |----------- |
  | error | -1 |"no such file or directory" |
- **Example**:
  ```bash
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
  | object-hash | "none"     | hash value of the file exported |
  | encrypt | "AES"  | Set the encryption algorithm used to decrypt the contents of the original file, corresponding to the encryption algorithm |
  | key     | "" | Specify the key used to decrypt the content in the Object |
  | output  | current file or directory | The path to the local file, if not specified, write the current directory with \<object-hash\> as the file name |
- **Success Responses**:

  | result    |  description         |
  | --------- | ----------- |
  | result | null |
- **Fail Responses**:

  | result    |  error code         |  error message |
  | --------- | ----------- |----------- |
  | error | -1 |"output can not open" |
- **Example**:
  ```bash
  # If the command is successfully executed, the path of the exported file is returned; otherwise, the error code and the cause of the error are returned.
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
  Publish a contract to upload an Object
- **params**:

  | name    | default | description |
  | --------- | ------ | ---------------------------- |
  | object-hash | "none" | hash value of the target object |
  | copies   | 5 | The number of copies stored, at least 5 |
  | duration | 8640000(equals 100 days) | The storage time of the object, unit in s (second) |
  | gasprice | none   | price of Gas, unit in wei |
  | acl      | public | Access to Object: Set to public to mean that the Object can be accessed by anyone; set to private to mean that the Object is private and needs to be authorized to access |
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
  ```bash
  # If the contract is successfully published, it does not mean that the Indexer node will be scheduled or the Object has been uploaded successfully. You can use the `ppio object status` command to query whether the Object is successfully uploaded.

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
  | object-hash | none     | hash value of the target |
  | gasprice | none     | price of Gas, unit in wei(This field needs to be set when the Object is owned by someone else) |
  | owner    | none     | user-id (This field needs to be set when the Object is owned by someone else)  |
  | access-duration   | none     | The owner of the Object authorizes others how long it can access an Object |
  | access-signature  | none     | The signature which the owner of the Object authorizes others how long it can access an Object |
  | auth     | none              | The signature and signature content which the owner of the Object authorizes others how long it can access an Object |
- **Success Responses**:

  | result    |  description         |
  | --------- | ----------- |
  | result | null |
- **Fail Responses**:

  | result    |  error code         |  error message |
  | --------- | ----------- |----------- |
  | error | 2003 |"failed to schedule task" |
- **Example**:
  ```bash
  # User 002508021221033fb36e1471d2153d0759e14386c6c294b1ad09244841ee8d043eadd1bfe7baaa downloads his own or public Object

  > ppio object get --rpcport=18060 --gasprice=100 --owner=002508021221033fb36e1471d2153d0759e14386c6c294b1ad09244841ee8d043eadd1bfe7baaa 7547DF322CBAF84FD02248133BF5A1C2FAE7296960ECED0EF6BDE2FF3EF37CF8

  # Request
  > curl --data '{"id":1,"jsonrpc":"2.0","method":"ObjectGet","params":["7547DF322CBAF84FD02248133BF5A1C2FAE7296960ECED0EF6BDE2FF3EF37CF8",100,"002508021221033fb36e1471d2153d0759e14386c6c294b1ad09244841ee8d043eadd1bfe7baaa",86400,""]}' http://127.0.0.1:18060

  # Result
  {"id":1,"jsonrpc":"2.0","result":null}

  ```

  ```bash
  # User 002508021221033fb36e1471d2153d0759e14386c6c294b1ad09244841ee8d043eadd1bfe7baaa authorizes user 002508021221024d8a69222ab1b305aa6abd5615058ed0e7e9f4da04e190284bbfb5fae968b348

  # Command
  > ppio object auth --rpcport=18060 --accessor=002508021221024d8a69222ab1b305aa6abd5615058ed0e7e9f4da04e190284bbfb5fae968b348 --duration=86400 7547DF322CBAF84FD02248133BF5A1C2FAE72969
  60ECED0EF6BDE2FF3EF37CF8

  # Request
  > curl --data '{"jsonrpc":"2.0","method":"ObjectAuth","params":{"accessor":"002508021221024d8a69222ab1b305aa6abd5615058ed0e7e9f4da04e190284bbfb5fae968b348", "duration":"86400", "object-hash":"7547DF322CBAF84FD02248133BF5A1C2FAE7296960ECED0EF6BDE2FF3EF37CF8"},"id":3}' http://127.0.0.1:18060

  # Result
  {"id":1,"jsonrpc":"2.0","result":"4ef8d76685cf81675d5356e16f30b5c5f7ae63a3665a665dd3cf225ab7b4aa7372012029203d3aca5f3317bf4297be1507d171930726ede7e864a9b8a4d6c5b9007547df322cbaf84fd02248133bf5a1c2fae7296960eced0ef6bde2ff3ef37cf827000000002508021221033fb36e1471d2153d0759e14386c6c294b1ad09244841ee8d043eadd1bfe7baaa27000000002508021221024d8a69222ab1b305aa6abd5615058ed0e7e9f4da04e190284bbfb5fae968b348de93c05b00000000"}

  # User 002508021221024d8a69222ab1b305aa6abd5615058ed0e7e9f4da04e190284bbfb5fae968b348 downloads files by authorization

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
  | object-hash | none     |Hash value of the object |
  | copies   | 5                | The number of copies stored, at least 5  |
  | duration | 8640000(equals 100 days) | The storage time of the Object, unit in s (second) |
  | gasprice | none               | price of Gas, unit in wei   |
  | acl      | public           | The access permission of Object, set to public means that the Object can be accessed by anyone; set to private means that the Object is private and needs to be authorized to access |
  | auth     | none               | Required to copy other people's Objects, need an Object signature provided by others to authorize |
  | owner    | none               | User ID of the Object owner  |
- **Success Responses**:

  | result    |  description         |
  | --------- | ----------- |
  | result | null |
- **Fail Responses**:

  | result    |  error code         |  error message |
  | --------- | ----------- |----------- |
  | error | -1 |"failed to schedule copy-object" |
- **Example**:
  ```bash
  # After the contract is successfully copied, it directly returns the success signal. It does not mean that the Indexer will be scheduled or the Object has been successfully copied. You can use the `ppio object status` command to query whether the Object is successfully copied.

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
  | object-hash | none     | value of the object |
- **Success Responses**:

  | result    |  description         |
  | --------- | ----------- |
  | result | status information of the object |
- **Fail Responses**:

  | result    |  error code         |  error message |
  | --------- | ----------- |----------- |
  | error | -1 |"invalid buffer size" |
- **Example**:
  ```bash
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
  | result | status info of objects|
- **Fail Responses**:

  | result    |  error code         |  error message |
  | --------- | ----------- |----------- |
  | error | -1 |"invalid buffer size" |
- **Example**:
  ```bash
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
  | object-hash | none     | hash value of the object |
- **Success Responses**:

  | result    |  description         |
  | --------- | ----------- |
  | result | null |
- **Fail Responses**:

  | result    |  error code         |  error message |
  | --------- | ----------- |----------- |
  | error | -1 |"invalid buffer size" |
- **Example**:
  ```bash
  # command
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
  | object-hash | none     | hash value of the object |
  | copies   | 5                | The number of stored copies, not less than 5  |
  | duration | 8640000(equals 100 days) | The storage time of the object, unit in s (seconds) |
  | gasprice | none               | price of Gas, unit in wei |
  | acl      | public           | The access permission of Object, set to public means that the Object can be accessed by anyone; set to private means that the Object is private and needs to be authorized to access |
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
  ```bash
  # The successful completion of the contract will return the success signal, otherwise it will return the error code and the reason. In addition, the release of the contract is successful, it does not mean that the Indexer node will be scheduled.

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
  Update ACL information for an Object
- **params**:

  | name    | default | description                            |
  | --------- | ------ | ---------------------------- |
  | object-hash | none     | Hsah value of the obejct |                                 |
  | acl      | public      | The access permission of Object, set to public means that the Object can be accessed by anyone; set to private means that the Object is private and needs to be authorized to access |
- **Success Responses**:

  | result    |  description         |
  | --------- | ----------- |
  | result | null |
- **Fail Responses**:

  | result    |  error code         |  error message |
  | --------- | ----------- |----------- |
  | error | -1 |"invalid buffer size" |
- **Example**:
  ```bash
  # The successful update will return the success signal, otherwise it will return the error code and the reason.

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
  Authorize the Object in the local storage space to other users. If the ACL of the Object is public, the command has no effect.
  The authorization duration cannot exceed the length of time the user has the file.
- **params**:

  | name    | default | description                            |
  | --------- | ------ | ---------------------------- |
  | object-hash | none     | Hash value of the object |
  | accessor | none           | Authorized user's id  |
  | duration | 86400(equals a day) | Authorized effective duration, unit in s (second) |
- **Success Responses**:

  | result    |  description         |
  | --------- | ----------- |
  | result | null |
- **Fail Responses**:

  | result    |  error code         |  error message |
  | --------- | ----------- |----------- |
  | error | -1 |"invalid buffer size" |
- **Example**:
  ```bash
  # If the authorization is successful, the authorized signature information is returned for the authorized user to obtain the Object, otherwise the error code and information are returned.

  # User 002508021221033fb36e1471d2153d0759e14386c6c294b1ad09244841ee8d043eadd1bfe7baaa authorizes user 002508021221024d8a69222ab1b305aa6abd5615058ed0e7e9f4da04e190284bbfb5fae968b348

  # Command
  > ppio object auth --rpcport=18060 --accessor=002508021221024d8a69222ab1b305aa6abd5615058ed0e7e9f4da04e190284bbfb5fae968b348 --duration=86400 7547DF322CBAF84FD02248133BF5A1C2FAE72969
  60ECED0EF6BDE2FF3EF37CF8

  # Request
  > curl --data '{"jsonrpc":"2.0","method":"ObjectAuth","params":["7547DF322CBAF84FD02248133BF5A1C2FAE7296960ECED0EF6BDE2FF3EF37CF8","002508021221024d8a69222ab1b305aa6abd5615058ed0e7e9f4da04e190284bbfb5fae968b348", 864000]}' http://127.0.0.1:18060

  # Result
  {"id":1,"jsonrpc":"2.0","result":"4ef8d76685cf81675d5356e16f30b5c5f7ae63a3665a665dd3cf225ab7b4aa7372012029203d3aca5f3317bf4297be1507d171930726ede7e864a9b8a4d6c5b9007547df322cbaf84fd02248133bf5a1c2fae7296960eced0ef6bde2ff3ef37cf827000000002508021221033fb36e1471d2153d0759e14386c6c294b1ad09244841ee8d043eadd1bfe7baaa27000000002508021221024d8a69222ab1b305aa6abd5615058ed0e7e9f4da04e190284bbfb5fae968b348de93c05b00000000"}
  ```

## ppio status
- **Description**:  
  Display details of the current PPIO user node runtime
- **params**:
  none
- **Success Responses**:

  | result    |  description         |
  | --------- | ----------- |
  | protocol-version |protocol version |
  | version | api version |
  | id | network id of current node, hex string|
  | rpchost | ip address|
  | rpcport | port|
- **Fail Responses**:
  none
- **Example**:
  ```bash
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

## ppio storage
- **Description**:  
  Manage local storage
- **Subcommand**:

  | subcommand         | description       |
  | ------------------| --------------------------------------- |
  | [`StorageObject`](#storageobject)     | Display information about the specified Object of the current node    |
  | [`StorageObjects`](#storageobjects)   | Display information about all Objects of the current node    |
  | [`StorageSegments`](#storagesegments) | Display information about all segments of the current node   |
  | [`StorageKeep`](#storagekeep)         | Keep Object in local storage  |
  | [`StorageUsage`](#storageusage)       | View usage of local storage |
  | [`StorageGc`](#storagegc)             | Clean up objects that are not kept in the local storage space |

### StorageObject
- **Description**:  
  Display information about the specified Object of the current node
- **params**:

  | name    | default | description                                                         |
  | --------- | ------ | ---------------------------- |
  | object-hash | "none"     | hash value of the object |
- **Success Responses**:

  | result    |  description  |
  | --------- | ----------- |
  | result.Hash | hash value of the current object |
  | result.Length | byte length of the current object |
  | result.Segments | The current node corresponds to the segment of the specified object |
  | result.Segments.Id | id of the segment |
  | result.Segments.Hash| hash of the segment |
  | result.Segments.Length | byte length of the segment |
- **Fail Responses**:

  | result    |  description         |
  | --------- | ----------- |
  | error.code | error code |
  | error.message | detailed error message |
- **Example**:
  ```bash
  # Display information about the specified Object of the current node, including its size, the number of segments, and the id and hash values of each segment.

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
  Display information about all Objects of the current node
- **params**:
  none
- **Success Responses**:

  | result    |  description         |
  | --------- | ----------- |
  | result.Hash | hash of the object |
  | result.Length | byte length of the object |
- **Fail Responses**:
  none
- **Example**:
  ```bash
  # Display information about all objects of the current node, including the hash value and size of each object

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
  Display information about all segments of the current node
- **params**:  
  none
- **Success Responses**:

  | result    |  description         |
  | --------- | ----------- |
  | result.Id | id of the segment |
  | result.Hash | hash value of the segment |
  | result.Length | byte length of the segment |
- **Fail Responses**:
  none
- **Example**:
  ```bash
  # Display information about all segments of the current node, including id, hash, and size of each segment

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
  Keep an Object in local storage.

  ::: warning WARNING
    The user's own Objects are automatically kept to local storage space. Files copied from other users require to be kept to local storage space manually.
  :::
- **params**:

  | name    | default | description                                                         |
  | --------- | ------ | ---------------------------- |
  | object-hash | "none"     | Hash value of the object|
- **Success Responses**:

  | result    |  description         |
  | --------- | ----------- |
  | result | success or failure signal|
- **Fail Responses**:

  | result    |  description         |
  | --------- | ----------- |
  | result | success or failure signal|
- **Example**:
  ```bash
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
  View usage of local storage
- **params**:
  none
- **Success Responses**:

  | result    |  description         |
  | --------- | ----------- |
  | result.UsageRate | usage rate of the local storage |
  | result.Total | total amount of the local storage |
  | result.Used | uesd amount of the local storage |
  | result.KetpTotal | total of the kept objects |
  | result.KeptCount| amount of the kept objects |
- **Fail Responses**:
  none
- **Example**:
  ```bash
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
  Clean up objects that are not kept in the local storage space
- **params**:  
  none
- **Success Responses**:

  | result    |  description         |
  | --------- | ----------- |
  | result | success or failure signal|
- **Fail Responses**:

  | result    |  description         |
  | --------- | ----------- |
  | result | success or failure signal|
- **Example**:
  ```bash
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

## ppio wallet
- **Description**:  
  Manage user's wallet
- **Subcommand**:

  | subcommand   | description      |
  | ----------------- | -------------|
  | [`WalletAddress`](#walletaddress) | Display current wallet address, hex string |
  | [`WalletBalance`](#walletbalance) | Show the balance of the current wallet address  |

### WalletAddress
- **Description**:  
  Display current wallet address, hex string
- **params**:  
  none
- **Success Responses**:

  | result    |  description     |
  | --------- | ----------- |
  | result | current wallet address|
- **Fail Responses**:
  none
- **Example**:
  ```bash
  # return current wallet address, hex string

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
  Show the balance of the current wallet address
- **params**:  
  none
- **Success Responses**:

  | result    |  description         |
  | --------- | ----------- |
  | result | the balance of the current wallet address|
- **Fail Responses**:
  none
- **Example**:
  ```bash
  # return the balance of the current wallet address

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
