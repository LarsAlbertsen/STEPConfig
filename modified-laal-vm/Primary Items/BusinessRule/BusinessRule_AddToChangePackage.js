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

/*var state = cp.getObjectType();
if (state.getID().equals("stibo.chgpck.verified")) {
	logger.info("re-open " + state + " " + cp.getID())
	cp.reOpen()
} else {
	logger.info("already open")
}
*/
log.info("AddToChangePackage Reopen")
cp.reOpen();
log.info("AddToChangePackage reopen done")

var currentItems = getCurrentItems(cp)

var it = batch.getEvents().iterator()
while (it.hasNext()) {
	var e = it.next()
	
	var n = e.getNode()
	if (!currentItems.contains(n.getURL())) {
		logger.info("AddToChangePackage ADDING "+n.getURL());
		cp.addItem(n)
	}
}

logger.info("AddToChangePackage after " + getCurrentItems(cp))
log.info("AddToChangePackage going to seal")
cp.sealPackage("Auto Seal")
log.info("AddToChangePackage seal done")




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