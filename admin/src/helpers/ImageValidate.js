export const imageValidate = (image) => {
    const imageName = image?.name
    if(!imageName) return false
    const idxDot = imageName.lastIndexOf(".") + 1;
    const extFile = imageName.substr(idxDot, imageName.length).toLowerCase();
    if (extFile==="jpg" || extFile==="jpeg" || extFile==="png"){
        return true
    }else{
        return false
    }
}