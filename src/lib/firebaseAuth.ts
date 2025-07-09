import { init } from 'next-firebase-auth';

const getRequiredEnvVar = (envVar: string): string => {
    const value = process.env[envVar];
    if (!value) {
        throw new Error(`Missing required environment variable: ${envVar}`);
    }
    return value;
};

const initAuth = () => {
    init({
        authPageURL: '/auth/login',
        appPageURL: '/dashboard',
        loginAPIEndpoint: '/api/login',
        logoutAPIEndpoint: '/api/logout',
        onLoginRequestError: (error) => {
            console.error(error);
        },
        onLogoutRequestError: (error) => {
            console.error(error);
        },
        firebaseAdminInitConfig: {
            credential: {
                projectId: getRequiredEnvVar('FIREBASE_PROJECT_ID'),
                clientEmail: getRequiredEnvVar('FIREBASE_CLIENT_EMAIL'),
                privateKey: getRequiredEnvVar('FIREBASE_PRIVATE_KEY')?.replace(/\\n/g, '\n'),
            },
            databaseURL: getRequiredEnvVar('FIREBASE_DATABASE_URL'),
        },
        firebaseClientInitConfig: {
            apiKey: getRequiredEnvVar('NEXT_PUBLIC_FIREBASE_API_KEY'),
            authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
            storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
            messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
            appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
            measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
        },
        cookies: {
            name: 'DevSnapAuth',
            keys: [
                process.env.COOKIE_SECRET_CURRENT,
                process.env.COOKIE_SECRET_PREVIOUS,
            ],
            httpOnly: true,
            maxAge: 12 * 60 * 60 * 24 * 1000,
            overwrite: true,
            path: '/',
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
            signed: true,
        },
    });
};

export default initAuth;