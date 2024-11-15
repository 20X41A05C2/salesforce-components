import { LightningElement,track,wire } from 'lwc';
import searchAccount from '@salesforce/apex/searchComponent.searchAccount'

export default class AccountsSearchComponent extends LightningElement {
    @track accountName='';
    @track accountList=[];

    columns=[
        {Label:'Account Name',fieldName:'Name'},
        {Label:'Account Phone',fieldName:'Phone'},
        {Label:'Account Type',fieldName:'Type'}
    ];

    
    @wire(searchAccount,{searchKey : '$accountName'})

    getAccounts({error,data}){
        if(data){
            this.accountList=data;
        }else if(error){
            this.accountList=error;
        }
    }

    handleSearchKey(event){
        this.accountName=event.target.value;
    }

}