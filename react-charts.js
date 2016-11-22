"use strict";

function buildCharts() {
  const e = React.createElement;
  class ExecutionCharts extends React.Component {
    render() {
      return e(
        "div",
        {className: "row"},
        this.props.years.map(year => (
          e('div', {
            className: "span3"
            },
            e('canvas', {
              'data-year': year,
              'data-chart-name': this.props.chartName,
              className: "executions-per-year-chart"
            })
          )
        ))
      );
    }
  }

  ReactDOM.render(e(ExecutionCharts, { chartName: "bar-chart", years: ['2016', '2015', '2014', '2013', '2012', '2011', '2010', '2009'] }), document.getElementById('yearly-state-execution-charts'));
  ReactDOM.render(e(ExecutionCharts, { chartName: "race-pie-chart", years: ['2016', '2015', '2014', '2013', '2012', '2011', '2010', '2009'] }), document.getElementById('yearly-race-execution-pie-charts'));
}
