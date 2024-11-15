import { LightningElement,api,track ,wire} from 'lwc';
import accContactRecords from '@salesforce/apex/AccountRelatedContacts.accContactRecords';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class GetAccountRelatedContacts extends LightningElement {
    @api recordId;

    @track contactsData;
    @track columns =[{label:'Name',fieldName:'Name'},
        {label:'Email',fieldName:'Email'},
        {label:'Phone',fieldName:'Phone'}];
        
        @wire(accContactRecords, {accId : '$recordId'}) contactRecords({data,error}){
            console.log(this.recordId);
            if(data){
                console.log(JSON.stringify(data));
                this.contactsData=data;
               
            }
            if(error){
                console.log(JSON.stringify(error));
                this.contactsData=error;
            }
        };
               
        
}