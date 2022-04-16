import { Component, OnInit } from '@angular/core';
import { QuoteService } from 'src/app/services/quote.service';
import {ActivatedRoute, Router, ParamMap} from "@angular/router";
import {map} from "rxjs/operators";
import pdfMake from 'pdfmake/build/pdfmake'
import * as moment from 'moment';



@Component({
  selector: 'app-deliverychallan-view',
  templateUrl: './deliverychallan-view.component.html',
  styleUrls: ['./deliverychallan-view.component.scss']
})
export class DeliverychallanViewComponent implements OnInit {

  deliveryChallan: any
  deliveryChallan1: any
  bAddress: any
  docDefinition: any


  id: any

  constructor(
    private quoteService: QuoteService,
    private route: ActivatedRoute,

  ) { }

  ngOnInit(): void {

        this.route.paramMap.pipe(
      map((param: ParamMap) => {
        // @ts-ignore
        return param.params.id;
      })
    ).subscribe(courId => {
      this.id = courId


      this.quoteService.getDeliveryChallan(courId).subscribe(data => {
        this.deliveryChallan = data
        this.deliveryChallan1 = this.deliveryChallan[0]
        console.log("data", data)

        this.quoteService.getBillingAddress2(this.deliveryChallan1.billing_id).subscribe(data1 => {
          this.bAddress = data1
          console.log("data1", data1)

          this.docDefinition = {
            content: [
              {
                columns: [{

                  text: 'XENFE',
                  fontSize: 14,
                  alignment: 'left',
                  color: '#047886'
                },
                {
                  text: '#113/5, 1st Floor, Kanthamma Complex, Old Madras Road, Ulsoor, Bangalore - 560008. India',
                  fontSize: 10,
                  alignment: 'center',
                  color: '#047886'
                },
                {
                  text: 'Delivery Slip',
                  fontSize: 14,
                  bold: true,
                  alignment: 'right',
                  color: 'skyblue'
                }]
              },
              // horizontal line
              {
                table: {
                  widths: ['*'],
                  body: [[" "], [" "]]
                },
                layout: {
                  hLineWidth: function (i, node) {
                    return (i === 0 || i === node.table.body.length) ? 0 : 2;
                  },
                  vLineWidth: function (i, node) {
                    return 0;
                  },
                }
              },
              {
                columns: [
                  [
                    {
                      text: 'Shipping Address',
                      bold: true,
                      alignment: 'left',
                      color: 'grey'
                    },
                    {
                      text: `${this.deliveryChallan1.first_name} ${this.deliveryChallan1.second_name}`,
                      bold: true
                    },
                    { text: this.deliveryChallan1.company_name },
                    { text: this.deliveryChallan1.address1 },
                    { text: this.deliveryChallan1.address2 },

                    { text: (this.deliveryChallan1.city, this.deliveryChallan1.pincode) },
                    { text: (this.deliveryChallan1.state, this.deliveryChallan1.country) },
                    { text: this.deliveryChallan1?.mobile }
                  ],
                  [
                    {
                      text: 'Billing Address',
                      bold: true,
                      alignment: 'left',
                      color: 'grey'
                    },
                    {
                      text: `${this.bAddress.first_name} ${this.bAddress.second_name}`,
                      bold: true
                    },
                    { text: this.bAddress.company_name },
                    { text: this.bAddress.address1 },
                    { text: this.bAddress.address2 },

                    { text: (this.bAddress.city, this.bAddress.pincode) },
                    { text: (this.bAddress.state, this.bAddress.country) },
                    { text: this.bAddress?.mobile },
                  ], [

                    {
                      text: `Delivery Slip No : ${this.deliveryChallan[0].delivery_challan_id}`,
                      alignment: 'right', italics: true
                    },
                    {
                      text: `Date: ${moment(this.deliveryChallan[0].created).format("MM-DD-YYYY")}`,
                      alignment: 'right', italics: true
                    }

                  ]
                ]
              },
              {
                table: {
                  widths: ['*'],
                  body: [[" "], [" "]]
                },
                layout: {
                  hLineWidth: function (i, node) {
                    return (i === 0 || i === node.table.body.length) ? 0 : 2;
                  },
                  vLineWidth: function (i, node) {
                    return 0;
                  },
                }
              },
              // {
              //   text: 'Quotation Detail',
              //   style: 'sectionHeader',
              //   color: 'grey'
              // },
              // {
              //   columns: [
              //     [
              //       { text: 'Purchase Order: ###' },
              //       { text: 'Purchase Order Date: ###' }
              //     ],
              //     [
              //       { text: 'Sales Person: ###' },
              //       { text: 'Affiliate: ###' }
              //     ],
              //     [
              //       { text: 'Payment: ###' },
              //       { text: 'GSTIN: ###' }
              //     ]
              //   ], margin: [0, 0, 0, 10]
              // },
              {
                table: {
                  headerRows: 1,
                  widths: ['*', 'auto', 'auto', 'auto'],
                  body: [
                    [
                      {
                        text: 'Product',
                        fillColor: 'lightgrey',
                      },
                      {
                        text: 'Unit Price',
                        fillColor: 'lightgrey',
                      }, 
                      {
                        text: 'Quantity',
                        fillColor: 'lightgrey',
                      }, {
                        text: 'Line Total',
                        fillColor: 'lightgrey',
                      }],
                    // `Date: ${this.quotationDetail.updated}`
                    ...this.deliveryChallan.map(p => ([`${p.title} \n HSN: ###, SKU: ###`, `${p.price_after_discount}`, p.quantity, p.line_total.toFixed(2)]))
                  ]
                }, margin: [0, 0, 0, 20]
              }, {
                columns: [
                  [
                    {
                      text: 'Bank Details',
                      fontSize: 14,
                      bold: true,
                      alignment: 'left',
                      color: 'grey', margin: [0, 0, 0, 10]
                    },
                    { text: 'Account Holder: #####' },
                    { text: 'Account No: #####' },
                    { text: 'IFSC: #####' },
                    { text: 'Branch: #####' }
                  ], [{ width: '*', text: '' }],
                ]
              },
              //   {   columns: [
              //     [
              //       {
              //         text: 'Sales Summary',
              //         style: 'sectionHeader', color: 'grey'
              //       }
              //     ],
              //     [
              //       {
              //         text: 'Order Summary',
              //         style: 'sectionHeader', alignment: 'right', color: 'grey'
              //       }
              //     ]
              //   ]
              // },
              {
                text: 'Payment QR Code',
                style: 'sectionHeader',
                color: 'grey'

              },
              {
                text: this.deliveryChallan.additionalDetails,
                margin: [0, 0, 0, 15]
              },
              {
                columns: [
                  [{ qr: `${this.deliveryChallan.customerName}`, fit: '100' }],
                  [{ text: 'Signature', alignment: 'right', italics: true }],
                ]
              },
              {
                text: 'Terms and Conditions',
                style: 'sectionHeader',
                color: 'grey'
              },
              {
                ul: [
                  'Delivery Slip can be return within 48 Hours.',
                  'Warranty of the product will be subject to the manufacturer terms and conditions.',
                  'This is system generated Delivery Slip.',
                ],
              }
            ],

            defaultStyle: {
              fontSize: 10,
            },

            styles: {
              sectionHeader: {
                bold: true,
                decoration: 'underline',
                fontSize: 14,
                margin: [0, 15, 0, 15]
              }
            }
          };
        })
      })


    })




  }


  save(){
    
  }

  edit(){
    
  }

  generatePDF(action = 'open') {




    if (action === 'download') {
      pdfMake.createPdf(this.docDefinition).download();
    } else if (action === 'print') {
      pdfMake.createPdf(this.docDefinition).print();
    } else {
      pdfMake.createPdf(this.docDefinition).open();
    }

  }

}
