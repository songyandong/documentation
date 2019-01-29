# Why Do We Want to Design PPIO?

### Problems with centralized storage
The global cloud storage market has grown enormously in recent years and will continue to grow at a faster pace. However, the existing centralized solutions have many problems. The data breach has become a frequently repeated scene, with an ever-growing scale and impact. For example, the Dropbox hacking in 2016 leaked 68 million user accounts.

These incidents pose a grave threat to not just the privacy of individual users, but the security and integrity of the entire Internet. At the same time, high bandwidth and storage cost is another inherent problem of the centralized storage systems.

### Attempt to decentralize storage
There have been many attempts to build decentralized storage systems. However, these attempts were not successful.

For example:

- **Siacoin：**  It is built on top of Proof of Work (PoW) consensus, just like BitCoin. PoW introduces wasteful computation and energy consumption, and it does not take consideration of the different levels of storage and bandwidth supply among the Lessors, which are crucial to a storage system.

- **Storj:**   It remains in the testing phase with many years’ development. A known problem of Storj is the lack of quick response from Lessors upon storage request. Its transactions are settled monthly which is not very friendly to the Lessors.

- **BurstCoin:**  BurstCoin utilizes Proof of Capacity (PoC) that does take storage capacity of the Lessors into account, but unfortunately it does not serve as a storage use. All Lessors do is to partition their hard drives for token reward, but cannot support the storage application scenario.

- **IPFS:**  The emerging FileCoin under development by Protocol Labs adds an incentive layer on top of the Inter-planetary File System (IPFS), with the goal to build a storage infrastructure and protocol to replace HTTP. For that purpose, its file index is made public to facilitate features like Web access, but it poses a challenge to preserving user privacy and data security in a storage network. Besides, some of its storage proofs are too complex and likely to hold the system back from running efficiently at large scale.

### PPIO comes into being
From the discussions above, it is clear that a complete decentralized storage solution is yet to be built to support large-scale and real-world use cases. This is what PPIO attempts to accomplish.
PPIO's founding team successfully designed, developed and maintained PPLive, a peer to peer streaming system that serves hundreds of millions of users on a daily basis. Such experiences allow the team to make systematic design choices and develop efficient and practical solutions to achieve the following design goals.

- **Low Storage Cost**  PPIO's well-designed blockchain based incentives provide an attractive financial reward to Lessors who contribute to the network. It punishes the misbehaving participants as well. As a result, a large, high-quality Lessor community can be established and kept growing. This allows PPIO to make use of the vast amount of unused bandwidth and storage resources on the Internet and provides robust storage service at much lower cost. To help the users better manage storage acquisition and micropayment, PPIO introduces a scheme called "coin pool", which assists the users to pay for storage service. It also designs a mechanism to protect users from the impact of storage price fluctuations, so that their experience is no different from nowadays centralized storage clouds, but the price is much lower.

- **Scalability and High Efficiency** PPIO is designed from the ground up to perform efficiently on a global scale, by leveraging the founding team's experience from running a decentralized network with hundreds of millions of users. Besides a set of industry proven P2P transmission technologies, the team also developed data-driven scheduling, self-organizing overlay network, and optimized distribution of popular content. PPIO's deisgn also improves the efficiency of the regional network and enhence its friendliness to ISPs. Combined with its innovation in NAT Traversal, Kaldemlia distributed hash table (DHT), lightweight consensus and optimized transmission for media streaming, PPIO's storage network can perform with extremely high efficiency and can be easily scaled to a global network with hundreds of millions of peers.

- **Privacy, Security and Stability** Data security and privacy protection are the top requirements in PPIO's decentralized file system design. Using unique data partition and encryption algorithms, PPIO ensures that user data can only be indexed and retrieved when possessing the user's unique private key. PPIO can defend its system against various kinds of network attacks and prevent unauthorized data access. At the same time, it allows the user to easily share their data to the public or within a private group. PPIO is equipped with four efficient proofs to maintain the integrity and reliability of its storage network. Light Proof of Capacity (LPoC) is developed to provide lightweight validation of storage capacity provided by the Lessors. An optimized Proof of Space Time (PoSt) ensures that the data is stored consistently over a while. Proof of Replication (PoRep) is used to guarantee that the Lessors replicate and store user's data. Proof of Download (PoD) ensures that user can download their data correctly.

- **Strong Application Support and Ecosystem** PPIO provides a set of DSaaS （Decentralized Storage As A Service）storage APIs similar to those of the leading cloud services such as AWS S3 and makes the data migration from those services much easier. PPIO also has a slew of technologies built in to better support decentralized applications on the public blockchain, such as Object-based storage, dApp Sandbox mechanisms and file access management, etc. PPIO has a comprehensive plan to develop a robust, healthy and sustainable ecosystem, to facilitate the development of applications and services, and allow the developers to enjoy real benefits from PPIO's growth.
