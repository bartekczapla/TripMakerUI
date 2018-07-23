import { Component, OnInit, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Tasks} from './model/tasks-parameters'
import { Observable } from 'rxjs';
import 'rxjs/Rx';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
@Injectable()
export class TasksComponent implements OnInit {

  table: Tasks;
  array: string[]=["sasa","saassasc"];

  constructor(private http: HttpClient) { 
  this.table={
  result: ["aaa","bbb"]
}
  }

  ngOnInit() {
    // this.getTasks()
    // .subscribe((data: string[]) => {
    //    this.array=data;
  //}
 // );
}


getTasks(): Observable<string[]>
{
  return this.http.get<string[]>('http://localhost:21021/tasks/getall')
              .map(result=><string[]>result['result']);
}

}