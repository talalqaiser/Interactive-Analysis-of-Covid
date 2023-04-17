const xlabels = [];
const ycases = [];
const ytotalcases = [];
const ydeaths = [];
const ytotaldeaths = [];
const ytests = [];
const ytotaltests = [];

chartit();

async function chartit() {
    
    await getData();
    
    const ctx = document.getElementById('chart').getContext('2d');
    const config = {
        type: 'line',
        data: {
            labels: xlabels,
            datasets: [{
                label: 'Covid Cases',
                data: ycases,
                backgroundColor: 'green',
                borderColor: 'green',
                borderWidth: 1
            },{
                label: 'Covid Deaths',
                data: ydeaths,
                backgroundColor: 'black',
                borderColor: 'black',
                borderWidth: 1
            },{
                label: 'Covid Tests',
                data: ytests,
                backgroundColor: 'cyan',
                borderColor: 'cyan',
                borderWidth: 1
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Analysis Between Covid Cases, Deaths and Tests',
                    padding: {
                        top: 30,
                        bottom: 20
                    }
                }
            }
        }
    }
    const myChart = new Chart(ctx, config);
    
    $("#Individual").click(function() {
        var data = myChart.config.data;
        data.datasets[0].data = ycases;
        data.datasets[1].data = ydeaths;
        data.datasets[2].data = ytests;
        data.labels = xlabels;
        myChart.update();
    });
    
    $("#Cummulative").click(function() {
        var data = myChart.config.data;
        data.datasets[0].data = ytotalcases;
        data.datasets[1].data = ytotaldeaths;
        data.datasets[2].data = ytotaltests;
        data.labels = xlabels;
        myChart.update();
    });
}

async function getData() {
    const response = await fetch('Norway Covid Data.csv');
    const data = await response.text();
    
    const table = data.split('\n').slice(646);
    table.forEach(row => {
        const columns = row.split(',');
        const date = columns[0];
        xlabels.push(date);
        const cases = columns[2];
        ycases.push(cases);
        const totalcases = columns[1];
        ytotalcases.push(totalcases);
        const deaths = columns[4];
        ydeaths.push(deaths);
        const totaldeaths = columns[3];
        ytotaldeaths.push(totaldeaths);
        const tests = columns[5];
        ytests.push(tests);
        const totaltests = columns[6];
        ytotaltests.push(totaltests);
    })
}