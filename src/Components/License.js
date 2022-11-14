import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import EvoLogo from '../ImageAssests/Logo/evo.png';
import appLogo from '../ImageAssests/Logo/Logo.png';
import HomeIcon from '../ImageAssests/ButtonImages/Home.png';
import backIcon from '../ImageAssests/ButtonImages/BackArrow.png';
import nextIcon from '../ImageAssests/ButtonImages/NextArrow.png';
import '../StyleSheets/HomePage.css';
import localLangData from '../LanguageAsset/evo_lang.json';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

class License extends Component {

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

    }

    gotoHome() {
        this.props.history.push('Home');
    }

    gotoNext() {
        this.props.history.push('VehicalImages',{
            state: {
                authToken: this.props.location.state.state.authToken,
                auftragData: this.props.location.state.state.auftragData,
                licensePlateNumber: this.props.location.state.state.licensePlateNumber,
                nameInputValue : this.props.location.state.state.nameInputValue
              }
        });
    }

    gotoBack() {
        this.props.history.goBack();
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
                            <img width={250} height={70} src={EvoLogo} />
                            {/* <label style={{ fontSize: '10px', fontWeight: 'bold', alignSelf: 'center' }} >{localLangData.de.logo_under_line}</label> */}
                        </div>
                    </Col>
                    <Col >
                        <div style={{ marginRight: '42px' }}>
                            <img width={150} height={70} src={appLogo} />
                        </div>
                    </Col>
                </Row>

                <Container style={{ height: '435px' }}>
                    <Row style={{ marginTop: '100px' }}>

                        <div style={{ textAlign: 'center', marginTop: '0px' }}>
                            <label style={{ fontSize: '25px', fontWeight: 'bold', color: '#000947', width: '80%', flexWrap: 'wrap' }} >{localLangData[localStorage.getItem('lang')].dataprotec_label1}</label>
                        </div>

                        <div style={{
                            border: '2px solid gray',
                            overflow: 'scroll',
                            width: '700px',
                            height: '165px',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            marginTop: '30px'
                        }}>
                            {localLangData[localStorage.getItem('lang')].dataprotec_instuc}
                        </div>

                    </Row>

                    <Row>
                        <div style={{
                            width: '700px',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            textAlign: 'center',
                            marginTop: '20px'
                        }}>
                            <label style={{ fontSize: '25px', fontWeight: 'bold', color: '#000947' }} >{localLangData[localStorage.getItem('lang')].dataprotec_label2}</label>
                        </div>
                    </Row>

                </Container>
                <Row>
                    <Col xs={4}>
                        <div style={{ marginLeft: '30px' }} >
                            <img width={80} height={80} src={backIcon} onClick={() => this.gotoBack()} />
                        </div>
                    </Col>
                    <Col xs={4}>
                        {/* <div style={{marginLeft:'145px'}}>
                            <img width={64} height={64} src={`${process.env.PUBLIC_URL}/assets/phone-call.png`} onClick={() => this.notify()}/>
                        </div> */}
                    </Col>
                    <Col xs={4}>
                        <div style={{ marginRight: '30px', float:'right' }}>
                            <img width={80} height={80} src={nextIcon} onClick={() => this.gotoNext()} />
                        </div>
                    </Col>

                </Row>
                 
            </div>
        )
    }
}

export default License;
