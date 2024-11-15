trigger Emailtrigger on Contact (before insert) {
    if(Trigger.isBefore && trigger.isInsert ){
        SendEmailToObjectHandler.sendEmail(Trigger.new);
    }
}