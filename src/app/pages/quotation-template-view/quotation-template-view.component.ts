import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {QuoteService} from '../../services/quote.service';
import {ActivatedRoute, Router, ParamMap} from "@angular/router";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-quotation-template-view',
  templateUrl: './quotation-template-view.component.html',
  styleUrls: ['./quotation-template-view.component.scss']
})
export class QuotationTemplateViewComponent implements OnInit {

  templateDetails: any
  id: any
  //NDT-Name Description Total
  templateNDT: any;

  constructor(public quoteService: QuoteService,
    private cdr: ChangeDetectorRef,
    private router:Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map((param: ParamMap) => {
        // @ts-ignore
        return param.params.id;
      })
    ).subscribe(tempId => {
      this.id = tempId;

      this.quoteService.getTemplateNDT(this.id).subscribe(temps => {
        this.templateNDT=temps;
        console.log('NDT',this.templateNDT)
        this.cdr.detectChanges();

      });

      this.quoteService.GetSingleQuote(this.id).subscribe(temp => {
        this.templateDetails = temp;
        console.log('Template Detail',this.templateDetails)
        this.cdr.detectChanges();

      });
    });
  }

  edit(){

  }

  addToQuote(){
    this.quoteService.saveTempId(this.id)
    this.router.navigateByUrl('/quotationList/createQuotation');
    this.quoteService.quteTempId$
    console.log('temp id',this.quoteService.quteTempId$)

    //localStorage.setItem('convertToTempId', JSON.stringify(this.id));
    localStorage.setItem('convertToTempId', this.id);
    

  }



  CalculateLineTotal(index): number {
    let subTotal = 0;

    const p = this.templateDetails[index];
    // @ts-ignore
    subTotal = p.quantity * p.price;

    return subTotal;
  }
}
