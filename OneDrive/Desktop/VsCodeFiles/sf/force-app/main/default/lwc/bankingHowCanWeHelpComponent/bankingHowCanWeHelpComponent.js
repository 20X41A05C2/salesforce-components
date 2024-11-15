import { LightningElement } from 'lwc';

export default class BankingHowCanWeHelpComponent extends LightningElement {
    handleReadMore(event) {
        // Get the identifier from the data-id attribute
        const buttonId = event.target.getAttribute('data-id');
        
        // Define the URLs for each button
        const urlMap = {
            bigData: 'https://sprintpark6-dev-ed.develop.my.site.com/SprintPark/s/big-data',
            cybersecurity: 'https://sprintpark6-dev-ed.develop.my.site.com/SprintPark/s/cybersecurity',
            salesforce: 'https://sprintpark6-dev-ed.develop.my.site.com/SprintPark/s/salesforce',
            ai: 'https://sprintpark6-dev-ed.develop.my.site.com/SprintPark/s/ai-automation',
            projectManagement: 'https://sprintpark6-dev-ed.develop.my.site.com/SprintPark/s/project-management'

        };
        
        // Get the corresponding URL based on the button identifier
        const url = urlMap[buttonId];
        
        // Check if URL is available
        if (url) {
            // Navigate to the specified URL
            window.open(url, '_self'); // '_self' opens the link in the same tab
        }
    }
}