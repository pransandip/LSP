import ServiceEngine from '../Services/ServiceEngine';
import environment from '../Environment/Environment';

/************ To fetch Authentication token ******************/
export const fetchUserAuthentication = async (authData) => {
    let body = {};
    body = {
        username: authData.username,
        password: authData.password
    };
    let service = new ServiceEngine(
        'POST',
        `/api-token-auth/`,
        false,
        environment.API_BASEURL,
        '',
    );
    try {
        return service
            .doAxiosAuthPost(body)
            .then((response) => {
                return response;
            })
    } catch (error) {
        console.log(error);
    }
};


/************ To fetch Auftrag data ******************/
export const fetchAuftragData = async (auftrag, process) => {
    let body = {};
    body = { "transport_number": auftrag.order_id };
    if (process === '1') {
        let service = new ServiceEngine(
            'GET',
            `/api/booking/`,
            false,
            environment.API_BASEURL,
            '',
            '',
            '',
            auftrag.auth_token
        );
        try {
            return service
                .doAxiosPost(body)
                .then((response) => {
                    return response;
                })
        } catch (error) {
            console.log(error);
        }
    } else {
        let service = new ServiceEngine(
            'GET',
            `/api/booking/`,
            false,
            environment.API_BASEURL,
            '',
            '',
            '',
            auftrag.auth_token
        );
        try {
            return service
                .doAxiosPost(body)
                .then((response) => {
                    return response;
                })
        } catch (error) {
            console.log(error);
        }
    }

};

/************ To get booking data ******************/
export const getVehicalIdDataFromDB = async (licencePlate) => {
    let body = {};
    body = { "license_plate": licencePlate };
    let service = new ServiceEngine(
        'POST',
        `/api/Vehicle-View/`,
        false,
        environment.API_BASEURL,
        '',
        '',
        '',
        ''
    );
    try {
        return service
            .doAxiosPost(body)
            .then((response) => {
                return response;
            })
    } catch (error) {
        console.log(error);
    }
};


/************ To fetch First Weight data ******************/
export const fetchFirstWeightData = async (yardTicket, authToken) => {
    let service = new ServiceEngine(
        'GET',
        `/api/OrderDetails/?yard_ticket=` + yardTicket,
        false,
        environment.API_BASEURL,
        '',
        '',
        '',
        authToken
    );

    try {
        let response = await service.doAxiosGet();
        if (response) {
            return response;
        }
    } catch (error) {
        console.log(error);
    }
};

/************ To Save Order detail data ******************/
export const saveOderDetailDataToDB = async (orderDetailData) => {
    let body = {};
    body = orderDetailData;
    let service = new ServiceEngine(
        'POST',
        `/api/dispatchstatus/`,
        false,
        environment.API_BASEURL,
        '',
        '',
        '',
        orderDetailData.authToken
    );
    try {
        return service
            .doAxiosPost(body)
            .then((response) => {
                return response;
            })
    } catch (error) {
        console.log(error);
    }
};

/************ To Save Second Weighing Order detail data ******************/
export const saveSecondOderDetailDataToDB = async (orderDetailData) => {
    let body = {};
    body = orderDetailData
    let service = new ServiceEngine(
        'POST',
        `/api/dispatchstatus/`,
        false,
        environment.API_BASEURL,
        '',
        '',
        '',
        orderDetailData.authToken
    );
    try {
        return service
            .doAxiosPost(body)
            .then((response) => {
                return response;
            })
    } catch (error) {
        console.log(error);
    }
};

/************ To Save Transaction data ******************/
export const saveTransactionDataToDB = async (transactionData) => {
    let body = {};
    body = transactionData
    let service = new ServiceEngine(
        'post',
        `/api/Transactions/`,
        false,
        environment.API_BASEURL,
        '',
        '',
        '',
        ''
    );
    try {
        return service
            .doAxiosPost(body)
            .then((response) => {
                return response;
            })
    } catch (error) {
        console.log(error);
    }
};

/************ To get booking pdf data ******************/
export const getpdfFromDB = async (transportNumber, process) => {
   
    if(process === '1'){
        let body = {};
        body = { "transport_number": transportNumber };
    let service = new ServiceEngine(
        'POST',
        `/api/yardticket/`,
        false,
        environment.API_BASEURL,
        '',
        '',
        '',
        ''
    );
    try {
        return service
            .doAxiosPost(body)
            .then((response) => {
                return response;
            })
    } catch (error) {
        console.log(error);
    }
} else {
    let body = {};
    body = { "id": transportNumber, "username" :'' };
    let service = new ServiceEngine(
        'POST',
        `/api/Pdf_print_lsp/`,
        false,
        environment.API_BASEURL,
        '',
        '',
        '',
        ''
    );
    try {
        return service
            .doAxiosPost(body)
            .then((response) => {
                return response;
            })
    } catch (error) {
        console.log(error);
    }
}
};

/************ To get vehical list data ******************/
export const getVehicalListFromDB = async (transportNumber) => {
    let service = new ServiceEngine(
        'POST',
        `/api/Vehicle-View/?license_plate=`+ transportNumber,
        false,
        environment.API_BASEURL,
        '',
        '',
        '',
        ''
    );
    try {
        let response = await service.doAxiosGet();
        if (response) {
            return response;
        }
    } catch (error) {
        console.log(error);
    }
};

/************ To fetch Transaction Id data ******************/
export const fetchTransactionIdData = async (transporianNumber) => {
    let service = new ServiceEngine(
        'GET',
        `/api/Transactions/?transport_number=` + transporianNumber,
        false,
        environment.API_BASEURL,
        '',
        '',
        '',
        ''
    );

    try {
        let response = await service.doAxiosGet();
        if (response) {
            return response;
        }
    } catch (error) {
        console.log(error);
    }
};

/************ To Save Second weight Transaction data ******************/
export const saveSecondTransactionDataToDB = async (transactionData) => {
    let body = {};
    body = transactionData
    let service = new ServiceEngine(
        'PUT',
        `/api/Transactions/`+ transactionData.transactionId + '/',
        false,
        environment.API_BASEURL,
        '',
        '',
        '',
        ''
    );
    try {
        return service
            .doAxiosPut(body)
            .then((response) => {
                return response;
            })
    } catch (error) {
        console.log(error);
    }
};

/************ To Save Pdf Data to Transporian ******************/
export const savePdfDataToTransporian = async (pdfData) => {
    let body = {};
    body = pdfData
    let service = new ServiceEngine(
        'POST',
        `/api/file/`,
        false,
        environment.API_BASEURL,
        '',
        '',
        '',
        ''
    );
    try {
        return service
            .doAxiosPost(body)
            .then((response) => {
                return response;
            })
    } catch (error) {
        console.log(error);
    }
};
