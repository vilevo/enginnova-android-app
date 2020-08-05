import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, Router, RouterModule } from '@angular/router';

import { IonicModule, IonicRouteStrategy, IonDatetime } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule, MatNativeDateModule, MatProgressBarModule, MatIconModule, MatToolbarModule } from '@angular/material';
import { RequestLoaderService } from './services/request-loader.service';
import { FenesRequestLoaderComponent } from './components/fenes-request-loader/fenes-request-loader.component';
import { AppRootModule } from './modules/app-root/app-root.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppInterceptorService } from './services/http/app-interceptor.service';
import { IonicStorageModule } from '@ionic/storage';
import { CachingInterceptorService } from './services/http/caching-interceptor.service';
import { RequestCacheService } from './services/cach/request-cache.service';
import { Crop } from '@ionic-native/crop/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { File } from '@ionic-native/file/ngx';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ReactiveFormsModule } from '@angular/forms';
import { Network } from '@ionic-native/network/ngx';
import { FenesUxInfosModule } from './modules/fenes-ux-infos/fenes-ux-infos.module';
import { FenesUxInfosComponent } from './components/fenes-ux-infos/fenes-ux-infos.component';
import { Autostart } from '@ionic-native/autostart/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { SplashModule } from './modules/splash/splash.module';
import { ConnectionErrorPaneModule } from './modules/connection-error-pane/connection-error-pane.module';
import { SearchAutocompleteModule } from './modules/search-autocomplete/search-autocomplete.module';
import { SearchAutocompleteComponent } from './components/search-autocomplete/search-autocomplete.component';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { ListMenuModule } from './modules/list-menu/list-menu.module';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { CapitalizeDirective } from './directives/capitalize.directive';
import { CapitalizePipe } from './pipes/capitalize/capitalize.pipe';
import { PipesModule } from './modules/pipes/pipes.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { IntersectDirective } from './directives/intersect.directive';

@NgModule({
  declarations: [
    AppComponent,
    FenesRequestLoaderComponent,
    FenesUxInfosComponent,
    CapitalizeDirective,
    IntersectDirective,
  ],
  entryComponents: [
    SearchAutocompleteComponent
  ],

  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    IonicStorageModule.forRoot({
      name: '___fenes_database',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    HttpClientModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatProgressBarModule,
    MatIconModule,
    AppRootModule,
    AngularFontAwesomeModule,
    FenesUxInfosModule,
    SplashModule,
    ConnectionErrorPaneModule,
    SearchAutocompleteModule,
    ListMenuModule,
    MatMomentDateModule,
    PipesModule,
    LazyLoadImageModule
    // IonDatetime
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },

    RequestCacheService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CachingInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptorService,
      multi: true
    },

    MatNativeDateModule,
    RequestLoaderService,
    Crop,
    ImagePicker,
    WebView,
    Base64,
    File,
    Network,
    Autostart,
    CallNumber,
    FileTransfer
  ],
  bootstrap: [
    AppComponent,
    // FenesUxInfosComponent
  ],

  exports: [
    FenesRequestLoaderComponent,
    // FenesUxInfosComponent
  ]
})
export class AppModule { }
