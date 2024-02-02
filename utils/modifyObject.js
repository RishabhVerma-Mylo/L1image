let returnObj = (obj) => {
  let { items } = obj

  return items.map((item) => ({
    _id: item._id,
    itemType: item.itemType,
    image: item.image,
    itemName: item.itemName,
    deeplink: item.deeplink,
    deeplinkValue: item.deeplinkValue,
  }))
}

function modifyObject(obj) {
  const newData = obj.map((item) => {
    // console.log(!typeToKeep.includes(item.itemType))
    // if (!typeToKeep.includes(item.itemType)) return
    if (item.items && item.items.length > 0) return returnObj(item)
    else
      return {
        _id: item._id,
        itemType: item.itemType,
        image: item.image,
        itemName: item.itemName,
        deeplink: item.deeplink,
        deeplinkValue: item.deeplinkValue,
      }
  })

  return newData.flat(2)
}
