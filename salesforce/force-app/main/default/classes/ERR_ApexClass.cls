public without sharing class ERR_ApexClass {
    @AuraEnabled
    public static Id validateEmployeeEmail(String email) {
        Employee__c emp = [SELECT Id FROM Employee__c WHERE Email__c = :email LIMIT 1];
        return emp != null ? emp.Id : null;
    }
    
    @AuraEnabled
    public static Id createExpenseReimbursementRequest(Id employeeId, Decimal amount, String description, String expenseType, Date expenseDate, String Email) {
        // Create the Expense Reimbursement Request record
        Expense_Reimbursement_Request__c newRequest = new Expense_Reimbursement_Request__c();
        newRequest.Employee_Name__c = employeeId;
        newRequest.Amount__c = amount;
        newRequest.Description__c = description;
        newRequest.Expense_Type__c = expenseType;
        newRequest.Expense_Date__c = expenseDate;
        newRequest.Email__c = Email;
       
        insert newRequest;
        return newRequest.Id;
    }

    // @AuraEnabled
    // public static void uploadFile(String recordId, List<String> fileNames, List<String> fileData) {
    //     List<ContentVersion> contentVersions = new List<ContentVersion>();
    //     for (Integer i = 0; i < fileNames.size(); i++) {
    //         ContentVersion cv = new ContentVersion();
    //         cv.Title = fileNames[i];
    //         cv.PathOnClient = fileNames[i];
    //         cv.VersionData = EncodingUtil.base64Decode(fileData[i]);
    //         cv.FirstPublishLocationId = recordId; // Link it to the record (e.g., Account, Case, etc.)
    //         contentVersions.add(cv);
    //     }
        
    //     insert contentVersions; // Insert the content versions
        
    //     // Create ContentDocumentLink for linking the document to the record
    //     List<ContentDocumentLink> docLinks = new List<ContentDocumentLink>();
    //     for (ContentVersion cv : contentVersions) {
    //         ContentDocumentLink docLink = new ContentDocumentLink();
    //         docLink.ContentDocumentId = cv.ContentDocumentId; // Link to the ContentDocument created above
    //         docLink.LinkedEntityId = recordId; // Link to the record (Account, Case, etc.)
    //         docLink.ShareType = 'V'; // Can adjust based on your needs (e.g., Viewer)
    //         docLink.Visibility = 'AllUsers'; // Adjust visibility as needed
    //         docLinks.add(docLink);
    //     }
        
    //     insert docLinks; // Insert the content document links
    // }
    @AuraEnabled
    public static void uploadFile(Id errId, String fileName, String fileBody) {
        Blob fileBlob = EncodingUtil.base64Decode(fileBody); // Decode Base64 to Blob
        ContentVersion cv = new ContentVersion();
        cv.Title = fileName;
        cv.PathOnClient = fileName;
        cv.VersionData = fileBlob;
        insert cv;
 
        // Link ContentDocument to the Job Application
        ContentDocumentLink cdl = new ContentDocumentLink();
        cdl.LinkedEntityId = errId;
        cdl.ContentDocumentId = [SELECT ContentDocumentId FROM ContentVersion WHERE Id = :cv.Id].ContentDocumentId;
        cdl.ShareType = 'I'; // Internal use only
        insert cdl;
    }


    @AuraEnabled(cacheable=true)
    public static List<Map<String, String>> getExpenseTypeOptions() {
        try {
            // Get picklist values for Expense_Type__c field
            Schema.DescribeFieldResult fieldResult = Expense_Reimbursement_Request__c.Expense_Type__c.getDescribe();
            List<Schema.PicklistEntry> picklistEntries = fieldResult.getPicklistValues();

            // Prepare the list of options in { label, value } format
            List<Map<String, String>> options = new List<Map<String, String>>();
            for (Schema.PicklistEntry entry : picklistEntries) {
                options.add(new Map<String, String>{
                    'label' => entry.getLabel(),
                    'value' => entry.getValue()
                });
            }
            return options;
        } catch (Exception e) {
            throw new AuraHandledException('Error fetching expense type options: ' + e.getMessage());
        }
    }
}