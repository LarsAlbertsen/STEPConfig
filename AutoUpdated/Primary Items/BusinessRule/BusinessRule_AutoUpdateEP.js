/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "AutoUpdateEP",
  "type" : "BusinessAction",
  "setupGroups" : [ "TrackChanges" ],
  "name" : "Auto Update My ChangePackage",
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
exports.operation0 = function (node,logger,manager) {
logger.info("AutoUpdateEP " + node)
if (node != null) {
	/** @type{ChangePackageHome} */
/*
	var cpHome = manager.getHome(com.stibo.core.domain.changepackage.ChangePackageHome)
	var cp = cpHome.getChangePackageByID("AutoUpdated")

	if (!isOpen(cp)) {
		log.info("AddToChangePackage Reopen")
		cp.reOpen()
	}

	cp.addItem(node)*/
}

/**
 * 
 * @param {ChangePackage} pCP 
 * @returns {boolean}
 */
function isOpen(pCP) {
	var state = pCP.getValue("ChangePackageState").getSimpleValue()
	logger.info("AddToChangePackage state = " + state)
	if ("Change Package (Sealed)".equals(state)) {
		logger.info("isOpen(" + pCP.getName() + " false")
		return false
	}
	logger.info("isOpen(" + pCP.getName() + " true")
	return true;
}




}