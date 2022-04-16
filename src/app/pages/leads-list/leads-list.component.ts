import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {QuoteService} from '../../services/quote.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {HttpClient} from "@angular/common/http";
import {environment} from '../../../environments/environment';
import{ UserService} from '../../services/user.service'






@Component({
  selector: 'app-leads-list',
  templateUrl: './leads-list.component.html',
  styleUrls: ['./leads-list.component.scss']
})
export class LeadsListComponent implements OnInit {

  quote: any;
  closeResult: string;
  adminDetail: any;
  countries: any [] = [];
  states: any [] = [];
  display : boolean
  newLeadId: any

  leadCheck = {name: '', mobile: ''}

  mobileExist: boolean
  initialDisplay: boolean = true
  checkedId: any





  leadAdded: boolean
  data1= {name: '', mobile: '', address1: '', address2: '', state: '', requirement: '', assignTo: '', pincode: '', city: '', country: ''}

  data = {Branch: '',
  Salution: 'Mr',
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
  Requirement: '',
  Email: '',
  Enquiry: '',
  // customer_id: localStorage.getItem('userid1')
  }
  private serverURL = environment.serverURL;



  constructor(
    private cdr: ChangeDetectorRef,
   private quoteService: QuoteService,
   private modalService: NgbModal,
   private http: HttpClient,
   public userService : UserService


  ) { }

  ngOnInit(): void {

    this.userService.getAllStates(this.data.Country).subscribe(data => {
      this.states = data.states
      //console.log(this.states)
    })

    this.userService.getAllCountry().subscribe(data => {
      this.countries = data.countries;
      console.log('countries', this.countries)
    })

    this.userService.getAdminDetail().subscribe(DTA => {
      this.adminDetail = DTA
      console.log('adminDetail',this.adminDetail )
    })


    //get all quotation
    this.quoteService.getAllLeads().subscribe(quote => {
      //console.log()
    this.quote=quote;
      console.log(this.quote)
      this.cdr.detectChanges();

    });
  }


  checkLead(){
    if( this.leadCheck.mobile == ''){
      alert('Enter Mobile Number')
    }else{


      this.http.post(`${this.serverURL}/quote/leadCheck`, this.leadCheck).subscribe((data:any)=> {

        this.initialDisplay = false

        if(data.success){
          console.log('mobile already exist')

          // mobile already exist
          this.mobileExist = true
          this.checkedId = data.id
        }else{

          // console.log('lead ID: ',data.LeadId)
          // this.newLeadId = data.LeadId


          this.mobileExist = false
          this.data.Mobile = this.leadCheck.mobile

          // mobile not exist created a lead
          // alert(" Address did not added successfully")
        }
        console.log(Response)
      })




    }
  }

  onSalutionSelect(value){
    this.data.Salution = value
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

  open(content) {

    this.initialDisplay = true
    this.mobileExist = undefined


  
   // localStorage.setItem('newAddressCustId', this.custId);


    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {

      this.closeResult = `Closed with: ${result}`;

    }, (reason) => {

      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

    });

  }

  add(){
    // if(this.data.name == ''|| (this.data.mobile == '')|| (this.data.address1 == '')|| (this.data.address2 == '')||(this.data.state == '')||(this.data.requirement == '')|| (this.data.city== '')|| (this.data.pincode == '')|| (this.data.country == '')){
    //   alert("Enter all fields")

    // if(this.data.Branch == ''|| (this.data.Salution == '')|| (this.data.FirstName == '')|| (this.data.SecondName == '')||(this.data.CompanyName == '')||(this.data.GSTIN == '')||(this.data.AddressLine1 == '')||(this.data.AddressLine2 == '')||(this.data.City == '')||(this.data.Pincode == '') ||(this.data.Landline == '') ||(this.data.Mobile == '')||(this.data.WhatsApp == '')||(  this.data.Requirement== '')){
    //   alert("Enter all fields")


    //   console.log("data", this.data)
    // }else{

      this.http.post(`${this.serverURL}/quote/leads/new`, this.data).subscribe((data:any)=> {

        if(data.success){

          this.leadAdded = true
        }else{
          alert(" Lead did not added")
        }
        console.log(Response)
      })
      console.log("data", this.data)
    // }
  }

  private getDismissReason(reason: any): string {
  
    if (reason === ModalDismissReasons.ESC) {

      return 'by pressing ESC';

    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {

      return 'by clicking on a backdrop';

    } else {

      return  `with: ${reason}`;

    }

  }

}