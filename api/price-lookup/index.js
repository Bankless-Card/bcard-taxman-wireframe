const CG_API_URL = process.env.VITE_CG_API_URL;
const CG_API_KEY = process.env.VITE_CG_API_KEY;

// Cache duration in seconds (30 days)
const CACHE_DURATION = 30* 60 * 60 * 24;

// For local development
const allowCors = fn => async (req, res) => {
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

    // Set cache headers
    res.setHeader('Cache-Control', `public, s-maxage=${CACHE_DURATION}, stale-while-revalidate`);
    return res.status(200).json({ prices: data.market_data.current_price });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Failed to fetch price data' });
  }
};

export default allowCors(handler);
