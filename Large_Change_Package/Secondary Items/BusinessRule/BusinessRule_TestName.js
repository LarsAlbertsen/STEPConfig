/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "TestName",
  "type" : "BusinessAction",
  "setupGroups" : [ "Actions" ],
  "name" : "TestName",
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
    "contract" : "CurrentObjectBindContract",
    "alias" : "productI",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (productI) {

/** @type {Product} */
var product = productI

var name = product.getName()


var value = product.getValue("sas")

var l = product.queryChildren().asList(10)

product.getWorkflowInstanceByID("sa").getTaskByID("sa").triggerLaterByID("sa")

logger.info("Name " +name )

}