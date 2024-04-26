/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "aa",
  "type" : "BusinessAction",
  "setupGroups" : [ "Actions" ],
  "name" : "aa",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ ],
  "allObjectTypesValid" : false,
  "runPrivileged" : false,
  "onApprove" : "Never",
  "dependencies" : [ ]
}
*/
/*===== business rule plugin definition =====
{
  "pluginId" : "CreateAssetFromURLOperation",
  "parameters" : [ {
    "id" : "AssetObjectType",
    "type" : "com.stibo.core.domain.ObjectType",
    "value" : null
  }, {
    "id" : "AssetReferenceType",
    "type" : "com.stibo.core.domain.ReferenceType",
    "value" : null
  }, {
    "id" : "AutoApprove",
    "type" : "java.lang.Boolean",
    "value" : "false"
  }, {
    "id" : "NodeURLAttribute",
    "type" : "com.stibo.core.domain.Attribute",
    "value" : null
  } ],
  "pluginType" : "Operation"
}
*/

/*===== business rule plugin definition =====
{
  "pluginId" : "JavaScriptBusinessActionWithBinds",
  "binds" : [ ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation1 = function () {

}