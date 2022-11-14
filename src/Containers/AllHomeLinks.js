import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import EvoLogo from '../ImageAssests/Logo/evo.png';
import appLogo from '../ImageAssests/Logo/Logo.png';
import Table from 'react-bootstrap/Table'
import '../StyleSheets/HomePage.css';
import localLangData from '../LanguageAsset/evo_lang.json'
import data from './HomeLinks.json';
import { Link } from 'react-router-dom';




class AllHomeLinks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showHomeIcon: false,
            shownCancelScreen: false
        }

    }


    componentDidMount() {
    }



    imageClicked(params) {
        var tempurl = window.location.href;
        tempurl = tempurl.split('/')
        this.props.history.push('Barcodescan', {
            comingFrom: tempurl[tempurl.length - 1]
        });
    }

    gotoHome() {
        this.setState({
            showHomeIcon: false,
            shownCancelScreen: false
        })
    }

    cancelButtonMethod() {
        this.setState({
            shownCancelScreen: true
        })
    }

    checkedButtonMethod() {
        this.props.history.push('License');
    }

    render() {
        return (
            <Container style={{
                WebkitTouchCallout: 'none',
                WebkitUserSelect: 'none',
                KhtmlUserSelect: 'none',
                MozUserSelect: 'nonoe',
                msUserSelect: 'none',
                userSelect: 'none',
            }}>
                <Table striped bordered hover >
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Process Name</th>
                            <th>Process Homepage</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data.map((value) => {
                        return(
                            <tr>
                            <td>{value.field2}</td>
                            <td>{value.process_name}</td>
                            <td><Link to={value.process_page}>{value.process_page}</Link></td>
                        </tr>
                        )
                    })}
                    </tbody>
                </Table>
            </Container>

        )
    }
}

export default AllHomeLinks;
