public with sharing class contactControllerClass {
     @AuraEnabled
     public static Id createContact(String firstName ,String lastName , String email,Id accountId){
        Contact con= new Contact();
        con.FirstName=firstName;
        con.LastName=lastName;
        con.Email=email;
        con.AccountId=accountId;
        try {
            insert con;
            return con.Id;
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}