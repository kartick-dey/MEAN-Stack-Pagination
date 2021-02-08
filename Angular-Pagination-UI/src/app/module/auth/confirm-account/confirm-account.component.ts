import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppService } from '../../../app.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-confirm-account',
  templateUrl: './confirm-account.component.html',
  styleUrls: ['./confirm-account.component.scss']
})
export class ConfirmAccountComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();
  public emailConfirmed: boolean;
  public failMessage: string;
  public token: string;
  public isLoading: boolean = false;

  constructor(private appService: AppService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token');
    this.confirmEmail();
  }

  /**
   * Confirming the account
   */
  public confirmEmail(): void {
    this.isLoading = true;
    this.subscription.add(
      this.appService.confirmEmail(this.token).subscribe(response => {
        console.log('Confirm Email response: ', response);
        this.emailConfirmed = true;
        this.isLoading = false;
      },
        (error) => {
          console.log('Confirm Email error: ', error);
          this.failMessage = "Faild to verify account"
          this.emailConfirmed = false;
          this.isLoading = false;
        })
    );
  }

  // Unsubscribe the subcriptions
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
