/************************************
@Author		:Accord Fintech Pvt. Ltd.
*************************************/
var pagename;
$(document).ready(function () {
    pagename = $("#hidenpagename").val();
    /***Sipcalculator start***/
    if (pagename == "sip-calculator") {
        $("#range1").ionRangeSlider({
            hide_min_max: false,
            keyboard: true,
            step: .1,
            min: 0,
            from: 5000,
            from_min: 500,
            max: 10000000,
            type: 'single',
            step: 1,
            prefix: "",
            prettify_enabled: true,
            prettify_separator: ",",
            grid: false,
            grid_num: 10,
            prettify: function (value) {
                if (value >= 1000 && value < 100000) {
                    return (value / 1000) + ' K';
                }
                else if (value >= 100000 && value < 10000000) {
                    return (value / 100000) + ' Lac';
                }
                else if (value == 10000000) {
                    return (value / 10000000) + ' Cr';
                }
                else {
                    return value;
                }
            },
            onChange: function (data) {
                to = $("#range1").data("from");
                $("#sipamnttxt").val(to);
                sipcalculations();
            }
        });
        $("#range2").ionRangeSlider({
            hide_min_max: false,
            keyboard: true,
            step: 1,
            min: 0,
            max: 100,
            from: 12,
            from_min: 1,
            type: 'single',
            prefix: "",
            grid: false,
            grid_num: 10,
            onChange: function (data) {
                to = $("#range2").data("from");
                $("#expctintresttxt").val(to);
                sipcalculations();
            }
        });

        $("#range3").ionRangeSlider({
            hide_min_max: false,
            keyboard: true,
            step: 1,
            min: 0,
            max: 35,
            from: 1,
            from_min: 1,
            type: 'single',
            prefix: "",
            grid: false,
            grid_num: 10,
            onChange: function (data) {
                to = $("#range3").data("from");
                $("#noofinsalltxt").val(to);
                setinvestduration(to);
                sipcalculations();
            }

        });
        $("#sipamnttxt,#noofinsalltxt").keypress(function (event) {
            if (event.which != 8 && isNaN(String.fromCharCode(event.which))) {
                event.preventDefault(); //stop character from entering input
            }

        });
        $("#expctintresttxt").keypress(function (event) {
            var charCode = (event.which) ? event.which : event.keyCode;
            if ((charCode != 46 || $(this).val().indexOf('.') != -1) && (charCode < 48 || charCode > 57) && charCode != 37 && charCode != 39 && charCode != 9 && charCode != 8 && charCode != 46)     // “.” CHECK DOT, AND ONLY ONE.
                event.preventDefault(); //stop character from entering input
            if (charCode != 9 && charCode != 37 && charCode != 39 && charCode != 46 && charCode != 8) {
                var max_chars = 4;
                if ($(this).val().length >= max_chars) {
                    $(this).val($(this).val().substr(0, max_chars));
                    event.preventDefault();
                }
            }


        });
        $("#sipamnttxt").blur(function () {
            minmax(this.id, 'range1', '500', '10000000');
            sipcalculations();
        });
        $("#expctintresttxt").blur(function () {
            minmax(this.id, 'range2', '1', '100');
            sipcalculations();
        });
        $("#noofinsalltxt").blur(function () {
            minmax(this.id, 'range3', '1', '35');
            sipcalculations();
        });
        sipcalculations();
    }
    else if (pagename == "lumpsum-calculator") {

        /***Lumpsum start***/
        $("#range1").ionRangeSlider({
            hide_min_max: false,
            keyboard: true,
            step: .1,
            min: 0,
            from: 5000,
            from_min: 500,
            max: 10000000,
            type: 'single',
            step: 1,
            prefix: "",
            prettify_enabled: true,
            prettify_separator: ",",
            grid: false,
            grid_num: 10,
            prettify: function (value) {
                if (value >= 1000 && value < 100000) {
                    return (value / 1000) + ' K';
                }
                else if (value >= 100000 && value < 10000000) {
                    return (value / 100000) + ' Lac';
                }
                else if (value == 10000000) {
                    return (value / 10000000) + ' Cr';
                }
                else {
                    return value;
                }
            },
            onChange: function (data) {
                to = $("#range1").data("from");
                $("#lumpsumamnttxt").val(to);
                lumpsumcalculations();
            }
        });
        $("#range4").ionRangeSlider({
            hide_min_max: false,
            keyboard: true,
            step: 1,
            min: 0,
            max: 35,
            from: 3,
            from_min: 1,
            type: 'single',
            prefix: "",
            grid: false,
            grid_num: 10,
            onChange: function (data) {
                to = $("#range4").data("from");
                $("#lumpsumtenure").val(to);
                setinvestduration(to);
                lumpsumcalculations();
            }
        });
        $("#range2").ionRangeSlider({
            hide_min_max: false,
            keyboard: true,
            step: 0.1,
            min: 0,
            max: 100,
            from: 12,
            from_min: 1,
            type: 'single',
            prefix: "",
            grid: false,
            grid_num: 10,
            onChange: function (data) {
                to = $("#range2").data("from");
                $("#expctintresttxt").val(to);
                lumpsumcalculations();
            }
        });
        $("#lumpsumamnttxt").blur(function () {
            minmax(this.id, 'range1', '5000', '10000000');
            lumpsumcalculations();
        });
        $("#lumpsumtenure").blur(function () {
            minmax(this.id, 'range4', '1', '35');
            lumpsumcalculations();
        });
        $("#expctintresttxt").blur(function () {
            minmax(this.id, 'range2', '12', '100');
            lumpsumcalculations();
        });

        lumpsumcalculations();
    }


});
function resetallvalues() {
    $("#sipamnttxt").val(5000);
    minmax("sipamnttxt", 'range1', '5000', '10000000');
    $("#expctintresttxt").val(1);
    minmax("expctintresttxt", 'range2', '12', '100');
    $("#noofinsalltxt").val(1);
    minmax("noofinsalltxt", 'range3', '1', '35');
    $(".savemoneyfront_list ul li").removeClass('active')
    $(".savemoneyfront_list ul li:nth-child(2)").addClass('active');
    $(".sipfrequency input:checked").prop('checked', false);
    $("#monthly").prop('checked', true);
}
function minmax(id, sliderid, min, max) {
    var value = parseInt($("#" + id).val());

    if (value < min || isNaN(value))
        $("#" + id).val(min)
    else if (value > max)
        $("#" + id).val(max)

    var slider = $("#" + sliderid).data("ionRangeSlider");
    slider.update({ from: $("#" + id).val(), keyboard: true });
    if (id == "noofinsalltxt") {
        setinvestduration($("#noofinsalltxt").val());
    }
}

function setsipfreq(freqval) {
    $("#hidensipfreqset").val(freqval);
    setinvestduration($("#noofinsalltxt").val());
}
function setinvestduration(setvalue) {
    var selectedvalue = $(".savemoneyfront_list ul li.active label input[type='radio']").val();
    var instaldurmnth, instalduryear;

    if (selectedvalue == "1") {

        var totomnth = Math.round(parseFloat(setvalue) * 0.230137);
        instalduryear = Math.round((parseFloat(totomnth)) / 12);
        instaldurmnth = Math.round((parseFloat(totomnth)) % 12);
        if (setvalue <= 4)
        { instalduryear = 0; instaldurmnth = 1 }

    }
    else if (selectedvalue == "2") {
        instalduryear = parseInt(parseInt(setvalue) / 12);
        instaldurmnth = parseFloat(parseInt(setvalue) % 12);
    }
    else if (selectedvalue == "3") {
        instalduryear = parseInt((parseInt(setvalue) * 3) / 12);
        instaldurmnth = parseFloat((parseInt(setvalue) * 3) % 12);
    }
    else if (selectedvalue == "4") {
        instalduryear = parseInt((parseInt(setvalue) * 6) / 12);
        instaldurmnth = parseFloat((parseInt(setvalue) * 6) % 12);
    }

    $("#Investduryears").html(parseInt(instalduryear));
    if (parseFloat(instaldurmnth) == 0) {
        $("#monthlabel").hide();
        $("#Investdurmonths").hide();
    }
    else {
        $("#monthlabel").show();
        $("#Investdurmonths").show();
    }
    $("#Investdurmonths").html(parseFloat(instaldurmnth));

}

/***Sip Calculator start***/
function sipcalculations() {
    var sipamt = $("#sipamnttxt").val();
    var sipfrequency = $(".sipfrequency input:checked").attr("id");
    var expctintrest = $("#expctintresttxt").val();
    var noofinstallmnts = $("#noofinsalltxt").val();
    var yearsinvst = $.trim($("#Investduryears").html());
    var monthsinvst = $.trim($("#Investdurmonths").html());

    $("#sip_amount_span").html(indnumberformat(sipamt));
    $("#sip_frequency_span").html(sipfrequency);
    $("#sip_exinterest_rate_span").html(expctintrest);

    $("#years_span").html(yearsinvst);
    $("#months_span").html(monthsinvst);
    $("#sipcalcresults").show();
    SIPApieChart("sipamountResultGraph");
    //$('#sipcalcresultpopup').appendTo("body").modal('show');
    //$("#sipcalcresultpopup").modal('show');
    // resetallvalues();
}
function indnumberformat(numer) {
    x = numer.toString();
    var lastThree = x.substring(x.length - 3);
    var otherNumbers = x.substring(0, x.length - 3);
    if (otherNumbers != '')
        lastThree = ',' + lastThree;
    var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return res;
}
function sipcalcback() {
    $("#sipcalcinput").show();
    $("#sipcalcresults").hide();
}
function SIPApieChart(id) {
    var inputpanel = $("#sipCalculator").closest(".sipinputpanel");
    var params = {};
    var inputs = $(".sipinputpanel").find('.sipcalculatorinput');
    inputs.each(function (index) {
        var i = $(this);
        params[i.attr('id')] = i.val();
    });
    var radioinputs = inputpanel.find('.calculatorinputradio:checked');
    radioinputs.each(function (index) {
        var i = $(this);
        params[i.attr('name')] = i.val();
    });

    var result = idealake_calculators(params);
    if (result) {
        for (var i in result) {
            if (i == "graph") {
                chart = new AmCharts.AmPieChart();
                chart.dataProvider = result[i];
                chart.type = "pie";
                chart.innerRadius = "50%";
                chart.pullOutRadius = "10%";
                chart.titleField = 'title';
                chart.valueField = 'value';
                chart.colorField = 'color';
                chart.gradientType = "linear";
                chart.labelText = "[[percents]]%";
                chart.balloonText = "[[percents]]%";
                chart.startDuration = 0;
                chart.fontFamily = "open_sanssemibold";

                // LEGEND
                var legend = new AmCharts.AmLegend();
                legend.align = "center";
                legend.markerType = "circle";
                legend.markerSize = 10;
                legend.maxColumns = 1;
                legend.valueAlign = "left";
                chart.addLegend(legend);

                chart.write(id);
                chart.invalidateSize();
            }
            else if (i == "futurevalue") {
                $("#futurevalue_span").html(result[i]);
                $("#ExpectedAmount").html(result[i] + "<em>(" + formatKLC(result[i]) + ")</em>");
            }
            else if (i == "investment") {
                $("#investment_span").html(result[i]);
                $("#InvestmentAmount").html(result[i] + "<em>(" + formatKLC(result[i]) + ")</em>");
            }
            else if (i == "earnings") {
                $("#earnings_span").html(result[i]);
                $("#WealthGain").html(result[i] + "<em>(" + formatKLC(result[i]) + ")</em>");
            }
        }
    }
}
function idealake_calculators(params) {
    var result = {};
    var res = 0, finalres = 0, prevvalue = 0, curentvalue = 0, intrestrate = 0, totinstallment;
    var durmnth, duryear;

    switch (params.sip_frequency) {
        case "1":
            var res = 0, finalres = 0;
            totinstallment = parseFloat(params.noofinsalltxt); // parseInt(parseFloat(params.noofinsalltxt) * 4.34524);
            for (var i = 1; i <= parseInt(totinstallment); i++) {
                var n2 = Math.pow((1 + parseFloat(params.expctintresttxt) / 1200), (parseInt(totinstallment) * .2307 - (i - 1) * .2307));
                res = parseFloat(params.sipamnttxt) * n2;
                finalres = finalres + res;
            }
            result.futurevalue = finalres;
            var totomnth = Math.round(parseInt(totinstallment) * 0.230137);
            duryear = Math.round((parseInt(totomnth)) / 12);
            durmnth = Math.round((parseInt(totomnth)) % 12);
            break;

        case "2":
            var res = 0, finalres = 0;
            for (var i = 1; i <= parseInt(params.noofinsalltxt * 12); i++) {
                var n2 = Math.pow((1 + parseFloat(params.expctintresttxt) / 1200), (parseInt(params.noofinsalltxt) * 12 - (i - 1) * 1));
                res = parseFloat(params.sipamnttxt) * n2;
                finalres = finalres + res;
            }
            totinstallment = params.noofinsalltxt * 12;
            result.futurevalue = finalres;
            duryear = parseInt(parseInt(totinstallment));
            durmnth = parseFloat(parseInt(totinstallment) * 12);
            break;



        case "3":
            var res = 0, finalres = 0;
            totinstallment = parseFloat(params.noofinsalltxt); // parseInt(parseFloat(params.noofinsalltxt) / 3);
            for (var i = 1; i <= parseInt(totinstallment); i++) {
                var n2 = Math.pow((1 + parseFloat(params.expctintresttxt) / 1200), (parseInt(totinstallment) * 3 - (i - 1) * 3));
                res = parseFloat(params.sipamnttxt) * n2;
                finalres = finalres + res;
            }
            result.futurevalue = finalres;
            duryear = parseInt((parseInt(totinstallment) * 3) / 12);
            durmnth = parseFloat((parseInt(totinstallment) * 3) % 12);
            break;

        case "4":
            var res = 0, finalres = 0;
            totinstallment = parseFloat(params.noofinsalltxt); // parseInt(parseFloat(params.noofinsalltxt) / 6);
            for (var i = 1; i <= parseInt(totinstallment); i++) {
                var n2 = Math.pow((1 + parseFloat(params.expctintresttxt) / 1200), (parseInt(totinstallment) * 6 - (i - 1) * 6));
                res = parseFloat(params.sipamnttxt) * n2;
                finalres = finalres + res;
            }
            result.futurevalue = finalres;
            duryear = parseInt((parseInt(totinstallment) * 6) / 12);
            durmnth = parseFloat((parseInt(totinstallment) * 6) % 12);
            break;

        default:
            result.futurevalue = 0;
            result.years = 0;
            result.months = 0;
            break;
    }

    var futurevalue = Math.round(result.futurevalue.toFixed(2));
    var investment = Math.round((params.sipamnttxt * totinstallment).toFixed(2));
    var earnings = Math.round((futurevalue - investment).toFixed(2));


    //   $("#years_span").html(parseInt(params.noofinsalltxt / 12)); 
    //  $("#months_span").html(parseInt(params.noofinsalltxt % 12)); 

    $("#years_span").html(Math.round(duryear)); // parseInt(duryear)
    $("#months_span").html(Math.round(durmnth)); // parseInt(durmnth)

    if (parseInt(durmnth) == 0) {
        $("#months_span").hide();
        $("#monthlabelpop").hide();
    } else {
        $("#months_span").show();
        $("#monthlabelpop").show();
    }

    $("#num_of_installment_span").html(totinstallment);

    result.futurevalue = formatNumber(futurevalue);
    result.years = parseInt(params.noofinsalltxt);
    result.months = parseInt(params.noofinsalltxt * 12);
    result.investment = formatNumber(investment);
    result.earnings = formatNumber(earnings);
    result.graph = [{ title: 'Investment', value: investment, color: '#1e366b' }, { title: 'Earnings', value: earnings, color: '#00beff'}];
    return result;
}

/*Formatting Number*/
function formatNumber(number) {
    x = number.toString();
    var splitNo = x.split('.');
    var lastThree = splitNo[0].substring(splitNo[0].length - 3);
    var otherNumbers = splitNo[0].substring(0, splitNo[0].length - 3);
    if (splitNo.length > 1) {
        if (otherNumbers != '')
            lastThree = ',' + lastThree + '.' + splitNo[1];
    }
    else {
        if (otherNumbers != '')
            lastThree = ',' + lastThree;
    }
    var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return res
}
/***Sip Calculator end***/
function formatKLC(e) {
    e = e.replace(/\,/g, '');
    e = parseInt(e, 10);
    return ret = 999 < e && e < 99999 ? (e / 1e3).toFixed(1) + " K" : 99999 < e && e < 9999999 ? (e / 1e5).toFixed(1) + " Lac" : 9999999 < e ? (e / 1e7).toFixed(1) + " Cr" : e,
    ret
}