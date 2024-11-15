public with sharing class contactsController {
    public contactsController() {
    }
    
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(){
        return [SELECT Id, Account.Name,Name, Email FROM Contact];
    }
}