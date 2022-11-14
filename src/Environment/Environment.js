var env;
env = process.env.REACT_APP_ENV;
var environment;
if (env === 'local') {
  environment = {
    username:'admin@admin.com',
    password:'admin',
    client_id : 600649,
    password : 'Test12345#',
    user_id : 'WEBSERVICE',
    order_id: 1,
    DEVICE_MANAGER_IP: 'ws://80.152.148.142:5902',
    API_BASEURL: 'http://www.rw-datanet.com:6200'
  // API_BASEURL: "http://f37b-101-0-57-191.ngrok.io"
  };
}else
if (env === 'development') {
  environment = {
    username:'admin@admin.com',
    password:'admin',
    client_id : 1,
    password : 'Test12345#',
    user_id : 'WEBSERVICE',
    order_id: 600649,
    adminusername:'admin@admin.com',
    adminpassword:'admin',
    DEVICE_MANAGER_IP:'ws://80.152.148.142:5902',
    API_BASEURL: 'http://www.rw-datanet.com:6200',
   // API_BASEURL: "http://f37b-101-0-57-191.ngrok.io"
  };
} else {
  environment = {
    DEVICE_MANAGER_IP:
        ''
  };
}
export default environment;
