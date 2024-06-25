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
  "name" : "AutoAdd Modified Items To Change Package",
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
	cp.reOpen()
} else {
	logger.info("already open")
}

cp.getPrimaryItems().forEach(function(nn) {
	if (nn==null) {
		logger.info("NULL item")
	} else {
		logger.info(nn.getName())
	}
})

var it = batch.getEvents().iterator()
while (it.hasNext()) {
	var e = it.next()
	logger.info("EventType "+e.getEventType().getID());
	
	var n = e.getNode()
	logger.info("Modified Node " + n)
	if (!getCurrentItems(cp).contains(n.getURL())) {
		logger.info("ADDING");
		cp.addItem(n)
	}
	else {
		logger.info("SKIPPING")
	}
}

logger.info("URL1" + cp.getURL())

cp.sealPackage("Auto Seal")
logger.info("URL2" + cp.getURL())




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
		if (item.getNode()==null) {
			logger.info("isNull")
		}
		else if (item.isEditable()) {
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