/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "LookupTable",
  "type" : "BusinessAction",
  "setupGroups" : [ "LAALBRGroup" ],
  "name" : "LookupTable",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "Product user-type root" ],
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
logger.info("begin");
var h = manager.getHome(com.stibo.lookuptable.domain.LookupTableHome);
var v = h.getLookupTableValue("My Lookup Table", "MyFrom");
logger.info("v="+v);

var table = h.getLookupTable("My Lookup Table");
var data = table.getSubstitutionData();
logger.info("data="+data);
data.put("Hello", "World");
table.setSubstitutionData(data);
logger.info("After "+table.getSubstitutionData());

}