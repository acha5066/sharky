import { NgModule} from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule} from '@angular/forms';
import { AppComponent }  from './app.component';
import { Bar } from './bar.component';
import { MathService } from './math.service';
import { HelpersService } from './helpers.service';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule],
  declarations: [ AppComponent, Bar ],
  bootstrap:    [ AppComponent ],
  providers: [ MathService, HelpersService ]
})
export class AppModule { }
