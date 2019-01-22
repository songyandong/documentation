# Getting Started

## What is PPIO?
**PPIO** is a decentralized programmable storage and delivery network.

You can use PPIO to store and retrieve any amount of data at any time, from anywhere on the web. You can accomplish these tasks using the [PPIO SDK](../sdk/) or [PPIO Command Line Interface](../cli/) (abbreviated as CLI in the following content).

PPIO is similar to the existing cloud-based storage services such as AWS S3 in terms of usage and function. But it is more robust, efficient and offers better privacy protection. It also reduces cost significantly. PPIO's well-designed blockchain-based incentives allow it to make use of the vast amount of unused bandwidth and storage resources on the Internet, and to provide robust storage service at much lower cost.

PPIO's unique decentralized file system prevents unauthorized access and ensures that all the data can be stored in secure and private manner.

PPIO is designed from the ground up to perform efficiently on a global scale, by leveraging the experience of the [founding team - PPLabs](./others/About_PPLabs.md). The team designed and ran decentralized network with hundreds of millions of users before. PPIO meets the storage needs of both today's Internet businesses and services, and the emerging decentralized applications (DApps).

If you are interested in knowing why we want to design PPIO, check out the article [Why Do We Want To Design PPIO?](./others/Why_Do_Want_To_Design_PPIO.md).

## Try PPIO CLI
The command of PPIO CLI starts with `poss`.

### Step0: Prepared your PPIO wallet account
You must have a PPIO wallet account first. Make sure this account has PPcoin. And you need to recharge some PPcoin. This is a [guide](../wallet/) to teach you how to generate a PPIO wallet account and get some of our test coins for free.

### Step1: Install
- **Windows:**  
  Download the binary from [here](https://resource.testnet.pp.io/poss/release/windows-amd64/0.4.15/poss.exe).
  ``` powershell
    poss.exe --help
  ```

- **Mac OsX**  
    ``` bash
      wget https://resource.testnet.pp.io/poss/release/macos/0.4.15/poss
      chmod -x poss
      ./poss --help
    ```

- Linux:  
    ``` bash
      wget https://resource.testnet.pp.io/poss/release/linux-amd64/0.4.15/poss
      chmod -x poss
      ./poss --help
    ```

### Step2: Import the user credentials to PPIO CLI and start PPIO service background
```bash
# import your walllet user credentials into PPIO CLI
./poss init --keystorepath=[your keystore file absolute path]

# start the PPIO service background
./poss start --daemon --passphrase=[your wallet password]
```
or
```bash
# import your walllet user credentials into PPIO CLI and start the PPIO service background
./poss start --daemon --keystorepath=[your keystore file absolute path] --passphrase=[your wallet password]
```

### Step3: Upload and download a file using PPIO CLI
Run the following commands in order on your command line terminal.
```bash
# create a bucket
./poss create-bucket --bucket=test

# upload a file to PPIO
./poss put-object --bucket=test --chiprice=100 --key=/test.png  --expires=2019-04-01 --body=/home/u/test.png

# get a file from PPIO
./poss get-object --bucket=test --key=/test.png --chiprice=100 --outfile=/home/u/test-poss.png
```

Well! Now that you have completed the uploading and downloading of a file with PPIO. Of course, PPIO can do much more than that. Go to [Command Line Interface Reference of PPIO](../cli/)

## More Details
- [System Design of PPIO](./System_Design.md)
- [Some Concepts in PPIO](../concept/)
- [PPIO Command Line Interface Reference](../cli/)
- [PPIO JSON-RPC Api Reference](../api/)
- [PPIO SDK Guide](../sdk/)
- [Develop a Decentralized Storage App Using PPIO SDK](../tutorial/)
