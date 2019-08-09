# Get Started

## What is PPIO?
**PPIO** is a decentralized programmable storage and delivery network.

You can use PPIO to store and retrieve any amount of data at any time, from anywhere on the web. You can accomplish these tasks using the [PPIO SDK](../sdk/) or [PPIO Command Line Interface](../cli/) (abbreviated as CLI in the following content).

PPIO is similar to the existing cloud-based storage services such as AWS S3 regarding usage and function. However, it is more robust, efficient and offers better privacy protection. It also reduces cost significantly. PPIO's well-designed blockchain-based incentives allow it to make use of the vast amount of unused bandwidth and storage resources on the Internet, and to provide robust storage service at much lower cost.

PPIO's unique decentralized file system prevents unauthorized access and ensures that all the data can be stored securely and privately.

PPIO is designed from the ground up to perform efficiently on a global scale, by leveraging the experience of the [founding team - PPLabs](./others/About_PPLabs.md). The team designed and ran decentralized network with experience of managing hundreds of millions of users before. PPIO meets the storage needs of both today's Internet businesses and services, and the emerging decentralized applications (DApps).

If you are interested in knowing why we want to design PPIO, check out the article [Why Do We Want To Design PPIO?](./others/Why_Do_Want_To_Design_PPIO.md)

## Try PPIO CLI
The command of PPIO CLI starts with `poss`.

### Step1: Prepare your PPIO wallet account
You must have a **[PPIO wallet account](../wallet/)** first. Because PPIO wallet account is your user credentials for using PPIO services.

**You have to get `keystore file` and `passphrase` from your PPIO wallet account.**

This is a [guide](../wallet/) to teach you how to generate a PPIO wallet account and get `keystore file` and `passphrase` from your PPIO wallet account. Also, you can get some test coins from this guide.

### Step2: Install
- **Windows:**  
  Download the binary from [here](https://resource.testnet.pp.io/poss/release/windows-amd64/latest/poss.exe).
  ``` PowerShell
    poss.exe --help
  ```

- **macOS**  
    ``` bash
      curl -o poss https://resource.testnet.pp.io/poss/release/macos/latest/poss
      chmod +x poss
      ./poss --help
    ```

- Linux:  
    ``` bash
      curl -o poss https://resource.testnet.pp.io/poss/release/linux-amd64/latest/poss
      chmod +x poss
      ./poss --help
    ```

### Step3: Import the user credentials to PPIO CLI and modify configuration file
- **macOS** or **Linux**
    ```bash
    # import your wallet user credentials into PPIO CLI
    ./poss init --keystore=[your keystore file absolute path]
    ```
- **Windows**
    ```powershell
    # import your wallet user credentials into PPIO CLI
    poss.exe init --keystore=[your keystore file absolute path]
    ```
> You can get `keystore file` from your PPIO wallet. This is the [guide](../wallet/#generate-a-ppio-wallet-account)

Running the above command will generate some default configuration, some of which need to be modified.
Modify the contents of the `~/.poss/poss.conf` file if you are using Mac OS or linux. Or modify the contents of the `C:\Users\You Name\.poss\poss.conf` file if you are using Windows.
```bash
 ...
 "TestNet": "test",
 ...
 ...
 "Bootstrap": [
    {
      "Name": "aws-bootstrap",
      "IP": "35.160.24.147",
      "UDPPort": 8020,
      "TCPPort": 8020,
      "HTTPPort": 0,
      "RPCPort": 0
    },
    {
      "Name": "ali-bootstrap",
      "IP": "47.110.91.131",
      "UDPPort": 8020,
      "TCPPort": 8020,
      "HTTPPort": 0,
      "RPCPort": 0
    }
  ],
  ...
  ...
  "Payment": {
   "Name": "default-payment",
   "IP": "indexrpc.testnet.pp.io",
   "UDPPort": 0,
   "TCPPort": 0,
   "HTTPPort": 18030,
   "RPCPort": 0
 },
 ...
```
### Step4: Start PPIO service background
- **macOS** or **Linux**
    ```bash
    # start the PPIO service background
    ./poss start --daemon --key-passphrase=[passphrase of your keystore]
    ```
- **Windows**
    ```powershell
    # start the PPIO service background
    poss.exe start --daemon --key-passphrase=[passphrase of your keystore]
    ```
> You can get `passphrase` from your PPIO wallet. This is the [guide](../wallet/#generate-a-ppio-wallet-account)

### Step5: Upload and download a file using PPIO CLI
Run the following commands sequentially in your command line terminal.
- **macOS** or **Linux**
    ```bash
    # create a bucket
    ./poss create-bucket --bucket=test

    # upload a file to PPIO
    ./poss put-object --bucket=test --chiprice=100 --key=/test  --expires=2019-04-01 --body=[your file absolute path]

    # get a file from PPIO
    ./poss get-object --bucket=test --key=/test --chiprice=100 --outfile=[Get file to local path]
    ```
- **Windows**
    ```bash
    # create a bucket
    poss.exe create-bucket --bucket=test

    # upload a file to PPIO
    poss.exe put-object --bucket=test --chiprice=100 --key=/test  --expires=2019-04-01 --body=[your file absolute path]

    # get a file from PPIO
    poss.exe get-object --bucket=test --key=/test --chiprice=100 --outfile=[Get file to local path]
    ```

Well! Now you have completed the uploading and downloading of a file with PPIO. Of course, PPIO can do much more than that. Go to [Command Line Interface Reference of PPIO](../cli/)

## More Details
- [System Design of PPIO](./System_Design.md)
- [Some Concepts in PPIO](../concept/)
- [PPIO Command Line Interface Reference](../cli/)
- [PPIO JSON-RPC Api Reference](../api/)
- [PPIO SDK Guide](../sdk/)
- [Develop a Decentralized Storage App Using PPIO SDK](../tutorial/)
