/** @type {import('next').NextConfig} */
const nextConfig = {
  // Export estático: gera a pasta /out, que o Cloudflare Pages publica direto na CDN.
  output: "export",
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  // O otimizador de imagens do Next precisa de servidor. No export estático ele fica desligado.
  images: { unoptimized: true },
};

export default nextConfig;
