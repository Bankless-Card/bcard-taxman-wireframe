# BCard TaxMan
## A Tool for DAO Contributors

MVP - Development Prototype

At its heart, this is a [wagmi](https://wagmi.sh) + [Web3Modal](https://web3modal.com/) + [Vite](https://vitejs.dev/) project bootstrapped with [`create-wagmi`](https://github.com/wagmi-dev/wagmi/tree/main/packages/create-wagmi)

The amazing UI was designed by @jasu and developed by @titesan with inception and integration work by @links and additional development by @tomtranmer.

# Developers Getting Started

## Set up environment variables
1. copy .env.example to .env
2. update .env with your own values

## Running the Web App
Run `npm run dev` in your terminal, and then open [localhost:5173](http://localhost:5173) in your browser.

Once the webpage has loaded, changes made to files inside the `src/` directory (e.g. `src/App.tsx`) will automatically update the webpage.

## Running the API
Run `npm run vercel-dev` in your terminal, which will start a server on [localhost:3000](http://localhost:3000).

Make sure to set `VITE_API_URL` to `http://localhost:3000` in your `.env` file for local development.

# Learn more

To learn more about [Vite](https://vitejs.dev/) or [wagmi](https://wagmi.sh), check out the following resources:

- [wagmi Documentation](https://wagmi.sh) – learn about wagmi Hooks and API.
- [wagmi Examples](https://wagmi.sh/examples/connect-wallet) – a suite of simple examples using wagmi.
- [Web3Modal Documentation](https://web3modal.com) – learn more about Web3Modal (configuration, theming, advanced usage, etc).
- [Vite Documentation](https://vitejs.dev/) – learn about Vite features and API.


# Semi-Deprecated Documentation

The instructions below are semi-deprecated but have been kept because there is still some valuable information we may need to fully deprecate them.

## Adding new tokens - a basic guide

1. Get Info: data/possibleAssets.jsx - active token label array for possibilities - as output on chain record - e.g. "USDC" Note: Order of display on selection list is determined by the order of this data array.
### Make app aware of token in lookup
2. TOKEN NAME DISPLAY: functions/getTokenLabel.tsx - this will control the output of the NAME of the token in APP e.g. if(asset==="USDC"){ return "USDC Stablecoin" }
3. TOKEN LOGO DISPLAY: functions/getTokenLogo.tsx - e.g. if(asset === "USDC"){ return "/img/token/usdc-logo.png" } && add file in public/img/token - prefer min. 400x400px min square or transparent image and will be displayed as round. Limit to ~100kB image.
4. TOKEN DISPLAY AMOUNT (optional override): functions/displayTokenAmount.tsx - for tokens that require a more or fewer than 3 significant digits (i.e. ETH, WBTC) - e.g. if(asset === "WETH"){ return parseFloat(value).toFixed(6) + " " + asset }
5. TOKEN CONVERT AMOUNT: functions/displayConvertAmount.tsx - e.g. if(asset === "WETH") { //a bit more heavy lifting with this one, requiring data , contact tom }
### Update UI to allow selection of Token
6. (auto) TOKEN VISUAL CHECKBOX: components/AccountForm/FormSecondStep.jsx - updated in possible assets && activeAssets state variable to include new selectable token.
7. DATA FILES UPDATE: data/XYZ_feed_2022.tsx - provide USD, CAD pricing objects in output bundle. Using https://www.coingecko.com/en/api/documentation. Import data file into functions/displayConvertAmount.tsx & set convertion specifications.
8. OUTPUT LABELS: functions/exportData.jsx && functions/exportData.jsx - Labels for output - TBD automate import and formatting from possibleAssets data.





