import preCursor from "../asset/icon/pre_cursor.ico"
import nextCursor from "../asset/icon/next_cursor.ico"

const picUtils = {}

picUtils.getImgUrl = (img) => {
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

picUtils.getImgThumbnail = (img, callback) => {
  let preview = new Image()
  if (img instanceof File) {
    preview.src = picUtils.getImgUrl(img)
  } else {
    preview.src = "data:image/*;base64," + img
  }
  preview.onload = function () {
    const scale = preview.width / preview.height
    let canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    canvas.width = 100
    canvas.height = 100
    if (scale >= 1) {
      ctx.drawImage(preview, 0, 50 - 50 / scale, 100, 100 / scale)
      let thumbnailUrl = canvas.toDataURL("image/jpg")
      canvas.toBlob(blob => callback(thumbnailUrl, blob))
    } else {
      ctx.drawImage(preview, 50 - 50 * scale, 0, 100 * scale, 100)
      let thumbnailUrl = canvas.toDataURL("image/jpg")
      canvas.toBlob(blob => callback(thumbnailUrl, blob))
    }
  }
}

picUtils.compress = (img, callback) => {
  const size = img.size / (1024 * 1024)
  let newImg = new Image()
  if (img instanceof File) {
    newImg.src = picUtils.getImgUrl(img)
  } else {
    newImg.src = "data:image/*;base64," + img
  }
  newImg.onload = function () {
    let canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (size > 2) {
      canvas.width = newImg.width / 3
      canvas.height = newImg.height / 3
      ctx.drawImage(newImg, 0, 0, newImg.width / 3, newImg.height / 3)
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

picUtils.handleAvatar = (file, size, callback) => {
  let avatar = new Image()
  avatar.src = picUtils.getImgUrl(file)
  avatar.onload = function () {
    const scale = avatar.width / avatar.height
    let canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    canvas.width = size
    canvas.height = size
    if (scale <= 1) {
      ctx.drawImage(avatar, 0, 0, size, size / scale)
    } else {
      ctx.drawImage(avatar, 0, 0, size * scale, size)
    }
    let url = canvas.toDataURL("image/jpg")
    canvas.toBlob(blob => callback(url, blob), "image/jpg")
  }
}

picUtils.removeImg = (index, imgBlobs, imgURLs, thumbnailUrls) => {
  let newBlobs = imgBlobs
  let newURLs = imgURLs
  let newThumbnailUrls = thumbnailUrls
  newBlobs.splice(index, 1)
  newURLs.splice(index, 1)
  newThumbnailUrls.splice(index, 1)
  return {newBlobs, newURLs, newThumbnailUrls}
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


export default picUtils