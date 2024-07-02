/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "cp-seal",
  "type" : "BusinessAction",
  "setupGroups" : [ "Actions" ],
  "name" : "cp-seal",
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

var cpHome = manager.getHome(com.stibo.core.domain.changepackage.ChangePackageHome);
//var cp = cpHome.getChangePackageByID("AnAsset");
//cp.installContents(null, true);
//cpHome.transitionVerifiedToEditing(cp);

reseal("UsingGit")
reseal("2024 Spring")

function reseal(pSetupGroupID) {
	var setupGroupHome = callMethod(manager, "getSetupGroupHome");
	var setupGroup = setupGroupHome.getSetupGroupByID("2024 Spring");

	var allCPs = callMethod(setupGroup,"getChangePackages")
	allCPs.forEach(function(cp) {
		logger.info("Current "+cp.getID())
		var state = cp.getObjectType().getID()
		if ("stibo.chgpck.editing".equals(state)) {
			logger.info("seal "+state+" "+cp.getID())
			var m = cp.getClass().getMethod("sealPackage", java.lang.String, com.stibo.core.domain.changepackage.messagelistener.MessageListener)
			logger.info("cp-seal "+cp)
			m.invoke(cp, "Script Seal", null);
		}
		else {
			logger.info("Skip "+state+" "+cp.getID())
		}
		//cpHome.sealPackage("ScriptSeal", null)
	});
}


function callMethod(pObj, pMethod) {
	var method = pObj.getClass().getMethod(pMethod);
	var oo = method.invoke(pObj);
	return oo;
}
}