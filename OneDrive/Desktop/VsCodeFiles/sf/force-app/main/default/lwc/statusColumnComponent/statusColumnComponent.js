import { LightningElement } from 'lwc';

export default class StatusColumnComponent extends LightningElement {
    data = [
        { id: '1', name: 'John Doe', status: 'Active' },
        { id: '2', name: 'Jane Smith', status: 'Inactive' },
        { id: '3', name: 'Sam Johnson', status: 'Active' }
    ];

    originalData = [...this.data]; // Store original data to reset filters

    columns = [
        { label: 'Name', fieldName: 'name' },
        {
            label: 'Status',
            fieldName: 'status',
            type: 'text',
            actions: [
                { label: 'All', name: 'all' },
                { label: 'Active', name: 'active' },
                { label: 'Inactive', name: 'inactive' }
            ]
        }
    ];

    handleHeaderAction(event) {
        const actionName = event.detail.action.name;

        // Filtering logic based on the action selected
        switch (actionName) {
            case 'active':
                this.data = this.originalData.filter(record => record.status === 'Active');
                break;
            case 'inactive':
                this.data = this.originalData.filter(record => record.status === 'Inactive');
                break;
            case 'all':
                this.data = [...this.originalData];
                break;
        }
    }
}