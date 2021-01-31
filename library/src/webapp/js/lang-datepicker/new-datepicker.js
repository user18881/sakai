var default_opts = {
  initialValue : false,
  responsive : true,
  observer: true,
  calendar : {
    persian : {
      locale : "fa"
    },
    gregorian :{
      locale : "fa"
    }
  },
  format: 'DD/MM/YYYY hh:mm:ss a',
  toolbox : {
    submitButton :{
      enabled : true
    },
    calendarSwitch :{
      enabled : false
    },
    todayButton : {
      enabled : true
    }
  },
  timePicker : {
      enabled: true,
      step: 1,
      hour: {
        enabled: true,
        step: 1
      },
      minute: {
          enabled: true,
          step: 1
        },
      second: {
          enabled: false
      },
      meridian: {
          enabled: true
        }
  }
}

var pickers = [
  {
    id : '#assessmentSettingsAction\\:startDate',
    picker : null
  },
  {
    id : '#assessmentSettingsAction\\:endDate',
    picker : null
  },
  {
    id : '#assessmentSettingsAction\\:retractDate',
    picker : null
  },
  {
    id : '#assessmentSettingsAction\\:feedbackDate',
    picker : null
  },
  {
    id : '#assessmentSettingsAction\\:feedbackEndDate',
    picker : null
  },
  {
    id : '#assessmentSettingsAction\\:newEntry-start_date',
    picker : null
  },
  {
    id : '#assessmentSettingsAction\\:newEntry-due_date',
    picker : null
  },
  {
    id : '#assessmentSettingsAction\\:newEntry-retract_date',
    picker : null
  }
]



var setHiddenFields = function (d, o) {
  moment.locale("en");
  if(o.ashidden !== undefined) {
    jQuery.each(o.ashidden, function(i, h) {
      var oldValue = jQuery('#' + h).val();
      var newValue = '';
      if(d != null){
        switch(i) {
          case "month":
            newValue = d.getMonth() + 1;
            break;
          case "day":
            newValue = d.getDate();
            break;
          case "year":
            newValue = d.getFullYear();
            break;
          case "hour":
            newValue = (o.ampm == true) ? moment(d).format('hh') : moment(d).format('HH');
            break;
          case "minute":
            newValue = moment(d).format('mm');
            break;
          case "ampm":
            newValue = moment(d).format('A').toLowerCase();
            break;
          case "iso8601":
            newValue = moment(d).format();
            break;
        }
      }
      jQuery('#' + h).val(newValue);
      // If new value is different from the previous one, launch change event on hidden input
      if (oldValue != newValue) {
        jQuery('#' + h).change();
      }
    });
  }
}


var localDatePicker = function(opts) {

  $(document).ready(function() {
    var datepickerapi =  $(opts.input).pDatepicker(default_opts);
    
    pickers.forEach(obj => function() {
      if(obj.id === opts.input){
        obj.picker = datepickerapi;
      }
    });

    datepickerapi.options.toolbox.submitButton.onSubmit = function(){
      
      var d = datepickerapi.getState().selected.dateObject.toDate();
      setHiddenFields(d, opts);
    }
    datepickerapi.options.onSelect = function() {
      var d = datepickerapi.getState().selected.dateObject.toDate();
      setHiddenFields(d, opts);
    }
    datepickerapi.options.onSet = function() {
      var d = datepickerapi.getState().selected.dateObject.toDate();
      setHiddenFields(d, opts);
    }
    datepickerapi.options.toolbox.todayButton.onToday = function() {

      if (portal.serverTimeMillis && portal.user && portal.user.offsetFromServerMillis) {
        let osTzOffset = (new Date()).getTimezoneOffset();
        var t = moment(parseInt(portal.serverTimeMillis))
          .add(portal.user.offsetFromServerMillis, 'ms')
          .add(osTzOffset, 'm')
          .toDate();
          datepickerapi.setDate(t.getTime());
      }
      else {      
        var d = datepickerapi.getState().selected.dateObject.toDate();
        setHiddenFields(d, opts);
      }

    }
    if(  $(opts.input).val() ){
      var c = moment( $(opts.input).val(), "MM/DD/YYYY hh:mm:ss a" ).toDate();
      datepickerapi.setDate(c.getTime());
    }
  });



  if(opts.ashidden !== undefined) {
    var inp = opts.input;
    jQuery.each(opts.ashidden, function(i, h) {
      if ($('#' + h).length < 1) {
        jQuery(inp).after('<input type="hidden" name="' + h + '" id="' + h + '" value="">');
      }
    });
  }

 
}

var updateDateBoxes = function() {
  pickers.forEach( p => function() {
    if($(p.id).val() ){
      var da = moment( p.picker.getState().selected.dateObject.toDate() );
      $(p.id).val(da.format("MM/DD/YY hh:mm:ss a"));
    }
  })
}


