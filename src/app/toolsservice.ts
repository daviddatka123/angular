import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Toolsservice {
  constructor(public http:HttpClient){}

  getAllProducts(){
    return this.http.get("https://restaurant.stepprojects.ge/api/Products/GetAll")
  }
  getCategories(){
    return this.http.get("https://restaurant.stepprojects.ge/api/Categories/GetAll")
  }
  filterCategories(id:any){
    return this.http.get(`https://restaurant.stepprojects.ge/api/Categories/GetCategory/${id}`)
  }
}
