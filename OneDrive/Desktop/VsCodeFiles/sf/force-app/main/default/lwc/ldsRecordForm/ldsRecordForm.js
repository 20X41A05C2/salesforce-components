import { LightningElement } from 'lwc';
import AccountName from '@salesforce/schema/Account.Name';
import AccountType from '@salesforce/schema/Account.Type';
import AccountPhone from '@salesforce/schema/Account.Phone';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import {NavigationMixin} from 'lightning/navigation';


export default class LdsRecordForm extends NavigationMixin(LightningElement) {
 objectApiName='Account';
 fields=[AccountName,AccountType,AccountPhone];

handleSubmit(event){
    const evt= new ShowToastEvent({
        title:'Account Created',
        message: 'Account has been created',
        variant:'success',
    });
    this.dispatchEvent(evt);
    this[NavigationMixin.Navigate]({
        type: 'standard__recordPage',
        attributes: {
            recordId: event.detail.id,
            objectApiName: event.detail.objectApiName,
            actionName: 'view',
        },
    });

};
    
    
}