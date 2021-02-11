
import { of as observableOf, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


@Injectable()
export class ExceptionService {

  constructor(private _toastService: ToastrService) { }

  catchBadResponse: (errorResponse: any) => Observable<any> = (errorResponse: any) => {
    let err = <HttpErrorResponse>errorResponse;
    let emsg;
    if (err && err.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      emsg = err.error.message;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      if (err && err.status == 0)
        emsg = `Backend returned code ${err.status}, body was: ${err.message}`;
      else if (!err)
        emsg = `Authentication credentials were not provided.`;
      else
        emsg = `Backend returned code ${err.status} (${err.statusText}), body was: ${err.error ? err.error.value : err.message}`;
    }

    this._toastService.error(emsg);
    return observableOf();
  }
}
