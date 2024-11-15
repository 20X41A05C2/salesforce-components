public class DMLoperations {
    public void customObjMethod(){
        //Inserting two records
       /* Demo__c stu1 = new Demo__c();
        Demo__c stu2 = new Demo__c();
        stu1.Name='tej';
        stu2.Name='sai';
        insert stu1;
        insert stu2;
        system.debug(stu1);
        system.debug(stu2);*/
        
        list<Demo__c>dlist=new list<Demo__c>();
        Demo__c stu1 = new Demo__c();
        stu1.Name='Hello';
        dlist.add(stu1);
        insert dlist;
        system.debug(dlist);
        
    }
}