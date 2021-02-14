import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
// import *  as  urlSetting  from 'environments/environment'
import { ToastrService } from 'ngx-toastr';
// import { UrlSetting } from 'src/app/models/support/url-setting';
// import { Token } from 'src/app/models/token';
// import { HttpBaseService } from './httpbase.service';
declare var $: any;

@Injectable({
  providedIn: 'root'
  
})
export class SharedService {

  private dataStore: object = {};

  constructor(private http: HttpClient, private toastr: ToastrService) {
    let url;
    // = (urlSetting as any).default
    this.setDataIntoStore('urlSetting', url);
  }
  public getHeaders() {
    return {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', "Bearer " + this.Token)
        .set('Accept-Language', this.Lang)
        .set("Access-Control-Allow-Headers", "*")
    }
  }
  public getDataFromStore(key: string): any {
    if (this.dataStore[key]) {
      return this.dataStore[key];
    }
    this.dataStore[key] = this.getLocalStorageItemByKey(key);
    return this.dataStore[key];
  }

  public setDataIntoStore(key: string, data: any): void {
    this.dataStore[key] = data;
    this.setLocalStorageItemByKey(key, data);
  }


  private getLocalStorageItemByKey(key: string) {
    let item = localStorage.getItem(key);
    if (item && item != "undefined" && item != "null") {
      return item.startsWith('{') || item.startsWith('[') ? JSON.parse(item) : item;
    }
    return null;
  }

  private setLocalStorageItemByKey(key: string, value: any) {
    let item = typeof value == 'object' ? JSON.stringify(value) : value;
    localStorage.setItem(key, item);
  }

  public get ApiUrl(): string {
    let urlSetting = this.getDataFromStore('urlSetting');
    return urlSetting ? urlSetting.ApiUrl : null;

  }

  public set CountryId(countryId: number) {
    this.setDataIntoStore(LocalStorageKeys.COUNTRYID, countryId);
  }

  public get CountryId(): number {
    return +this.getDataFromStore(LocalStorageKeys.COUNTRYID);
  }

  public set CountryName(countryName: string) {
    this.setDataIntoStore(LocalStorageKeys.COUNTRYNAME, countryName);
  }

  public get CountryName(): string {
    return this.getDataFromStore(LocalStorageKeys.COUNTRYNAME);
  }

  public set CityId(cityId: number) {
    this.setDataIntoStore(LocalStorageKeys.CITYID, cityId);
  }

  public get CityId(): number {
    return +this.getDataFromStore(LocalStorageKeys.CITYID);
  }

  public set CityName(cityName: string) {
    this.setDataIntoStore(LocalStorageKeys.CITYNAME, cityName);
  }

  public get CityName(): string {
    return this.getDataFromStore(LocalStorageKeys.CITYNAME);
  }
  public set Country(country: string) {
    this.setDataIntoStore(LocalStorageKeys.COUNTRY, country);
  }

  public get Country(): string {
    return this.getDataFromStore(LocalStorageKeys.COUNTRY);
  }
  public set Lang(lang: string) {
    this.setDataIntoStore(LocalStorageKeys.LANG, lang);
  }
  public get Lang(): string {
    return this.getDataFromStore(LocalStorageKeys.LANG);
  }


  
  public set TokenObject(token) {
    this.setDataIntoStore(LocalStorageKeys.TOKENOBJECT, token);
  }


  public get TokenObject() {
    return this.getDataFromStore(LocalStorageKeys.TOKENOBJECT);
  }
  public getTokenObject(){
    return localStorage.getItem('token')
  }
  public get Token(): string {
    return this.TokenObject ? this.TokenObject.Token : null;
  }

  public get UserId(): number {
    return this.TokenObject ? this.TokenObject.UserId : null;
  }

  public get AccountSetupId(): number {
    return this.TokenObject ? this.TokenObject.AccountSetupId : null;
  }
  public get EmployeeId(): number {
    return this.TokenObject ? this.TokenObject.EmployeeId : null;
  }
  public get CompanyId(): number {
    return this.TokenObject ? this.TokenObject.CompanyId : null;
  }
  public get UserName(): string {
    return this.TokenObject ? this.TokenObject.UserName : null;
  }

  public get UserDetail(): any {
    return this.TokenObject ? localStorage.getItem('UserDetail') : null;
  }
  /*========================================================================================*/

  ToastrSuccess(message) {
    this.toastr.success(message || 'Success')
  }

  ToastrError(message) {
    this.toastr.error(message || 'Error')
  }

  ToastrInfo(message, title) {
    this.toastr.info(message, title)
  }

  ToastrWarning(message, title) {
    this.toastr.warning(message, title)
  }

  HideModal() {
    $('#ModalAddEdit').modal('hide');
    $('#Edit').modal('hide');
    $('#Delete').modal('hide');
    $('#modalBooking').modal('hide');

  }
}

export const LocalStorageKeys = {
  COUNTRYID: 'countryId',
  COUNTRYNAME: 'countryName',
  CITYID: 'cityId',
  CITYNAME: 'cityName',
  TOKENOBJECT: 'tokenObject',
  COUNTRY: 'country',
  LANG: 'lang',
  GlameraResources: 'glameraResources',
  DROPDOWN: 'dropdown',
  GLAMERABLOG: 'GlameraBlog',

}
