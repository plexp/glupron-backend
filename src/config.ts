import { ConfigChecker } from 'configchecker';

const config = ConfigChecker.from(process.env);

export const PORT = config.get('PORT').number().default(3000).value;
export const PUBLIC_URL = config
    .get('PUBLIC_URL')
    .url()
    .required().value;
export const AZURE_APIKEY = config.get('AZURE_APIKEY').required().value;
