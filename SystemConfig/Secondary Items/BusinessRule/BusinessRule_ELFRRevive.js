/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ELFRRevive",
  "type" : "BusinessAction",
  "setupGroups" : [ "ELFRBRGroup" ],
  "name" : "ELFRRevive",
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
exports.operation0 = function (logger,manager) {
var nodeHome = manager.getNodeHome()
var p = nodeHome.getObjectByKey('ItemKey', '107239')
if (p) {
	var p2 = manager.getProductHome().getProductByID(p.getID())
	if (!p2) {
		//When we cannot get by ID, it is in Recycle Bin
		p2 = p.getParent().createProduct(p.getID(), p.getObjectType())
		p2.setName(p.getName())
		p.getValues().toArray().forEach(function(v) {
			p2.getValue(v.getAttribute().getID()).setSimpleValue(v.getSimpleValue())	
		})
	}	
}
}