public class AccountOpportunity {
    public static void accMethod(){
        list <Account> accList=[select Name ,Id,Phone From Account Where Name like 'Tony%'];
        System.debug('Acclist::'+accList);
        list <opportunity> oppList= new list <opportunity>();
        
        if(accList.size()>0){
            for(Account acc:accList){
                opportunity opp=new opportunity();
                opp.Name=acc.name;
                opp.StageName='prospecting';
                opp.CloseDate=System.Today();
                opp.AccountId=acc.Id;
                oppList.add(opp);
            }
        }
        if(!oppList.isEmpty()){
            insert oppList;
            system.debug('opplist::'+oppList);
        }
    }
    
}