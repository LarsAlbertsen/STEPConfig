/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "Action1",
  "type" : "BusinessAction",
  "setupGroups" : [ "Actions" ],
  "name" : "Action1",
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
    "contract" : "DataIssuesContextBind",
    "alias" : "dir",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "BusinessActionBindContract",
    "alias" : "action2",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessActionImpl",
    "value" : "Action2",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (dir,action2) {

var result = action2.execute(this)
logger.info("isNonApplicable = "+result.isNonApplicable())
var issues = result.getDataIssuesReports()


//var myLocale = java.util.Locale.forLanguageTag("en_US")
//var c = new com.stibo.framework.localization.simple.SimpleLocalizerFactory()
//var localizer = c.getLocalizer(Locale.ROOT)

issues.forEach(function(dataIssuesReport) {
	logger.info("dataIssuesReport = "+ dataIssuesReport)
	dataIssuesReport.getDataIssues().forEach(function(singleIssue) {
		var msg = singleIssue.getMessage()
		logger.info("__singleIssue = "+singleIssue.getSeverity()+", "+msg)
	})
})

var err = result.toString()
logger.info("result "+err)
dir.addWarning("Hello From Action1")
dir.addWarning(err)
return dir

}