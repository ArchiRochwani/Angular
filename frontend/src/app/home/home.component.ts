import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user-service/user.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  li: any;
  datasource: any = [];
  datanw: any;
  new_data: any = [];
  user: any;
  //user:any;
  columndefs: any[] = ['Username', 'Email']
  //localStorage: any;
  constructor(private userService: UserService, private https: HttpClient) { }

  ngOnInit(): void {

  }
  // @ViewChild(MatPaginator) paginator:MatPaginator | undefined;
  

  // ngAfterViewInit() {
  //   this.user.paginator = this.paginator;
  // }


  data() {

    this.userService.main().then(x => { localStorage.setItem('users', JSON.stringify(x)); });

    console.log(localStorage.getItem('users'));
  }
  ngDoCheck() {
    this.user = localStorage.getItem('users');
    this.user=JSON.parse(this.user);
    console.log(this.user);
  }

}
function users(users: any): any {
  throw new Error('Function not implemented.');
}

