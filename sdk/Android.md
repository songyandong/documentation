# Android SDK
## Introduction
Android sdk is a Binary archive of Android library project for [PPIO CLI](https://www.pp.io/docs/cli/) intended for Android developers. It can be used in Android environments.

## Getting started
### Prepared your PPIO wallet account
You must have a **[PPIO wallet account](../wallet/)** first. Because PPIO wallet account is your user credentials for using PPIO services. You have to get `keystore file` and `passphrase` from your PPIO wallet account.

This is a [guide](../wallet/) to teach you how to generate a PPIO wallet account and get `keystore file` and `passphrase` from your PPIO wallet account

### Install
download `ppio.aar` from [here](https://github.com/ppio/ppio-sdk-android), and put it in the libs directory of your android project. then deploy app build.gradle.
```
apply plugin: 'com.android.application'

android {
   ...
   repositories {
     flatDir {
       dirs 'libs'
     }
   }

   dependencies {
      ...
      implementation(name: 'ppio', ext: 'aar')  
      ...
  }
}
```

### Configuration
```Java
Config config = Poss.createDefaultConfig();

config.setTCPPort(8068);
config.setUDPPort(8068);
config.setRPCPort(18068);

config.setZone(2);

File cacheDir = new File(Constant.PPIO_File.CACHE_DIR);

config.setDir(cacheDir.getAbsolutePath());

config.setTestNet("test");

config.setBootstrap("[\n" +
                        "  {\n" +
                        "    \"Name\": \"ali-bootstrap\",\n" +
                        "    \"IP\": \"47.110.88.167\",\n" +
                        "    \"TCPPort\": 8020,\n" +
                        "    \"UDPPort\": 8020,\n" +
                        "    \"PeerID\": \"\"\n" +
                        "  },\n" +

                        "  {\n" +
                        "    \"Name\": \"aws-bootstrap\",\n" +
                        "    \"IP\": \"54.202.181.27\",\n" +
                        "    \"TCPPort\": 8020,\n" +
                        "    \"UDPPort\": 8020,\n" +
                        "    \"PeerID\": \"\"\n" +
                        "  }\n" +
                        "]");

config.getPayment().setIP("ad04b30b910c311e9b71c02d26ce9aff-567092461.us-west-
2.elb.amazonaws.com");
config.getPayment().setUDPPort(0);
config.getPayment().setTCPPort(0);
config.getPayment().setHTTPPort(18030);

if (mIsOffice) {
    config.getQosServerConfig().setEnable(true);
    config.getQosServerConfig().setNetwork("udp");
    config.getQosServerConfig().setAddr("192.168.50.208:9090");
    config.getQosServerConfig().setTag("ppioqos");
    config.getQosServerConfig().setDir(Constant.PPIO_File.CACHE_QOS_DIR);
} else {
    config.getQosServerConfig().setEnable(true);
    config.getQosServerConfig().setNetwork("udp");
    config.getQosServerConfig().setAddr("ad416ba1c124611e9a39d06111ae4d23-1840383830.us-west-2.elb.amazonaws.com:80");
    config.getQosServerConfig().setTag("ppioqos");
    config.getQosServerConfig().setDir(Constant.PPIO_File.CACHE_QOS_DIR);
}

Poss.initKeyStoreData(keyStoreStr, config.getDir());
config.setKeyPassphrase(passPhrase);

mUser = Poss.createUser(config);
mUser.startDaemon();
```

* keyStoreStr：the keystore file content you get from the wallet;
* passPhrase: the password for the keystore file;
* Constant.PPIO_File.CACHE_DIR: the path of data directory you should set for the SDK.


## Usage

### Create a instance
```java
Poss.initKeyStoreData(keyStoreStr, config.getDir());
config.setKeyPassphrase(passPhrase);

mUser = Poss.createUser(config);
```
Before you can do this, you must first initialize keyStoreStr and passPhrase.

### Start a PPIO daemon
```java
mUser.startDaemon();
```

### Stop the daemon
```java
mUser.stopDaemon();
```

## Other methods
### createBucket
```java
mUser.createBucket(String bucket)
```
### putObject
```java
putObject(String bucket, String key, String file, String meta, String chiprice, long copies, String expires, boolean encrypt)
```

```java
putObjectSync(String bucket, String key, String file, String meta, String chiprice, long copies, String expires, boolean encrypt)
```
This will upload a file to the net in the bucket and `key.putObject` is a asynchronous method, `putObjectSync` is a synchronize method.
|Parameters|Type|Default|Description|
|--|--|--|--|
|bucket|string|None|Bucket name. Store objects in this bucket.|
|key|string|None|Object key value. The unique index of the object within the bucket. The key length must be greater than 0 and less than 4096 bytes. You can use this to implement the object's directory|
|body|string|None|The file path that needs to be uploaded. Without this parameter, an empty object (which can be thought of as an empty folder) is created inside the bucket. Empty files (0 bytes in size) and files larger than 10G are not supported.|
|meta|string|None|Ancillary data for the object. Can't exceed 4096 bytes.|
|chiprice|string|None|Store the price of the file. The indexer will schedule the storage miners based on this price, so the user's bid is reasonable, otherwise it may not be able to find a miner who is willing to provide storage services. This parameter is not required when creating an empty object.|
|copies|int|5|The number of copies. Must be greater than 1 and less than or equal to 10. The default is 5. This parameter is not required when creating an empty object.|
|expires|string|None|Expire date. The object is stored to this date and will be deleted if the user does not choose to extend the storage time after expiration. Supports dates in two formats, such as "2006-01-02" or "2006-01-02T15:04:05.000Z". The current time must be greater than or equal to one day, less than or equal to one year (365 days). This parameter is not required when creating an empty object.|
|encrypt|bool|None|Whether encrypted, must be true|

### getObject
```java
getObject(String bucket, String key, String shareCode, String file, String chiprice)
```
Get an object from the PPIO system to the local.
|Parameters|Type|Default|Description|
|--|--|--|--|
|bucket|string|None|The bucket in which the object is located.|
|key|string|None|The key value of the object.|
|sharecode|string|None|Sharing code. This parameter is used when the bucket and key are empty.|
|file|string|None|The file name to which the object is downloaded to the local. Absolute or relative paths can be|
|chiprice|string|None|File download price.|

**You can see all the methods [here](../api/).**
