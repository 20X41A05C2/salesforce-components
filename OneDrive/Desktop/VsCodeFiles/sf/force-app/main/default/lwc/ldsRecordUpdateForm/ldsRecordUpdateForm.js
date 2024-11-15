import { LightningElement,api } from 'lwc';
import AccountName from '@salesforce/schema/Account.Name';
import AccountType from '@salesforce/schema/Account.Type';
import AccountPhone from '@salesforce/schema/Account.Phone';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class LdsRecordUpdateForm extends LightningElement {
    @api objectApiName;
    
    @api recordId;
    fields=[AccountName,AccountType,AccountPhone];
   
handleAccountUpdate(event){
    const evt= new ShowToastEvent({
        title:'Account updated',
        message: 'Account has been updated',
        variant:'success',
    });
    this.dispatchEvent(evt);
    
}
}