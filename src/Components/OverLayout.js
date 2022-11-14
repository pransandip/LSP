import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import EvoLogo from '../ImageAssests/Logo/evo.png';
import appLogo from '../ImageAssests/Logo/Logo.png';
import HomeIcon from '../ImageAssests/ButtonImages/Home.png';
import backIcon from '../ImageAssests/ButtonImages/BackArrow.png';
import nextIcon from '../ImageAssests/ButtonImages/NextArrow.png';
import barcodeImage from '../ImageAssests/ButtonImages/barcode.png';
import imageReader from '../ImageAssests/ButtonImages/reader.jpeg';
import truckI from '../ImageAssests/Trucks/t3.PNG';
import truckII from '../ImageAssests/Trucks/t17.PNG';
import truckIII from '../ImageAssests/Trucks/t16.PNG';
import '../StyleSheets/HomePage.css';       
import localLangData from '../LanguageAsset/evo_lang.json';
import SignatureCanvas from 'react-signature-canvas'
import { ToastContainer, toast } from 'react-toastify';
import PDF from '@mikecousins/react-pdf';
import 'react-toastify/dist/ReactToastify.css';

class OverLayout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showHomeIcon: false,
            shownCancelScreen: false,
            pdfData: ''
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


    componentDidMount() {
        let tempPdf = localStorage.getItem('yard_ticket');
        console.log(tempPdf);
        this.setState({
            pdfData: tempPdf
        })
    }

    gotoBack() {
        this.props.history.goBack();
    }

    gotoNext() {
        var tempComingFrom = this.props.location.state.comingFrom;
        this.props.history.push('ThanksLayout', {
            comingFrom: tempComingFrom
        });
    }

    gotoHome() {
        this.props.history.push('AnnahmeAbfallAcceptanceHome');
    }

    clearCanvas() {
        this.sigCanvas.clear();
    }

    render() {
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
                        {/* <div style={{ marginLeft: '30px' }} onClick={() => this.gotoHome()}>
                            <img width={80} height={80} src={HomeIcon} />
                        </div> */}
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
                    <Row style={{ marginTop: '0px', marginLeft: '180px', overflow:'scroll' }}>
                        <div style={{ marginTop: '0px', overflow:'scroll' }}>
                            <PDF
                                file={`data:application/pdf;base64,${this.state.pdfData}`}
                            />
                        </div>

                        {/* <div style={{ display: 'flex', flexDirection: 'row', marginTop: '20px' }}>
                            <label style={{ fontSize: '20px', fontWeight: 'bold', color: '#000947', marginLeft: '20px', marginTop: '14px' }} >{localLangData[localStorage.getItem('lang')].over2}</label>
                        </div> */}
                    </Row>
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
                            <img width={80} height={80} src={nextIcon} onClick={() => this.gotoNext()} />
                        </div>
                    </Col>

                </Row>

            </div>
        )
    }
}

export default OverLayout;
