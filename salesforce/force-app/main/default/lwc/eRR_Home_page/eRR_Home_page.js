import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import ExpenseBanner  from '@salesforce/resourceUrl/ExpenseBanner';

export default class ERR_Home_page extends LightningElement {
    
    bannerImage = ExpenseBanner;
    navigateToLink() {
       
        window.location.href = 'https://sprintparkllc-a-dev-ed.develop.my.site.com/ERR/s/err-form';
    }
}