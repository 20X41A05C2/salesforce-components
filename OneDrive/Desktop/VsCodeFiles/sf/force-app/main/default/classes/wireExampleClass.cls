public with sharing class wireExampleClass {
    public  wireExampleClass() {

    }
    @AuraEnabled(cacheable=true)
    public static list<Account> getAllAccounts(){

        try {
            list<Account> acc=[select id,name ,Phone from Account];
            return acc;
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}