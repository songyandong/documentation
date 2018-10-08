##  ISP Friendly Scheduling
In most P2P networks, a node can transfer data with any other peers, regardless of their location. As a result, a single data transfer can potentially create traffic anywhere in the world, and consumes bandwidth between different Internet Service Providers (ISP), or even between different countries. In 2007, a research institute iPoque carried out an analysis on nearly 3TB of anonymous data sampled from more than a million internet users in Eastern Europe, Southern Europe, Australia and the Middle East。 Their studies show that P2P file sharing takes up a significant part of the network bandwidth consumption, accounting for about 49% in the Middle East, and 84% in Eastern Europe. From a global perspective, 95% of the bandwidth at prime time is involved in some forms of P2P data transmission. In recent years, the percentage of P2P traffic has dropped due to a shift in the use pattern of Internet applications. However, with the recent development of blockchain technology and decentralized applications, P2P network traffic is expected to start increasing again. P2P traffic consumes an extraordinary amount of network bandwidth, including international bandwidth. It puts a lot of burden on our internet infrastructure, and significantly increase the cost for ISPs to operate.

As described before, PPIO’s self-organizing overlay network encourages data transfer among neighboring nodes, a large percentage of its traffic is contained within the local network, and the operation cost incurred upon ISPs is greatly reduced. However, the topology of PPIO’s overlay network may not match the ISP topology exactly. Further optimization to reduce unnecessary traffic between ISPs is needed to further improve PPIO’s ability to scale globally.

If the nodes participating in a data transmission happen to be in the close vicinity of each other, it is likely that the traffic will be contained within their area network. As a result, the bandwidth cost will be significantly reduced. This is exactly the principle behind P4P, to fully utilize local network bandwidth in a P2P network.

P4P, or Proactive network Provider Participation for P2P, is a method for ISPs and P2P software to optimize connections. It enables peer selection based on the topology of the physical network, in order to reduce traffic on the backbone network, lower the operation cost of network providers, and improve data transfer efficiency.

The implementation of P4P in traditional P2P networks relies on central servers. As PPIO is a completely decentralized network, a decentralized P4P solution is required.

PPIO provides an iP4P interface that allows ISPs to setup and configure P4P in their network, and allows applications to query the information. iP4P is designed to be similar to the iTracker interface in centralized P2P networks, to make it easier to adapt.

- `ip-list`: allows ISPs to provide the list of IPs in their network, it allows nodes in PPIO’s network to be associated with their ISP.
- `policy` allows ISPs to configure the policy for applications to access P4P information.
- `p4p-disance` allows applications to query P4P cost and distance between network nodes.
- `capability` allows applications to query of network resources and capacity of the ISP network.
- `firendly-isp-list` allows applications to query information of friendly ISP, including p4p-distance across different ISPs.

At the same time PPIO introduces a global IP database that is maintained by the entire network. Information in the database can be used to calculate the p4p distance between two nodes in the network, when at least one of them is not within a known ISP network from the iP4P Interface. The database is synced to Scheduler nodes and Verifier nodes in the P2P network. Every node in the network can query its own information from the database. The following shows part of the information stored for each node.

```go
message P4PPeerInfo {
    uint32 countryId = 1;   //  Country ID
    uint32 ispId = 2;       //  ISP ID
    uint32 stateId = 3;     // State or Province ID
    uint32 cityId = 4;      // City ID
}
```

When selecting data connections from a given node, the indexing and scheduling node (IndexScheduler) in PPIO’s network checks whether the node can be queried from the iP4P interface:  

- If so, a peer lookup in the node’s ISP network will be conducted first, followed by a lookup in the friendly ISPs, and finally among all other peers. The final peer decision will still be decided based on connection speed as described in [P2P Self-Organizing Overlay Networks](./P2P_Self_Organizing_Overlay_Networks.md). In this way, peers with shorter p4p distances to the node are more likely to be selected to upload or download its data. At the same time, nodes in slower ISPs can still connect to faster outside peers. As a result, unnecessary traffic between different network providers is significantly reduced, and user experience across the entire network is maintained at a high level.

- If not, the p4p distance calculated from global IP database is used in the pre-selection of peers. Similarly the final selection will still be based connection speed.
