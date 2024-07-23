/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ChangePackages",
  "type" : "BusinessAction",
  "setupGroups" : [ "Actions" ],
  "name" : "ChangePackages",
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
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "GITBranch",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "GITBranch",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (manager,GITBranch) {

/** @type{ChangePackageHome} */
var cpHome = manager.getHome(com.stibo.core.domain.changepackage.ChangePackageHome)

var cp = cpHome.getChangePackageByID("MyCP")
if (cp == null) {
    cp = cpHome.createChangePackage("Support Change Packages", "MyCP")
    cp.setName("My Sample ChangePackage")
    cp.setSimpleValue(GITBranch, "DEV")
}
else {
    cp.reOpen()
}

var it = manager.getProductHome().getTopProduct().getChildren().iterator()
while (it.hasNext()) {
    cp.addItem(it.next())
}

var bgpID = cp.startSealInBackground("Auto Sealed")
logger.info("BGPID=" + bgpID)
}