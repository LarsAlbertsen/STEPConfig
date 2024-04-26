/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ELFRCreateManyItems",
  "type" : "BusinessAction",
  "setupGroups" : [ "ELFRBRGroup" ],
  "name" : "ELFRCreateManyItems",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "Leaf", "Level4" ],
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
    "alias" : "parent",
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
    "contract" : "ObjectTypeBindContract",
    "alias" : "itemType",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "Item",
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
exports.operation0 = function (parent,logger,itemType,manager) {
var wf = manager.getWorkflowHome().getWorkflowByID('CreateItem')

for (var ix = 1; ix<=15000; ix++) {
	var item = parent.createProduct(ix + '_ELFRITEM', itemType.getID())
	item.setName(item.getID())
	item.getValue('ItemKey').setSimpleValue(item.getID())
	item.getValue('ValueFromVG').setSimpleValue(item.getID())
	logger.info(item.getID())
	wf.start(item, 'ELFR')
}
}