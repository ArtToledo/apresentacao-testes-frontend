import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  email: string;
  password: string;
  loginError = false;

  //Notification
  successMessage = 'Logged in successfully';
  errorMessage = 'Error logging in';
  action = 'Close';
  durationInSeconds = 5;

  constructor(
    private _snackBar: MatSnackBar,
    private appService: AppService
  ) { }

  public login() {
    this.appService.login(this.email, this.password)
      .subscribe(resp => {
        this.openSnackBar(this.successMessage)
        this.clearInputs()
        this.setVisibleMessageErrorForm(false)
      }, err => {
        this.openSnackBar(this.errorMessage)
        this.clearInputs()
        this.setVisibleMessageErrorForm(true)
      })
  }

  private openSnackBar(message: string) {
    this._snackBar.open(
      message,
      this.action,
      { duration: this.durationInSeconds * 1000 }
    );
  }

  private clearInputs() {
    this.email = null
    this.password = null
  }

  private setVisibleMessageErrorForm(value: boolean) {
    this.loginError = value
  }
}
