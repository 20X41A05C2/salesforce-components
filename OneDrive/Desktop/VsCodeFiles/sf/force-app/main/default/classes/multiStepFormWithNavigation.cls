public with sharing class multiStepFormWithNavigation {
    @AuraEnabled
    public static Id createAccount(String Name, String phone, String Rating, String Type) {
        Account acc = new Account(Name = Name, Phone = phone, Rating = Rating, Type = Type);
        insert acc;
        return acc.Id;
    }

    // @AuraEnabled
    // public static void createContacts(List<Contact> contactList) {
    //     if (!contactList.isEmpty()) {
    //         insert contactList;
    //     }
    // }

    @AuraEnabled
    public static void createContacts(List<Contact> contacts, Id createdAccountId) {
        for (Contact c : contacts) {
            c.AccountId = createdAccountId;
        }
        insert contacts;
    }
}
