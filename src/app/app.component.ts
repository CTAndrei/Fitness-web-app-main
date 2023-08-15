import { Component, OnInit } from '@angular/core';
import { User } from './shared-module/interfaces/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  ngOnInit(): void {
    const createUsers: User[] = [{name: 'Alex', password: 'alex234'}, {name: 'Valentin', password: 'valentin'}, {name: 'Teodora', password: 'teodora'}, {name: 'Miruna', password: 'miruna'}, {name: 'Andrei', password: 'andrei'}, {name: 'Stefan', password: 'stefan'}, {name: 'Adrian', password: 'adrian'}];  
    
    if(JSON.parse(localStorage.getItem('users')!) == null){   
        localStorage.setItem('users', JSON.stringify(createUsers));
    }
    
  }

}
