import { Component, OnInit } from '@angular/core';
import { QuoteService } from '../../services/quote.service';
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import { map } from "rxjs/operators";
import { quoteDetailModelServer } from '../../models/quote';
import { UserService } from "../../services/user.service";

import pdfMake from 'pdfmake/build/pdfmake'



@Component({
  selector: 'app-quotation-view',
  templateUrl: './quotation-view.component.html',
  styleUrls: ['./quotation-view.component.scss']
})
export class QuotationViewComponent implements OnInit {


  isIgst: boolean;
  adminStateId: number;

  docDefinitionIGST: any;

  countries: [{ id_country: any, name: any }];
  countriesAdd: any[] = [];
  states: any[] = [];

  Bcountries: [{ id_country: any, name: any }];
  BcountriesAdd: any[] = [];
  Bstates: any[] = [];

  state: any;
  country: any;

  Bstate: any;
  Bcountry: any;

  countryName: any;
  stateName: any;

  BcountryName: any;
  BstateName: any;


  id: any;
  quotationDetail: any;
  //ntb name total branch
  quotationNTB: any;
  bAddress: any;
  priceInclTax: any[] = [];

  constructor(
    private quoteService: QuoteService,
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  docDefinition: any


  ngOnInit(): void {
    this.userService.getAdminDetail().subscribe(data => {
      this.adminStateId = data.state_id
      console.log('A SID', this.adminStateId)
    })

    this.userService.getAllCountry().subscribe(data => {
      this.countries = data.countries;
      this.countriesAdd = data.countries;
      console.log('countries', this.countries)
    })

    this.isIgst = true
    if (this.adminStateId == this.quotationNTB?.state_id) {
      this.isIgst = false
    }
    //get single quotation
    this.route.paramMap.pipe(
      map((param: ParamMap) => {
        // @ts-ignore
        return param.params.id;
      })
    ).subscribe(courId => {
      this.id = courId;
      localStorage.setItem('convertToBackOrderFromQuote', this.id);


      this.quoteService.GetSingleQuotation1(this.id).subscribe(qtn => {
        this.quotationDetail = qtn;
        console.log('Q Detail', this.quotationDetail)
        //this.

        //this.quotationDetail[index].priceInclTax = (this.quotationDetail[index].price * 1 + this.quotationDetail[index].price * (this.quotationDetail[index].tax_rate / 100))



        this.quoteService.getBillingAddress(this.id).subscribe(bads => {
          this.bAddress = bads;
          console.log('bill add', this.bAddress)

          this.userService.getAllStates(this.bAddress.country_id).subscribe(data => {
            this.Bstates = data.states
            console.log('states', this.Bstates)
            this.Bstate = this.Bstates.filter(res => {
              return res.id_state == this.bAddress.state_id
            })
            console.log('state', this.Bstate)
            this.BstateName = this.Bstate[0].name

            this.Bcountry = this.countries.filter(res => {
              return res.id_country == this.bAddress.country_id
            })
            this.BcountryName = this.Bcountry[0].name

            this.country = this.countries.filter(res => {
              return res.id_country == this.quotationNTB.country_id
  
            })
  
            console.log('quotation detail', this.quotationDetail)
            console.log('quotation NTB', this.quotationNTB)

            var timeStamp = this.quotationDetail[0].updated

            console.log('timestamp', timeStamp, this.quotationDetail[0].updated)



            //var noTime = new Date(timeStamp.getFullYear(), timeStamp.updated.getMonth(), timeStamp.updated.getDate());

  
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
                    text: 'QUOTATION',
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
                        text: `${this.quotationNTB.first_name} ${this.quotationNTB.second_name}`,
                        bold: true
                      },
                      { text: this.quotationNTB.company_name },
                      { text: this.quotationNTB.address1 },
                      { text: this.quotationNTB.address2 },
  
                      { text: (this.quotationNTB.city, this.quotationNTB.pincode) },
                      { text: (this.stateName, this.countryName) },
                      { text: this.quotationNTB?.mobile }
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
                      { text: (this.BstateName, this.BcountryName) },
                      { text: this.bAddress?.mobile },
                    ], [
  
                      {
                        text: `Quotation No : ${this.quotationDetail[0].quotation_id}`,
                        alignment: 'right', italics: true
                      },
                      {
                        text: `Date: ${this.quotationDetail[0].updated}`,
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
                {
                  columns: [
                    [
                      { text: 'Purchase Order: ###' },
                      { text: 'Purchase Order Date: ###' }
                    ],
                    [
                      { text: 'Sales Person: ###' },
                      { text: 'Affiliate: ###' }
                    ],
                    [
                      { text: 'Payment: ###' },
                      { text: 'GSTIN: ###' }
                    ]
                  ], margin: [0, 0, 0, 10]
                },
                {
                  table: {
                    headerRows: 1,
                    widths: ['*', 'auto', 'auto', 'auto', 'auto', 'auto'],
                    body: [
                      [
                        {
                          text: 'Product',
                          fillColor: 'lightgrey',
                        },
                        {
                          text: 'Unit Price',
                          fillColor: 'lightgrey',
                        }, {
                          text: 'Discount',
                          fillColor: 'lightgrey',
                        }, {
                          text: 'Discounted\nPrice',
                          fillColor: 'lightgrey',
                        }, {
                          text: 'Quantity',
                          fillColor: 'lightgrey',
                        }, {
                          text: 'Line Total',
                          fillColor: 'lightgrey',
                        }],
                      // `Date: ${this.quotationDetail.updated}`
                      ...this.quotationDetail.map(p => ([`${p.title} \n HSN: ###, SKU: ###`, `Incl Tax: ${p.price_after_tax} \n Excl Tax: ${p.price}`, p.discount, `Incl Tax: ${p.line_discount_price} \n Excl Tax: ${p.line_discount_price_et} `, p.quantity, p.line_total.toFixed(2)]))
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
                    [{
                      text: 'Quotation Summary',
                      fontSize: 14,
                      bold: true,
                      color: 'grey', margin: [0, 0, 0, 10]
                    },
                    {
                      width: 'auto',
                      table: {
                        headerRows: 1,
                        widths: ['auto', 'auto'],
                        body: [
                          [
                            {
                              text: 'Sub Total W/O tax:',
                              color: 'brown',
                            },
                            {
                              text: (this.quotationNTB?.sub_total),
                              color: 'brown',
                            }
                          ], [
                            {
                              text: 'Total CGST :',
                              color: 'brown',
                            },
                            {
                              text: (this.quotationNTB?.total_cgst),
                              color: 'brown',
                            }
                          ], [
                            {
                              text: 'Total SGST :',
  
                              color: 'brown',
                            },
                            {
                              text: (this.quotationNTB?.total_sgst),
                              color: 'brown',
                            }
                          ], [
                            {
                              text: 'Final Total :',
                              color: 'brown',
                            },
                            {
                              text: (this.quotationNTB?.total),
                              color: 'brown',
                            }
                          ],
                        ]
                      }
                    }
                    ]
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
                  text: 'Additional Details',
                  style: 'sectionHeader',
                  color: 'grey'
  
                },
                {
                  text: this.quotationDetail.additionalDetails,
                  margin: [0, 0, 0, 15]
                },
                {
                  columns: [
                    [{ qr: `${this.quotationDetail.customerName}`, fit: '100' }],
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
                    'Order can be return in max 10 days.',
                    'Warrenty of the product will be subject to the manufacturer terms and conditions.',
                    'This is system generated invoice.',
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

            this.docDefinitionIGST = {
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
                    text: 'QUOTATION',
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
                        text: `${this.quotationNTB.first_name} ${this.quotationNTB.second_name}`,
                        bold: true
                      },
                      { text: this.quotationNTB.company_name },
                      { text: this.quotationNTB.address1 },
                      { text: this.quotationNTB.address2 },
  
                      { text: (this.quotationNTB.city, this.quotationNTB.pincode) },
                      { text: (this.stateName, this.countryName) },
                      { text: this.quotationNTB?.mobile }
                    ],
                    [
                      {
                        text: 'Billing Address',
                        bold: true,
                        alignment: 'left',
                        color: 'grey'
                      },
                      {
                        text: `${this.quotationNTB.first_name} ${this.quotationNTB.second_name}`,
                        bold: true
                      },
                      { text: this.bAddress.company_name },
                      { text: this.bAddress.address1 },
                      { text: this.bAddress.address2 },
  
                      { text: (this.bAddress.city, this.bAddress.pincode) },
                      { text: (this.BstateName, this.BcountryName) },
                      { text: this.bAddress?.mobile },
                    ], [
  
                      {
                        text: `Quotation No : ${this.quotationDetail[0].quotation_id}`,
                        alignment: 'right', italics: true
                      },
                      {
                        text: `Date: ${this.quotationDetail[0].updated}`,
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
                {
                  columns: [
                    [
                      { text: 'Purchase Order: ###' },
                      { text: 'Purchase Order Date: ###' }
                    ],
                    [
                      { text: 'Sales Person: ###' },
                      { text: 'Affiliate: ###' }
                    ],
                    [
                      { text: 'Payment: ###' },
                      { text: 'GSTIN: ###' }
                    ]
                  ], margin: [0, 0, 0, 10]
                },
                {
                  table: {
                    headerRows: 1,
                    widths: ['*', 'auto', 'auto', 'auto', 'auto', 'auto'],
                    body: [
                      [
                        {
                          text: 'Product',
                          fillColor: 'lightgrey',
                        },
                        {
                          text: 'Unit Price',
                          fillColor: 'lightgrey',
                        }, {
                          text: 'Discount',
                          fillColor: 'lightgrey',
                        }, {
                          text: 'Discounted\nPrice',
                          fillColor: 'lightgrey',
                        }, {
                          text: 'Quantity',
                          fillColor: 'lightgrey',
                        }, {
                          text: 'Line Total',
                          fillColor: 'lightgrey',
                        }],
                      // `Date: ${this.quotationDetail.updated}`
                      ...this.quotationDetail.map(p => ([`${p.title} \n HSN: ###, SKU: ###`, `Incl Tax: ${p.price_after_tax} \n Excl Tax: ${p.price}`, p.discount, `Incl Tax: ${p.line_discount_price} \n Excl Tax: ${p.line_discount_price_et} `, p.quantity, p.line_total.toFixed(2)]))
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
                    [{
                      text: 'Quotation Summary',
                      fontSize: 14,
                      bold: true,
                      color: 'grey', margin: [0, 0, 0, 10]
                    },
                    {
                      width: 'auto',
                      table: {
                        headerRows: 1,
                        widths: ['auto', 'auto'],
                        body: [
                          [
                            {
                              text: 'Sub Total W/O tax:',
                              color: 'brown',
                            },
                            {
                              text: (this.quotationNTB?.sub_total),
                              color: 'brown',
                            }
                          ], [
                            {
                              text: 'Total CGST :',
                              color: 'brown',
                            },
                            {
                              text: (this.quotationNTB?.total_cgst),
                              color: 'brown',
                            }
                          ], [
                            {
                              text: 'Total SGST :',
  
                              color: 'brown',
                            },
                            {
                              text: (this.quotationNTB?.total_sgst),
                              color: 'brown',
                            }
                          ], [
                            {
                              text: 'Final Total :',
                              color: 'brown',
                            },
                            {
                              text: (this.quotationNTB?.total),
                              color: 'brown',
                            }
                          ],
                        ]
                      }
                    }
                    ]
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
                  text: 'Additional Details',
                  style: 'sectionHeader',
                  color: 'grey'
  
                },
                {
                  text: this.quotationDetail.additionalDetails,
                  margin: [0, 0, 0, 15]
                },
                {
                  columns: [
                    [{ qr: `${this.quotationDetail.customerName}`, fit: '100' }],
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
                    'Order can be return in max 10 days.',
                    'Warrenty of the product will be subject to the manufacturer terms and conditions.',
                    'This is system generated invoice.',
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
  
            this.countryName = this.country[0].name

          })


        });

        this.quoteService.getquotationNTB1(this.id).subscribe(temps => {
          this.quotationNTB = temps;
          console.log('NTB', this.quotationNTB)
          if (this.adminStateId == this.quotationNTB?.state_id) {
            this.isIgst = false
          }

          this.userService.getAllStates(this.quotationNTB.country_id).subscribe(data => {
            this.states = data.states
            console.log('states', this.states)
            this.state = this.states.filter(res => {
              return res.id_state == this.quotationNTB.state_id
            })
            console.log('state', this.state)
            this.stateName = this.state[0].name
          })




        });
      });

    });



  }

  taxCalculationLocal(index: number) {
    console.log('I m from tax calc loacl')
    console.log('5')
    //console.log('index', index, 'tax', this.quoteTempData.data[index].tax )
    this.quotationDetail[index].priceInclTax = (this.quotationDetail[index].price * 1 + this.quotationDetail[index].price * (this.quotationDetail[index].tax_rate / 100))
    // return this.priceInclTax[index]
  }


  CalculateLineTotal(index): number {
    let subTotal = 0;

    const p = this.quotationDetail[index];
    // @ts-ignore
    subTotal = p.quantity * p.price;

    return subTotal;
  }

  edit() {

  }

  addToQuote() {

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

