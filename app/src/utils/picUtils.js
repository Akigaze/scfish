import preCursor from "../asset/icon/pre_cursor.ico"
import nextCursor from "../asset/icon/next_cursor.ico"

const picUtils = {}

picUtils.getPictUrl = (img) => {
  let url = ''
  if (window.createObjectURL !== undefined) {
    url = window.createObjectURL(img)
  } else if (window.URL !== undefined) {
    url = window.URL.createObjectURL(img)
  } else if (window.webkitURL !== undefined) {
    url = window.webkitURL.createObjectURL(img)
  }
  return url
}

picUtils.getPictUrls = (imgs) => {
  let urls = []
  for (let i = 0; i < imgs.length; i++) {
    if (window.createObjectURL !== undefined) {
      urls.push(window.createObjectURL(imgs[i]))
    } else if (window.URL !== undefined) {
      urls.push(window.URL.createObjectURL(imgs[i]))
      console.log(imgs[i])
    } else if (window.webkitURL !== undefined) {
      urls.push(window.webkitURL.createObjectURL(imgs[i]))
    }
  }
  return urls;
}

picUtils.getPicBlob = (img) => {
  return new Blob(img, {type: "image/*"})
}

picUtils.getPicBlobs = (imgs) => {
  let blobs = [];
  for (let i = 0; i < imgs.length; i++) {
    blobs.push(new Blob([imgs[i]], {type: "image/*"}))
  }
  return blobs
}

picUtils.removeImg = (index, imgBlobs, imgURLs) => {
  let newBlobs = imgBlobs
  let newURLs = imgURLs
  newBlobs.splice(index, 1)
  newURLs.splice(index, 1)
  return {newBlobs, newURLs}
}

picUtils.mouseMoveInImg = (event, img) => {
  let handleArea = img.width / 5
  let clickPositionX = event.clientX - window.innerWidth / 2
  if (clickPositionX < 0 && Math.abs(clickPositionX) > handleArea) {
    img.style.cursor = "url("+preCursor+"),auto"
  }else if (clickPositionX > 0 && clickPositionX > handleArea) {
    img.style.cursor = "url("+nextCursor+"),auto"
  }else {
    img.style.cursor = ""
  }
}

picUtils.handleImgClick = (event, img, currentPostId, currentIndex) => {
  let handleArea = img.width / 5
  let clickPositionX = event.clientX - window.innerWidth / 2
  if (clickPositionX < 0 && Math.abs(clickPositionX) > handleArea) {
    if(currentIndex!==0){
      currentIndex -= 1
    }
  }else if (clickPositionX > 0 && clickPositionX > handleArea) {
    if(document.getElementById(currentPostId+"-"+(currentIndex+1))){
      currentIndex += 1
    }
  }else {
    img.className = "img-hidden"
  }
  return currentIndex
}

export default picUtils