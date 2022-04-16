import { Component, OnInit } from '@angular/core';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
  
  
  class Product{
    name: string;
    price: number;
    qty: number;
  }
  class Invoice{
    customerName: string;
    address: string;
    contactNo: number;
    email: string;
    
    products: Product[] = [];
    additionalDetails: string;
  
    constructor(){
      // Initially one empty product row we will show 
      this.products.push(new Product());
    }
  }

  @Component({
    selector: 'app-invoice4',
    templateUrl: './invoice4.component.html',
    styleUrls: ['./invoice4.component.scss']
  })
  
  export class Invoice4Component {

    invoice = new Invoice(); 
    
    generatePDF(action = 'open') {
      let docDefinition = {
        content: [
          {
            image: 'https://cdn.logo.com/hotlink-ok/logo-social.png',
            width: 150,
        height: 150,
            text: 'XENFE',
            fontSize: 16,
            alignment: 'center',
            color: '#047886'
          },
          {
            text: 'INVOICE',
            fontSize: 20,
            bold: true,
            alignment: 'center',
            decoration: 'underline',
            color: 'skyblue'
          },
          {
            columns: [
              [
                {
                  text: `Date: ${new Date().toLocaleString()}`,
                  alignment: 'right', italics: true
                },
                { 
                  text: `Bill No : ${((Math.random() *1000).toFixed(0))}`,
                  alignment: 'right', italics: true
                }
              ]
            ]
          },
          
         {   columns: [
              [
                {
                  text: 'Shipping Address',
                  style: 'sectionHeader', color: 'grey'
                }
              ],
              [
                {
                  text: 'Billing Address',
                  style: 'sectionHeader', alignment: 'right', color: 'grey'
                }
              ]
            ]
          },
  
          {
            columns: [
              [
                {
                  text: this.invoice.customerName,
                  bold:true
                },
                { text: this.invoice.address },
                { text: this.invoice.email },
                { text: this.invoice.contactNo }
              ],
              [
                {
                  text: this.invoice.customerName,
                  bold:true , alignment: 'right'
                },
                { text: this.invoice.address, alignment: 'right'},
                { text: this.invoice.email, alignment: 'right' },
                { text: this.invoice.contactNo, alignment: 'right' },
              ]
            ]
          },
          {
            text: 'Order Details',
            style: 'sectionHeader',
            color: 'grey'
  
          },
          {
            table: {
              headerRows: 1,
              widths: ['*', 'auto', 'auto', 'auto', 'auto', 'auto'],
              body: [
                [
                {
                  text: 'Product',
                  fillColor: '#555555',
                  color: '#00FFFF',
                },
                {
                  text: 'Unit Price',
                  fillColor: '#555555',
                  color: '#00FFFF',
                },{
                  text: 'Discount',
                  fillColor: '#555555',
                  color: '#00FFFF',
                },{
                  text: 'Discounted Price',
                  fillColor: '#555555',
                  color: '#00FFFF',
                },{
                  text: 'Quantity',
                  fillColor: '#555555',
                  color: '#00FFFF',
                },{
                  text: 'Line Total',
                  fillColor: '#555555',
                  color: '#00FFFF',
                }],
                ...this.invoice.products.map(p => ([p.name, p.name, p.price, (p.price*p.qty*p.qty) , p.qty, (p.price*p.qty).toFixed(2)])),
                [{text: 'Total Amount', colSpan: 3, fillcolor: 'lightgrey'}, {}, {}, {}, {}, this.invoice.products.reduce((sum, p)=> sum + (p.qty * p.price), 0).toFixed(2)]
              ]
            }
          },
          {
            text: 'Additional Details',
            style: 'sectionHeader',
            color: 'grey'
  
          },
          {
              text: this.invoice.additionalDetails,
              margin: [0, 0 ,0, 15]          
          },
          {
            columns: [
              [{ qr: `${this.invoice.customerName}`, fit: '50' }],
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
  
      if(action==='download'){
        pdfMake.createPdf(docDefinition).download();
      }else if(action === 'print'){
        pdfMake.createPdf(docDefinition).print();      
      }else{
        pdfMake.createPdf(docDefinition).open();      
      }
  
    }
  
    addProduct(){
      this.invoice.products.push(new Product());
    }
    
  }
