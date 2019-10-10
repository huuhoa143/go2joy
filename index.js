const axios = require('axios')
var prompt = require('prompt');

function sendVerifyCode(mobile) {
    let url = 'https://api.go2joy.vn/hotelapi/mobile/create/sendVerifyCode';

    let mobileRemove0 = mobile.split('0')[1];

    let headers = {
        deviceid: "c4682a7d97d9d7879267ad8926a688a4",
    }

    let payload = {
        countryCode: 84,
        mobile: mobileRemove0,
        mobileUserId: "c4682a7d97d9d7879267ad8926a688a4"
    }

    return axios.post(url, payload, {
        headers: headers,
    }).then(async (res) => {
        if (res.data.message == "") {
            console.log("Gửi mã code thành công tới số điện thoại: ", mobile), "/n";
            let createUser = await updateAppUserToken(mobileRemove0);
        } else {
            console.log("Lỗi: ", res.data.message, "/n");
        }
    }).catch((err) => {
        console.log("Error: ", err);
    })
}

function updateAppUserToken(mobile) {

    let deviceID = "c4682a7d97d9c" + Math.floor(100000 + Math.random() * 900000) + "3ad8926a588a0"
    let deviceCode = "2246ab" + Math.floor(100000 + Math.random() * 900000) + "68";
    let phoneModel = "SM-" + ranDom(5);
    let tokenID = ranDom(5);
    let inviteCode = "1068473";
    let nickName = ranDom(8);
    let userID = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 15) + "@gmail.com";


    let url = 'https://api.go2joy.vn/hotelapi/mobile/update/updateAppUserToken';

    let headers = {
        deviceid: deviceID
    }

    let payload = {
        appVersion: "14.25.2",
        deviceCode: deviceCode,
        language: "3",
        mobileUserId: deviceID,
        os: "2",
        osVersion: "5.1.1",
        phoneModel: phoneModel,
        tokenId: "fz8kHDDplkw:APA91bGTTX8yY35VZav8mCDF" + tokenID + "JnnzLx_CerT84VUv8ufRiANeXwSSEpZ1SilsGA7d2l-0FSaql39hu_RMhXFw31q8r1kDlP37UfearSWxHolZnv_xivuSVL4U1Ta9Bq",
    }
    return axios.put(url, payload, {
        headers: headers,
    }).then(async (res) => {

        if (res.data.message == "") {
            console.log("Cập nhật token thành công")
            prompt.get(['verifyCode'], async (err, result) => {
                let createAppUser = await createNewAppUser(deviceID, inviteCode, mobile, nickName, userID, result.verifyCode)
              });
        } else {
            console.log("Lỗi: ", res.data.message);
        }
    }).catch((err) => {
        console.log("Error: ", err.response);
    })
}

function createNewAppUser(deviceID, inviteCode, mobile, nickName, userID, verifyCode) {
    let url = 'https://api.go2joy.vn/hotelapi/user/create/createNewAppUser';

    let headers = {
        deviceid: deviceID
    }

    let payload = {
        birthday: "2000-10-10",
        countryCode: "84",
        gender: "1",
        inviteCode: inviteCode,
        isoCode: "VN",
        mobile: mobile,
        mobileUserId: deviceID,
        nickName: nickName,
        password: "8a0cf4b494e3f6e0e8a2008604977a42",
        userId: userID,
        verifyCode: verifyCode,
    }
    return axios.put(url, payload, {
        headers: headers,
    }).then((res) => {
        console.log("Res: ", res.data);
    }).catch((err) => {
        console.log("Error: ", err.response);
    })
}

function ranDom(string_length) {
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZ";
	var randomstring = '';
	for (var i=0; i<string_length; i++) {
		var rnum = Math.floor(Math.random() * chars.length);
		randomstring += chars.substring(rnum,rnum+1);
	}
	return randomstring;
}

prompt.start();

prompt.get(['mobile'], async (err, result) => {
    let sendCode = await sendVerifyCode(result.mobile);
});
    