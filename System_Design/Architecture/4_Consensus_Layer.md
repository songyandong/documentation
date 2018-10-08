# Consensus Layer

PPIO’s consensus algorithm is specifically designed for its distributed storage network. It integrates the storage proofs, VRF random selection and BFT consensus.

To further improve its performance and scalability, PPIO also adopts a layered approach in its implementation of the consensus layer. Nodes in the network are grouped into a number of side chains and one master chain. The master chain is formed by selected nodes that are responsible of maintaining the consensus of the entire network. In each side chain, transactions are handled locally but will be aggregated and reported to the master chain periodically.

The figure below shows an example of the layered consensus. Nodes in the P2P are grouped into 3 groups, the master group, the black side chain group and the white side chain group. The details of the design is presented below.

![Groups of P2P nodes](../../Images/consensus.png)
<p style="font-size:14px; text-align:center;">Groups of P2P nodes</p>


- **Master Chain**, nodes in the master chain apply PPIO’s consensus scheme to maintain the entire network.
	- Nodes are selected to join the the master chain based on its storage and bandwidth contribution, once its contribution cross a threshold, the node is allowed to join the master chain.
		- Each node in the master chain is also a member of a side chain, and it is responsible of recording the transactions and maintaining the ledger of the side chain.   
		- The nodes in the master chain is also responsible of:
			- Creating and maintaining side chains.
			- Validating and executing storage contracts and transactions.
			- Maintaining the ledger of the master chain.
- **Side Chain**
	- A newly joined node is assigned to a side chain based on network distance and load balancing, to maintain high speed connections among the nodes in the same side chain. At least one of the nodes in the master chain needs to be allocated to each side chain.
	-  Nodes can switch chains to adapt to changes in the network. Side chains with few nodes in it can be combined with other chains.  
	-  Nodes in the side chain are responsible of:
		- Handling storage operations.
		- Conducting storage proofs including PoRep, PoD, PoSt and LPoC.
		- Matching storage contracts between Lessors and users.
		- Maintaining the ledger of the side chain.
		- Reporting proofs and matched contracts to the master chain.

**Advantages of layered consensus**：
- In a decentralized storage network, nodes take on many different roles and every operation needs to be verified. Layered consensus helps simplify the management of network nodes and avoids the inefficiency of having to sync through the entire network.
- Maintaining low network latency is the key to meet user’s high expectations on storage and download performance. Layered consensus allows the network to be partitioned based on network distance and connection speed. As the storage operations can be handled within each side chain, low latency can be achieved.
- Storage or download of each object requires a contract. The contracts needs to validated, matched, executed, and then recorded in the ledger. Doing all these on a single chain can overload the network. With the layered approach, the side chain can take over part of the workload, it allows the network to scale better and be able to handle large quantities of concurrent transactions.
