import React, { useState, useEffect } from "react";
import axios from "axios";

import "./forms.css"

const Forms = () => {
  const [formsList, setFormsList] = useState([]);
  let [formData, setFormData] = useState({});


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
        let data = response.data.forms;
        console.log("DATA", data);
        setFormsList(data);
      })
      .catch((error) => {
        console.log(error());
      });
  };

  const handleSubmitForm = (e) =>{
      e.preventDefault();
      const access_token = localStorage.getItem("access_token");
      axios.post(process.env.REACT_APP_BASE_URL + "api/v1/recruitment/answers/submit/", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
  }

  const handleChange = (e, column) =>{
    formData["column"] = e.target.value
    setFormData()
  }

  return (
      <form className="form-submit" onSubmit={handleSubmitForm}>
        <h1>Busara Forms</h1>
        {formsList.map((form) =>
          form.pages.map((page) =>
            page.sections.map((section) =>
              section.questions.map((question) => {
                  console.log("question", question)
                return (
                  <div className="question-area" key={question.id}>
                    <ul className="unordered-list">
                      <li key={question.id}>
                        {question.type === "text" ? (
                          <div>
                            <label className="forms-label">{question.column_match}</label>
                            <input
                             className="forms-input"
                              placeholder={question.description}
                              onChange={(e, column) => handleChange(e, column)}
                            />
                          </div>
                        ) : question.type === "tel" ? (
                          <div>
                            <label className="forms-label">{question.description}</label>
                            <input 
                            className="forms-input"
                            onChange={(e, column) => handleChange(e, column)}
                            />
                          </div>
                        ) : (
                          <div>
                            <label className="forms-label">{question.description}</label>
                            <select className="forms-select" onChange={(e, column) => handleChange(e, column)}>
                              <option className="forms-option">--Please choose an option--</option>
                              {question.q_options.map((qoption) => (
                                <option key={qoption.id} className="forms-dropdown">{qoption.name}</option>
                              ))}
                            </select>
                          </div>
                        )}
                      </li>
                    </ul>
                  </div>
                );
              })
            )
          )
        )}
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
   
  );
};

export default Forms;
