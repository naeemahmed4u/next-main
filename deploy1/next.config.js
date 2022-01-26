// const withPWA = require("next-pwa");

// module.exports = withPWA({

module.exports = {

  images:{
    domains: ['localhost'],
    reactStrictMode: false,
  },
  
  MONGODB: 'mongodb+srv://madmin:GulzarSabri@cluster0.6jnhf.mongodb.net/asset?retryWrites=true&w=majority',    
  SECRET_KEY: 'some very secret key'
  
  // pwa: {
  //   dest: "public",
  //   register: true,
  //   skipWaiting: true,
  // },



  // distDir: 'build',
  // httpAgentOptions: {
  //   keepAlive: false,
  // },
  // reactStrictMode: true,
  // webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
  //   // Fixes npm packages that depend on `fs` module
  //   if (!isServer) {
  //     config.node = {
  //       fs: 'empty',
  //       child_process: 'empty', 
  //       readline: 'empty'        
  //     }
  //   }

  //   return config
  // }

};
// });




 
