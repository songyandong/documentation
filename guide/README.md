# Getting Started

## What is PPIO and POSS?
**PPIO** is a decentralized programmable storage and delivery network. **POSS** stands for PPIO Object Storage Service. You can understand that their relationship is the same as AWS and AWS S3.

You can use POSS to store and retrieve any amount of data at any time, from anywhere on the web. You can accomplish these tasks using the [POSS SDK](../sdk/) or [POSS Command Line Interface](../cli/) (abbreviated as CLI in the following content).

POSS is similar to the existing cloud-based storage services such as AWS S3 in terms of usage and function. But it is more robust, efficient and offers better privacy protection. It also reduces cost significantly. PPIO's well-designed blockchain-based incentives allow it to make use of the vast amount of unused bandwidth and storage resources on the Internet, and to provide robust storage service at much lower cost.

PPIO's unique decentralized file system prevents unauthorized access and ensures that all the data can be stored in secure and private manner.

PPIO is designed from the ground up to perform efficiently on a global scale, by leveraging the experience of the [founding team - PPLabs](./others/About_PPLabs.md). The team designed and ran decentralized network with hundreds of millions of users before. PPIO meets the storage needs of both today's Internet businesses and services, and the emerging decentralized applications (DApps).

If you are interested in knowing why we want to design PPIO, check out the article [Why Do We Want To Design PPIO?](./others/Why_Do_Want_To_Design_PPIO.md).

## Try POSS CLI
The POSS Command Line Interface (CLI) is a unified tool to manage your POSS services. With just one tool to download and configure, you can control multiple PPIO services from the command line and automate them through scripts.And the command of POSS CLI starts with `poss`.

### Step1: Install
- **Windows:**  
  Download the binary from [here](https://resource.testnet.pp.io/poss/release/windows-amd64/v0.0.1/poss.exe).
  ``` powershell
    poss.exe --help
  ```

- **Mac OsX**  
    ``` bash
      wget https://resource.testnet.pp.io/poss/release/macos/v0.0.1/poss
      chmod -x poss
      ./poss --help
    ```

- Linux:  
    ``` bash
      wget https://resource.testnet.pp.io/poss/release/linux-amd64/v0.0.1/poss
      chmod -x poss
      ./poss --help
    ```

### Step2: Generate a PPIO wallet account and get the keystore file
> PPIO wallet is a blockchain wallet. And if you don't understand the concept of blockchain wallet, there will be a lot of articles on Google.

Go to [PPIO wallet](https://wallet.testnet.pp.io) to generate a PPIO wallet account. And this account can be used not only in the POSS CLI but also [PPIO demo app](https://github.com/ppio/ppio-demo-desktop) and [POSS SDK](../sdk/).

**create a PPIO wallet account**  

![generate PPIO wallet](../Images/guide/create-wallet.png)  

**get your PPIO wallet address**  

![generate PPIO wallet](../Images/wallet-address.png)  

**get the keystore file and private key of the account**  

![generate PPIO wallet](../Images/wallet-keystore.png)  

Now you have got your wallet keystore file.

### Step3: Get some test coins for free
Now there is no coin in your PPIO wallet. You need to go to [our faucet](https://faucet.testnet.pp.io) to get some of our test coins for free.
![get coins from faucet](../Images/faucet.png)  

- Enter your PPIO address to generate the content you may post.
- Post the content to Twitter.
- Copy-paste the posts URL of the tweet.
- Click the “Give me PPIO coin” button to get 5 free PPIO coins for testnet!

### Step4: Send test coins to POSS
Although you already have test coins in your PPIO wallet, if you want to really experience the POSS CLI, you need to go back to [PPIO wallet page](https://wallet.testnet.pp.io) to recharge some PPIO coins. This involves our underlying system architecture. We will introduce these details in a later article.   

![get coins from faucet](../Images/recharge-to-poss.png)
### Step5: Import the keystore file to POSS CLI and start POSS service background
```bash
# import your walllet private key into POSS CLI
./poss init --keystorepath=[your keystore file absolute path]

# start the poss service background
./poss start --daemon --passphrase=[your wallet password]
```
or
```bash
./poss start --daemon --keystorepath=[your keystore file absolute path] --passphrase=[your wallet password]
```

### Step6: Upload and download a file using POSS CLI
Run the following commands in order on your command line terminal.
```bash
# create a bucket
./poss create-bucket --bucket=test

# upload a file to POSS
./poss put-object --bucket=test --chiprice=100 --key=/test.png  --expires=2019-04-01 --body=/home/u/test.png

# get a file from POSS
./poss get-object --bucket=test --key=/test.png --chiprice=100 --outfile=/home/u/test-poss.png
```

Well! Now that you have completed the uploading and downloading of a file with POSS. Of course, POSS can do much more than that. Go to [Command Line Interface Reference of POSS](../cli/)

## More Details
- [System Design of PPIO](./System_Design.md)
- [PPIO and POSS](../concept/)
- [Command Line Interface Reference of POSS](../cli/)
- [RPC Api Reference of POSS](../api/)
- [SDK Guide of POSS](../sdk/)
- [Develop a Decentralized Storage App Using POSS SDK](../tutorial/)
