import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Subscription } from 'rxjs';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CameraPreview, CameraPreviewOptions, CameraPreviewPictureOptions } from '@ionic-native/camera-preview/ngx';


@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
})
export class CameraComponent implements OnInit {

  @Output() picture = new EventEmitter(true);

  isCameraStart = false;
  isCameraFront = false;
  isCameraFlashMode = true;
  cameraFocusPosition = {
    top: 0,
    left: 0,
    show: false
  };

  cameraPreviewOpts: CameraPreviewOptions = {
    x: 0,
    y: 0,
    width: window.screen.width,
    height: window.screen.height,
    camera: 'rear',
    tapPhoto: false,
    tapFocus: false,
    previewDrag: false,
    toBack: true,
    alpha: 1
  };

  pictureOpts: CameraPreviewPictureOptions = {
    width: 1280,
    height: 1280,
    quality: 50
  };

  private orientationSubscription: Subscription;

  constructor(
    private cameraPreview: CameraPreview,
    // private screenOrientation: ScreenOrientation,
    private statusBar: StatusBar,
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.onOpenCameraMenu(null);
  }

  ionViewWillLeave() {
    this.onCloseCameraMenu(null);
  }

  /**
   * On open camera side
   */
  onOpenCameraMenu(event) {
    this.isCameraStart = true;
    this.cameraPreviewOpts = { ...this.cameraPreviewOpts, camera: 'rear', width: window.screen.width, height: window.screen.height };

    this.cameraPreview.startCamera(this.cameraPreviewOpts).then(async (res) => {
      await this.cameraPreview.setFlashMode(this.isCameraFlashMode ? this.cameraPreview.FLASH_MODE.ON : this.cameraPreview.FLASH_MODE.OFF);
      this.statusBar.hide();
    },
      (err) => {
        console.log(err);
      });

    /**
     * Subscribe to orientation change
     */
    // this.orientationSubscription = this.screenOrientation.onChange().subscribe(async () => {
    //   await this.cameraPreview.stopCamera();
    //   this.cameraPreviewOpts = { ...this.cameraPreviewOpts, width: window.screen.width, height: window.screen.height };

    //   this.cameraPreview.startCamera(this.cameraPreviewOpts).then(async (res) => {
    //     await this.cameraPreview.setFlashMode(
    //       this.isCameraFlashMode
    //         ? this.cameraPreview.FLASH_MODE.ON
    //         : this.cameraPreview.FLASH_MODE.OFF
    //     );
    //     console.log(res);
    //   },
    //     (err) => {
    //       console.log(err);
    //     });
    // });
  }

  /**
   * On close camera side
   */
  onCloseCameraMenu(event) {
    this.isCameraStart = false;
    this.cameraPreview.stopCamera();
    this.orientationSubscription.unsubscribe();
    this.statusBar.show();
  }

  /**
   * Switch camera mode
   * rear/front
   */
  switchCamera(event: Event) {
    event.stopPropagation();
    event.preventDefault();

    console.log('switchCamera');
    this.cameraPreview.switchCamera().then(async () => {
      this.isCameraFront = !this.isCameraFront;
      if (!this.isCameraFront) {
        await this.cameraPreview.setFlashMode(
          this.isCameraFlashMode
            ? this.cameraPreview.FLASH_MODE.ON
            : this.cameraPreview.FLASH_MODE.OFF
        );
      }
    });
  }

  /**
   * Take picture camera
   */
  takePicture(event: Event) {
    event.stopPropagation();
    event.preventDefault();

    console.log('takePicture');
    // take a picture
    setTimeout(() => {
      this.picture.emit({
        img: 'data:image/jpeg;base64,'
      });
    }, 500);
    this.cameraPreview.takePicture(this.pictureOpts).then((imageData) => {
      const img = 'data:image/jpeg;base64,' + imageData;
      // console.log(img);
      console.log('We got the picture');
    }, (err) => {
      console.log(err);
    });
  }

  /**
   * Switch flash mode
   * ON/OFF
   */
  switchFlashMode(event: Event) {
    event.stopPropagation();
    event.preventDefault();

    console.log('switchFlashMode');
    this.isCameraFlashMode = !this.isCameraFlashMode;
    this.cameraPreview.setFlashMode(this.isCameraFlashMode ? this.cameraPreview.FLASH_MODE.ON : this.cameraPreview.FLASH_MODE.OFF);
  }

  /**
   * Focus camera on click area
   */
  async getCameraFocusCoordinates(event) {
    this.cameraFocusPosition.top = event.y - 15;
    this.cameraFocusPosition.left = event.x - 15;

    // start focus animation
    this.cameraFocusPosition.show = false;
    setTimeout(() => {
      this.cameraFocusPosition.show = true;
    });

    await this.cameraPreview.tapToFocus(event.clientX || 0, event.clientY || 0);
  }

}
