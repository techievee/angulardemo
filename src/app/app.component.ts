import { Component,OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { User } from './user';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  title = 'Servian Demo';
  users: User[];

   userForm: FormGroup;


   constructor(private fb: FormBuilder,private apiService: ApiService) {
         this.createForm();
       }

  ngOnInit() {
    this.getUser();
  }

  getUser(): void {
    this.apiService.getUser()
    .subscribe(users => this.users = users);
  }

  adduser(): void {
      //name = name.trim();
      const formData = new FormData();
      formData.append('first_name', this.userForm.get('first_name').value);
      formData.append('last_name', this.userForm.get('last_name').value);
      formData.append('email', this.userForm.get('email').value);
      formData.append('mobile_id', this.userForm.get('mobile_id').value);

      var object = {};
      formData.forEach((value, key) => {object[key] = value});
      var json = JSON.stringify(object);



      this.apiService.addUser(json)
        .subscribe(user => {
         console.log("Success")
         this.getUser()
        });
        this.getUser()
    }

  createForm() {
    this.userForm = this.fb.group({
                  first_name: ['', Validators.required ],
                  last_name: ['', Validators.required ],
                  email: ['', Validators.compose([
                              		Validators.required,
                              		Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
                              	])],
                  mobile_id: ['',Validators.compose([
                                             Validators.required,
                                             Validators.pattern('^[0-9]{9}')
                            	])],
               });
    }
}


