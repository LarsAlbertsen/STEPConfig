/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "QueryExample",
  "type" : "BusinessAction",
  "setupGroups" : [ "LAALBRGroup" ],
  "name" : "QueryExample",
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
logger.info(" ");
logger.info("Units");
manager.getUnitHome().queryAllUnits().forEach(function(u) {
	//logger.info("u="+u.getTitle())
	return true
})

logger.info(" ");
logger.info("ReferenceTypes");
manager.getReferenceTypeHome().getAllReferenceTypes().forEach(function(r) {
	logger.info("r="+r.getTitle());
});

logger.info(" ");
logger.info("LinkTypes");
manager.getLinkTypeHome().getClassificationProductLinkTypes().forEach(function(r) {
	logger.info("l="+r.getTitle());
});

logger.info(" ");
logger.info("getListOfValues");
manager.getListOfValuesHome().getListOfValues().forEach(function(r) {
	//logger.info("lov="+r.getTitle());
});


printLOVGroup(manager.getListOfValuesHome().getTopListOfValuesGroup(), "")


function printLOVGroup(lovGroup, indent) {
	logger.info(indent+"lovGroup="+lovGroup.getTitle());
	manager.getListOfValuesHome().getListOfValues().forEach(function(r) {
		logger.info(indent+"lov="+r.getTitle());
	
	})
	lovGroup.getChildren().toArray().forEach(function(c) {
		printLOVGroup(c, indent+"_")
	})
}


}