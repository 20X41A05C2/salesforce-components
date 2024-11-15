@isTest
public class SendemailTest {
    @isTest
    public static void sendEmailMethod(){
        List<Contact> conList= new List<Contact>();
        Contact con= new Contact();
        con.FirstName='Teja';
        con.LastName='Swaroop';
        con.Email='tejaswaroop373@gmail.com';
        conList.add(con);
        insert conList;
        
        Test.startTest();
        SendEmailToObjectHandler.sendEmail(Conlist);
        Test.stopTest();
    }
}