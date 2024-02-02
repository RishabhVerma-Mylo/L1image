const { data } = require('./JsonFiles/resultObject-6512.json')

let returnObj = (obj) => {
  let { items } = obj

  return items.map((item) => {
    if (item.itemType == 'BANNER')
      return {
        'General Item Id': item._id,
        // name: item.itemName,
        itemType: item.itemType,
        image: item.image,
        sectionBgImage: item.sectionBgImage,
      }
  })
}

const getAllImageLinks = (objs) => {
  const ImageObj = {
    _id: objs._id,
    metaTitle: objs.metaTitle,
    imageLinks: [],
  }
  const imageItems = objs.items
    .map((item) => {
      if (item.itemType == 'MARQUEE_BANNERS') return
      if (item.items && item.items.length > 0) return returnObj(item)

      if (item.itemType == 'BANNER')
        return {
          'General Item Id': item._id,
          // name: item.itemName,
          itemType: item.itemType,
          image: item.image,
          sectionBgImage: item.sectionBgImage,
        }
    })
    .flat()
    .filter((item) => item !== undefined)
  // .filter((item) => item !== undefine)

  const imageGetSectionBgImage = objs.items
    .map((item) => {
      if (item.sectionBgImage) {
        return {
          'General Item Id': item._id,
          // name: item.itemName,
          itemType: item.itemType,
          image: item.image,
          sectionBgImage: item.sectionBgImage,
        }
      }
    })
    .flat()
    .filter((item) => item !== undefined)

  ImageObj.imageLinks = [...imageItems, ...imageGetSectionBgImage]
  return ImageObj
}

const result = getAllImageLinks(data)
console.log(result)
module.exports = { getAllImageLinks }
