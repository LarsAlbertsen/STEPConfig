/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "WebUI_HideBullets",
  "type" : "BusinessCondition",
  "setupGroups" : [ "Conditions" ],
  "name" : "WebUI_HideBullets",
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
    "contract" : "HiddenContextBind",
    "alias" : "hidden",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "ManagerBindContract",
    "alias" : "manager",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "SimpleValueBindContract",
    "alias" : "bullet01V",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "Bullet01",
    "description" : null
  }, {
    "contract" : "CurrentObjectBindContract",
    "alias" : "currentNode",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "SimpleValueBindContract",
    "alias" : "bullet02V",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "Bullet02",
    "description" : null
  }, {
    "contract" : "MandatoryContextBind",
    "alias" : "mandatory",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (hidden,manager,bullet01V,currentNode,bullet02V,mandatory) {
if (currentNode==null) {
	// From init
	return true;
}

logger.info("WebUI_HideBullets on "+currentNode);
var attrHome = manager.getAttributeHome();
var bullet01A = attrHome.getAttributeByID("3b8d7d7e-9ff9-4b2b-99ca-57a1ba19eb94");
var bullet02A = attrHome.getAttributeByID("15271107-6854-40a9-bcd6-b320407d8544");
var bullet03A = attrHome.getAttributeByID("fed33381-f352-458d-9732-11e1053008c2");

logger.info("WebUI_HideBullets_2");

if (bullet01A==null || bullet02A==null) {
	logger.info("WebUI_HideBullets_2 - NULL Bullets");
	return true;
}
mandatory.setMandatory(currentNode, bullet01A);
mandatory.setMandatory(currentNode, bullet02A);

logger.info("WebUI_HideBullets_3");

if (bullet01V==null) {
	logger.info("Hiding Bullet02");
	hidden.setHidden(currentNode, bullet02A)
}
if (bullet02V==null) {
	logger.info("Hiding Bullet03");
	hidden.setHidden(currentNode, bullet03A)
}

//hidden.setHidden(currentNode, bullet02A)
//return "["+bullet01V+"]";
return true;
}