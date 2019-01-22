---
sidebarDepth: 2
displayAllHeaders: true
---

# PPIO CLI Reference
## Overview
PPIO provides commands and subcommands to control a user node in PPIO network.

All commands are called through RPC mode unless otherwise specified. The commands entered by the user will interact with the PPIO service process via `http`.In general, they all have the same options "rpchost" and "rpcport".

Options with the command line will override the ones in the configuration file.

### **init**
**Description**:
Initialize the PPIO service. This is a direct command, not an RPC call. The PPIO service will be initialized according to the specified directory and configuration. If not specified, the directory and configuration will be generated according to the default rules. After initialization, the user can customize the configuration rules of the PPIO by manually modifying the configuration.

**Usage**:
```nohighlight
poss init [--datadir=<value>] [--config=<value>] [--keystore=<value>]
```
**Options**:
--datadir
> Data directory. Used to store logs and  operational data. If not specified, a `.poss` directory will be created in the current user directory to be used as the data directory. The uploaded and downloaded temporary data will also be cached in this directory.

--config
> Configuration file. If not specified, the `poss.conf` file will be generated as the default configuration file in the data directory; if specified, the relevant `poss.conf` configuration file will be generated in the data directory according to the specified configuration file.

--keystore
> wallet keystore file path. If specified, PPIO will copy it to datadir.

**Example**:
```nohighlight
poss init --datadir=./user0 --keystore=./mykeystore.dat
```

**Output**:
Success or error message.
```
initPOSS
initPOSS datadir= ./user0
initPOSS datadir=./user0
config.StroagePath = storage
SetupKeyStore !!!
Succeed!
```

---

### **start**

**Description**:
Start a PPIO service process. This is a direct command, not an RPC call. After startup, the PPIO service process will be running in the background, providing users with RPC services.

**Usage**:
```nohighlight
poss start [--datadir=<value>] [--config=<value>] [--keystore=<value>] [--key-passphrase=<value>]
```

**Options**:
--daemon

> Running with daemon mode, will return from start command immediately and running in the background.

--datadir
> Data directory. Used to store logs and operational data. If not specified, a `.poss` directory will be created in the current user directory to be used as the data directory. The uploaded and downloaded temporary data will also be cached in this directory.

--config
> Configuration file. If not specified, the `poss.conf` file will be generated as the default configuration file in the data directory; if specified, the relevant `poss.conf` configuration file will be generated in the data directory according to the specified configuration file.

--keystore

> wallet keystore file path. If specified, PPIO will copy it to datadir.

--key-passphrase

> passphrase of wallet keystore. If not specified, PPIO will use default passphrase.

**Example**:
```nohighlight
poss start --datadir=./user0 --keypassphrase=123
```

**Output**:
Startup information.

---

### **stop**

**Description**:
Stop PPIO service process.

**Alias**:
* stop-daemon

**Usage**:
```nohighlight
poss stop [--rpchost=<value>] [--rpcport=<value>]
```

**Options**:
--rpchost
> Host of the PPIO service process. The default is 127.0.0.1.

--rpcport
> Port of the PPIO service process. The default is 18060.

**Example**:
```nohighlight
poss stop
```

**Output**:
None.

---

### **api-version**

**Description**:
Checke PPIO CLI version.

**Usage**:
```nohighlight
poss api-version [--rpchost=<value>] [--rpcport=<value>]
```

**Options**:
--rpchost
> Host of the PPIO service process. The default is 127.0.0.1.

--rpcport
> Port of the PPIO service process. The default is 18060.

**Example**:
```nohighlight
poss api-version
```

**Output**:
Version number.
```bash
0.1
```
---

## Bucket

### **create-bucket**

**Description**:
Create a bucket. A bucket is a basic storage container in PPIO, and each user can create up to 100 buckets. In theory, the capacity of a bucket is unlimited, and any number of objects can be stored in one bucket.

**Usage**:
```nohighlight
poss create-bucket --bucket=<value> [--rpchost=<value>] [--rpcport=<value>]
```

**Options**:
--bucket
> Bucket name. The bucket name must be no less than 3 characters long and cannot be more than 63 characters; it cannot contain underscores and uppercase letters; it must start with a lowercase letter or a number.

--rpchost
> Host of the PPIO service process. The default is 127.0.0.1.

--rpcport
> Port of the PPIO service process. The default is 18060.

**Example**:
```nohighlight
poss create-bucket --bucket=bucketname
```

**Output**:
Success or error message.

```bash
createBucket
creating  bucketname
created  bucketname
```

---

### **delete-bucket**

**Description**:
Delete a bucket. The bucket must be empty and no objects are stored in it.

**Usage**:
```nohighlight
poss delete-bucket --bucket=<value> [--rpchost=<value>] [--rpcport=<value>]
```

**Options**:
--bucket
> Bucket name.

--rpchost
> Host of the PPIO service process. The default is 127.0.0.1.

--rpcport
> Port of the PPIO service process. The default is 18060.

**Example**:
```nohighlight
poss delete-bucket --bucket=bucketname
```

**Output**:
Success or error message.
```bash
deleteBucket
deleting  bucketname
deleted  bucketname
```

---

### **list-buckets**

**Description**:
List all buckets created by the current user.

**Usage**:
```nohighlight
poss list-buckets [--rpchost=<value>] [--rpcport=<value>]
```

**Options**:
--rpchost
> Host of the PPIO service process. The default is 127.0.0.1.

--rpcport
> Port of the PPIO service process. The default is 18060.

**Example**:
```nohighlight
poss list-buckets
```

**Output**:
All buckets.
```bash
listBuckets
[test bucketname]
```

---

### **head-bucket**

**Description**:
Determine if the bucket exists.

**Usage**:
```nohighlight
poss head-bucket --bucket=<value> [--rpchost=<value>] [--rpcport=<value>]
```

**Options**:
--bucket
> Bucket name.

--rpchost
> Host of the PPIO service process. The default is 127.0.0.1.

--rpcport
> Port of the PPIO service process. The default is 18060.

**Example**:
```nohighlight
poss head-bucket --bucket=bucketname
```

**Output**:
Exist or not.
```bash
headBucket
heading  bucketname
headed  bucketname
exists
```
---

## Object

### **put-object**

**Description**:
Store an object into PPIO. Objects must be stored in a bucket. Objects are encrypted by slice and uploaded, and each object generates a unique symmetric key to ensure data security.

**Usage**:
```nohighlight
poss put-object --bucket=<value> --key=<value> [--body=<value>] [--chiprice=<value>] [--copies=<value>] [--expires=<value>] [--metadata==<value>] [--rpchost=<value>] [--rpcport=<value>]
```

**Options**:
--bucket
> Bucket name. Store objects in this bucket.

--key
> Object key value. The unique index of the object within the bucket. The key length must be greater than 0 and less than 4096 bytes. You can use this to implement the object's directory

--body
> The file path that needs to be uploaded. Without this parameter, an empty object (which can be thought of as an empty folder) is created inside the bucket. Empty files (0 bytes in size) and files larger than 10G are not supported.

--chiprice
> Store the price of the file. The indexer will schedule the storage miners based on this price, so the user's bid is reasonable, otherwise it may not be able to find a miner who is willing to provide storage services. This parameter is not required when creating an empty object.

--copies
> The number of copies. Must be greater than 1 and less than or equal to 10. The default is 5. This parameter is not required when creating an empty object.

--expires
> Expire date. The object is stored to this date and will be deleted if the user does not choose to extend the storage time after expiration. Supports dates in two formats, such as "2006-01-02" or "2006-01-02T15:04:05.000Z". The current time must be greater than or equal to one day, less than or equal to one year (365 days). This parameter is not required when creating an empty object.

--metadata
> Ancillary data for the object. Can't exceed 4096 bytes.

--rpchost
> Host of the PPIO service process. The default is 127.0.0.1.

--rpcport
> Port of the PPIO service process. The default is 18060.

**Example**:
```nohighlight
poss put-object --bucket=bucketname --key=objkey --body=./test.file --chiprice=100 --expires=2019-12-12 --copies=2 --metadata=thisismeta
```

**Output**:
A permanent task id and transfer progress; or error message.

```bash
Uploading of ./test.file is started:74df8833-7169-41ec-8f48-9e997dbc91b5
progress:put 0/1
progress:put 1572864/100081904
progress:put 9699328/100081904
progress:put 16777216/100081904
progress:put 25296896/100081904
progress:put 33554432/100081904
progress:put 41943040/100081904
progress:put 50200576/100081904
progress:put 57147392/100081904
progress:put 65404928/100081904
progress:put 71827456/100081904
progress:put 80084992/100081904
progress:put 86769664/100081904
progress:put 95551488/100081904
progress:put 100081904/100081904
File ./test.file is successfully uploaded as  Object `bucketname:objkey`.
```

---

### **get-object**

**Description**:
Get an object from the PPIO system to the local.

**Usage**:
```nohighlight
poss get-object --bucket=<value> --key=<value> --outfile=<value> --chiprice=<value> [--rpchost=<value>] [--rpcport=<value>]
```

**Options**:
--bucket
> The bucket in which the object is located.

--key
> The key value of the object.

--outfile
> The file name to which the object is downloaded to the local. Absolute or relative paths are available.

--chiprice
> File download price.

--rpchost
> Host of the PPIO service process. The default is 127.0.0.1.

--rpcport
> Port of the PPIO service process. The default is 18060.

**Example**:
```nohighlight
poss get-object --bucket=bucketname --key=objkey --outfile=./test.file --chiprice=100
```

**Output**:
A permanent task id and dowload progress, or error message.

```bash
Object `bucketname:objkey` is started to download.
0e2765f7-c25c-49a2-b301-f4e946871b7b
progress:get 0/1
progress:get 6029312/100081904
progress:get 12582912/100081904
progress:get 19136512/100081904
progress:get 26607616/100081904
progress:get 33554432/100081904
progress:get 40370176/100081904
progress:get 47185920/100081904
progress:get 53346304/100081904
progress:get 60817408/100081904
progress:get 68026368/100081904
progress:get 74842112/100081904
progress:get 81788928/100081904
progress:get 87818240/100081904
progress:get 94633984/100081904
progress:get 100081904/100081904
progress:get 100081904/100081904
Object `bucketname:objkey` is successfully downloaded as file ./test.file.
```

---

### **head-object**

**Description**:
Get the basic information and metadata of the object.

**Usage**:
```nohighligth
poss head-object --bucket=<value> --key=<value>  [--rpchost=<value>] [--rpcport=<value>]
```

**Options**:
--bucket
> The bucket in which the object is located.

--key
> The key value of the object.

--rpchost
> Host of the PPIO service process. The default is 127.0.0.1.

--rpcport
> Port of the PPIO service process. The default is 18060.

**Example**:
```nohighlight
poss head-object --bucket=bucketname --key=objkey
```

**Output**:
Object metadata or error information.

```bash
headObject
heading  objkey
headed objkey, the metadata is:
{
  "state": 2,
  "length": 100081904,
  "created": "2019-01-18T07:41:57.688453Z",
  "modified": "2019-01-18T07:41:57.688453Z",
  "synchronized": "2019-01-18T07:41:57.688453Z",
  "expires": "2019-12-12T00:00:00.692511Z",
  "metadata": "thisismeta"
}
```

---

### **delete-object**

**Description**:
Remove an object from the PPIO system. The deleter must be the owner of this object.

**Usage**:
```nohighligth
poss delete-object --bucket=<value> --key=<value>  [--rpchost=<value>] [--rpcport=<value>]
```

**Options**:
--bucket
> The bucket in which the object is located.

--key
> The key value of the object.

--rpchost
> Host of the PPIO service process. The default is 127.0.0.1.

--rpcport
> Port of the PPIO service process. The default is 18060.

**Example**:
```nohighlight
poss delete-object --bucket=bucketname --key=objkey
```

**Output**:
A temporary task id and delete progress, or error message.

```bash
deleting of bucketname/dstkey is started
2de718ff-eb3d-4c85-b7af-9d3567bd1d15
progress:delete 0/6
progress:delete 1/1
Object bucketname-dstkey has been successfully deleted.
```

---

### **renew-object**

**Description**:
Update the storage properties of an object, which can be used to increase or decrease the copy, extend the storage time, and change the storage price.

**Usage**:
```nohighlight
poss renew-object --bucket=<value> --key=<value> --chiprice=<value> [--copies=<value>] [--expires=<value>]  [--rpchost=<value>] [--rpcport=<value>]
```

**Options**:
--bucket
> The bucket in which the object is located.

--key
> The key value of the object.

--chiprice
> New storage price. Based on this price, PPIO will re-schedule the miners who can satisfy the service for storage.

--copies
> The number of copies. Must be greater than 1 and less than or equal to 10. The default is 5.

--expires
> New expiration time. Storage time can only be extended and cannot be shortened. Do not pass this parameter if you do not need to change the expiration time. (Do not attempt to keep the storage duration unchanged by passing in the old expiration time, because time errors may cause renew to fail).

--rpchost
> Host of the PPIO service process. The default is 127.0.0.1.

--rpcport
> Port of the PPIO service process. The default is 18060.

**Example**:
```nohighlight
poss renew-object --bucket=bucketname --key=objkey --chiprice=100 --copies=8
```

**Output**:
A temporary task id and renew progress, or error message.

```bash
renew of bucketname:objkey is started
4345f15e-1b81-4bfd-8f25-cc8c86639a17
progress:renew 0/6
progress:renew 6/6
object bucketname:objkey is successfully renewed.
```

---

### **share-object**

**Description**:
Share an object. This method will generate a share code that other users can use to get the object.

**Usage**:
```nohighlight
poss share-object --bucket=<value> --key=<value>  [--rpchost=<value>] [--rpcport=<value>]
```

**Options**:
--bucket
> The bucket in which the object is located.

--key
> The key value of the object.

--rpchost
> Host of the PPIO service process. The default is 127.0.0.1.

--rpcport
> Port of the PPIO service process. The default is 18060.

**Example**:
```nohighlight
poss share-object --bucket=bucketname --key=objkey
```

**Output**:
The sharecode or error message.

```bash
shareObject
share code:
poss://ewogICJrIjogInRvbXBrNlFGUys0NTVXTVVOZUFJMFk2NE4rbHJrMnlHWVVvWVltWUFKRVE9IiwKICAibmFtZSI6ICJvYmprZXkiLAogICJsZW5ndGgiOiAxMDAwODE5MDQsCiAgImkiOiAie1xuICBcIm9iamVjdFwiOiBcIjRmYzllYTg0MjA4MGZmMGUyMjRkZTUzZTY1NTM3ZDY0YWJjMjJiYmU0ZDUwYzU2NTQzNWViMGE0MmMyNzBkMzBcIixcbiAgXCJsZW5ndGhcIjogMTAwMDgxOTA0LFxuICBcImNodW5rc1wiOiBbXG4gICAgXCI5NTIzYzRmODY3NzZhMzlkZTk4NDA2NTgyOGRjNmEzNmJlM2FmMDJmYmY5Zjg1ZWJiOWUxNjExMjFmYjhhM2ZhXCIsXG4gICAgXCIyZDI4ODcyOTVkN2QwNWEwYTgxMDMwYjBhYTY5ZTY0ZDQwMmU4NzdhZDE0MDJkOTNjYTM4YzYwNzdjMjczZTAwXCIsXG4gICAgXCI4YTdjZjZkZWVmNDMzNjA0Nzg3ZDc4NDJkODJmNDQyZDEyOWY2Mzg5YmQ3NmJkNTUyZWQyNzc2ZjgzN2FjNzA2XCIsXG4gICAgXCIyOGY4ZTY1MTAxMzUwYzFmZmE1OTk4NDdjZTg1NTE0ODU5YTgyNTdmMTU4ZTcwZWJkYzQzNDRjZmI3OTZlNDI3XCIsXG4gICAgXCIwYjg4NjM1YmE1OTE3MmE2NWJiMTI4YTg0Y2M2MmE2YzljOTNkM2I1ZmZiYmJkNjIxZTQxZGYxZTVhZTE2ZjAwXCIsXG4gICAgXCJmYWIzZTg0YTA2MzE0ZDA5ZGJjYjIxNGI5MTkyZTQ5MTcyNmRjZjRmZWE4ZGZlYTYzYmU1MTQ0Y2FjMzZkM2YyXCJcbiAgXVxufSIKfQ==
```

---

### **copy-object**

**Description**:
Deep copy objects. Copy object A into object B, download A and re-encrypt it with a new aes key, and upload it to B.

**Usage**:
```nohighlight
poss copy-object --bucket=<value> --key=<value> --copy-source=<value> --chiprice=<value> --expires=<value> [--copies=<value>] [--metadata==<value>] [--rpchost=<value>] [--rpcport=<value>]
```

**Options**:
--bucket
> Bucket. Store objects in this bucket.

--key
> The key value of the object.

--copy-source
> Source object. The source object can come from the user's own object, or it can be a share code from someone else. If it is the user's own object, the format of the source object is: `bucket/key`, which consists of a bucket plus `/` plus the object key. If it is from the share code, you can pass the share code directly.

--chiprice
> Store the price of the file. The indexer will schedule the storage miners based on this price, so the user's bid is reasonable, otherwise it may not be able to find a miner who is willing to provide storage services.

--copies
> The number of copies.

--expires
> Expire date.

--metadata
> Ancillary data for the object.

--rpchost
> Host of the PPIO service process. The default is 127.0.0.1.

--rpcport
> Port of the PPIO service process. The default is 18060.

**Example**:
```nohighlight
poss copy-object --bucket=bucketname --key=dstkey --copy-source=bucketname/srckey --chiprice=100 --expires=2019-12-12
```

**Output**:
A permanent task id and copy progress, or error message.

```bash
bucketname dstkey bucketname/objkey 1 2019-12-12 100  true
Copying of bucketname/objkey is started
0c19491d-e175-4b61-9104-e7a5289fa2d6
progress:copy 0/1
progress:get 12058624/200163808
progress:get 23855104/200163808
progress:get 36438016/200163808
progress:get 48889856/200163808
progress:get 61734912/200163808
progress:get 74055680/200163808
progress:get 85721088/200163808
progress:get 99352576/200163808
progress:put 100081904/200163808
progress:put 107946224/200163808
progress:put 116596976/200163808
progress:put 123543792/200163808
progress:put 132063472/200163808
progress:put 140058864/200163808
progress:put 147792112/200163808
progress:put 154607856/200163808
progress:put 162996464/200163808
progress:put 170336496/200163808
progress:put 177938672/200163808
progress:put 185278704/200163808
progress:put 193405168/200163808
progress:put 200163808/200163808
File bucketname/objkey is successfully Copied as  Object `bucketname:dstkey`.
```

### **get-object-status**

**Description**:
Get the status of the object in PPIO.

**Usage**:
```nohighligth
poss get-object-status --bucket=<value> --key=<value>  [--rpchost=<value>] [--rpcport=<value>]
```

**Options**:
--bucket
> The bucket in which the object is located.

--key
> The key value of the object.

--rpchost
> Host of the PPIO service process. The default is 127.0.0.1.

--rpcport
> Port of the PPIO service process. The default is 18060.

**Example**:
```nohighlight
poss get-object-status --bucket=bucketname --key=objkey
```

**Output**:
A temporary task id and progress, or error message.

```bash
status of bucketname/objkey is started
fcedbd4a-d72f-4c04-9fc2-1fc4a0d72eb8
progress:getstatus 0/6
progress:getstatus 6/6
{
  "bucket": "bucketname",
  "key": "objkey",
  "length": 100081904,
  "create": "2019-01-18T07:41:57.688453Z",
  "expires": "2019-12-12T00:00:00Z",
  "state": "Deal",
  "contracts": [
    {
      "Hash": "9523c4f86776a39de984065828dc6a36be3af02fbf9f85ebb9e161121fb8a3fa",
      "Contracts": [
        {
          "ContractID": "b8009e9cebd4c70bba0402a60166c2e105dfed44d3a60c841d1b0646ed4ab8d9",
          "Status": "SC_AVAILABLE",
          "MinerID": "ppio1QcM4YmKQ55q6NKFT7XR1ek21H3eYWE9zP",
          "UserChiPrice": "100",
          "MinerChiPrice": "100",
          "ChunkSize": 16777216,
          "Funds": "100672000",
          "BeginTime": 1547797317,
          "ExpireTime": 1576108800
        }
      ]
    },
    {
      "Hash": "2d2887295d7d05a0a81030b0aa69e64d402e877ad1402d93ca38c6077c273e00",
      "Contracts": [
        {
          "ContractID": "d9a3d30236800020476a29e10729697b02fd526b6146e4bc595acdf4a538316f",
          "Status": "SC_AVAILABLE",
          "MinerID": "ppio1KgqNbxTiNqKyaahLFjSGGfK2WuJNR4HFb",
          "UserChiPrice": "100",
          "MinerChiPrice": "100",
          "ChunkSize": 16777216,
          "Funds": "100672000",
          "BeginTime": 1547797317,
          "ExpireTime": 1576108800
        }
      ]
    },
    {
      "Hash": "8a7cf6deef433604787d7842d82f442d129f6389bd76bd552ed2776f837ac706",
      "Contracts": [
        {
          "ContractID": "cd02abdb974c76a1ee093c1623299ddfd1a4288c6203f58058c2deddef1e6e47",
          "Status": "SC_AVAILABLE",
          "MinerID": "ppio1QcM4YmKQ55q6NKFT7XR1ek21H3eYWE9zP",
          "UserChiPrice": "100",
          "MinerChiPrice": "100",
          "ChunkSize": 16777216,
          "Funds": "100672000",
          "BeginTime": 1547797317,
          "ExpireTime": 1576108800
        }
      ]
    },
    {
      "Hash": "28f8e65101350c1ffa599847ce85514859a8257f158e70ebdc4344cfb796e427",
      "Contracts": [
        {
          "ContractID": "7d5de27e2d45bd7cb58289178448c89e69ed19cd47047ef1bf0adaa8427bca8e",
          "Status": "SC_AVAILABLE",
          "MinerID": "ppio1KgqNbxTiNqKyaahLFjSGGfK2WuJNR4HFb",
          "UserChiPrice": "100",
          "MinerChiPrice": "100",
          "ChunkSize": 16777216,
          "Funds": "100672000",
          "BeginTime": 1547797317,
          "ExpireTime": 1576108800
        }
      ]
    },
    {
      "Hash": "0b88635ba59172a65bb128a84cc62a6c9c93d3b5ffbbbd621e41df1e5ae16f00",
      "Contracts": [
        {
          "ContractID": "1e1556c54206cc11d066b583c8c658b366d7f2e6bbe658245c8ecd80b07f0564",
          "Status": "SC_AVAILABLE",
          "MinerID": "ppio1QcM4YmKQ55q6NKFT7XR1ek21H3eYWE9zP",
          "UserChiPrice": "100",
          "MinerChiPrice": "100",
          "ChunkSize": 16777216,
          "Funds": "100672000",
          "BeginTime": 1547797317,
          "ExpireTime": 1576108800
        }
      ]
    },
    {
      "Hash": "fab3e84a06314d09dbcb214b9192e491726dcf4fea8dfea63be5144cac36d3f2",
      "Contracts": [
        {
          "ContractID": "13392977a234f2bd5e021d207a97370ebe25823e1514336c9d74102a703c7c5c",
          "Status": "SC_AVAILABLE",
          "MinerID": "ppio1KgqNbxTiNqKyaahLFjSGGfK2WuJNR4HFb",
          "UserChiPrice": "100",
          "MinerChiPrice": "100",
          "ChunkSize": 16195824,
          "Funds": "97526000",
          "BeginTime": 1547797317,
          "ExpireTime": 1576108800
        }
      ]
    }
  ]
}
get object bucketname:objkey status successfully.
```

---

### **get-object-status-sync**

**Description**:
Get the status of the object in PPIO. Synchronous mode.

**Usage**:
```nohighligth
poss get-object-status-sync --bucket=<value> --key=<value>  [--rpchost=<value>] [--rpcport=<value>]
```

**Options**:
--bucket
> The bucket in which the object is located.

--key
> The key value of the object.

--rpchost
> Host of the PPIO service process. The default is 127.0.0.1.

--rpcport
> Port of the PPIO service process. The default is 18060.

**Example**:
```nohighlight
poss get-object-status-sync --bucket=bucketname --key=objkey
```

**Output**:
Object status information, or error information.

```bash
{
  "bucket": "bucketname",
  "key": "objkey",
  "length": 100081904,
  "create": "2019-01-18T07:41:57.688453Z",
  "expires": "2019-12-12T00:00:00Z",
  "state": "Deal",
  "contracts": [
    {
      "Hash": "9523c4f86776a39de984065828dc6a36be3af02fbf9f85ebb9e161121fb8a3fa",
      "Contracts": [
        {
          "ContractID": "b8009e9cebd4c70bba0402a60166c2e105dfed44d3a60c841d1b0646ed4ab8d9",
          "Status": "SC_AVAILABLE",
          "MinerID": "ppio1QcM4YmKQ55q6NKFT7XR1ek21H3eYWE9zP",
          "UserChiPrice": "100",
          "MinerChiPrice": "100",
          "ChunkSize": 16777216,
          "Funds": "100672000",
          "BeginTime": 1547797317,
          "ExpireTime": 1576108800
        }
      ]
    },
    {
      "Hash": "2d2887295d7d05a0a81030b0aa69e64d402e877ad1402d93ca38c6077c273e00",
      "Contracts": [
        {
          "ContractID": "d9a3d30236800020476a29e10729697b02fd526b6146e4bc595acdf4a538316f",
          "Status": "SC_AVAILABLE",
          "MinerID": "ppio1KgqNbxTiNqKyaahLFjSGGfK2WuJNR4HFb",
          "UserChiPrice": "100",
          "MinerChiPrice": "100",
          "ChunkSize": 16777216,
          "Funds": "100672000",
          "BeginTime": 1547797317,
          "ExpireTime": 1576108800
        }
      ]
    },
    {
      "Hash": "8a7cf6deef433604787d7842d82f442d129f6389bd76bd552ed2776f837ac706",
      "Contracts": [
        {
          "ContractID": "cd02abdb974c76a1ee093c1623299ddfd1a4288c6203f58058c2deddef1e6e47",
          "Status": "SC_AVAILABLE",
          "MinerID": "ppio1QcM4YmKQ55q6NKFT7XR1ek21H3eYWE9zP",
          "UserChiPrice": "100",
          "MinerChiPrice": "100",
          "ChunkSize": 16777216,
          "Funds": "100672000",
          "BeginTime": 1547797317,
          "ExpireTime": 1576108800
        }
      ]
    },
    {
      "Hash": "28f8e65101350c1ffa599847ce85514859a8257f158e70ebdc4344cfb796e427",
      "Contracts": [
        {
          "ContractID": "7d5de27e2d45bd7cb58289178448c89e69ed19cd47047ef1bf0adaa8427bca8e",
          "Status": "SC_AVAILABLE",
          "MinerID": "ppio1KgqNbxTiNqKyaahLFjSGGfK2WuJNR4HFb",
          "UserChiPrice": "100",
          "MinerChiPrice": "100",
          "ChunkSize": 16777216,
          "Funds": "100672000",
          "BeginTime": 1547797317,
          "ExpireTime": 1576108800
        }
      ]
    },
    {
      "Hash": "0b88635ba59172a65bb128a84cc62a6c9c93d3b5ffbbbd621e41df1e5ae16f00",
      "Contracts": [
        {
          "ContractID": "1e1556c54206cc11d066b583c8c658b366d7f2e6bbe658245c8ecd80b07f0564",
          "Status": "SC_AVAILABLE",
          "MinerID": "ppio1QcM4YmKQ55q6NKFT7XR1ek21H3eYWE9zP",
          "UserChiPrice": "100",
          "MinerChiPrice": "100",
          "ChunkSize": 16777216,
          "Funds": "100672000",
          "BeginTime": 1547797317,
          "ExpireTime": 1576108800
        }
      ]
    },
    {
      "Hash": "fab3e84a06314d09dbcb214b9192e491726dcf4fea8dfea63be5144cac36d3f2",
      "Contracts": [
        {
          "ContractID": "13392977a234f2bd5e021d207a97370ebe25823e1514336c9d74102a703c7c5c",
          "Status": "SC_AVAILABLE",
          "MinerID": "ppio1KgqNbxTiNqKyaahLFjSGGfK2WuJNR4HFb",
          "UserChiPrice": "100",
          "MinerChiPrice": "100",
          "ChunkSize": 16195824,
          "Funds": "97526000",
          "BeginTime": 1547797317,
          "ExpireTime": 1576108800
        }
      ]
    }
  ]
}
```

---

### **list-objects**

**Description**:
List all the objects in a bucket.

**Usage**:
```nohighligth
poss list-objects --bucket=<value> [--rpchost=<value>] [--rpcport=<value>]
```

**Options**:
--bucket
> Bucket name.

--rpchost
> Host of the PPIO service process. The default is 127.0.0.1.

--rpcport
> Port of the PPIO service process. The default is 18060.

**Example**:
```nohighligth
poss list-objects --bucket=bucketname
```

**Output**:
All objects in the bucket.

```bash
[
  {
    "bucket": "bucketname",
    "key": "dstkey",
    "status": "End",
    "length": 100081904,
    "isdir": false,
    "created": "2019-01-08T12:26:33.585067Z",
    "modified": "2019-01-08T12:26:33.585067Z",
    "synchronized": "2019-01-17T06:52:45.002692Z",
    "expires": "2019-01-12T00:00:01Z"
  },
  {
    "bucket": "bucketname",
    "key": "objkey",
    "status": "Deal",
    "length": 100081904,
    "isdir": false,
    "created": "2019-01-18T07:41:57.688453Z",
    "modified": "2019-01-18T07:41:57.688453Z",
    "synchronized": "2019-01-18T12:02:33.022725Z",
    "expires": "2019-12-12T00:00:00Z"
  }
]

---

### **move-object**

**Description**:
Move the object. The object can be moved within the bucket or moved from the bucket to another bucket.

**Usage**:
```nohighlight
poss move-object --bucket=<value> --key=<value> --move-source=<value> [--rpchost=<value>] [--rpcport=<value>]
```

**Options**:
--bucket
> Bucket name.

--key
> New key value of the object.

--move-source
> Source object. The format of the source object is: `bucket/key`.

--rpchost
> Host of the PPIO service process. The default is 127.0.0.1.

--rpcport
> Port of the PPIO service process. The default is 18060.

**Example**:
```nohighlight
poss move-object --bucket=bucketname --key=dstkey --move-source=bucketname/srckey
```

**Output**:
Success or error message.

```bash
moveObject
move successfully
```

---

### **put-object-funds**

**Description**:
Estimate the cost of storing an object.

**Usage**:
```nohighlight
poss put-object-funds --object-size=<value> --expires=<value> [--copies=<copies>] [--rpchost=<value>] [--rpcport=<value>]
```

**Options**:
--object-size
> Object size. Empty files (0 bytes in size) and files larger than 10G are not supported.

--copies
> The number of copies.

--expires
> Expire date.

--rpchost
> Host of the PPIO service process. The default is 127.0.0.1.

--rpcport
> Port of the PPIO service process. The default is 18060.

**Example**:
```nohighlight
poss put-object-funds --object-size=12345678 --expires=2019-12-12 --copies=2
```

**Output**:
Store and dispatch charge, or error message.

```bash
putObjectFunds
funds: {3733500 50}
```

---

### **get-object-funds**

**Description**:
Estimate the cost of downloading an object.

**Usage**:
```nohighlight
poss get-object-funds --object-size=<value> [--rpchost=<value>] [--rpcport=<value>]
```

**Options**:
--object-size
> Size of Object.

--rpchost
> Host of the PPIO service process. The default is 127.0.0.1.

--rpcport
> Port of the PPIO service process. The default is 18060.

**Example**:
```nohighlight
poss get-object-funds --object-size=12345678
```

**Output**:
Download and dispatch charge, or error message.

```bash
putObjectFunds
funds: {950 10}
```

---

### **delete-object-refunds**

**Description**:
Estimated to delete the cost of returning an object.

**Usage**:
```nohighlight
poss delete-object-refunds --bucket=<value> --key=<value> [--rpchost=<value>] [--rpcport=<value>]
```

**Options**:
--bucket
> The bucket in which the object is located.

--key
> The key value of the object.

--rpchost
> Host of the PPIO service process. The default is 127.0.0.1.

--rpcport
> Port of the PPIO service process. The default is 18060.

**Example**:
```nohighlight
poss delete-object-refunds --bucket=bucketname --key=objkey
```

**Output**:
Refunds or error messages.

```bash
putObjectFunds
funds: 6008860
```

---

## Task

### **list-tasks**

**Description**:
List all permanent tasks.

**Usage**:
```nohighligth
poss list-tasks [--rpchost=<value>] [--rpcport=<value>]
```

**Options**:
--rpchost
> Host of the PPIO service process. The default is 127.0.0.1.

--rpcport
> Port of the PPIO service process. The default is 18060.

**Example**:
```nohighlight
poss list-tasks
```

**Output**:
Permanent task list.

```bash
listTasks
[
  {
    "id": "60ce5610-b2c7-41f1-bb0b-269dd7f8377c",
    "type": "Put",
    "state": "Finished",
    "from": "./verifier.log",
    "to": "bucketname/objkey3",
    "total": 100081904,
    "finished": 100081904,
    "create": "2019-01-16T12:46:33.254817Z",
    "error": ""
  },
  {
    "id": "f6e26214-c1d6-4236-89b8-771de5a67acd",
    "type": "Put",
    "state": "Error",
    "from": "./verifier.log",
    "to": "bucketname/objkey",
    "total": 100081904,
    "finished": 0,
    "create": "2019-01-16T12:03:41.655511Z",
    "error": "job queue full"
  }
]
```

---

### **pause-task**

**Description**:
Pause a permanent task.

**Usage**:
```nohighlight
poss pause-task --task=<value> [--rpchost=<value>] [--rpcport=<value>]
```

**Options**:
--task
> Task id. Must be a permanent task in the running state before it can be suspended.

--rpchost
> Host of the PPIO service process. The default is 127.0.0.1.

--rpcport
> Port of the PPIO service process. The default is 18060.

**Example**:
```nohighlight
poss pause-task --task=d7e746fc-9cc7-4b5f-8375-992f69972ac8
```

**Output**:
Success or error message.

```bash
pauseTask
succeed to pause task: d7e746fc-9cc7-4b5f-8375-992f69972ac8
```

On task running client will get output:

```bash
progress:put 0/1
progress:put 1441792/100081904
progress:put 10354688/100081904
progress:put 17563648/100081904
progress:put 25690112/100081904
progress:put 33554432/100081904
progress:put 41680896/100081904
progress:put 50331648/100081904
{
  "Action": "put",
  "TotalSubJobs": 6,
  "FinishedSubJobs": 2,
  "TotalBytes": 100081904,
  "FinishedBytes": 50331648,
  "JobState": "Paused",
  "Err": "job is aborted",
  "CurrentSubJobProgress": null,
  "ExResult": ""
}
progress err Paused
407006: progress err Paused
```

---

### **resume-task**

**Description**:
Resume a paused state task.

**Usage**:
```nohighlight
poss resume-task --task=<value> [--rpchost=<value>] [--rpcport=<value>]
```

**Options**:
--task
> Task id. Must be a permanent task in the suspended state before it can be recovered.

--rpchost
> Host of the PPIO service process. The default is 127.0.0.1.

--rpcport
> Port of the PPIO service process. The default is 18060.

**Example**:
```nohighlight
poss resume-task --task=d7e746fc-9cc7-4b5f-8375-992f69972ac8
```

**Output**:
Resume success and task progress, or error message.

```bash
restartTask
restart ok
progress:put 33554432/100081904
progress:put 41943040/100081904
progress:put 50069504/100081904
progress:put 57147392/100081904
progress:put 66060288/100081904
progress:put 72744960/100081904
progress:put 80478208/100081904
progress:put 87949312/100081904
progress:put 96337920/100081904
progress:put 100081904/100081904
```

---

### **delete-task**

**Description**:
Delete a permanent task. Users cannot directly delete a running task. If you need to delete a running task, you must pause it.

**Usage**:
```nohighlight
poss delete-task --task=<value> [--rpchost=<value>] [--rpcport=<value>]
```

**Options**:
--task
> Task id. The task must be a permanent task of suspension, completion, or error status.

--rpchost
> Host of the PPIO service process. The default is 127.0.0.1.

--rpcport
> Port of the PPIO service process. The default is 18060.

**Example**:
```nohighlight
poss delete-task --task=d7e746fc-9cc7-4b5f-8375-992f69972ac8
```

**Output**:
A temporary task id and delete progress, or error message.

```bash
deleteTask
progress:delete-task 0/1
progress:delete-task 1/1
succeed to delete task: d7e746fc-9cc7-4b5f-8375-992f69972ac8
```

---

### **delete-task-sync**

**Description**:
Delete a permanent task. Users cannot directly delete a running task. If you need to delete a running task, you must pause it. Synchronous call.

**Usage**:
```nohighlight
poss delete-task-sync --task=<value> [--rpchost=<value>] [--rpcport=<value>]
```

**Options**:
--task
> Task id. The task must be a permanent task of suspension, completion, or error status.

--rpchost
> Host of the PPIO service process. The default is 127.0.0.1.

--rpcport
> Port of the PPIO service process. The default is 18060.

**Example**:
```nohighlight
poss delete-task-sync --task=d7e746fc-9cc7-4b5f-8375-992f69972ac8
```

**Output**:
Success or error message.

```bash
deleteTask
succeed to delete task: fceeb00d-7e5c-4a9b-ad49-9ff18f1c1269
```

---

## Indexdata

### **push-indexdata**

**Description**:
Store `indexdata` in the PPIO system. The `indexdata` will be uploaded to the PPIO system as a normal file. The storage chiprice will be obtained from the PPIO oracle. The storage time is one year (365 days) and the copy is the default 5.

**Usage**:
```nohighlight
poss push-indexdata [--rpchost=<value>] [--rpcport=<value>]
```

**Options**:
--rpchost
> Host of the PPIO service process. The default is 127.0.0.1.

--rpcport
> Port of the PPIO service process. The default is 18060.

**Example**:
```nohighlight
poss push-indexdata
```

**Output**:
Root chunk hash and transfer progress, or error message.

```bash
pushIndexdata
root hash:  c6c41d40839f8367136c31e8864b0214386d606de4f89cf07795f16d5ad78d14517
progress:push-indexdata 0/1
progress:push-indexdata 2095/2095
```

---

### **pull-indexdata**

**Description**:
Downloading indexdata from the PPIO system to the local will overwrite the local indexdata. Download chiprice will be obtained from the PPIO oracle. Commonly used to replace the device, synchronize indexdata.

**Usage**:
```nohighlight
poss pull-indexdata [--rpchost=<value>] [--rpcport=<value>]
```

**Options**:
--rpchost
> Host of the PPIO service process. The default is 127.0.0.1.

--rpcport
> Port of the PPIO service process. The default is 18060.

**Example**:
```nohighlight
poss pull-indexdata
```

**Output**:
Root chunk hash and transfer progress, or error message.

```bash
pullIndexdata
root hash:  c6c41d40839f8367136c31e8864b0214386d606de4f89cf07795f16d5ad78d14517
progress:pull-indexdata 0/1
progress:pull-indexdata 2096/2096
```

---

### **import-root-hash**

**Description**:
Import the root chunk hash. Commonly used to replace the device, synchronize indexdata. After importing the root chunk hash, perform `pull-indexdata` to synchronize the index data in PPIO to the local.

**Usage**:
```nohighlight
poss import-root-hash --root-hash=<value> [--rpchost=<value>] [--rpcport=<value>]
```

**Options**:
--root-hash
> Root chunk hash. Usually obtained from `export-root-hash`.

--rpchost
> Host of the PPIO service process. The default is 127.0.0.1.

--rpcport
> Port of the PPIO service process. The default is 18060.

**Example**:
```nohighlight
poss import-root-hash --root-hash=8b2ffb36593ef8f8ba16855cece4ab4d6c2c73cb4269edec8f0f583c81736322517
```

**Output**:
Success or error message.

```bash
importRootHash
import ok
```

---

### **export-root-hash**

**Description**:
Export the root chunk hash.

**Usage**:
```nohighlight
poss export-root-hash [--rpchost=<value>] [--rpcport=<value>]
```

**Options**:
--rpchost
> Host of the PPIO service process. The default is 127.0.0.1.

--rpcport
> Port of the PPIO service process. The default is 18060.

**Example**:
```nohighlight
poss export-root-hash
```

**Output**:
Root chunk hash or error message.

```bash
exportRootHash
root:
a949f2337afe972be6e558f21db0dd9303ca90787a15333e641da8c95d39c4a70
```

---

## **net**

### **id**

**Description**:
Get the peer id of the current PPIO node.

**Usage**:
```nohighlight
poss net id [--rpchost=<value>] [--rpcport=<value>]
```

**Options**:
--rpchost
> Host of the PPIO service process. The default is 127.0.0.1.

--rpcport
> Port of the PPIO service process. The default is 18060.

**Example**:
```nohighlight
poss net id
```

**Output**:
Peer id or error message.

```bash
get local host peer id
peer id: 00250802122102b7618f29fbec6ba0cb407ceb0aff4a2b5a6b1a33cf0f2773a956cb1d0924421e
```
---

### **peers**

**Description**:
Obtain the node connection status of the current PPIO node in the PPIO network.

**Usage**:
```nohighlight
poss net peers [--rpchost=<value>] [--rpcport=<value>]
```

**Options**:
--rpchost
> Host of the PPIO service process. The default is 127.0.0.1.

--rpcport
> Port of the PPIO service process. The default is 18060.

**Example**:
```nohighlight
poss net peers
```

**Output**:
Nodes information or error information.

```bash
netPeers
00250802122102ee1ee28040a7ac46cf4328c648caa456caa3b74b6948246201c95a461cb27e92, Neighbor, 1, 1547813646075
00250802122103f940c8255c896971f911e62d18c95c1042c4c88eb1106dc43ad0ee1a1d163f27, Neighbor, 1, 1547813646024
0025080212210230a471de08f810db4e3ba373d506b9039b776f45fbad1c3e73881dce4a66af1e, Deprecated, 1, 1546067888494
002508021221025f838d129fd2a464e95dc7cb28dab51a252eee05d4cf21f3e4b6aa64f5c5afa0, Deprecated, 1, 1546067888546
0025080212210309726a5d82761713653145d338c18be15d5c3981cb9ce366ca62270155d3309e, Deprecated, 1, 1546067888600
0025080212210325bedc3742dd813cc07dc7b4524a150be606f6e649db105fbc01e825b3ae9d5d, Deprecated, 9223372036854775807, 0
```
---

### **servers**

**Description**:
Obtain the information of server nodes used by current PPIO node.

**Usage**:
```nohighlight
poss net servers [--rpchost=<value>] [--rpcport=<value>]
```

**Options**:
--rpchost
> Host of the PPIO service process. The default is 127.0.0.1.

--rpcport
> Port of the PPIO service process. The default is 18060.

**Example**:
```nohighlight
poss net servers
```

**Output**:
The information of server nodes or error information.

```bash
Servers listed:
 Indexers
[0]: \[name=indexer, addr=[IP=127.0.0.1, tpcport=8030, tpcport=8030]]
Verifiers
[0]: \[name=verifier, addr=[IP=127.0.0.1, tpcport=8040, tpcport=8040]]

Indexers: 1
0: indexer 127.0.0.1:8030:8030:18030 00250802122102ec8e7f2675863c26ba5f61c7b7972bd3a5c4a8276566de829390a6faf83470fc zone=0
Verifiers: 1
0: verifier 127.0.0.1:8040:8040:18040 00250802122102bd87be3c9693fecf0266ebb062bffcc53399ef8276458cc29aa3d4560d852aca zone=0
```

---
## Wallet
### *wallet-account**

**Description**:
Get the wallet account of the current PPIO node.

**Usage**:
```nohighlight
poss wallet-accunt [--rpchost=<value>] [--rpcport=<value>]
```

**Options**:
--rpchost
> Host of the PPIO service process. The default is 127.0.0.1.

--rpcport
> Port of the PPIO service process. The default is 18060.

**Example**:
```nohighlight
poss wallet-accunt
```

**Output**:

The wallet account or error message.

```bash
exportWalletAccount
ppio1RE2Ci5NkWeB8RCtktVvQfWjnbRymYTGLp
```
