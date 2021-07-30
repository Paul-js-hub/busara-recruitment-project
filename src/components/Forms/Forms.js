import React, { useState, useEffect } from "react";
import axios from "axios";

import "./forms.css";

const Forms = () => {
  const [formsList, setFormsList] = useState([]);
  let [formData, setFormData] = useState([]);
  let [surveyID, setSurveyID] = useState("")

  useEffect(() => {
    getForms();
  }, []);

  useEffect(() => {
    let fields = [];
    formsList.map((form) =>
      form.pages.map((page) =>
        page.sections.map((section) =>
          section.questions.map((question) => {
           fields.push({
              q_ans: "",
              column_match: question.column_match,
              q_id: question.id,
            });
          })
        )
      )
    );
    setFormData(fields);
  }, [formsList]);

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
        console.log("data", data)
        setSurveyID(response.data.forms[0].id);
        setFormsList(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const access_token = localStorage.getItem("access_token");
    const userID = localStorage.getItem("userID")
    //console.log("formdata", formData);
    const data = {
      local_id: 8,
      start_time: "2021-02-02 09:10:30.457 +0300",
      location: {
        lon: 0.0,
        accuracy: 0.0,
        lat: 0.0,
      },
      ans: formData,
      user: parseInt(userID),
      survey_id: surveyID,
      end_time: "2021-02-02 09:21:08.032 +0300",
    };
     axios.post(process.env.REACT_APP_BASE_URL + "api/v1/recruitment/answers/submit/", [data], {
       headers: {
         Authorization: `Bearer ${access_token}`,
       },
    });
  };

  const handleChange = (e) => {
    //formData["column"] = e.target.value
    const index = formData.findIndex(
      (question) => question.column_match === e.target.name
    );
    formData[index]["q_ans"] = e.target.value;
    setFormData(formData);
  };

  return (
    <form className="form-submit" onSubmit={handleSubmitForm}>
      <h1>Busara Forms</h1>
      {formsList.map((form) =>
        form.pages.map((page) =>
          page.sections.map((section) =>
            section.questions.map((question) => {
              return (
                <div className="question-area" key={question.id}>
                  <ul className="unordered-list">
                    <li key={question.id}>
                      {question.type === "text" ? (
                        <div>
                          <label className="forms-label">
                            {question.column_match}
                          </label>
                          <input
                            className="forms-input"
                            placeholder={question.description}
                            name={question.column_match}
                            onChange={(e) => handleChange(e)}
                          />
                        </div>
                      ) : question.type === "tel" ? (
                        <div>
                          <label className="forms-label">
                            {question.description}
                          </label>
                          <input
                            className="forms-input"
                            name={question.column_match}
                            onChange={(e) => handleChange(e)}
                          />
                        </div>
                      ) : (
                        <div>
                          <label className="forms-label">
                            {question.description}
                          </label>
                          <select
                            className="forms-select"
                            name={question.column_match}
                            onChange={(e) => handleChange(e)}
                          >
                            <option className="forms-option">
                              --Please choose an option--
                            </option>
                            {question.q_options.map((qoption) => (
                              <option
                                key={qoption.id}
                                className="forms-dropdown"
                                value={qoption.id}
                              >
                                {qoption.name}
                              </option>
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
