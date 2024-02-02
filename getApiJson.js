var fs = require('fs')
require('dotenv').config()

const dataArray = [
  5179, 6512, 6560, 6561, 6729, 6734, 6782, 6936, 6938, 6940, 7167, 7221, 7222,
  7512, 7519, 7520, 7521, 7571, 7576, 7577, 7578, 7582, 7585, 7586, 7587, 7588,
  7589, 7590, 7591, 7593,
]

async function sendPostRequest(data) {
  for (const item of data) {
    const apiUrl = `https://test-api.myloapp.in/new/generalTab/getTabByKeyForWeb?key=${item}&Mylo-In-App=false&type=chan`
    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // 'Mylo-In-App': false,
          Authorization: `Bearer ${process.env.API_TOKEN}`,
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`, response)
      }

      const responseData = await response.json()
      var json = JSON.stringify(responseData)

      fs.writeFile(`./JsonFiles/resultObject-${item}.json`, json, 'utf8', () =>
        console.log('Done Writing')
      )
    } catch (error) {
      console.error(error)
    }
  }
}

// Call the function to send POST request
sendPostRequest(dataArray)

module.export = { sendPostRequest }
