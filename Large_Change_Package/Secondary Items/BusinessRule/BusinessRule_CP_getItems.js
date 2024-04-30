/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "CP_getItems",
  "type" : "BusinessAction",
  "setupGroups" : [ "ChangePackage Scripting" ],
  "name" : "CP_getItems",
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
var cpHome = manager.getHome(com.stibo.core.domain.changepackage.ChangePackageHome)
var myCP = cpHome.getChangePackageByID("CP_getItems");
var allItems = myCP.getItems(null)
allItems.toArray().forEach(function(item) { 
	if (item.isEditable()) {
		var node = item.getNode();
		if (node instanceof com.stibo.core.domain.Product) {
			//logger.info("Checking "+node.getTitle()+ "  "+node.getApprovalStatus());
			if (!(node.getApprovalStatus()==com.stibo.core.domain.workspaceaware.ApprovalStatus.CompletelyApproved)) {
				logger.info("Not approved "+item.isEditable()+" " +node.getTitle())
			}
		}
	}
})




}