public class toDoController {
    //Add a new item in ToDo__c object
    //Accepts serialized ToDo object
    @AuraEnabled
    public static String addTodo(String payload) {
      ToDo payloadObject = (ToDo) JSON.deserialize(payload, ToDo.class);
  
      SObject tsk = (Sobject) Type.forName('ToDo__c').newInstance();
      tsk.put('Name', payloadObject.todoName);
      tsk.put('Done__c', payloadObject.done);
  
      insert tsk;
  
      return String.valueOf(tsk.Id);
    }
  
    //Update an item
    //Accepts serialized ToDo object
    @AuraEnabled
    public static void updateTodo(String payload) {
      ToDo payloadObject = (ToDo) JSON.deserialize(payload, ToDo.class);
  
      SObject tsk = (Sobject) Type.forName('ToDo__c').newInstance();
      tsk.put('Id', payloadObject.todoId);
      tsk.put('Name', payloadObject.todoName);
      tsk.put('Done__c', payloadObject.done);
  
      update tsk;
    }
  
    //Delete an item
    //Accepts id of the item to delete
    @AuraEnabled
    public static void deleteTodo(String todoId) {
      SObject tsk = (Sobject) Type.forName('ToDo__c').newInstance();
      tsk.put('Id', todoId);
  
      delete tsk;
    }
  
    //Get all todos for last 7 days
    //The method is cacheable, means the response will cached in the browser
    @AuraEnabled(cacheable=true)
    public static List<ToDo> getAllTodos() {
      List<SObject> tsks = Database.query(
        'SELECT Id, Name, CreatedDate, Done__c FROM ToDo__c WHERE CreatedDate = LAST_N_DAYS:7 ORDER BY CreatedDate DESC'
      );
  
      return getToDos(tsks);
    }
  
    //Get all todos for today
    @AuraEnabled
    public static List<ToDo> getCurrentTodos() {
      List<SObject> tsks = Database.query(
        'SELECT Id, Name, CreatedDate, Done__c FROM ToDo__c WHERE CreatedDate = TODAY ORDER BY CreatedDate DESC'
      );
      return getToDos(tsks);
    }
  
    //Wrap ToDo__c SObject into ToDo object
    public static List<ToDo> getToDos(List<SObject> tsks) {
      List<ToDo> todos = new List<ToDo>();
      for (SObject tsk : tsks) {
        ToDo todo = new ToDo();
        todo.todoId = tsk.Id;
        todo.todoName = String.valueOf(tsk.get('Name'));
        todo.todoDate = Date.valueOf(tsk.get('CreatedDate'));
        todo.done = Boolean.valueOf(tsk.get('Done__c'));
        todos.add(todo);
      }
  
      return todos;
    }
  
    //Wrapper Class to represent a ToDo Item
    class ToDo {
      @AuraEnabled
      public String todoId;
      @AuraEnabled
      public String todoName;
      @AuraEnabled
      public Date todoDate;
      @AuraEnabled
      public Boolean done;
    }
  }