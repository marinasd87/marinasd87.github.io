// Use D3 to read in samples.json
d3.json("data/samples.json").then((data) => {
    
    console.log(data);

    // Set dropdown
    var id = data.names;
    for (var i = 0; i < id.length; i++) {
        selectBox = d3.select("#selDataset");
        selectBox.append("option").text(id[i]);
    }

    // Default Plot
    init(0)
    // Function for plot
    function init(index) {
        // Create an array of otu IDs values

        // Create an array of otu IDs labels
        var otuId = data.samples[index].otu_ids;
        var sampleValues = data.samples[index].sample_values;
        var labels = data.samples[index].otu_labels;
    
        // Sort
        

        // Slice

        var slicedValues = sampleValues.slice(0,10);
        var slicedOtus = otuId.slice(0,10);
        var slicedLabels = labels.slice(0, 10);

        // Reverse

        var reversedValues = slicedValues.reverse();
        var reversedOtus = slicedOtus.reverse();
        var reversedLabels = slicedLabels.reverse();

        // Otu string fomat

        formattedOtus = reversedOtus.map((otu => "OTU " + otu));

        // trace
        var trace1 = {
        x: reversedValues,
        y: formattedOtus,
        text: reversedLabels,
        type: "bar",
        orientation: "h"
        };
        //data
        var barData = [trace1];
        //layout
        var layout = {
            margin: {
                l:100,
                r:100,
                t:100,
                b:100
            }
        };
        
        Plotly.newPlot("bar", barData, layout);
        

        //Create a bubble chart that displays each sample

        trace2 = {
            x: otuId,
            y: sampleValues,
            text: labels,
            mode: 'markers',
            marker: {
                color: otuId,
                size: sampleValues
            }
        }
        var bubbleData = [trace2];

        var layout = {
            height: 500,
            width: 1000,
            xaxis: {
                title:{
                    text: 'OTU ID',
                }
            }

        }

        Plotly.newPlot("bubble", bubbleData, layout)

        // Display each key-value pair from the metadata JSON object somewhere on the page

        var keys = Object.keys(data.metadata[index]);
        var values = Object.values(data.metadata[index])
        var demoData = d3.select('#sample-metadata');
        demoData.html("");
        for (var i = 0; i < keys.length; i++) {
            demoData.append("p").text(`${keys[i]}: ${values[i]}`);
        };
    
    
    }

        


    // On change to the DOM, call getData()
    d3.selectAll("#selDataset").on("change", getData);
        
    // Function called by DOM changes
    function getData() {
        var dropdownMenu = d3.select("#selDataset");
        // Assign the value of the dropdown menu option to a variable
        var dataset = dropdownMenu.property("value");
        // Initialize an empty array for the country's data
        
        
        for (var i = 0; i < data.names.length; i++) {
            if (dataset === data.names[i]) {
                init(i);
                return
            }
        }
        // Call function to update the chart
        //updatePlotly(data);
    }  
        
    // Update the restyled plot's values
    //function updatePlotly(newdata) {
    //    Plotly.restyle("bar", "values", [newdata]);
    //}
    
});