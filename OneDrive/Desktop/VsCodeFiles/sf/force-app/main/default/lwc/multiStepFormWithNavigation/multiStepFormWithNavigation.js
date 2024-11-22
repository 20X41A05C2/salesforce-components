import { LightningElement, track, wire } from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import Rating from '@salesforce/schema/Account.Rating';
import Type from '@salesforce/schema/Account.Type';
import createAccount from '@salesforce/apex/multiStepFormWithNavigation.createAccount';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import createContacts from '@salesforce/apex/multiStepFormWithNavigation.createContacts';
import Thankyouimage from '@salesforce/resourceUrl/ThankYouImage';

export default class MultiStepFormWithNavigation extends LightningElement {
    @track firstScreen = true;
    @track secondScreen = false;
    @track thirdScreen = false;
    @track fourthscreen = false;

    @track accountName = '';
    @track accountPhone = '';
    @track Rating = '';
    @track Type = '';
    @track ratingOptions = [];
    @track typeOptions = [];
    @track createdAccountId;

    @track FirstName = '';
    @track LastName = '';
    @track contactPhone = '';
    @track contactEmail = '';
    thankyou = Thankyouimage;

    // Contact list, starting with one default contact
    @track contactList = [
        { id: 1, FirstName: '', LastName: '', Phone: '', Email: '' }
    ];

    // Handle Account Inputs
    handleAccountNameChange(event) {
        this.accountName = event.target.value;
    }

    handleAccountPhoneChange(event) {
        this.accountPhone = event.target.value;
    }

    handleRatingChange(event) {
        this.Rating = event.target.value;
    }

    handleTypeChange(event) {
        this.Type = event.target.value;
    }

    // Handle Contact Inputs
    handleContactFirstNameChange(event) {
        const id = event.target.dataset.id;
        this.updateContactField(id, 'FirstName', event.target.value);
    }

    handleContactLastNameChange(event) {
        const id = event.target.dataset.id;
        this.updateContactField(id, 'LastName', event.target.value);
    }

    handleContactPhoneChange(event) {
        const id = event.target.dataset.id;
        this.updateContactField(id, 'Phone', event.target.value);
    }

    handleContactEmailChange(event) {
        const id = event.target.dataset.id;
        this.updateContactField(id, 'Email', event.target.value);
    }

    // Update the specific contact field
    updateContactField(id, field, value) {
        this.contactList = this.contactList.map(contact => 
            contact.id === parseInt(id) 
                ? { ...contact, [field]: value }
                : contact
        );
    }

    // Add a new contact to the list
    handleAddContact() {
        const newContact = {
            id: this.contactList.length + 1, // Unique ID for the contact
            FirstName: '',
            LastName: '',
            Phone: '',
            Email: ''
        };
        this.contactList = [...this.contactList, newContact];
    }

    // Remove a contact from the list
    handleRemoveContact(event) {
        const contactId = parseInt(event.target.dataset.id);
        this.contactList = this.contactList.filter(contact => contact.id !== contactId);
    }

    // Validate form before proceeding
    isInputValid() {
        let isValid = true;
        const inputFields = this.template.querySelectorAll('lightning-input, lightning-combobox');
        
        inputFields.forEach(inputField => {
            if (!inputField.checkValidity()) {
                inputField.reportValidity();
                isValid = false;
            }
        });

        return isValid;
    }

    // Proceed to second screen after account info
    handleFirstScreenNext() {
        if (!this.isInputValid()) {
            return;
        }

        this.firstScreen = false;
        this.secondScreen = true;
    }

    // Go back to the first screen
    handleSecondScreenPrevious() {
        this.firstScreen = true;
        this.secondScreen = false;
    }

    // Proceed to third (preview) screen after contact info
    handleSecondScreenNext() {
        if (!this.isInputValid()) {
            return;
        }

        this.firstScreen = false;
        this.secondScreen = false;
        this.thirdScreen = true;
    }

    handleThirdScreenPrevious() {
        this.firstScreen = false;
        this.secondScreen = true;
        this.thirdScreen = false;
    }

    // Final Submit (create both account and contact records)
    handleFinalSubmit() {
        if (!this.isInputValid()) {
            return;
        }
        this.firstScreen = false;
        this.secondScreen = false;
        this.thirdScreen = false;
        this.fourthscreen = true;

        // Create the Account first
        createAccount({
            Name: this.accountName,
            phone: this.accountPhone,
            Rating: this.Rating,
            Type: this.Type
        }).then(result => {
            this.createdAccountId = result; // Get the Account Id after creation
            this.showToast('Success', 'Account Created Successfully', 'success');

            // Now, create the Contacts and link them to the created Account
            const contactsToCreate = this.contactList.map(contact => ({
                FirstName: contact.FirstName,
                LastName: contact.LastName,
                Phone: contact.Phone,
                Email: contact.Email,
                AccountId: this.createdAccountId
            }));

            // Create Contacts in Apex
            return createContacts({ contacts: contactsToCreate, createdAccountId: this.createdAccountId });
        }).then(() => {
            this.showToast('Success', 'Contacts Created Successfully', 'success');
        }).catch(error => {
            console.error('Error:', error);
            this.showToast('Error', error.body.message || 'Error in creating Account or Contacts', 'error');
        });
    }

    // Get contact labels dynamically
    get contactLabels() {
        return this.contactList.map((contact, index) => {
            return {
                ...contact,
                label: `Contact ${index + 1}`
            };
        });
    }

    // Reset the form after successful submission
    resetForm() {
        this.accountName = '';
        this.accountPhone = '';
        this.Rating = '';
        this.Type = '';
        this.firstName = '';
        this.lastName = '';
        this.contactPhone = '';
        this.contactEmail = '';
        this.contactList = [{
            id: 1, 
            FirstName: '', 
            LastName: '', 
            Phone: '', 
            Email: ''
        }];
        this.firstScreen = true;
        this.secondScreen = false;
        this.thirdScreen = false;
        this.fourthscreen = false;
    }

    // Picklist for Rating
    @wire(getPicklistValues, {
        recordTypeId: '012000000000000AAA',
        fieldApiName: Rating
    })
    picklistResults1({ error, data }) {
        if (data) {
            this.ratingOptions = data.values;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.ratingOptions = undefined;
        }
    }

    // Picklist for Type
    @wire(getPicklistValues, {
        recordTypeId: '012000000000000AAA',
        fieldApiName: Type
    })
    picklistResults2({ error, data }) {
        if (data) {
            this.typeOptions = data.values;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.typeOptions = undefined;
        }
    }

    // Show Toast Message
    showToast(title, message, variant) {
        const toastEvent = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(toastEvent);
    }
}
