import env from 'react-dotenv';

const Config = {
    fnzApiUrl: env.FNZ_API_URL,
    headers: { "x-usercontext": "UserID=8245" }
}

export default Config;
