const fs = require('fs')
const path = require('path')
const { getAllImageLinks } = require('./getAllImageLinks')
const { downloadImage } = require('./downloadImage')

const jsonsInDir = fs
  .readdirSync('./JsonFiles')
  .filter((file) => path.extname(file) === '.json')

jsonsInDir.forEach((file) => {
  try {
    const fileData = fs.readFileSync(path.join('./JsonFiles', file))
    const json = JSON.parse(fileData.toString())
    const { data } = json

    // Promise.all(newAspectObject).then((res) => {
    //   fs.writeFile(
    //     `./ResultFiles/finalObject-${res[0]._id}.json`,
    //     JSON.stringify(res),
    //     'utf8',
    //     () => console.log('Done Writing')
    //   )
    // })
    const { _id, imageLinks, metaTitle } = getAllImageLinks(data)

    if (!fs.existsSync(`./L1Images/${metaTitle}-${_id}`)) {
      fs.mkdirSync(`./L1Images/${metaTitle}-${_id}`)
    }

    const downloadAllImage = imageLinks.map(async (item) => {
      await downloadImage(
        item.url,
        `./L1Images/${metaTitle}-${_id}/${item.name}.png`
      )
    })
  } catch (error) {
    console.log(error)
  }
})
