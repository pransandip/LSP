import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import EvoLogo from '../../ImageAssests/Logo/evo.png';
import appLogo from '../../ImageAssests/Logo/Logo.png';
import '../../StyleSheets/HomePage.css';
import localLangData from '../../LanguageAsset/evo_lang.json';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
var tempintervalid = '';
class ThanksLayout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showHomeIcon: false,
            shownCancelScreen: false
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
        if (tempintervalid) {
            clearInterval(tempintervalid);
        }
        tempintervalid = setInterval(() => {
            // let tempPdf = this.props.location.state.pdf;
            // //tempPdf = tempPdf.replace(/"/ig, '');
            // console.log(tempPdf);
            // let pdfWindow = window.open("")
            // pdfWindow.document.write("<iframe width='100%' height='100%' src='data:application/pdf;base64, " + encodeURI(tempPdf) + "'></iframe>")
            this.props.history.push('Home')
        }, 30000)
        // var tempComingFrom = this.props.location.state.comingFrom;
        // switch (tempComingFrom) {
        //     case 'AnnahmeAbfallAcceptanceHome':
        //         tempintervalid = setInterval(() => {
        //             let tempPdf = this.props.location.state.pdf;
        //             //tempPdf = tempPdf.replace(/"/ig, '');
        //             console.log(tempPdf);
        //             let pdfWindow = window.open("")
        //             pdfWindow.document.write("<iframe width='100%' height='100%' src='data:application/pdf;base64, " + encodeURI(tempPdf) + "'></iframe>")
        //             this.props.history.push('AnnahmeAbfallAcceptanceHome')
        //         }, 3000)
        //         break;
        //     case 'Home':
        //         tempintervalid = setInterval(() => { this.props.history.push('Home') }, 3000)
        //         break;
        // }


    }

    componentWillUnmount() {
        clearInterval(tempintervalid);
    }
    gotoBack() {
        this.props.history.goBack();
    }

    gotoNext() {
    }

    gotoHome() {
        this.props.history.goBack();
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
                        <div style={{ marginLeft: '30px' }} >
                            {/* <img width={64} height={64} src={`${process.env.PUBLIC_URL}/assets/phone-call.png`} onClick={() => this.notify()} /> */}
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
                    <Row style={{ marginTop: '100px' }}>
                        <div style={{ marginTop: '20px', marginLeft: 'auto', marginRight: 'auto', width: '484px' }}>
                            <label style={{ fontSize: '25px', fontWeight: 'bold', color: '#000947', marginLeft: '20px', marginTop: '14px' }} >{localLangData[localStorage.getItem('lang')].thank_1}</label>
                        </div>
                    </Row>
                    <Row style={{ marginTop: '40px' }}>
                        <div style={{ marginTop: '20px', marginLeft: 'auto', marginRight: 'auto', width: '484px', marginTop: '20px' }}>
                            <label style={{ fontSize: '25px', fontWeight: 'bold', color: '#000947', marginLeft: '20px', marginTop: '14px' }} >{localLangData[localStorage.getItem('lang')].thank_2}</label>
                        </div>
                    </Row>
                </Container>

            </div>
        )
    }
}

export default ThanksLayout;
