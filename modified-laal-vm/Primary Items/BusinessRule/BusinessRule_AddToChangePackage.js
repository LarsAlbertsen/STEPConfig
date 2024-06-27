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

var currentItems = getCurrentItems(cp)

var it = batch.getEvents().iterator()
while (it.hasNext()) {
	var e = it.next()
	
	var n = e.getNode()
	if (!currentItems.contains(n.getURL())) {
		logger.info("ADDING "+n.getURL());
		cp.addItem(n)
	}
}

logger.info("Items after " + getCurrentItems(cp))

cp.sealPackage("Auto Seal")





/**
 * 
 * @param {ChangePackage} pCP 
 * @returns {JavaUtilSet}
 */
function getCurrentItems(pCP) {
	var result = new java.util.HashSet()
	var allItems = pCP.getPrimaryItems();
	
	allItems.toArray().forEach(function (item) {
		if (item!=null) {
			result.add(item.getURL())
		}
	})
	return result
}

}