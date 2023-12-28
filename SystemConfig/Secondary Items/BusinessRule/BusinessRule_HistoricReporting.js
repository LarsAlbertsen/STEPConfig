/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "HistoricReporting",
  "type" : "BusinessFunction",
  "setupGroups" : [ "LAALBRGroup" ],
  "name" : "HistoricReporting",
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
  "pluginId" : "JavaScriptBusinessFunctionWithBinds",
  "binds" : [ ],
  "messages" : [ ],
  "pluginType" : "Operation",
  "functionReturnType" : "java.lang.String",
  "functionParameterBinds" : [ {
    "contract" : "RevisionBindContract",
    "alias" : "revision",
    "parameterClass" : "null",
    "value" : null,
    "description" : ""
  } ]
}
*/
exports.operation0 = function (revision) {
return revision.getNode().getManager().getCurrentWorkspace()+" "+revision.getName();

/*var current = revision.getNode().getValue("founded").getSimpleValue();

if ("JAN 3 1794".equals(current)) {
  var predecessor = revision.getPredecessor();
  if (predecessor == null)
    return null; // initial value, this is not what you are looking for
  else {
    var formerValue = predecessor.getNode().getValue("founded").getSimpleValue();
    if ("JAN 3 1794".equals(formerValue))
      return null; // same before, do not report
    else
      return "found JAN 3 1794 changed from " + formerValue;
  }
} else
  return null;*/
}