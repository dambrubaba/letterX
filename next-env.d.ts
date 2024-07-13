/// <reference types="next" />
/// <reference types="next/image-types/global" />
/// <reference types="next-auth" />
/// <reference types="next-auth/jwt" />

declare namespace NodeJS {
  interface ProcessEnv {
    AUTH0_SECRET: string;
    AUTH0_BASE_URL: string;
    AUTH0_ISSUER_BASE_URL: string;
    AUTH0_CLIENT_ID: string;
    AUTH0_CLIENT_SECRET: string;
  }
}
// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.
