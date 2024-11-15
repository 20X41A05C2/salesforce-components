public class AccountCaluculator {
	@future
    public static void countContacts(List<Id> accIds){
        List<Account> accList=[select Id,(select Id from contacts)
                              from Account where Id IN :accIds];
        for(Account acc: accList){
            acc.No_Of_Contacts__c=acc.Contacts.size();
        }
        if(!accList.isEmpty()){
            update accList;
        }
    }
}