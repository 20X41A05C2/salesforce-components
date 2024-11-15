import { LightningElement, track,api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { createRecord, updateRecord } from 'lightning/uiRecordApi';

import Contact_object from '@salesforce/schema/Contact';
import Contact_FirstName from '@salesforce/schema/Contact.LastName';
import Contact_Phone from '@salesforce/schema/Contact.Phone';
export default class UpdateContactRecordUsingJs extends LightningElement {
    @api recordId;
    @track contact_FirstName = '';
    @track contact_Phone = '';

    handleContactFirstName(event) {
        this.contact_FirstName = event.target.value;
        console.log(this.contact_FirstName);
    }
    handleContactPhone(event) {
        this.contact_Phone = event.target.value;
        console.log(this.contact_Phone);
    }

    updateContact() {
        const fields = {};
        fields['Id']=this.recordId;
        fields[Contact_FirstName.fieldApiName] = this.contact_FirstName;
        fields[Contact_Phone.fieldApiName] = this.contact_Phone;

        const recordInput = { fields };
         updateRecord(recordInput)
        .then(account => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title:'Account Updated',
                    message: 'Account has been Updated',
                    variant:'success',
                }),
            );


        })


            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        Title: 'Error',
                        Message: 'Error',
                        variant: 'error',
                    }),
                );
            });
           
    }
 }