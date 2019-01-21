---
sidebarDepth: 2
displayAllHeaders: true
---

# CLI Reference
## Overview
PPIO provides commands and subcommands to control a user node in PPIO network.

All commands are called through RPC mode unless otherwise specified. The commands entered by the user will interact with the POSS service process via `http`.In general, they all have the same options "rpchost" and "rpcport".

Options with the command line will override the ones in the configuration file.

::: warning About price
The concept of `chiprice` is very similar to the `gasprice` in Ethereum. And the units of all prices in the following documents are `wei`. `wei` is a basic unit of PPIO coin. The conversion relationship between wei and ppcoin is as follows:
 **1 PPcoin = 10<sup>18</sup>wei = 10<sup>15</sup>Kwei = 10<sup>12</sup>Mwei = 10<sup>9</sup>Gwei = 10<sup>6</sup>Twei = 10<sup>3</sup>Pwei**
:::

### **init**
**Description**:
Initialize the POSS service. This is a direct command, not an RPC call. The POSS service will be initialized according to the specified directory and configuration. If not specified, the directory and configuration will be generated according to the default rules. After initialization, the user can customize the configuration rules of the POSS by manually modifying the configuration.

**Usage**:
```nohighlight
poss init [--datadir=<value>] [--config=<value>]
```
**Options**:
--datadir
> Data directory. Used to store logs and  operational data. If not specified, a `.poss` directory will be created in the current user directory to be used as the data directory. The uploaded and downloaded temporary data will also be cached in this directory.

--config
> Configuration file. If not specified, the `poss.conf` file will be generated as the default configuration file in the data directory; if specified, the relevant `poss.conf` configuration file will be generated in the data directory according to the specified configuration file.

**Example**:
```nohighlight
poss init --datadir=./user0
```

**Output**:
Success or error message.

---

### **start**

**Description**:
Start a POSS service process. This is a direct command, not an RPC call. After startup, the POSS service process resides in the background, providing users with RPC services.

**Alias**:
* start-daemon

**Usage**:
```nohighlight
poss start [--datadir=<value>] [--config=<value>]
```

**Options**:
--datadir
> Data directory. Used to store logs and  operational data. If not specified, a `.poss` directory will be created in the current user directory to be used as the data directory. The uploaded and downloaded temporary data will also be cached in this directory.

--config
> Configuration file. If not specified, the `poss.conf` file will be generated as the default configuration file in the data directory; if specified, the relevant `poss.conf` configuration file will be generated in the data directory according to the specified configuration file.

**Example**:
```nohighlight
poss start --datadir=./user0
```

**Output**:
Startup information.

---

### **stop**

**Description**:
Stop POSS service process.

**Alias**:
* stop-daemon

**Usage**:
```nohighlight
poss stop [--rpchost=<value>] [--rpcport=<value>]
```

**Options**:
--rpchost
> Address of the POSS service process. The default is 127.0.0.1.

--rpcport
> Port of the POSS service process. The default is 18060.

**Example**:
```nohighlight
poss stop
```

**Output**:
None.

---

### **api-version**

**Description**:
POSS CLI version.

**Usage**:
```nohighlight
poss api-version [--rpchost=<value>] [--rpcport=<value>]
```

**Options**:
--rpchost
> Address of the POSS service process. The default is 127.0.0.1.

--rpcport
> Port of the POSS service process. The default is 18060.

**Example**:
```nohighlight
poss api-version
```

**Output**:
Version number.

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
> Address of the POSS service process. The default is 127.0.0.1.

--rpcport
> Port of the POSS service process. The default is 18060.

**Example**:
```nohighlight
poss create-bucket --bucket=bucketname
```

**Output**:
Success or error message.

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
> Address of the POSS service process. The default is 127.0.0.1.

--rpcport
> Port of the POSS service process. The default is 18060.

**Example**:
```nohighlight
poss delete-bucket --bucket=bucketname
```

**Output**:
Success or error message.

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
> Address of the POSS service process. The default is 127.0.0.1.

--rpcport
> Port of the POSS service process. The default is 18060.

**Example**:
```nohighlight
poss list-buckets
```

**Output**:
All buckets.

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
> Address of the POSS service process. The default is 127.0.0.1.

--rpcport
> Port of the POSS service process. The default is 18060.

**Example**:
```nohighlight
poss head-bucket --bucket=bucketname
```

**Output**:
Exist or not.

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
> Address of the POSS service process. The default is 127.0.0.1.

--rpcport
> Port of the POSS service process. The default is 18060.

**Example**:
```nohighlight
poss put-object --bucket=bucketname --key=objkey --body=./test.file --chiprice=100 --expires=2019-12-12 --copies=2 --metadata=thisismeta
```

**Output**:
Task id and transfer progress; or error message.

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
> Address of the POSS service process. The default is 127.0.0.1.

--rpcport
> Port of the POSS service process. The default is 18060.

**Example**:
```nohighlight
poss get-object --bucket=bucketname --key=objkey --outfile=./test.file --chiprice=100
```

**Output**:
Task id and transfer progress; or error message.

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
> Address of the POSS service process. The default is 127.0.0.1.

--rpcport
> Port of the POSS service process. The default is 18060.

**Example**:
```nohighlight
poss head-object --bucket=bucketname --key=objkey
```

**Output**:
Object data or error information.

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
> Address of the POSS service process. The default is 127.0.0.1.

--rpcport
> Port of the POSS service process. The default is 18060.

**Example**:
```nohighlight
poss delete-object --bucket=bucketname --key=objkey
```

**Output**:
Task id deletion progress; or error message.

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
> Address of the POSS service process. The default is 127.0.0.1.

--rpcport
> Port of the POSS service process. The default is 18060.

**Example**:
```nohighlight
poss renew-object --bucket=bucketname --key=objkey --chiprice=100 --copies=8
```

**Output**:
Task id and change progress; or error message.

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
> Address of the POSS service process. The default is 127.0.0.1.

--rpcport
> Port of the POSS service process. The default is 18060.

**Example**:
```nohighlight
poss share-object --bucket=bucketname --key=objkey
```

**Output**:
Sharing code or error message.

---

### **copy-object**

**Description**:
Deep copy objects. Copy object A into object B, download A and re-encrypt it, and upload it to B.

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
> Address of the POSS service process. The default is 127.0.0.1.

--rpcport
> Port of the POSS service process. The default is 18060.

**Example**:
```nohighlight
poss copy-object --bucket=bucketname --key=dstkey --copy-source=bucketname/srckey --chiprice=100 --expires=2019-12-12
```

**Output**:
Task id and copy progress; or error message.

### **get-object-status**

**Description**:
Get the state of the object in PPIO.

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
> Address of the POSS service process. The default is 127.0.0.1.

--rpcport
> Port of the POSS service process. The default is 18060.

**Example**:
```nohighlight
poss get-object-status --bucket=bucketname --key=objkey
```

**Output**:
Task id and progress; or error message.

---

### **get-object-status-sync**

**Description**:
Get the state of the object in PPIO. Synchronous mode.

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
> Address of the POSS service process. The default is 127.0.0.1.

--rpcport
> Port of the POSS service process. The default is 18060.

**Example**:
```nohighlight
poss get-object-status-sync --bucket=bucketname --key=objkey
```

**Output**:
Object status information; or error information.

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
> Address of the POSS service process. The default is 127.0.0.1.

--rpcport
> Port of the POSS service process. The default is 18060.

**Example**:
```nohighligth
poss list-objects --bucket=bucketname
```

**Output**:
All objects in the bucket.

---

### **move-object**

**Description**:
Move the object. It can be moved within the bucket or moved from the bucket to another bucket.

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
> Address of the POSS service process. The default is 127.0.0.1.

--rpcport
> Port of the POSS service process. The default is 18060.

**Example**:
```nohighlight
poss move-object --bucket=bucketname --key=dstkey --move-source=bucketname/srckey
```

**Output**:
Success or error message.

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
> Address of the POSS service process. The default is 127.0.0.1.

--rpcport
> Port of the POSS service process. The default is 18060.

**Example**:
```nohighlight
poss put-object-funds --object-size=12345678 --expires=2019-12-12 --copies=2
```

**Output**:
Expense breakdown or error message.

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
> Address of the POSS service process. The default is 127.0.0.1.

--rpcport
> Port of the POSS service process. The default is 18060.

**Example**:
```nohighlight
poss get-object-funds --object-size=12345678
```

**Output**:
Expense breakdown or error message.

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
> Address of the POSS service process. The default is 127.0.0.1.

--rpcport
> Port of the POSS service process. The default is 18060.

**Example**:
```nohighlight
poss delete-object-refunds --bucket=bucketname --key=objkey
```

**Output**:
Returned fees or error messages.

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
> Address of the POSS service process. The default is 127.0.0.1.

--rpcport
> Port of the POSS service process. The default is 18060.

**Example**:
```nohighlight
poss list-tasks
```

**Output**:
Permanent task list.

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
> Address of the POSS service process. The default is 127.0.0.1.

--rpcport
> Port of the POSS service process. The default is 18060.

**Example**:
```nohighlight
poss pause-task --task=d7e746fc-9cc7-4b5f-8375-992f69972ac8
```

**Output**:
Success or error message.

---

### **resume-task**

**Description**:
Resume a suspended state task.

**Usage**:
```nohighlight
poss resume-task --task=<value> [--rpchost=<value>] [--rpcport=<value>]
```

**Options**:
--task
> Task id. Must be a permanent task in the suspended state before it can be recovered.

--rpchost
> Address of the POSS service process. The default is 127.0.0.1.

--rpcport
> Port of the POSS service process. The default is 18060.

**Example**:
```nohighlight
poss resume-task --task=d7e746fc-9cc7-4b5f-8375-992f69972ac8
```

**Output**:
Recovery success and task progress; or error message.

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
> Address of the POSS service process. The default is 127.0.0.1.

--rpcport
> Port of the POSS service process. The default is 18060.

**Example**:
```nohighlight
poss delete-task --task=d7e746fc-9cc7-4b5f-8375-992f69972ac8
```

**Output**:
Temporary task id and progress; or error message.

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
> Address of the POSS service process. The default is 127.0.0.1.

--rpcport
> Port of the POSS service process. The default is 18060.

**Example**:
```nohighlight
poss delete-task-sync --task=d7e746fc-9cc7-4b5f-8375-992f69972ac8
```

**Output**:
Success or error message.

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
> Address of the POSS service process. The default is 127.0.0.1.

--rpcport
> Port of the POSS service process. The default is 18060.

**Example**:
```nohighlight
poss push-indexdata
```

**Output**:
Root chunk hash and transfer progress; or error message.

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
> Address of the POSS service process. The default is 127.0.0.1.

--rpcport
> Port of the POSS service process. The default is 18060.

**Example**:
```nohighlight
poss pull-indexdata
```

**Output**:
Root chunk hash and transfer progress; or error message.

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
> Address of the POSS service process. The default is 127.0.0.1.

--rpcport
> Port of the POSS service process. The default is 18060.

**Example**:
```nohighlight
poss import-root-hash --root-hash=8b2ffb36593ef8f8ba16855cece4ab4d6c2c73cb4269edec8f0f583c81736322517
```

**Output**:
Success or error message.

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
> Address of the POSS service process. The default is 127.0.0.1.

--rpcport
> Port of the POSS service process. The default is 18060.

**Example**:
```nohighlight
poss export-root-hash
```

**Output**:
Root chunk hash or error message.

---

## **net**

### **id**

**Description**:
Get the id of the current POSS node.

**Usage**:
```nohighlight
poss net id [--rpchost=<value>] [--rpcport=<value>]
```

**Options**:
--rpchost
> Address of the POSS service process. The default is 127.0.0.1.

--rpcport
> Port of the POSS service process. The default is 18060.

**Example**:
```nohighlight
poss net id
```

**Output**:
Peer id or error message.

### **peers**

**Description**:
Obtain the node connection status of the current POSS node in the PPIO network.

**Usage**:
```nohighlight
poss net peers [--rpchost=<value>] [--rpcport=<value>]
```

**Options**:
--rpchost
> Address of the POSS service process. The default is 127.0.0.1.

--rpcport
> Port of the POSS service process. The default is 18060.

**Example**:
```nohighlight
poss net peers
```

**Output**:
Node information or error information.

### **servers**

**Description**:
Obtain the service node information corresponding to the current POSS node.

**Usage**:
```nohighlight
poss net servers [--rpchost=<value>] [--rpcport=<value>]
```

**Options**:
--rpchost
> Address of the POSS service process. The default is 127.0.0.1.

--rpcport
> Port of the POSS service process. The default is 18060.

**Example**:
```nohighlight
poss net servers
```

**Output**:
Service node information or error information.

---
## Wallet
### **wallet-key**

**Description**:
Get the wallet private key of the current POSS node.

**Usage**:
```nohighlight
poss wallet-key [--rpchost=<value>] [--rpcport=<value>]
```

**Options**:
--rpchost
> Address of the POSS service process. The default is 127.0.0.1.

--rpcport
> Port of the POSS service process. The default is 18060.

**Example**:
```nohighlight
poss wallet-key
```

**Output**:
Private key or error message.

---

### **wallet-account**

**Description**:
Get the account of the current POSS node.

**Usage**:
```nohighlight
poss wallet-accunt [--rpchost=<value>] [--rpcport=<value>]
```

**Options**:
--rpchost
> Address of the POSS service process. The default is 127.0.0.1.

--rpcport
> Port of the POSS service process. The default is 18060.

**Example**:
```nohighlight
poss wallet-accunt
```

**Output**:
Account or error message.
