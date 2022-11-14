import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import EvoLogo from '../../ImageAssests/Logo/evo.png';
import appLogo from '../../ImageAssests/Logo/Logo.png';
import HomeIcon from '../../ImageAssests/ButtonImages/Home.png';
import backIcon from '../../ImageAssests/ButtonImages/BackArrow.png';
import nextIcon from '../../ImageAssests/ButtonImages/NextArrow.png';
import '../../StyleSheets/HomePage.css';
import { css } from "@emotion/react";
import moment from 'moment';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import ClockLoader from "react-spinners/ClockLoader";
import environment from '../../Environment/Environment';
import localLangData from '../../LanguageAsset/evo_lang.json';
import SignatureCanvas from 'react-signature-canvas';
import html2canvas from 'html2canvas';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

class SignatureLable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showHomeIcon: false,
            shownCancelScreen: false,
            // firstWeightData: this.props.location.state.first_weight_data[0],
            second_weight: '',
            second_image1: '',
            second_image2: '',
            second_weight_datetime: '',
            second_alibinr: '',
            pdf_data: '',

            orderDetailStatus: false,
            transactionIdStatus: false,
            transactionDataState: false,
            pdfdataSaveStatus: false,


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

    componentWillReceiveProps(nextProps) {
        if (nextProps.order_second_detail_data) {
            if (nextProps.order_second_detail_data) {
                !this.state.orderDetailStatus && this.props.get_transaction_id(nextProps.order_second_detail_data.data.booking[0].transport_number);
                this.setState({
                    orderDetailStatus: true
                })
            }

        }
        if (nextProps.transaction_id) {
            if (nextProps.transaction_id.data.length > 0) {
                var tempDT = moment(new Date()).format('yyyy-MM-DDTHH:mm:ss.SSSSSSZ');;
                var tempTransactionData = {
                    "second_weight": this.state.second_weight,
                    "net_weight": this.state.second_weight,
                    "secondw_date_time": tempDT,
                    "secondw_alibi_nr": this.state.second_alibinr,
                    "trans_flag": 1,
                    "yard": 1,
                    "transactionId": nextProps.transaction_id.data[0].id,
                }

                !this.state.transactionIdStatus && this.props.save_second_transaction_data(tempTransactionData);
                this.setState({
                    transactionIdStatus: true
                })

            }
        }

        if (nextProps.transaction_data) {
            !this.state.transactionDataState && this.props.get_pdf_data(nextProps.transaction_data.data.id)
            this.setState({
                transactionDataState: true
            })

        }

        if (nextProps.pdf_data) {
            let tempPdf = nextProps.pdf_data.data.pdf;
            tempPdf = tempPdf.replace(/"/ig, '');
            this.setState({
                pdf_data: tempPdf
            })

            let tempPdfData = {
                "pull_id": null,
                "file": [
                    {
                        "name": "DeliveryNote_" + this.props.order_second_detail_data.data.booking[0].transport_number + '.pdf',
                        "qualifier": "attachment.type.deliverynote",
                        "description": "Delivery note",
                        "content_type": null,
                        "content_encoding": null,
                        "content": nextProps.pdf_data.data.pdf,
                        "transport_number": this.props.order_second_detail_data.data.booking[0].transport_number,
                        "delivery_number": null,
                        "parameters": null
                    }
                ]
            }

            !this.state.pdfdataSaveStatus && this.props.save_Pdf_Data_To_Transporian(tempPdfData);
            this.setState({
                pdfdataSaveStatus: true
            })
        }

        if (nextProps.pdfSaveResponse) {

            let pdfWindow = window.open("")
            pdfWindow.document.write("<iframe width='100%' height='100%' src='data:application/pdf;base64, " + encodeURI(this.state.pdf_data) + "'></iframe>")

            this.props.history.push('ThanksLayout', {
            });
        }

    }

    componentDidMount() {
        let socket = new WebSocket(environment.DEVICE_MANAGER_IP);
        socket.onopen = function (e) {
            socket.send("GET WEIGHTNM");
            // socket.send("GET IMAGE0");
            // socket.send("GET IMAGE1");
        };
        var tempData = ''
        socket.onmessage = function (event) {
            var tempData = event.data !== 'Connected' ? JSON.parse(event.data) : event.data;
            if (tempData.msg_type === 'weightnm') {
                this.setState({
                    second_weight: tempData.weight,
                    second_weight_datetime: tempData.date + ' ' + tempData.time,
                    second_alibinr: tempData.alibi_nr
                })
            }
            //  else if (tempData.msg_type === 'image') {
            //     if (this.state.second_image1) {
            //         this.setState({
            //             second_image2: tempData
            //         })
            //     } else {
            //         this.setState({
            //             second_image1: tempData
            //         })
            //     }

            // }
        }.bind(this);

        socket.onclose = e => {
            console.log(
                `Socket is closed. Reconnect will be attempted second.`,
                e.reason
            );

        };

        socket.onerror = function (event) {
            this.setState({
                socketError: true,
                firstVehicleWait: ' '
            })
        }.bind(this);
    }

    gotoBack() {
        this.props.history.goBack();
    }

    gotoHome() {
        this.props.history.push('SecondProcess');
    }

    clearCanvas() {
        this.sigCanvas.clear();
    }

    getScreenShot() {
        let c = document.getElementById('signcanvas');
        html2canvas(c).then((canvas) => {
            var t = canvas.toDataURL();
            console.log('images are here', t);
        })
    }

    sendOrderDetailToServerDatabase() {
        const orderData = this.props.location.state.state.auftragData.booking[0];
        const currentDate = moment(new Date()).format('yyyy-MM-DDTHH:mm:ss.SSSSSSZ');
        var dataTosend = {
            // "id": orderData.id,
            // "pull_id": null,
            // "status": orderData.status,
            // "create_timestamp": orderData.create_timestamp,
            // "timestamp": orderData.timestamp,
            "transport_number": orderData.transport_number,
            // "carrier_creditor_number": null,
            // "location": orderData.location,
            // "gate": orderData.gate,
            // "necessary_slots": 1,
            // "from_timestamp": orderData.from_timestamp,
            // "until_timestamp": orderData.until_timestamp,
            // "driver_name": orderData.driver_name,
            // "driver_mobile": orderData.driver_mobile,
            // "licence_plate": orderData.licence_plate,
            // "comment": "",
            "entries": [
                {
                    "qualifier": "dispatch.status.registration",
                    "value": orderData.dispatch_status_entries[0].value
                },
                {
                    "qualifier": "dispatch.status.weighed.out",
                    "value": currentDate
                }
            ],
            "extensions": [
                {
                    "key": "weightOut",
                    "value": this.state.second_weight
                }
            ]
        }

        console.log('all day', dataTosend);
        this.props.save_second_order_details(dataTosend);
        // this.props.history.push('ThanksLayout', {
        //     // oderSecondDetailData: nextProps.order_second_detail_data,
        //     // pdf: nextProps.order_second_detail_data.data.Lieferschein_Base64,
        //     // comingFrom: tempComingFrom
        // });
    }


    render() {
        console.log('props are here', this.props);
        const override = css`
        display: block;
         margin: 0 auto;
         marginTop: 100;
        border-color: red;
        `;
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

                <Container style={{ background: '', height: '435px' }} >
                    {/* {(this.state.second_weight !== '' && this.state.second_image1 !== undefined) && this.state.second_image2 !== undefined &&
                        !this.props.isSecondOrderDetailDataLoading
                        ? */}
                    {this.props.isSecondOrderDetailDataLoading ||
                        this.props.isTransactionIdReqLoading ||
                        this.props.isTransactionDataRequestLoading ||
                        this.props.isPdfDataSavetoTransporianLoading ||
                        this.props.isPdfDataRequestLoading  ? (
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
                        <Row style={{ marginTop: '80px', paddingLeft: '130px' }}>
                            <Col>
                                <div>
                                    <label style={{ fontSize: '25px', fontWeight: 'bold', color: '#000947', marginLeft: '5px' }} >{localLangData[localStorage.getItem('lang')].signature_label}</label>
                                </div>
                                <Row style={{ marginTop: '20px' }}>
                                    <Col>
                                        <label style={{ fontSize: '25px', fontWeight: 'bold', color: '#000947', marginLeft: '5px' }} >{localLangData[localStorage.getItem('lang')].sign_name}</label>
                                    </Col>

                                    <Col>
                                        <label style={{ fontSize: '25px', fontWeight: 'bold', color: '#000947', marginLeft: '90px' }} >{this.props.location.state.state.auftragData.booking[0].driver_name}</label>
                                    </Col>

                                </Row>
                                <Row style={{ marginTop: '20px', }}>
                                    <Col>
                                        <label style={{ fontSize: '25px', fontWeight: 'bold', color: '#000947', marginLeft: '5px' }} >{localLangData[localStorage.getItem('lang')].sign_barcode}</label>
                                    </Col>

                                    <Col>
                                        <label style={{ fontSize: '25px', fontWeight: 'bold', color: '#000947', marginLeft: '90px' }} >{this.props.location.state.state.auftragData.booking[0].transport_number}</label>
                                    </Col>

                                </Row>
                                <Row style={{ marginTop: '20px' }}>
                                    <Col>
                                        <label style={{ fontSize: '25px', fontWeight: 'bold', color: '#000947', marginLeft: '5px' }} >{localLangData[localStorage.getItem('lang')].sign_license}</label>
                                    </Col>

                                    <Col>
                                        <label style={{ fontSize: '25px', fontWeight: 'bold', color: '#000947', marginLeft: '90px' }} >{this.props.location.state.state.auftragData.booking[0].licence_plate}</label>
                                    </Col>

                                </Row>
                                <Row style={{ marginTop: '20px' }}>
                                    <Col>
                                        <label style={{ fontSize: '25px', fontWeight: 'bold', color: '#000947', marginLeft: '5px' }} >{localLangData[localStorage.getItem('lang')].gate}</label>
                                    </Col>

                                    <Col>
                                        <label style={{ fontSize: '25px', fontWeight: 'bold', color: '#000947', marginLeft: '90px' }} >{this.props.location.state.state.auftragData.booking[0].gate}</label>
                                    </Col>

                                </Row>
                                <Row style={{ marginTop: '20px' }}>
                                    <Col>
                                        <label style={{ fontSize: '25px', fontWeight: 'bold', color: '#000947', marginLeft: '5px' }} >{localLangData[localStorage.getItem('lang')].sign_second}</label>
                                    </Col>

                                    <Col>
                                        <label style={{ fontSize: '25px', fontWeight: 'bold', color: '#000947', marginLeft: '90px' }} >{this.state.second_weight}</label>
                                    </Col>

                                </Row>
                                <Row style={{ marginTop: '20px' }}>
                                    <Col>
                                        <label style={{ fontSize: '25px', fontWeight: 'bold', color: '#000947', marginLeft: '5px' }} >{localLangData[localStorage.getItem('lang')].location}</label>
                                    </Col>

                                    <Col>
                                        <label style={{ fontSize: '25px', fontWeight: 'bold', color: '#000947', marginLeft: '90px' }} >{this.props.location.state.state.auftragData.booking[0].location}</label>
                                    </Col>

                                </Row>

                            </Col>
                            {/* <Col>
                                <div style={{ border: '1px solid black' }}>
                                    <SignatureCanvas penColor='black'
                                        id="signcanvas"
                                        ref={(ref) => { this.sigCanvas = ref }}
                                        canvasProps={{ width: 500, height: 300, className: 'sigCanvas' }} />
                                </div>
                                <div style={{
                                    border: '1px solid black',
                                    fontSize: '25px',
                                    fontWeight: 'bold',
                                    color: '#000947',
                                    textAlign: 'center',
                                    width: '150px', marginTop: '20px'
                                }} onClick={() => this.clearCanvas()}>
                                    {localLangData[localStorage.getItem('lang')].sign_reset}
                                </div>
                            </Col> */}
                        </Row>
                    )}
                    {/* 
                        this.state.socketError ?
                            <div style={{ marginTop: '150px' }}>
                                <label style={{ fontSize: '25px', fontWeight: 'bold', color: 'red', marginLeft: '65px', marginTop: '25px' }} >{localLangData[localStorage.getItem('lang')].socket_Error}</label>
                            </div>
                            :
                            <div style={{ marginTop: '130px' }}>
                                <ClockLoader color={'#000947'} loading={true} css={override} size={150} id='loaderone' />
                                <label style={{ fontSize: '40px', fontWeight: 'bold', color: '#000947', marginLeft: '120px', marginTop: '25px' }} >{localLangData[localStorage.getItem('lang')].first_image_loading}</label>
                            </div>} */}
                </Container>
                <Row>
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
                        <div style={{ marginRight: '30px', float: 'right' }}>
                            <img width={80} height={80} src={nextIcon} onClick={() => this.sendOrderDetailToServerDatabase()} />
                        </div>
                    </Col>

                </Row>

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    order_second_detail_data: state.HomeProcessReducers.order_second_detail_data,
    isSecondOrderDetailDataLoading: state.HomeProcessReducers.isSecondOrderDetailDataLoading,
    transaction_id: state.HomeProcessReducers.transaction_id,
    isTransactionIdReqLoading: state.HomeProcessReducers.isTransactionIdReqLoading,
    isTransactionDataRequestLoading: state.HomeProcessReducers.isTransactionDataRequestLoading,
    transaction_data: state.HomeProcessReducers.transaction_data,
    isPdfDataRequestLoading: state.HomeProcessReducers.isPdfDataRequestLoading,
    pdf_data: state.HomeProcessReducers.pdf_data,
    pdfSaveResponse: state.HomeProcessReducers.pdfSaveResponse,
    isPdfDataSavetoTransporianLoading: state.HomeProcessReducers.isPdfDataSavetoTransporianLoading
});

const mapDispatchToProps = (dispatch) => ({
    save_second_order_details: (orderDetailData) => dispatch(actions.saveSecondOrderDetailDataRequest(orderDetailData)),
    get_transaction_id: (transporian_number) => dispatch(actions.getTransactionIdRequest(transporian_number)),
    save_second_transaction_data: (transactionData) =>
        dispatch(actions.saveSecondTransactionDataRequest(transactionData)),
    get_pdf_data: (transportNumber) =>
        dispatch(actions.getPdfDataRequest(transportNumber, '2')),
    save_Pdf_Data_To_Transporian: (pdfData) => dispatch(actions.savePdfDataToTransporianRequest(pdfData))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignatureLable);
