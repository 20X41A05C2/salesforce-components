import { LightningElement, track ,api} from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import { updateRecord } from 'lightning/uiRecordApi';

import Account_Name from '@salesforce/schema/Account.Name';
import Account_Phone from '@salesforce/schema/Account.Phone';

export default class UpdateRecordWithJs extends LightningElement {
    @track Account_Name = '';
    @track Account_Phone = '';
    @api recordId;

    handleAccountName(event) {
        this.Account_Name = event.target.value;
        console.log('Account Name is ' + this.Account_Name);
    }
    handleAccountPhone(event) {
        this.Account_Phone = event.target.value;
        console.log('Account Phone is ' + this.Account_Phone);
}

updateAccount() {
    const fields = {};
    fields['Id']=this.recordId;
    fields[Account_Name.fieldApiName] = this.Account_Name;
    fields[Account_Phone.fieldApiName] = this.Account_Phone;

    const recordInput = {  fields };
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