@isTest
public class OppProcessorTest {
	@isTest
    public static void testBatchClass(){
        List<opportunity> oppList=new List<opportunity>();
        for (integer i=0;i<200;i++){
            oppList.add(new Opportunity(Name='Test'+i,CloseDate=System.Today(),StageName='Prospecting'));
        }
        insert oppList;
        Test.startTest();
        OppProcessor oppProcess=new OppProcessor();
        Id batchId=Database.executeBatch(oppProcess);
        Test.stopTest();
    }
}