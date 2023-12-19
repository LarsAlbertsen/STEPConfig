/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "InspectWorkflow",
  "type" : "BusinessAction",
  "setupGroups" : [ "LAALBRGroup" ],
  "name" : "InspectWorkflow",
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

var wf = manager.getWorkflowHome().getWorkflowByID("CreateItem")
logger.info("WF "+wf);

wf.getStates().toArray().forEach(
	function(state) {
		logger.info("STATE "+state);
		if (state instanceof com.stibo.core.domain.state.State) {
			logger.info("  isStateFlowFinal "+state.isStateFlowFinal());
			logger.info("  isInitial "+state.isInitial());
			logger.info("  isFinal "+state.isFinal());
			logger.info("  isParallel "+state.isParallel())
		}
	}
);



//.toArray().forEach(function(v)
}