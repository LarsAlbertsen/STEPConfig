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
  "setupGroups" : [ "LAALBRGroup" ],
  "name" : "System Change Generate Event",
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
    "contract" : "CurrentObjectBindContract",
    "alias" : "node",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "ManagerBindContract",
    "alias" : "step",
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
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,step,SystemChangesRoot,SystemChangeObjType,SystemChangeDateObjType,SystemChangeUserObjType) {
handleNode(node);

function handleNode(pNode) {
	if (pNode!=null) {
		var url = pNode.getURL();
		//logger.info("SystemChangeGenerateEvent Type="+pNode.getClass().getName()+" URL="+url);
		var type = pNode.getClass().getSimpleName().replace("Front", "").replace("Impl", "");
		var id = pNode.getID();
		var user = pNode.getManager().getCurrentUser();
	
		var now = new java.util.Date();
		var currentLocale = java.util.Locale.getDefault();
		var dateFormat = java.text.DateFormat.getDateInstance(java.text.DateFormat.DEFAULT, currentLocale);
		var dateString = dateFormat.format(now);

		var userDateClassification = getUserClassification(user, dateString);
		var changeName = type+" ID="+id;
		var existingChanges = userDateClassification.getChildren();
		for (var i=0; i<existingChanges.size(); i++) {
			if (changeName.equals(existingChanges.get(i).getName())) {
				//logger.info("Found existing change for "+existingChanges.get(i).getTitle());
				return;
			}
		}
		var c = userDateClassification.createClassification("", SystemChangeObjType.getID());
		c.setName(changeName);
	}
	else {
		logger.info("SystemChangeGenerateEvent Nothing");
	}
}

//
// get or create classification for the given date
//
function getDateClassification(pDateString) {
	var id = "SystemChange "+ pDateString;
	var root = step.getClassificationHome().getClassificationByID(id);
	if (root==null) {
		root = SystemChangesRoot.createClassification(id, SystemChangeDateObjType.getID());
		root.setName(pDateString);
	}
	return root;
}

//
// get or create classification for the give user on the given date
//
function getUserClassification(pUser, pDateString) {
	var id = "SystemChange "+pUser.getID()+" "+pDateString;
	var root = step.getClassificationHome().getClassificationByID(id);
	if (root==null) {
		var dateRoot = getDateClassification(pDateString);
		root = dateRoot.createClassification(id, SystemChangeUserObjType.getID());
		root.setName(pUser.getTitle());
	}
	return root;
}
}