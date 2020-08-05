import { Injectable } from '@angular/core';
import { Crop } from '@ionic-native/crop/ngx';
import { ImagePicker, OutputType } from '@ionic-native/image-picker/ngx';
import { Base64 } from '@ionic-native/base64/ngx';

@Injectable({
  providedIn: 'root'
})
export class ImagesRetriverService {

  filename: string;
  base64Image: string;

  constructor(
    private crop: Crop,
    private imagepiker: ImagePicker,
    private base64: Base64
  ) {
  }

  saveToFile(image) {
    console.log('Saving image to file');
  }

  async retrieveFromPhone() {
    console.log('Using image piker');
    const hasPerm = await this.imagepiker.hasReadPermission();
    if (hasPerm) {
      console.log('I have the permission. No matter request for it');
    }
    // if (!hasPerm) {
    return await this.imagepiker.requestReadPermission().then(
      async (value) => {
        // hasPerm = await this.imagepiker.hasReadPermission();
        console.log(value);
        if (value) {
          const paths = await this.imagepiker.getPictures({
            maximumImagesCount: 1,
            outputType: OutputType.FILE_URL,
            width: 600,
            height: 600,
          });

          let path: string;
          path = paths[0];
          console.log('TO CROP');
          console.log(path);
          path = await this.crop.crop(path, {
            quality: 100,
            targetHeight: 1024,
            targetWidth: 700,

          });

          console.log('CROPED');
          console.log(path);

          return path;

          // const cropped = path.replace(this.file.cacheDirectory, '');
          // this.file.copyFile(this.file.cacheDirectory, cropped, this.file.dataDirectory, this.fileid + );

          // return 
        } else {
          return Promise.reject('Permission not accorded');
        }
      }
    ).catch((error) => {
      return Promise.reject('Permission not accorded');
    });
    // }
  }

  retrieveFromCamera() {
    console.log('Using camera to take new picture');
    console.log('fait avec le clavier de mon smaetphone. #awesome');
  }

  async toBase64String(path: string, ext: string) {
    return await this.base64.encodeFile(path).then((value) => {

      value = value.substring(value.indexOf(',') + 1);

      // console.log(value);
      // data:image/*;charset=utf-8;base64,
      return value;
      // return ''
    }).catch(reason => {
      console.log('Cannt convert the image at \"' + path + '\" to base64');
      console.log('File path must be like  file:///...');
      console.log(reason);
      return Promise.reject(reason);
    });
  }

  replaceFirst(char, by, data: string) {
    const index = data.indexOf(char);
    return data.substring(0, index) + by + data.substring(index + 1);
  }

}
