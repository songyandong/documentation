# How to use PPIO CLI

## Overview
**PPIO** stands for PPIO Object Storage Service. The PPIO Command Line Interface (CLI) is a unified tool to manage your PPIO services. With just one tool to download and configure, you can control multiple PPIO services from the command line and automate them through scripts. Also, the command of PPIO CLI starts with `poss`.

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
      "IP": "47.110.88.167",
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
