/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        STAGING_ALCHEMY_KEY: "https://eth-goerli.g.alchemy.com/v2/8yg0rVM2v3q6-wuJYoTuDmwclCgeKhvl"
    }
}

module.exports = nextConfig
