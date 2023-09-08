


/**
 * 图片压缩
 * @param file 图片File
 * @param compressionRatio 压缩比，输入范围0.0-1.0
 * @returns 返回图片File
 */
export const compressImage=(file, compressionRatio)=> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          canvas.toBlob((blob) => {
            const compressedFile = new File([blob], file.name, { type: file.type });
            resolve(compressedFile);
          }, file.type, compressionRatio);
        };
      };
      reader.onerror = (error) => reject(error);
    });
  }

  // export async function CompressorVideo(file: File){
  //   const filePath = URL.createObjectURL(file)
  //   console.log('videoURI==',filePath);
  //   let result = await Compressor.Video.compress(
  //     filePath,
  //     {
  //       minimumFileSizeForCompress:3, // 3M以内不进行压缩
  //       bitrate: 49152 //  48K  可以修改
  //     },
  //     (progress) => {
  //       console.log('Compression Progress: ', progress);
  //     }
  //   )
    
  //   console.log('CoompressorVideo===',result);
  //   // 上传
  // }


  
  
  