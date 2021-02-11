import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, finalize, catchError } from 'rxjs/operators';
import { ExceptionService } from './exception.service';
import { User } from 'app/models/user';
import { environment } from 'environments/environment'; //ehti



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*"
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // behavior subject contains user data
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(
    private router: Router,
    private http: HttpClient,
    private _exceptionService: ExceptionService
  ) {

    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }

  /**
   * Method that update user data in subject with new object
   * @param user 
   */
  updateUserSubject(user: User) {
    this.userSubject.next(user);
  }

  // getter that return User Data
  public get userValue(): User {
    return this.userSubject.value;
  }

  /**
   * Methodtake email and pass and check login
   * return token and refresh token
   * @param email 
   * @param password 
   */
  login(email, password) {
    //return this.http.post<User>('/api/v1/token/', { email, password })
    return this.http.post<User>(`${environment.apiUrl}users/login`, { email, password })
      // .pipe(map(user => {
      //   localStorage.setItem('user', JSON.stringify(user));
      //   this.userSubject.next(user);
      //   return user;
      // })
      // );
  }

  logout() {
    // remove user from local storage and set current user to null
    this.stopRefreshTokenTimer();
    localStorage.removeItem('user');
    localStorage.removeItem('tokenObject');

    this.userSubject.next(null);
    this.router.navigate(['/auth/login']);
  }

  /**
   * POST: Register Method take User object and post it to server
   * @param user 
   */
  register(user: User) {
    console.log('Print Env test');
    console.log(environment.apiUrl);

    return this.http.post(`/api/v1/auth/`, user);
  }

  /**
   * GET: Method that get all users
   */
  getAll(Token) {
    return this.http.get<User[]>(`/api/v1/auth/`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + Token,
        // 'Access-Control-Allow-Headers': "*"
      })
    });
  }

  /**
   * GET: Method that get user data after login
   */
  // getUserData() {
  //   return this.http.get(`${environment.apiUrl}/${apiStr}/`, httpOptions)
  //     .pipe(map(response => {
  //       let temp = this.updateUserSession(<User>response);
  //       if (temp && temp.token) {
  //         return temp;
  //       }
  //       else {
  //         return {};
  //       }
  //     }),
  //       catchError(this._exceptionService.catchBadResponse),
  //       finalize(() => null));
  // }

  /**
   * PUT: Method that take id and user params to update it in database.
   * @param id
   * @param user_params 
   */
  // update(id: number, user_params: FormData) {
  //   return this.http.put(`${environment.apiUrl}/doctor/${id}/`, user_params)
  //     .pipe(map((res: User) => {
  //       // update stored user if the logged in user updated their own record
  //       if (id == res.id) {
  //         // update local storage
  //         // const user = { ...this.userValue, ...user_params };
  //         // localStorage.setItem('user', JSON.stringify(user));
  //         this.updateUserSession(res);
  //         // publish updated user to subscribers
  //         // this.userSubject.next(res);
  //       }
  //       return res;
  //     }));
  // }

  /**
   * DELETE: Method that take id and delete it from database,,,
   * map reposnse and if id is userId that loggedin it will logout from system.
   * @param id 
   */
  // delete(id: number) {
  //   return this.http.delete(`${environment.apiUrl}/doctors/${id}`)
  //     .pipe(map(x => {
  //       // auto logout if the logged in user deleted their own record
  //       if (id == this.userValue.id) {
  //         this.logout();
  //       }
  //       return x;
  //     }));
  // }

  /**
   * POST: Check Phone Number in server if it found it will return bad reuest with error,,,
   * else it will return ok.
   * @param phone 
   */
  checkPhoneNumber(phone: string) {
    return this.http.post(`${environment.apiUrl}/doctor/check_phone_number/`, { phone_number: phone });
  }

  /**
   * POST: Check Email Address in server if it found, fake, not valid it will return bad reuest with error,,,
   * else it will return ok.
   * @param email 
   */
  checkEmailAddress(email: string) {
    return this.http.post(`${environment.apiUrl}/doctor/check_email/`, { email });
  }

  /**
   * POST: Send email to get verfied code and reset password after submit it.
   * @param email 
   */
  verifyEmail(email: string) {
    return this.http.post(`${environment.apiUrl}/doctor/verify_email/`, { email });
  }

  /**
   * POST Method: send verified code to email 
   * @param email email of user
   * @param type  what user choose to send code { email or phone }
   */
  sendVerfiedCode(email: string, type: string) {
    return this.http.post(`${environment.apiUrl}/doctor/send_reset_password_code/`, { email, type })
  }

  /**
   * POST: Save New Password After Reset It.
   * @param obj {email, new_password, old_password}
   */
  resetPassword(obj: any) {
    return this.http.post(`${environment.apiUrl}/doctor/reset_password/`, obj);
  }

  /**
   * POST Method: Send Code To Verify User Account...
   * @param verifiedCode 
   */
  userActivateEmail(verifiedCode: any) {
    return this.http.post(`${environment.apiUrl}/doctor/activate_email/`, { code: verifiedCode })
  }

  userChangePassword(editPass: any) {
    return this.http.post(`${environment.apiUrl}/dctor/change_password/`, editPass)
  }


  /**
   * General Method To Update User In Session and Return New User
   * @param user 
   * @param newData 
   */
  updateUserSession(newData?: User): User {
    let user: User = JSON.parse(localStorage.getItem('user'));
    let userObj = <User>{ access: user.token, refresh: user.refresh, ...newData };
    this.updateUserSubject(userObj);
    localStorage.setItem('user', JSON.stringify(userObj));
    return userObj;
  }

  // refreshToken2() {
  //   let refresh = JSON.parse(localStorage.getItem('user')).refresh;
  //   return this.http.post(`/refresh/`, { refresh });
  // }


  get userExistsData(): User {
    let user: User = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : <User>{};
    return user;
  }

  // roles part
  isAuthorized() {
    return !!this.userValue;
  }

  // refreshToken() {
  //   return this.http.post<any>(`http://3.137.146.195/token/refresh/`, {})
  //     .pipe(map((user) => {
  //       this.userSubject.next(user);
  //       this.startRefreshTokenTimer();
  //       return user;
  //     }));
  // }

  // helper methods

  private refreshTokenTimeout;

  private startRefreshTokenTimer() {
    // parse json object from base64 encoded jwt token
    const jwtToken = JSON.parse(atob(this.userValue.token.split('.')[1]));

    // set a timeout to refresh the token a minute before it expires
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - (60 * 1000);
    // this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
}
