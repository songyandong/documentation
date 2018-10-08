# Get Started

## What is PPIO?
**PPIO** is a decentralized programmable storage network based on **blockchain**. You can use **PPIO** to store and retrieve **any amount of data** at any time, from anywhere on the web. You can accomplish these tasks using the PPIO SDK or PPIO Command Line Tool. This guide introduces you how to use PPIO complete the tasks.

In order to better understand PPIO, you better know that PPIO is similar to the existing cloud-based storage services such as AWS S3 in terms of use and function. But it is more robust, efficient and offers better privacy protection and significant cost saving. PPIO's well-designed blockchain-based incentives allow it to make use of the vast amount of unused bandwidth and storage resources on the Internet, and provide robust storage service at much lower cost.

PPIO's unique decentralized file system prevents unauthorized access and ensures that all the data can be stored in a secure and private manner.

PPIO is designed from the ground up to perform efficiently on a global scale, by leveraging the [founding team](./Extra/About_PPLabs.md)'s experience from designing and running decentralized network with hundreds of millions of users. PPIO meets the storage needs of both today's Internet businesses and services, and the emerging decentralized applications (DApps).

If you are interested in why we want to design PPIO, check out the [Why Do We Design PPIO](./Extre/Why_Do_Want_To_Design_PPIO.md)

## try PPIO with command tool
### install command tool
If you haven’t the command tool installed, read the  [[install command tool]]

### run PPIO in the shell  
``` shell
# initialize a user node
$ ppfs-user init

# create a bucket
$ ppfs-user create bucket

# add an object into a bucket
$ ppfs-user put object into bucket

# get an object
$ ppfs-user get object

# delete an object/bucket
$ ppfs-user delete object
$ ppfs-user delete bucket
```


## try PPIO with SDK
### Configure
Create a credentials file at ~/.ppio/credentials on Mac/Linux or C:\Users\USERNAME\.ppio\credentials on Windows
```ini
[default]
ppio_access_key_id = YOUR_ACCESS_KEY_ID
ppio_secret_access_key = YOUR_SECRET_ACCESS_KEY
```

### Example in Javascript
#### install npm package
``` shell
npm install ppio-sdk -g
```
#### run
```javascript
var PPIO = require('ppio-sdk');

var ppio = new PPIO();

// Bucket names must be unique across all ppio users
var myBucket = 'my.unique.bucket.name';

var myKey = 'myBucketKey';

ppio.createBucket({Bucket: myBucket}, function(err, data) {

if (err) {

   console.log(err);

   } else {

     params = {Bucket: myBucket, Key: myKey, Body: 'Hello!'};

     ppio.putObject(params, function(err, data) {

         if (err) {

             console.log(err)

         } else {

             console.log("Successfully uploaded data to myBucket/myKey");

         }

      });

   }

});
```
