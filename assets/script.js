jQuery(document).ready(function ($) {
  // Hover and mouse leave functionality for path and circle elements
  $("#us-map path, #us-map circle").hover(function () {
    $('#info-box-us-map').css('display', 'block').html($(this).data('info'));
  }, function () {
    $('#info-box-us-map').css('display', 'none');
  });

  // Track mouse movement to position the info box dynamically
  $(document).mousemove(function (e) {
    $('#info-box-us-map').css({
      top: e.pageY - $('#info-box-us-map').height() - 30,
      left: e.pageX - ($('#info-box-us-map').width()) / 2
    });
  });

  // Open links in a new tab for iOS devices
  var ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  if (ios) {
    $('a').on('click touchend', function () {
      var link = $(this).attr('href');
      window.open(link, '_blank');
      return false;
    });
  }


  // Loop through all state paths and create labels dynamically
  document.querySelectorAll("#us-map path").forEach((path) => {
    const dataInfo = path.getAttribute("data-info");

    if (!dataInfo) {
      console.log('Skipping path with no data-info:', path);
      return; // Skip if the path does not have a data-info attribute
    }

    // Parse the data-info HTML string to extract the state name
    const parser = new DOMParser();
    const parsedHTML = parser.parseFromString(dataInfo, "text/html");
    const stateDiv = parsedHTML.querySelector("div:nth-child(1)");

    if (!stateDiv) {
      console.log('No state found in data-info for path:', path);
      return; // Skip if the state name is not found
    }

    const stateName = stateDiv.textContent.replace("State: ", "").trim();
    console.log('State name:', stateName); // Debugging output

    // Calculate the bounding box of the state
    const bbox = path.getBBox();
    const centerX = bbox.x + bbox.width / 2;
    const centerY = bbox.y + bbox.height / 2;

    // Calculate text size dynamically based on the area
    const area = bbox.width * bbox.height;
    const textSize = Math.max(8, Math.sqrt(area) / 8); // Minimum size is 8px

    // Create the state label text dynamically
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");

    const pathId = path.getAttribute("id");
    if (pathId) {
      text.setAttribute("id", `${pathId.toLowerCase()}-text`);
    }

    text.setAttribute("fill", "#fff");
    text.setAttribute("font-family", "Arial, sans-serif");
    text.setAttribute("font-weight", "normal");  // Ensure the font is not too bold
    text.setAttribute("font-style", "normal");   // Ensure the font is not italicized
    text.setAttribute("font-size", textSize);
    text.setAttribute("x", centerX);
    text.setAttribute("y", centerY);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("alignment-baseline", "middle");
    text.setAttribute("text-rendering", "optimizeSpeed"); // Try "optimizeSpeed" or remove this line
    text.textContent = stateName;
    text.setAttribute("pointer-events", "none");
    text.classList.add("state-label");

    // Append the text to the SVG map
    const svgMap = document.querySelector("#us-map");
    if (!svgMap) {
      console.log('SVG map container not found');
      return; // Skip if the SVG container is not found
    }
    svgMap.appendChild(text);
  });

  // Add hover functionality for small states linked with labels
  const states = ['NH', 'VT', 'MA', 'RI', 'CT', 'NJ', 'DE', 'MD', 'circle60'];

  states.forEach(state => {
    // Define hover functionality for both ID and class
    $(`#${state}, .${state}`).hover(
      function () {
        $(`.${state}`).css('background-color', '#C07574');
        $(`#${state}`).css('fill', '#C07574');
      },
      function () {
        $(`.${state}`).css('background-color', '');
        $(`#${state}`).css('fill', '');
      }
    );
  });
});
