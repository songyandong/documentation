# Network Layer

Communication among different nodes in PPIO’s network is based on a set of P2P protocols that include the following:
- Transmission: Supports TCP and UDP based transmission. To improve efficiency and reliability, KCP, QUIC and SCTP protocols can also be used.

- Connectivity： NAT traversal technologies are essential to guarantee connectivity. PPIO utilizes STUN (Session Traversal Utilities for NAT) and network relay to help set up connections between nodes behind gateways.

- Load Balance: By using consistent hash[13], traffic can be evenly distributed to different nodes. It helps reduce the impact of nodes leaving or new nodes joining the network.

- Encryption: By using asymmetric public-private key based signatures, and symmetric data encryption, the identify of message senders can be verified, and the content of the message can be validated.
