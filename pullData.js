/**
 * Created by chand on 5/4/2017.
 */
google.load("visualization", "1", {packages:["corechart"]});
var chart;
var data;
var options;
var add_buton = document.getElementById('add');
var cList=[];

function getData() {
    var company=document.getElementById('company_name').value.toUpperCase();
    console.log(company);
    $.ajax({
        url: 'http://finance.google.com/finance/info?client=ig&q='+company,
        success: function(data){
            google.setOnLoadCallback(drawChart);
            var cName='t',stock='l'; //to get name of company
            console.log(data[0][cName]+" "+data[0][stock]); // since its inside an array of object

            cList.push({cName:data[0][cName],stock:data[0][stock]});
            drawChart(cList);

            var items = [], $ul;
            items.push('<li id="' + cName + '"><span class="name">' + data[0][cName] + '</span></li>');
            $ul = $('<ul />').appendTo('.content');
            $ul.append(items);
            },
        error: function(){ alert('error'); },
        dataType: 'jsonp'
    });
}
function drawChart(comList) {
    console.log(comList.length);
    var dataTable =new google.visualization.DataTable();
    dataTable.addColumn('string','Company');
    dataTable.addColumn('number','Stock');
    $.each(comList,function (key,value) {
        console.log("'"+value.cName+"'"+value.stock);
        var tempArr=[];
        tempArr.push(value.cName);
        tempArr.push(parseFloat(value.stock));
        dataTable.addRow(tempArr);
    })
    options = {
        title: 'Company Stocks',
        hAxis: {title: 'Company', titleTextStyle: {color: 'red'}},
        bars: 'horizontal'
    };
    chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
    chart.draw(dataTable, options);
/*    setTimeout(function() {
        getData();
    }, 5000)*/
}



