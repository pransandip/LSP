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
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import localLangData from '../LanguageAsset/evo_lang.json';
import 'react-touch-screen-keyboard/lib/Keyboard.css';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

class NameInputComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showHomeIcon: false,
            shownCancelScreen: false,
            nameInputValue: this.props.location.state.state.auftragData.booking[0].driver_name
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

    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.all_order_detail_data && nextProps.all_order_detail_data.length > 0) {
    //         var tempLicence = this.props.location.state.state.licencePlateNumber.replace('-', ' ');
    //         if (nextProps.all_order_detail_data.data[0].license_plate === tempLicence
    //             && nextProps.all_order_detail_data.data[0].driver_name === this.state.nameInputValue) {
    //             this.props.history.push('License', {
    //                 state: {
    //                     authToken: this.props.location.state.state.authToken,
    //                     auftragData: this.props.location.state.state.auftragData,
    //                     licensePlateNumber: this.props.location.state.state.licencePlateNumber,
    //                     nameInputValue: this.state.nameInputValue
    //                 }
    //             });

    //         } else {
    //             this.props.history.push('SafetyInstruction', {
    //                 state: {
    //                     authToken: this.props.location.state.state.authToken,
    //                     auftragData: this.props.location.state.state.auftragData,
    //                     licensePlateNumber: this.props.location.state.state.licencePlateNumber,
    //                     nameInputValue: this.state.nameInputValue
    //                 }
    //             });
    //         }
    //     } else {
    //         this.props.history.push('SafetyInstruction', {
    //             state: {
    //                 authToken: this.props.location.state.state.authToken,
    //                 auftragData: this.props.location.state.state.auftragData,
    //                 licensePlateNumber: this.props.location.state.state.licencePlateNumber,
    //                 nameInputValue: this.state.nameInputValue
    //             }
    //         });
    //     }
    // }

    gotoHome() {
        this.props.history.push('Home');
    }

    gotoBack() {
        this.props.history.goBack();
    }

    gotoNext() {
        localStorage.setItem('nameValue', this.state.nameInputValue);
        if (this.state.nameInputValue === '') {
            document.getElementById('barcodeinput').style.border = '1px solid red'
        } else {
            //var tempLicence = this.props.location.state.state.licencePlateNumber.replace('-', ' ');
            this.props.history.push("Nameinput", {
                state: {
                    authToken: this.props.location.state.state.authToken,
                    auftragData: this.props.location.state.state.auftragData,
                    licencePlateNumber: this.props.location.state.state.licencePlateNumber,
                    nameInputValue: this.state.nameInputValue
                },
            });
            // this.props.get_all_order_details({
            //     "license_plate": tempLicence,
            //     "driver_name": this.state.nameInputValue,
            //     "auth_token": this.props.location.state.state.authToken
            // })
        }
    }

    keyboardTapInputMethod(e) {
        var tempNameValue = this.state.nameInputValue;
        if (e === '<-') {
            tempNameValue = tempNameValue.slice(0, -1)
        } else if (e === 'SPACE') {
            tempNameValue = tempNameValue + ' ';

        } else {
            tempNameValue = tempNameValue + e;
        }
        document.getElementById('barcodeinput').style.border = '1px solid #000947'
        this.setState({
            nameInputValue: tempNameValue
        })
    }


    render() {
        const keyOneLine = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-'];
        const keyTwoLine = ['Q', 'W', 'E', 'R', 'T', 'Z', 'U', 'I', 'O', 'P', '<-'];
        const keyThreeLine = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ä', 'Ö'];
        const keyFourLine = ['Y', 'X', 'C', 'V', 'B', 'N', 'M', 'Ü', '.', 'SPACE'];
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
                <Container style={{ height: '660px' }} >
                    <Row style={{ marginTop: '10px' }}>
                    </Row>
                    <Row style={{ marginTop: '10px' }}>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <div onClick={() => this.gotoHome()}>
                                <img width={80} height={80} src={HomeIcon} />
                            </div>
                            <div style={{
                                width: '250px',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                textAlign: 'center'
                            }}>
                                <img width={150} height={70} src={EvoLogo} />
                                <label style={{ fontSize: '10px', fontWeight: 'bold' }} >{localLangData.de.logo_under_line}</label>
                            </div>
                            <div>
                                <img width={150} height={70} src={appLogo} />
                            </div>
                        </div>
                    </Row>
                    <Row style={{ marginTop: '20px' }}>
                        <Col xs={3}></Col>
                        <Col xs={7}>
                            <label style={{ fontSize: '25px', fontWeight: 'bold', color: '#000947', marginLeft: '20px' }} >{localLangData[localStorage.getItem('lang')].name_label1}</label>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={1}></Col>
                        <Col xs={11}>
                            <div style={{ display: 'flex', flexDirection: 'row', marginTop: '20px' }}>
                                <label style={{ fontSize: '20px', fontWeight: 'bold', color: '#000947', marginLeft: '20px', marginTop: '14px' }} >{localLangData[localStorage.getItem('lang')].name_name}</label>
                                <input autoFocus id='barcodeinput' style={{ textAlign: 'center', marginLeft: '10px', width: '100%', height: '60px', border: '1px solid #000947', fontSize: '18px' }} value={this.state.nameInputValue} />
                            </div>
                        </Col>

                    </Row>
                    <Row style={{ marginTop: '20px' }}>
                        {keyOneLine.map((value, index) => {
                            return (
                                <Col style={{ marginLeft: index > 0 ? '-20px' : '0' }} onClick={(e) => this.keyboardTapInputMethod(value)}>
                                    <div style={{
                                        border: '1px solid black',
                                        borderRadius: '4px',
                                        width: '80px',
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
                    </Row>
                    <Row style={{ marginTop: '10px' }}>
                        {keyTwoLine.map((value, index) => {
                            return (
                                <Col style={{ marginLeft: index > 0 ? '-20px' : '0' }} onClick={(e) => this.keyboardTapInputMethod(value)}>
                                    <div style={{
                                        border: '1px solid black',
                                        borderRadius: '4px',
                                        width: '80px',
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
                    </Row>
                    <Row style={{ marginTop: '10px' }}>
                        {keyThreeLine.map((value, index) => {
                            return (
                                <Col style={{ marginLeft: index > 0 ? '-20px' : '0' }} onClick={(e) => this.keyboardTapInputMethod(value)}>
                                    <div style={{
                                        border: '1px solid black',
                                        borderRadius: '4px',
                                        width: '80px',
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
                    </Row>
                    <Row style={{ marginTop: '10px' }}>
                        {keyFourLine.map((value, index) => {
                            return (
                                <Col style={{ marginLeft: index > 0 ? '-20px' : '0' }} onClick={(e) => this.keyboardTapInputMethod(value)}>
                                    <div style={{
                                        border: '1px solid black',
                                        borderRadius: '4px',
                                        width: value === 'SPACE' ? '160px' : '80px',
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
                    </Row>

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

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isAllOrderDetailDataLoading: state.HomeProcessReducers.isAllOrderDetailDataLoading,
    all_order_detail_data: state.HomeProcessReducers.all_order_detail_data
});

const mapDispatchToProps = (dispatch) => ({
    //get_all_order_details: (orderDetailData) => dispatch(actions.getAllOrderDetailDataRequest(orderDetailData))
});

export default connect(mapStateToProps, mapDispatchToProps)(NameInputComponent);
