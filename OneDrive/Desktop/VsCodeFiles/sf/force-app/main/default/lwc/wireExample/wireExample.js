import { LightningElement, wire,track } from 'lwc';
import getAllAccounts from  '@salesforce/apex/wireExampleClass.getAllAccounts';
export default class WireExample extends LightningElement {
    @track accountsData;
    @track columns =[
        {label: 'Name',fieldName: 'Name',type: 'text'},
        
        {label: 'Phone',fieldName: 'Phone',type: 'phone'}
        
        
    ];
    @wire(getAllAccounts) accountRecords({data,error}){
        if(data){
            this.accountsData=data;
        }else if(error){

            this.accountsData=null;
        }
    }
}