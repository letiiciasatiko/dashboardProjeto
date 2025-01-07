public with sharing class dashboardController {

    @AuraEnabled
    public static Integer getProdutoresCount() {
        // Realiza a consulta para contar o número de registros
        AggregateResult result = [SELECT COUNT(Id) 
                                  FROM Account 
                                  WHERE RecordTypeId = '0125A000001iUCPQA2' 
                                    AND IsActive__c = true
                                    AND ProducerSituation__c = 'ATIVO' 
                                    AND FRM_UnitName__c <> '' 
                                    AND (FRM_TipTra_CodTra__c LIKE '1%' 
                                         OR FRM_TipTra_CodTra__c LIKE '6%') 
                                    AND Owner.Alias <> 'app'];
        
        // Retorna o valor do contador
        return (Integer)result.get('expr0');
    }
}