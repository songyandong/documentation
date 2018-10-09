# Data Driven Scheduling
In PPIO's system, a storage `Object` is divided into a number of `Segment`, each `Segment` is further divided into a number of `Piece`. For example, one segment can be partitioned into M pieces, and these pieces can be duplicated and stored by N different storage Lessors. Each of these N Lessors is also called a `Peer`. A scheduler decides how the M pieces can be downloaded from the N peers, so that the segment can be retrieved in a fast, efficient manner, and avoid duplicated pieces to be downloaded. This process is called **Multi-point Download Scheduling**.

Two data-driven scheduling algorithms are developed to optimize PPIO's data transfer for file download and data streaming use cases, respectively.

## File Download

Summary of the scheduling algorithm:

1. Multiple virtual connections are established between the user and each peer with proven resource, in order to improve transmission efficiency. UDP based protocols such as KCP and UDT are attempted first to make the connection. If it fails, TCP based protocols will be used instead to adapt to different types of heterogeneous networks.
2. For each peer, an expected download speed $V_{conn}$ is calculated based on its transmission history. If no history is found, a default empirical value is used.
3. The number of virtual connections on each peer varies, the peer with a higher $V_{conn}$ can have a larger number of initial virtual connections.
4. Based on the partition of the segment, user first sends a download request to a given peer for an arbitrary piece, and the peer responds accordingly by sending user the pice upon receiving the request.
5. When a piece is received from a virtual connection, the estimated download speed $V_{conn}$ is updated, and another remaining arbitrary piece will be requested from the connection immediately, until all the data is downloaded.
6. When a download request times out, the request is cancelled and all connections to the non-responding peer will be closed. The download requests of the remaining pieces will be re-routed to other peers. In this case, the non-responding peer will also be penalized, and the number of connections that can be established from the peer in future downloads is reduced.

Based on the past experience of building high-performing P2P network, PPIO's design allows multiple connections to be established from each peer. It significantly improves the overall transmission efficiency of the network, especially for TCP connections, as it works around the low efficiency problem caused by TCP's conservative flow control.

## Real-time Data Streaming

In addition to supporting efficient file download, PPIO also supports optimized P2P data streaming. PPIO's data-driven scheduler is designed to provide stable real-time streaming performance in an ad-hoc P2P network.[3] The technology has gone through many iterations of trial-and-error optimizations, and is proven to provide high quality user experience to streaming applications such as video-on-demand (VOD) service.

A P2P streaming system has the following unique design characteristics:

- **Sequential download.** In order to maintain smooth streaming playback, subsequent segments and pieces from the current point of playback need to be prioritized in download scheduling.
- **Piece prioritization.** Pieces with the smallest number of duplicates in the network need to be prioritized during download. This may seem counterintuitive, but prioritizing these pieces will help make downloading of the entire segment much faster.
- **Random access.** Many streaming applications allow random access playback such as fast forwarding or seeking. To improve the experience, pieces at pre-defined random access points are prioritized during download. In this case there is a higher chance that necessary pieces are already downloaded to allow the playback to start immediately after seeking.

To achieve the design requirements above, a scheduling algorithm is required to make smart decisions on which peer a piece should be downloaded from, how many peers should be used for simultaneous download, how to set up timer for each peer, how to reschedule remaining pieces and adapt to network changes, etc. The scheduler is also designed to maximize download speed and minimize the overhead of duplicated requests and data transmission. A summary of the scheduling algorithm is as follows:

1. Similar to file download, multiple connections are established with each peer, and the estimated transmission speed $V_{conn}$ is calculated per peer.
2. Pieces to be downloaded are sorted based on their priorities and pre-allocated to available connections by placing them in the corresponding download queues. The estimated arrival time for each piece can be calculated based on the speed of each connection and the remaining pieces to be downloaded in each queue. In general, pieces with higher priority should end up with an earlier estimated arrival time.
3. Step 2 is repeated periodically and all remaining pieces will be re-allocated to accommodate changes in the transmission speed and availability of the virtual connections.
4. After a piece is successfully downloaded, the transmission speed of the connection is updated, and a request is sent immediately to download the next piece in the queue.
5. Urgent pieces can be requested from multiple connections to ensure smooth playback.
6. Other parts of the algorithm works the same way as in normal file download.

**Environment variables of the pre-allocation algorithm**
``` go
// Definition of each virtual connection
struct PeerConn {
    speed := estimated speed of this virtual connection, in KB/s
    queue := virtual download queue of this connection
    isReq := is there pending request  
    lastReqTime := estimated arrival time of the last piece in queue, in ticks
}

pieceSize := size of the piece, in KB
nowTick := current time, in ticks
Peer[] conns := available connections
pieces := pieces sorted by priority
```
**Pseudo code**
``` go
// Algorithm: Pre-schedule for the upcoming Piece, the result of the scheduling exists in the download queue of each tunnel.
//Procedure : PreSchedule()
//Input : conns, pieces, pieceSize, nowT ick Output : connRequestQueues

// Define the time each PeerConn forecast will receive the Piece
uint32 lastRecvTimes[conn.length];
foreach i,conn in conns do
  // Clear previously pre-schedule content
  conn.prescheduleQueue.clear();
  // If there is no request before, the current time is the actual time
  if conn.isReq = true then
    lastRecvTimes[i] <- nowTick;
  else
    lastRecvTimes[i] <- conn.lastReqTime + pieceSize/conn.speed;
  end
end

foreach pieceInx in piece do
  // Define the time each PeerConn forecast will receive the Piece
  uint32 predTimes[conn.length];
  foreach i, conn in conns do
    predTimes[i] <- conn.lastRecvTimes[i] + pieceSize/conn.speed;
  end
  // Find the conn which will receive the piece earlist
  predictInx ← conn minInx(predictRecvTime);
  conns[predictInx].queue.enqueue(pieces[pieceInx]);
  lastRecvTimes[predictInx] += pieceSize/conns[predictInx].speed;
end
connRequestQueues <- conns[].queue;
return connRequestQueues
```
![Illustration of pre-allocation](../Images/pre-schedule.png)
<p style="font-size:14px; text-align:center;">Illustration of pre-allocation</p>

PPIO's P2P transmission network is fully dynamic. Each peer responds to multiple download requests, and potentially to multiple downloading nodes. Each downloading node sends download requests to multiple peers, manages downloaded pieces and deals with potential timeouts and failures from the peers. At the same time, the downloading node itself can be serving download requests, working as a peer to other nodes. By utilizing the two data-driven scheduling algorithms, PPIO's dynamic P2P network is able to handle extremely high volume of concurrent data transmission efficiently.
