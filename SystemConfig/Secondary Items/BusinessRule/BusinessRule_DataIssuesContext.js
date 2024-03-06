/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "DataIssuesContext",
  "type" : "BusinessCondition",
  "setupGroups" : [ "LAALBRGroup" ],
  "name" : "DataIssuesContext",
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
  "pluginId" : "JavaScriptBusinessConditionWithBinds",
  "binds" : [ {
    "contract" : "CurrentObjectBindContract",
    "alias" : "node",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "GTIN",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "GTIN",
    "description" : null
  }, {
    "contract" : "DataIssuesContextBind",
    "alias" : "diReport",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,GTIN,diReport) {
diReport.addError("Data Issues: addError", node, GTIN);
diReport.addWarning("Data Issues: addWarning", node, GTIN);
diReport.addInfo("Data Issues: addInfo", node, GTIN);
diReport.addAcknowledgment("Data Issues: addAcknowledgment", node, GTIN);


return (diReport);


}