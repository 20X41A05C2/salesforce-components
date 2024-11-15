import { LightningElement,track } from 'lwc';

export default class CaluculatorExample extends LightningElement {
firstNumber;
secondNumber;
@track addResult;
@track subResult;


handleChanges(event) {
    if(event.target.name=='fnumber'){
        
        this.firstNumber = event.target.value;
    }
    if(event.target.name=='snumber'){
        
        this.secondNumber = event.target.value;
    }
}
handleAddClick(){
    console.log('first number:'+ this.firstNumber);
    console.log('Second number:'+ this.secondNumber);
    this.addResult = parseInt(this.firstNumber) + parseInt(this.secondNumber);
    console.log('Result: '+ this.addResult);

}

handleSubClick(){
    console.log('first number:'+ this.firstNumber);
    console.log('Second number:'+ this.secondNumber);
    this.subResult = parseInt(this.firstNumber) - parseInt(this.secondNumber);
    console.log('Result: '+ this.subResult);


}
}