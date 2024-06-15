
module.exports = {
    apps: [
      {
        name: 'clickVoice',
        port: '3037',
        exec_mode: 'fork',//cluster
        instances: '1',//max
        script: './.output/server/index.mjs'
      }
    ]
  }
