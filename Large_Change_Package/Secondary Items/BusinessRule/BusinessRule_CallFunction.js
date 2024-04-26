/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "CallFunction",
  "type" : "BusinessAction",
  "setupGroups" : [ "Actions" ],
  "name" : "CallFunction",
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
    "alias" : "node",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "ManagerBindContract",
    "alias" : "step",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,step) {

var arg = new java.util.HashMap();
arg.put("input", "MyStringArg")



var myFunction = step.getBusinessRuleHome().getBusinessFunctionByID("MyFunction");
logger.info("myFunction = "+myFunction)

var h = step.getHome(com.stibo.core.domain.businessrule.plugin.function.proxy.unstable.home.BusinessFunctionProxyHome);
logger.info("h = "+h);


var result = h.evaluate(myFunction, arg)
logger.info("result = "+ result)

}