import { inject, Injectable } from '@angular/core';
import { Task } from '../task-manager-board/task-manager-board';
import { TaskService } from '../services/task-service';

@Injectable({
  providedIn: 'root',
})
export class StatisticService {

  private taskService : TaskService = inject(TaskService);
    // filter controls
  private filterStatus : string ='All';
  private filterCategory: string ='All';
  private filterPriority : string = 'All';
  private showCompleted : boolean = true;

  getStatusFilter() : string
  {
    return this.filterStatus;
  }

  setStatusFilter(status: string) : void
  {
    this.filterStatus = status;
  }

  getCategoryFilter() : string
  {
    return this.filterCategory;
  }

  setCategoryFilter(category : string) : void
  {
    this.filterCategory = category;
  }

  getPriorityFilter() : string
  {
    return this.filterPriority;
  }

  setPriorityFilter(priority: string) : void
  {
    this.filterPriority =priority;
  }

  getCompletedFilter() : boolean
  {
    return this.showCompleted;
  }

  setCompletedFilter(val : boolean) : void
  {
    this.showCompleted = val;
  }

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


  resetFilters(){
    this.filterStatus  ='All';
    this.filterCategory ='All';
    this.filterPriority  = 'All';
    this.showCompleted  = true;
  }
}
