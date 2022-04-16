import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError } from 'rxjs/operators';
//import { AuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { ActivatedRoute, Router } from '@angular/router';
import { adminModelServer } from '../models/user.model'



@Injectable({
  providedIn: 'root'
})
export class UserService {
  auth = false;  
private serverURL = environment.serverURL;
  private url = `${this.serverURL}/`

  authState$ = new BehaviorSubject<boolean>(this.auth);
  loginMessage$ = new BehaviorSubject<string>(null!);
  userData$ = new BehaviorSubject<ResponseModel | object>(null!);
  userRole: number;
  userid: any;
  token: any;
  refreshtoken: any;

  //private user;

  constructor(private httpClient: HttpClient,
    //private authService: AuthService, 
    private router: Router, private route: ActivatedRoute
  ) {
  }

  //add new customer
  addNewCustomer(newcust: any): Observable<any> {
    return this.httpClient.post(this.url + 'auth/register', newcust);
  }

  // get all customer name, mob num
  getAllCustDetail(): Observable<any> {
    return this.httpClient.get(this.url + 'customer/all');
  }

  // get all customer name, mob num
  getAllUnBilledCustDetail(): Observable<any> {
    return this.httpClient.get(this.url + 'customer/UnBilledCustomer/all');
  }

    // get all customer name, mob num
    getAllUnBilledWithCustId(id: any): Observable<any> {
      return this.httpClient.get(this.url + 'customer/UnBilled/' + id);
    }

  getAllCountry(): Observable<any> {
    return this.httpClient.get(this.url + 'customer/country/all');
  }

  getAllStates(id: any): Observable<any> {
    return this.httpClient.get(this.url + 'customer/country/' + id);
  }

  getSingleCustDetail(id: any): Observable<any> {
    return this.httpClient.get(this.url + 'customer/' + id);
  }

  postAdminData(data: any) {
    return this.httpClient.post(this.url + 'customer/adminData', data)
  }

  getAdminDetail(): Observable<any> {
    return this.httpClient.get(this.url + 'customer/admin/' + 1);
  }

  updateAdminInfo(data: any) {
    return this.httpClient.post(this.url + 'customer/updateAdmin', data).subscribe(data => {
      console.log(Response)
    });
  }


  //logout user

  logout() {
    // this.authService.signOut();
    // this.auth = false;
    // this.authState$.next(this.auth);

    localStorage.setItem('auth', "false");

  }

  //login user with mobile pass
  loginUser(mobile: string, passwrd: string) {


    this.httpClient.post<ResponseModel>(`${this.url}auth/login`, { mobile, passwrd })
      .pipe(catchError((err: HttpErrorResponse) => of(err.error.message)))
      .subscribe((data: ResponseModel) => {
        if (typeof (data) === 'string') {
          this.loginMessage$.next(data);
        } else {
          this.auth = data.auth;
          this.authState$.next(this.auth);
          this.userData$.next(data);
          console.log('User Data', data)
          this.userRole = data.roleid;
          this.userid = data.userid;
          this.token = data.token;
          this.refreshtoken = data.refreshtoken;
          console.log('user ID', this.userid)
          console.log('user token', this.token)
          console.log('refresh token', this.refreshtoken)
          localStorage.setItem('userid1', this.userid);
          localStorage.setItem('usertoken', this.token);
          localStorage.setItem('refreshtoken', this.refreshtoken);
          localStorage.setItem('auth', "true");
          console.log('local storage', localStorage.getItem('auth'))
          this.router.navigateByUrl(this.route.snapshot.queryParams.returnUrl || '/customerDashboard');

        }
      });

  }

  getUserDetails(userid: any): Observable<any> {
    return this.httpClient.get<any>(this.url + 'singleUser/' + userid);
  }

  getCustomerDetailsforUserId(userid: any): Observable<any> {
    return this.httpClient.get<any>(this.url + 'customer/cd/' + userid);
  }

  registerUser(formData: any, photoUrl?: string, typeOfUser?: string): Observable<{ message: string }> {
    const { fname, lname, mobile, password } = formData;
    console.log(formData);
    return this.httpClient.post<{ message: string }>(`${this.url}/auth/register`, {
      mobile,
      lname,
      fname,
      typeOfUser,
      password,
      photoUrl: photoUrl || null
    });
  }

}


export interface ResponseModel {
  token: string;
  refreshtoken: string;
  auth: boolean;
  mobile: string;
  username: string;
  fname: string;
  lname: string;
  photoUrl: string;
  userid: number;
  type: string;
  roleid: number;
}
