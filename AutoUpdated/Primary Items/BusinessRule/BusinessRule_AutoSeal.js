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
  "name" : "Auto Seal",
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

removeDeletedItems(cp)
cp.startSealInBackground("AutoSeal")

// Test

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

/**
 * 
 * @param {ChangePackage} pCP 
 */
function removeDeletedItems(pCP) {
	var allItems = pCP.getPrimaryItems();
	allItems.toArray().forEach(function (url) {
		if (url != null) {
			var n = pCP.getManager().getNodeFromURL(url);
			if (n == null) {
				logger.info("AddToChangePackage.removeDeletedItems item in package is deleted " + url)
				pCP.removeItem(url)
			}
		}
	})
}


}