// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="vite/client" />
/// <reference types="../vendor/integration/types.d.ts" />
/// <reference types="astro-clerk-auth/env" />

interface ImportMetaEnv {
    readonly PUBLIC_ASTRO_APP_CLERK_PUBLISHABLE_KEY?: string;
    readonly CLERK_SECRET_KEY?: string;
    readonly POSTGRES_URL?: string;
    readonly EMAILJS_PUBLIC_KEY_ID?: string;
    readonly EMAILJS_TEMPLATE_ID?: string;
    readonly EMAILJS_SERVICE_ID?: string;
    readonly MAILTRAP_API_KEY?: string;
    readonly TOKEN_API_KEY?: string;
    readonly CRON_SECRET?: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
