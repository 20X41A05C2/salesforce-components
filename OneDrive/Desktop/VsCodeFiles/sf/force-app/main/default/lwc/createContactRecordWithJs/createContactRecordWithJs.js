import { LightningElement, track,api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';
import { createRecord } from 'lightning/uiRecordApi';

import Contact_object from '@salesforce/schema/Contact';
import Contact_FirstName from '@salesforce/schema/Contact.LastName';
import Contact_Phone from '@salesforce/schema/Contact.Phone';

export default class CreateContactRecordWithJs extends NavigationMixin (LightningElement) {
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

    createContact() {
        const fields = {};

        fields[Contact_FirstName.fieldApiName] = this.contact_FirstName;
        fields[Contact_Phone.fieldApiName] = this.contact_Phone;

        const recordInput = {
            apiName: Contact_object.objectApiName,
            fields
        };
        console.log(JSON.stringify(recordInput));
        createRecord(recordInput)
            
            .then(contact => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Contact Created',
                        message: 'Contact has been created',
                        variant: 'success',
                    }),
                );

                this[NavigationMixin.Navigate]({
                    type: 'standard__recordPage',
                    attributes: {
                        recordId: contact.id,
                        objectApiName: Contact_object.objectApiName,
                        actionName: 'view'
                    }

                });
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error',
                        message: 'Error',
                        variant: 'error',
                    }),
                );
            });
    
            }       

    
}