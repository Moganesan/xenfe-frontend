import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service'
import {environment} from '../../../environments/environment';


@Component({
  selector: 'app-add-customer-as',
  templateUrl: './add-customer-as.component.html',
  styleUrls: ['./add-customer-as.component.scss']
})
export class AddCustomerAsComponent implements OnInit {
  private serverURL = environment.serverURL;




  name1: any;
  adminDetail: any;
  userSelection: any;
  cust: any;
  customer_details: any[] = [];
  display: boolean
  userid: number;
  countries: any[] = [];
  states: any[] = [];
  country_id: any;
  data = {
    Branch: '',
    Salution: '',
    FirstName: '',
    SecondName: '',
    CompanyName: '',
    GSTIN: '',
    AddressLine1: '',
    AddressLine2: '',
    City: '',
    Pincode: '',
    State: 336,
    Country: 110,
    Landline: '',
    Mobile: '',
    WhatsApp: '',
    LISalution: '',
    LIPassword: '',
    LIMobile: '',
    LISecondName: '',
    LIFirstName: ''
  }


  constructor(private http: HttpClient,
    private router: Router,
    public userService: UserService,
    private cdr: ChangeDetectorRef,

  ) { }

  ngOnInit(): void {

    // this.userService.getAllCustDetail().subscribe(custD => {
    //   this.customer_details = custD.customers_Details;
    //   let customer_id = localStorage.getItem('newAddressCustId')
    //   console.log('cust id', customer_id)
    // })

    this.userService.getAdminDetail().subscribe(DTA => {
      this.adminDetail = DTA
      console.log('adminDetail', this.adminDetail)
    })

    this.userService.getAllCountry().subscribe(data => {
      this.countries = data.countries;
      console.log('countries', this.countries)
    })

    this.userService.getAllStates(this.data.Country).subscribe(data => {
      this.states = data.states
      //console.log(this.states)
    })

  }

  search1() {
    console.log('I m from seach 1')
    this.name1 == "";
    this.userSelection = "";
    if (this.name1 == "") {
      this.ngOnInit();
    } else {
      this.cust = this.customer_details.filter(res => {
        return res.first_name?.toLocaleLowerCase().match(this.name1?.toLocaleLowerCase()) || res.second_name?.toLocaleLowerCase().match(this.name1?.toLocaleLowerCase()) || res.company_name?.toLocaleLowerCase().match(this.name1?.toLocaleLowerCase()) || res.mobile?.toString().toLocaleLowerCase().match(this.name1?.toLocaleLowerCase())
      })
      setTimeout(() => {
        this.userSelection = this.cust[0].customer_id
//       this.cdr.detectChanges();
      this.cdr.markForCheck();
      }, 100);
    }
  }

  addOld() {
    if (this.data.Branch == '' || (this.data.Salution == '') || (this.data.FirstName == '') || (this.data.SecondName == '') || (this.data.CompanyName == '') || (this.data.GSTIN == '') || (this.data.AddressLine1 == '') || (this.data.AddressLine2 == '') || (this.data.City == '') || (this.data.Pincode == '') || (this.data.Landline == '') || (this.data.Mobile == '') || (this.data.WhatsApp == '')) {
      alert("Enter all fields")
    } else {
      // this.Data={branch: this.Branch, salution: this.Salution, firstName: this.FirstName, secondName: this.SecondName, companyName: this.CompanyName, gstin: this.GSTIN, address1: this.AddressLine1, address2: this.AddressLine2, city: this.City, pincode: this.Pincode, state: this.State, country: this.Country, customer_id: localStorage.getItem('userid1'), landline: this.Landline, mobile: this.Mobile, whatsapp: this.WhatsApp}
      console.log(this.data)
      this.http.post(`${this.serverURL}/auth/custRegister`, {
        Data: this.data
      }).subscribe((data: any) => {
        console.log(Response)
      })
      //this.router.navigate(['/customerDashboard'])
    }
    localStorage.setItem('newAddressCustId', undefined);
  }


  add() {
    if (this.data.LISalution == '' || (this.data.LIPassword == '') || (this.data.LIMobile == '') || (this.data.LISecondName == '') || (this.data.LIFirstName == '')) {
      alert("Enter all fields")
    } else {
      // this.Data={branch: this.Branch, salution: this.Salution, firstName: this.FirstName, secondName: this.SecondName, companyName: this.CompanyName, gstin: this.GSTIN, address1: this.AddressLine1, address2: this.AddressLine2, city: this.City, pincode: this.Pincode, state: this.State, country: this.Country, customer_id: localStorage.getItem('userid1'), landline: this.Landline, mobile: this.Mobile, whatsapp: this.WhatsApp}
      console.log(this.data)
      this.http.post(`${this.serverURL}/auth/custRegister1`, {
        Data: this.data
      }).subscribe((data: any) => {
        console.log(Response)
      })
      //this.router.navigate(['/customerDashboard'])
    }
    localStorage.setItem('newAddressCustId', undefined);
  }

  onStateSelect(id) {
    this.data.State = id
  }

  onSelect(id) {
    console.log(id)
    this.data.Country = id
    this.userService.getAllStates(id).subscribe(data => {
      this.states = data.states
      //console.log(this.states)
    })
  }

  // onSelect1(id){
  //   this.display = true
  //   this.data.customer_id = id
  // }
}




