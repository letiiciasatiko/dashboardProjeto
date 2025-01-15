public with sharing class dashboardController {

    @AuraEnabled(cacheable=true)
    public static List<AggregateResult> getProdutoresCount(){
        try {
            return [
                SELECT TypeOfRegistration__c Tipo, COUNT(Id) 
                FROM Account 
                WHERE RecordTypeId = '0125A000001iUCPQA2' 
			      AND IsActive__c = true
			      AND ProducerSituation__c = 'ATIVO' 
			      AND FRM_UnitName__c <> '' 
			      AND (FRM_TipTra_CodTra__c LIKE '1%' 
				    OR FRM_TipTra_CodTra__c LIKE '6%') 
			      AND Owner.Alias <> 'app' 
                  AND (TypeOfRegistration__c = 'COOPERANTE' 
                    OR TypeOfRegistration__c = 'COOPERADO')
                GROUP BY TypeOfRegistration__c 
            ];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static Integer getVisitasTotaisCount(){
        List<AggregateResult> resultado = [SELECT COUNT(Id)
                                                FROM TechnicalRecomendation__c
                                            WHERE IsVisitDone__c = true
                                                AND (FRM_OwnerProfile__c = 'Agrônomo'
                                                OR FRM_OwnerProfile__c = 'Gerente de Unidade')
                                                AND (Producer__r.FRM_TipTra_CodTra__c LIKE '1%'
                                                OR Producer__r.FRM_TipTra_CodTra__c LIKE '6%')];

        Integer totalVisit = (Integer)resultado[0].get('expr0');
        return totalVisit;
    }

    @AuraEnabled(cacheable=true)
    public static List<AggregateResult> getNaoVisitaveis(){
        try {
            return [
                    SELECT TypeOfRegistration__c Tipo, COUNT(Id) 
                    FROM Account 
                    WHERE IsVisitable__c = 'ISVISITABLE_NAO' 
                        AND IsActive__c = true 
                        AND RecordTypeId = '0125A000001iUCPQA2' 
                        AND (FRM_TipTra_CodTra__c LIKE '1%' 
                        OR FRM_TipTra_CodTra__c LIKE '6%')
                    GROUP BY TypeOfRegistration__c
                ];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}


