// hardcoding the apis just for the sake of this demo
export const config = {
  usda: {
    apiKey: process.env.USDA_API || 'FQX8nVTZlGIKRyxzBTJJTaKeMBkpIPZNgxTdN1Px'
  },
  edamam: {
    apiKey: process.env.EDAMAM_KEY || 'de477c78f5de444e37261e320e4a4d3a',
    appId: process.env.EDAMAM_APP_ID || '68ad704d'
  }
};
