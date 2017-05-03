export const config = {
  usda: {
    apiKey: process.env.USDA_API || 'YOUR_USDA_API_KEY'
  },
  edamam: {
    apiKey: process.env.EDAMAM_KEY || 'YOUR_EDAMAM_API_KEY',
    appId: process.env.EDAMAMA_APP_ID || 'YOUR_EDAMAM_APP_ID'
  }
};
