/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "CP_Scripting",
  "type" : "BusinessAction",
  "setupGroups" : [ "ChangePackage Scripting" ],
  "name" : "CP_Scripting",
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
    "contract" : "ProductBindContract",
    "alias" : "rootNode",
    "parameterClass" : "com.stibo.core.domain.impl.FrontProductImpl$$Generated$$9",
    "value" : "102609",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (manager,rootNode) {

var newNameAndID = "CP-"+new java.util.Date().toString();
var setupHome = manager.getSetupGroupHome();
var myChangePackages = setupHome.getSetupGroupByID("LAALVM");
var newPck = myChangePackages.createChangePackage(newNameAndID);
newPck.setName(newNameAndID);

/*
var cpHome = manager.getHome(com.stibo.core.domain.changepackage.ChangePackageHome)
var newCP = cpHome.createChangePackage(parentID, cpID);
*/

var foo = manager.getNodeFromURL("step://OutBoundIntegrationEndpoint?editor=OutboundIntegrationEndpointConfiguration&contextid=Context1&id=GITChangePackages&workspaceid=Main");

var args = new java.util.HashMap()
var info = new com.stibo.core.domain.changepackage.ChangePackage.AddItemInfo(false, "Ignore", "Change", "Force")
args.put("step://OutBoundIntegrationEndpoint?editor=OutboundIntegrationEndpointConfiguration&contextid=Context1&id=GITChangePackages&workspaceid=Main", info)
var args2 = new java.util.HashMap()
newPck.addItems(args)
*/
rootNode.getChildren().forEach(function(n) {
	logger.info(n);
	var info2 = new com.stibo.core.domain.changepackage.ChangePackage.AddItemInfo(false, "Ignore", "Change", "Force")
	args2.put("step://attributegroup?editor=AttributeGroup&contextid=Context1&id=Dimensions&workspaceid=Main", info2)
	args2.put(n.getURL(), info2);
});
newPck.addItems(args2)*

}