/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Keep Firebase outside the RSC/server webpack bundle. Bundling it causes
  // duplicate module copies so Firestore's `instanceof` checks fail with:
  // "Expected first argument to doc() to be a CollectionReference..."
  serverExternalPackages: [
    "firebase",
    "@firebase/app",
    "@firebase/auth",
    "@firebase/firestore",
    "@firebase/util",
    "@firebase/component",
    "@firebase/logger",
    "@firebase/webchannel-wrapper",
  ],
};

export default nextConfig;
