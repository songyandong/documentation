# Incentive Layer

The foundation of PPIO’s incentive mechanism is formed by the various proofs described before, including [PoRep](), [PoD](), [PoSt]() and [LPoC](). These proofs are strictly derived and rigorously tested, to enable reliable verification of different types of work done by the nodes in the network, so that the right amount of reward can be given to different parties, to maintain a healthy economy and keep it growing.

Smart contract is the basis of PPIO’s reward mechanism:
- **Storage Contract:**
	- User storage contract: User creates storage contract to store files to the network, which includes information about the storage object, storage duration, number of copies and the amount of payment offered.
	- Lessor storage contract: Lessor submits storage contract to offer storage service, which includes information about its storage capacity, available duration, amount of acceptable payment. The Lessor storage contract can also be updated later on.
	- IndexScheduler matches User's and Lessor’s contracts. When successful, User starts to upload copies of the object to Lessors. All data transfer is scheduled by the IndexScheduler.
- **Download Contract**
	- User download contract: User creates download contract to download files, which includes information about the object to be downloaded and the amount of payment offered.
	- Lessor download contract: Lessor submits download contract to offer download services, which includes information about the bandwidth provided, duration and amount of acceptable payment.
	- IndexScheduler tries to match the User’s and Lessor’s contracts. When successful, User starts to download the object from Lessors. All data transfer is scheduled by the IndexScheduler.

In PPIO’s network, different nodes are getting rewarded based on their roles:
- **IndexScheduler:** When user download or store data, it needs to obtain indexing info from the IndexSchedulers. Therefore the IndexSchedulers will receive indexing reward. When the IndexSchedulers dispatch tasks to the Lessors, they also receive scheduling reward.
- **Verifier:** All of the storage proofs PoRep, PoD, PoSt and PoC are conducted by the Verifiers, they will receive verification reward.
- **Lessor:** Lessors not only provide storage space to store user data, but also provide network bandwidth to enable data transfer. The consumption of storage and network bandwidth will be compensated accordingly. At the same time, based on the amount of storage and bandwidth the Lessors contribute to the network, they will receive rewards periodically.
- **Block Builder:** The nodes that record transactions and maintain the ledger will get rewarded by receiving a portion of the transaction fees. They also receive reward for adding a new block to the ledger.
