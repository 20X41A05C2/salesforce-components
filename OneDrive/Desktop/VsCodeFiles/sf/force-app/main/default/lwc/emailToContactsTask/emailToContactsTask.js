import { LightningElement, track, wire } from 'lwc';
import getEmailTemplatesByFolder from '@salesforce/apex/EmailControllerClass.getEmailTemplatesByFolder';
import getContacts from '@salesforce/apex/EmailControllerClass.getContacts';
import sendEmail from '@salesforce/apex/EmailControllerClass.sendEmail';

const columns = [
    { label: 'Contact Name', fieldName: 'Name' },
    { label: 'Account Name', fieldName: 'AccountName', type: 'text' },
    { label: 'Email', fieldName: 'Email', type: 'email' }
];

export default class EmailToContactsTask extends LightningElement {
    @track emailTemplates = [];
    @track contacts = [];
    @track selectedContacts = [];
    @track error;
    @track isScreen1 = true;
    @track isScreen2 = false;
    @track isScreen3 = false;
    @track emailPreview = '';
    @track selectedTemplateId; // Track selected template ID
    get isNextButtonDisabled() { // Disable button if no template is selected
        return !this.selectedTemplateId;
    }

    columns = columns;

    @wire(getEmailTemplatesByFolder)
    wiredTemplates({ data, error }) {
        if (data) {
            this.emailTemplates = data.map(template => ({
                label: template.Name,
                value: template.Id
            }));
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.emailTemplates = [];
        }
    }

    @wire(getContacts)
    wiredContacts({ data, error }) {
        if (data) {
            this.contacts = data.map(contact => ({
                ...contact,
                AccountName: contact.Account?.Name
            }));
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.contacts = undefined;
        }
    }

    // Handle navigation to the second screen
    showScreen2() {
        this.isScreen1 = false;
        this.isScreen2 = true;
    }

    // Handle selection of an email template
    handleTemplateChange(event) {
        this.selectedTemplateId = event.detail.value; // Store the selected template ID
        console.log('Selected Email Template ID:', this.selectedTemplateId);
    }

    // Handle row selection in the contacts table
    getSelectedContacts(event) {
        const selectedRows = event.detail.selectedRows;
        this.selectedContacts = selectedRows;
    }

    // Handle navigation to the third screen
    goToEmailScreen() {
        this.isScreen2 = false;
        this.isScreen3 = true;
        this.generateEmailPreview();
    }

    // Generate email preview using the selected email template
    generateEmailPreview() {
        const selectedEmailTemplate = this.emailTemplates.find(template => template.value === this.selectedTemplateId);
        this.emailPreview = selectedEmailTemplate ? `Subject: ${selectedEmailTemplate.label}\n\nPreview: This is a preview of your email.` : '';
    }

    // Send email to the selected contacts
    sendEmail() {
        const contactIds = this.selectedContacts.map(contact => contact.Id);
        sendEmail({ contactIds, emailTemplateId: this.selectedTemplateId })
            .then(() => {
                this.showToast('Success', 'Emails sent successfully!', 'success');
                this.isScreen3 = false; // Optionally go back to screen 1 or 2
            })
            .catch(error => {
                this.error = error;
                this.showToast('Error', 'There was an error sending emails.', 'error');
            });
    }

    // Utility function for showing toast messages
    showToast(title, message, variant) {
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(evt);
    }
}