import { Component, OnInit } from '@angular/core';
import{ UserService} from '../../services/user.service';
import {HttpClient} from "@angular/common/http";
import {environment} from '../../../environments/environment';




@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.scss']
})
export class LeadsComponent implements OnInit {
  private serverURL = environment.serverURL;


  data= {name: '', mobile: '', address1: '', address2: '', state: '', requirement: '', assignTo: '', pincode: '', city: '', country: ''}
  Country: number = 110
  states: any
  countries: any [] = [];

  adminDetail: any;


  constructor(
    public userService : UserService,
    private http: HttpClient,

  ) { }

  ngOnInit(): void {

    this.userService.getAllCountry().subscribe(data => {
      this.countries = data.countries;
      console.log('countries', this.countries)
    })


    this.userService.getAdminDetail().subscribe(DTA => {
      this.adminDetail = DTA
      console.log('adminDetail',this.adminDetail )
      this.data.state = this.adminDetail.state_id
      this.data.country = this.adminDetail.country_id

      this.userService.getAllStates(this.data.country).subscribe(data => {
        this.states = data.states
        //console.log(this.states)
      })
    })




    this.data.assignTo = '1'
  }




  add(){
    if(this.data.name == ''|| (this.data.mobile == '')|| (this.data.address1 == '')|| (this.data.address2 == '')||(this.data.state == '')||(this.data.requirement == '')|| (this.data.city== '')|| (this.data.pincode == '')|| (this.data.country == '')){
      alert("Enter all fields")
      console.log("data", this.data)
    }else{

      this.http.post(`${this.serverURL}/api/quote/leads`, this.data).subscribe(Response => console.log(Response))
      console.log("data", this.data)
      alert('ok')
    }
  }




}
