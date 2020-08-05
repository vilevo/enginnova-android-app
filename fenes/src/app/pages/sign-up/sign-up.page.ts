import { Component, OnInit } from '@angular/core';
import { FormBuilder, AbstractControl, Validators, FormGroup } from '@angular/forms';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { RequestLoaderService } from 'src/app/services/request-loader.service';
import { Router } from '@angular/router';
import { Platform, ToastController } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MemberModel } from 'src/app/models/member-model';
import { NgxSpinnerService } from 'ngx-spinner';
import { CallBackendService } from 'src/app/services/api/call-backend.service';
import { UserService } from 'src/app/services/user.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { UXInfosService } from 'src/app/services/ui/uxinfos.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
  animations: [
    trigger('showHide', [
      state('show', style({
        opacity: 1,
        top: '2em'
      })),
      state('hide', style({
        opacity: 0,
        top: '-0em'
      })),
      transition('show => hide', [
        animate('0.2s'),
      ]),
      transition('hide => show', [
        animate('1.5s')
      ]),
      transition('* => show', [
        animate('1.5s')
      ]),
      transition('hide => *', [
        animate('1.5s')
      ])
    ])
  ]
})
export class SignUpPage implements OnInit {

  formGroup: FormGroup;
  signUpForm: FormGroup;
  loginForm: FormGroup;
  signUpPassword: FormGroup;

  v_alternate: 'signup' | 'signin' = 'signup'
  newsignup: FormGroup;
  password_ok = false;

  // Are part of info perso group
  private _infoPerso: FormGroup;
  private _infoProfess: FormGroup;
  private _contact: FormGroup;


  isNonLinear = false;
  isNonEditable = false;
  disableRipple = false;

  nameFormGroup: FormGroup;
  emailFormGroup: FormGroup;

  signup = true;
  inputPassword = false;
  login = false;

  blurbg = false;
  step = -1;

  public memberModel = new MemberModel();
  public competency = '';
  showError = false;

  inPass;
  inEmail;

  constructor(
    private _formBuilder: FormBuilder,
    private _liveAnnoncer: LiveAnnouncer,
    private _loaderService: RequestLoaderService,
    private _router: Router,
    private _statusBar: StatusBar,
    private _platform: Platform,
    private _ngxspinner: NgxSpinnerService,
    private _backend: CallBackendService,
    private _userService: UserService,
    private toastController: ToastController,
    private callNumber: CallNumber,
    private uxinfo: UXInfosService
  ) {
    uxinfo.appBottom.emit('hide');
    // this.memberModel.id = 2;
    // this.memberModel.email = 'example@gmail.com';
    // this.memberModel.enterprise = 'Genesis';
    // // this.memberModel.facebook = 'monfacebook.com';
    // this.memberModel.firstName = 'Dupond';
    // this.memberModel.lastName = 'Dupond';
    // this.memberModel.phoneNumber = '90334435';
    // this.memberModel.quarter = 'Agoe';
    // this.memberModel.website = 'www.genesis.com';
    // this.memberModel.job = 'Analyste Proogrammeur';
    // this.memberModel.username = 'ddupond';
    // this.memberModel.biography = ' ';

    this.newsignup = this._formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.minLength(6),
        Validators.maxLength(30)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(15)
      ]],
      confirm_password: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(15),
      ]]
    });

    this.confirm_password.valueChanges.subscribe(v => {
      this.password_ok = v == this.password.value;
    });

    this.password.valueChanges.subscribe(v => {
      this.password_ok = v == this.confirm_password.value;
    });



    this.memberModel.competencies = [];
    this.memberModel.interests = [];

    this.buildSignUpForm();
    this.buildLoginForm();

    this._platform.ready().then(() => {
      // this._statusBar.overlaysWebView(false);
      // this._statusBar.backgroundColorByHexString('#097ec3');
    });
  }

  ngOnInit() {
    setTimeout(() => {
      this.setStep(0);
    }, 1000);
  }


  public alternate(to) {
    this.alternate = to;
  }


  public perfom() {

    console.log('Perform');


    if (this.loginForm.valid && this.v_alternate == 'signin') {
      this._ngxspinner.show();
      this.memberModel.email = this.loginForm.value.login_email;
      this.memberModel.password = this.loginForm.value.login_password;
      console.log('Do sign in');
      console.log(this.memberModel);

      this._userService.login(this.memberModel.email, this.memberModel.password).subscribe(v => {
        console.log('User logged in');
        this._ngxspinner.hide();
        setTimeout(() => {
          this._router.navigateByUrl('/home');
        }, 200);
      }, error => {
        console.log('Error while loggging in the user');
      })

    } else if (this.password_ok && this.newsignup.valid) {
      this._ngxspinner.show();
      this.memberModel.email = this.email.value;
      this.memberModel.password = this.password.value;

      // this.memberModel
      console.log('Do sign up');

      this._userService.create(this.memberModel).subscribe(v => {
        console.log('User created successfully');
        this._ngxspinner.hide();
        setTimeout(() => {
          this._router.navigateByUrl('/home');
        }, 200);
      }, error => {
        console.log('Error while creating the user');
      })
    } else {
      this.presentToastWithOptions('', 'Le formulaire contient des erreurs', null, 'danger')
    }
  }


  buildSignUpForm() {
    // this._infoPerso = this._formBuilder.group({
    //   firstName: ['', [
    //     Validators.required,
    //     Validators.minLength(4),
    //     Validators.maxLength(15)
    //   ]],
    //   lastName: ['', [
    //     Validators.required,
    //     Validators.minLength(4),
    //     Validators.maxLength(15)
    //   ]],
    //   username: ['', [
    //     Validators.required,
    //     Validators.minLength(4),
    //     Validators.maxLength(10)
    //   ]],
    // });
    // this._infoProfess = this._formBuilder.group({
    //   job: ['', [
    //     Validators.required,
    //     Validators.minLength(2),
    //     Validators.maxLength(20)
    //   ]],
    //   enterprise: ['', [
    //     Validators.required,
    //     Validators.minLength(2),
    //     Validators.maxLength(15)
    //   ]],
    // });
    // this._contact = this._formBuilder.group({
    //   phoneNumber: ['', [
    //     Validators.required,
    //     Validators.pattern('^[7-9][0-9]{7}')
    //   ]],
    //   email: ['', [
    //     Validators.required,
    //     Validators.email,
    //     Validators.minLength(6),
    //     Validators.maxLength(30)
    //   ]],
    // });
    // this.signUpForm = this._formBuilder.group({
    //   infoPerso: this._infoPerso,
    //   infoProfess: this._infoProfess,
    //   contact: this._contact
    // });
    // this.signUpPassword = this._formBuilder.group({
    //   password: ['', [
    //     Validators.required,
    //     Validators.minLength(6),
    //     Validators.maxLength(15)
    //   ]]
    // });
  }

  buildLoginForm() {
    this.loginForm = this._formBuilder.group({
      login_email: [this.inEmail, [
        Validators.required,
        Validators.email,
        // Validators.minLength(3),
        Validators.maxLength(30)
      ]],
      login_password: [this.inPass, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15)
      ]]
    });
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
    return true;
  }

  prevStep() {
    this.step--;
  }

  signUpToLogin() {
    this.setStep(5);
    setTimeout(() => {
      this.signup = false;
      this.login = true;
      this.inputPassword = false;
    }, 250);
  }

  ipToLogin() {
    this.inputPassword = false;
    this.login = true;
    this.signup = false;
  }

  loginToSignUp() {
    this.inputPassword = false;
    this.login = false;
    this.signup = true;
    setTimeout(() => {
      this.setStep(0);
    }, 250);
  }

  showPassword() {
    this.setStep(5);
    if (!this.signUpForm.invalid) {
      setTimeout(() => {
        this.signup = false;
        this.inputPassword = true;
      }, 250);
    }
  }

  subscrib(): void {
    this._loaderService.show();
    setTimeout(() => {
      this._loaderService.hide();
      this._router.navigateByUrl('/home', {
        fragment: 'top'
      });
    }, 2000);
  }

  authentificate() {
    this._loaderService.show();
    setTimeout(() => {
      this._loaderService.hide();
      this._router.navigateByUrl('/home', {
        fragment: 'top'
      });
    }, 2000);
  }

  blur() {
    this.blurbg = true;
    console.log('Blur');
  }

  deblur() {
    this.blurbg = false;
    console.log('deblur');
  }

  switch() {
    if (this.signup) {
      this.setStep(5);
      setTimeout(() => {
        this.signup = !this.signup;
      }, 250);
    } else {
      this.signup = !this.signup;
      setTimeout(() => {
        this.setStep(0);
      }, 150);
    }
  }

  onSignUp() {
    this._ngxspinner.show();

    console.log(this.signUpForm.value);
    this.memberModel.firstName = this._infoPerso.value.firstName;
    this.memberModel.lastName = this._infoPerso.value.lastName;
    this.memberModel.username = this._infoPerso.value.username;
    this.memberModel.phoneNumber = this._contact.value.phoneNumber;
    this.memberModel.email = this._contact.value.email;
    this.memberModel.job = this._infoProfess.value.job;
    this.memberModel.enterprise = this._infoProfess.value.enterprise;
    this.memberModel.password = this.signUpPassword.value.password
    // this.memberModel.image = 'nothing.png';
    console.log(this.memberModel);

    if (this.competency.trim().length !== 0) {
      this.memberModel.competencies.push(this.competency);
    }
    this.showError = false;
    this._userService.create(this.memberModel).subscribe((data) => {
      console.log(data);
      this._ngxspinner.hide();

      this._router.navigateByUrl('/home');
    }, (error) => {
      console.log(error);
      this.presentToastWithOptions("Erreur!", "Veuillez reessayer", () => {
        this.onSignUp();
      });

      setTimeout(() => {
        this._ngxspinner.hide();
        setTimeout(() => {
          this.showError = true;
        }, 250);
      }, 1000);

    });
  }





  public get email() {
    return this.newsignup.get('email');
    // return this._contact.get('email');
  }

  public get password() {
    return this.newsignup.get('password');
    // return this._contact.get('email');
  }

  public get confirm_password() {
    return this.newsignup.get('confirm_password');
    // return this._contact.get('email');
  }



















  get firstName() {
    return this._infoPerso.get('firstName');
  }

  get lastName() {
    return this._infoPerso.get('lastName');
  }

  get username() {
    return this._infoPerso.get('username');
  }

  get job() {
    return this._infoProfess.get('job');
  }

  get enterprise() {
    return this._infoProfess.get('enterprise');
  }

  get phoneNumber() {
    return this._contact.get('phoneNumber');
  }


  get login_email() {
    return this.loginForm.get('login_email');
  }

  get login_password() {
    return this.loginForm.get('login_password');
  }

  process() {
    console.log('Form submit. do something');
    this.nextStep();
    if (this.step > 3) {

      this.showPassword();
    }
  }

  onLogin() {

    // this.callNumber.callNumber('*101#', true).then(response => {
    //   console.log(response);

    // });

    console.log(this.loginForm);
    this._ngxspinner.show();
    this._userService.login(this.login_email.value, this.login_password.value).subscribe(loggedIn => {
      this._ngxspinner.hide();
      setTimeout(() => {
        this._router.navigateByUrl('home');
      }, 300);
    },
      error => {
        this._ngxspinner.hide();
        this.presentToastWithOptions("Erreur!", "Veuillez reessayer", () => {
          this.onLogin();
        });

      });
  }

  async presentToastWithOptions(header: string, msg: string, onClose, color = 'danger') {
    this.toastController.dismiss();
    const toast = await this.toastController.create({
      animated: true,
      // closeButtonText: '',
      color: color,
      cssClass: 'toast-success',
      duration: 20000,
      header,
      keyboardClose: true,
      message: msg,
      mode: 'ios',
      position: 'bottom',
      // showCloseButton: true,
      translucent: false,

      // buttons: [
      //   {
      //     side: 'end',
      //     icon: 'retry',
      //     text: 'Reessayer',
      //     handler: () => {
      //       onClose();
      //     }
      //   }
      // ],
    });
    // toast.onclose = onClose;
    toast.present();
  }


}





/**
 *
 * last_name	string	required	Last name of participant
 * username	string	required	Username of participant,
 * phone_number	string	required	phone number of participant
 * quarter	string	required	Quarter where live participant
 *
 *
 * enterprise	string	required	Where participant do his job
 * job	string	required	Job of participant
 *
 * biography	string	required	Biography of participant
 * competencies	array	required	List of participant's competencies
 * image	image	required	Profile image
 */
