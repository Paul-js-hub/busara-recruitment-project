import React, { useState, useEffect } from "react";
import axios from "axios";

const Forms = () => {
  const [formsList, setFormsList] = useState([]);

  useEffect(() => {
    getForms();
  }, []);

  const getForms = () => {
    const access_token = localStorage.getItem("access_token");
    axios
      .get(
        "http://fullstack-role.busara.io/api/v1/recruitment/forms/?node_type=Both",
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      .then((response) => {
        //console.log("RESPONSE", response.data.forms[0].pages[0].sections.questions)
        let data = response.data.forms[0].pages[0].sections[0].questions;
        setFormsList([...data]);
      });
  };

  return (
    <div>
      <h1>Busara Forms</h1>
      {formsList.map((item) => {
        console.log("ITEM", item);
        return (
          <li>
            {item.type === "text" ? (
              <div>
                <ol>
                  <label>{item.description}</label>
                  <input></input>
                </ol>
              </div>
            ) : item.type === "tel" ? (
              <div>
                <ol>
                  <label>{item.description}</label>
                  <input></input>
                </ol>
              </div>
            ) : <div>
                <label>What is your gender</label>
                <select>
                    <option>--Please choose an option--</option>
                    <option>{item.q_options[0].name}</option>
                    <option>{item.q_options[1].name}</option>
                    <option>{item.q_options[2].name}</option>
                </select>
                </div>}
          </li>
        );
      })}
    </div>
  );
};

export default Forms;
