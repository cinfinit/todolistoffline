import logo from "./logo.svg";
import "./App.css";

import React, { Component } from "react";

class App extends Component {
  state = {
    selectValue: false,
    text: "",
    data: [],
    filteredData: [],
    tag: [],
  };
  componentDidMount = () => {
    let mainData = localStorage.getItem("data");
    let filtered = localStorage.getItem("filteredData");
    let mainTags = localStorage.getItem("tag");

    let mainFilter = JSON.parse(filtered);
    let tags = JSON.parse(mainTags);
    let mainDatatemp = JSON.parse(mainData);
    if (mainDatatemp) {
      this.setState({ data: mainDatatemp });
    }
    if (mainFilter) {
      this.setState({ filteredData: mainFilter });
    }
    if (tags) {
      this.setState({ tag: tags });
    }
  };

  setTag = (text) => {
    let tempTag = [...this.state.tag];
    tempTag.push(text);
    let tempData = [...this.state.data];
    let filterData = tempData.filter((i) => i.todo.includes(tempTag));
    console.log("filtered data ", filterData);
    this.setState({ tag: tempTag, filteredData: filterData });
    localStorage.setItem("filteredData", JSON.stringify(filterData));
    localStorage.setItem("tag", JSON.stringify(tempTag));
  };
  resetHandler = () => {
    this.setState({ data: [], text: "", tag: [], filteredData: [] });
    localStorage.setItem("data", JSON.stringify([]));
    localStorage.setItem("tag", JSON.stringify([]));
    localStorage.setItem("filteredData", JSON.stringify([]));
  };
  inputHandler = (e) => {
    this.setState({ text: e.target.value });
  };
  completeHandler = (id) => {
    let tempData = [...this.state.data];
    // console.log("empdata", tempData[id]);
    tempData[id].checked = true;
    this.setState({ data: tempData });
    localStorage.setItem("data", JSON.stringify(tempData));
  };
  keyHandler = (e) => {
    if (e.keyCode === 13 && this.state.text != "") {
      let obj = {
        index: this.state.data.length,
        todo: this.state.text,
        checked: false,
      };
      let tempData = [...this.state.data];
      tempData.push(obj);
      this.setState({ data: tempData });
      localStorage.setItem("data", JSON.stringify(tempData));
    }
  };

  removeTag = (id) => {
    let tempTag = [...this.state.tag];

    let newTags = tempTag.filter((i) => i !== id);
    console.log("temptag", newTags);
    let tempData = [...this.state.data];
    if (newTags.length == 0) {
      this.setState({ tag: [], filteredData: [] });
      localStorage.setItem("tag", JSON.stringify([]));
      localStorage.setItem("filteredData", JSON.stringify([]));
    } else {
      let filterData = tempData.filter((i) => i.todo.includes(newTags));
      console.log("filtered data ", filterData);
      this.setState({ tag: newTags, filteredData: filterData });
      localStorage.setItem("tag", JSON.stringify(newTags));
      localStorage.setItem("filteredData", JSON.stringify(filterData));
    }
  };

  // }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="mainbox" style={{ overflowY: "scroll" }}>
            <h5 style={{ color: "black", padding: "10px", marginLeft: "15px" }}>
              Todo List
            </h5>
            <button
              className="button"
              style={{ float: "right", textAlign: "center", fontSize: "15px" }}
              onClick={this.resetHandler}
            >
              Reset all tasks{" "}
            </button>
            <br />
            <div style={{ textAlign: "center" }}>
              <input
                style={{
                  width: "90%",
                  padding: "10px",
                  height: "40px",
                  fontSize: "15px",
                }}
                placeholder=" + Add a task"
                value={this.state.text}
                onChange={this.inputHandler}
                onKeyDown={this.keyHandler}
              />
            </div>
            <br />
            {this.state.tag.length >= 1 ? (
              <div
                style={{
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "flexStart",
                  border: "1px solid #f5f5f5",
                  padding: "5px",
                  marginLeft: "20px",
                  marginRight: "20px",
                  backgroundColor: "#f5f5f5",
                }}
              >
                {this.state.tag.map((i) => {
                  return (
                    <span
                      onClick={() => this.removeTag(i)}
                      style={{
                        fontSize: "15px",
                        color: "#8864e4",
                        backgroundColor: "#dfb7ff",
                      }}
                    >
                      {i + " "}
                    </span>
                  );
                })}
              </div>
            ) : (
              ""
            )}
            <div style={{ textAlign: "center", margin: "0 auto" }}>
              {this.state.filteredData.length >= 1
                ? this.state.filteredData.map((i) => {
                    if (i.checked === false) {
                      return (
                        <div
                          className="cell"
                          // onClick={() => this.completeHandler(i.index)}
                        >
                          <div className="col-md-1">
                            <input
                              type="radio"
                              style={{ marginTop: "15px" }}
                              onClick={() => this.completeHandler(i.index)}
                            />
                          </div>
                          <div className="col-md" style={{ display: "flex" }}>
                            <p
                              style={{
                                padding: "10px",
                                justifyContent: "flexStart",
                              }}
                            >
                              {" "}
                              {i.todo.split(" ").map((text) => {
                                if (text.includes("#")) {
                                  return (
                                    <span
                                      onClick={() => this.setTag(text)}
                                      style={{
                                        color: "#8864e4",
                                        backgroundColor: "#dfb7ff",
                                      }}
                                    >
                                      {" " + text}
                                    </span>
                                  );
                                } else {
                                  return <span>{text}</span>;
                                }
                              })}
                            </p>
                          </div>
                        </div>
                      );
                    }
                  })
                : this.state.data.map((i) => {
                    if (i.checked === false) {
                      return (
                        <div className="cell">
                          <div className="col-md-1">
                            <input
                              type="radio"
                              style={{ marginTop: "15px" }}
                              onClick={() => this.completeHandler(i.index)}
                            />
                          </div>
                          <div className="col-md" style={{ display: "flex" }}>
                            <p
                              style={{
                                padding: "10px",
                                justifyContent: "flexStart",
                              }}
                            >
                              {" "}
                              {i.todo.split(" ").map((text) => {
                                if (text.includes("#")) {
                                  return (
                                    <span
                                      onClick={() => this.setTag(text)}
                                      style={{
                                        color: "#8864e4",
                                        backgroundColor: "#dfb7ff",
                                      }}
                                    >
                                      {" " + text}
                                    </span>
                                  );
                                } else {
                                  return <span>{text}</span>;
                                }
                              })}
                            </p>
                          </div>
                        </div>
                      );
                    }
                  })}
            </div>
            <h5 style={{ color: "black", padding: "10px", marginLeft: "15px" }}>
              {this.state.data.filter((i) => i.checked === true).length >= 1
                ? "Completed"
                : ""}
            </h5>

            <div style={{ textAlign: "center", margin: "0 auto" }}>
              {this.state.filteredData.length >= 1
                ? this.state.filteredData.map((i) => {
                    if (i.checked === true) {
                      return (
                        <div className="cell">
                          <div className="col-md-1">
                            <input
                              type="radio"
                              style={{ marginTop: "15px" }}
                              onClick={() => this.completeHandler(i.index)}
                            />
                          </div>
                          <div className="col-md" style={{ display: "flex" }}>
                            <p
                              style={{
                                padding: "10px",
                                justifyContent: "flexStart",
                              }}
                            >
                              {" "}
                              {i.todo.split(" ").map((text) => {
                                if (text.includes("#")) {
                                  return (
                                    <span
                                      onClick={() => this.setTag(text)}
                                      style={{
                                        color: "#8864e4",
                                        backgroundColor: "#dfb7ff",
                                      }}
                                    >
                                      {" " + text}
                                    </span>
                                  );
                                } else {
                                  return <span>{text}</span>;
                                }
                              })}
                            </p>
                          </div>
                        </div>
                      );
                    }
                  })
                : this.state.data.map((i) => {
                    if (i.checked === true) {
                      return (
                        <div className="cell">
                          <div className="col-md-1">
                            <input
                              type="radio"
                              style={{ marginTop: "15px" }}
                              checked={i.checked}
                              onClick={() => this.completeHandler(i.index)}
                            />
                          </div>
                          <div className="col-md" style={{ display: "flex" }}>
                            <p
                              style={{
                                padding: "10px",
                                justifyContent: "flexStart",
                              }}
                            >
                              {" "}
                              {i.todo.split(" ").map((text) => {
                                if (text.includes("#")) {
                                  return (
                                    <span
                                      onClick={() => this.setTag(text)}
                                      style={{
                                        color: "#8864e4",
                                        backgroundColor: "#dfb7ff",
                                      }}
                                    >
                                      {" " + text}
                                    </span>
                                  );
                                } else {
                                  return <span>{text}</span>;
                                }
                              })}
                            </p>
                          </div>
                        </div>
                      );
                    }
                  })}
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
