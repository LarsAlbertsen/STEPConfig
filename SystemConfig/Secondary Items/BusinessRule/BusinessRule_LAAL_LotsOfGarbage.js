/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "LAAL_LotsOfGarbage",
  "type" : "BusinessAction",
  "setupGroups" : [ "LAALBRGroup" ],
  "name" : "LAAL_LotsOfGarbage",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "Item" ],
  "allObjectTypesValid" : false,
  "runPrivileged" : false,
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
  }, {
    "contract" : "LoggerBindContract",
    "alias" : "logger",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,manager,logger) {
var numberOfRevisions = 20;

var startTime = java.lang.System.currentTimeMillis();
var revBefore = node.getRevisions().size();
var count=0;
for (var r=0; r<1000; r++) {
	if (node.getRevisions().size()<numberOfRevisions) {
		//logger.info("r="+r);
		for (var i=1; i<=100; i++) {
			var attrID = "Garbage-"+i;
			var attr = manager.getAttributeHome().getAttributeByID(attrID);
			//logger.info(attr.getTitle());
			node.setSimpleValue(attr, java.util.UUID.randomUUID().toString());
		}
		count++;
		node.approve();
	}
}
if (count>0) {
	var endTime = java.lang.System.currentTimeMillis();
	logger.info("LotsOfGarbage ID="+node.getID()+" revBefore="+ revBefore + " revAfter="+ node.getRevisions().size()+   " revCreated="+count+ " time="+((endTime-startTime)/1000));
} else {
	logger.info("LotsOfGarbage Nothing for ID="+node.getID()+" revBefore="+ revBefore);
}

}