import React, { FunctionComponent } from "react";
import { Card, Elevation, H5 } from "@blueprintjs/core";
import NavbarComponent from "../../Navbar/NavbarComponent";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import { PieChart, Pie, Cell } from "recharts";
import { chartColors, RADIAN } from "../../utils/util";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 }
];

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
    filter: textFilter()
  },
  {
    dataField: "value",
    text: "Color Value",
    filter: textFilter()
  }
];

const AdminDashboard: FunctionComponent = () => {
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    index
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN) * 0.75;
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`Dept ${index + 1}`}
      </text>
    );
  };

  return (
    <>
      <NavbarComponent />
      <div className="no-gutters row">
        <div className="col-xxl-3 mb-3 pr-md-2 col-md-4">
          <Card elevation={Elevation.TWO}>
            <H5 className="pb-0 card-header">Active Users</H5>
          </Card>
        </div>
        <div className="col-xxl-3 mb-3 pr-md-2 col-md-4">
          <Card elevation={Elevation.TWO}>
            <H5 className="pb-0 card-header">Pending Users</H5>
          </Card>
        </div>
        <div className="col-xxl-3 mb-3 pr-md-2 col-md-4">
          <Card elevation={Elevation.TWO}>
            <H5 className="pb-0 card-header">Deactivated Users</H5>
          </Card>
        </div>
      </div>
      <div className="no-gutters row">
        <div className="col-xxl-3 mb-3 pr-md-2 col-md-8">
          <BootstrapTable
            keyField="id"
            data={colors}
            columns={columns}
            filter={filterFactory()}
            filterPosition="top"
          />
        </div>
        <div className="col-xxl-3 mb-3 pr-md-2 col-md-4">
          <H5 className="pb-0 card-header">Files</H5>
          <PieChart width={200} height={200}>
            <Pie
              data={data}
              cx={100}
              cy={100}
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={chartColors[index % chartColors.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
