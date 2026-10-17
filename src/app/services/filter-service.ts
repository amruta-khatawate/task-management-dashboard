import { inject, Injectable } from '@angular/core';
import { TaskService } from './task-service';
import { retry } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterService {

  private taskService : TaskService = inject(TaskService);

  completedTaskCount() : number{
    return this.taskService.getTasks().filter(task => task.status === 'Completed').length;
  }

  pendingTaskCount() : number{
    return this.taskService.getTasks().filter(task => task.status === 'Pending').length;
  }

  overdueTaskCount() : number{
    return this.taskService.getTasks().filter(task => task.duedate < new Date() && task.status !== 'Completed' ).length
  }

  completionRate() :number{
    if(this.taskService.getTasks().length === 0) return 0;
    return Math.round((this.completedTaskCount() / this.taskService.getTasks().length) *100);
  }

  productivityRate() : string{
    const rate = this.completionRate();
    if(rate >= 80) return 'Excellent';
    else if(rate >= 60) return 'Good'
    else if(rate >= 40) return 'Average';
    else return 'Poor';
  }
}
