//sets up the configuration for Truffle suite to access correct network 
//at some point, would want to add production network details

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    }
  }
};