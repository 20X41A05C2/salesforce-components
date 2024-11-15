import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';
import { createRecord } from 'lightning/uiRecordApi';

import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import Account_Name from '@salesforce/schema/Account.Name';
import Account_Phone from '@salesforce/schema/Account.Phone';


export default class CreateAccountRecordwithJs extends NavigationMixin(LightningElement) {

    @track Account_Name = '';
    @track Account_Phone = '';

    handleAccountName(event) {
        this.Account_Name = event.target.value;
        console.log('Account Name is ' + this.Account_Name);
    }
    handleAccountPhone(event) {
        this.Account_Phone = event.target.value;
        console.log('Account Phone is ' + this.Account_Phone);
}

    createAccount() {
        const fields = {};
        fields[Account_Name.fieldApiName] = this.Account_Name;
        fields[Account_Phone.fieldApiName] = this.Account_Phone;

        const recordInput = { apiName: ACCOUNT_OBJECT.objectApiName, fields };
        createRecord(recordInput)
            .then(account => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title:'Account Created',
                        message: 'Account has been created',
                        variant:'success',
                    }),
                );
                this[NavigationMixin.Navigate]({
                    type: 'standard__recordPage',
                    attributes: {
                        recordId: account.id,
                        objectApiName: 'Account',
                        actionName: 'view'
                    },
                });


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