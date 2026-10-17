import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StatisticService } from '../services/statistic-service';
import { TaskService } from '../services/task-service';
import { FilterService } from '../services/filter-service';
 
export interface Task{
  id: any;
  title: string;
  category: string;
  priority: string;
  duedate: Date;
  description: string;
  status : string;
  createdAt : Date;
  // optional fields
  completedAt? : Date;  
}

@Component({
  selector: 'app-task-manager-board',
  imports: [FormsModule, CommonModule],
  templateUrl: './task-manager-board.html',
  styleUrl: './task-manager-board.css'
})

export class TaskManagerBoard {
  
  private taskService : TaskService = inject(TaskService);
  private statisticService : StatisticService = inject(StatisticService);  
  private filterService : FilterService = inject(FilterService);
  
  title : string = "Task manager";
  // lightmodeurl = '/light-mode-icon.jpg';
  // lightmodeurl = '/light-mode-icon-removebg.png|';
  // darkmodeurl = '/dark-mode-icon.png';

  isInvalidTitle: boolean | undefined;
  isInvalidCategory: boolean | undefined;
  isInvalidPriority: boolean | undefined;
  isInvalidDuedate: boolean | undefined;

  today = this.toDateInputValue(new Date());

  // Dropdown options

  categories : string[] = ['Work', 'Personal', 'Shopping', 'Health', 'Finance', 'Education', 'Other'];
  priorities : string[] = ['Low', 'Medium', 'High', 'Urgent'];
  statuses : string[] = ['Pending', 'In-Progress', 'Completed', 'Cancelled'];

  //form data
  newTask :{
    title : string,
    description : string,
    category: string,
    priority: string,
    duedate: string,
    status: string
  }={
    title : '',
    description : '',
    category: '',
    priority: 'Medium',
    duedate: '',
    status: 'Pending'
  };

  //getter and setter methods
  get filterStatus() : string{
    return this.statisticService.getStatusFilter();
  }

  set filterStatus(status: string) {
    this.statisticService.setStatusFilter(status);
  }

  get filterCategory() : string{
    return this.statisticService.getCategoryFilter();
  }

  set filterCategory(category: string) {
    this.statisticService.setCategoryFilter(category);
  }

  get filterPriority() : string{
    return this.statisticService.getPriorityFilter();
  }

  set filterPriority(priority: string) {
    this.statisticService.setPriorityFilter(priority);
  }

  get showCompleted() : boolean{
    return this.statisticService.getCompletedFilter();
  }

  set showCompleted(val: boolean) {
    this.statisticService.setCompletedFilter(val);
  }

  //Statistics count methods 
  getCompletedTaskCount() : number{
    return this.filterService.completedTaskCount();
  }

  getPendingTaskCount() : number{
    return this.filterService.pendingTaskCount();
  }

  getOverdueTaskCount() : number{
   return this.filterService.overdueTaskCount();
  }

  getCompletionRate() : number {
    return this.filterService.completionRate()
  }

  getProductivityrate() : string {
    return this.filterService.productivityRate();
  }

  validateTitle(title: any) : void{
    this.isInvalidTitle = true;
    if(title !== '' ) {
      this.isInvalidTitle = false;
    }
  }

  validateCategory(category: any) : void{
      this. isInvalidCategory = true;
    if(category !== ''){
      this.isInvalidCategory = false; 
    }
  }

  validatePriority(priority: any) : void{
    this.isInvalidPriority = true;
    if(priority !== '' ) {
      this.isInvalidPriority = false;
    }
  }


  private toDateInputValue(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  validateDate(duedate: string): void {
    this.isInvalidDuedate = true;
    
    if(duedate != '' && duedate > this.today){
      this.isInvalidDuedate = false;
    }

  }

  getTask() : Task[] {
    return this.taskService.getTasks();
  }

  addTask() : void{
    if(this.isInvalidTitle  || this.isInvalidCategory  || this.isInvalidDuedate){
      return;
    }

    const task: Task = {
      id: this.taskService.getTasks().length + 1, // Need to modify
      title: this.newTask.title,
      category: this.newTask.category,
      priority: this.newTask.priority,
      duedate: new Date(this.newTask.duedate),
      description: this.newTask.description,
      status: this.newTask.status,
      createdAt: new Date()
    };

    this.taskService.addTask(task);
    this.clearForm();
  
  }

  clearForm(){
    this.newTask ={
    title : '',
    description : '',
    category: '',
    priority: 'Medium',
    duedate: '',
    status: 'Pending'
  };
  }

  filteredTasks() : Task[]{
   return this.statisticService.getFilteredTasks();
  }

  isOverDue(task : Task) : boolean{
    return new Date(this.today) > task.duedate && task.status !== 'Completed';
  }

  deleteTask(taskId: number): void{
    this.taskService.deleteTask(taskId);
  }

  toggleCompletedTask(taskId: number): void{
    this.taskService.toggleCompletedtask(taskId);
  }

}
