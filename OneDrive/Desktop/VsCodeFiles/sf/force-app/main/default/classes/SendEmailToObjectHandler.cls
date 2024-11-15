public class SendEmailToObjectHandler {
    public static void  sendEmail(List <Contact> Conlist){
        List<Messaging.Email> emailList =new List<Messaging.Email>();
        
        for(Contact con:Conlist){
            if(con.email!=null){
                Messaging.singleEmailMessage emailMessage =new Messaging.singleEmailMessage();
                String[] toAdress=new String[]{con.Email};
                emailMessage.setToAddresses(toAdress);
                String emailSub='Welcome '+ con.Lastname;
                emailMessage.setSubject(emailSub);
                
                String content = 'Hi '+con.Lastname +',<br/> <br/>'+
                				'welcome';
                emailMessage.setHtmlBody(content);
                emailList.add(emailMessage);
                
            }
        }
        Messaging.sendEmail(emailList);
    }
}