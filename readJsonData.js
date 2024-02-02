const fs = require('fs')
const path = require('path')

const jsonsInDir = fs
  .readdirSync('./JsonFiles')
  .filter((file) => path.extname(file) === '.json')

jsonsInDir.forEach((file) => {
  const fileData = fs.readFileSync(path.join('./JsonFiles', file))
  const json = JSON.parse(fileData.toString())
  const {
    data: { items },
  } = json

  let modifiedItem = modifyObject(items)

  const newAspectObject = getNewAspectObject(modifiedItem)

  Promise.all(newAspectObject).then((res) => {
    fs.writeFile(
      `./ResultFiles/finalObject-${res[0]._id}.json`,
      JSON.stringify(res),
      'utf8',
      () => console.log('Done Writing')
    )
  })
})
