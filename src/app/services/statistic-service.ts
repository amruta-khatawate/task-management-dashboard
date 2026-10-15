import { inject, Injectable } from '@angular/core';
import { Task } from '../task-manager-board/task-manager-board';
import { TaskService } from '../services/task-service';

@Injectable({
  providedIn: 'root',
})
export class StatisticService {

  private taskService : TaskService = inject(TaskService);
    // filter controls
  filterStatus : string ='All';
  filterCategory: string ='All';
  filterPriority : string = 'All';
  showCompleted : boolean = true;


  getFilteredTasks() : Task[]{
  let filtered = [...this.taskService.getTasks()];

    if(this.filterStatus !== 'All'){
      filtered = filtered.filter(task => task.status === this.filterStatus);
    }

    if(this.filterCategory !== 'All'){
      filtered = filtered.filter(task => task.category === this.filterCategory);
    }

    if(this.filterPriority !== 'All'){
      filtered = filtered.filter(task => task.priority === this.filterPriority);
    }

    if(!this.showCompleted){
      filtered = filtered.filter(task => task.status !== 'Completed');
    }
    // console.log(filtered);
    return filtered;
  }
}
