const fs = require('fs')
fs.writeFileSync('./.env', `MAPS_API_KEY=${process.env.MAPS_API_KEY}\nREQUEST_URL=${process.env.REQUEST_URL}`)
