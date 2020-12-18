/* Scripts for css grid dashboard */

$(document).ready(() => {
    addResizeListeners();
    setSidenavListeners();
    setUserDropdownListener();
    renderChart();
    setMenuClickListener();
    setSidenavCloseListener();
  });
  
  // Set constants and grab needed elements
  const sidenavEl = $('.sidenav');
  const gridEl = $('.grid');
  const SIDENAV_ACTIVE_CLASS = 'sidenav--active';
  const GRID_NO_SCROLL_CLASS = 'grid--noscroll';
  
  function toggleClass(el, className) {
    if (el.hasClass(className)) {
      el.removeClass(className);
    } else {
      el.addClass(className);
    }
  }
  
  // User avatar dropdown functionality
  function setUserDropdownListener() {
    const userAvatar = $('.header__avatar');
  
    userAvatar.on('click', function(e) {
      const dropdown = $(this).children('.dropdown');
      toggleClass(dropdown, 'dropdown--active');
    });
  }
  
  // Sidenav list sliding functionality
  function setSidenavListeners() {
    const subHeadings = $('.navList__subheading'); console.log('subHeadings: ', subHeadings);
    const SUBHEADING_OPEN_CLASS = 'navList__subheading--open';
    const SUBLIST_HIDDEN_CLASS = 'subList--hidden';
  
    subHeadings.each((i, subHeadingEl) => {
      $(subHeadingEl).on('click', (e) => {
        const subListEl = $(subHeadingEl).siblings();
  
        // Add/remove selected styles to list category heading
        if (subHeadingEl) {
          toggleClass($(subHeadingEl), SUBHEADING_OPEN_CLASS);
        }
  
        // Reveal/hide the sublist
        if (subListEl && subListEl.length === 1) {
          toggleClass($(subListEl), SUBLIST_HIDDEN_CLASS);
        }
      });
    });
  }
  
  // Draw the chart
  function onClickDisplaySMA(){
    $("#btn_draw_sma").hide();
    $("#load_draw_sma").show();
    $("#div_container_sma").show();
  
    window_size = parseInt(document.getElementById("input_windowsize").value);
  
    sma_vec = ComputeSMA(data_raw, window_size);
  
    let sma = sma_vec.map(function (val) { return val['avg']; });
    let prices = data_raw.map(function (val) { return val['price']; });
  
    let timestamps_a = data_raw.map(function (val) { return val['timestamp']; });
    let timestamps_b = data_raw.map(function (val) {
      return val['timestamp'];
    }).splice(window_size, data_raw.length);
  
    let graph_plot = document.getElementById('div_linegraph_sma');
    Plotly.newPlot( graph_plot, [{ x: timestamps_a, y: prices, name: "Stock Price" }], { margin: { t: 0 } } );
    Plotly.plot( graph_plot, [{ x: timestamps_b, y: sma, name: "SMA" }], { margin: { t: 0 } } );
  
    $("#div_linegraph_sma_title").text("Stock Price and Simple Moving Average (window: " + window_size + ")" );
    $("#btn_draw_sma").show();
    $("#load_draw_sma").hide();
  
    $("#div_container_train").show();
    $("#div_container_trainfirst").hide();
  
    displayTrainingData();
  }

  function displayTrainingData(){
    $("#div_container_trainingdata").show();
  
    let set = sma_vec.map(function (val) { return val['set']; });
    let data_output = "";
    for (let index = 0; index < 25; index++)
    {
       data_output += "<tr><td width=\"20px\">" + (index + 1) +
        "</td><td>[" + set[index].map(function (val) {
          return (Math.round(val['price'] * 10000) / 10000).toString();
        }).toString() +
        "]</td><td>" + sma_vec[index]['avg'] + "</td></tr>";
    }
  
    data_output = "<table class='striped'>" +
    "<thead><tr><th scope='col'>#</th>" +
    "<th scope='col'>Input (X)</th>" +
    "<th scope='col'>Label (Y)</th></thead>" +
    "<tbody>" + data_output + "</tbody>" +
    "</table>";
  
    $("#div_trainingdata").html(
      data_output
    );
  }

  function renderChart() {
    const chart = AmCharts.makeChart( "chartdiv", {
      "type": "serial",
      "theme": "light",
      "dataProvider": [ {
        "month": "Jan",
        "visits": 508
      }, {
        "month": "Feb",
        "visits": 665
      }, {
        "month": "Mar",
        "visits": 711
      }, {
        "month": "Apr",
        "visits": 974
      }, {
        "month": "May",
        "visits": 1114
      }, {
        "month": "Jun",
        "visits": 1122
      }, {
        "month": "Jul",
        "visits": 1322
      }, {
        "month": "Aug",
        "visits": 1809
      }, {
        "month": "Sept",
        "visits": 1882
      }, {
        "month": "Oct",
        "visits": 2025
      },{
        "month": "Nov",
        "visits": 2685
      }, {
        "month": "Dec",
        "visits": 3493
      } ],
      "valueAxes": [ {
        "gridColor": "#FFFFFF",
        "gridAlpha": 0.2,
        "dashLength": 0
      } ],
      "gridAboveGraphs": true,
      "startDuration": 1,
      "graphs": [ {
        "balloonText": "[[category]]: <b>[[value]]</b>",
        "fillAlphas": 0.8,
        "lineAlpha": 0.2,
        "type": "column",
        "valueField": "visits"
      } ],
      "chartCursor": {
        "categoryBalloonEnabled": false,
        "cursorAlpha": 0,
        "zoomable": false
      },
      "categoryField": "month",
      "categoryAxis": {
        "gridPosition": "start",
        "gridAlpha": 0,
        "tickPosition": "start",
        "tickLength": 20
      },
      "export": {
        "enabled": false
      }
    });
  }
  
  function toggleClass(el, className) {
    if (el.hasClass(className)) {
      el.removeClass(className);
    } else {
      el.addClass(className);
    }
  }
  
  // If user opens the menu and then expands the viewport from mobile size without closing the menu,
  // make sure scrolling is enabled again and that sidenav active class is removed
  function addResizeListeners() {
    $(window).resize(function(e) {
      const width = window.innerWidth; console.log('width: ', width);
  
      if (width > 750) {
        sidenavEl.removeClass(SIDENAV_ACTIVE_CLASS);
        gridEl.removeClass(GRID_NO_SCROLL_CLASS);
      }
    });
  }
  
  // Menu open sidenav icon, shown only on mobile
  function setMenuClickListener() {
    $('.header__menu').on('click', function(e) { console.log('clicked menu icon');
      toggleClass(sidenavEl, SIDENAV_ACTIVE_CLASS);
      toggleClass(gridEl, GRID_NO_SCROLL_CLASS);
    });
  }
  
  // Sidenav close icon
  function setSidenavCloseListener() {
    $('.sidenav__brand-close').on('click', function(e) {
      toggleClass(sidenavEl, SIDENAV_ACTIVE_CLASS);
      toggleClass(gridEl, GRID_NO_SCROLL_CLASS);
    });
  }
  