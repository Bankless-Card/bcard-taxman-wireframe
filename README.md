# BCard TaxMan
## A Tool for DAO Contributors

MVP - Development Prototype

At its heart, this is a [wagmi](https://wagmi.sh) + [Web3Modal](https://web3modal.com/) + [Vite](https://vitejs.dev/) project bootstrapped with [`create-wagmi`](https://github.com/wagmi-dev/wagmi/tree/main/packages/create-wagmi)

The amazing UI was designed by @jasu and developed by @titesan with inttegration work by @links and @tomtranmer.

## Adding new tokens - a basic guide
1. Get Info: token label - as output on chain record - e.g. "USDC"
### Make app aware of token in lookup
2. TOKEN NAME DISPLAY: functions/getTokenLabel.tsx - e.g. if(asset==="USDC"){return "USDC Stablecoin"}
3. 

# Getting Started

Run `npm run dev` in your terminal, and then open [localhost:5173](http://localhost:5173) in your browser.

Once the webpage has loaded, changes made to files inside the `src/` directory (e.g. `src/App.tsx`) will automatically update the webpage.

# Learn more

To learn more about [Vite](https://vitejs.dev/) or [wagmi](https://wagmi.sh), check out the following resources:

- [wagmi Documentation](https://wagmi.sh) – learn about wagmi Hooks and API.
- [wagmi Examples](https://wagmi.sh/examples/connect-wallet) – a suite of simple examples using wagmi.
- [Web3Modal Documentation](https://web3modal.com) – learn more about Web3Modal (configuration, theming, advanced usage, etc).
- [Vite Documentation](https://vitejs.dev/) – learn about Vite features and API.
