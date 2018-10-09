module.exports = {
  base:'/',
  themeConfig: {
    displayAllHeaders: true,
    activeHeaderLinks: true,
    sidebar: [
     '/Getting_Started',
     '/System_Design/',
     {
       title: 'P2P Network',
       collapsable: false,
       children:[
         '/P2P_Network/Data_Driven_Scheduling',
         '/P2P_Network/Distributed_Database_and_Routing',
         '/P2P_Network/P2P_Self_Organizing_Overlay_Networks',
         '/P2P_Network/Optimized_Distribution_of_Popular_Content',
         '/P2P_Network/ISP_Friendly_Scheduling',
         '/P2P_Network/PCDN'
       ]
     },
     '/Four_Proof_Algorithms',
     '/Five_Kinds_of_Attacks',
     {
       title: 'Seven Layer Architecture',
       collapsable: false,
       children:[
         '/Architecture/1_Physical_Layer',
         '/Architecture/2_Data_Layer',
         '/Architecture/3_Network_Layer',
         '/Architecture/4_Consensus_Layer',
         '/Architecture/5_Incentive_Layer',
         '/Architecture/6_Interface_Layer',
         '/Architecture/7_Application_Layer'
       ]
     },
     '/Cli_Reference',
     '/PPIO_SDK',
    ],
    sidebarDepth: 0
  }
}
