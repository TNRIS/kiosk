
urlObject = {
  flood {
    name: "flood",
    url: "https://map.texasflood.org"
  },
  swp17 {
    name: "swp17",
    url: "https://2017.texasstatewaterplan.org/statewide"
  }
}

function getUrl(){
    $(document).ready(function() {
  	// Check if user clicked the flood img
  	if ($("#flood").click(function() {
      $(this).data
    })) {
  		$('#apples').show();
  	}
  	// Check if user clicked the swp img
  	else if (dynamicContent == 'oranges') {
  		$('#oranges').show();
  	}
  	// Check if user clicked the gis cat img
  	else if (dynamicContent == 'bananas') {
  		$('#bananas').show();
  	}
  	// Check if the URL parmeter is empty or not defined, display default content
  	else {
  		$('#default-content').show();
  	}
  });
}
