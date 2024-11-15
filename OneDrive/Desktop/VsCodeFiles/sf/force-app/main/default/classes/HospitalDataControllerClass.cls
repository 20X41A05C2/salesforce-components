public with sharing class HospitalDataControllerClass {
    public HospitalDataControllerClass() {

    }
    @AuraEnabled(cacheable=true)
    public static List<Prescriber_Institution__c>  getHospitalData(){
        try {
            List<Prescriber_Institution__c> hospList=[select id,Name,Country__c,Email_Address__c,Contact_Number__c from Prescriber_Institution__c];
            return hospList;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<Prescriber__c> getDoctorsByHospital(Id hospitalId, Date startDate, Date endDate) {
        String query = 'SELECT Id, Name, Medical_Specialities__c,Availability__c, Prescriber_Mail_ID__c,Prescriber_Institution__c FROM Prescriber__c WHERE Prescriber_Institution__c = :hospitalId';
        
        if (startDate != null) {
            query += ' AND CreatedDate >= :startDate';
        }
        if (endDate != null) {
            query += ' AND CreatedDate <= :endDate';
        }

        return Database.query(query);
    }
}