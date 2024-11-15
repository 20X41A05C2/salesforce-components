import { LightningElement,track } from 'lwc';

export default class MultipleScreens extends LightningElement {
    @track firstScreen = true;
    @track secondScreen = false;
    @track thirdScreen = false;

    handleFirstScreenNext(){
        this.firstScreen = false;
        this.secondScreen = true;
        this.thirdScreen=false;
    }
    handleSecondScreenPrevious(){
        this.firstScreen = true;
        this.secondScreen = false;
        this.thirdScreen=false;
    }
    handleSecondScreenNext(){
        this.firstScreen = false;
        this.secondScreen = false;
        this.thirdScreen=true;
    }
    handleThirdScreenPrevious(){
        this.firstScreen = false;
        this.secondScreen = true;
        this.thirdScreen=false;
    }

    handleSubmit(){
        alert('Submitted');
    }
}