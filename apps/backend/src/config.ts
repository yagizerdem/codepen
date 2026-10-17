export const config = {
    env: process.env.NODE_ENV ?? 'development',
    port: Number(process.env.PORT) || 3000,
    corsOrigin: process.env.CORS_ORIGIN ?? 'http://localhost:5173', // Vite default
};
