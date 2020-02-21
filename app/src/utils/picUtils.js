const picUtils = {}

picUtils.getPictUrl = (img) => {
  let url = null;
  if (window.createObjectURL!==undefined) {
    url = window.createObjectURL(img) ;
  } else if (window.URL!==undefined) {
    url = window.URL.createObjectURL(img) ;
  } else if (window.webkitURL!==undefined) {
    url = window.webkitURL.createObjectURL(img) ;
  }
  return url ;
}

picUtils.handleImgClick = (id,previewStyle,amplificationStyle) => {
  const flag = document.getElementById(id).getAttribute("class")===previewStyle
  if(flag){
    document.getElementById(id).setAttribute("class",amplificationStyle)
  }else {
    document.getElementById(id).setAttribute("class",previewStyle)
  }
}

export default picUtils