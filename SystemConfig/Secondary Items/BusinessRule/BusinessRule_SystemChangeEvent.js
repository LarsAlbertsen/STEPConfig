/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "SystemChangeEvent",
  "type" : "BusinessAction",
  "setupGroups" : [ "Actions" ],
  "name" : "SystemChangeEvent",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ ],
  "allObjectTypesValid" : true,
  "runPrivileged" : false,
  "onApprove" : "Never",
  "dependencies" : [ ]
}
*/
/*===== business rule plugin definition =====
{
  "pluginId" : "JavaScriptBusinessActionWithBinds",
  "binds" : [ {
    "contract" : "EventProcessorEventBatchBindContract",
    "alias" : "EventBatch",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "ClassificationBindContract",
    "alias" : "SystemChangesRoot",
    "parameterClass" : "com.stibo.core.domain.impl.FrontClassificationImpl",
    "value" : "SystemChangesRoot",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "SystemChangeObjType",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "SystemChange",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "SystemChangeDateObjType",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "SystemChangeDate",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "SystemChangeUserObjType",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "SystemChangeUser",
    "description" : null
  }, {
    "contract" : "ManagerBindContract",
    "alias" : "step",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (EventBatch,SystemChangesRoot,SystemChangeObjType,SystemChangeDateObjType,SystemChangeUserObjType,step) {
logger.info("SystemChangeEvent "+EventBatch);

var allEvents = EventBatch.getEvents();
var it = allEvents.iterator();
while (it.hasNext()) {
	var e = it.next();
	logger.info("SystemChangeEvent Event "+e.getClass().getName());
	handleEvent(e);
}


function getUser(pEvent) {
	var m1 = pEvent.getClass().getMethod("getQueuedEvent");
	var queuedEvent = m1.invoke(pEvent);

	var m2 = queuedEvent.getClass().getMethod("getChangeLog");
	var changeLog = m2.invoke(queuedEvent);

	var m3 = changeLog.getClass().getMethod("getUserID");
	var userID = m3.invoke(changeLog);
	
	logger.info("userID "+userID);
	return userID;
}


function handleEvent(pEvent) {
	var node = pEvent.getNode();

	if (node!=null) {
		logger.info("SystemChangeEvent Type="+node.getClass().getName());
		var type = node.getClass().getSimpleName().replace("Front", "").replace("Impl", "");
		var id = node.getID();
		var userID = getUser(pEvent); //node.getManager().getCurrentUser().getName();
	
	
		//logger.info("SystemChangeEvent 1");
		var now = new java.util.Date();
		//logger.info("SystemChangeEvent 2");
		var currentLocale = java.util.Locale.getDefault();
		var dateFormat = java.text.DateFormat.getDateInstance(java.text.DateFormat.DEFAULT, currentLocale);
		//logger.info("SystemChangeEvent 3");
		var dateString = dateFormat.format(now);
		//logger.info("SystemChangeEvent now=["+dateString+"]");
		
		
		//var userID = node.getManager().getCurrentUser().getID();
		//logger.info("SystemChangeEvent 3.5 "+userID);
		var userDateClassification = getUserClassification(userID, dateString);
		//logger.info("SystemChangeEvent 4");
		var c = userDateClassification.createClassification("", SystemChangeObjType.getID());
		//logger.info("SystemChangeEvent 5");
		c.setName(type+" ID="+id);
		//logger.info("SystemChangeEvent 6");
	
	
	}
	else {
		logger.info("SystemChangeEvent Nothing");
	}
}



function getDateClassification(pDateString) {
	var id = "SystemChange "+ pDateString;
	var root = step.getClassificationHome().getClassificationByID(id);
	if (root==null) {
		root = SystemChangesRoot.createClassification(id, SystemChangeDateObjType.getID());
		root.setName(pDateString);
	}
	return root;
}

function getUserClassification(pUser, pDateString) {
	var id = "SystemChange "+pUser+" "+pDateString;
	logger.info("SystemChangeEvent.getUserClassification 1 ["+id+"]");
	var root = step.getClassificationHome().getClassificationByID(id);
	logger.info("SystemChangeEvent.getUserClassification 2 ["+root+"]");
	if (root==null) {
		var dateRoot = getDateClassification(pDateString);
		root = dateRoot.createClassification(id, SystemChangeUserObjType.getID());
		root.setName(pUser);
	}
	return root;
}
}