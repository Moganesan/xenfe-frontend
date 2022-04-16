import { Component, ViewChild, ElementRef  } from '@angular/core';

import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';
@Component({
  selector: 'app-invoice3',
  templateUrl: './invoice3.component.html',
  styleUrls: ['./invoice3.component.scss']
})
export class Invoice3Component {


  @ViewChild('pdfTable') pdfTable: ElementRef;
  //PDF genrate button click function
  public downloadAsPDF() {
    const doc = new jsPDF();
    //get table html
    const pdfTable = this.pdfTable.nativeElement;

    //html to pdf format
    var html = htmlToPdfmake(pdfTable.innerHTML);
   
    const documentDefinition = { content: html };

    pdfMake.createPdf(documentDefinition).download();

    

  
  }

  
  
  
}
