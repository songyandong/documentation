---
sidebarDepth: 3
displayAllHeaders: true
---
# PPIO and POSS

## What is PPIO and POSS

**PPIO** is a decentralized programmable storage and delivery network. **POSS** stands for PPIO Object Storage Service. It's a decentralized data storage solution provided by PPIO. POSS has simple api interface that you can use to store and retrieve data at any time, from any where. You can understand that their relationship is the same as AWS and AWS S3.

## POSS Advantages

POSS is intentionally built with a minimal feature set that focuses on simplicity. Following are some of advantages of POSS:

- **Create/Delete Buckets** - Create and delete a bucket. Buckets are the fundamental container in POSS for data storage. Every user could create not more than 100 buckets.
- **Store/Delete Objects** - Store an infinite amount of data in a bucket. Upload as many objects as you like into a bucket. Each object can contain up to 10 GB of data (8 TB in future). Each object is stored and retrieved using a unique developer-assigned key.
- **Download Objects** - Download your data or other's data with sharecode.
- **Renew Objects** - Renew your storage plan. You can renew the object's copies and chiprice, or extend storage time.

And other advanced features:

- **Tasks** - Most time-consuming operations in POSS are asynchronous. Asynchronous operation will generate a task. Developer can manage these tasks by specific APIs. See [Task](#task).
- **Indexdata** - Management of indexdata. See [Indexdata](#indexdata).

## POSS Developing Reference

* [POSS cli reference](../cli/)
* [POSS rpc reference](../api/)

## POSS Concepts

### Bucket

Bucket is the basic container for storing objects. An object must be stored in a bucket. Developer could organize namespaces with buckets and use a bucket like an unlimited capacity folder that can contain any number of objects.

### Object

Objects are the fundamental entities stored in POSS. Objects consist of object data and indexdata. The data is encrypted and fragmented, it's opaque to POSS. An object is identified by key. An object is uniquely identified within a bucket by a key (name).

#### Object State

|State|State Code|Description|
|--|--|--|
|Bid|0|all copies are not available|
|Part-Deal|1|at least one copy is available, but not all copies are available|
|Deal|2|all copies are available|
|Pending-End|3|nearly expires, wait settlement|
|End|4|expired|

### Indexdata

PPIO is a decentralized data storage and delivery platform. POSS uses unique data partition and encryption algorithms, which ensures that user data can only be indexed and retrieved by a unique private key. And there must be a data structure to maintain the mapping of an object to fragmentation data, which called indexdata. The metadata of the object included in indexdata two.

### Task

Most time-consuming operations in POSS are asynchronous. Asynchronous operation will generate a task, developer can check the operation with task.

#### Task Type

There are two types, permenent and temporary. The main difference between them is lifetime.

```nohighlight
permenent task: long lifetime, even after task finished or error. Permenent task will be persisted in local database. Develop can delete it by API.
temporary task: short lifetime, will be deleted immediately by POSS after task finished or error. Temporary task won't be persisted.
```

Every asynchronous call will return a task id, developer can get task state or progress by specific APIs.

#### Task State

A task has five states：

```go
// TaskCommonState chunk state in a task
type TaskCommonState int

const (
    // Pending initializing
    Pending TaskCommonState = iota
    // Running
    Running
    // Paused stopped
    Paused
    // Finished done
    Finished
    // Error end with error
    Error
)

// TaskCommonStateNames type name
var TaskCommonStateNames = [5]string{
   "Pending",
   "Running",
   "Paused",
   "Finished",
   "Error",
}
```

#### Operations of Task

All operations as follow:

|lifetime   |pause  |resume |delete |list-tasks |
|--         |-----  |------ |------ |---------- |
|permenent  |ok     |ok     |ok     |ok         |
|temporary  |NA     |NA     |ok     |NA         |

Task in Running state can not be deleted. Please pause it before deleting.

list-tasks:

```nohighlight
ok:can be listed with list-tasks command。
NA:can not be listed with list-tasks commnad。
```

#### Task Progress

Developer can get task progress and state by specific APIs. These APIs usually return the struct:

```go
type JobProgress struct {
    // put/get/copy/delete/renew/getstatus...
    Action string
    TotalSubJobs    int
    FinishedSubJobs int
    TotalBytes    int64
    FinishedBytes int64
    // Pending/Running/Paused/Finished/Error
    JobState string
    Err      string
    CurrentSubJobProgress *JobProgress
    ExResult string
}
```

Developer could get state by JobState field and get progress by TotalBytes/FinishedBytes fields. Use JobState==Finished (not FinishedBytes==TotalBytes) to check that a task has finished or not.
