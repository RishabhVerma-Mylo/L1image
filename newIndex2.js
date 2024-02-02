const fs = require('fs')
const path = require('path')
const { getAllImageLinks } = require('./getAllImageLinks')
const { getAspectRatio } = require('./aspectRatio')
const { writeToExcel } = require('./writeToExcel')
let finalObject = []
let idObject = []

const writeIdObject = (object) => {
  fs.writeFile(`./FinalObject.json`, JSON.stringify(object), 'utf8', () =>
    console.log('Done Writing')
  )
}

const jsonsInDir = fs
  .readdirSync('./JsonFiles')
  .filter((file) => path.extname(file) === '.json')

jsonsInDir.forEach((file) => {
  try {
    const fileData = fs.readFileSync(path.join('./JsonFiles', file))
    const json = JSON.parse(fileData.toString())
    const { data } = json

    const { _id, imageLinks, metaTitle } = getAllImageLinks(data)

    idObject.push({
      _id,
      imageLinks,
      metaTitle,
      noOfImages: imageLinks.length,
    })

    const aspectPromise = imageLinks.map(async (item) => {
      console.log(item.image, item.sectionBgImage)
      if (item.image) {
        let aspectRatio = await getAspectRatio(item.image)

        // if (aspectRatio === undefined) return
        return {
          'General Item Id': item['General Item Id'],
          image: item.image,
          // itemType: item.itemType,
          imageRatio: aspectRatio['Aspect Ratio'],
          sectionBgImage: item.sectionBgImage,
          sectionBgMobileRatio: null,
        }
      } else {
        // console.log(item)
        let aspectRatio = await getAspectRatio(item.sectionBgImage)
        // if (aspectRatio === undefined) return

        return {
          'General Item Id': item['General Item Id'],
          image: item.image,
          // itemType: item.itemType,
          imageRatio: null,
          sectionBgImage: item.sectionBgImage,
          sectionBgMobileRatio: aspectRatio['Aspect Ratio'],
        }
      }
    })

    Promise.all(aspectPromise)
      .then((res) => {
        // if (res === undefined) return
        finalObject.push(...res)
      })
      .then((res) => {
        // console.log(finalObject)
        // if (res == undefined) return
        // writeToExcel(finalObject)
        writeIdObject(idObject)
        // console.log('Done Writing')
      })
  } catch (error) {
    console.log(error)
  }
})
