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

if (!isOpen(cp)) {
	log.info("AddToChangePackage Reopen")
	//cp.reOpen();
		/*var state = cp.getObjectType();
	if (state.getID().equals("stibo.chgpck.verified")) {
		logger.info("re-open " + state + " " + cp.getID())
		cp.reOpen()
	} else {
		logger.info("already open")
	}
	*/
	cp.reOpen()
	log.info("AddToChangePackage reopen done")
}


var currentItems = getCurrentItems(cp)

var didAdd = false;
var it = batch.getEvents().iterator()
while (it.hasNext()) {
	var e = it.next()
	var n = e.getNode()

	if (!currentItems.contains(n.getURL())) {
		logger.info("AddToChangePackage ADDING " + n.getURL());
		cp.addItem(n)
		currentItems.add(n.getURL())
		didAdd = true
	}
}

if (isOpen(cp)) {
	logger.info("AddToChangePackage after " + getCurrentItems(cp))
	log.info("AddToChangePackage going to seal")
	cp.sealPackage("Auto Seal")
	log.info("AddToChangePackage seal done")
}


/**
 * 
 * @param {ChangePackage} pCP 
 * @returns {JavaUtilSet}
 */
function getCurrentItems(pCP) {
	var result = new java.util.HashSet()
	var allItems = pCP.getPrimaryItems();

	allItems.toArray().forEach(function (item) {
		if (item != null) {
			var n = pCP.getManager().getNodeFromURL(item);
			if (n!=null) {	
				logger.info("AddToChangePackage adding "+n.getID())
				result.add(n.getURL())
			}
			else {
				logger.info("AddToChangePackage item in package is deleted "+item)
			}
		}
	})
	return result
}

/**
 * 
 * @param {ChangePackage} pCP 
 * @returns {boolean}
 */
function isOpen(pCP) {
	var state = pCP.getValue("ChangePackageState").getSimpleValue()
	logger.info("AddToChangePackage state = "+state)
	if ("Change Package (Sealed)".equals(state)) {
		logger.info("isOpen("+pCP.getName()+ " false")
		return false
	}
	logger.info("isOpen("+pCP.getName()+ " true")
	return true;
}
}