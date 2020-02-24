const picUtils = {}

picUtils.getPictUrls = (imgs) => {
  let urls = []
  for(let i = 0 ; i < imgs.length;i++){
    if (window.createObjectURL!==undefined) {
      urls.push(window.createObjectURL(imgs[i]))
    } else if (window.URL!==undefined) {
      urls.push(window.URL.createObjectURL(imgs[i]))
    } else if (window.webkitURL!==undefined) {
      urls.push(window.webkitURL.createObjectURL(imgs[i]))
    }
  }
  return urls ;
}

picUtils.getPicBlobs = (imgs) => {
  let blobs = [];
  for(let i = 0 ; i < imgs.length;i++) {
    blobs.push(new Blob([imgs[i]],{type:"image/*"}))
  }
  return blobs
}

picUtils.removeImg = (index, imgBlobs, imgURLs) => {
  let newBlobs = imgBlobs
  let newURLs = imgURLs
  newBlobs.splice(index,1)
  newURLs.splice(index,1)
  return {newBlobs,newURLs}
}

export default picUtils