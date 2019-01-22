---
sidebarDepth: 2
displayAllHeaders: true
---
# PPIO JSON-RPC API Reference
## About PPIO RPC API
In addition to the `cmd` method (see: [PPIO CLI Reference](../cli/)), PPIO also provides the rpc calling method in json format.

This manual will use the tool **curl** as an example to illustrate the RPC call method of PPIO. The developer can refer to this protocol to implement RPC access to PPIO through other languages or tools.

In general, a PPIO command corresponds to an RPC request (except for `poss start`, `poss init`, etc.)

The **--rpchost** and **--rpcport** options in the PPIO command line correspond to the Host and Port specified in the RPC request.

Other options and parameters in the PPIO command line are passed as parameters in the RPC call. They are passed through params. **The order is strictly specified in this document. The parameter name is ignored. If the value is undefined, you still need to enter an empty string ("").**

**Method**
|Parameters|Default|Description|
|--|--|--|
|id|None|Rp request identifier|
|jsonrpc|"2.0"|jsonrpc version|
|method|None|RPC request specified method|
|params|None|the parameters required by the RPC request specified method|

Take the API version as an example:
```bash
curl -X POST -H 'content-type:text/json;' -d '{"id":1,"jsonrpc":"2.0","method":"APIVersion","params":[]}' http://127.0.0.1:18060/rpc
```
Initiate an rpc request to the local port 18060 to obtain the API version. The called method name is `APIVersion`. This method does not receive any parameters, so params passes an empty array.

**Response Format**
|Parameters|Default|Description|
|--|--|--|
|id|None|The identifier of the rpc request is the same as the id when the request was initiated.|
|jsonrpc|"2.0"|jsonrpc version|
|result|None|If the rpc request is executed successfully, result is a string indicating that the message is returned or `null` indicates no message|
|error|None|If the rpc request fails, error is a json object. `error.code` indicates the error code, `error.message` indicates the error message|

Take the API version as an example:
```json
{"id":1,"jsonrpc":"2.0","result":"0.1"}
```
The value corresponding to the `result` field is "0.1", which is the API version number that was successfully obtained.
---

## **StopDaemon**

**Description**
Stop the PPIO service process.

**Parameters**
None.

**Examples**
```bash
curl -X POST -H 'content-type:text/json;' -d '{"id":1,"jsonrpc":"2.0","method":"StopDaemon","params":[]}' http://127.0.0.1:18060/rpc
```

**Response**
There will be no return value after stopping the service.
```bash
Empty reply from server
```

---

## **APIVersion**

**Description**
Get the PPIO rpc version

**Parameters**
None.

**Examples**
```bash
curl -X POST -H 'content-type:text/json;' -d '{"id":1,"jsonrpc":"2.0","method":"APIVersion","params":[]}' http://127.0.0.1:18060/rpc
```

**Response**
```bash
{"id":1,"jsonrpc":"2.0","result":"0.1"}
```

---

## **GetJobProgress**
**Description**
Get the progress of a task. In the PPIO interface, there are some methods that are asynchronous, returning a Task id after the call, and then the user can use this method to get the progress of the task.

**Parameters**
|Parameters|Type|Default|Description|
|--|--|--|--|
|task|string|None|Task id.|

**Examples**
```bash
curl -X POST -H 'content-type:text/json;' -d '{"id":1,"jsonrpc":"2.0","method":"GetJobProgress","params":["8190d728-4f6a-466e-8070-3a644c7c9f55"]}' http://127.0.0.1:18060/rpc
```

**Response**
```json
{"id":1,"jsonrpc":"2.0","result":{"Action":"put","TotalSubJobs":6,"FinishedSubJobs":4,"TotalBytes":100081904,"FinishedBytes":71172096,"JobState":"Running","Err":"","CurrentSubJobProgress":null,"ExResult":""}}
```

After completion (`JobState` becomes `Finished`):

```json
{"id":1,"jsonrpc":"2.0","result":{"Action":"put","TotalSubJobs":6,"FinishedSubJobs":6,"TotalBytes":100081904,"FinishedBytes":100081904,"JobState":"Finished","Err":"","CurrentSubJobProgress":null,"ExResult":""}}
```
The developer can get the progress of the task by returning the `JobState` and `FinishedBytes` in the value.

---
## Bucket

### **CreateBucket**
**Description**
Create a bucket. A bucket is a basic storage container in PPIO, and each user can create up to 100 buckets. In theory, the capacity of a bucket is unlimited, and any number of objects can be stored in one bucket.

**Parameters**
|Parameters|Type|Default|Description|
|--|--|--|--|
|bucket|string|None|The bucket name must be no less than 3 characters long and cannot be more than 63 characters; it cannot contain underscores and uppercase letters; it must start with a lowercase letter or a number.|

**Examples**
```bash
curl -X POST -H 'content-type:text/json;' -d '{"id":1,"jsonrpc":"2.0","method":"CreateBucket","params":["bucketname"]}' http://127.0.0.1:18060/rpc
```

**Response**
```json
{"id":1,"jsonrpc":"2.0","result":null}
```
or
```json
{"error":{"code":-1,"message":"bucket exists"},"id":1,"jsonrpc":"2.0"}
```

---

### **DeleteBucket**

**Description**
Delete a bucket. The bucket must be empty and no objects are stored in it.

**Parameters**
|Parameters|Type|Default|Description|
|--|--|--|--|
|bucket|string|None|bucket name|

**Examples**
```bash
curl -X POST -H 'content-type:text/json;' -d '{"id":1,"jsonrpc":"2.0","method":"DeleteBucket","params":["bucketname"]}' http://127.0.0.1:18060/rpc
```

**Response**
```json
{"id":1,"jsonrpc":"2.0","result":null}
```

---

### **ListBuckets**

**Description**
List all buckets created by the current user.

**Parameters**
None.

**Examples**
```bash
curl -X POST -H 'content-type:text/json;' -d '{"id":1,"jsonrpc":"2.0","method":"ListBuckets","params":[]}' http://127.0.0.1:18060/rpc
```

**Response**
```json
{"id":1,"jsonrpc":"2.0","result":["test","bucketname"]}
```

---

### **HeadBucket**

**Description**
Determine if the bucket exists.
**Parameters**
|Parameters|Type|Default|Description|
|--|--|--|--|
|bucket|string|None|bucket name|

**Examples**
```bash
curl -X POST -H 'content-type:text/json;' -d '{"id":1,"jsonrpc":"2.0","method":"HeadBucket","params":["bucketname"]}' http://127.0.0.1:18060/rpc
```

**Response**
```json
{"id":1,"jsonrpc":"2.0","result":"exists"}
```

---
## Object
### **PutObject**

**Description**
Store an object into PPIO. Objects must be stored in a bucket. Objects are encrypted by slice and uploaded, and each object generates a unique symmetric key to ensure data security.

**Parameters**
|Parameters|Type|Default|Description|
|--|--|--|--|
|bucket|string|None|Bucket name. Store objects in this bucket.|
|key|string|None|Object key value. The unique index of the object within the bucket. The key length must be greater than 0 and less than 4096 bytes. You can use this to implement the object's directory|
|body|string|None|The file path that needs to be uploaded. Without this parameter, an empty object (which can be thought of as an empty folder) is created inside the bucket. Empty files (0 bytes in size) and files larger than 10G are not supported.|
|metadata|string|None|Ancillary data for the object. Can't exceed 4096 bytes.|
|chiprice|string|None|Store the price of the file. The indexer will schedule the storage miners based on this price, so the user's bid is reasonable, otherwise it may not be able to find a miner who is willing to provide storage services. This parameter is not required when creating an empty object.|
|copies|int|5|The number of copies. Must be greater than 1 and less than or equal to 10. The default is 5. This parameter is not required when creating an empty object.|
|expires|string|None|Expire date. The object is stored to this date and will be deleted if the user does not choose to extend the storage time after expiration. Supports dates in two formats, such as "2006-01-02" or "2006-01-02T15:04:05.000Z". The current time must be greater than or equal to one day, less than or equal to one year (365 days). This parameter is not required when creating an empty object.|
|encrypt|bool|None|Whether encrypted, must be true|

**Examples**
Upload "test.file" to bucket "bucketname", key value is "objkey", metadata is "this is metadata", chiprice is "100", copy number is "2", expires on "2019-12-12", encryption is true:
```bash
curl -X POST -H 'content-type:text/json;' -d '{"id":1,"jsonrpc":"2.0","method":"PutObject","params":["bucketname","objkey","./test.file","this is metadata","100",2,"2019-12-12",true]}' http://127.0.0.1:18060/rpc
```

Create empty object：
```bash
curl -X POST -H 'content-type:text/json;' -d '{"id":1,"jsonrpc":"2.0","method":"PutObject","params":["bucketname","emptyobj","","this is metadata","",0,"",true]}' http://127.0.0.1:18060/rpc
```

**Response**
Return a permanent task id:
```json
{"id":1,"jsonrpc":"2.0","result":"7aed1b84-41a1-46d6-944d-19b128999322"}
```

If you create an empty object, it returns directly:
```json
{"id":1,"jsonrpc":"2.0","result":""}
```

---

### **GetObject**

**Description**
Get an object from the PPIO system to the local.

**Parameters**
|Parameters|Type|Default|Description|
|--|--|--|--|
|bucket|string|None|The bucket in which the object is located.|
|key|string|None|The key value of the object.|
|sharecode|string|None|Sharing code. This parameter is used when the bucket and key are empty.|
|file|string|None|The file name to which the object is downloaded to the local. Absolute or relative paths can be|
|chiprice|string|None|File download price.|

**Examples**
```bash
curl -X POST -H 'content-type:text/json;' -d '{"id":1,"jsonrpc":"2.0","method":"GetObject","params":["bucketname","objkey","","./out.file","100"]}' http://127.0.0.1:18060/rpc
```

**Response**
Return a permanent task id:
```json
{"id":1,"jsonrpc":"2.0","result":"ef9f52f8-3bb8-431e-889b-c17858b979d4"}
```

---

### **HeadObject**

**Description**
Get the basic information and metadata of the object.

**Parameters**
|Parameters|Type|Default|Description|
|--|--|--|--|
|bucket|string|None|The bucket in which the object is located.|
|key|string|None|Object key|

**Examples**
```bash
curl -X POST -H 'content-type:text/json;' -d '{"id":1,"jsonrpc":"2.0","method":"HeadObject","params":["bucketname","put3"]}' http://127.0.0.1:18060/rpc
```

**Response**
```json
{"id":1,"jsonrpc":"2.0","result":"{\n  \"state\": 0,\n  \"length\": 871,\n  \"created\": \"2019-01-16T02:31:22.31165Z\",\n  \"modified\": \"2019-01-16T02:31:22.31165Z\",\n  \"synchronized\": \"2019-01-16T02:31:22.31165Z\",\n  \"metadata\": \"this is metadata\"\n}"}
```

---

### **DeleteObject**

**Description**
Remove an object from the PPIO system. The deleter must be the owner of this object.

**Parameters**
|Parameters|Type|Default|Description|
|--|--|--|--|
|bucket|string|None|The bucket in which the object is located.|
|key|string|None|Object key|

**Examples**
```bash
curl -X POST -H 'content-type:text/json;' -d '{"id":1,"jsonrpc":"2.0","method":"DeleteObject","params":["bucketname","objkey"]}' http://127.0.0.1:18060/rpc
```

**Response**
Return a temporary task id:

```json
{"id":1,"jsonrpc":"2.0","result":"8ce81fc4-56ba-45ee-b373-c2315a50cae9"}
```

---

### **RenewObject**

**Description**
Update the storage properties of an object, which can be used to increase or decrease the copy, extend the storage time, and change the storage price.

**Parameters**
|Parameters|Type|Default|Description|
|--|--|--|--|
|bucket|string|None|The bucket in which the object is located.|
|key|string|None|Object key|
|chiprice|string|None|New storage price. Based on this price, PPIO will re-schedule the miners who can satisfy the service for storage.|
|copies|int|5|The number of copies. Must be greater than 1 and less than or equal to 10. The default is 5.|
|expires|string|None|New expiration time. Storage time can only be extended and cannot be shortened. Do not pass this parameter if you do not need to change the expiration time. (Do not attempt to keep the storage duration unchanged by passing in the old expiration time, because time errors may cause renew to fail).|

**Examples**
Change the number of copies of the object `objkey` from 1 to 2:
```bash
curl -X POST -H 'content-type:text/json;' -d '{"id":1,"jsonrpc":"2.0","method":"RenewObject","params":["bucketname","objkey","100",2,""]}' http://127.0.0.1:18060/rpc
```

**Response**
Return a temporary task id:

```json
{"id":1,"jsonrpc":"2.0","result":"e1668a78-f4c4-4ba5-b2f6-ccb8581426b5"}
```

---

### **ShareObject**

**Description**
Share an object. This method will generate a share code that other users can use to get the object.

**Parameters**
|Parameters|Type|Default|Description|
|--|--|--|--|
|bucket|string|None|The bucket in which the object is located.|
|key|string|None|Object key|

**Examples**
```bash
curl -X POST -H 'content-type:text/json;' -d '{"id":1,"jsonrpc":"2.0","method":"ShareObject","params":["bucketname","objkey"]}' http://127.0.0.1:18060/rpc
```

**Response**
Return share code:
```json
{"id":1,"jsonrpc":"2.0","result":"poss://ewogICJrIjogIlE4eVFvaXNzd05qZFY0RnlxOTdUTVFsdmltbGVSS21ZNXk4Nng2UmhZTVk9IiwKICAibmFtZSI6ICJvYmprZXkiLAogICJsZW5ndGgiOiAxMDAwODE5MDQsCiAgImkiOiAie1xuICBcIm9iamVjdFwiOiBcIjc3NjlmYWZhNDhkNjM4MjJlZTcxMGMyOWFiNTc0NGE1NWZiN2E0NmE3NTY0ODFlNzAyNDYyMmFmNjg4Zjc4OTJcIixcbiAgXCJsZW5ndGhcIjogMTAwMDgxOTA0LFxuICBcImNodW5rc1wiOiBbXG4gICAgXCJmZmVjMTFkYjRhZjUyZjRlZjc0MDMwZWM4OTE4ZjZlZWFlMzY3ZGI2NTE5OTYyZjRkNTIxNjdiMTM2MzVlNDQzXCIsXG4gICAgXCI0MTdkYWZmNDgwN2U4ZjA4ZjI0MTY4NTY2YWI4MjBiYmQ1NGMyZTY0YTcwZjllYWE4Zjk4NjMwNmVkMDE3Mzc1XCIsXG4gICAgXCJiZDQzMGU2MzMyNjY1MTQ3Nzk4YzhhODdjNGEyYTM4M2U4NDZkMGVkOTY3YjIwZmQyMGU2MTU1YzkyMjJiZjE4XCIsXG4gICAgXCJmYTBiYzY1ODljODAzMDFiMzJlNjUxYzI0ODU0NGZkODU4Nzk2MDQ3ZGMwNzE5YjY3NGRjMTQ5MDNlNjcyZDU5XCIsXG4gICAgXCIxNTYzNTU4MzNlOTA2Yjk2MTc1NTAwNWFlZTQxNGMzYmUwNDkzOTMzNTRmYWIxMzQ5YjU1NTNkMjUzN2ZlODQ3XCIsXG4gICAgXCJiMDMyMWIwMTVlOTkzYjQwYjUwNTkyYzY2MGE3ZGViMjIxMTdkMTg5YzI2NjU0OTg0NzQwNjY3NGI5ZmJmMDgyXCJcbiAgXVxufSIKfQ=="}
```

---

### **CopyObject**

**Description**
Deep copy objects. Copy object A into object B, download A and re-encrypt it, and upload it to B.

**Parameters**
|Parameters|Type|Default|Description|
|--|--|--|--|
|bucket|string|None|The bucket in which the object is located.|
|key|string|None|Object key|
|source|string|None|Source object. The source object can come from the user's own object, or it can be a share code from someone else. If it is the user's own object, the format of the source object is: `bucket/key`, which consists of a bucket plus `/` plus the object key. If it is from the share code, you can pass the share code directly.|
|metadata|string|None|Ancillary data for the object.|
|chiprice|string|None|Store the price of the file. The indexer will schedule the storage miners based on this price, so the user's bid is reasonable, otherwise it may not be able to find a miner who is willing to provide storage services.|
|copies|int|5|The number of copies.|
|expires|string|None|Expire Date.|
|encrypt|bool|None|Whether encrypted, must be true.|

**Examples**
Copy `objkey` to `cpykey`:
```bash
curl -X POST -H 'content-type:text/json;' -d '{"id":1,"jsonrpc":"2.0","method":"CopyObject","params":["bucketname","cpykey","bucketname/objkey","this is metadata","100",2,"2019-12-12",true]}' http://127.0.0.1:18060/rpc
```

Copy from the share code:
```bash
curl -X POST -H 'content-type:text/json;' -d '{"id":1,"jsonrpc":"2.0","method":"CopyObject","params":["bucketname","cpykey","poss://ewogICJrIjogIlE4eVFvaXNzd05qZFY0RnlxOTdUTVFsdmltbGVSS21ZNXk4Nng2UmhZTVk9IiwKICAibmFtZSI6ICJvYmprZXkiLAogICJsZW5ndGgiOiAxMDAwODE5MDQsCiAgImkiOiAie1xuICBcIm9iamVjdFwiOiBcIjc3NjlmYWZhNDhkNjM4MjJlZTcxMGMyOWFiNTc0NGE1NWZiN2E0NmE3NTY0ODFlNzAyNDYyMmFmNjg4Zjc4OTJcIixcbiAgXCJsZW5ndGhcIjogMTAwMDgxOTA0LFxuICBcImNodW5rc1wiOiBbXG4gICAgXCJmZmVjMTFkYjRhZjUyZjRlZjc0MDMwZWM4OTE4ZjZlZWFlMzY3ZGI2NTE5OTYyZjRkNTIxNjdiMTM2MzVlNDQzXCIsXG4gICAgXCI0MTdkYWZmNDgwN2U4ZjA4ZjI0MTY4NTY2YWI4MjBiYmQ1NGMyZTY0YTcwZjllYWE4Zjk4NjMwNmVkMDE3Mzc1XCIsXG4gICAgXCJiZDQzMGU2MzMyNjY1MTQ3Nzk4YzhhODdjNGEyYTM4M2U4NDZkMGVkOTY3YjIwZmQyMGU2MTU1YzkyMjJiZjE4XCIsXG4gICAgXCJmYTBiYzY1ODljODAzMDFiMzJlNjUxYzI0ODU0NGZkODU4Nzk2MDQ3ZGMwNzE5YjY3NGRjMTQ5MDNlNjcyZDU5XCIsXG4gICAgXCIxNTYzNTU4MzNlOTA2Yjk2MTc1NTAwNWFlZTQxNGMzYmUwNDkzOTMzNTRmYWIxMzQ5YjU1NTNkMjUzN2ZlODQ3XCIsXG4gICAgXCJiMDMyMWIwMTVlOTkzYjQwYjUwNTkyYzY2MGE3ZGViMjIxMTdkMTg5YzI2NjU0OTg0NzQwNjY3NGI5ZmJmMDgyXCJcbiAgXVxufSIKfQ==","this is metadata","100",2,"2019-12-12",true]}' http://127.0.0.1:18060/rpc
```

**Response**
Return a permanent task id:

```json
{"id":1,"jsonrpc":"2.0","result":"41c13eac-49b5-46bc-93ff-6da1d52bbfae"}
```

---

### **ObjectStatus**

**Description**
Get the state of the object in PPIO.

**Parameters**
|Parameters|Type|Default|Description|
|--|--|--|--|
|bucket|string|None|The bucket in which the object is located.|
|key|string|None|Object key|

**Examples**
```bash
curl -X POST -H 'content-type:text/json;' -d '{"id":1,"jsonrpc":"2.0","method":"ObjectStatus","params":["bucketname","objkey"]}' http://127.0.0.1:18060/rpc
```

**Response**
Return a temporary task id:

```json
{"id":1,"jsonrpc":"2.0","result":"9e59fecc-daf8-46ec-8139-291658982c09"}
```

---

### **ObjectStatusSync**

**Description**
Get the state of the object in PPIO. Synchronous mode.

**Parameters**
|Parameters|Type|Default|Description|
|--|--|--|--|
|bucket|string|None|The bucket in which the object is located.|
|key|string|None|Object key|

**Examples**
```bash
curl -X POST -H 'content-type:text/json;' -d '{"id":1,"jsonrpc":"2.0","method":"ObjectStatusSync","params":["bucketname","objkey"]}' http://127.0.0.1:18060/rpc
```

**Response**
Return status information:
```json
{"id":1,"jsonrpc":"2.0","result":{"bucket":"bucketname","key":"put5","length":871,"create":"2019-01-16T13:40:05.867193Z","expires":"2019-12-12T00:00:00Z","state":"Deal","contracts":[{"Hash":"c0facb7176ed19be8c9fea0eac7f331191ab68525f8096abfedaf2c7e72bf3c1","Contracts":[{"ContractID":"4906a336385920b656359951dd37d0c4bb1e4e91fc6b9471e53d72934950df4b","Status":"SC_AVAILABLE","MinerID":"ppio1KgqNbxTiNqKyaahLFjSGGfK2WuJNR4HFb","UserChiPrice":"100","MinerChiPrice":"100","ChunkSize":871,"Funds":"790700","BeginTime":1547646005,"ExpireTime":1576108800},{"ContractID":"ccace8db4b6703400e087c02a1602bf1ba807be817801c9e914e94ece8582fb4","Status":"SC_AVAILABLE","MinerID":"ppio1QcM4YmKQ55q6NKFT7XR1ek21H3eYWE9zP","UserChiPrice":"100","MinerChiPrice":"100","ChunkSize":871,"Funds":"790700","BeginTime":1547646005,"ExpireTime":1576108800}]}]}}
```

---

### **ListObjects**

**Description**
List all the objects in a bucket.

**Parameters**
|Parameters|Type|Default|Description|
|--|--|--|--|
|bucket|string|None|Bucket name.|

**Examples**
```bash
curl -X POST -H 'content-type:text/json;' -d '{"id":1,"jsonrpc":"2.0","method":"ListObjects","params":["bucketname"]}' http://127.0.0.1:18060/rpc
```

**Response**
All objects in the bucket.
```json
{"id":1,"jsonrpc":"2.0","result":[{"bucket":"bucketname","key":"emptyobj","status":"","length":0,"isdir":true,"created":"2019-01-16T02:48:52.56941Z","modified":"2019-01-16T02:48:52.56941Z","synchronized":"2019-01-16T02:48:52.56941Z","expires":"0001-01-01T00:00:00Z"},{"bucket":"bucketname","key":"objkey","status":"Bid","length":100081904,"isdir":false,"created":"2019-01-16T12:03:41.655506Z","modified":"2019-01-16T12:03:41.655506Z","synchronized":"2019-01-16T12:03:41.655506Z","expires":"2019-12-12T00:00:00.658257Z"}]}
```

---

### **MoveObject**

**Description**
Move the object. It can be moved within the bucket or moved from the bucket to another bucket.

**Parameters**
|Parameters|Type|Default|Description|
|--|--|--|--|
|bucket|string|None|The bucket in which the object is located.|
|key|string|None|Object key|
|source|string|None|Source object. The format of the source object is: `bucket/key`.|

**Examples**
Move `bucketname/objkey` to `bucketname/mvkey`:
```bash
curl -X POST -H 'content-type:text/json;' -d '{"id":1,"jsonrpc":"2.0","method":"MoveObject","params":["bucketname","mvkey","bucketname/objkey"]}' http://127.0.0.1:18060/rpc
```

**Response**
```json
{"id":1,"jsonrpc":"2.0","result":null}
```

---

### **PutObjectFunds**

**Description**
Estimate the cost of storing an object.

**Parameters**
|Parameters|Type|Default|Description|
|--|--|--|--|
|objectsize|int64|None|Object size.|
|copies|int|5|Number of copies.|
|expires|string|None|Expire Date.|

**Examples**
The estimated storage object size is 123456789 bytes, 5 copies, and the approximate cost to December 12, 2019:
```bash
curl -X POST -H 'content-type:text/json;' -d '{"id":1,"jsonrpc":"2.0","method":"PutObjectFunds","params":["123456789","5","2019-12-12"]}' http://127.0.0.1:18060/rpc
```

**Response**
Return to miner storage costs and service scheduling fees:
```json
{"id":1,"jsonrpc":"2.0","result":{"miner":"37161900","service":"400"}}
```

---

### **GetObjectFunds**
**Description**
Estimate the cost of downloading an object.

**Parameters**
|Parameters|Type|Default|Description|
|--|--|--|--|
|objectsize|int64|None|Object size.|

**Examples**
Estimated cost of downloading a 123456789 byte object:
```bash
curl -X POST -H 'content-type:text/json;' -d '{"id":1,"jsonrpc":"2.0","method":"GetObjectFunds","params":["123456789"]}' http://127.0.0.1:18060/rpc
```

**Response**
Return to miner storage costs and service scheduling fees:
```json
{"id":1,"jsonrpc":"2.0","result":{"miner":"9420","service":"80"}}
```

---

### **DeleteObjectRefunds**

**Description**
Estimated to delete the cost of returning an object.
**Parameters**
|Parameters|Type|Default|Description|
|--|--|--|--|
|bucket|string|None|The bucket in which the object is located.|
|key|string|None|Object key|

**Examples**
```bash
curl -X POST -H 'content-type:text/json;' -d '{"id":1,"jsonrpc":"2.0","method":"DeleteObjectRefunds","params":["bucketname","objkey"]}' http://127.0.0.1:18060/rpc
```

**Response**
Return the refunded fee:
```json
{"id":1,"jsonrpc":"2.0","result":"15814"}
```

---
## Task
### **ListTasks**

**Description**
List all permanent tasks.

**Parameters**
None.

**Examples**
```bash
curl -X POST -H 'content-type:text/json;' -d '{"id":1,"jsonrpc":"2.0","method":"ListTasks","params":[]}' http://127.0.0.1:18060/rpc
```

**Response**
```json
{"id":1,"jsonrpc":"2.0","result":"[\n  {\n    \"id\": \"3aa4c515-014d-485e-9ef9-4efecf368ecf\",\n    \"type\": \"Put\",\n    \"state\": \"Error\",\n    \"from\": \"./verifier.log\",\n    \"to\": \"bucketname/objkey0\",\n    \"total\": 100081904,\n    \"finished\": 0,\n    \"create\": \"2019-01-16T12:05:05.050933Z\",\n    \"error\": \"job queue full\"\n  }\n]"}
```

---

### **PauseTask**

**Description**
Pause a permanent task.

**Parameters**
|Parameters|Type|Default|Description|
|--|--|--|--|
|taskid|string|None|Task id.|

**Examples**
```bash
curl -X POST -H 'content-type:text/json;' -d '{"id":1,"jsonrpc":"2.0","method":"PauseTask","params":["824f5ffd-dbb4-430f-bb89-f6b85c9fff93"]}' http://127.0.0.1:18060/rpc
```

**Response**
```json
{"error":{"code":-1,"message":"task not running"},"id":1,"jsonrpc":"2.0"}
```

---

### **ResumeTask**

**Description**
Resume a paused state task.

**Parameters**
|Parameters|Type|Default|Description|
|--|--|--|--|
|taskid|string|None|Task id.|

**Examples**
```bash
curl -X POST -H 'content-type:text/json;' -d '{"id":1,"jsonrpc":"2.0","method":"ResumeTask","params":["824f5ffd-dbb4-430f-bb89-f6b85c9fff93"]}' http://127.0.0.1:18060/rpc
```

**Response**
```json

```

---

### **DeleteTask**

**Description**
Delete a permanent task. Users cannot directly delete a running task. If you need to delete a running task, you must pause it.

**Parameters**
|Parameters|Type|Default|Description|
|--|--|--|--|
|taskid|string|None|Task id.|

**Examples**
```bash
curl -X POST -H 'content-type:text/json;' -d '{"id":1,"jsonrpc":"2.0","method":"DeleteTask","params":["824f5ffd-dbb4-430f-bb89-f6b85c9fff93"]}' http://127.0.0.1:18060/rpc
```

**Response**
Return temporary task id:
```json
{"id":1,"jsonrpc":"2.0","result":"cfa4b6aa-f771-42a9-a56e-bc5d7069a3cb"}
```

---

### **DeleteTaskSync**

**Description**
Delete a permanent task. Users cannot directly delete a running task. If you need to delete a running task, you must pause it. Synchronous call.
**Parameters**
|Parameters|Type|Default|Description|
|--|--|--|--|
|taskid|string|None|Task id.|

**Examples**
```bash
curl -X POST -H 'content-type:text/json;' -d '{"id":1,"jsonrpc":"2.0","method":"DeleteTaskSync","params":["3aa4c515-014d-485e-9ef9-4efecf368ecf"]}' http://127.0.0.1:18060/rpc
```

**Response**
Return temporary task id:
```json
{"id":1,"jsonrpc":"2.0","result":null}
```

---
##Indexdata

### **PushIndexdata**

**Description**
Store `indexdata` in the PPIO system. The `indexdata` will be uploaded to the PPIO system as a normal file. The storage chiprice will be obtained from the PPIO oracle. The storage time is one year (365 days) and the copy is the default 5.
**Parameters**
None.

**Examples**
```bash
curl -X POST -H 'content-type:text/json;' -d '{"id":1,"jsonrpc":"2.0","method":"PushIndexdata","params":[""]}' http://127.0.0.1:18060/rpc
```

**Response**
Returns a root chunk hash, which can be used to query the progress of the transfer:
```json
{"id":1,"jsonrpc":"2.0","result":"a949f2337afe972be6e558f21db0dd9303ca90787a15333e641da8c95d39c4a7518"}
```

---

### **PullIndexdata**
**Description**
Downloading indexdata from the PPIO system to the local will overwrite the local indexdata. Download chiprice will be obtained from the PPIO oracle. Commonly used to replace the device, synchronize indexdata.

**Parameters**
None.

**Examples**
```bash
curl -X POST -H 'content-type:text/json;' -d '{"id":1,"jsonrpc":"2.0","method":"PullIndexdata","params":[]}' http://127.0.0.1:18060/rpc
```

**Response**
Returns the current root chunk hash, which can be used to query the progress of the transfer:

```json
{"id":1,"jsonrpc":"2.0","result":"a949f2337afe972be6e558f21db0dd9303ca90787a15333e641da8c95d39c4a7518"}
```

---

### **ImportRootHash**

**Description**
Import the root chunk hash. Commonly used to replace the device, synchronize indexdata. After importing the root chunk hash, perform `pull-indexdata` to synchronize the index data in PPIO to the local.

**Parameters**
None.

**Examples**
```bash
curl -X POST -H 'content-type:text/json;' -d '{"id":1,"jsonrpc":"2.0","method":"ImportRootHash","params":["a949f2337afe972be6e558f21db0dd9303ca90787a15333e641da8c95d39c4a7518"]}' http://127.0.0.1:18060/rpc
```

**Response**
```json
{"id":1,"jsonrpc":"2.0","result":null}
```

---

### **ExportRootHash**

**Description**
Export the root chunk hash.

**Parameters**
None.

**Examples**
```bash
curl -X POST -H 'content-type:text/json;' -d '{"id":1,"jsonrpc":"2.0","method":"ExportRootHash","params":[""]}' http://127.0.0.1:18060/rpc
```

**Response**
```json
{"id":1,"jsonrpc":"2.0","result":"8b2ffb36593ef8f8ba16855cece4ab4d6c2c73cb4269edec8f0f583c817363220"}
```

---
## NET
### **NetID**

**Description**
Get the id of the current PPIO node.

**Parameters**
None.

**Examples**
```bash
curl -X POST -H 'content-type:text/json;' -d '{"id":1,"jsonrpc":"2.0","method":"NetID","params":[""]}' http://127.0.0.1:18060/rpc
```

**Response**
```json
{"id":1,"jsonrpc":"2.0","result":"00250802122102b591678759224ddf39fc3b2850e64414eef8109db7b4c31b19375e81e19ba13f"}
```

---

### **NetPeers**

**Description**
Obtain the node connection status of the current PPIO node in the PPIO network.

**Parameters**
None.

**Examples**
```bash
curl -X POST -H 'content-type:text/json;' -d '{"id":1,"jsonrpc":"2.0","method":"NetPeers","params":[""]}' http://127.0.0.1:18060/rpc
```

**Response**
```json
{"id":1,"jsonrpc":"2.0","result":[{"NodeType":1,"PeerID":"00250802122102ee1ee28040a7ac46cf4328c648caa456caa3b74b6948246201c95a461cb27e92","PeerInfo":{"ExternalAddress":{"IP":"127.0.0.1","UDPPort":8050},"PeerID":"00250802122102ee1ee28040a7ac46cf4328c648caa456caa3b74b6948246201c95a461cb27e92","Type":2,"IPList":["192.168.0.59"],"InternalPorts":{"UDPPort":8050,"TCPPort":8050}},"SRTT":1,"LastRTTDetectTime":1546063019037,"LastRTTProbeTime":1546063019037,"NodeRole":2},{"NodeType":1,"PeerID":"00250802122103f940c8255c896971f911e62d18c95c1042c4c88eb1106dc43ad0ee1a1d163f27","PeerInfo":{"ExternalAddress":{"IP":"127.0.0.1","UDPPort":8051},"PeerID":"00250802122103f940c8255c896971f911e62d18c95c1042c4c88eb1106dc43ad0ee1a1d163f27","Type":2,"IPList":["192.168.0.59"],"InternalPorts":{"UDPPort":8051,"TCPPort":8051}},"SRTT":1,"LastRTTDetectTime":1546067888651,"LastRTTProbeTime":1546067888652,"NodeRole":2},{"NodeType":4,"PeerID":"0025080212210230a471de08f810db4e3ba373d506b9039b776f45fbad1c3e73881dce4a66af1e","PeerInfo":{"ExternalAddress":{"IP":"127.0.0.1","UDPPort":8053},"PeerID":"0025080212210230a471de08f810db4e3ba373d506b9039b776f45fbad1c3e73881dce4a66af1e","Type":2,"IPList":["192.168.0.58"],"InternalPorts":{"UDPPort":8053,"TCPPort":8053}},"SRTT":1,"LastRTTDetectTime":1546067888493,"LastRTTProbeTime":1546067888494,"NodeRole":2},{"NodeType":4,"PeerID":"002508021221025f838d129fd2a464e95dc7cb28dab51a252eee05d4cf21f3e4b6aa64f5c5afa0","PeerInfo":{"ExternalAddress":{"IP":"127.0.0.1","UDPPort":8054},"PeerID":"002508021221025f838d129fd2a464e95dc7cb28dab51a252eee05d4cf21f3e4b6aa64f5c5afa0","Type":2,"IPList":["192.168.0.59"],"InternalPorts":{"UDPPort":8054,"TCPPort":8054}},"SRTT":1,"LastRTTDetectTime":1546067888545,"LastRTTProbeTime":1546067888546,"NodeRole":2},{"NodeType":4,"PeerID":"0025080212210309726a5d82761713653145d338c18be15d5c3981cb9ce366ca62270155d3309e","PeerInfo":{"ExternalAddress":{"IP":"127.0.0.1","UDPPort":8052},"PeerID":"0025080212210309726a5d82761713653145d338c18be15d5c3981cb9ce366ca62270155d3309e","Type":2,"IPList":["192.168.0.59"],"InternalPorts":{"UDPPort":8052,"TCPPort":8052}},"SRTT":1,"LastRTTDetectTime":1546067888599,"LastRTTProbeTime":1546067888600,"NodeRole":2},{"NodeType":4,"PeerID":"0025080212210325bedc3742dd813cc07dc7b4524a150be606f6e649db105fbc01e825b3ae9d5d","PeerInfo":{"ExternalAddress":{"IP":"54.200.10.62","UDPPort":4500},"PeerID":"0025080212210325bedc3742dd813cc07dc7b4524a150be606f6e649db105fbc01e825b3ae9d5d","Type":2,"IPList":["172.31.45.4"],"InternalPorts":{"UDPPort":4500,"TCPPort":4500}},"SRTT":9223372036854775807,"LastRTTDetectTime":0,"LastRTTProbeTime":0,"NodeRole":2}]}
```

---

### **NetServers**

**Description**
Obtain the service node information corresponding to the current PPIO node.

**Parameters**
None.

**Examples**
```bash
url -X POST -H 'content-type:text/json;' -d '{"id":1,"jsonrpc":"2.0","method":"NetServers","params":[""]}' http://127.0.0.1:18060/rpc
```

**Response**
```json
"id":1,"jsonrpc":"2.0","result":{"Indexers":[{"Name":"indexer","PeerID":"00250802122102ec8e7f2675863c26ba5f61c7b7972bd3a5c4a8276566de829390a6faf83470fc","Address":{"IP":"127.0.0.1","UDPPort":8030,"TCPPort":8030,"HTTPPort":18030},"AccountID":"ppio1LY41TGNpbXKHaHMjSJXrry8st4ychWpHf"}],"Verifiers":[{"Name":"verifier","PeerID":"00250802122102bd87be3c9693fecf0266ebb062bffcc53399ef8276458cc29aa3d4560d852aca","Address":{"IP":"127.0.0.1","UDPPort":8040,"TCPPort":8040,"HTTPPort":18040},"AccountID":"ppio1RAkqZAVozQW1GEH5pWEptg8AvBpWecCGC"}]}}
```

---
## Wallet
### **WalletAccount**

**Description**
Get the account of the current PPIO node.

**Parameters**
None.

**Examples**
```bash
curl -X POST -H 'content-type:text/json;' -d '{"id":1,"jsonrpc":"2.0","method":"WalletAccount","params":[""]}' http://127.0.0.1:18060/rpc
```

**Response**
```json
{"id":1,"jsonrpc":"2.0","result":"ppio1RE2Ci5NkWeB8RCtktVvQfWjnbRymYTGLp"}
```
