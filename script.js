$("path, circle").hover(function(e) {
    $('#info-box').css('display','block');
    $('#info-box').html($(this).data('info'));
  });
  
  $("path, circle").mouseleave(function(e) {
    $('#info-box').css('display','none');
  });
  
  $(document).mousemove(function(e) {
    $('#info-box').css('top',e.pageY-$('#info-box').height()-30);
    $('#info-box').css('left',e.pageX-($('#info-box').width())/2);
  }).mouseover();
  
  var ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  if(ios) {
    $('a').on('click touchend', function() { 
      var link = $(this).attr('href');   
      window.open(link,'_blank');
      return false;
    });
  }

   // Loop through all state paths
   document.querySelectorAll("path").forEach((path) => {
    const dataInfo = path.getAttribute("data-info"); // Get the data-info attribute

    if (!dataInfo) return; // Skip if the path does not have a data-info attribute

    // Parse the data-info HTML string to extract the state name
    const parser = new DOMParser();
    const parsedHTML = parser.parseFromString(dataInfo, "text/html");
    const stateDiv = parsedHTML.querySelector("div:nth-child(1)"); // Get the first <div> (State)

    if (!stateDiv) return; // Skip if the state name is not found

    const stateName = stateDiv.textContent.replace("State: ", "").trim(); // Extract the state name

    // Calculate the bounding box of the state
    const bbox = path.getBBox();
    const centerX = bbox.x + bbox.width / 2; // X-coordinate of the center
    const centerY = bbox.y + bbox.height / 2; // Y-coordinate of the center

    // Calculate text size dynamically based on state area
    const area = bbox.width * bbox.height; // Area of the state
    const textSize = Math.max(8, Math.sqrt(area) / 7); // Minimum size is 8px

    // Create a text element for the state name
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    
    // Dynamically assign an ID to the text element based on the path ID
    const pathId = path.getAttribute("id");
    if (pathId) {
      text.setAttribute("id", `${pathId.toLowerCase()}-text`); // Assign text ID (e.g., 'ca-text')
    }

    // Set the font size dynamically
    text.setAttribute("fill", "#000"); // Set the text color
    text.classList.add("state-label"); // Add a class for hover functionality
    text.setAttribute("font-size", textSize);
    text.setAttribute("x", centerX); // Center horizontally
    text.setAttribute("y", centerY); // Center vertically
    text.setAttribute("text-anchor", "middle"); // Center align horizontally
    text.setAttribute("alignment-baseline", "middle"); // Center align vertically
    text.textContent = stateName; // Set the state name as the text content

    // Append the text to the SVG
    const svgMap = document.querySelector("svg"); // Make sure the SVG container is selected
    svgMap.appendChild(text);
  });
