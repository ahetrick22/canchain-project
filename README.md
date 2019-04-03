# CanChain

CanChain is a demo app created with the intention of using a private blockchain. A blockchain version is not currently deployed, but the off-chain demo is available hosted on Heroku [here](https://canchain.herokuapp.com).  It uses a Node/MySQL backend and a React/Redux frontend.

If you'd like to run the on-chain version locally, you'll need the [Metamask](https://www.metamask.io) browser extension and [Ganache](https://truffleframework.com/docs/ganache/quickstart), from the [Truffle Suite](https://www.truffleframework.com).

Connect Metamask to your Ganache blockchain once you have it running and make sure that the port specified in truffle-config.js is the same one. 

Ensure you have run `<npm install>` in both the root folder and the client folder.

In the root folder, use `<truffle migrate>` to compile and migrate your contracts. Then `<npm run dev>` will launch the app.
