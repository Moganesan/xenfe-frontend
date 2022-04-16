import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import{ UserService} from '../../services/user.service'
import { identifierName } from '@angular/compiler';
import {environment} from '../../../environments/environment';




@Component({
  selector: 'app-add-customer-address-admin-side',
  templateUrl: './add-customer-address-admin-side.component.html',
  styleUrls: ['./add-customer-address-admin-side.component.scss']
})
export class AddCustomerAddressAdminSideComponent implements OnInit {
  private serverURL = environment.serverURL;


  
    name1: any;
    userSelection: any;
    cust: any;
    custDet: any;
    customer_details: any[] = [];
    display : boolean
    userid : number;
    customer_id: any;
    adminDetail: any;
    addressAdded: boolean
  
        countries: any [] = [];
        states: any [] = [];
  
        country_id : any;
  
      data = {Branch: '',
      Salution: '',
      FirstName : '',
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
      customer_id: localStorage.getItem('userid1')
      }
  
  
        constructor(private http: HttpClient,
          private router: Router,
          public userService : UserService,
          private cdr: ChangeDetectorRef,

          ) { }
  
        ngOnInit(): void {
  
  
          this.userService.getAdminDetail().subscribe(DTA => {
            this.adminDetail = DTA
            console.log('adminDetail',this.adminDetail )
          })
  
  
          this.userService.getAllCustDetail().subscribe(custD => {
            this.customer_details = custD.customers_Details;
  
            let customer_id = localStorage.getItem('newAddressCustId')
            console.log('cust id', customer_id)
            if(customer_id != undefined){
              console.log('cust id 1', customer_id)
              this.onSelect1(customer_id)
            }
  
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
  
        reloadComponent() {
          console.log('I m from reaload comp')
  
          let currentUrl = this.router.url;
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate([currentUrl]);
          console.log('in reload')
  
        }
  
        add(){
          if(this.data.Branch == ''|| (this.data.Salution == '')|| (this.data.FirstName == '')|| (this.data.SecondName == '')||(this.data.CompanyName == '')||(this.data.GSTIN == '')||(this.data.AddressLine1 == '')||(this.data.AddressLine2 == '')||(this.data.City == '')||(this.data.Pincode == '') ||(this.data.Landline == '') ||(this.data.Mobile == '')||(this.data.WhatsApp == '')){
            alert("Enter all fields")
          }else{
  
  
  
          // this.Data={branch: this.Branch, salution: this.Salution, firstName: this.FirstName, secondName: this.SecondName, companyName: this.CompanyName, gstin: this.GSTIN, address1: this.AddressLine1, address2: this.AddressLine2, city: this.City, pincode: this.Pincode, state: this.State, country: this.Country, customer_id: localStorage.getItem('userid1'), landline: this.Landline, mobile: this.Mobile, whatsapp: this.WhatsApp}
          console.log(this.data)
  
          this.http.post(`${this.serverURL}/customer/address/new`, {
          Data: this.data
          }).subscribe((data:any)=> {

            if(data.success){

              this.addressAdded = true
            }else{
              alert(" Address did not added successfully")
            }
            console.log(Response)
          })
  
          //this.router.navigate(['/customerDashboard'])
        }
  
        localStorage.setItem('newAddressCustId', undefined);
      }
  
        onStateSelect(id){
          this.data.State = id
        }
  
        onSelect(id){
          console.log(id)
          this.data.Country = id
          this.userService.getAllStates(id).subscribe(data => {
            this.states = data.states
            //console.log(this.states)
          })
        }
  
        onSelect1(id){
          this.display = true
          this.data.customer_id = id,
          console.log('id', id)
          this.custDet =  this.customer_details.filter(res => {
            return res.customer_id == id
          })
          setTimeout(() => {
            this.userSelection = this.custDet[0].customer_id
   //       this.cdr.detectChanges();
          this.cdr.markForCheck();
          }, 100);
          console.log('id', this.custDet)
        }
      }
  
  
  
  
