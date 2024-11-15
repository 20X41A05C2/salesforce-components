import { LightningElement,track,wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import {NavigationMixin} from 'lightning/navigation';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';

import Account_Name from '@salesforce/schema/Account.Name';
import Account_Phone from '@salesforce/schema/Account.Phone';
import Account_Type from '@salesforce/schema/Account.Type';
import createAccount from '@salesforce/apex/AccountControllerClass.createAccount'


export default class CreateAccountWithApexClass extends NavigationMixin(LightningElement) {
    @track accountId;
    @track accountTypes =[];
    @track accountRecord = {

        Name: Account_Name,
        Phone: Account_Phone,
        Type: Account_Type
    };

    @wire (getPicklistValues, {
        recordTypeId: '012000000000000AAA',
        fieldApiName: Account_Type
    })
    picklistResults({error, data}){
        if(data){
            this.accountTypes = data.values;
            this.error=undefined;
        } else if (error) {
            this.error = error;
            this.accountTypes = undefined;
          }
    }


    handleNameChange(event){

        this.accountRecord.Name = event.target.value;
        console.log(this.accountRecord.Name);
    }

    handlePhoneChange(event){
        this.accountRecord.Phone = event.target.value;
        console.log(this.accountRecord.Phone);
    }

    handleTypeChange(event){
        this.accountRecord.Type = event.target.value;
        console.log(this.accountRecord.Type);
    }

    handleCreateAccount(){
        
        createAccount({acc :this.accountRecord})
        .then(result =>{
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Account Created',
                    message: 'Account has been created',
                    variant: 'success',
                }),
            );

            this[NavigationMixin.Navigate]({
                type: 'standard__recordPage',
                attributes: {
                    recordId: result.Id,
                    objectApiName: 'Account',
                    actionName: 'view',
                },
            });
        })
        .catch(error =>{
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: error.body.message,
                    variant: 'error',
                }),
            );
        });
        
    }
    
}