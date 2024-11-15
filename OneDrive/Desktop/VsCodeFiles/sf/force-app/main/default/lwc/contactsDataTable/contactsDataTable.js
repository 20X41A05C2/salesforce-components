import { LightningElement, wire } from 'lwc';
import getContacts from '@salesforce/apex/contactsController.getContacts';

const columns = [
    {
        label: 'Account Name',
        fieldName: 'AccountName',
        type: 'text',
        cellAttributes: {
            style: { fieldName: 'rowStyle' }  // Apply style inline
        }
    },
    {
        label: 'Contact Name',
        fieldName: 'Name',
        type: 'text',
        cellAttributes: {
            style: { fieldName: 'rowStyle' }  // Apply style inline
        }
    },
    {
        label: 'Email',
        fieldName: 'Email',
        type: 'email',
        cellAttributes: {
            style: { fieldName: 'rowStyle' }  // Apply style inline
        }
    }
];

export default class ContactsDataTable extends LightningElement {
    columns = columns;
    contacts;
    error;
    selectedRows = [];

    @wire(getContacts)
    wiredContacts({ error, data }) {
        if (data) {
            this.contacts = data.map((contact, index) => ({
                ...contact,
                AccountName: contact.Account?.Name,
                // Add alternating row colors: light blue for even, light green for odd
                rowStyle: index % 2 === 0 
                    ? 'background-color: #ffffff;'  
                    : 'background-color: #89cff0;'  
            }));
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.contacts = undefined;
        }
    }

    handleRowSelection(event) {
        this.selectedRows = event.detail.selectedRows;
        console.log(this.selectedRows);
    }
}