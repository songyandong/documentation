---
sidebarDepth: 2
---

# Command Line Reference
## Overview
`ppio`, `ppio daemon`, `ppio daemon start` will start a PPIO user node.

In addition to `ppio daemon start`, `ppio init`, `ppio help`, `ppio version`, other commands or subcommands are invoked through RPC. So unless specify otherwise, they all have the same options "rpchost" and "rpcport".

`ppio daemon start` also has options "rpchost" and "rpcport", which are used to temporarily override the RPC service listening address and port in the default configuration file.
- **Usage**:  
  ```bash
  # 对于daemon启动命令
  ppio [--rpchost=<rpchost>] [--rpcport=<rpcport>]
  ppio daemon [--rpchost=<rpchost>] [--rpcport=<rpcport>]
  ppio daemon start [--rpchost=<rpchost>] [--rpcport=<rpcport>]

  # 对于rpc命令
  ppio COMMAND [SUB-COMMAND]
      [--rpchost=<rpchost>]
      [--rpcport=<rpcport>]
  ```
- **Options**:
  | options| default | description |
  |--|--|--|
  |--rpchost|"127.0.0.1"|RPC service adress|
  |--rpcport|18060|RPC port|
- **Example**:  
  ``` bash
  # start the user node and listen to port 18061
  > ppio --rpcport=18061

  # make an RCP call to connect port 18060
  > ppio config --rpcport=18060

  > ppio config show --rpcport=18060
  ```
::: warning WARNING
  The options configuration on the command line overrides the configuration in the configuration file.
:::

## ppio help
- **Description**:  
  display help for commands or subcommands
- **Usage**:  
  ```bash
  ppio [COMMAND] help
  ```
- **Example**:  
  ```bash
  > ppio help

  NAME:
     ppio - ppio

  USAGE:
     ppio [global options] command [command options] [arguments...]

  VERSION:
     0.2.0

  COMMANDS:
       config    ppio config
       init      ppio init
       daemon    ppio daemon
       net       ppio net
       object    ppio object
       storage   ppio storage
       metadata  ppio metadata
       status    ppio status
       wallet    ppio wallet
       help, h   Shows a list of commands or help for one command

  GLOBAL OPTIONS:
     --datadir value
     --help, -h       show help
     --version, -v    print the version
  ```

  ```bash
  > ppio metadata help

  NAME:
     ppio metadata - ppio metadata

  USAGE:
     ppio metadata [global options] command [command options] [arguments...]

  VERSION:
     0.2.0

  COMMANDS:
       get  ppio metadata get [--file] [--codec=base64] <file-or-string>
       put  ppio metadata put [--file] [--codec=base64] <file-or-string>

  GLOBAL OPTIONS:
     --help, -h  show help
  ```

## ppio config
- **Description**:  
  Manage user node configuration information.
- **Usage**:  
  ```bash
  ppio config [SUB-COMMAND]
  ```
- **subcommand**:
  | subcommand | description |
  |--|--|
  | [`ppio config show`](#ppio-config-show) |List the configuration information of the current user node|

### ppio config show
- **Description**:  
  List the configuration information of the current user node
- **Usage**:  
  ```bash
  ppio config show
      [--rpchost=<rpchost>]
      [--rpcport=<rpcport>]
  ```
- **Options**:
  | options| default | description |
  |--|--|--|
  |--rpchost|"127.0.0.1"|RPC service address|
  |--rpcport|18060|RPC port|
- **Example**:  
  ```bash
  > ppio config show
  {
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
  ```

## ppio daemon
- **Description**:  
  Manage PPIO user node service
- **Usage**:  
  ```bash
  ppio daemon SUB-COMMAND
  ```
- **subcommand**:
  | subcommand | description |
  |--|--|
  | [`ppio daemon start`](#ppio-daemon-start) | start PPIO user node service |
  | [`ppio daemon stop`](#ppio-daemon-stop) | stop PPIO user node service |

### ppio daemon start
- **Description**:  
  Start PPIO user node service, establishes a connection and communicates with other user nodes, and exposes the corresponding port to provide RPC services and generates configuration files.

  ::: warning WARNING
  Only this command starts the service node, and other commands (except `ppio version` and `ppio help`) communicate with the service node through RPC.
  :::
- **Usage**:  
  ```bash
  ppio daemon start
  ```
- **Options**:
  | options| default | description |
  |--|--|--|
  |--datadir |".ppio" subdirectory under the user's home directory|user node's data directory|
  |--config |"ppio.conf" file in the data directory|specify configuration file|
  |--rpchost|"127.0.0.1"|RPC service address(can be overrided)|
  |--rpcport|18060|RPC port|
- **Example**:  
  ```bash
  > ppio daemon start
  [这里显示 `ppio` 提供的所有命令的名称及简介(To be implemented)]

  ```

### ppio daemon stop
- **Description**:  
  Stop PPIO user node service.
- **Usage**:  
  ```bash
  ppio daemon stop
  ```
- **Example**:  
  ```bash
  # Return the success or failure signal and reason
  > ppio daemon stop
  Succeed!
  ```

## ppio init
- **Description**:
  Initialize the PPIO user node and create the PPIO data directory and configuration file.  
  - If the data directory or configuration file already exists, nothing is done;
  - If the configuration file format is unexpected, the content will be updated to the default.  
- **Usage**:  
  ```bash
  ppio init
      [--datadir=<data-dir>]
      [--config=<config-file-path>]
      [--max-storage=<max-storage>]
      [--gc-threshold=<gc-threshold>]
  ```
- **Options**:
  | options| default | description |
  |--|--|--|
  |--datadir|/home/u/.ppio/|specify PPIO user node data directory|
  |--config|/home/u/.ppio/ppio.config|specify PPIO user node configuration file|
  |--max-storage| 10G | Specify the size of the local space that the user node can use. The unit can be: B,b,M,m,G,g,T,t|
  |--gc-threshold| 0.8 |When the size of the space used by the user exceeds this value, the node will start cleaning up the unkept files.(The value is less than the size of the space set by the user through `--max-storage`)|
- **Example**:
  ```bash
  # Create a data directory "/home/u/.ppio", create default configuration file "/home/u/.ppio/ppio.conf"
  > ppio init
  Succeed!

  # Create a data directory "/home/u/ppio", create default configuration file "/home/u/ppio/ppio.conf"
  > ppio init --datadir=/home/u/ppio
  Succeed!

  # Create a data directory "/home/u/.ppio", create default configuration file "/home/u/.ppio/ppio.conf" based on the given file path
  > ppio init --config=/home/u/ppio/ppio.conf
  Succeed!

  # Create a data directory "/home/u/ppio_a", create default configuration file "/home/u/ppio_a/ppio.conf" based on the given file path
  > ppio init --datadir=/home/u/ppio_a --config=/home/u/ppio_b/ppio.conf
  Succeed!

  # Create a data directory "/home/u/ppio_a", create default configuration file "/home/u/ppio_a/ppio.conf" based on the given file path
  # The max-storage configuration item in the default configuration file will be overrided by the parameters in the command line.
  > ppio init --datadir=/home/u/ppio_a --config=/home/u/ppio_b/ppio.conf --max-storage=8G
  Succeed!

  > ppio init --max-storage=1000G
  Failed! Your available storage size may not be enough.
  ```

## ppio metadata
- **Description**:  
  Manage user metadata
- **Usage**:  
  ```bash
  ppio metadata SUB-COMMAND
  ```
- **subcommand**:
  | subcommand | description |
  |--|--|
  |[`ppio metadata put`](#ppio-metadata-put)|Upload the user's MetaData information to the Indexer node|
  |[`ppio metadata get`](#ppio-metadata-get)|Download the user's MetaData information to the Indexer node|

### ppio metadata put
- **Description**:  
  Upload the user's MetaData information to the Indexer node, and limit the maximum occupied space of the information to 1M; MetaData is used to store basic information about users, and the usage scenarios are not limited.
- **Usage**:  
  ```bash
  ppio metadata put <meta-data>
  ```
- **Arguments**:
  ```bash
  <meta-data>: MetaData content to be uploaded, text form.
  ```
- **Example**:  
  ```bash
  # Return a success or failure signal.
  > ppio metadata put "Test MetaData"
  Succeed!
  ```

### ppio metadata get
- **Description**:  
  Download the user's MetaData information from the Indexer node.
- **Usage**:
  ```
  ppio metadata get
  ```
- **Example**:
  ```
  > ppio metadata get
  "Test MetaData"

  ```

## ppio net
- **Description**:  
  Manage network information of PPIO user node
- **Usage**:
  ```
  ppio net SUB-COMMAND
  ```
- **Subcommand**:
  | subcommand | description |
  |--|--|
  | [`ppio net id`](#ppio-net-id) |Display the current user node's network address, hex string|
  | [`ppio net ping`](#ppio-net-ping) |Detect connections to other user nodes|
  | [`ppio net peers`](#ppio-net-peers) |Display the list of currently connected peer information|
  | [`ppio net servers`](#ppio-net-servers) |Display the list of currently connected server information|

### ppio net id
- **Description**:  
  Display the current node's network address, hex string
- **Usage**:
  ```
  ppio net id
  ```
- **Example**:
  ```bash
  > ppio net id
  080a6fdb95cee6f852cb4b061525c866cbbe2c0a
  ```

### ppio net ping <Badge text="todo" type="warn"/>
- **Description**:  
  Detect connections to other user nodes
- **Usage**:
  ```bash
  ppio net ping <target-peer-id>
  ```
- **Arguments**:
  ```bash
  <target-peer-id>: The ID of the target peer to be detected
  ```
- **Example**:
  ```bash
  # The content format returned by the command:
  # <target-peer-id> <out-latency> <in-latency>
  > ppio net ping 080a6fdb95cee6f852cb4b061525c866cbbe2c0a
  080a6fdb95cee6f852cb4b061525c866cbbe2c0a 20ms 20ms
  ```

### ppio net peers <Badge text="todo" type="warn"/>
- **Description**:  
  Display the list of currently connected peer information
- **Usage**:
  ```
  ppio net peers
  ```
- **Example**:
  ```bash
  # The content format returned by the command:
  # <peer-id> <ip:port> <software-version> <in-latency> <out-latency>
  > ppio net peers
  080a6fdb95cee6f852cb4b061525c866cbbe2c0a 101.200.0.1:5000 v1.1 10ms 20ms
  080a6fdb95cee6f852cb4b061525c866cbbe2c0a 101.200.0.3:5100 v1.1 10ms 20ms
  ```

### ppio net servers
- **Description**:  
  Display the list of currently connected server information
- **Usage**:
  ```bash
  ppio net servers
  ```
- **Example**:
  ```bash
  # the content format returned by the command
  # <index> [indexer | verifier] <ip>:<tcpport>:<udpport>
  > ppio net servers
  Indexers count: 1
  0: indexer 127.0.0.1:8030:8030
  Verifiers count: 1
  0: verifier 127.0.0.1:8040:8040

  ```

## ppio object
- **Description**:  
  Manage the Object of the PPIO user node
- **Usage**:
  ```bash
  ppio object SUB-COMMAND
  ```
- **Subcommand**:
  | subcommand | description |
  |--|--|
  |[`ppio object import`](#ppio-object-import)| Import a file from a local file system or pipe into storage|
  |[`ppio object export`](#ppio-object-export)|Export an Object from the local storage to the local file system|
  |[`ppio object put`](#ppio-object-put)|Publish a contract to upload an Object|
  |[`ppio object get`](#ppio-object-get)|Download all the contents of an Object to the local storage|
  |[`ppio object copy`](#ppio-object-copy)|Initiate a copy contract of Object and copy an Object to yourself|
  |[`ppio object status`](#ppio-object-status)|Obtain the contract information and execution status of an Object, which can only be used to view the user's own Object.|
  |[`ppio object list`](#ppio-object-list)|Get contract execution for all Objects|
  |[`ppio object delete`](#ppio-object-delete)|Delete the contract for an Object|
  |[`ppio object renew`](#ppio-object-renew)|Republish the contract for an Object|
  |[`ppio object updateacl`](#ppio-object-updateacl)|Update ACL information for an Object|
  |[`ppio object auth`](#ppio-object-auth)|Authorize Objects in local storage to other users|

### ppio object import
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
- **Usage**:
  ```bash
  ppio object import
      [--encrypt=<encrypt-algorithm>]
      [--key=<key>]
      <local-file-path> | -
  ```
- **Arguments**:
  ```bash
  <local-file-path>:  local file path to be imported
  -: file data can be piped
  ```
- **Options**:
  | options| default | description |
  |--|--|--|
  |--encrypt| "AES" | Set the encryption algorithm used to encrypt the contents of the original file. The currently selectable encryption algorithms are: AES|
  |--key|""|Specify the key used to encrypt the contents of the original file|
- **Example**:
  ```bash
  # If the import is successful, the command returns the Hash value of the Object; otherwise, it returns the error ID and the cause of the error.

  > ppio object import /home/u/1.txt
  98715955d14b4ea129fed7efd1ffdd2ba7a0cc4a2e46160058a740893bbaf2d1

  > ppio object import --encrypt=AES key=TEST_KEY /home/u/1.txt
  98715955d14b4ea129fed7efd1ffdd2ba7a0cc4a2e46160058a740893bbaf2d1

  > echo "TEST" | ppio object import --encrypt=AES --key=TEST_KEY -
  98715955d14b4ea129fed7efd1ffdd2ba7a0cc4a2e46160058a740893bbaf2d1

  ```

### ppio object export
- **Description**:  
  Export an Object from the local storage to the local file system
  **Detailed process:**  
  1. If there is no specified Object in the local storage space, the download to the space is requested from the PPIO network first;
  2. Once the Object is ready, splicing, decrypting the Segments in the Object, and then saving the resulting file to the local file system

- **Usage**:
  ```bash
  ppio object export
      [--encrypt=<encrypt-algorithm>]
      [--key=<key>]
      [--output=<output-file-path>]
      <object-hash>
  ```
- **Arguments**:
  ```bash
  <object-hash>: The hash value of the Object to be exported.
  ```
- **Options**:
  | options| default | description |
  |--|--|--|
  |--encrypt| "AES" | Set the encryption algorithm used to decrypt the contents of the original file, corresponding to the encryption algorithm|
  |--key|""|Specify the key used to decrypt the content in the Object|
  |--output|current directory|The path to the local file, if not specified, write the current directory with \<object-hash\> as the file name|
- **Example**:
  ```bash
  # If the command is successfully executed, the path of the exported file is returned; otherwise, the error code and the cause of the error are returned.
  > pwd
  /home/u/a/b/c/
  > ppio object export 98715955d14b4ea129fed7efd1ffdd2ba7a0cc4a2e46160058a740893bbaf2d1
  Succeed to export to /home/u/a/b/c/98715955d14b4ea129fed7efd1ffdd2ba7a0cc4a2e46160058a740893bbaf2d1

  > ppio object export --key=TEST_KEY --output=/home/u/1.txt 98715955d14b4ea129fed7efd1ffdd2ba7a0cc4a2e46160058a740893bbaf2d1
  Succeed to export to /home/u/1.txt

  ```

### ppio object put
- **Description**:  
  Publish a contract to upload an Object
- **Usage**:
  ```bash
  ppio object put
      [--copies=<copy-num>]
      [--duration=<duration>]
      [--gasprice=<gasprice>]
      [--acl=<acl>]
      <object-hash>
  ```
- **Arguments**:
  ```bash
  <object-hash>: The hash value of the target Object
  ```
- **Options**:
  | options| default | description |
  |--|--|--|
  |--copies|5|The number of copies stored, at least 5|
  |--duration|8640000(equals 100 days)|The storage time of the object, unit in s (second)|
  |--gasprice| Null |Gas 单价，以 wei 为单位|
  |--acl|public|Access to Object: Set to public to mean that the Object can be accessed by anyone; set to private to mean that the Object is private and needs to be authorized to access|
- **Example**:
  ```bash
  # If the contract is successfully published, it does not mean that the Indexer node will be scheduled or the Object has been uploaded successfully. You can use the `ppio object status` command to query whether the Object is successfully uploaded.
  # If the contract publishing is unsuccessful, it will return an error code and the cause of the error.

  > ppio object put --copies=3 --duration=864000 --gasprice=10000 --acl=public 98715955d14b4ea129fed7efd1ffdd2ba7a0cc4a2e46160058a740893bbaf2d1
  Succeed!

  ```

### ppio object get
- **Description**:  
  Download the contents of an Object to your local storage. When Object is owned by someone else, there are two situations:
  - If the ACL of the Object is set to public, you can download the Object directly via `ppio object get`
  - If the ACL of the Object is set to private, you must first have the signature authorization for the Object (via the `ppio object auth` command), and the user can download the object via `ppio object get` during the validity period of the signature.

- **Usage**:
  ```bash
  ppio object get
      [--gasprice=<gasprice>]
      [--owner=<owner-id>]
      [--auth=<auth>]
      <object-hash>
  ```
- **Arguments**:
  ```bash
  <object-hash>: The Hash value of the Object (can be another user\'s Object)
  ```
- **Options**:
  | options| default | description |
  |--|--|--|
  |--gasprice|无|Gas 单价，以 wei 为单位 (This field needs to be set when the Object is owned by someone else)|
  |--owner|无|user-id (This field needs to be set when the Object is owned by someone else)|
  |--auth|无|Signature of Object (When Object is owned by someone else and the ACL of the Object is set to private)|
- **Example**:
  ```bash
  # If the command is successfully executed, it returns the directory information of the Object in the local storage space. Otherwise it returns the error code and error message.

  # User's own or Public object
  > ppio object get --gasprice=1000 98715955d14b4ea129fed7efd1ffdd2ba7a0cc4a2e46160058a740893bbaf2d1
  Succeed!

  # Authorize user "fffffff95cee6f852cb4b061525c866cbbe2c0a"
  > ppio object auth --accessor=fffffff95cee6f852cb4b061525c866cbbe2c0a --duration=86400 98715955d14b4ea129fed7efd1ffdd2ba7a0cc4a2e46160058a740893bbaf2d1
  Auth Info: 667b0377...

  # User "fffffff95cee6f852cb4b061525c866cbbe2c0a" downloads file by authorization
  > ppio object get --gasprice=1000 --auth=667b0377... --owner=080a6fdb95cee6f852cb4b061525c866cbbe2cff 98715955d14b4ea129fed7efd1ffdd2ba7a0cc4a2e46160058a740893bbaf2d1
  Succeed!
  ```

### ppio object copy
- **Description**:  
  Initiate a copy contract of Object to copy an Object to your own
- **Usage**:
  ```bash
  ppio object copy
      [--copies=<copy-num>]
      [--duration=<duration>]
      [--gasprice=<gasprice>]
      [--acl=<acl>]
      [--auth=<auth>]
      [--owner=<owner-id>]
      <object-hash>
  ```
- **Arguments**:
  ```bash
  <object-hash>: The hash value of the Object to be copied
  ```
- **Options**:
  | options| default | description |
  |--|--|--|
  |--copies|5|The number of copies stored, at least 5|
  |--duration|8640000(equals 100 days)|The storage time of the Object, unit in s (second)|
  |--gasprice| Null |Gas 单价，以 wei 为单位|
  |--acl|public|The access permission of Object, set to public means that the Object can be accessed by anyone; set to private means that the Object is private and needs to be authorized to access|
  |--owner| Null |User ID of the Object owner|
  |--auth| Null | Required to copy other people's Objects, need an Object signature provided by others to authorize|
- **Example**:
  ```bash
  # After the contract is successfully copied, it directly returns the success signal. It does not mean that the Indexer will be scheduled or the Object has been successfully copied. You can use the `ppio object status` command to query whether the Object is successfully copied.
  # If the contract Copy fails, it will return the error code and the cause of the error.

  > ppio object copy --copies=5 --duration=86400 --gasprice=100 --auth=0x1234 --owner=080a6fdb95cee6f852cb4b061525c866cbbe2cff 98715955d14b4ea129fed7efd1ffdd2ba7a0cc4a2e46160058a740893bbaf2d1
  Succeed!

  ```

### ppio object status
- **Description**:  
  Get the contract information and execution status of an Object, which can only be used to view your own Object.
- **Usage**:
  ```bash
  ppio object status <object-hash>
  ```
- **Arguments**:
  ```bash
  <object-hash>: The hash value of the Object to be queried
  ```
- **Example**:
  ```bash
  # The content format returned by the command:
  > ppio object status 98715955d14b4ea129fed7efd1ffdd2ba7a0cc4a2e46160058a740893bbaf2d1
  Object Hash: [98715955d14b4ea129fed7efd1ffdd2ba7a0cc4a2e46160058a740893bbaf2d1]
  Storage Contracts:
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
  ```

### ppio object list
- **Description**:  
  Paginate all Objects. Unlike `ppio object status`, `ppio object list` is just a list of Objects, and there is no information about the execution of the corresponding contract.
- **Usage**:
  ```bash
  ppio object list
      [--start-page=<start-page>]
      [--page-size=<page-size>]
  ```
- **Options**:
  | options| default | description |
  |--|--|--|
  |--start-page|1|Start page, need to be greater than or equal to 1|
  |--page-size|10|Maximum number of Object records per page|
- **Example**:
  ```bash
  # The content format returned by the command:
  > ppio object list
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
  ```

### ppio object delete
- **Description**:  
  Delete the contract of an Object
- **Usage**:
  ```bash
  ppio object delete <object-hash>
  ```
- **Arguments**:
  ```bash
  <object-hash>: The hash value of the Object to be deleted
  ```
- **Example**:
  ```bash
  # The success signal will be returned after the contract is successfully deleted, otherwise the error code and reason will be returned.
  > ppio object delete 98715955d14b4ea129fed7efd1ffdd2ba7a0cc4a2e46160058a740893bbaf2d1
  Succeed!
  ```

### ppio object renew
- **Description**:  
  Republish the contract for an Object
- **Usage**:
  ```bash
  ppio object renew
      [--copies=<copy-num>]
      [--duration=<duration>]
      [--gasprice=<gasprice>]
      [--acl=<acl>]
      <object-hash>
  ```
- **Arguments**:
  ```bash
  <object-hash>: The hash value of the Object to be republished
  ```
- **Options**:
  | options| default | description |
  |--|--|--|
  |--copies|5|The number of stored copies, not less than 5|
  |--duration|8640000(equals 100 days)|The storage time of the object, unit in s (seconds)|
  |--gasprice| Null |Gas 单价，以 wei 为单位|
  |--acl|public|The access permission of Object, set to public means that the Object can be accessed by anyone; set to private means that the Object is private and needs to be authorized to access|
- **Example**:
  ```bash
  # The successful completion of the contract will return the success signal, otherwise it will return the error code and the reason. In addition, the release of the contract is successful, it does not mean that the Indexer node will be scheduled.
  > ppio object renew --duration=864000 --gasprice=100 --copies=5 --acl=public 98715955d14b4ea129fed7efd1ffdd2ba7a0cc4a2e46160058a740893bbaf2d1
  Succeed!
  ```

### ppio object updateacl
- **Description**:  
  Update ACL information for an Object
- **Usage**:
  ```bash
  ppio object updateacl
      [--acl=<acl>]
      <object-hash>
  ```
- **Arguments**:
  ```bash
  <object-hash>: The hash value of the Object to be updated with ACL information
  ```
- **Options**:
  | options| default | description |
  |--|--|--|
  |--acl|public|The access permission of Object, set to public means that the Object can be accessed by anyone; set to private means that the Object is private and needs to be authorized to access|
- **Example**:
  ```bash
  # The successful update will return the success signal, otherwise it will return the error code and the reason.
  > ppio object updateacl --acl=public 98715955d14b4ea129fed7efd1ffdd2ba7a0cc4a2e46160058a740893bbaf2d1
  Succeed!

  ```

### ppio object auth
- **Description**:  
  Authorize the Object in the local storage space to other users. If the ACL of the Object is public, the command has no effect.
  The authorization duration cannot exceed the length of time the user has the file.
- **Usage**:
  ```bash
  ppio object auth
      --accessor=<accessor>
      [--duration=<duration>]
      <object-hash>
  ```
- **Arguments**:
  ```bash
  <object-hash>: The hash value of the Object to be authorized
  ```
- **Options**:
  | options| default | description |
  |--|--|--|
  |--accessor| null |Authorized user's id|
  |--duration|86400(equals a day)|Authorized effective duration, unit in s (second)|
- **Example**:
  ```bash
  # If the authorization is successful, the authorized signature information is returned for the authorized user to obtain the Object, otherwise the error code and information are returned.
  > ppio object auth --accessor=080a6fdb95cee6f852cb4b061525c866cbbe2c0a --duration=86400 98715955d14b4ea129fed7efd1ffdd2ba7a0cc4a2e46160058a740893bbaf2d1
  Auth Info: 667b0377565b0bde135abca46dc724f1e7db610e0d849e06b34d5110d72f427f26ec6250d10f02c46a6fc3c339f0985cc8dd3ace423302bae2d77a4e656f79420198715955d14b4ea129fed7efd1ffdd2ba7a0cc4a2e46160058a740893bbaf2d127000000002508021221033fb36e1471d2153d0759e14386c6c294b1ad09244841ee8d043eadd1bfe7baaa14000000080a6fdb95cee6f852cb4b061525c866cbbe2c0a63f3b65b00000000
  ```

## ppio status
- **Description**:  
  Display details of the current PPIO user node runtime
- **Usage**:
  ```bash
  ppio status
  ```
- **Example**:
  ```bash
  > ppio status
  protocol-version:   v0.0.1
  version:            v0.1.0
  id:                 QmfE6VMnNx1ZYdgihniprx4SKqBRDjrDqHWishLQ7CSdEj
  rpchost:            127.0.0.1
  rpcport:            18060

  ```

## ppio storage
- **Description**:  
  Manage local storage
- **Usage**:
  ```bash
  ppio storage SUB-COMMAND
  ```

  subcommand:
  | subcommand | description |
  |--|--|
  |[`ppio storage object`](#ppio-storage-object)|Display information about the specified Object of the current node|
  |[`ppio storage objects`](#ppio-storage-objects)|Display information about all Objects of the current node|
  |[`ppio storage segments`](#ppio-storage-segments)|Display information about all segments of the current node|
  |[`ppio storage keep`](#ppio-storage-keep)|Keep Object in local storage|
  |[`ppio storage usage`](#ppio-storage-usage)|View usage of local storage|
  |[`ppio storage gc`](#ppio-storage-gc)|Clean up objects that are not kept in the local storage space|

### ppio storage object
- **Description**:  
  Display information about the specified Object of the current node
- **Usage**:
  ```bash
  ppio storage object <object-hash>
  ```
- **Arguments**:
  ```bash
  <object-hash>: Hash value of the Object to be displayed, hex string
  ```
- **Example**:
  ```bash
  # Display information about the specified Object of the current node, including its size, the number of segments, and the id and hash values of each segment.
  > ppio storage keep 7547df322cbaf84fd02248133bf5a1c2fae7296960eced0ef6bde2ff3ef37cf8
  Hash: 7547df322cbaf84fd02248133bf5a1c2fae7296960eced0ef6bde2ff3ef37cf8
  Length: 87041
  Segment Count: 1
  Segment 0 : 6ad3e2278e1251c1a1ebf3f842dcff2caf21d24b94148a8649896f915e574c1e 7547df322cbaf84fd02248133bf5a1c2fae7296960eced0ef6bde2ff3ef37cf8
  ```

### ppio storage objects
- **Description**:  
  Display information about all Objects of the current node
- **Usage**:
  ```bash
  ppio storage objects
  ```
- **Example**:
  ```bash
  # Display information about all objects of the current node, including the hash value and size of each object
  > ppio storage objects
  Hash=C9B351CA25F45D9A1D3830F16D987EEEB90668466768A03A38DC592FCA9937EC    Length=16777216
  Hash=E949A1CC67C268D7E5294183B9A57B63BC00A0CC8A22909E83D2AAC181A4A9D6    Length=33554435
  Hash=7547DF322CBAF84FD02248133BF5A1C2FAE7296960ECED0EF6BDE2FF3EF37CF8    Length=87041
  Hash=BFA15DD67653A6C20A871D8F94E2136A4D053E587CF9CD1D5CF88B96C9370E28    Length=132098
  Hash=C7E5A790B4D232C5BB7FF5F4618A2A0D1EBF7A96ACD08F57564BAA471E5671CD    Length=33554432
  ```

### ppio storage segments
- **Description**:  
  Display information about all segments of the current node
- **Usage**:
  ```bash
  ppio storage segments
  ```
- **Example**:
  ```bash
  # Display information about all segments of the current node, including id, hash, and size of each segment
  > ppio storage segments
  Id=6ad3e2278e1251c1a1ebf3f842dcff2caf21d24b94148a8649896f915e574c1e Hash=7547df322cbaf84fd02248133bf5a1c2fae7296960eced0ef6bde2ff3ef37cf8    Length=87041
  Id=cc28362ef3b1102b7be2aacc4d98783b87f1bbfaa26f602fff53cbd62ef70632 Hash=bfa15dd67653a6c20a871d8f94e2136a4d053e587cf9cd1d5cf88b96c9370e28    Length=132098
  Id=44926864c68a02dec1722a873ebbdc649c59ef57efb82893d7fa979e49555e65 Hash=c9b351ca25f45d9a1d3830f16d987eeeb90668466768a03a38dc592fca9937ec    Length=16777216
  Id=53e36b79903add8f2c8102fb174ac67461bdca851387083726954c79f43f1ce4 Hash=72bddba68e17c5ee3fef4f2dc8fa3489c1416abf826e73fdbf7f54c2d4f41172    Length=16777216
  Id=4a09e20aa0bc0d351f21918e4f740e8cc064d7bce0295acda8ee167850004921 Hash=c9b351ca25f45d9a1d3830f16d987eeeb90668466768a03a38dc592fca9937ec    Length=16777216
  Id=f6cb55447cbff363854cab3d3bada54953143bb7269fd6380c2558a75428bda0 Hash=c9b351ca25f45d9a1d3830f16d987eeeb90668466768a03a38dc592fca9937ec    Length=16777216
  Id=56e60eeaf1744b4c1f2344ae26b07e958800ef12a4c9c1ba579c3bb240690e8f Hash=72bddba68e17c5ee3fef4f2dc8fa3489c1416abf826e73fdbf7f54c2d4f41172    Length=16777216
  Id=4b5053da3189dc72a60ab4232a13d76f187227a12cbbd2e749c8f9785f05eb2d Hash=4a5577926eb696943ce694ca52d57a62588a3867535dadf23d2afa2863b67a36    Length=3
  ```

### ppio storage keep <Badge text="todo" type="warn"/>
- **Description**:  
  Keep an Object in local storage.

  ::: warning WARNING
  The user's own Objects are automatically kept to local storage space. Files copied from other users require to be kept to local storage space manually.
  :::

  ```bash
  ppio storage keep <object-hash>
  ```
- **Arguments**:
  ```bash
  <object-hash>: The hash value of the Object to be set
  ```
- **Example**:
  ```bash
  # Return success or failure signal
  > ppio storage keep 98715955d14b4ea129fed7efd1ffdd2ba7a0cc4a2e46160058a740893bbaf2d1
  Succeed!
  ```

### ppio storage usage <Badge text="todo" type="warn"/>
- **Description**:  
  View usage of local storage
- **Usage**:
  ```
  ppio storage usage
  ```
- **Example**:
  ```
  > ppio storage usage
  **Usage** rate: 50%     // Space usage rate
  Total: 10G          // Max storage space
  Used: 5G            // Used storage space
  KetpTotal: 2G       // Total space for kept objects
  KeptCount: 3        // Count of kept objects
  ```

### ppio storage gc <Badge text="todo" type="warn"/>
- **Description**:  
  Clean up objects that are not kept in the local storage space
- **Usage**:
  ```bash
  ppio storage gc
  ```
- **Example**:
  ```bash
  # Return success or failure signal
  > ppio storage gc
  Succeed!
  ```

## ppio wallet
- **Description**:  
  Manage user's wallet
- **Usage**:
  ```bash
  ppio wallet SUB-COMMAND
  ```
- **Subcommand**:
  | subcommand | description |
  |--|--|
  |[`ppio wallet address`](#ppio-wallet-address)|Display current wallet address, hex string|
  |[`ppio wallet balance`](#ppio-wallet-balance)|Show the balance of the current wallet address|

### ppio wallet address
- **Description**:  
  Show current wallet address
- **Usage**:
  ```bash
  ppio wallet address
  ```
- **Example**:
  ```bash
  # Return current wallet address
  > ppio wallet address
  080a6fdb95cee6f852cb4b061525c866cbbe2c0a
  ```

### ppio wallet balance
- **Description**:  
  Show the balance of the current wallet address
- **Usage**:
  ```bash
  ppio metadata get
  ```
- **Example**:
  ```bash
  # Returns the balance of the current wallet address
  > ppio wallet balance
  1000000000
  ```
