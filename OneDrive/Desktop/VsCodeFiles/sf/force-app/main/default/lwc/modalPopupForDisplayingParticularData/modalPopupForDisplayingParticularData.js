import { LightningElement, track, wire } from 'lwc';
import getHospitalData from '@salesforce/apex/HospitalDataControllerClass.getHospitalData';
import getDoctorsByHospital from '@salesforce/apex/HospitalDataControllerClass.getDoctorsByHospital';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ModalPopupForDisplayingParticularData extends LightningElement {
    @track hospitalData;
    @track doctorData;
    @track showHospitalTable = true;
    @track showModal = false; 
    @track selectedHospitalId;
    @track selectedHospitalName;
    @track startDate;
    @track endDate;

    @track hospitalColumns = [
        { label: 'HospitalId', fieldName: 'Id', type: 'button', typeAttributes: { label: { fieldName: 'Id' }, name: 'viewDoctors', variant: 'base' } },
        { label: 'Hospital Name', fieldName: 'Name' },
        { label: 'Country', fieldName: 'Country__c' },
        { label: 'Email', fieldName: 'Email_Address__c' },
        { label: 'Contact Number', fieldName: 'Contact_Number__c' }
    ];

    @track doctorColumns = [
        { label: 'Doctor Name', fieldName: 'Name' },
        { label: 'Speciality', fieldName: 'Medical_Specialities__c' },
        { label: 'Availability', fieldName: 'Availability__c' },
        { label: 'Email', fieldName: 'Prescriber_Mail_ID__c' }
    ];

    @wire(getHospitalData)
    wiredHospitals({ data, error }) {
        if (data) {
            this.hospitalData = data;
        } else if (error) {
            this.showToast('Error', error.body.message, 'error');
        }
    }

    handleHospitalRowAction(event) {
        const hospitalId = event.detail.row.Id;
        this.selectedHospitalName = event.detail.row.Name;
        this.selectedHospitalId = hospitalId;

        this.fetchDoctors();
    }

    fetchDoctors() {
        getDoctorsByHospital({
            hospitalId: this.selectedHospitalId,
            startDate: this.startDate,
            endDate: this.endDate
        })
        .then(result => {
            this.doctorData = result;
            this.showModal = true; 
        })
        .catch(error => {
            this.showToast('Error', error.body.message, 'error');
        });
    }

    handleStartDateChange(event) {
        this.startDate = event.target.value;
        this.fetchDoctors(); 
    }

    handleEndDateChange(event) {
        this.endDate = event.target.value;
        this.fetchDoctors(); 
    }

    handleCloseModal() {
        this.showModal = false; 
    }

    downloadCsv() {
        let csv = this.generateCSV(this.doctorData);
        let hiddenElement = document.createElement('a');
        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
        hiddenElement.target = '_self';
        hiddenElement.download = 'DoctorsData.csv';
        document.body.appendChild(hiddenElement);
        hiddenElement.click();
        document.body.removeChild(hiddenElement);
    }

    generateCSV(data) {
        const keys = this.doctorColumns.map(col => col.fieldName);
        let csvString = keys.join(',') + '\n';

        data.forEach(row => {
            let values = keys.map(key => row[key] ? row[key] : '');
            csvString += values.join(',') + '\n';
        });

        return csvString;
    }

    showToast(title, message, type) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: type
        });
        this.dispatchEvent(event);
    }
    
}