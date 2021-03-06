import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {CustomFormsModule} from 'ng4-validators';
import {Md5} from 'ts-md5/dist/md5';
import {NgxMaskModule} from 'ngx-mask';

import {AppComponent} from './app.component';
import {NavigationComponent} from './components/navigation/navigation.component';
import {GameComponent} from './components/game/game.component';
import {BettingFormComponent} from './components/betting-form/betting-form.component';
import {BettingChanceInfoComponent} from './components/betting-chance-info/betting-chance-info.component';
import {FairHashComponent} from './components/fair-hash/fair-hash.component';
import {GameStatusComponent} from './components/game-status/game-status.component';
import {BettingComponent} from './components/betting/betting.component';
import {ToFixedPipe} from './pipes/to-fixed.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    GameComponent,
    BettingFormComponent,
    BettingChanceInfoComponent,
    FairHashComponent,
    GameStatusComponent,
    BettingComponent,
    ToFixedPipe
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    CustomFormsModule,
    NgxMaskModule.forRoot()
  ],
  providers: [
    Md5,
    ToFixedPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
