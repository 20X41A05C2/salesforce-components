public class UpdateFields {
    public static void FieldUpadte(){
        list <Account> acclist=[select Id,Name,Phone from Account where Name like 'teja'];
        system.debug(acclist);
        if(acclist.size()>0){
            
            for(Account acc:acclist){
                acc.Name='Tony';
                acc.phone='8787989787';
            }
        }
        if(! acclist.isEmpty()){
            update acclist;
        }
    }
	
    
}