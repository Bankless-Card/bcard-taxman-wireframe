const CG_API_URL = process.env.VITE_CG_API_URL;
const CG_API_KEY = process.env.VITE_CG_API_KEY;
const NODE_ENV = process.env.VITE_NODE_ENV;

// Cache duration in seconds (30 days)
const CACHE_DURATION = 30* 60 * 60 * 24;

/**
 * Simple in-memory cache for local development only.
 * This cache won't persist in production as Vercel functions are stateless.
 * In production, Vercel's edge caching will handle caching via Cache-Control headers.
 */
const cache = new Map();

// For local development
const allowCors = fn => async (req, res) => {
  // Only apply CORS headers in development
  if (NODE_ENV === 'development') {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }
  }
  return await fn(req, res);
};

const handler = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { asset, date } = req.query;
  
  if (!asset || !date) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  // Create cache key from query parameters
  const cacheKey = `${asset}-${date}`;

  // Check in-memory cache first (only effective during local development)
  // In production, each serverless function instance is ephemeral and this cache will be empty
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    // Set cache headers for Vercel's CDN, even when serving from in-memory cache
    res.setHeader('Cache-Control', `public, s-maxage=${CACHE_DURATION}, stale-while-revalidate`);
    return res.status(200).json(cachedData);
  }

  const url = `${CG_API_URL}coins/${asset}/history?date=${date}&localization=true`;
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'x-cg-pro-api-key': CG_API_KEY
      }
    });

    const data = await response.json();

    if (data.error || !data.market_data) {
      return res.status(404).json({ error: data.error || 'No market data found' });
    }

    // Return both price data and image URLs
    const result = {
      prices: data.market_data.current_price,
      image: {
        thumb: data.image?.thumb,
        small: data.image?.small,
        large: data.image?.large
      }
    };

    // Store in in-memory cache (only useful during local development)
    // In production, Vercel's edge caching will handle caching instead
    cache.set(cacheKey, result);

    // Set cache headers for Vercel's CDN
    // This is what handles caching in production
    res.setHeader('Cache-Control', `public, s-maxage=${CACHE_DURATION}, stale-while-revalidate`);
    return res.status(200).json(result);
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Failed to fetch price data' });
  }
};

export default allowCors(handler);
