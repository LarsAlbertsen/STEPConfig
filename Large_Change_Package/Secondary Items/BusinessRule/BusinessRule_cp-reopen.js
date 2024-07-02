/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "cp-reopen",
  "type" : "BusinessAction",
  "setupGroups" : [ "Actions" ],
  "name" : "cp-reopen",
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

//var cp = cpHome.getChangePackageByID("AnAsset");
//cp.installContents(null, true);
//cpHome.transitionVerifiedToEditing(cp);

//var setupGroupHome = callMethod(manager, "getSetupGroupHome");
//var setupGroup = setupGroupHome.getSetupGroupByID("UsingGit");

reopen("UsingGit")
reopen("2024 Spring")




function reopen(pSetupGroupID) {
	var cpHome = manager.getHome(com.stibo.core.domain.changepackage.ChangePackageHome);
	var setupGroupHome = callMethod(manager, "getSetupGroupHome");
	var setupGroup = setupGroupHome.getSetupGroupByID(pSetupGroupID);
	
	var allCPs = callMethod(setupGroup,"getChangePackages")
	allCPs.forEach(function(cp) {
		try {
			var state = cp.getObjectType();
			if (state.getID().equals("stibo.chgpck.verified")) {
				logger.info("re-open "+state+" "+cp.getID())
				cpHome.transitionVerifiedToEditing(cp)
			}
			else {
				logger.info("skip "+state+" "+cp.getID())
			}
		}
		catch (e) {
			log.info("ERROR on "+cp+" "+e);
		}
	});	
	logger.info("Done with "+pSetupGroupID)
}

function callMethod(pObj, pMethod) {
	var method = pObj.getClass().getMethod(pMethod);
	var oo = method.invoke(pObj);
	return oo;
}
}