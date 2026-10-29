import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Task } from '../task-manager-board/task-manager-board';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskApiService {
  private http : HttpClient = inject(HttpClient);
  private URL : string = "http://localhost:8095/task";

  getAllTasks() : Observable<Task[]> {
    return this.http.get<Task[]>(`${this.URL}/tasks`);
  }
  
}
