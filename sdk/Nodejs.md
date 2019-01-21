# Node.js SDK
This is the [POSS](https://www.pp.io/docs/guide/) SDK for Javascript.

## Introduction
Poss.js is an JSON-RPC wrapper for [POSS](https://www.pp.io/docs/guide/) intended for Javascript developers. It can be used in both Node.js and browsers environments.

## Getting started

### Install poss.js
```
npm install poss
```

### innitialize
You need to initialize a config for the POSS daemon to start, which can be done with our cmd tool ([cmd documentation](../cli/))
```
./poss init
```
or by this SDK(only in Node.js environment):
```javascript
const Poss = require('poss')
const poss = new Poss({
  possExecutablePath: 'path/to/poss/executable',
  ...otherOptions
})

poss.initDaemon([options])
```
Check available Poss constructor options in [Configuration](#usage/configuration) and init daemon options in [initDaemon](#usage/init-daemon)

### start daemon
Then you can start a POSS daemon manually in terminal ([cmd documentation](../cli/))
```
./poss start-daemon --wallet-key=[your private key] --datadir=[data directory]
```
or by this SDK(only in Node.js environment):
```javascript
poss.startDaemon({
  datadir: [data directory],
  'wallet-key': [your private key],
  ...otherOptions
})
```
Available start options are listed in [startDaemon](#usage/start-daemon)

### create a bucket
You need to create a bucket first to upload objects.
```javascript
poss.call('CreateBucket', { bucket: 'test-bucket' })
```

### put an object
```javascript
poss.call('PutObject', {
  bucket: 'test-bucket',
  key: 'testfile.abc',
  body: 'path/to/the/test/file',
  chiprice: 100,
  copies: 5,
  expires: new Date('2020-01-01').toISOString(),
})
```

### get an object
```javascript
poss.call('GetObject', {
  bucket: 'test-bucket',
  key: 'testfile.abc',
  chiprice: 100,
  outfile: 'path/to/the/destination',
})
```

### stop the daemon
```javascript
poss.call('StopDaemon')
```

## Usage

### Creat a instance
```javascript
const Poss = require('poss')
const poss = new Poss({
  possExecutablePath: 'path/to/poss/executable',
  rpcport: 18060,
})
```
#### configuration
<span id="usage/configuration"></span>
| Param | Type | Description |
| :------: | :------: | :------ |
| [options] | `object` | The options of poss instance |
| [options.possExecutablePath] (optional) | `string` | The path of the poss executable, will take no effect in browsers. |
| [options.rpcport] (optional) | `number` | The RPC port of a running POSS daemon. If you are running POSS daemon from the terminal, use this config to indicate the RPC port the daemon is listening. |

### Initialize a data directory
```javascript
poss.initDaemon({
  datadir: 'path/to/poss-dir',
})
```
This will create a folder(`path/to/poss-dir`) in which poss will store user's data. You can check the initial configuration in `poss.conf` under the `datadir` you provided. It is highly recommended that you provide a different `datadir` for every account.

::: warning NOTE:
this method only works in Node.js environment, and `possExecutablePath` must be provided when creating the Poss instance.
:::
Complete configuration can be found in [POSS cmd documentation](https://www.pp.io/docs/api/).

### Start a POSS daemon
```javascript
poss.startDaemon({
  'datadir': '.ppio-demo'
  'wallet-key': 'your private key',
})
```
This will start a POSS daemon. If you do not specify the RPC port or TCP/UDP port, poss.js will find an available port automatically.

::: warning NOTE:
this method only works in Node.js environment, and `possExecutablePath` must be provided when creating the Poss instance.
:::

Complete configuration can be found in [POSS cmd documentation](https://www.pp.io/docs/api/).

### Stop the daemon
```javascript
poss.stopDaemon()
```
This will stop a POSS daemon. If you do not specify the RPC port or TCP/UDP port, poss.js will find an available port automatically.

::: warning NOTE:
this method only works in Node.js environment, and `possExecutablePath` must be provided when creating the Poss instance.
:::

Complete configuration can be found in [POSS cmd documentation](https://www.pp.io/docs/api/).

## Other methods

### setPossExecutablePath
```javascript
poss.setPossExecutablePath('path/to/poss')
```
Set the POSS executable path. It then can be accessed via `poss.possPath`

### setDefaultBucket
```javascript
poss.setDefaultBucket('test-bucket')
```
This will create a bucket with the bucket name you specified and set it as the default bucket so you do not have to provide it every time you want to modify an object. You can use this method if you want the user to use only one bucket in your app.

### setCpool
```
poss.setCpool({
  address: 'ppio1NkZvLjCvJkN5789MFzsn4cNSQkc3JWd2J',
  host: 'http://api.ppool.pp.io',
  datadir: 'path/to/poss-dir'
})
```
| Param | Type | Description |
| :------: | :------: | :------ |
| [cpoolData] | `object` | The data of the coin pool. |
| [cpoolData.address] | `string` | The address of the coin pool. |
| [cpoolData.host] | `string` | The host of the coin pool. |
| [cpoolData.datadir] | `string` | The data directory you want to set coin pool config to. |

This will set the [coin pool](https://www.pp.io/docs/guide/) config to 'poss.conf', including `CPoolUrl` and `CPoolAccount` fields. If set, every operation will go through the coin pool service after restarting daemon.

### clearCpool
```javascript
poss.clearCpool('path/to/poss-dir')
```
| key | data type | description |
| :------: | :------: | :------ |
| [datadir] | `string` | The data directory you want to set coin pool config to. |

This will clear the coin pool part of the `poss.conf` in `datadir`.

### initCpoolServices([cpoolData]) => Promise
<span id="initCpoolServices"></span>
```javascript
poss.initCpoolServices([{
  host: 'http://api.ppool.pp.io',
  site: 'http://ppool.pp.io/',
}])
```

| Param | Type | Description |
| :------: | :------: | :------ |
| [cpoolData] | `object` | The data of the coin pool. |
| [cpoolData.site] | `string` | The website of the coin pool. |
| [cpoolData.host] | `string` | The host of the coin pool. |

This method will request `[cpoolhost]/api` of every coin pool service you provided, and set the response data into `poss.cpoolServices[cpoolHost]`, you can get it with `getCpoolService`. The array of `cpoolServices` will be set to Poss property `cpoolList`.

### getCpoolService(cpoolHost) => CpoolServiceData
```javascript
const cpoolData = poss.getCpoolService('http://api.ppool.pp.io')
```
| Param | Type | Description |
| :------: | :------: | :------ |
| [cpoolHost] | `string` | The host of the coin pool. |

This method will return `CpoolServiceData` with the host `cpoolHost`.

#### CpoolServiceData
| Param | Type | Description |
| :------: | :------: | :------ |
| [CpoolServiceData.host] | `string` | The host of the coin pool. |
| [CpoolServiceData.address] | `string` | The address of the coin pool. |
| [CpoolServiceData.description] | `string` | The description of the coin pool. |
| [CpoolServiceData.apiList] | `string` | An api list provided by the coin pool. |
| [CpoolServiceData.site] | `string` | The website url of the coin pool. |

#### CpoolServiceData.getSubscriptionInfo(address) => Promise
| Param | Type | Description |
| :------: | :------: | :------ |
| [address] | `string` | The user's PPIO address. |

Get the subscription info of the address.

## Properties

### possPath[string]
The path of the POSS executable.

### runningDaemonPort[number]
The RPC port that the current running daemon is listening. If you create a Poss instance with `rpcport` option, that port will be set to this property. When starting daemon, if `runningDaemonPort` is not `0`, POSS daemon will not be started for there is already a daemon running. And [stopping a daemon](#stop-the-daemon) will set `runningDaemonPort` to 0.

### baseParams[object]
Some base parameters of Poss. May include:
- rpcport: The RPC port listened by the daemon, set after the daemon is started, will be merged in `call` method params.
- netport: The TCP & UDP port used by the daemon, set after the daemon is started.
- bucket: The default bucket name, will be merged in `call` method params.
- indexerUrl: The indexer url, will be set after `init`
-

### cpoolList[Array]
Set by method [`initCpoolCervices`](#initCpoolServices)

### cpoolServices[Array]
Set by method [`initCpoolCervices`](#initCpoolServices)
