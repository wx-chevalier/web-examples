import mountPlayground from "react-cosmos-playground";

mountPlayground({
  platform: "web",
  plugin: {
    /**
     * Uses default React Cosmos Responsive Previews
     * Otherwise, could follow syntax: 
     *  
       responsivePreview: {
          devices: [
            { label: 'iPhone 5', width: 320, height: 568 },
            { label: 'iPhone 6', width: 375, height: 667 },
            { label: 'iPhone 6 Plus', width: 414, height: 736 }
          ]
        }
     */
    responsivePreview: undefined
  },
  loaderUri: "/playground/loader"
});
