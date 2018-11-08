import React from "react";

import { Link } from "gatsby";

import Layout from "../components/layout";

const AllYearsTemplate = ({ data, pageContext }) => {
  const { years } = pageContext;

  return (
    <Layout>
      <h2>Years</h2>
      <div>
        <ul>
          {years.map((year, index) => {
            return (
              <li key={index}>
                <Link to={`/years/${year}`}>{year}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </Layout>
  );
};

export default AllYearsTemplate;
