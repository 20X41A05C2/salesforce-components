import { LightningElement, track ,wire} from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import 	RegistrationSuccessful from '@salesforce/resourceUrl/RegistrationSuccessful';
import getRecordTypes from  '@salesforce/apex/MultipleScreenRecordCreationExampleClass.getRecordTypes';
import createPrescriberInstitution from '@salesforce/apex/MultipleScreenRecordCreationExampleClass.createPrescriberInstitution';
import createPrescriber from '@salesforce/apex/MultipleScreenRecordCreationExampleClass.createPrescriber';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import gender from '@salesforce/schema/Prescriber__c.Gender__c';
import medicalSpecialities from '@salesforce/schema/Prescriber__c.Medical_Specialities__c';
import availability from '@salesforce/schema/Prescriber__c.Availability__c';


export default class MultipleScreensTask extends LightningElement {
    @track firstScreen = true;
    @track secondScreen = false;
    @track thirdScreen=false;
    @track fourthScreen = false;
    success_img=RegistrationSuccessful;


    @track recordTypeOptions = [];
    @track selectedRecordTypeId ;

    @track institutionName='';
    @track institutionPhone='';
    @track institutionEmail='';
    @track institutionCountry='';
    @track createdInstitutionId;

    @track prescriberName='';
    @track prescriberMail='';
    @track salary;
    @track experience;
     @track genderoptions=[];
     @track prescriberGender='';
    @track medicalSpecialityOptions=[];
    @track prescriberMedicalSpeciality='';
    @track availabilityOptions=[];
    @track prescriberAvailability='';
   
    @track createdPrescriberId;

    @wire(getRecordTypes)
    wiredRecordTypes({error,data}){
        if(data){
            this.recordTypeOptions = data;
        }else if(error){
            this.recordTypeOptions = error;
        }
    }

    handleRecordTypeChange(event){
        this.selectedRecordTypeId = event.target.value;
    }
    handleFirstScreenNext(event){
       
            this.firstScreen = false;
            this.secondScreen = true;
            this.thirdScreen=false;
            this. fourthScreen = false;
       
        
    }

    handlePiNameChange(event){
        this.institutionName = event.target.value;
    }
    handlePiPhoneChange(event){
        this.institutionPhone = event.target.value;
    }
    handlePiEmailChange(event){
        this.institutionEmail = event.target.value;
    }
    handlePiInstitutionCountryChange(event){
        this.institutionCountry = event.target.value;
    }


    handleSecondScreenPrevious(event){
        this.firstScreen = true;
        this.secondScreen = false;
        this.thirdScreen=false;
        this. fourthScreen = false;

    }

    handleSecondScreenNext(){
       
        this.firstScreen = false;
        this.secondScreen = false;
        this.thirdScreen=true;
        this. fourthScreen = false;
        this.handlePiCreate();
    
    }   

    handlePiCreate(){
        createPrescriberInstitution({Name: this.institutionName, recordTypeId: this.selectedRecordTypeId,phone:this.institutionPhone,email:this.institutionEmail,country:this.institutionCountry})
        .then(result => {
        this.createdInstitutionId = result;
        this.showToast('Success', 'Prescriber Institution Created Successfully', 'success');
        })
        .catch(error => {
         this.error = error;
         this.showToast('Error', 'Error in creating Prescriber Institution', 'error');
        });
    }
    

    handleThirdScreenPrevious(event){
        this.firstScreen = false;
        this.secondScreen = true;
        this.thirdScreen=false;
        this. fourthScreen = false;

    }
    // Prescriber Data
    handlePrescriberNameChange(event){
        console.log('Name::'+this.prescriberName);
        this.prescriberName = event.target.value;
    }
    handlePrescriberEmailChange(event){
        this.prescriberMail = event.target.value;
    }
    handlePrescriberSalaryChange(event){
        this.salary = event.target.value;
    }
    handlePrescriberExperienceChange(event){
        this.experience = event.target.value;
    }
    handlePrescriberGenderChange(event){
         this.prescriberGender = event.target.value;
     }
    handlePrescriberMedicalSpecialityChange(event){
        this.prescriberMedicalSpeciality = event.target.value;
    }
    handlePrescriberAvailabilityChange(event){
        this.prescriberAvailability = event.target.value;
    }
    

//PickList for Prescriber Gender 
    @wire (getPicklistValues, {
        recordTypeId: '012000000000000AAA',
        fieldApiName: gender
    })
    picklistResults1({error, data}){
        if(data){
            this.genderoptions = data.values;
            this.error=undefined;
            console.log(JSON.stringify(this.genderoptions.map(obj => ({label: obj.label, value: obj.value}))));
        } else if (error) {
            this.error = error;
            this.genderoptions = undefined;
          }
    }
// // PickList for Prescriber Medical Specialities
    @wire (getPicklistValues, {
        recordTypeId: '012000000000000AAA',
        fieldApiName: medicalSpecialities
    })
    picklistResults2({error, data}){
        if(data){
            this.medicalSpecialityOptions = data.values;
            this.error=undefined;
        } else if (error) {
            this.error = error;
            this.medicalSpecialityOptions = undefined;
          }
    }

    // PickList for Prescriber Availability 
    @wire (getPicklistValues, {
        recordTypeId: '012000000000000AAA',
        fieldApiName: availability
    })
    picklistResults3({error, data}){
        if(data){
            this.availabilityOptions = data.values;
            this.error=undefined;
        } else if (error) {
            this.error = error;
            this.availabilityOptions = undefined;
          }
    }
   


    handleFinish(){

        
        // createPrescriber({Name: this.prescriberName, createdInstitutionId: this.createdInstitutionId,prescriberGender:this.prescriberGender,prescriberMail:this.prescriberMail,experience:this.experience,salary:this.salary,prescriberMedicalSpeciality:this.prescriberMedicalSpeciality,prescriberAvailability:this.prescriberAvailability})
        createPrescriber({Name: this.prescriberName, createdInstitutionId: this.createdInstitutionId,prescriberGender:this.prescriberGender,prescriberMail:this.prescriberMail,experience:this.experience,salary:this.salary,prescriberMedicalSpeciality:this.prescriberMedicalSpeciality,prescriberAvailability:this.prescriberAvailability})
        .then(result => {
        this.firstScreen = false;
        this.secondScreen = false;
        this.thirdScreen=false;
        this.fourthScreen = true;
        console.log('result::'+result);
        this.createdPrescriberId = result;
        this.showToast('Success', 'Prescriber Created Successfully', 'success');
        })
        .catch(error => {
         console.log('Data::'+result);
         this.error = error;
         this.showToast('Error', 'Error in creating Prescriber', 'error');
        });
    }


    showToast(title,message, variant) {
        const toastEvent = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(toastEvent);
    }
    isValid(inputType){
        const inputs = this.template.querySelectorAll(inputType);
        let isValid = true;
        inputs.forEach(input => {
            if (input.reportValidity()){
                   isValid=false;
            }

        });
        return isValid;
    }

}