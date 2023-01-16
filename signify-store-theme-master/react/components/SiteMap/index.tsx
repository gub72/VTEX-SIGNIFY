import React, { useEffect, useState } from "react";
import XMLParser from "react-xml-parser";

import api from "./api";

import "./global.css";

export const SiteMap = () => {
  const [dataCategory, setDataCategory] = useState([]);
  const [dataDepartment, setDataDepartment] = useState([]);

  const getDepartmentLinks = () => {
    api
      .get("/department-0.xml", {
        "Content-Type": "application/xml; charset=utf-8",
      })
      .then((response: { data: any }) => {
        const jsonDataFromXml = new XMLParser().parseFromString(response.data);

        setDataDepartment(jsonDataFromXml.children);
      });
  };

  const getCategoryLinks = () => {
    api
      .get("/category-0.xml", {
        "Content-Type": "application/xml; charset=utf-8",
      })
      .then((response: { data: any }) => {
        const jsonDataFromXml = new XMLParser().parseFromString(response.data);

        setDataCategory(jsonDataFromXml.children);
      });
  };

  useEffect(() => {
    getDepartmentLinks();
    getCategoryLinks();
  }, []);

  function CapitalizeLetter(string: string) {
    const stringToReturn = string;

    return (
      stringToReturn.charAt(0).toUpperCase() +
      string.slice(1).replace(/-/g, " ")
    );
  }

  return (
    <div className="sitemap-app flex flex-column w-80 self-center-1 center">
      <div>
        <h2 className="sitemap-app_title">Mapa do Site</h2>
        <p className="sitemap-app_subtitle">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          ac mollis massa. Praesent aliquet enim tellus, sed cursus nulla
          efficitur sed. Vestibulum pharetra sem et orci maximus, nec malesuada
          ligula semper. Fusce volutpat est sed eros accumsan tincidunt.
          Pellentesque tellus erat, mattis in urna non, lacinia pharetra sem.
        </p>
      </div>
      <div className="site-map_links">
        <h3 className="sitemap-app_department b">Departamento</h3>
        <ul className="list">
          {dataDepartment.map(function (value: any, index: any) {
            return (
              <a
                key={index}
                href={`${value.children[0].value}`}
                className="link dim black"
              >
                <li className="lh-copy listItems">
                  {CapitalizeLetter(value.children[0].value.split("/").at(-1))}
                </li>
              </a>
            );
          })}
        </ul>
      </div>
      <div className="site-map_links">
        <h3 className="sitemap-app_category b">Categoria</h3>
        <ul className="list">
          {dataCategory.map(function (value: any, index: any) {
            return (
              <a
                key={index}
                href={`${value.children[0].value}`}
                className="link dim black"
              >
                <li className="lh-copy listItems">
                  {CapitalizeLetter(value.children[0].value.split("/").at(-1))}
                </li>
              </a>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
