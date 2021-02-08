import { Component, OnInit } from '@angular/core';
import { IRandomUserModel } from './random-user.model';
import { Subscription } from 'rxjs';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public users: any[];
  public isLoading: boolean = false;
  public searchByName: string;
  public seletedColumn: string = 'firstName';
  public totalPages: number = 10;
  private activePage: number = 1;
  private numberOfRecord: number = 100;
  public showPageNumberList: number[];
  public userData: IRandomUserModel[];
  public noData: boolean = false;
  private subscription: Subscription = new Subscription();

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.getUserData(this.activePage);
  }


  /**
   * This method is will call getUsers service to fetch data from backend.
   * @param page: number
   * @return None
   */
  private getUserData(page: number): void {
    this.isLoading = true;
    this.subscription.add(
      this.appService.getUsers(page, this.numberOfRecord).subscribe(
        resData => {
          this.userData = resData.results;
          this.totalPages = resData.totalPages;
          this.isLoading = false;
          this.getArrayOfPages();
          this.noData = false;
        },
        resError => {
          this.isLoading = false;
          this.noData = true;
        }
      )
    );
  }

  /**
   * This method is to display page no into DOM.
   * @param None
   * @return None
   */
  public getArrayOfPages(): void {
    const pageNumberList = Array.from(Array(this.totalPages + 1).keys());
    this.showPageNumberList = [];
    if (this.activePage > 3) {
      this.showPageNumberList = pageNumberList.slice(this.activePage - 3, this.activePage + 3);
    } else {
      this.showPageNumberList = pageNumberList.slice(this.activePage, this.activePage + 6);
    }
    console.log(this.showPageNumberList);
  }

  /**
   * This method will give active page.
   * @param None
   * @return activePage
   */
  public getActivePage(): number {
    return this.activePage;
  }

  /**
   * This method is will fetch the value of clicked page no or button.
   * @param selectedPageNumber: number
   * @return None
   */
  public onClickPage(selectedPageNumber: number): void {
    if (selectedPageNumber >= 1 && selectedPageNumber <= this.totalPages) {
      this.activePage = selectedPageNumber;
      console.log(this.activePage);
      this.getArrayOfPages();
      this.getUserData(this.activePage);
    }
  }

  /**
   * This method is will columnname into selected column field.
   * @param columnName: string
   * @return None
   */
  public onClickColumn(columnName: string): void {
    this.seletedColumn = columnName;
  }

  /**
   * This method is implement to describe or implement the tractBy func in *ngFor directive
   * @param (index: number, user)
   * @return (id: string)
   */
  trackById(index: number, user): string {
    return user.id;
  }

  /**
   * This method is help to logout.
   * @param ()
   * @return ()
   */
  public onLogout(): void {
    this.appService.logout();
  }

  // Unsubscribe the subcriptions
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
