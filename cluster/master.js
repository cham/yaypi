const cluster = require('cluster')
const os = require('os')
const config = require('../config')
const db = require('../db')

config.check()
config.log()

db.connect().then(() => {
  const totalInstances = config.get('SINGLE_CORE_MODE') ? 1 : os.cpus().length
  let currentInstances = 0

  const increment = () => {
    currentInstances++

    if (currentInstances === totalInstances) {
      console.info(totalInstances + ' workers listening.')
    }
  }

  for (let i = 0; i < totalInstances; i++) {
    cluster.fork().once('listening', increment)
  }

  const handleExit = (worker) => {
    console.error('Worker died. PID: ' + worker.process.pid)

    if (!config.get('SINGLE_CORE_MODE')) {
      const newWorker = cluster.fork().once('listening', () => {
        console.info('Replacement worker spawned. PID: ' + newWorker.process.pid)
      })
    }
  }

  cluster.on('exit', handleExit)
})
