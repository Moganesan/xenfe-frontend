import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-unbilled',
  templateUrl: './unbilled.component.html',
  styleUrls: ['./unbilled.component.scss']
})
export class UnbilledComponent implements OnInit {
  
    cust: any;
    name1: any;   //note name n caps
    userSelection: any;
    customer_details: any[] = [];
  
  
  
    constructor(
      private userService: UserService,
      private cd: ChangeDetectorRef,

    ) { }
  
    ngOnInit(): void {
      // get all cust detail of unbilled
      this.userService.getAllUnBilledCustDetail().subscribe(custD => {
        this.customer_details = custD.Data;
        this.cust = this.customer_details
        console.log('cust', this.cust)
        this.cd.markForCheck();

  
        // function onlyUnique(value, index, self) {
        //   return self.indexOf(value) === index;
        // }
  
        // var unique = this.cust.filter(onlyUnique);
        // console.log('unique', unique)
      })
    }
  
    search1() {
      console.log('I m from seach 1')
  
      // this.name1 == "";
      // this.userSelection = "";
      // if (this.name1 == "") {
      //   this.ngOnInit();
      // } else {
        this.cust = this.customer_details.filter(res => {
          return res.first_name?.toLocaleLowerCase().match(this.name1?.toLocaleLowerCase()) || res.second_name?.toLocaleLowerCase().match(this.name1?.toLocaleLowerCase()) || res.company_name?.toLocaleLowerCase().match(this.name1?.toLocaleLowerCase()) || res.mobile?.toString().toLocaleLowerCase().match(this.name1?.toLocaleLowerCase())
        })

        setTimeout(() => {
          this.userSelection = this.cust[0].customer_id
 //       this.cdr.detectChanges();
        this.cd.markForCheck();
        }, 100);
      //}
      this.cd.markForCheck();

    }
  
  
    onSelect(cust_id){
      console.log('cust id', cust_id)
  
      // get all unbilled items of the selected cust id
  
      this.userService.getAllUnBilledWithCustId(cust_id)
      this.cd.markForCheck();

    }
  
  
  
  
  }
  
