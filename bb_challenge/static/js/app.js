// Defining variable 
const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'

// Bar chart 

function DrawBargraph (sampleId) {
    console.log(`DrawBargraph(${sampleId})`);

    d3.json(url).then(data => {
        console.log(data);
        
        let samples= data.samples;
        let resultArray = samples.filter(s => s.id = sampleId);
        let  result = resultArray[0];
    
        let sample_values = result.sample_values;  
        let otu_ids = result.otu_ids; 
        let otu_lables = result.otu_labels;})
}
// Bubble chart

// Sample metadata 
