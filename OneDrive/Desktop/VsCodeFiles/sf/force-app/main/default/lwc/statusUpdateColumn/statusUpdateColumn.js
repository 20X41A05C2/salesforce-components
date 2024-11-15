import { LightningElement } from 'lwc';

export default class StatusUpdateColumn extends LightningElement {
    data = [
        { id: '1', name: 'John Doe', status: 'Active' },
        { id: '2', name: 'Jane Smith', status: 'Inactive' },
        { id: '3', name: 'Sam Johnson', status: 'Active' }
    ];

    columns = [
        { label: 'Name', fieldName: 'name' },
        {
            label: 'Status',
            fieldName: 'status',
            type: 'text',
            typeAttributes: { alignment: 'left' },
            actions: [
                { label: 'Active', name: 'set_active' },
                { label: 'Inactive', name: 'set_inactive' }
            ],
            // Use the custom class for styling the header
            cellAttributes: {
                class: 'custom-status-header'
            }
        }
    ];

    handleHeaderAction(event) {
        const actionName = event.detail.action.name;

        // Update the status field values based on the action selected
        if (actionName === 'set_active') {
            this.data = this.data.map(record => {
                return { ...record, status: 'Active' };
            });
        } else if (actionName === 'set_inactive') {
            this.data = this.data.map(record => {
                return { ...record, status: 'Inactive' };
            });
        }
    }

    toggleDropdown() {
        // Handle dropdown toggle if needed
    }
}