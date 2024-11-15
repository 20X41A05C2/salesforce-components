public with sharing class searchComponent {
    public searchComponent() {

    }
    @AuraEnabled(cacheable=true)
    public static List<Account> searchAccount(string searchKey){
        string searchTerm='%'+searchKey+'%';
        return [Select Id, Name, Phone, Type  From Account where Name Like : searchTerm];
        
    }
}