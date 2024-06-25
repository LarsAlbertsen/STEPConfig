/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "AddToChangePackage",
  "type" : "BusinessAction",
  "setupGroups" : [ "TrackChanges" ],
  "name" : "AddToChangePackage",
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
    "contract" : "EventProcessorEventBatchBindContract",
    "alias" : "batch",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "LoggerBindContract",
    "alias" : "logger",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "ManagerBindContract",
    "alias" : "manager",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (batch,logger,manager) {
logger.info("AddToChangePackage " + batch)


/** @type{ChangePackageHome} */
var cpHome = manager.getHome(com.stibo.core.domain.changepackage.ChangePackageHome)
var cp = cpHome.getChangePackageByID("modified-laal-vm")
var state = cp.getObjectType();
if (state.getID().equals("stibo.chgpck.verified")) {
	logger.info("re-open " + state + " " + cp.getID())
	//cpHome.transitionVerifiedToEditing(cp)
	cp.reOpen()
} else {
	logger.info("already open")
}



var it = batch.getEvents().iterator()
while (it.hasNext()) {
	var e = it.next()
	logger.info("EventType "+e.getEventType().getID());
	
	var n = e.getNode()
	logger.info("Modified Node " + n)
	if (!getCurrentItems(cp).contains(n.getURL())) {
		logger.info("ADDING");
		
		cp.addItem(n)
		//var args2 = new java.util.HashMap()
		//var info2 = new com.stibo.core.domain.changepackage.ChangePackage.AddItemInfo(false, "Ignore", "Change", "Force")
		//args2.put(n.getURL(), info2);
		//cp.addItems(args2);
		
	}
	else {
		logger.info("SKIPPING")
	}
}


cp.sealPackage("Auto Seal")

/*var state = cp.getObjectType().getID()
if ("stibo.chgpck.editing".equals(state)) {
	logger.info("seal " + state + " " + cp.getID())
	var m = cp.getClass().getMethod("sealPackage", java.lang.String, com.stibo.core.domain.changepackage.messagelistener.MessageListener)
	logger.info("cp-seal " + cp)
	m.invoke(cp, "Script Seal", null);
}
else {
	logger.info("Skip " + state + " " + cp.getID())
}*/



/**
 * 
 * @param {StiboNode} pCP 
 * @returns 
 */
function getCurrentItems(pCP) {
	//var a = new java.util.HashSet();
	var result = new java.util.HashSet()
	var allItems = pCP.getItems(null)
	allItems.toArray().forEach(function (item) {
		//logger.info("forEach "+item+" "+item.isEditable());
		if (item.isEditable()) {
			var node = item.getNode();
			result.add(node.getURL())
		}
	})
	logger.info("Current "+result)
	return result
}

function callMethod(pObj, pMethod) {
	var method = pObj.getClass().getMethod(pMethod);
	var oo = method.invoke(pObj);
	return oo;
}

}