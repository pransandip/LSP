import { take, takeEvery } from 'redux-saga/effects';
import { actionTypes } from '../Constants/Constants';

import {
    fetchUserAuthTokenSaga,
    fetchAuftragSaga,
    saveOrderDetailSaga,
    fetchFirstWeightDataSaga,
    saveSecondOrderDetailSaga,
    getVehicalIDSaga,
    saveTransactionDataSaga,
    getPdfDataSaga,
    getVehicalListDataSaga,
    getTransactionIdDataSaga,
    saveSecondTransactionDataSaga,
    savePdfDataToTransporianSaga
} from './HomeProcessSaga';


/*---------------------------------------------------------------------
                             HomeProcess Saga
 -----------------------------------------------------------------------*/
 export function* watchHomeProcessServices() {
     yield takeEvery(actionTypes.GET_AUTH_TOKEN_REQUEST, fetchUserAuthTokenSaga);
    yield takeEvery(actionTypes.GET_AUFTRAG_DATA_REQUEST, fetchAuftragSaga);
    yield takeEvery(actionTypes.SAVE_ORDER_DETAIL_DATA_REQUEST, saveOrderDetailSaga);
    yield takeEvery(actionTypes.GET_FIRST_WEIGHT_DATA_REQUEST, fetchFirstWeightDataSaga);
    yield takeEvery(actionTypes.SAVE_SECOND_ORDER_DETAIL_DATA_REQUEST, saveSecondOrderDetailSaga);
    yield takeEvery(actionTypes.GET_VEHICAL_ID_REQUEST, getVehicalIDSaga);
    yield takeEvery(actionTypes.SAVE_TRANSACTION_DATA_REQUEST, saveTransactionDataSaga);
    yield takeEvery(actionTypes.GET_PDF_DATA_REQUEST, getPdfDataSaga);
    yield takeEvery(actionTypes.GET_VEHICAL_LIST_REQUEST, getVehicalListDataSaga);
    yield takeEvery(actionTypes.GET_TRANSACTION_ID_REQUEST, getTransactionIdDataSaga);
    yield takeEvery(actionTypes.SAVE_SECOND_TRANSACTION_DATA_REQUEST, saveSecondTransactionDataSaga);
    yield takeEvery(actionTypes.SAVE_PDF_DATA_TO_TRANSPORIAN_REQUEST, savePdfDataToTransporianSaga);
}