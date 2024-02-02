const axios = require('axios')
const fs = require('fs')

async function downloadImage(url, filename) {
  const response = await axios.get(url, { responseType: 'arraybuffer' })

  fs.writeFile(filename, response.data, (err) => {
    if (err) throw err
    console.log('Image downloaded successfully!')
  })
}

downloadImage('https://images.myloapp.in/tags/170195007042.webp', 'image.webp')

module.exports = { downloadImage }
