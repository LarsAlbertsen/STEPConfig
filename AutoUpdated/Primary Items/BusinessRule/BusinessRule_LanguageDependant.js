/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "LanguageDependant",
  "type" : "BusinessAction",
  "setupGroups" : [ "Actions" ],
  "name" : "LanguageDependant",
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
var lovValue = manager.getListOfValuesHome().getListOfValuesByID("LanguageDependantLOV").getListOfValuesValueByID(1);
var d = lovValue.isLanguageInherited() // --> does not work, because it is not available in the standard API 


logger.info("d="+d)

}