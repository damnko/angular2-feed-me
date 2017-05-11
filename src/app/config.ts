import { config } from 'firebase-functions';

export const config = {
  usda: {
    apiKey: process.env.USDA_API || config().usda.api || 'YOUR_USDA_API_KEY'
  },
  edamam: {
    apiKey: process.env.EDAMAM_KEY || config().edamam.key || 'YOUR_EDAMAM_API_KEY',
    appId: process.env.EDAMAM_APP_ID || config().edamam.id || 'YOUR_EDAMAM_APP_ID'
  }
};
