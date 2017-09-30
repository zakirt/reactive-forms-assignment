import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { ProjectFormValidatorsService } from './project-form-validators.service';
import { projectFormErrors } from './project-form-errors';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    projectForm: FormGroup;
    projectStatuses = ['Stable', 'Critical', 'Finished'];

    constructor(private projectFormValidatorsService: ProjectFormValidatorsService) {

    }

    ngOnInit() {
        this.projectForm = new FormGroup({
            'projectName': new FormControl(
                null, 
                Validators.required, 
                this.projectFormValidatorsService.validateProjectNameAsync
            ),
            'mail': new FormControl(null, [Validators.required, Validators.email]),
            'projectStatus': new FormControl('Stable')
        });       
    }

    onSubmit() {
        console.log(this.projectForm.value);
    }

    /**
     * Runs async test and returns result after 1500ms.
     * @param {FormControl} control - form control field
     * @returns {Promise<any>} resolved object with error parameter, or null
     */
    validateProjectName(control: FormControl): Promise<any> {
         let result = new Promise((resolve, reject) => {
             setTimeout(() => {
                 if (control.value && control.value.toLowerCase() === 'test') {
                     resolve({
                         'invalidProjectName': true
                     });
                 } else {
                     resolve(null);
                 }
             }, 1500);
         }); 
         
         return result;
    }

    getFieldError(fieldName: string): string {
        let field = this.projectForm.get(fieldName);

        if (field && field.errors) {
            let errors = Object.keys(field.errors);           
            return projectFormErrors[fieldName][errors[0]];
        }

        return '';
    }

    get projectNameError(): string {
        return this.getFieldError('projectName');
    }

    get mailError(): string {
        return this.getFieldError('mail');
    }
}
