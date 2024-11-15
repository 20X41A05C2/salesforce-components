import { LightningElement, track ,api} from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import createContact from '@salesforce/apex/contactControllerClass.createContact';


export default class CreateContactRecordWithApexClass extends LightningElement{
    @track firstName='';
    @track lastName='';
    @track email='';
    @track accountId;
    @api recordId;

    handleFirstNameChange(event) {
        this.firstName = event.target.value;
        console.log(this.firstName);
}

    handleLastNameChange(event) {
        this.lastName = event.target.value;
        console.log(this.lastName);
}
    
    handleEmailChange(event) {
        this.email = event.target.value;
        console.log(this.email);
}
handleCreateContact(){
    console.log(this.recordId);
    
    createContact({firstName: this.firstName, lastName: this.lastName, email: this.email, accountId: this.recordId})
    .then(result => {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Contact Created',
                message: 'Contact has been created',
                variant: 'success',
            }),
        );

        

    });

    
 }
}