import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import * as faker from 'faker';
import { Contact } from '../../models/user.model';
import { ExcelService } from '../../services/excel.service';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import {environment} from '../../../environments/environment';




@Component({
  selector: 'app-excel-import-test',
  templateUrl: './excel-import-test.component.html',
  styleUrls: ['./excel-import-test.component.scss']
})
export class ExcelImportTestComponent implements OnInit {
  private serverURL = environment.serverURL;



  numberToWord : any[] = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten']

  importContacts: Contact[] = [];
  importContacts1: any;

  exportContacts: Contact[] = [];
  productFieldList: any
  productFieldData: Array<{ text: string }>
  arr = [];
  arr1 = [];
  arr2 = [];


  data0: any
  data1: any
  data2: any
  data3: any
  data4: any
  data5: any
  data6: any
  data7: any
  data8: any

  data: any[] = []

  noRepeatId: any[] = []

  dataToBack: any[] = []
  json: any

  header: any
  header1: any


  dataToFront: any[] = []
  json1: any

  createOrUpdatevalue: number




  constructor(private excelSrv: ExcelService, private cd: ChangeDetectorRef, private http: HttpClient,       private router: Router,

  ) { }

  ngOnInit(): void {

    this.http.get<any>(`${this.serverURL}/products/productfields/all`).subscribe(data => {

      this.productFieldList = data, console.log(this.productFieldList)
    })

    setTimeout(() => {

      var id = 1

      for (var key in this.productFieldList) {
        if (id == 4 || id == 1) {
          console.log('do nothing')
        } else {
          this.arr.push({ "name": key, "id": id })
          console.log('data', this.arr)
        }
        id++

      }
      this.cd.markForCheck();

    }, 500)


    for (let index = 0; index < 10; index++) {
      const contact = new Contact();
      contact.name = faker.name.findName();
      contact.phone = faker.phone.phoneNumber();
      contact.email = faker.internet.email();
      contact.address = faker.address.streetAddress();
      this.exportContacts.push(contact);
    }
  }

  onFileChange(evt: any) {
    const target: DataTransfer = <DataTransfer>(evt.target);

    if (target.files.length !== 1) throw new Error('Cannot use multiple files');

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {

      const bstr: string = e.target.result;

      console.log('bstr', bstr)

      const data = <any[]>this.excelSrv.importFromFile(bstr);

      console.log('data', data)


      // const header: string[] = Object.getOwnPropertyNames(new Contact());
      const importedData = data.slice();

      this.header = data[0]

      console.log("header", this.header)
      console.log("test 2", this.header.length)

      for (let j = 0; j < this.header.length; j++) {
        this.data.push(j)

        // noRepeatId - it is an aray consist of zeros used to capture the unique IDs that the customer select in the option fields
        this.noRepeatId.push(0)
        console.log("test 4", this.data)
        console.log("test 4...", this.noRepeatId)


      }

      this.importContacts = importedData.map(arr => {
        const obj = {};




        for (let i = 0; i < this.header.length; i++) {

          const k = this.header[i];

          obj[k] = arr[i];



        }
        this.cd.markForCheck();

        return <Contact>obj;
      })

      setTimeout(() => {
        this.importContacts1 = this.importContacts[0]

        console.log('testing 123', this.importContacts1)

        this.cd.markForCheck();




        for (var key in this.importContacts1) {

            this.arr1.push(key)
            console.log('data array 1 one', this.arr1)    // arr1 has the headers
          
        }

        this.dataToFront = this.importContacts
        this.json1 = this.importContacts       // assigning excel data to variabe json1
        console.log('json1', this.json1)


        const arr = this.json1                // assigning json to arr
        var newName123 = 0
        var oldName1 = ''
        var newName1 = ''
    
    
        this.arr1.forEach(index => {        // from this array we are taking the new name to replace the old name
          oldName1 = this.arr1[newName123]
          newName1 = this.numberToWord[newName123]


          // oldName1 = this.header[index]
          console.log('new name', newName1)
          console.log('old name', oldName1)
          console.log(this.dataToFront)
          this.dataToFront.forEach((obj) => {
            this.renameKey(obj, oldName1, newName1), console.log("for test", oldName1, newName1)
          });

          console.log('data to front', this.dataToFront)
          newName123++
    
        })




      }, 100);


    };
    reader.readAsBinaryString(target.files[0]);
    this.cd.markForCheck();


  }

  exportData(tableId: string) {
    this.excelSrv.exportToFile("contacts", tableId);
  }

  onSelect(value, index) {
    if (this.noRepeatId.includes(value)) {
      console.log('yes it has')
      setTimeout(() => {
        this.data[index] = 0
        this.cd.markForCheck();
      }, 100)
      setTimeout(() => {
        this.data[index] = 0

        this.cd.markForCheck();
      }, 150)
      alert('the option is already selected')
      this.cd.markForCheck();

    } else {
      console.log("no it don't")
      this.noRepeatId[index] = value
      this.cd.markForCheck();
    }
    console.log('check', this.noRepeatId, index)

  }


  renameKey(obj, oldKey, newKey) {
    obj[newKey] = obj[oldKey];
    delete obj[oldKey];
  }

  onSave() {
    if(this.dataToFront[0] == undefined){
      alert('Import data first')
    }
    if (this.noRepeatId.includes(0))
    // if any field is left it will show error
    {
      alert('Please choose all the fields')
    } else {
      console.log('process', this.noRepeatId)   // it has id's of selected fields

      this.noRepeatId.forEach(element => {       // each id is taken to match
        console.log('foreach 1', element)
        this.arr.forEach(content => {         // it has field names and corresponding id's
          console.log('foreach 2', content.id)

          if (element == content.id) {
            this.dataToBack.push(content)        // field name and id's are taken as per order
            console.log('foreach 3', this.dataToBack)
          }
        })
      });
      console.log('foreach 4', this.importContacts)  // it has excel data





    this.json = this.importContacts       // assigning excel data to variabe json
    console.log('json', this.json)

    
     this.arr2 = this.json                // assigning json to arr
    var newName = ''
    var oldName = ''


    this.dataToBack.forEach((objj, index) => {    //dataToBack field name and id's are taken as per order
      newName = objj.name
      oldName = this.numberToWord[index]
      console.log('new name', newName)
      console.log('old name', oldName)
      console.log(this.arr2)
      this.arr2.forEach((obj) => {
        this.renameKey(obj, oldName, newName), console.log("for test", oldName, newName)
      });

    })
    

    const updatedJson = this.arr2.slice(1)

    console.log('updated json', updatedJson);

    let length = updatedJson.length -1;
    console.log('updated json length', length);


    var keepGoing = true;
    updatedJson.forEach((objjq, index) =>{
      console.log('index', index)
      if(keepGoing){
        if(objjq.sku == undefined){
          keepGoing = false;
          confirm('SKU is missing in line '+ (index+1) + ', fix and reupload')
          this.reloadComponent()
        }else{
          console.log('ind len', index, length)
          if(index == length){

            this.http.post(`${this.serverURL}/quote/uploadBulkProducts/bulk`, {products: updatedJson}).subscribe(Response => console.log(Response))
          this.reloadComponent()
          }
        }
      }

    })

  }
}


createOrUpdate(value){

this.createOrUpdatevalue = value
alert(value)
console.log('value', value)
this.cd.markForCheck();


}


reloadComponent() {
  console.log('I m from reaload comp')

  let currentUrl = this.router.url;
  this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  this.router.onSameUrlNavigation = 'reload';
  this.router.navigate([currentUrl]);
}

}
