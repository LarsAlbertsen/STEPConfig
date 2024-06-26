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
  "binds" : [ {
    "contract" : "OutboundBusinessProcessorNodeHandlerSourceBindContract",
    "alias" : "nodeHandlerSource",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "OutboundBusinessProcessorExecutionReportLoggerBindContract",
    "alias" : "executionReportLogger",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "OutboundBusinessProcessorNodeHandlerResultBindContract",
    "alias" : "nodeHandlerResult",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (nodeHandlerSource,executionReportLogger,nodeHandlerResult) {
// Node Handler Source bound to nodeHandlerSource
// Node Handler Result bound to nodeHandlerResult
// ExecutionReportLogger bound to executionReportLogger

var node = nodeHandlerSource.getNode();

if (node != null) {
  executionReportLogger.logInfo("Node handler handling object with URL: " + node.getURL());
  var message = ''
  var mesg = {};
  mesg.stepid = node.getID() + "";
  message += (node.getClass().getSimpleName() + 't')
  message += (node.getID() + '\t')

  //mesg.ean = node.getValue("EAN").getSimpleValue() + "";
  if (nodeHandlerSource.isDeleted()) {
    nodeHandlerResult.addMessage("delete", JSON.stringify(mesg));
  }
  else {
    message += ('C' + '\t')
    message += ('sd' + '\t')
    message += ('m' + '\t')
    message += ('c' + '\t')

    mesg.category = 'C' // node.getParent() == null ? null : node.getParent().getID() + "";
    mesg.shortDescription = 'sd' // node.getValue("ShortDescription").getSimpleValue() + "";
    mesg.manufacturerName = 'm' //node.getValue("ManufacturerName").getSimpleValue()+ "";
    mesg.color = 'c' // node.getValue("Color").getSimpleValue()+ "";
    nodeHandlerResult.addMessage("data", message);
  }
}

}