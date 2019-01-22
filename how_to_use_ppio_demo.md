# How to use PPIO demo app

## Overview
PPIO demo app is an official decentralized personal cloud storage demo application based on PPIO.

Whether you are an Android client or a computer client, you must register a PPIO wallet account before using the Demo app. And get the keystore file for this account and your own password. These are the credentials for your login to PPIO wallet and PPIO Demo app.

## Step1: Generate a PPIO wallet account and get the keystore file
> PPIO wallet is a blockchain wallet. And if you don't understand the concept of blockchain wallet, there will be a lot of articles on Google.

Go to [PPIO wallet](https://wallet.testnet.pp.io/#/new/create) to generate a PPIO wallet account. And this account can be used not only in the demo app but also [PPIO CLI](./cli/) and [PPIO SDK](./sdk/).

**create a PPIO wallet account**  

![generate PPIO wallet](./Images/generate-wallet.png)  

**get your PPIO wallet address**  

![generate PPIO wallet](./Images/wallet-address.png)  

**get the keystore file and private key of the account**  

![generate PPIO wallet](./Images/get-keystore.png)  

Now you have got your wallet keystore file.

## Step2: Get some test coins for free
Now there is no coin in your PPIO wallet. You need to go to [our faucet](https://faucet.testnet.pp.io) to get some of our test coins for free.
![get coins from faucet](./Images/faucet.png)  

- Enter your PPIO address to generate the content you may post.
- Post the content to Twitter.
- Copy-paste the posts URL of the tweet.
- Click the “Give me PPIO coin” button to get 5 free PPIO coins for testnet!


## Step3: Send test coins to ppio demo app
Although you already have test coins in your PPIO wallet, but you also need to go back to [PPIO wallet page](https://wallet.testnet.pp.io) to recharge some PPIO coins. This involves our underlying system architecture. We will introduce these details in a later article.   

![get coins from faucet](./Images/recharge-ppio-service.png)

## Step4: Import your keystore file or private key to log in PPIO demo app
**log in desktop client**
![log in desktop client](./Images/log-in-desktop.png)

**log in Android client**
![log in android client](./Images/log-in-android.png)

## Step5: You can use PPIO demo app now!
PPIO demo app has the following features.
- upload & download file (Support breakpoint transmission)
- drag & drop file upload
- share file
- get file by share code

It should be noted that since this demo is completely decentralized. There are some differences between the use and the cloud storage you have used before. If you encounter some problems, you can give feedback to this email **(feedbacks@pplabs.org)**.

**desktop client**
![desktop](./Images/desktop.png)

**log in Android client**
![android](./Images/android.png)

::: wanring NOTE
Due to our decentralized architecture, even with the same account, their file information cannot be synchronized when logging in to different clients.We will optimize this in later versions.
:::
