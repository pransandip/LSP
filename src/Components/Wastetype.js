import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import EvoLogo from '../ImageAssests/Logo/evo.png';
import appLogo from '../ImageAssests/Logo/Logo.png';
import HomeIcon from '../ImageAssests/ButtonImages/Home.png';
import backIcon from '../ImageAssests/ButtonImages/BackArrow.png';
import nextIcon from '../ImageAssests/ButtonImages/NextArrow.png';
import SignatureCanvas from 'react-signature-canvas';
import imageReader from "../ImageAssests/ButtonImages/Einfahrt.jpg";
import imageReader1 from "../ImageAssests/ButtonImages/Einfahrt1.jpeg";
import { Link } from "react-router-dom";
import '../StyleSheets/HomePage.css';
import localLangData from '../LanguageAsset/evo_lang.json';
import Select from 'react-select'
import '../StyleSheets/Vehicletype.css';
import { ToastContainer, toast } from 'react-toastify';
import { css } from "@emotion/react";
import ClockLoader from "react-spinners/ClockLoader";
import environment from '../Environment/Environment';
import moment from 'moment';
import * as actions from "../actions/index";
import { connect } from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
var tempintervalid = '';
class Wastetype extends Component {

    constructor(props) {
        super(props);
        console.log('this. props', this.props);
        this.state = {
            menuIsOpen: true,
            scanImage1: '',
            bookingData: this.props.location.state.booking_Data,

            orderDetailState: false,
            vehicalListState: false,
            vehicalIdState: false,
            transactionDataState: false,
        }

    }

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

    componentDidMount() {
        if (tempintervalid) {
            clearInterval(tempintervalid);
        }

    }



    notify = () => toast.info(localLangData[localStorage.getItem('lang')].call_operator_text, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    saveDataToDb() {
        let orderTempData = this.props.location.state.oderDetailsData;
        orderTempData.driver_mobile = this.props.location.state.mobileNumber
        this.props.save_order_data(orderTempData);
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
            this.success();
            tempintervalid = setInterval(() => {
                this.props.history.push('');
                let tempPdf = nextProps.pdf_data.data.pdf;
                tempPdf = tempPdf.replace(/"/ig, '');
                console.log(tempPdf);
                let pdfWindow = window.open("")
                pdfWindow.document.write("<iframe width='100%' height='100%' src='data:application/pdf;base64, " + encodeURI(tempPdf) + "'></iframe>")
            }, 30000)

        }

    }


    componentDidMount() {
        if (tempintervalid) {
            clearInterval(tempintervalid);
        }
        // tempintervalid = setInterval(() => { this.props.history.push('Home') }, 3000)
        // let socket = new WebSocket(environment.DEVICE_MANAGER_IP);
        // socket.onopen = function (e) {
        //     socket.send("GET IMAGE1");
        // };
        // var tempData = ''
        // socket.onmessage = function (event) {
        //     var tempData = JSON.parse(event.data);
        //     if (tempData.msg_type === 'image') {
        //         this.setState({
        //             scanImage1: tempData
        //         })
        //     }

        // }.bind(this);

        // socket.onerror = function (event) {
        //     this.setState({
        //         socketError: true,
        //         licencePlateNumber: ' '
        //     })
        // }.bind(this);

        // axios.get(`http://80.152.148.142:8888/api/booking/` ,{

        // })
        // .then(res => {
        //   console.log("running")
        //   this.setState({bookingData:res.data})
        // })

        this.setState({
            bookingData: this.props.location.state.booking_Data
        })
    }

    componentWillUnmount() {
        clearInterval(tempintervalid);
    }

    gotoHome() {
        this.props.history.push('Home');
    }
    gotoBack() {
        this.props.history.goBack();
    }

    gotoNext(data) {
        this.props.history.push('Nameinput', {
            oderDetailsData: data
        });
    }

    clearCanvas() {
        this.sigCanvas.clear();
    }

    sendOrderDetailToServerDatabase() {
        const orderData = this.props.location.state.bookingData;
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
            "licence_plate": this.props.location.state.licencePlateNumber || orderData.licence_plate,
            "location": orderData.location,
            "transport_number": orderData.transport_number,
            "carrier_creditor_number": orderData.carrier_creditor_number,
            "status": orderData.status
        }

        console.log('all day', dataTosend);
        this.gotoNext(dataTosend);
    }



    render() {
        const override = css`
        display: block;
         margin: 0 auto;
         marginTop: 100;
        border-color: red;
        `;
        //const barcodeValue = this.props.location.state.state.auftragData;
        const licenseValue = this.props.location.state.licencePlateNumber;
        const nameValue = this.props?.location?.state?.nameInputValue;
        //const firstWeight = this.props?.location?.state?.state?.first_weight;
        //const processValue = this.props?.location?.state?.state?.auftragData?.Sortenbezeichnung;

        return (
            <div style={{
                overflow: 'hidden',
                WebkitTouchCallout: 'none',
                WebkitUserSelect: 'none',
                KhtmlUserSelect: 'none',
                MozUserSelect: 'nonoe',
                msUserSelect: 'none',
                userSelect: 'none'
            }}>
                <Row style={{ marginTop: '30px' }}>
                    <Col >
                        <div style={{ marginLeft: '30px' }} onClick={() => this.gotoHome()}>
                            <img width={80} height={80} src={HomeIcon} />
                        </div>
                    </Col>
                    <Col xs={7}>
                        <div style={{
                            width: '250px',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            textAlign: 'center'
                        }}>
                            <img width={150} height={70} src={EvoLogo} />
                            {/* <label style={{ fontSize: '10px', fontWeight: 'bold', alignSelf: 'center' }} >{localLangData.de.logo_under_line}</label> */}
                        </div>
                    </Col>
                    <Col >
                        <div style={{ marginRight: '42px' }}>
                            <img width={150} height={70} src={appLogo} />
                        </div>
                    </Col>
                </Row>

                <Container style={{ background: '', height: '100%' }} >
                    {this.state.showSuccessMsg ?
                        <div >
                            <Row>
                                <label
                                    style={{
                                        fontSize: "20px",
                                        fontWeight: "bold",
                                        color: "#000947",
                                        marginLeft: "20px",
                                        marginTop: "20px",
                                    }}
                                >
                                    {
                                        localLangData[localStorage.getItem("lang")]
                                            .ThankYouMessage
                                    }
                                </label>
                            </Row>
                            <Row>
                                <div style={{width:'250px', height:'218px',border: "5px solid black", marginLeft:'345px', marginTop:'20px', alignContent:'center'}}>
                                    <img
                                        width={235}
                                        height={204}
                                        style={{marginLeft:'-10px', marginTop:'3px'  }}
                                        src={imageReader}
                                    />
                                </div>
                            </Row>
                            <Row>
                                <label
                                    style={{
                                        fontSize: "20px",
                                        fontWeight: "bold",
                                        color: "#000947",
                                        marginLeft: "20px",
                                        marginTop: "20px",
                                    }}
                                >
                                    {
                                        localLangData[localStorage.getItem("lang")]
                                            .ThankYouMessage1
                                    }
                                </label>
                            </Row>
                            <Row>
                                <div style={{width:'250px', height:'218px',border: "5px solid black", marginLeft:'345px', marginTop:'20px', alignContent:'center'}}>
                                    <img
                                        width={235}
                                        height={204}
                                        style={{marginLeft:'-10px', marginTop:'3px'  }}
                                        src={imageReader1}
                                    />
                                </div>
                            </Row>
                           
                        </div>
                        :
                        this.props.isOrderDetailDataLoading ||
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
                            <Row style={{ marginTop: '50px' }}>
                                <Col>
                                    <div>
                                        <label style={{ fontSize: '25px', fontWeight: 'bold', color: '#000947', marginLeft: '162px' }} >{localLangData[localStorage.getItem('lang')].signature_label}</label>
                                    </div>
                                    <Row style={{ marginTop: '20px', marginLeft: '200px' }}>
                                        <Col>
                                            <label style={{ fontSize: '25px', fontWeight: 'bold', color: '#000947', marginLeft: '5px' }} >{localLangData[localStorage.getItem('lang')].sign_name}</label>
                                        </Col>

                                        <Col>
                                            <label style={{ fontSize: '25px', fontWeight: 'bold', color: '#000947', marginLeft: '0px' }} >{nameValue || this.state.bookingData.driver_name}</label>
                                        </Col>

                                    </Row>
                                    <Row style={{ marginTop: '20px', marginLeft: '200px' }}>
                                        <Col>
                                            <label style={{ fontSize: '25px', fontWeight: 'bold', color: '#000947', marginLeft: '5px' }} >{localLangData[localStorage.getItem('lang')].sign_barcode}</label>
                                        </Col>

                                        <Col>
                                            <label style={{ fontSize: '25px', fontWeight: 'bold', color: '#000947', marginLeft: '0px' }} >{this.state.bookingData.transport_number}</label>
                                        </Col>

                                    </Row>
                                    <Row style={{ marginTop: '20px', marginLeft: '200px' }}>
                                        <Col>
                                            <label style={{ fontSize: '25px', fontWeight: 'bold', color: '#000947', marginLeft: '5px' }} >{localLangData[localStorage.getItem('lang')].sign_license}</label>
                                        </Col>

                                        <Col>
                                            <label style={{ fontSize: '25px', fontWeight: 'bold', color: '#000947', marginLeft: '0px' }} >{licenseValue || this.state.bookingData.licence_plate}</label>
                                        </Col>

                                    </Row>
                                    <Row style={{ marginTop: '20px', marginLeft: '200px' }}>
                                        <Col>
                                            <label style={{ fontSize: '25px', fontWeight: 'bold', color: '#000947', marginLeft: '5px' }} >{localLangData[localStorage.getItem('lang')].MobileNumber}</label>
                                        </Col>

                                        <Col>
                                            <label style={{ fontSize: '25px', fontWeight: 'bold', color: '#000947', marginLeft: '0px' }} >{this.props.location.state.mobileNumber}</label>
                                        </Col>

                                    </Row>
                                    {/* <Row style={{ marginTop: '20px', marginLeft: '200px' }}>
                                    <Col>
                                        <label style={{ fontSize: '25px', fontWeight: 'bold', color: '#000947', marginLeft: '5px' }} >{localLangData[localStorage.getItem('lang')].location}</label>
                                    </Col>

                                    <Col>
                                        <label style={{ fontSize: '25px', fontWeight: 'bold', color: '#000947', marginLeft: '0px' }} >{this.state.bookingData.location}</label>
                                    </Col>

                                </Row> */}
                                    {/* <Row style={{ marginTop: '20px', marginLeft: '200px' }}>
                                    <Col>
                                        <label style={{ fontSize: '25px', fontWeight: 'bold', color: '#000947', marginLeft: '5px' }} >{localLangData[localStorage.getItem('lang')].sign_process}</label>
                                    </Col>

                                    <Col>
                                        <label style={{ fontSize: '25px', fontWeight: 'bold', color: '#000947', marginLeft: '0px' }} >{processValue}</label>
                                    </Col>

                                </Row> */}


                                    <Row style={{ marginTop: '20px', marginLeft: '200px' }}>
                                        {/* <Col>
                                        <label style={{ fontSize: '25px', fontWeight: 'bold', color: '#000947', marginLeft: '5px' }} >{localLangData[localStorage.getItem('lang')].sign_first}</label>
                                    </Col>

                                    <Col>
                                        <label style={{ fontSize: '25px', fontWeight: 'bold', color: '#000947', marginLeft: '0px' }} >{firstWeight}</label>
                                    </Col> */}

                                    </Row>
                                </Col>
                            </Row>)}

                </Container>
               {!this.state.showSuccessMsg? <Row>
                    <Col xs={4}>
                        <div style={{ marginLeft: '30px' }} >
                            <img width={80} height={80} src={backIcon} onClick={() => this.gotoBack()} />
                        </div>
                    </Col>
                    <Col xs={4}>
                        {/* <div style={{ marginLeft: '145px' }}>
                            <img width={64} height={64} src={`${process.env.PUBLIC_URL}/assets/phone-call.png`} onClick={() => this.notify()} />
                        </div> */}
                    </Col>
                    <Col xs={4}>
                        <div style={{ marginRight: '30px', float: 'right', borderRadius: '5px', border: '1px solid #000947', width: '200px', height: '50px', marginTop: '10px' }} onClick={() => this.saveDataToDb()}>
                            <label style={{ fontSize: '25px', fontWeight: 'bold', color: '#000947', marginLeft: localStorage.getItem('lang') === 'de' ? '25px' : '50px', marginTop: '4px' }} >{localLangData[localStorage.getItem('lang')].approve_btn_txt}</label>
                        </div>
                    </Col>

                </Row> : null}

            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    order_detail_data: state.HomeProcessReducers.order_detail_data,
    isOrderDetailDataLoading: state.HomeProcessReducers.isOrderDetailDataLoading,
    isVehicalIdRequestLoading: state.HomeProcessReducers.isVehicalIdRequestLoading,
    vehical_id_data: state.HomeProcessReducers.vehical_id_data,
    isTransactionDataRequestLoading: state.HomeProcessReducers.isTransactionDataRequestLoading,
    transaction_data: state.HomeProcessReducers.transaction_data,
    isPdfDataRequestLoading: state.HomeProcessReducers.isPdfDataRequestLoading,
    pdf_data: state.HomeProcessReducers.pdf_data,
    isVehicalListRequestLoading: state.HomeProcessReducers.isVehicalListRequestLoading,
    vehical_list: state.HomeProcessReducers.vehical_list
});

const mapDispatchToProps = (dispatch) => ({
    save_order_data: (orderData) =>
        dispatch(actions.saveOrderDetailDataRequest(orderData)),
    get_vehical_list: (transportNumber) =>
        dispatch(actions.getVehicalListRequest(transportNumber)),
    get_vehical_id: (transportNumber) =>
        dispatch(actions.getVehicalIdRequest(transportNumber)),
    save_transaction_data: (transactionData) =>
        dispatch(actions.saveTransactionDataRequest(transactionData)),
    get_pdf_data: (transportNumber) =>
        dispatch(actions.getPdfDataRequest(transportNumber, '1'))
});

export default connect(mapStateToProps, mapDispatchToProps)(Wastetype);
