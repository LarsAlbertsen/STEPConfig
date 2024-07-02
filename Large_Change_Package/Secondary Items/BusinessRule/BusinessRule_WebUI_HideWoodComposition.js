/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "WebUI_HideWoodComposition",
  "type" : "BusinessCondition",
  "setupGroups" : [ "Conditions" ],
  "name" : "WebUI_HideWoodComposition",
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
    "alias" : "containwoodvar",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "ContainWood",
    "description" : null
  }, {
    "contract" : "CurrentObjectBindContract",
    "alias" : "currentNode",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "SimpleValueBindContract",
    "alias" : "portionofwoodvar",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "PortionOfWood",
    "description" : null
  }, {
    "contract" : "SimpleValueBindContract",
    "alias" : "primaryspeciesvar",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "PrimarySpecies",
    "description" : null
  }, {
    "contract" : "SimpleValueBindContract",
    "alias" : "primarymfrvar",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "PrimaryMfrLocation",
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
exports.operation0 = function (hidden,manager,containwoodvar,currentNode,portionofwoodvar,primaryspeciesvar,primarymfrvar,mandatory) {
var attrHome = manager.getAttributeHome();
var containwoodA = attrHome.getAttributeByID("ContainWood");
var portionofwoodA = attrHome.getAttributeByID("PortionOfWood");
var primaryspeciesA = attrHome.getAttributeByID("PrimarySpecies");
var primarymfrA = attrHome.getAttributeByID("PrimaryMfrLocation");

logger.info("Contains wood ["+containwoodvar+"]");
mandatory.setMandatory(currentNode, containwoodA);


if (containwoodvar == "No" || containwoodvar==null) {
	logger.info("Hiding PortionOfWood");
	hidden.setHidden(currentNode, portionofwoodA)
}
else {
	mandatory.setMandatory(currentNode, portionofwoodA)
}

if (containwoodvar == "No" || containwoodvar==null) {
	logger.info("Hiding PrimarySpecies");
	hidden.setHidden(currentNode, primaryspeciesA)
}
else {
	mandatory.setMandatory(currentNode, primaryspeciesA)
}

if (containwoodvar == "No" || containwoodvar==null) {
	logger.info("Hiding PrimaryMfrLocation");
	hidden.setHidden(currentNode, primarymfrA)
}
else {
	mandatory.setMandatory(currentNode, primarymfrA);
}

return true;
}