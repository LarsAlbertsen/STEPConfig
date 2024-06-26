/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ClassificationsAndAssets_NodeHandler",
  "type" : "BusinessAction",
  "setupGroups" : [ "Actions" ],
  "name" : "ClassificationsAndAssets_NodeHandler",
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
  "binds" : [ ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function () {
// Node Handler Source bound to nodeHandlerSource
// Node Handler Result bound to nodeHandlerResult
// ExecutionReportLogger bound to executionReportLogger

var simpleEventType = nodeHandlerSource.getSimpleEventType();
if (simpleEventType == null) {
  executionReportLogger.logInfo("No event information available in node handler");
} else {
  executionReportLogger.logInfo("Event with ID '" + simpleEventType.getID()+ "' passed to node handler");
}
var node = nodeHandlerSource.getNode();
if (node != null && node instanceof com.stibo.core.domain.Product) {
  executionReportLogger.logInfo("Node handler handling product with URL: " + node.getURL());
  var mesg = {};
  mesg.stepid = node.getID() + "";
  //mesg.ean = node.getValue("EAN").getSimpleValue() + "";
  if (nodeHandlerSource.isDeleted()) {
    nodeHandlerResult.addMessage("delete", JSON.stringify(mesg));	
  } else {
    mesg.category = node.getParent() == null ? null : node.getParent().getID() + "";
    mesg.shortDescription = 'sd' // node.getValue("ShortDescription").getSimpleValue() + "";
    mesg.manufacturerName = 'm' //node.getValue("ManufacturerName").getSimpleValue()+ "";
    mesg.color = 'c' // node.getValue("Color").getSimpleValue()+ "";
    nodeHandlerResult.addMessage("upsert", JSON.stringify(mesg));	
  }
}

}