import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EvoLogo from "../ImageAssests/Logo/evo.png";
import appLogo from "../ImageAssests/Logo/Logo.png";
import HomeIcon from "../ImageAssests/ButtonImages/Home.png";
import backIcon from "../ImageAssests/ButtonImages/BackArrow.png";
import nextIcon from "../ImageAssests/ButtonImages/NextArrow.png";
import imageReader from "../ImageAssests/ButtonImages/Einfahrt.jpg";
import "../StyleSheets/HomePage.css";
import moment from 'moment';
import { connect } from "react-redux";
import * as actions from "../actions/index";
import environment from "../Environment/Environment";
import localLangData from "../LanguageAsset/evo_lang.json";
import "react-touch-screen-keyboard/lib/Keyboard.css";
import ClockLoader from "react-spinners/ClockLoader";
import { css } from "@emotion/react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
var tempintervalid = '';
class Nameinput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showHomeIcon: false,
      shownCancelScreen: false,
      barcodeInputValue: "",
      showSuccessMsg: false,
      bookingData: this.props.location.state.state.auftragData.booking[0],
      licencePlateNumber: this.props.location.state.state.licencePlateNumber,
      nameInputValue: this.props.location.state.state.nameInputValue,

      orderDetailState: false,
      vehicalListState: false,
      vehicalIdState: false,
      transactionDataState: false,
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
  success = () => {
    // toast.success("success", {
    //   position: "bottom-right",
    //   autoClose: 5000,
    //   hideProgressBar: true,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    // });
    this.setState({
      showSuccessMsg: true
    })
  }

  saveDataToDb() {
    let orderTempData = this.props.location.state.oderDetailsData;
    orderTempData.driver_mobile = this.state.barcodeInputValue
    this.props.save_order_data(orderTempData);
  }

  componentDidMount() {
    if (tempintervalid) {
      clearInterval(tempintervalid);
    }
    this.setState({
      bookingData: this.props.location.state.state.auftragData.booking[0]
    })
  }

  sendOrderDetailToServerDatabase() {
    const orderData = this.props.location.state.state.auftragData.booking[0];
    const currentDate = moment(new Date()).format('yyyy-MM-DDTHH:mm:ss.SSSSSSZ');
    var dataTosend = {
      "comment": "",
      "driver_mobile": orderData.driver_mobile,
      "driver_name": this.props?.location?.state?.state?.nameInputValue || orderData.driver_name,
      "entries": [
        {
          "qualifier": "dispatch.status.registration",
          "value": currentDate
        }
      ],
      "extensions": [
      ],
      "gate": orderData.gate,
      "licence_plate": this.props.location.state.state.licencePlateNumber || orderData.licence_plate,
      "location": orderData.location,
      "transport_number": orderData.transport_number,
      "carrier_creditor_number": orderData.carrier_creditor_number,
      "status": orderData.status
    }

    console.log('all day', dataTosend);
    this.gotoNext(dataTosend);
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.order_detail_data) {
      if (nextProps.order_detail_data.status === 202) {
        // this.success();
        // tempintervalid = setInterval(() => {
        //   let tempPdf = this.props.location.state.pdf;
        //   //tempPdf = tempPdf.replace(/"/ig, '');
        //   console.log(tempPdf);
        //   let pdfWindow = window.open("")
        //   pdfWindow.document.write("<iframe width='100%' height='100%' src='data:application/pdf;base64, " + encodeURI(tempPdf) + "'></iframe>")
        //   //this.props.history.push('')
        // }, 10000)
        !this.state.orderDetailState && this.props.get_vehical_list(this.props.location.state.oderDetailsData.licence_plate);
        this.setState({
          orderDetailState: true
        })

      }
    }
    if (nextProps.vehical_list) {
      if (nextProps.vehical_list.length > 0) {
        var tempTransactionData = {
          "deduction_weight": null,
          "material_weight": null,
          "combination_id": "",
          "first_weight": null,
          "second_weight": null,
          "net_weight": null,
          "total_price": null,
          "lfd_nr": "",
          "firstw_date_time": null,
          "secondw_date_time": null,
          "firstw_alibi_nr": "",
          "secondw_alibi_nr": "",
          "vehicle_weight_flag": null,
          "vehicle_second_weight_flag": null,
          "trans_flag": null,
          "price_per_item": null,
          "status": "0",
          "gate": this.props.location.state.oderDetailsData.gate,
          "booking_status": this.props.location.state.oderDetailsData.status,
          "location": this.props.location.state.oderDetailsData.location,
          "driver_mobile": this.state.barcodeInputValue,
          "driver_name": this.props.location.state.oderDetailsData.driver_name,
          "transport_number": this.props.location.state.oderDetailsData.transport_number,
          "vehicle": nextProps.vehical_list[0].data.id,
          "article": null,
          "customer": null,
          "supplier": null,
          "container": null,
          "yard": 1,
          "contract_number": null,
          "carrier_creditor_number": this.props.location.state.oderDetailsData.carrier_creditor_number,
          "deduction": []
        }

        !this.state.vehicalListState && this.props.save_transaction_data(tempTransactionData);
        this.setState({
          vehicalListState: true
        })
      } else {
        !this.state.vehicalListState && this.props.get_vehical_id(this.props.location.state.oderDetailsData.licence_plate);
        this.setState({
          vehicalListState: true
        })
      }
    }
    if (nextProps.vehical_id_data) {
      var tempTransactionData = {
        "deduction_weight": null,
        "material_weight": null,
        "combination_id": "",
        "first_weight": null,
        "second_weight": null,
        "net_weight": null,
        "total_price": null,
        "lfd_nr": "",
        "firstw_date_time": null,
        "secondw_date_time": null,
        "firstw_alibi_nr": "",
        "secondw_alibi_nr": "",
        "vehicle_weight_flag": null,
        "vehicle_second_weight_flag": null,
        "trans_flag": null,
        "price_per_item": null,
        "status": "0",
        "gate": this.props.location.state.oderDetailsData.gate,
        "booking_status": this.props.location.state.oderDetailsData.status,
        "location": this.props.location.state.oderDetailsData.location,
        "driver_mobile": this.state.barcodeInputValue,
        "driver_name": this.props.location.state.oderDetailsData.driver_name,
        "transport_number": this.props.location.state.oderDetailsData.transport_number,
        "vehicle": nextProps.vehical_id_data.data.id,
        "article": null,
        "customer": null,
        "supplier": null,
        "container": null,
        "yard": 1,
        "contract_number": null,
        "deduction": [],
        "carrier_creditor_number": this.props.location.state.oderDetailsData.carrier_creditor_number,
        "registration": true
      }

      !this.state.vehicalIdState && this.props.save_transaction_data(tempTransactionData);
      this.setState({
        vehicalIdState: true
      })

    }

    if (nextProps.transaction_data) {
      !this.state.transactionDataState && this.props.get_pdf_data(this.props.location.state.oderDetailsData.transport_number)
      this.setState({
        transactionDataState: true
      })
    }

    if (nextProps.pdf_data) {
      this.props.history.push('/');
      let tempPdf = nextProps.pdf_data.data.pdf;
      tempPdf = tempPdf.replace(/"/ig, '');
      console.log(tempPdf);
      let pdfWindow = window.open("")
      pdfWindow.document.write("<iframe width='100%' height='100%' src='data:application/pdf;base64, " + encodeURI(tempPdf) + "'></iframe>")
    }

  }

  componentWillUnmount() {
    // clearInterval(tempintervalid);
  }

  // componentWillReceiveProps(nextProps) {
  //   var tempComingFrom = this.props.location.state.comingFrom;
  //   if (nextProps.auftrag_data) {
  //     if (tempComingFrom.toLowerCase() === "") {
  //       this.props?.history?.push("LicensePlate", {
  //         state: {
  //           authToken: this.props.location.state.state.authToken,
  //           auftragData: nextProps.auftrag_data.data,
  //         },
  //       });
  //     }
  //   }

  //   if (nextProps.first_weight_data) {
  //     this.props.history.push("TruckType", {
  //       state: {
  //         authToken: this.props.location.state.state.authToken,
  //         first_weight_data: nextProps.first_weight_data.data,
  //         comingFrom: tempComingFrom,
  //       },
  //     });
  //   }
  // }

  gotoHome() {
    this.props.history.push("Home");

    // var tempComingFrom = this.props.location.state.comingFrom;

    // switch (tempComingFrom.toLowerCase()) {
    //   case "annahmeabfallacceptancehome":
    //     this.props.history.push("AnnahmeAbfallAcceptanceHome");
    //     break;
    //   case "":
    //     this.props.history.push("");
    //     break;
    // }
  }

  gotoBack() {
    this.props.history.goBack();
  }

  gotoNext(data) {
    if (this.state.barcodeInputValue === "") {
      document.getElementById("barcodeinput").style.border = "1px solid red";
    } else {
      // var tempComingFrom = this.props.location.state.comingFrom;
      localStorage.setItem(
        "barcodeValue",
        this.props.location,
        this.state.barcodeInputValue
      );
      this.props.history.push('Wastetype', {
        oderDetailsData: data,
        booking_Data: this.state.bookingData,
        mobileNumber: this.state.barcodeInputValue,
        licencePlateNumber: this.state.licencePlateNumber,
        nameInputValue: this.state.nameInputValue,
      });
    }
  }

  keyboardTapInputMethod(e) {
    var tempBarcodeValue = this.state.barcodeInputValue;
    if (e === "<-") {
      tempBarcodeValue = tempBarcodeValue.slice(0, -1);
    } else if (e === "SPACE") {
      tempBarcodeValue = tempBarcodeValue + " ";
    } else {
      tempBarcodeValue = tempBarcodeValue + e;
    }
    document.getElementById("barcodeinput").style.border = "1px solid #000947";
    this.setState({
      barcodeInputValue: tempBarcodeValue,
    });
  }

  getOrderDetails() {
    var tempAuftragData = {
      client_id: environment.client_id,
      password: environment.password,
      user_id: environment.user_id,
      order_id: this.state.barcodeInputValue,
    };
    this.props.get_Auftrag_data(tempAuftragData);
  }

  render() {
    const keyOneLine = ["1", "2", "3", "+"];
    const keyTwoLine = ["4", "5", "6", "<-"];
    const keyThreeLine = ["7", "8", "9", "0"];
    // const keyFourLine = ['Y', 'X', 'C', 'V', 'B', 'N', 'M', 'Ü', '.', 'SPACE'];
    const override = css`
      display: block;
      margin: 0 auto;
      margintop: 100;
      border-color: red;
    `;
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
          {this.state.showSuccessMsg ?
            <div >
              <Row style={{ marginTop: "10px" }}></Row>
              <Row style={{ marginTop: "10px" }}>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div onClick={() => this.gotoHome()}>
                    <Link to="/">
                      <img width={80} height={80} src={HomeIcon} />
                    </Link>
                  </div>
                  <div
                    style={{
                      width: "250px",
                      marginLeft: "auto",
                      marginRight: "auto",
                      textAlign: "center",
                    }}
                  >
                    <img width={150} height={70} src={EvoLogo} />
                    {/* <label style={{ fontSize: "10px", fontWeight: "bold" }}>
               {localLangData.de.logo_under_line}
             </label> */}
                  </div>
                  <div>
                    <img width={150} height={70} src={appLogo} />
                  </div>
                </div>
              </Row>
              <Row>
                <label
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#000947",
                    marginLeft: "203px",
                    marginTop: "265px",
                  }}
                >
                  {
                    localLangData[localStorage.getItem("lang")]
                      .ThankYouMessage
                  }
                </label>
              </Row>
              <Row>
                <img
                  width={150}
                  height={150}
                  style={{ border: "5px solid black" }}
                  src={imageReader}
                />
              </Row>
            </div>
            :
            <div>
              <Row style={{ marginTop: "10px" }}></Row>
              <Row style={{ marginTop: "10px" }}>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div onClick={() => this.gotoHome()}>
                    <Link to="/">
                      <img width={80} height={80} src={HomeIcon} />
                    </Link>
                  </div>
                  <div
                    style={{
                      width: "250px",
                      marginLeft: "auto",
                      marginRight: "auto",
                      textAlign: "center",
                    }}
                  >
                    <img width={150} height={70} src={EvoLogo} />
                    {/* <label style={{ fontSize: "10px", fontWeight: "bold" }}>
                  {localLangData.de.logo_under_line}
                </label> */}
                  </div>
                  <div>
                    <img width={150} height={70} src={appLogo} />
                  </div>
                </div>
              </Row>

              <Row style={{ marginTop: "20px" }}>
                <Col xs={1}></Col>
                <Col xs={9} style={{ marginLeft: '42px' }}>
                  <label
                    style={{
                      fontSize: "25px",
                      fontWeight: "bold",
                      color: "#000947",
                      marginLeft: "20px",
                    }}
                  >
                    {
                      localLangData[localStorage.getItem("lang")]
                        .numberinput_lable
                    }
                  </label>
                  <label
                    style={{
                      fontSize: "25px",
                      fontWeight: "bold",
                      color: "#000947",
                      marginLeft: "20px",
                    }}
                  >
                    {
                      localLangData[localStorage.getItem("lang")]
                        .numberinput_lable1
                    }
                  </label>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginTop: "20px",
                    }}
                  >
                    <label
                      style={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        color: "#000947",
                        marginLeft: "20px",
                        marginTop: "14px",
                      }}
                    >
                      {
                        localLangData[localStorage.getItem("lang")]
                          .enternumber_lable
                      }
                    </label>
                    <input
                      autoFocus
                      id="barcodeinput"
                      style={{
                        textAlign: "center",
                        marginLeft: "80px",
                        width: "64%",
                        height: "60px",
                        border: "1px solid #000947",
                        fontSize: "40px",
                      }}
                      value={this.state.barcodeInputValue}
                    />
                  </div>
                </Col>
                {/* <Col></Col>
                <Col>
                  <img
                    width={150}
                    height={150}
                    style={{ border: "5px solid black" }}
                    src={imageReader}
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
              {this.props.isOrderDetailDataLoading ||
                this.props.isVehicalIdRequestLoading ||
                this.props.isTransactionDataRequestLoading ||
                this.props.isPdfDataRequestLoading ||
                this.props.isVehicalListRequestLoading ? (
                <div style={{ marginTop: "30px" }}>
                  <ClockLoader
                    color={"#000947"}
                    loading={true}
                    css={override}
                    size={50}
                    id="loaderone"
                  />
                  <label
                    style={{
                      fontSize: "40px",
                      fontWeight: "bold",
                      color: "#000947",
                      marginLeft: "280px",
                      marginTop: "25px",
                    }}
                  >
                    {localLangData[localStorage.getItem("lang")]
                      .waitclockmsg + "..."}
                  </label>
                </div>
              ) : (
                <div>
                  <Row style={{ marginTop: "20px" }}>
                    {keyOneLine.map((value, index) => {
                      return (
                        <Col
                          style={{ marginLeft: index === 0 ? "245px" : "-300px" }}
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
                              fontSize: "50px",
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
                  <Row style={{ marginTop: "10px" }}>
                    {keyTwoLine.map((value, index) => {
                      return (
                        <Col
                          style={{ marginLeft: index === 0 ? "245px" : "-300px" }}
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
                              fontSize: "50px",
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
                  <Row style={{ marginTop: "10px" }}>
                    {keyThreeLine.map((value, index) => {
                      return (
                        <Col
                          style={{ marginLeft: index === 0 ? "245px" : "-300px" }}
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
                              fontSize: "50px",
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
                  {/* <Row style={{ marginTop: '10px' }}>
                {keyFourLine.map((value, index) => {
                  return (
                    <Col style={{ marginLeft: index > 0 ? '-20px' : '0' }} onClick={(e) => this.keyboardTapInputMethod(value)}>
                      <div style={{
                        border: '1px solid black',
                        borderRadius: '4px',
                        width: '80px',
                        minWidth: value === 'SPACE' ? '160px' : 0,
                        height: '80px',
                        textAlign: 'center',
                        justifyContent: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        color: '#000947',
                      }}>{value}</div>
                    </Col>
                  )
                })}
              </Row> */}
                </div>
              )}
            </div>}
        </Container>
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
            <div
              style={{ marginRight: "30px", float: "right" }}
              onClick={() => this.sendOrderDetailToServerDatabase()}
            >
              <img width={80} height={80} src={nextIcon} />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Nameinput;
