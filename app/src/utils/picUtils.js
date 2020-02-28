import preCursor from "../asset/icon/pre_cursor.ico"
import nextCursor from "../asset/icon/next_cursor.ico"

const picUtils = {}

picUtils.getPictUrl = (img) => {
  let url = undefined
  if (window.createObjectURL !== undefined) {
    url = window.createObjectURL(img)
  } else if (window.URL !== undefined) {
    url = window.URL.createObjectURL(img)
  } else if (window.webkitURL !== undefined) {
    url = window.webkitURL.createObjectURL(img)
  }
  return url
}

picUtils.getImgUrlAndBlob = (img, callback) => {
  picUtils.compress(img, (imgUrl, imgBlob) => {
    callback(imgUrl, imgBlob)
  })
}

picUtils.removeImg = (index, imgBlobs, imgURLs, previews) => {
  let newBlobs = imgBlobs
  let newURLs = imgURLs
  let newPreviews = previews
  newBlobs.splice(index, 1)
  newURLs.splice(index, 1)
  newPreviews.splice(index, 1)
  return {newBlobs, newURLs, newPreviews}
}

picUtils.changeCursorInImage = (event, img) => {
  let handleArea = img.width / 5
  let clickPositionX = event.clientX - window.innerWidth / 2
  if (clickPositionX < 0 && Math.abs(clickPositionX) > handleArea) {
    img.style.cursor = "url(" + preCursor + "),auto"
  } else if (clickPositionX > 0 && clickPositionX > handleArea) {
    img.style.cursor = "url(" + nextCursor + "),auto"
  } else {
    img.style.cursor = ""
  }
}

picUtils.handleImgClick = (event, img, currentPostId, currentIndex) => {
  let handleArea = img.width / 5
  let clickPositionX = event.clientX - window.innerWidth / 2
  if (clickPositionX < 0 && Math.abs(clickPositionX) > handleArea) {
    if (currentIndex !== 0) {
      currentIndex -= 1
    }
  } else if (clickPositionX > 0 && clickPositionX > handleArea) {
    if (document.getElementById(currentPostId + "-" + (currentIndex + 1))) {
      currentIndex += 1
    }
  } else {
    img.className = "img-hidden"
  }
  return currentIndex
}

picUtils.handleImgPreview = (img, callback) => {
  let preview = new Image()
  if(img instanceof File){
    preview.src = picUtils.getPictUrl(img)
  }else{
    preview.src = "data:image/png;base64,"+img
  }
  preview.onload = function () {
    const scale = preview.width / preview.height
    let canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    canvas.width = 120
    canvas.height = 120
    if (scale >= 1) {
      ctx.drawImage(preview, 0, 60 - 60 / scale, 120, 120 / scale)
      callback(canvas.toDataURL("image/jpg"))
    } else {
      ctx.drawImage(preview, 60 - 60 * scale, 0, 120 * scale, 120)
      callback(canvas.toDataURL("image/jpg"))
    }
  }
}


picUtils.compress = (img, callback) => {
  const size = img.size / (1024 * 1024)
  let newImg = new Image()
  newImg.src = picUtils.getPictUrl(img)
  newImg.onload = function () {
    let canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (size > 2) {
      canvas.width = newImg.width / 2
      canvas.height = newImg.height / 2
      ctx.drawImage(newImg, 0, 0, newImg.width / 2, newImg.height / 2)
    } else {
      canvas.width = newImg.width
      canvas.height = newImg.height
      ctx.drawImage(newImg, 0, 0, newImg.width, newImg.height)
    }
    const imgUrl = canvas.toDataURL("image/jpg")
    canvas.toBlob(blob => {
      callback(imgUrl, blob)
    }, "image/jpg")
  }
}

export default picUtils