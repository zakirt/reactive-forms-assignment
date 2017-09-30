import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable()
export class ProjectFormValidatorsService {
    /**
     * Tests for valid project name.
     * @param {FormControl} control 
     * @returns {{invalidProjectName: boolean} | undefined} object 
     * with invalidProjectName set to true, or undefined if no error
     */
    validateProjectName(control: FormControl): { [s: string]: boolean } {
        if (control.value && control.value.toLowerCase() === 'test') {
            return {
                'invalidProjectName': true
            };
        }
    }

    /**
     * Runs async test and returns result after 1500ms.
     * @param {FormControl} control - form control field
     * @returns {Promise<any>} resolved object with error parameter, or null
     */
    validateProjectNameAsync(control: FormControl): Promise<any> {
        let result = new Promise((resolve, reject) => {
            setTimeout(() => {
                if (control.value && control.value.toLowerCase() === 'test') {
                    resolve({
                        'invalidProjectName': true
                    });
                } else {
                    resolve(null);
                }
            }, 2000);
        }); 
        
        return result;
   }
}
