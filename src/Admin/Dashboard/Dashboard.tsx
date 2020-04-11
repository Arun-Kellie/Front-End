import React, { FunctionComponent } from "react";
import { Card, Elevation, H5 } from "@blueprintjs/core";
import NavbarComponent from "../../Navbar/NavbarComponent";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'chartjs-plugin-datalabels';
import {Pie} from 'react-chartjs-2';
import {map, uniqueId} from 'lodash';
import {dashboardConstants} from './dashboardConstants';
import {chartColors, chartOptions, lightenDarkenColor} from '../../utils/util';

const colors = [
  {
    id: 1,
    color: "red",
    value: "#f00"
  },
  {
    id: 2,
    color: "green",
    value: "#0f0"
  },
  {
    id: 3,
    color: "blue",
    value: "#00f"
  },
  {
    id: 4,
    color: "cyan",
    value: "#0ff"
  },
  {
    id: 5,
    color: "magenta",
    value: "#f0f"
  },
  {
    id: 6,
    color: "yellow",
    value: "#ff0"
  },
  {
    id: 7,
    color: "black",
    value: "#000"
  }
];

const columns = [
  {
    dataField: "color",
    text: "Color",
    filter: textFilter(),
    sort: true
  },
  {
    dataField: "value",
    text: "Color Value",
    filter: textFilter(),
    sort: true
  }
];

const chartData = {
  labels: [
    'Department 1',
    'Department 2',
    'Department 3',
    'Department 4',
    'Department 5',
    'Department 6',
  ],
  datasets: [{
    data: [300, 50, 100, 250,120,63],
    backgroundColor: chartColors,
    hoverBackgroundColor: map(chartColors, color => {
      return lightenDarkenColor(color, -20)
    })
  }]
};

const paginationOptions = {
  paginationSize: 5,
  pageStartIndex: 1,
  // alwaysShowAllBtns: true, // Always show next and previous button
  // withFirstAndLast: false, // Hide the going to First and Last page button
  // hideSizePerPage: true, // Hide the sizePerPage dropdown always
  // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
  firstPageText: 'First',
  prePageText: 'Back',
  nextPageText: 'Next',
  lastPageText: 'Last',
  nextPageTitle: 'First page',
  prePageTitle: 'Pre page',
  firstPageTitle: 'Next page',
  lastPageTitle: 'Last page',
  showTotal: true,
  disablePageTitle: true,
  sizePerPageList: [{
    text: '5', value: 5
  }, {
    text: '10', value: 10
  }, {
    text: 'All', value: colors.length
  }] // A numeric array is also available. the purpose of above example is custom the text
};

const AdminDashboard: FunctionComponent = () => {

  return (
    <>
      <NavbarComponent />
      <div className="container-fluid page-content fade-in-up">
          <div className="row">
            {map(dashboardConstants.cardNames, cardName => (
                <div key={uniqueId()} className="col-12 col-sm-6 col-lg-4 mb-4">
                  <Card elevation={Elevation.TWO}>
                    <H5 className="pb-0 card-header">{cardName}</H5>
                  </Card>
                </div>
            ))}
          </div>
          <div className="row">
            <div className="col-12 col-sm-6 col-lg-8">
              <BootstrapTable
                  bootstrap4
                keyField="id"
                data={colors}
                columns={columns}
                filter={filterFactory()}
                filterPosition="top"
                pagination={ paginationFactory(paginationOptions) }
              />
            </div>
            <div className="col-12 col-sm-6 col-lg-4">
              <H5 className="pb-0 card-header">Files</H5>
              <Pie data={chartData} options={chartOptions}
              />
            </div>
          </div>
      </div>
    </>
  );
};

export default AdminDashboard;
