var Request = require("nitro/request").Request,
    redirect = require("nitro/response").Response.redirect;

// ringo
var logger = require("google/appengine/logging");
	
// 作り中のメール受信ライブラリ
var MimeMessage = require("google/appengine/ext/mimemessage").MimeMessage;

// 実際に呼ばれるのはこれ。
exports.app = function(env) {
    return exports.POST(env);
}

// .appから流されてこれが動く(本当は.app内で決め打ちしないものみたい(GETかもなので))
exports.POST = function(env) {
	// paramsプロパティは読まれた(getされた)ときに作られる(queryParamsとpostParamsの結合もの)
	// ringo/webapps/request.js
	var params = env.params;
	
	// 環境変数経由でhttpヘッダなどが見れる
	/*
	for(var item in env) {
		logger.info("ENV> " + item + ":" + env[item]);
	}
	for(var item in params) {
		logger.info("PRM> " + item + "^" + params[item]);
	}
	*/
	var buffer = params["slopped"];
	var mailBody = buffer.decodeToString("UTF-8");
	logger.info("MIL> " + mailBody.length);
	var jmail = new MimeMessage(mailBody);
	
	if(jmail){
		logger.info("mail-subject: " + jmail.getSubject());
		var aryTmp = jmail.getParts();
		if(aryTmp){
			for(var i=0; i<aryTmp.length;i++){
				logger.info("mail-part(" + i + "): " + aryTmp[i].getContent());
			}
		}
	} else {
		logger.info("mail: cannot found content!");
	}

	// 200番で返して受信完了にする
	return {
		status: 200,
		headers: {"Content-Type": "text/html"},
		body: ["xxx"]
	}
};