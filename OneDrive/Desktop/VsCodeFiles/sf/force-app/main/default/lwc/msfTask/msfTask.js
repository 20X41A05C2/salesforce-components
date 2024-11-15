import { LightningElement,track,wire } from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import Rating from '@salesforce/schema/Account.Rating';
import Type from '@salesforce/schema/Account.Type';
import Name from '@salesforce/schema/Account.Name';
import createAccount from '@salesforce/apex/multiStepFormWithNavigation.createAccount';
export default class MsfTask extends LightningElement {
    @track firstScreen = true;
    @track secondScreen = false;
    @track thirdScreen = false;


    @track accountName='';
    @track accountPhone='';
    @track Rating='';
    @track Type='';
    @track ratingOptions=[];
    @track typeOptions=[];

    handleAccountNameChange(){
        this.accountName = event.target.value;
    }

    handleAccountPhoneChange(){
        this.accountPhone = event.target.value;
    }

    handleRatingChange(){
        this.Rating = event.target.value;
    }

    handleTypeChange(){
        this.Type = event.target.value;
    }

    handleFirstScreenNext(){
        createAccount({
            accountName: this.accountName,
            accountPhone: this.accountPhone,
            Rating: this.Rating,
            Type: this.Type
        }).then(result => {
            this.createdInstitutionId = result;
            this.showToast('Success', 'Account Created Successfully', 'success');
            })
            .catch(error => {
             this.error = error;
             this.showToast('Error', 'Error in creating Account', 'error');
            });
    }


    //picklist for rating field
    @wire (getPicklistValues, {
        recordTypeId: '012000000000000AAA',
        fieldApiName: Rating
    })
    picklistResults1({error, data}){
        if(data){
            this.ratingOptions = data.values;
            this.error=undefined;
        } else if (error) {
            this.error = error;
            this.ratingOptions = undefined;
          }
    }

    //picklist for Type field
    @wire (getPicklistValues, {
        recordTypeId: '012000000000000AAA',
        fieldApiName: Type
    })
    picklistResults2({error, data}){
        if(data){
            this.Type = data.values;
            this.error=undefined;
        } else if (error) {
            this.error = error;
            this.Type = undefined;
          }
    }

}