import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EvoLogo from "../ImageAssests/Logo/evo.png";
import appLogo from "../ImageAssests/Logo/Logo.png";
import HomeIcon from "../ImageAssests/ButtonImages/Home.png";
import backIcon from "../ImageAssests/ButtonImages/BackArrow.png";
import nextIcon from "../ImageAssests/ButtonImages/NextArrow.png";
import imageReader from "../ImageAssests/ButtonImages/reader.jpeg";
import "../StyleSheets/HomePage.css";
import localLangData from "../LanguageAsset/evo_lang.json";
import "react-touch-screen-keyboard/lib/Keyboard.css";
import { css } from "@emotion/react";
import ClockLoader from "react-spinners/ClockLoader";
import environment from "../Environment/Environment";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

class LicensePlate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showHomeIcon: false,
      shownCancelScreen: false,
      scanImage: "",
      licencePlateNumber: this.props.location.state.state.auftragData.booking[0].licence_plate,
      socketError: false,
    };
  }
  notify = () =>
    toast.info(localLangData[localStorage.getItem("lang")].call_operator_text, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  componentDidMount() {
    let socket = new WebSocket(environment.DEVICE_MANAGER_IP);
    socket.onopen = function (e) {
      // socket.send("GET IMAGE0");
      socket.send("GET WEIGHT0");
    };
    var tempData = "";
    socket.onmessage = function (event) {
      var tempData = event.data !== 'Connected' ? JSON.parse(event.data) : event.data;
      if (event.data !== 'Connected') {
        if (tempData.msg_type === "image") {
          this.setState({
            scanImage: tempData,
          });
        } else {
          if (tempData.state !== 'bad') {
            this.setState({
              licencePlateNumber: tempData.license_plate,
            });
          } else {
            // this.setState({
            //   licencePlateNumber: '',
            // });
          }
        }
      }
    }.bind(this);

    socket.onerror = function (event) {
      this.setState({
        socketError: true,
        licencePlateNumber: " ",
      });
    }.bind(this);
  }

  gotoHome() {
    this.props.history.push("Home");
  }

  gotoBack() {
    this.props.history.goBack();
  }

  gotoNext() {
    localStorage.setItem("licenseValue", this.state.licencePlateNumber);
    if (this.state.licencePlateNumber === "") {
      document.getElementById("barcodeinput").style.border = "1px solid red";
    } else {
      this.props.history.push("NameComponent", {
        state: {
          authToken: this.props.location.state.state.authToken,
          auftragData: this.props.location.state.state.auftragData,
          licencePlateNumber: this.state.licencePlateNumber,
        },
      });
    }
  }

  keyboardTapInputMethod(e) {
    var tempBarcodeValue = this.state.licencePlateNumber;
    if (e === "<-") {
      tempBarcodeValue = tempBarcodeValue.slice(0, -1);
    } else if (e === "SPACE") {
      tempBarcodeValue = tempBarcodeValue + " ";
    } else {
      tempBarcodeValue = tempBarcodeValue + e;
    }
    document.getElementById("barcodeinput").style.border = "1px solid #000947";
    this.setState({
      licencePlateNumber: tempBarcodeValue,
    });
  }

  decodeBase64() {
    let base64ToString = Buffer.from(this.state.scanImage, "base64").toString();
    return "data:image/jpeg;base64," + base64ToString;
  }

  render() {
    const keyOneLine = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-"];
    const keyTwoLine = ["Q", "W", "E", "R", "T", "Z", "U", "I", "O", "P", "<-"];
    const keyThreeLine = [
      "A",
      "S",
      "D",
      "F",
      "G",
      "H",
      "J",
      "K",
      "L",
      "Ä",
      "Ö",
    ];
    const keyFourLine = ["Y", "X", "C", "V", "B", "N", "M", "Ü", ".", "SPACE"];
    const override = css`
      display: block;
      margin: 0 auto;
      margintop: 100;
      border-color: red;
    `;

    var image = new Image();
    image.src = "data:image/png;base64," + this.state.scanImage.image_data;
    return (
      <div
        style={{
          overflow: "hidden",
          WebkitTouchCallout: "none",
          WebkitUserSelect: "none",
          KhtmlUserSelect: "none",
          MozUserSelect: "nonoe",
          msUserSelect: "none",
          userSelect: "none",
        }}
      >
        <Container style={{ height: "660px" }}>
          <Row style={{ marginTop: "10px" }}></Row>
          <Row style={{ marginTop: "10px" }}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div onClick={() => this.gotoHome()}>
                <img width={80} height={80} src={HomeIcon} />
              </div>
              <div
                style={{
                  width: "280px",
                  marginLeft: "auto",
                  marginRight: "auto",
                  textAlign: "center",
                }}
              >
                <img
                  width={150}
                  height={70}
                  src={EvoLogo}
                  style={{ marginLeft: "40px" }}
                />
                {/* <label
                  style={{
                    fontSize: "10px",
                    fontWeight: "bold",
                    marginLeft: "48px",
                    textAlign: "center",
                  }}
                >
                  {localLangData.de.logo_under_line}
                </label> */}
              </div>
              <div>
                <img width={150} height={70} src={appLogo} />
              </div>
            </div>
          </Row>
          {/* {this.state.scanImage !== "" && this.state.scanImage !== undefined ? ( */}
          <div>
            <Row style={{ marginTop: "20px" }}>
              <Col xs={2}></Col>
              <Col xs={10}>
                {localLangData[localStorage.getItem("lang")]
                  ?.licenseplate_label1 && (
                    <label
                      style={{
                        fontSize: "25px",
                        fontWeight: "bold",
                        color: "#000947",
                        marginLeft: "0px",
                      }}
                    >
                      {
                        localLangData[localStorage.getItem("lang")]
                          ?.licenseplate_label1
                      }
                    </label>
                  )}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "0px",
                  }}
                >
                  <label
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: "#000947",
                      marginLeft: "-158px",
                      marginTop: "15px",
                    }}
                  >
                    {
                      localLangData[localStorage.getItem("lang")]
                        ?.licenseplate_license
                    }
                  </label>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginTop: "0px",
                    }}
                  >
                    <input
                      autoFocus
                      id="barcodeinput"
                      style={{
                        textAlign: "center",
                        marginLeft: "-158px",
                        marginTop: "10px",
                        width: "95%",
                        height: "60px",
                        border: "1px solid #000947",
                        fontSize: "18px",
                      }}
                      value={this.state.licencePlateNumber}
                    />
                  </div>
                </div>
              </Col>
              {/* <Col>
                  <img
                    width={280}
                    height={150}
                    style={{ border: "5px solid black", marginLeft: "-65px" }}
                    src={
                      "data:image/png;base64," + this.state.scanImage.image_data
                    }
                  />
                </Col> */}
            </Row>
            <Row>
              <Col xs={1}></Col>
              {/* <Col xs={5}>
            <label style={{ fontSize: '14px', fontWeight: 'regular', color: '#000947', marginLeft: '20px' }} >{localLangData[localStorage.getItem('lang')].enterbarcode_barcode}</label>
          </Col> */}
              <Col></Col>
            </Row>
            <Row style={{ marginTop: "20px" }}>
              {keyOneLine.map((value, index) => {
                return (
                  <Col
                    style={{ marginLeft: index > 0 ? "-20px" : "0" }}
                    onClick={(e) => this.keyboardTapInputMethod(value)}
                  >
                    <div
                      style={{
                        border: "1px solid black",
                        borderRadius: "4px",
                        width: "80px",
                        height: "80px",
                        textAlign: "center",
                        justifyContent: "center",
                        display: "flex",
                        alignItems: "center",
                        color: "#000947",
                      }}
                    >
                      {value}
                    </div>
                  </Col>
                );
              })}
            </Row>
            <Row style={{ marginTop: "5px" }}>
              {keyTwoLine.map((value, index) => {
                return (
                  <Col
                    style={{ marginLeft: index > 0 ? "-20px" : "0" }}
                    onClick={(e) => this.keyboardTapInputMethod(value)}
                  >
                    <div
                      style={{
                        border: "1px solid black",
                        borderRadius: "4px",
                        width: "80px",
                        height: "80px",
                        textAlign: "center",
                        justifyContent: "center",
                        display: "flex",
                        alignItems: "center",
                        color: "#000947",
                      }}
                    >
                      {value}
                    </div>
                  </Col>
                );
              })}
            </Row>
            <Row style={{ marginTop: "5px" }}>
              {keyThreeLine.map((value, index) => {
                return (
                  <Col
                    style={{ marginLeft: index > 0 ? "-20px" : "0" }}
                    onClick={(e) => this.keyboardTapInputMethod(value)}
                  >
                    <div
                      style={{
                        border: "1px solid black",
                        borderRadius: "4px",
                        width: "80px",
                        height: "80px",
                        textAlign: "center",
                        justifyContent: "center",
                        display: "flex",
                        alignItems: "center",
                        color: "#000947",
                      }}
                    >
                      {value}
                    </div>
                  </Col>
                );
              })}
            </Row>
            <Row style={{ marginTop: "5px" }}>
              {keyFourLine.map((value, index) => {
                return (
                  <Col
                    style={{ marginLeft: index > 0 ? "-20px" : "0" }}
                    onClick={(e) => this.keyboardTapInputMethod(value)}
                  >
                    <div
                      style={{
                        border: "1px solid black",
                        borderRadius: "4px",
                        width: "80px",
                        minWidth: value === "SPACE" ? "167px" : 0,
                        height: "80px",
                        textAlign: "center",
                        justifyContent: "center",
                        display: "flex",
                        alignItems: "center",
                        color: "#000947",
                      }}
                    >
                      {value}
                    </div>
                  </Col>
                );
              })}
            </Row>
          </div>
          {/* ) :  */}
          {this.state.socketError ? (
            <div style={{ marginTop: "150px" }}>
              <label
                style={{
                  fontSize: "25px",
                  fontWeight: "bold",
                  color: "red",
                  marginLeft: "65px",
                  marginTop: "25px",
                }}
              >
                {localLangData[localStorage.getItem("lang")]?.socket_Error}
              </label>
            </div>
          ) : (
            <div style={{ marginTop: "150px" }}>
              <ClockLoader
                color={"#000947"}
                loading={true}
                css={override}
                size={150}
                id="loaderone"
              />
              <label
                style={{
                  fontSize: "40px",
                  fontWeight: "bold",
                  color: "#000947",
                  marginLeft: "320px",
                  marginTop: "25px",
                }}
              >
                {localLangData[localStorage.getItem("lang")]?.waitclockmsg +
                  "..."}
              </label>
            </div>
          )}
        </Container>
        {/* {this.state.scanImage !== "" && this.state.scanImage !== undefined ? ( */}
        <Row>
          <Col xs={4}>
            <div style={{ marginLeft: "30px" }}>
              <img
                width={80}
                height={80}
                src={backIcon}
                onClick={() => this.gotoBack()}
              />
            </div>
          </Col>
          <Col xs={4}>
            {/* <div style={{ marginLeft: "145px" }}>
                <img
                  width={64}
                  height={64}
                  src={`${process.env.PUBLIC_URL}/assets/phone-call.png`}
                  onClick={() => this.notify()}
                />
              </div> */}
          </Col>
          <Col xs={4}>
            <div style={{ marginRight: "30px", float: "right" }}>
              <img
                width={80}
                height={80}
                src={nextIcon}
                onClick={() => this.gotoNext()}
              />
            </div>
          </Col>
        </Row>
        {/* ) : null} */}
      </div>
    );
  }
}

export default LicensePlate;
