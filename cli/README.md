---
sidebarDepth: 2
---

# Command Line Reference
## Overview

PPIO provides commands and subcommands to control a user node in PPIO network.

Except `ppio daemon start`, `ppio init`, `ppio help`, `ppio version`, other commands or subcommands are called through RPC. So unless specify otherwise, they all have the same options "rpchost" and "rpcport".

`ppio daemon start` also has options "rpchost" and "rpcport", which are used to temporarily override the RPC service listening address and port in the default configuration file.

- **Usage**:
  ```bash
  # daemon command
  ppio daemon start [--rpchost=<rpchost>] [--rpcport=<rpcport>]

  # rpc command
  ppio COMMAND [SUB-COMMAND]
      [--rpchost=<rpchost>]
      [--rpcport=<rpcport>]
  ```

- **Options**:


  | Option| Default | Description |
  |--|--|--|
  |--rpchost|"127.0.0.1"|RPC service address|
  |--rpcport|18060|RPC port|

- **Example**:  
  ``` bash
  # start the user node and listen to port 18061
  > ppio --rpcport=18061

  # make an RCP call to connect port 18060
  > ppio config --rpcport=18060

  > ppio config show --rpcport=18060
  ```
  ::: warning NOTE:
    Options with the command line will override the ones in the configuration file.
  :::

## ppio help
- **Description**:  
  Show help for commands or subcommands.

- **Commands**:
  ```
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
  Manage configuration of the user node

- **Usage**:
  ```
  ppio config [SUB-COMMAND]
  ```

- **Subcommands**:


  | Subcommand | Description |
  |--|--|
  | [`ppio config show`](#ppio-config-show) |Show the configuration of the user node.|

### ppio config show

- **Description**:  
  Show the configuration of the user node.

- **Usage**:
  ```bash
  ppio config show
      [--rpchost=<rpchost>]
      [--rpcport=<rpcport>]
  ```

- **Options**:


  | Option| Default | Description |
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
  Manage daemon service of the user node
- **Usage**:
  ```bash
  ppio daemon SUB-COMMAND
  ```
- **Subcommands**:


  | Subcommand | Description |
  |--|--|
  | [`ppio daemon start`](#ppio-daemon-start) | start the daemon service |
  | [`ppio daemon stop`](#ppio-daemon-stop) | stop the daemon service |

### ppio daemon start
- **Description**:  
  Starts daemon service of a user node and also start RPC services.

  ::: warning NOTE
  Only this command starts the service, other commands (except `ppio version` and `ppio help`) communicate with the service node through RPC.
  :::
- **Usage**:
  ```bash
  ppio daemon start
  ```
- **Options**:


  | Option| Default | Description |
  |--|--|--|
  |--datadir |".ppio" subdirectory under the user's home directory|user node's data directory|
  |--config |"ppio.conf" file in the data directory|specify configuration file|
  |--rpchost|"127.0.0.1"|RPC service address(can be overrided)|
  |--rpcport|18060|RPC port|

- **Example**:  
  ```bash
  > ppio daemon start
  ```

### ppio daemon stop
- **Description**:  
  Stop daemon service of the user node.
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
  Initialize the user node and create the PPIO data directory and configuration file.  
  - If the data directory or configuration file already exists, nothing is done;
  - If the configuration file format is unexpected, its content will be updated to default.  
- **Usage**:
  ```bash
  ppio init
      [--datadir=<data-dir>]
      [--config=<config-file-path>]
      [--max-storage=<max-storage>]
      [--gc-threshold=<gc-threshold>]
  ```
- **Options**:


  | Option| Default | Description |
  |--|--|--|
  |--datadir|/home/u/.ppio/|specify user node data directory|
  |--config|/home/u/.ppio/ppio.config|specify user node configuration file|
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
  Manage metadata of the user node. Metadata is used to store user's basic information and the size is limited to 1M.
- **Usage**:
  ```bash
  ppio metadata SUB-COMMAND
  ```
- **Subcommands**:


  | Subcommand | Description |
  |--|--|
  |[`ppio metadata put`](#ppio-metadata-put)|Upload the metadata to the Indexer node|
  |[`ppio metadata get`](#ppio-metadata-get)|Download the metadata from the Indexer node|

### ppio metadata put
- **Description**:  
  Upload the metadata to the Indexer node.
- **Usage**:
  ```bash
  ppio metadata put [--encoding=<encoding>] <meta-data>
  ```
- **Arguments**:
  ```bash
  <meta-data>: metadata content to be uploaded, text or hex string form
  ```

- **Options**:


  | Option| Default | Description |
  |--|--|--|
  |--encoding|"RAW"|"RAW" indicates the \<meta-data> is in text format. "HEX" indicates \<meta-data> is in hex format|


- **Example**:  
  ```bash
  > ppio metadata put "test metadata"
  Succeed!

  > ppio metadata put --encoding="HEX" "01234567"
  Succeed!
  ```

### ppio metadata get
- **Description**:  
  Download the metadata from the Indexer node.
- **Usage**:
  ```
  ppio metadata get [--encoding=<encoding>]
  ```

  - **Options**:


  | Option| Default | Description |
  |--|--|--|
  |--encoding|"RAW"|"RAW" indicates the \<meta-data> is in text format. "HEX" indicates \<meta-data> is in hex format|


- **Example**:
  ```
  > ppio metadata get
  "test metadata"

  > ppio metadata get --encoding="HEX"
  "01234567"
  ```

## ppio net
- **Description**:  
  Manage network information of the user node.
- **Usage**:
  ```
  ppio net SUB-COMMAND
  ```
- **Subcommands**:


  | Subcommand | Description |
  |--|--|
  | [`ppio net id`](#ppio-net-id) | Show the user node's network address, in hex string. |
  | [`ppio net ping`](#ppio-net-ping) <Badge text="todo" type="warn" vertical="middle"/> | Ping another user node. |
  | [`ppio net peers`](#ppio-net-peers) <Badge text="todo" type="warn" vertical="middle"/> | Show the information of connected peers. |
  | [`ppio net servers`](#ppio-net-servers) | Show the information of connected servers. |

### ppio net id

- **Description**:  
  Show the user node's network address, in hex string.
- **Usage**:
  ```
  ppio net id
  ```
- **Example**:
  ```bash
  > ppio net id
  002508021221033fb36e1471d2153d0759e14386c6c294b1ad09244841ee8d043eadd1bfe7baaa
  ```

### ppio net ping <Badge text="todo" type="warn" vertical="middle"/>
- **Description**:  
  Ping another user node.
- **Usage**:
  ```bash
  ppio net <target-peer-id>
  ```
- **Options**:
  ```bash
  <target-peer-id>: The ID of the target peer
  ```
- **Example**:
  ```bash
  # The content format returned by the command:
  # <target-peer-id> <out-latency> <in-latency>
  > ppio net 002508021221033fb36e1471d2153d0759e14386c6c294b1ad09244841ee8d043eadd1bfe7baaa
  002508021221033fb36e1471d2153d0759e14386c6c294b1ad09244841ee8d043eadd1bfe7baaa 20ms 20ms
  ```

### ppio net peers <Badge text="todo" type="warn" vertical="middle"/>

- **Description**:  
  Show the information of connected peers.
- **Usage**:
  ```
  ppio net peers
  ```
- **Example**:
  ```bash
  # The content format returned by the command:
  # <peer-id> <ip:port> <software-version> <in-latency> <out-latency>
  > ppio net peers
  002508021221033fb36e1471d2153d0759e14386c6c294b1ad09244841ee8d043eadd1bfe7baaa 101.200.0.1:5000 v1.1 10ms 20ms
  002508021221033fb36e1471d2153d0759e14386c6c294b1ad09244841ee8d043eadd1bfe7baaa 101.200.0.3:5100 v1.1 10ms 20ms
  ```

### ppio net servers

- **Description**:  
  Show the information of connected servers.
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
  Manage the Objects of the user node.
- **Usage**:
  ```bash
  ppio object SUB-COMMAND
  ```

- **Subcommands**:


  | Subcommand | Description |
  |--|--|
  |[`ppio object import`](#ppio-object-import)| Import a file from local file system or pipe into local storage|
  |[`ppio object export`](#ppio-object-export)|Export an Object in the local storage to local file system|
  |[`ppio object put`](#ppio-object-put)|Upload an Object in local storage|
  |[`ppio object get`](#ppio-object-get)|Download an Object to local storage|
  |[`ppio object copy`](#ppio-object-copy)|Copy an Object owned by the other user|
  |[`ppio object status`](#ppio-object-status)|Get status of an Object|
  |[`ppio object list`](#ppio-object-list)|Get status of all Objects owned by the user|
  |[`ppio object delete`](#ppio-object-delete)|Delete an Object|
  |[`ppio object renew`](#ppio-object-renew)|Republish an Object|
  |[`ppio object updateacl`](#ppio-object-updateacl)|Update ACL information of an Object|
  |[`ppio object auth`](#ppio-object-auth)|Authorize Objects to other users|

### ppio object import
- **Description**:  
  Import a file from local file system or pipe and store it into local storage of the user node.
  The file that is stored in local storage is called "Object".  

  **Detailed process of file processing:**
  1. Encrypt the file first.
  2. The encrypted file is sliced to multiple files (called Segments), and the file name of the Segment is the Hash value of its content.
  3. The name of Object is the Hash value all its segments.

  **The layout of the Segments in the local storage is shown as follows:**
  ```bash
  <datadir>/storage/<object-hash>/<object-hash>.desc
  <datadir>/storage/<object-hash>/<segment1-id>.dat
  <datadir>/storage/<object-hash>/<segment2-id>.dat

  # <object-hash> = HASH(<segment1-hash>, <segment2-hash>, ...)
  # the content of "<object-hash>.desc":
  # <object-hash> <object-hash>   <segment-count>  <object-length>
  # <segment1-id> <segment1-hash> <segment1-index> <segment1-length>
  # <segment1-id> <segment2-hash> <segment2-index> <segment2-length>
  # ...
  ```  
  After the file is imported, we can view the object information through the `ppio storage object` or `ppio storage objects` command.
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


  | Option| Default | Description |
  |--|--|--|
  |--encrypt| "AES" | Algorithm used to encrypt the original file.|
  |--key|N/A|Key used to encrypt the original file|

- **Example**:
  ```bash
  # If the file is imported successfully, the command returns the Hash value of the Object; otherwise, it returns the error ID and the cause of the error.

  > ppio object import /home/u/1.txt
  98715955d14b4ea129fed7efd1ffdd2ba7a0cc4a2e46160058a740893bbaf2d1

  > ppio object import --encrypt="AES" --key="TEST_KEY" /home/u/1.txt
  98715955d14b4ea129fed7efd1ffdd2ba7a0cc4a2e46160058a740893bbaf2d1

  > echo "TEST" | ppio object import --encrypt="AES" --key="TEST_KEY" -
  98715955d14b4ea129fed7efd1ffdd2ba7a0cc4a2e46160058a740893bbaf2d1

  ```

### ppio object export

- **Description**:  
  Export an Object from user node's storage to local file system

  **Detailed process:**  
  1. If there is no specified Object, it will download the object from PPIO network first;
  2. Once the Object is ready in local storage, segments are composed and then decrypted, and stored into local file system

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
  <object-hash>: The hash of the Object to be exported.
  ```
- **Options**:


  | Option| Default | Description |
  |--|--|--|
  |--encrypt| "AES" | Set the encryption algorithm used to decrypt the contents of the original file, corresponding to the encryption algorithm|
  |--key|N/A|Specify the key used to decrypt the content in the Object|
  |--output|directory|The path to the local file, if not specified, write the directory with \<object-hash\> as the file name|

- **Example**:
  ```bash
  # If the command succeed, the path of the exported file is returned; otherwise, the error code and the cause are returned.
  > pwd
  /home/u/a/b/c/
  > ppio object export 98715955d14b4ea129fed7efd1ffdd2ba7a0cc4a2e46160058a740893bbaf2d1
  Succeed to export to /home/u/a/b/c/98715955d14b4ea129fed7efd1ffdd2ba7a0cc4a2e46160058a740893bbaf2d1

  > ppio object export --key=TEST_KEY --output=/home/u/1.txt 98715955d14b4ea129fed7efd1ffdd2ba7a0cc4a2e46160058a740893bbaf2d1
  Succeed to export to /home/u/1.txt

  ```

### ppio object put

- **Description**:  
  Upload an Object to the PPIO network

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
  <object-hash>: The hash of the target Object
  ```

- **Options**:


  | Option| Default | Description |
  |--|--|--|
  |--copies|5|The number of copies stored, at least 5|
  |--duration|8640000(100 days)|Life time of the storage stored in PPIO network, unit in second|
  |--gasprice| N/A |price of Gas, unit in wei|
  |--acl|public|Access control of the Object: "public" means that the Object can be accessed by anyone; "private" means need authorization to access|

- **Example**:
  ```bash
  # If the command succeed, it just return "Succeed", but it does not mean that the Indexer node will schedule the Object, or the object is successfully uploaded into PPIO network. You can use the `ppio object status` command to query whether the Object is successfully uploaded.
  # If the command failed, it will return an error code and the cause.

  > ppio object put --copies=3 --duration=864000 --gasprice=10000 --acl=public 98715955d14b4ea129fed7efd1ffdd2ba7a0cc4a2e46160058a740893bbaf2d1
  Succeed!

  ```

### ppio object get

- **Description**:  
  Download an Object to your local storage. There are three situations:
  - If the object is owned by yourself, you can download the Object directly
  - If the Object is owned by others, and the ACL is public, you can download the Object directly
  - If the Object is owned by others, and the ACL is private, you must first get the authorization of the Object (via the `ppio object auth` command), and then download the object via `ppio object get`.

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
  <object-hash>: The hash of the Object
  ```

- **Options**:


  | Option| Default | Description |
  |--|--|--|
  |--gasprice| N/A |price of Gas, unit in wei |
  |--owner| N/A |user-id (Needed when the Object is owned by others and the ACL is private)|
  |--auth| N/A |Signature of Object (Needed when the Object is owned by others and the ACL is private)|

- **Example**:

  ```bash
  # If the command succeed, it just returns "Succeed", Otherwise it returns the error code and the cause.

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
  Copy an Object from other user.

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
  <object-hash>: The hash of the Object to be copied
  ```
- **Options**:


  | Option| Default | Description |
  |--|--|--|
  |--copies|5|The number of copies stored, at least 5|
  |--duration|8640000(100 days)|Life time the object stored in PPIO network, unit in second|
  |--gasprice| N/A |price of Gas, unit in wei|
  |--acl|public|Access control of the Object: "public" means that the Object can be accessed by anyone; "private" means need authorization to access|
  |--owner| N/A |User ID of the Object owner|
  |--auth| N/A | Required to copy other people's Objects, need an Object signature provided by others to authorize|

- **Example**:
  ```bash
  # If the command succeed, it just return "Succeed", but it does not mean that the Indexer will schedule or the Object is successfully copied. You can use the `ppio object status` command to query whether the Object is successfully copied.
  # If the command failed, it will return the error code and the cause.

  > ppio object copy --copies=5 --duration=86400 --gasprice=100 --auth=0x1234 --owner=080a6fdb95cee6f852cb4b061525c866cbbe2cff 98715955d14b4ea129fed7efd1ffdd2ba7a0cc4a2e46160058a740893bbaf2d1
  Succeed!

  ```

### ppio object status

- **Description**:  
  Get status of an Object owned by the user node. It will also show the detail contract information.

- **Usage**:
  ```bash
  ppio object status <object-hash>
  ```

- **Arguments**:
  ```bash
  <object-hash>: The hash of the Object to be queried
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
  Get status of all Objects owned by the user. Unlike `ppio object status`, `ppio object list` just show the segment information, But no detail contract information for the corresponding object

- **Usage**:

  ```bash
  ppio object list
      [--start-page=<start-page>]
      [--page-size=<page-size>]
  ```
- **Options**:


  | Option| Default | Description |
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
  Delete an Object.

- **Usage**:
  ```bash
  ppio object delete <object-hash>
  ```

- **Arguments**:
  ```bash
  <object-hash>: The hash of the Object to be deleted
  ```

- **Example**:
  ```bash
  # If the command succeed, it just return "Succeed", otherwise it return the error code and reason.
  > ppio object delete 98715955d14b4ea129fed7efd1ffdd2ba7a0cc4a2e46160058a740893bbaf2d1
  Succeed!
  ```

### ppio object renew

- **Description**:  
  Republish an Object owned by the user node.

- **Usage**:
  ```bash
  ppio object renew
      [--copies=<copy-num>]
      [--duration=<duration>]
      [--gasprice=<gasprice>]
      [--acl=<acl>]
      <object-hash>
  ```
- **Options**:
  ```bash
  <object-hash>: The hash of the Object to be republished
  ```
- **Options**:


  | Option| Default | Description |
  |--|--|--|
  |--copies|5|The number of stored copies, not less than 5|
  |--duration|8640000(100 days)|Duration the object will be stored in PPIO network, unit in second|
  |--gasprice| N/A |price of Gas, unit in wei|
  |--acl|public|Access control of the Object: "public" means that the Object can be accessed by anyone; "private" means need authorization to access|

- **Example**:
  ```bash
  # If the command succeed, it just return "Succeed", otherwise it return the error code and the cause.
  > ppio object renew --duration=864000 --gasprice=100 --copies=5 --acl=public 98715955d14b4ea129fed7efd1ffdd2ba7a0cc4a2e46160058a740893bbaf2d1
  Succeed!
  ```

### ppio object updateacl

- **Description**:  
  Update ACL information for an Object.

- **Usage**:
  ```bash
  ppio object updateacl
      [--acl=<acl>]
      <object-hash>
  ```

- **Arguments**:
  ```bash
  <object-hash>: The hash of the Object to be updated with ACL information
  ```

- **Options**:


  | Option| Default | Description |
  |--|--|--|
  |--acl|public|Access control of the Object: "public" means that the Object can be accessed by anyone; "private" means need authorization to access|

- **Example**:

  ```bash
  # If the command succeed, it just reutrn "Succeed", otherwise it return the error code and the cause.
  > ppio object updateacl --acl=public 98715955d14b4ea129fed7efd1ffdd2ba7a0cc4a2e46160058a740893bbaf2d1
  Succeed!

  ```

### ppio object auth

- **Description**:  
  Authorize the Object to other user, within a certain duration. If the ACL of the Object is public, the command has no effect.
  The authorization duration cannot exceed the time the user own the file.

- **Usage**:
  ```bash
  ppio object auth
      --accessor=<accessor>
      [--duration=<duration>]
      <object-hash>
  ```
- **Argument**:

  ```bash
  <object-hash>: The hash of the Object to be authorized
- **Options**:
  ```


  | Option| Default | Description |
  |--|--|--|
  |--accessor| N/A |Authorized user's id|
  |--duration|86400(equals a day)|Authorized effective duration, unit in s (second)|

- **Example**:

  ```bash
  # If the command succeed, it return the authorization code in hex string, otherwise it return the error code and the cause.
  > ppio object auth --accessor=002508021221033fb36e1471d2153d0759e14386c6c294b1ad09244841ee8d043eadd1bfe7baaa --duration=86400 98715955d14b4ea129fed7efd1ffdd2ba7a0cc4a2e46160058a740893bbaf2d1
  Auth Info: 667b0377565b0bde135abca46dc724f1e7db610e0d849e06b34d5110d72f427f26ec6250d10f02c46a6fc3c339f0985cc8dd3ace423302bae2d77a4e656f79420198715955d14b4ea129fed7efd1ffdd2ba7a0cc4a2e46160058a740893bbaf2d127000000002508021221033fb36e1471d2153d0759e14386c6c294b1ad09244841ee8d043eadd1bfe7baaa14000000002508021221033fb36e1471d2153d0759e14386c6c294b1ad09244841ee8d043eadd1bfe7baaa63f3b65b00000000
  ```

## ppio status

- **Description**:  
  Show runtime information of the user node.

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
  Manage storage of the user node.

- **Usage**:
  ```bash
  ppio storage SUB-COMMAND
  ```

- **Subcommand**:


  | Subcommand | Description |
  |--|--|
  |[`ppio storage object`](#ppio-storage-object)|Show storage information of an Object|
  |[`ppio storage objects`](#ppio-storage-objects)|Show storage information of all the Objects|
  |[`ppio storage segments`](#ppio-storage-segments)|Show storage information of all the segments|
  |[`ppio storage keep`](#ppio-storage-keep) <Badge text="todo" type="warn" vertical="middle"/>|Keep Object in local storage|
  |[`ppio storage usage`](#ppio-storage-usage) <Badge text="todo" type="warn" vertical="middle"/>|Show usage of local storage|
  |[`ppio storage gc`](#ppio-storage-gc) <Badge text="todo" type="warn" vertical="middle"/>|Clean up objects that are not kept, if the local storage is in short|

### ppio storage object

- **Description**:  
  Show storage information of an Object.

- **Usage**:
  ```bash
  ppio storage object <object-hash>
  ```

- **Arguments**:
  ```bash
  <object-hash>: hash of the Object to be displayed, in hex string
  ```

- **Example**:
  ```bash
  # Show storage information of an Object, including its size, the number of segments, and the id and hashs of each segment.
  > ppio storage keep 7547df322cbaf84fd02248133bf5a1c2fae7296960eced0ef6bde2ff3ef37cf8
  Hash: 7547df322cbaf84fd02248133bf5a1c2fae7296960eced0ef6bde2ff3ef37cf8
  Length: 87041
  Segment Count: 1
  Segment 0 : 6ad3e2278e1251c1a1ebf3f842dcff2caf21d24b94148a8649896f915e574c1e 7547df322cbaf84fd02248133bf5a1c2fae7296960eced0ef6bde2ff3ef37cf8
  ```

### ppio storage objects

- **Description**:  
  Show storage information of all the Objects.

- **Usage**:
  ```bash
  ppio storage objects
  ```

- **Example**:
  ```bash
  # Show storage information of all the Objects, including the hash and size of each object
  > ppio storage objects
  Hash=C9B351CA25F45D9A1D3830F16D987EEEB90668466768A03A38DC592FCA9937EC    Length=16777216
  Hash=E949A1CC67C268D7E5294183B9A57B63BC00A0CC8A22909E83D2AAC181A4A9D6    Length=33554435
  Hash=7547DF322CBAF84FD02248133BF5A1C2FAE7296960ECED0EF6BDE2FF3EF37CF8    Length=87041
  Hash=BFA15DD67653A6C20A871D8F94E2136A4D053E587CF9CD1D5CF88B96C9370E28    Length=132098
  Hash=C7E5A790B4D232C5BB7FF5F4618A2A0D1EBF7A96ACD08F57564BAA471E5671CD    Length=33554432
  ```

### ppio storage segments

- **Description**:  
  Show storage information of all the segments.

- **Usage**:
  ```bash
  ppio storage segments
  ```

- **Example**:
  ```bash
  # Show storage information of all the segments, including id, hash, and size of each segment
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

### ppio storage keep <Badge text="todo" type="warn" vertical="middle"/>

- **Description**:  
  Keep an Object in local storage.

  ::: warning NOTE
  The user's own Objects are automatically kept to local storage space. Files obtained from other users require to be kept to local storage space manually.
  :::

  ```bash
  ppio storage keep <object-hash>
  ```
- **Arguments**:
  ```bash
  <object-hash>: The hash of the Object to be set
  ```
- **Example**:
  ```bash
  # Return success or failure signal
  > ppio storage keep 98715955d14b4ea129fed7efd1ffdd2ba7a0cc4a2e46160058a740893bbaf2d1
  Succeed!
  ```

### ppio storage usage <Badge text="todo" type="warn" vertical="middle"/>

- **Description**:  
  Show usage of local storage.
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

### ppio storage gc <Badge text="todo" type="warn" vertical="middle"/>
- **Description**:  
  Clean up objects that are not kept, if the local storage is in short.
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
  Manage user's wallet.
- **Usage**:
  ```bash
  ppio wallet SUB-COMMAND
  ```
- **Subcommand**:


  | Subcommand | Description |
  |--|--|
  |[`ppio wallet address`](#ppio-wallet-address)|Show wallet address, in hex string|
  |[`ppio wallet balance`](#ppio-wallet-balance)|Show the balance of the wallet address|

### ppio wallet address

- **Description**:  
  Show wallet address.
- **Usage**:
  ```bash
  ppio wallet address
  ```
- **Example**:
  ```bash
  # Return wallet address
  > ppio wallet address
  002508021221033fb36e1471d2153d0759e14386c6c294b1ad09244841ee8d043eadd1bfe7baaa
  ```

### ppio wallet balance

- **Description**:  
  Show the balance of the wallet address.
- **Options**:
  ```bash
  ppio wallet balance
  ```
- **Example**:
  ```bash
  # Returns the balance of the wallet address
  > ppio wallet balance
  1000000000
  ```
