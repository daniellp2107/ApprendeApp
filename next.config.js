/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{
    domains:['ibb.co','i.ibb.co','mdbootstrap.com',""]
  },
  // webpack(config, options) {
  //   config.module.rules.push({
  //     test: /\.(ogg|mp3|m4a|wav|mpe?g)$/i,
  //     use: {
  //       loader: 'file-loader',
  //     },
  //   });
  //   return config;
  // }
}

module.exports = nextConfig
