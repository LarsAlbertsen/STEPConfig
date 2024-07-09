/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "user_date",
  "type" : "BusinessAction",
  "setupGroups" : [ "Actions" ],
  "name" : "user_date",
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

var u = manager.getUserHome().getUserByID("LAAL");



var allV = u.getValues()



logger.info("allV="+allV)

var uIt = allV.iterator()
while (uIt.hasNext()) {
    var v = uIt.next()
    logger.info("v="+v.getAttribute().getTitle() +" "+v.getSimpleValue())
}
}