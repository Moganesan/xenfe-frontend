import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import {jsPDF} from 'jspdf';  
import {ActivatedRoute, Router, ParamMap} from "@angular/router";
import {map} from "rxjs/operators";
import {QuoteService} from '../../services/quote.service';
import {NgxPrintModule} from 'ngx-print';
import { FileSaverModule } from 'ngx-filesaver';
import htmlToPdfmake from 'html-to-pdfmake';
import pdfMake from 'pdfmake/build/pdfmake'
import domtoimage from 'dom-to-image';
import { UserService } from "../../services/user.service";
import { HttpClient } from '@angular/common/http';
import { FileSaverService } from 'ngx-filesaver';


@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  constructor(      
    private route: ActivatedRoute,
    private quoteService: QuoteService,
    private _httpClient: HttpClient,
    private _FileSaverService: FileSaverService,
    private userService: UserService,



    ) { }

  id : any
  quotationDetail: any;
  isIgst: boolean;
  docDefinition: any
  custDet: any
  quotationNTB: any
  bAddress: any
  taxInvoice: any
  docDefinitionWithoutTax: any

  @ViewChild('pdfTable') pdfTable: ElementRef;


  text = `{ "text": "This is text file!中文" }`;
  fileName: string;

  mytodos = [
    {
      item:'need to buy movie tickets',
      isCompleted:false
    },
    {
      item:'Gardening tomorrow 9:00AM',
      isCompleted:false
    },
    {
      item:'Car Washing',
      isCompleted:true
    },
    {
      item:'Buy a pen',
      isCompleted:false
    }
  ]



  ngOnInit(): void {
    this.isIgst = true

    this.route.paramMap.pipe(
      map((param: ParamMap) => {
        // @ts-ignore
        return param.params.id;
      })
    ).subscribe(courId => {
      this.id = courId;

      this.quoteService.GetSingleProductorder(this.id).subscribe(qtn => {
        this.quotationDetail = qtn;

        this.quoteService.getbackorderNTB1(this.id).subscribe(temps => {
          this.quotationNTB=temps;
          console.log('NTB',this.quotationNTB)


          this.quoteService.getTaxInvoice(this.id).subscribe(inv => {
            this.taxInvoice = inv
            console.log('tax invoice',this.taxInvoice)
          })


          this.quoteService.getBillingAddressBackorder(this.id).subscribe(bads => {
            this.bAddress=bads;
            console.log('bill add',this.bAddress)

       

        this.userService.getSingleCustDetail(this.quotationNTB.customer_id).subscribe(data => {
          this.custDet = data.customers_Details,

          console.log("cust detail",this.custDet)


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
                  text: 'INVOICE',
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
                      bold:true
                    },
                    { text: this.quotationNTB.company_name },
                    { text: this.quotationNTB.address1 },
                    { text: this.quotationNTB.address2 },
                    { text: (this.quotationNTB.city, this.quotationNTB.pincode)  },
                    { text: (this.quotationNTB.state, this.quotationNTB.country)  },
                    { text: this.quotationNTB.contactNo }
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
                      bold:true 
                    },
                    { text: this.bAddress.company_name },
                    { text: this.bAddress.address1},
                    { text: this.bAddress.address2 },
                    { text: (this.bAddress.city, this.bAddress.pincode) },
                    { text: (this.bAddress.state, this.bAddress.country) },
                    { text: this.bAddress.contactNo },
                  ], [
  
                    {
                      text: `Invoice No : ${this.quotationDetail[0].id}`,
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
                    },{
                      text: 'Discount',
                      fillColor: 'lightgrey',
                    },{
                      text: 'Price',
                      fillColor: 'lightgrey',
                    },{
                      text: 'Quantity',
                      fillColor: 'lightgrey',
                    },{
                      text: 'Line Total',
                      fillColor: 'lightgrey',
                    }],
                    ...this.quotationDetail.map(p => ([`${p.title} \n HSN: ###, SKU: ###`, `Incl Tax: ${p.price_after_tax} \n Excl Tax: ${p.price}`, p.discount, `Incl Tax: ${p.line_discount_price} \n Excl Tax: ${p.line_discount_price_et} `, p.quantity, p.line_total.toFixed(2)]))
                  ]
                },  margin: [0, 0, 0, 20]
              },


              {
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



              {
                text: 'Additional Details',
                style: 'sectionHeader',
                color: 'grey'
      
              },
              {
                  text: this.quotationDetail.additionalDetails,
                  margin: [0, 0 ,0, 15]          
              },
              {
                columns: [
                  [{ qr: `${this.quotationDetail.customerName}`, fit: '50' }],
                  [{ text: 'Signature', alignment: 'right', italics: true}],
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
      
            // defaultStyle: {
            //   font: 'Courier'
            // },
      
            styles: {
              sectionHeader: {
                bold: true,
                decoration: 'underline',
                fontSize: 14,
                margin: [0, 15,0, 15]          
              }
            }
          };


          this.docDefinitionWithoutTax = {
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
                  text: 'INVOICE',
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
                      bold:true
                    },
                    { text: this.quotationNTB.company_name },
                    { text: this.quotationNTB.address1 },
                    { text: this.quotationNTB.address2 },
                    { text: (this.quotationNTB.city, this.quotationNTB.pincode)  },
                    { text: (this.quotationNTB.state, this.quotationNTB.country)  },
                    { text: this.quotationNTB.contactNo }
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
                      bold:true 
                    },
                    { text: this.bAddress.company_name },
                    { text: this.bAddress.address1},
                    { text: this.bAddress.address2 },
                    { text: (this.bAddress.city, this.bAddress.pincode) },
                    { text: (this.bAddress.state, this.bAddress.country) },
                    { text: this.bAddress.contactNo },
                  ], [
  
                    {
                      text: `Invoice No : ${this.quotationDetail[0].id}`,
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
                    },{
                      text: 'Discount',
                      fillColor: 'lightgrey',
                    },{
                      text: 'Discounted Price',
                      fillColor: 'lightgrey',
                    },{
                      text: 'Quantity',
                      fillColor: 'lightgrey',
                    },{
                      text: 'Line Total',
                      fillColor: 'lightgrey',
                    }],
                    ...this.quotationDetail.map(p => ([p.title, p.title, p.price, (p.price*p.quantity*p.quantity) , p.quantity, (p.price*p.quantity).toFixed(2)])),
                    [{text: 'Total Amount', colSpan: 3, fillcolor: 'lightgrey'}, {}, {}, {}, {}, this.quotationDetail.reduce((sum, p)=> sum + (p.quantity * p.price), 0).toFixed(2)]
                  ]
                },  margin: [0, 0, 0, 20]
              },


              {
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



              {
                text: 'Additional Details',
                style: 'sectionHeader',
                color: 'grey'
      
              },
              {
                  text: this.quotationDetail.additionalDetails,
                  margin: [0, 0 ,0, 15]          
              },
              {
                columns: [
                  [{ qr: `${this.quotationDetail.customerName}`, fit: '50' }],
                  [{ text: 'Signature', alignment: 'right', italics: true}],
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
      
            // defaultStyle: {
            //   font: 'Courier'
            // },
      
            styles: {
              sectionHeader: {
                bold: true,
                decoration: 'underline',
                fontSize: 14,
                margin: [0, 15,0, 15]          
              }
            }
          };
        })
      });
      });

        console.log('Q Detail',this.quotationDetail)

      });
  })
}

  public convetToPDF()
  {
  var data = document.getElementById('contentToConvert');
  html2canvas(data).then(canvas => {
  // Few necessary setting options
  var imgWidth = 208;
  var pageHeight = 295;
  var imgHeight = canvas.height * imgWidth / canvas.width;
  var heightLeft = imgHeight;
   
  const contentDataURL = canvas.toDataURL('image/jpeg')
  let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
  var position = 0;
  pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
  pdf.save('new-file.pdf'); // Generated PDF
  });
  }



  onDown(type: string, fromRemote: boolean) {
    const fileName = `save.${type}`;
    if (fromRemote) {
      this._httpClient
        .get(`assets/files/demo.${type}`, {
          observe: 'response',
          responseType: 'blob',
        })
        .subscribe((res) => {
          this._FileSaverService.save(res.body, fileName);
        });
      return;
    }
    const fileType = this._FileSaverService.genType(fileName);
    const txtBlob = new Blob([this.text], { type: fileType });
    this._FileSaverService.save(txtBlob, fileName);
  }

  public downloadAsPDF() {
    const doc = new jsPDF();
   
    const pdfTable = this.pdfTable.nativeElement;
   
    var html = htmlToPdfmake(pdfTable.innerHTML);
     
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).download(); 
     
  }


  downloadPDF()
            {

              var node = document.getElementById('parentdiv');

              var img;
              var filename;
              var newImage;


              domtoimage.toPng(node, { bgcolor: '#fff' })

                .then(function(dataUrl) {

                  img = new Image();
                  img.src = dataUrl;
                  newImage = img.src;

                  img.onload = function(){

                  var pdfWidth = img.width;
                  var pdfHeight = img.height;

                    // FileSaver.saveAs(dataUrl, 'my-pdfimage.png'); // Save as Image

                    var doc;

                    if(pdfWidth > pdfHeight)
                    {
                      doc = new jsPDF('l', 'px', [pdfWidth , pdfHeight]);
                    }
                    else
                    {
                      doc = new jsPDF('p', 'px', [pdfWidth , pdfHeight]);
                    }


                    var width = doc.internal.pageSize.getWidth();
                    var height = doc.internal.pageSize.getHeight();


                    doc.addImage(newImage, 'PNG',  10, 10, width, height);
                    filename = 'mypdf_' + '.pdf';
                    doc.save(filename);

                  };


                })
                .catch(function(error) {

                 // Error Handling

                });



            }



            generatePDF(action = 'open') {



          
              if(action==='download'){
                pdfMake.createPdf(this.docDefinition).download();
              }else if(action === 'print'){
                pdfMake.createPdf(this.docDefinition).print();      
              }else{
                pdfMake.createPdf(this.docDefinition).open();      
              }
          
            }





            


}
