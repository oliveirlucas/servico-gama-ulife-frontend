import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientService } from '../services/http/http-client.service';

import {Subject} from 'rxjs'; 

@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.css']
})
export class GradeComponent implements OnInit {

  evaluations: any = [];
  selected: string = "Notas";
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};
  loadding: boolean = true;

  constructor(private httpService: HttpClientService) { }

  ngOnInit(): void {   
    this.callApi();
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  callApi() {
    this.httpService.get<any[]>("User/UserEvaluations/")
      .subscribe({
        error: (e) => { },
        next: (e) => { 
          this.evaluations = e; 
          this.dtTrigger.next(e);
          this.loadding = false;
        }
      }
      ); 
  } 
} 