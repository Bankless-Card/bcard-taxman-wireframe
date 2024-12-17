// testing env vars
console.log('Environment variables check:');
console.log('ETH_ALCHEMY_API_KEY exists:', !!import.meta.env.VITE_ETH_ALCHEMY_API_KEY);
console.log('MATIC_ALCHEMY_API_KEY exists:', !!import.meta.env.VITE_MATIC_ALCHEMY_API_KEY);
console.log('OP_ALCHEMY_API_KEY exists:', !!import.meta.env.VITE_OP_ALCHEMY_API_KEY);
console.log('ARBITRUM_ALCHEMY_API_KEY exists:', !!import.meta.env.VITE_ARBITRUM_ALCHEMY_API_KEY);
console.log('BASE_ALCHEMY_API_KEY exists:', !!import.meta.env.VITE_BASE_ALCHEMY_API_KEY);

export const REACT_APP_ALCHEMY_API_KEY = import.meta.env.VITE_REACT_APP_ALCHEMY_API_KEY  
export const ELASTICMAIL_SECURETOKEN = import.meta.env.VITE_ELASTICMAIL_SECURETOKEN  

export const CONVERT_KIT_API_KEY = import.meta.env.VITE_CONVERT_KIT_API_KEY;     
export const CONVERT_KIT_FORM_ID = import.meta.env.VITE_CONVERT_KIT_FORM_ID;     

export const ALCHEMY_API_KEY = import.meta.env.VITE_ALCHEMY_API_KEY;      

export const CG_API_KEY = import.meta.env.VITE_CG_API_KEY;          // coingecko API key for pricing history lookups
export const CG_API_URL = import.meta.env.VITE_CG_API_URL;          // coingecko API url for pricing history lookups    
