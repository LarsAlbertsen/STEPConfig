/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "SystemChangeGenerateEvent",
  "type" : "BusinessAction",
  "setupGroups" : [ "TrackChanges" ],
  "name" : "System Change Generate Event",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ ],
  "allObjectTypesValid" : true,
  "runPrivileged" : true,
  "onApprove" : "Never",
  "dependencies" : [ ]
}
*/
/*===== business rule plugin definition =====
{
  "pluginId" : "JavaScriptBusinessActionWithBinds",
  "binds" : [ {
    "contract" : "CurrentObjectBindContract",
    "alias" : "node",
    "parameterClass" : "null",
    "value" : null,
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
    "contract" : "ObjectTypeBindContract",
    "alias" : "SystemChangeYearObjType",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "SystemChangeYear",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "SystemChangeMonthObjType",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "SystemChangeMonth",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,SystemChangeObjType,SystemChangeDateObjType,SystemChangeUserObjType,SystemChangeYearObjType,SystemChangeMonthObjType) {
if (node!=null) {
	logger.info("Workspace "+node.getManager().getCurrentWorkspace().getID());
	if (node.getManager().getCurrentWorkspace().getID().equals("Approved")) {
		logger.info("Creating main node");
		var mainManager = node.getManager();
		mainManager.executeInWorkspace("Main", function(mainManager) {
			var mainNode = mainManager.getObjectFromOtherManager(node);
			handleNode(mainNode);
			return;
		 });
	}
	else {
		handleNode(node);
	}
}

function handleNode(pNode) {
	if (pNode!=null) {
		var url = pNode.getURL();
		logger.info("SystemChangeGenerateEvent Type="+pNode.getClass().getName()+" URL="+url);
		var type = pNode.getClass().getSimpleName().replace("Front", "").replace("Impl", "");
		var id = pNode.getID();
		var user = pNode.getManager().getCurrentUser();
		var configRoot = pNode.getManager().getClassificationHome().getClassificationByID("SystemChangesRoot");

		var now = new java.util.Date();
		var currentLocale = java.util.Locale.getDefault();
		var dateFormat = java.text.DateFormat.getDateInstance(java.text.DateFormat.DEFAULT, currentLocale);
		var dateString = dateFormat.format(now);


		var userDateClassification = getUserClassification2(configRoot, user, now);

	
		var changeName = type+" ID="+id;
		var existingChanges = userDateClassification.getChildren();
		for (var i=0; i<existingChanges.size(); i++) {
			if (changeName.equals(existingChanges.get(i).getName())) {
				logger.info("Found existing change for "+existingChanges.get(i).getTitle());
				return;
			}
		}
		var c = userDateClassification.createClassification("", SystemChangeObjType.getID());
		c.setName(changeName);
	}
	else {
		logger.info("SystemChangeGenerateEvent No Node");
	}
}



//
// get or create classification for the give user on the given date organized in data hierarchy
//
function getUserClassification2(pConfigRoot, pUser, pNow) {
	var formatter = new java.text.SimpleDateFormat("yyyy/MM/dd");  
	var dateString = formatter.format(pNow);

	var id = "SystemChange "+dateString+"/"+pUser.getID();
	var userCls = pConfigRoot.getManager().getClassificationHome().getClassificationByID(id);
	if (userCls==null) {
		//logger.info("Did not userCls ["+id+"]");
		var dateCls = getDateClassification2(pConfigRoot, pNow);
		userCls = dateCls.createClassification(id, SystemChangeUserObjType.getID());
		userCls.setName(pUser.getTitle());
	}
	return userCls;
}

function getDateClassification2(pConfigRoot, pNow) {
	//var formatter = new java.text.SimpleDateFormat("dd/MM/yyyy HH:mm:ss");  
	var formatter = new java.text.SimpleDateFormat("yyyy/MM/dd");  
	var dateString = formatter.format(pNow);

	var id = "SystemChange "+ dateString;
	var dateCls = pConfigRoot.getManager().getClassificationHome().getClassificationByID(id);
	logger.info("Found date "+dateCls);
	if (dateCls==null) {
		logger.info("Create date ["+id+"]");
		var monthCls = getMonthClassification2(pConfigRoot, pNow);
		dateCls = monthCls.createClassification(id, SystemChangeDateObjType.getID());
		dateCls.setName(dateString);
		logger.info("Created day");
	}
	return dateCls;
}

function getMonthClassification2(pConfigRoot, pNow) {
	//var formatter = new java.text.SimpleDateFormat("dd/MM/yyyy HH:mm:ss");  
	var formatter = new java.text.SimpleDateFormat("yyyy/MM");  
	var dateString = formatter.format(pNow);

	var id = "SystemChange "+ dateString;
	var monthCls = pConfigRoot.getManager().getClassificationHome().getClassificationByID(id);
	logger.info("Found month "+monthCls);
	if (monthCls==null) {
		logger.info("Create month ["+id+"]");
		var yearCls = getYearClassification2(pConfigRoot, pNow);
		logger.info("Got year - creating ["+id+"]");
		monthCls = yearCls.createClassification(id, SystemChangeMonthObjType.getID());
		monthCls.setName(dateString);
		logger.info("Create month");
	}
	return monthCls;
}

function getYearClassification2(pConfigRoot, pNow) {
	//var formatter = new java.text.SimpleDateFormat("dd/MM/yyyy HH:mm:ss");  
	var formatter = new java.text.SimpleDateFormat("yyyy");  
	var dateString = formatter.format(pNow);

	var id = "SystemChange "+ dateString;
	logger.info("Look for ["+id+"]");
	var yearCls = pConfigRoot.getManager().getClassificationHome().getClassificationByID(id);
	logger.info("Found "+yearCls);
	if (yearCls==null) {
		logger.info("Create year ["+id+"] below ["+SystemChangesRoot.getID()+"]");
		yearCls = pConfigRoot.createClassification(id, SystemChangeYearObjType.getID());
		yearCls.setName(dateString);
		logger.info("Created year");
	}
	return yearCls;
}
}