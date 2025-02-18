import { LightningElement, api, track, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import SprintparkLogo from '@salesforce/resourceUrl/SprintparkLogo';
import createExpenseReimbursementRequest from '@salesforce/apex/ERR_ApexClass.createExpenseReimbursementRequest';
import uploadFile from '@salesforce/apex/ERR_ApexClass.uploadFile';
import Thankyouimage from '@salesforce/resourceUrl/ThankYouImage';
import getExpenseTypeOptions from '@salesforce/apex/ERR_ApexClass.getExpenseTypeOptions';
import validateEmployeeEmail from '@salesforce/apex/ERR_ApexClass.validateEmployeeEmail';

export default class ERR_FORM extends LightningElement {
    @track email = '';
    @track expenseTypeOptions = [];
    @track expenseType = '';
    @track expenseDate;
    @track amount = '';
    @track description = ''; 
    @track selectedEmployee;
    supportingFiles = [];
    @track uploadedFiles = [];
    @track fileUploaded = false;
    @track fileName;
    @track firstScreen = true;
    @track thankYouScreen = false;
    error;
    thankyou = Thankyouimage;
    splogo = SprintparkLogo;
    @track createderrId='';
    @track isValid = true;

    handleEmailChange(event) {
        this.email = event.target.value;
    }

    handleExpenseTypes(event) {
        this.expenseType = event.target.value;
        console.log('Expense Type:', this.expenseType);
    }
    get computedClass() {
        return this.isValid ? '' : 'slds-has-error';
    }

    handleExpenseDateChange(event) {
        this.expenseDate = event.target.value;
        const today = new Date();
        const selected = new Date(this.expenseDate);

        // Resetting time for accurate date comparison
        today.setHours(0, 0, 0, 0);

        // Validate selected date
        this.isValid = selected <= today;
    }
    

    handleAmountChange(event) {
        this.amount = event.target.value;
    }

    handleDescriptionChange(event) {
        this.description = event.target.value;
    }

    //     handleFileUpload(event) {
    //         const uploadedFiles = event.detail.files;

   
    // if (uploadedFiles && uploadedFiles.length > 0) {
       
    //     this.supportingFiles = uploadedFiles.map(file => ({
    //         fileName: file.name,             
    //         fileData: file.documentId || '' 
    //     }));

    //     console.log('Uploaded Files:', this.supportingFiles);
    // }else {
       
    //     console.error('No files selected for upload.');
    //     this.showToast('Error', 'No files selected for upload', 'error');
    // }
    //     }

    handleFileChange(event) {
        const file = event.target.files[0];
        
        if (file) {
            this.fileName = file.name;  // Set the file name for display
            const reader = new FileReader();
            reader.onload = () => {
                this.fileData = reader.result.split(',')[1]; // Extract Base64 file content
                this.fileUploaded = true; // Set fileUploaded to true for visual indication
            };
            reader.readAsDataURL(file);

            // Show a success toast message with the file name
            this.showToast('Success', `File "${this.fileName}" uploaded successfully.`, 'success');
        } else {
            this.fileName = '';  // Reset if no file is uploaded
            this.fileData = null;  // Reset file data
            this.fileUploaded = false; // Reset fileUploaded to false
        }
    }
    

    handleSubmit() {
        console.log('Employee Name:', this.selectedEmployee);
        console.log('Expense Type:', this.expenseType);
        console.log('Expense Date:', this.expenseDate);
        console.log('Amount:', this.amount);
        console.log('Description:', this.description);

        validateEmployeeEmail({ email: this.email })
            .then((result) => {
                if (result) {
                    this.selectedEmployee = result;
                    // this.showToast('Success', 'Email validated successfully!', 'success');
                
                    createExpenseReimbursementRequest({ 
                        employeeId: this.selectedEmployee,
                        amount: this.amount,
                        description: this.description,
                        expenseType: this.expenseType,
                        expenseDate: this.expenseDate,
                        Email: this.email
                    })
                    .then(result => {
                        this.createderrId = result;
                        this.firstScreen = false;
                        this.thankYouScreen = true;
                        this.showToast('Success', 'Expense Request created successfully!', 'success');
                        if (this.fileData) {
                            uploadFile({ errId: this.createderrId, fileName: this.fileName, fileBody: this.fileData })
                                .then(() => {
                                    // this.showToast('Success', ' file uploaded successfully!', 'success');
                                    
                                })
                                .catch(error => {
                                    this.showToast('Error', 'Error uploading file: ' + error.body.message, 'error');
                                    
                                });
                        }

                        // Call Apex method to upload files, passing recordId, file names, and file data
                        // if (this.supportingFiles.length > 0) {
                        //     uploadFile({
                        //         recordId: this.createderrId, 
                        //         fileNames: this.supportingFiles.map(file => file.fileName),
                        //         fileData: this.supportingFiles.map(file => file.fileData)
                        //     })
                        //     .then(() => {
                               
                        //         this.showToast('Success', 'Files uploaded successfully', 'success');
                        //     })
                        //     .catch(error => {
                               
                        //         this.showToast('Error', 'Error in uploading files', 'error');
                        //         console.error('Error uploading file:', error);
                        //     });
                        // }
                        console.log('Record created successfully:', result);
                    })
                    .catch(error => {
                        this.error = error;
                        this.showToast('Error', 'Error in creating', 'error');
                        console.error('Error creating record:', error);
                    });
                } else {
                    this.showToast('Error', 'Invalid email address. Please enter a valid email.', 'error');
                    this.selectedEmployee = null;
                }
            })
            .catch((error) => {
                console.error('Error validating email:', error);
                this.showToast('Error', 'Error validating email. Please try again.', 'error');
            });
    }

    showToast(title, message, variant) {
        const toastEvent = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(toastEvent);
    }

    resetForm() {
        this.amount = '';
        this.description = '';
        this.expenseType = '';
        this.expenseDate = '';
        this.email = '';
        this.supportingFiles = [];
    }

    connectedCallback() {
        this.loadExpenseTypeOptions();
    }

    loadExpenseTypeOptions() {
        getExpenseTypeOptions()
            .then((data) => {
                this.expenseTypeOptions = data.map(option => ({
                    label: option.label,
                    value: option.value
                }));
                this.error = null;
            })
            .catch((error) => {
                console.error('Error loading expense type options:', error);
                this.error = 'Error loading expense type options. Please try again later.';
            });
    }
}