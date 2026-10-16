import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StatisticService } from '../services/statistic-service'
import { TaskService } from '../services/task-service'
 
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

  //methods
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

  getCompletedTaskCount() : number{
    return this.taskService.getTasks().filter(task => task.status === 'Completed').length;
  }

  getPendingTaskCount() : number{
    return this.taskService.getTasks().filter(task => task.status === 'Pending').length;
  }

  getOverdueTaskCount() : number{
   return this.taskService.getTasks().filter(task => task.duedate < new Date() && task.status !== 'Completed').length;
  }

  getCompletionRate() : number {
    if(this.getCompletedTaskCount() === 0) return 0;
    return Math.round((this.getCompletedTaskCount() / this.taskService.getTasks().length) * 100);
  }

  getProductivityrate() : string {
    const rate = this.getCompletionRate();
    if(rate >= 80) return 'Excellent';
    else if(rate >= 60) return 'Good';
    else if(rate >= 40) return 'Average';
    else return 'Poor';
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
    this.isInvalidDuedate = !duedate;
  }

  getTask() : Task[] {
    return this.taskService.getTasks();
  }

  addTask() : void{
    if(!this.newTask.title || !this.newTask.category || !this.newTask.duedate ){
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
