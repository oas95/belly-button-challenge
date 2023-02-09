// Defining variable 
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

//Grabing data 
d3.json(url).then(function(data) {
    console.log(data);
});

// Starting Dashboard 
function init() {

    let ddMenu = d3.select("#selDataset");

    //Getting names
    d3.json(url).then((data)=> {
        
        //Setting variable for names
        let names = data.names;

        //Adding names to dd (drop down) menu
        names.forEach((id)=> {
            
            //Logging in id
            console.log(id);

            ddMenu.append("option")
            .text(id)
            .property("value", id);

        });
        
        //Setting the first name from list
        let sample_one = names[0];

        //Logging the value
        console.log(sample_one);
        
        //Building plots
        buildMetadata(sample_one);
        buildBarChart(sample_one);
        buildBubbleChart(sample_one);
    });
};
// Sample metadata 
function buildMetadata(sample) {

    // Retreving data
    d3.json(url).then((data) => {

        // Retrieving metaData
        let metadata = data.metadata;

        //Filtering
        let value = metadata.filter(result => result.id == sample);

        //Logging metadata after filter 
        console.log(value)

        //Getting first index
        let valueData = value[0];

        d3.select("#sample-metadata").html("");

        // Adding key/value pairs to panel
        Object.entries(valueData).forEach(([key, value]) => {

            //Logging individual key/value pairs 
            console.log(key, value);

            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });
    });

};
// Bar chart 
function buildBarChart(sample) {
    
    //Retreving Data
    d3.json(url).then((data) => {
        
        //Retreving Data samples
        let sampleInfo = data.samples;
        
        //Filtering 
        let value = sampleInfo.filter(result => result.id == sample);
        
        //Getting first indext
        let valueData = value[0];
        
        //Getting sample values, otuids, and otulabels
        let sample_values = valueData.sample_values;  
        let otu_ids = valueData.otu_ids; 
        let otu_labels = valueData.otu_labels;
        
        // Logging into console
        console.log(sample_values,otu_ids,otu_labels);

        //Setting top ten display
        let xticks = sample_values.slice(0,10).reverse();
        let yticks = otu_ids.slice(0,10).maps(id => `OTU ${id}`).reverse();
        let labels = otu_labels.slice(0,10).reverse();

        //Setting up BarChart
        let trace = {
            x: xticks,
            y: yticks, 
            text: labels,
            type: "bar",
            orientation: "h"
        };
        //Layout
        let layout = {
            title: "Top 10 OTUs Present"
        };

        //Calling Plotly
        Plotly.newPlot("bar", [trace], layout)
    });
};
// Bubble chart
function buildBubbleChart(sample) {
    
    //Retreving Data
    d3.json(url).then((data) => {
        
        //Retreving Data samples
        let sampleInfo = data.samples;
        
        //Filtering 
        let value = sampleInfo.filter(result => result.id == sample);
        
        //Getting first indext
        let valueData = value[0];
        
        //Getting sample values, otuids, and otulabels
        let sample_values = valueData.sample_values;  
        let otu_ids = valueData.otu_ids; 
        let otu_labels = valueData.otu_labels;
        
        // Logging into console
        console.log(sample_values,otu_ids,otu_labels);

        //Setting top ten display
        let xticks = sample_values.slice(0,10).reverse();
        let yticks = otu_ids.slice(0,10).maps(id => `OTU ${id}`).reverse();
        let labels = otu_labels.slice(0,10).reverse();

        //Setting up BarChart
        let traceB= {
            x: otu_ids,
            y: sample_values, 
            text: labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        };

        //Layout
        let layout = {
            title: "Top 10 OTUs Present",
            hovermode: "closest",
            xaxis: {title: "OTU ID"}
        };

        //Calling Plotly
        Plotly.newPlot("bubble", [traceB], layout)
    });
};

//Updates dashboards
function optionChanged(value) {

    // Loging new value
    console.log(value)

    //Calling functions
    buildMetadata(value);
    buildBarChart(value);
    buildBubbleChart(value);
};

//Calling function
init();