function generateStatisticPage(root, callback){
    root.innerHTML=`
    <div class="statis">
      <div id="piechart"></div>
    </div>
    `
    callback()
}
function statisticPageFuncs(){
    function generateSta(callback){
      const baza = []
      fetch('/api/branch/getStatistic')
      .then(res => res.json())
      .then(data => data.forEach(item =>{
        baza.push({name: item.name, employeeCount: item.employeeCount})
      }))
      .then(callback(baza))
    }
    generateSta(statisticHelp)
    function statisticHelp(baza){
      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);
      function drawChart(){  
        var info = new google.visualization.DataTable();
        var options, chart
        info.addColumn('string', 'Branch');
        info.addColumn('number', 'Count');
        baza.forEach(item =>{
          info.addRow([item.name, item.employeeCount])
        })
          options = {
            title: 'Hamroh filiallarida ishchilar soni'
          },
          chart = new google.visualization.PieChart(document.getElementById('piechart')),
          chart.draw(info, options)
      }
    }                
}