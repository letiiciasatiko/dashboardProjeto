public with sharing class dashboardController {

    class Account {
        @AuraEnabled
        public String accountId;
    }

    @AuraEnabled(cacheable=true)
    public static Integer getProdutoresCount() {
        List<AggregateResult> resultado = [SELECT COUNT(Id) 
                                            FROM Account 
                                            WHERE RecordTypeId = '0125A000001iUCPQA2' 
                                                AND IsActive__c = true
                                                AND ProducerSituation__c = 'ATIVO' 
                                                AND FRM_UnitName__c <> '' 
                                                AND (FRM_TipTra_CodTra__c LIKE '1%' 
                                                    OR FRM_TipTra_CodTra__c LIKE '6%') 
                                                AND Owner.Alias <> 'app'];

        return (Integer)resultado[0].get('expr0');
    }
}