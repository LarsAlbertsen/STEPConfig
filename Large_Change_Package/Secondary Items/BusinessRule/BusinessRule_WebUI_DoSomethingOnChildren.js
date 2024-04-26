/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "WebUI_DoSomethingOnChildren",
  "type" : "BusinessAction",
  "setupGroups" : [ "LAALBRGroup" ],
  "name" : "WebUI_DoSomethingOnChildren",
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
    "contract" : "WebUiContextBind",
    "alias" : "web",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,web) {
logger.info("Node="+node);
logger.info("Web="+web);
if (web!=null) {
	var selected = web.getSelection();
	for (var i=0; i<selected.size(); i++) {
		logger.info("i+"+i+"="+selected.get(i));
	}
}
}