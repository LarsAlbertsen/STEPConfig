/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "DemoVideo",
  "type" : "BusinessAction",
  "setupGroups" : [ "Actions" ],
  "name" : "DemoVideo",
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

var product = manager.getProductHome().getProductByID("76580")
var workflow = manager.getWorkflowHome().getWorkflowByID("New Product Workflow")


var wfI = product.getWorkflowInstance(workflow)
wfI.getTaskByID("Enrich").triggerLaterByID("submit", "autosubmit")

var wfI = product.getWorkflowInstance(workflow)
wfI.getTaskByID("Enrich").triggerLaterByID("submit", "Auto Submitting")




var wfI = product.getWorkflowInstance(workflow)
wfI.getTaskByID("Enrich").triggerLaterByID("submit", "Auto Submit")

}