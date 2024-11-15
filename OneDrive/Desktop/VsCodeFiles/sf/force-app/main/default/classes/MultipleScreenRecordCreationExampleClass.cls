public with sharing class MultipleScreenRecordCreationExampleClass {
    public MultipleScreenRecordCreationExampleClass() {}

        @AuraEnabled(cacheable=true)
        public static List<RecordTypeOption> getRecordTypes(){
            
        List<RecordTypeOption> options = new List<RecordTypeOption>();

        for (RecordType rt : [Select Name,  Id FROM RecordType WHERE SobjectType='Prescriber_Institution__c']){
            options.add(new RecordTypeOption(rt.Name, rt.Id));
        }
       
        return options;
        }
            public class RecordTypeOption {
                @AuraEnabled public string label{get;set;}
                @AuraEnabled public string value{get;set;}

                public RecordTypeOption(string label, string value){
                    this.label = label;
                    this.value = value;
                }
                
        }

        @AuraEnabled
        public static Id createPrescriberInstitution(String Name ,Id recordTypeId, String phone,String email,String country){
            Prescriber_Institution__c piObj=new Prescriber_Institution__c();
            piObj.Name=Name;
            piObj.RecordTypeId=recordTypeId;
            piObj.Contact_Number__c=phone;
            piObj.Email_Address__c=email;
            piObj.Country__c=country;


            insert piObj;
            return piObj.Id;
        }

       
        // public static Id createPrescriber(String Name,Id createdInstitutionId,String prescriberGender,String prescriberMail,Integer experience,Integer salary,String prescriberMedicalSpeciality,String prescriberAvailability  )
        @AuraEnabled()
        public static Id createPrescriber(String Name,Id createdInstitutionId,String prescriberGender,String prescriberMail,Integer experience,Integer salary,String prescriberMedicalSpeciality,String prescriberAvailability  ){
            Prescriber__c prescriberObj=new Prescriber__c();
            prescriberObj.Name=Name;
            prescriberObj.Prescriber_Institution__c=createdInstitutionId;
             prescriberObj.Gender__c=prescriberGender;
             prescriberObj.Prescriber_Mail_ID__c=prescriberMail;
            prescriberObj.Experience__c=experience;
            prescriberObj.salary__c=salary;
            prescriberObj.Medical_Specialities__c=prescriberMedicalSpeciality;
             prescriberObj.Availability__c=prescriberAvailability;
           

            insert prescriberObj;
            return prescriberObj.Id;
        }
}