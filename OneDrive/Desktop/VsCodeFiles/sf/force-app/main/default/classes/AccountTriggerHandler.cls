public class AccountTriggerHandler {
    public static void AccountInsert(List <Account> accList){
        for(Account acc: accList){
            acc.Description='HI';
            }
        
     }
    public static void insertOpp(List <Account> accList){
        List <Opportunity> oppList=new List <Opportunity>();
        for(Account acc: accList){
            Opportunity opp=new Opportunity();
            opp.Name= acc.Name;
            opp.CloseDate=System.Today();
            opp.StageName='Prospecting';
            opp.AccountId=acc.Id;
            oppList.add(opp);
        }
        if(oppList.size()>0){
            insert oppList;
        }
    }
    
}