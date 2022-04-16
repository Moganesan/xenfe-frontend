import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss']
})
export class CompanyProfileComponent implements OnInit {

  adminDetails: any
  editCheck: boolean

  constructor(
    private userService: UserService,
    private router: Router,

  ) { }

  ngOnInit(): void {

    this.userService.getAdminDetail().subscribe(data => {
      this.adminDetails = data,
      console.log('admin details', this.adminDetails)
    })

  }

  edit(){
    this.editCheck = true
    console.log('edit ' )

  }

  save(){
    console.log('save', this.adminDetails)
    this.userService.postAdminData(this.adminDetails).subscribe(data => {console.log('data', data),
  this.reloadComponent()
})
  }


  reloadComponent() {
    console.log('I m from reaload comp')

    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
    console.log('in reload')

  }


  cancel(){
    console.log('cancel ')
    this.reloadComponent()
  }

}
