/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ELFRTest",
  "type" : "BusinessAction",
  "setupGroups" : [ "ELFRBRGroup" ],
  "name" : "ELFRTest",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "Operator user-type root" ],
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
    "contract" : "LoggerBindContract",
    "alias" : "logger",
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
exports.operation0 = function (node,logger,manager) {
/*var user = manager.getUserHome().getUserByID('ELFR')

user.getValues().toArray().forEach(function(v) {
	logger.info(v.getAttribute().getID() + ' ' + v.getSimpleValue())	
})

var method = user.getClass().getMethod('getLog')
var res = method.invoke(user)
logger.info(res)
*/

logger.info(node.getTitle())

manager.executeInContext('Context1', function(m) {
	var n = m.getObjectFromOtherManager(node)	
	n.setName('aaaa')
})
logger.info(node.getTitle())

throw new RuntimeException('adsfasdf')
}