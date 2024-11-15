import { LightningElement ,api } from 'lwc';

export default class ApiParentComponent extends LightningElement {
    @api message="Hello from parent";
}