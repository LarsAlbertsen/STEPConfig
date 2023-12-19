/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "LAALValidators",
  "type" : "BusinessAction",
  "setupGroups" : [ "LAALBRGroup" ],
  "name" : "API_LAALValidators",
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
    "alias" : "item",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "LoggerBindContract",
    "alias" : "logger",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (item,logger) {



item.getValues().toArray().forEach(function(v) {
	if (v.getSimpleValue()!=null) {
		var attr = v.getAttribute();
		var validator = attr.getValidator();
		logger.info("Title "+attr.getTitle());
		logger.info("\tID\t"+attr.getID());
		logger.info("\tisNumeric\t"+validator.isNumeric());
		logger.info("\tgetValidUnits\t"+attr.getValidUnits());
		logger.info("\tgetValidatorMask\t"+attr.getValidatorMask());
		logger.info("\tgetValidatorMaxLength\t"+attr.getValidatorMaxLength());
		logger.info("\tgetValidatorMaxValue\t"+attr.getValidatorMaxValue());
		logger.info("\tgetValidatorMinValue\t"+attr.getValidatorMinValue());
		logger.info("\tgetValidatorName\t"+attr.getValidatorName());
		logger.info("\tgetValidatorMaxLength\t"+attr.getValidatorMaxLength());
		var valid = "OK";
		try {
			attr.validateValue("5");
		} catch (e) {
			valid = "ERROR "+e.javaException.getMessage();
		}
	
		logger.info("\tvalidation\t"+valid);
		logger.info(" ");
	}
});

// validateValue
}