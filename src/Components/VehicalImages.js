import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import EvoLogo from '../ImageAssests/Logo/evo.png';
import appLogo from '../ImageAssests/Logo/Logo.png';
import HomeIcon from '../ImageAssests/ButtonImages/Home.png';
import backIcon from '../ImageAssests/ButtonImages/BackArrow.png';
import nextIcon from '../ImageAssests/ButtonImages/NextArrow.png';
import imageReader from '../ImageAssests/ButtonImages/reader.jpeg';
import '../StyleSheets/HomePage.css';
import localLangData from '../LanguageAsset/evo_lang.json';
import 'react-touch-screen-keyboard/lib/Keyboard.css';
import { css } from "@emotion/react";
import ClockLoader from "react-spinners/ClockLoader";
import environment from '../Environment/Environment';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

class VehicalImages extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showHomeIcon: false,
            shownCancelScreen: false,
            scanImage1: '',
            scanImage2: '',
            socketError: false
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
        let socket = new WebSocket(environment.DEVICE_MANAGER_IP);
        socket.onopen = function (e) {
            socket.send("GET IMAGE1");
        };
        var tempData = ''
        socket.onmessage = function (event) {
            var tempData = JSON.parse(event.data);
            if (tempData.msg_type === 'image') {
                    this.setState({
                        scanImage1: tempData
                    })
                    this.gotoNext();
               
            }

        }.bind(this);

        socket.onerror = function (event) {
            this.setState({
                socketError: true,
                licencePlateNumber: ' '
            })
        }.bind(this);
    }

    gotoHome() {
        this.props.history.push('Home');
    }

    gotoBack() {
        this.props.history.goBack();
    }

    gotoNext() {
       
        this.props.history.push('FirstWeighing',{
            state: {
                authToken: this.props?.location?.state?.state?.authToken,
                auftragData: this.props?.location?.state?.state?.auftragData,
                licensePlateNumber: this.props?.location?.state?.state?.licensePlateNumber,
                nameInputValue : this.props?.location?.state?.state?.nameInputValue,
                before_weighing_img: this.state?.scanImage1?.image_data,
              }
        });        
    }

    decodeBase64() {
        let base64ToString = Buffer.from(this.state.scanImage, "base64").toString()
        return "data:image/jpeg;base64," + base64ToString;
    }



    render() {
        var image1 = new Image();
        var image2 = new Image();
        image1.src = 'data:image/png;base64,' + this.state.scanImage1.image_data;

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
                <Container style={{ height: '660px' }}>
                    <Row style={{ marginTop: '10px' }}>
                    </Row>
                    <Row style={{ marginTop: '10px' }}>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <div onClick={() => this.gotoHome()}>
                                <img width={80} height={80} src={HomeIcon} />
                            </div>
                            <div style={{
                                width: '280px',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                textAlign: 'center'
                            }}>
                                <img width={150} height={70} src={EvoLogo} style={{ marginLeft: '40px' }} />
                                {/* <label style={{ fontSize: '10px', fontWeight: 'bold', marginLeft: '48px', textAlign: 'center' }} >{localLangData.de.logo_under_line}</label> */}
                            </div>
                            <div>
                                <img width={150} height={70} src={appLogo} />
                            </div>
                        </div>
                    </Row>
                    {(this.state.scanImage1 !== '' && this.state.scanImage1 !== undefined) ?
                        <div>
                            <Row style={{ marginTop: '20px' }}>
                                <Col>
                                    <img width={500} height={230} style={{ border: '5px solid black', marginLeft: '210px' }} src={'data:image/png;base64,' + this.state.scanImage1.image_data} />
                                </Col>
                            </Row>
                            <Row style={{ marginTop: '20px' }}>
                                <Col>
                                    <img width={500} height={230} style={{ border: '5px solid black', marginLeft: '210px' }} src={'data:image/png;base64,' + this.state.scanImage2.image_data} />
                                </Col>
                            </Row>
                        </div> :
                        this.state.socketError ?
                            <div style={{ marginTop: '150px' }}>
                                <label style={{ fontSize: '25px', fontWeight: 'bold', color: 'red', marginLeft: '65px', marginTop: '25px' }} >{localLangData[localStorage.getItem('lang')].socket_Error}</label>
                            </div>
                            :
                            <div style={{ marginTop: '150px' }}>
                                <ClockLoader color={'#000947'} loading={true} css={override} size={150} id='loaderone' />
                                <label style={{ fontSize: '40px', fontWeight: 'bold', color: '#000947', marginLeft: '100px', marginTop: '25px' }} >{localLangData[localStorage.getItem('lang')].before_weighing_img_wait + '...'}</label>
                            </div>}
                </Container>
                {(this.state.scanImage1 !== '' && this.state.scanImage1 !== undefined) ? <Row>
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

                </Row> : null}

            </div>
        )
    }
}

export default VehicalImages;
