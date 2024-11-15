public class Sobjects {
    public static void createRecords(){
        Account acc= new Account();
        acc.name='Test';
        acc.name='Test1';
        system.debug(acc);
    }  
}