import { Component, OnInit } from '@angular/core';
import {ViewChild, ElementRef } from '@angular/core';  
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';

import html2canvas from 'html2canvas';
import {jsPDF} from 'jspdf';  


@Component({
  selector: 'app-invoice-test',
  templateUrl: './invoice-test.component.html',
  styleUrls: ['./invoice-test.component.scss']
})
export class InvoiceTestComponent implements OnInit {

  Data = [  
    { Id: 101, Name: 'Nitin', Salary: 1234 },  
    { Id: 102, Name: 'Sonu', Salary: 1234 },  
    { Id: 103, Name: 'Mohit', Salary: 1234 },  
    { Id: 104, Name: 'Rahul', Salary: 1234 },  
    { Id: 105, Name: 'Kunal', Salary: 1234 }  
  ]; 

  @ViewChild('content') content: ElementRef;  


  constructor() { }
  ngOnInit(): void {
  }

  title = 'html-to-pdf-angular-application';
  public convetToPDF()
  {
  var data = document.getElementById('contentToConvert');
  html2canvas(data).then(canvas => {
  // Few necessary setting options
  var imgWidth = 208;
  var pageHeight = 295;
  var imgHeight = canvas.height * imgWidth / canvas.width;
  var heightLeft = imgHeight;
   
  const contentDataURL = canvas.toDataURL('image/png')
  let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
  var position = 0;
  pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
  pdf.save('new-file.pdf'); // Generated PDF
  });
  }
  }


