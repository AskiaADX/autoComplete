﻿(function () {
    var autocomplete = new autoComplete({
        menuClass: 'adc_{%= CurrentADC.InstanceId %}',
        selector: '#adc_{%= CurrentADC.InstanceId %}_input',
        databaseName: '{%:= CurrentADC.PropValue("databaseName")%}',
        searchField: '{%:= CurrentADC.PropValue("searchField")%}',
        minChars: {%:= CurrentADC.PropValue("minChars")%},
        responseInList: {%:= CurrentADC.PropValue("responseInList")%},
        inputIds: [{%  Dim i %}{% Dim ar = CurrentQuestion.ParentLoop.AvailableResponses %}{% Dim inputName %}{% For i = 1 To ar.Count %}{% inputName = CurrentQuestion.Iteration(ar[i].Index).InputName() %}"{%= inputName %}"{%:= On(i < ar.Count, ",","") %}{% Next i %}],
        dataFields: function() {
            var fields = [];
            for(var key in autoComplete.databases[this.databaseName][0]){
                fields.push(key);
            }
            return fields;
        },
        source: function(term, suggest){
            term = term.toLowerCase();
            var i = 0;
            var choices = autoComplete.databases[this.databaseName];
            var suggestions = [];
            var completeData = [];
            for (i = 0; n = choices.length, i < n;i++) {
                if (~choices[i][this.searchField].toLowerCase().indexOf(term)) {
                    suggestions.push(choices[i][this.searchField]);
                    completeData.push(JSON.stringify(choices[i]).replace(/"/g, "#"));
                }
            }
            suggest(suggestions,completeData);
        }
    });
} ());