public with sharing class AccountRelatedContacts {
    public AccountRelatedContacts() {

    }
    @AuraEnabled(cacheable=true)
    public static List<Contact>  accContactRecords(string accId){

        
        try {
            List<Contact> conList=[select id,Name,LastName,Email,Phone from contact where  AccountId=: accId];
            return conList;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}