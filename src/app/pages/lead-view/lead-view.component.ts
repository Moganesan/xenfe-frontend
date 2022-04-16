import { Component, OnInit } from '@angular/core';
import {QuoteService} from '../../services/quote.service';
import {ActivatedRoute, Router, ParamMap} from "@angular/router";
import {map} from "rxjs/operators";





@Component({
  selector: 'app-lead-view',
  templateUrl: './lead-view.component.html',
  styleUrls: ['./lead-view.component.scss']
})
export class LeadViewComponent implements OnInit {

  leadDetail: any
  requirement: any
  editCheck: boolean
  id: any

  constructor(
    private quoteService: QuoteService,
    private route: ActivatedRoute,
    private router: Router,


  ) { }

  ngOnInit(): void {



    this.route.paramMap.pipe(
      map((param: ParamMap) => {
        // @ts-ignore
        return param.params.id;
      })
    ).subscribe(courId => {
      this.id = courId


      this.quoteService.GetSingleLead(courId).subscribe(qtn => {
        this.leadDetail = qtn;
        console.log('Lead Detail',this.leadDetail)
        this.requirement = qtn.requirement
        console.log('Req',this.requirement)
      });


    })
    
  }

  edit(){
    this.editCheck = true
  }

  save(){
    let content = {id : this.id, requirement: this.requirement}

    this.quoteService.SaveLead(content).subscribe(data => {
      console.log('data', data)
      if(data.success){
        alert("Requirement Updated Successfully")
        this.reloadComponent()
      }else{
        alert("Requirement not updated")
      }
    })
  }

  reloadComponent() {
    console.log('I m from reaload comp')

    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }
}

