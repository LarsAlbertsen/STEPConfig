/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "RemoveFromWorkflow",
  "type" : "BusinessAction",
  "setupGroups" : [ "LAALBRGroup" ],
  "name" : "Remove From Workflow",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "Item" ],
  "allObjectTypesValid" : false,
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
exports.operation0 = function (node,manager) {
/*
var approvedDescription = manager.executeInWorkspace("Approved", function(approvedManager) {
	logger.info("approvedManager="+approvedManager);
	
     return approvedManager.getObjectFromOtherManager(node).getTitle();
});
logger.info("approvedDescription="+approvedDescription);


function f(m) {
   logger.info("f.m="+m);
} 

manager.executeWritePrivileged(f);


manager.executeWritePrivileged(function(m) {
	logger.info("m="+m);
	return null;
 });
*/

manager.executeWritePrivileged(function(otherManager){
	logger.info("otherManager="+otherManager);
	var wfI = node.getWorkflowInstanceByID("CreateItem");
	if (wfI!=null) {
		wfI.delete("Removing from Workflow"); 
	}
	else {
		logger.info("not in workflow");
	}
});

 
/*
manager.executeWritePrivileged(function(privilegedManager) {
		logger.info("privilegedManager="+privilegedManager);
		var privilegedNode = privilegedManager.getObjectFromOtherManager(node);
		logger.info("privilegedNode="+privilegedNode);
		privilegedNode.getWorkflowInstanceByID("CreateItem").delete("Workflow is completed. Object automatically removed from Workflow");  
	}
);
*/
}