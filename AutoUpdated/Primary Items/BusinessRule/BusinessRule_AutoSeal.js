/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "AutoSeal",
  "type" : "BusinessAction",
  "setupGroups" : [ "TrackChanges" ],
  "name" : "AutoSeal",
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
exports.operation0 = function (manager) {
	/** @type{ChangePackageHome} */
	var cpHome = manager.getHome(com.stibo.core.domain.changepackage.ChangePackageHome)
	var cp = cpHome.getChangePackageByID("AutoUpdated")

	if (!isOpen(cp)) {
		log.info("AddToChangePackage Reopen")
		cp.reOpen()
	}

    cp.sealPackage("AutoSeal")


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