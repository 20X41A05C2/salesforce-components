public with sharing class EmailControllerClass {
    public EmailControllerClass() {
    }
    @AuraEnabled(cacheable=true)
    public static List<EmailTemplate> getEmailTemplatesByFolder() {
        String folderName = 'Practice';  // Your folder name

        // Get the Id of the folder containing the email templates
        Id folderId = [SELECT Id FROM Folder WHERE Name = :folderName AND Type = 'Email' LIMIT 1].Id;

        // Query the Email Templates in that folder
        return [SELECT Id, Name, DeveloperName FROM EmailTemplate WHERE FolderId = :folderId];
    }
    // contacts controller
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(){
        return [SELECT Id, Account.Name,Name, Email FROM Contact];
    }

    @AuraEnabled
    public static void sendEmail(List<Id> contactIds, Id emailTemplateId) {
        // Logic to send email
        List<Contact> contacts = [SELECT Id, Email FROM Contact WHERE Id IN :contactIds];
        EmailTemplate emailTemplate = [SELECT Id, Subject, HtmlValue FROM EmailTemplate WHERE Id = :emailTemplateId LIMIT 1];

        for (Contact contact : contacts) {
            if (contact.Email != null) {
                Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
                mail.setTemplateId(emailTemplate.Id);
                mail.setTargetObjectId(contact.Id);
                mail.setSaveAsActivity(false);
                Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mail });
            }
        }
    }
}