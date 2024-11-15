trigger AccountTriggerExample on Account (before insert,after insert) {
	
    if(Trigger.isInsert && Trigger.isBefore){
        System.debug('Before Insert Event');
        AccountTriggerHandler.AccountInsert(Trigger.New);
    }
    else if(Trigger.isInsert && Trigger.isAfter){
        System.debug('After Insert Event');
        AccountTriggerHandler.insertOpp(Trigger.New);
    }
}