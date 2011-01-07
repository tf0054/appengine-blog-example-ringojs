var db = require("google/appengine/ext/db");

var Request = require("nitro/request").Request,
    redirect = require("nitro/response").Response.redirect;

var MimeMessage = require("google/appengine/ext/mimemessage").MimeMessage;

var logger = require("google/appengine/logging");

exports.GET = function(env) {
	var params = env.params;
	// 登録があればデータを引き出してそれを元にフォームを作らせる

	var strKey = '';
	var jmail = new MimeMessage(env);

	if(params.key == undefined){
	// リスト表示
		var artTmp = new Array();
		var attachments = jmail.getAttachments(10);
		for(var i = 0; i<attachments.length; i++){
			artTmp.push({
				key: attachments[i].key(),
				filename: attachments[i].filename,
				type: attachments[i].contenttype
			});
		}

		// テンプレートを使い保存されているデータのリストを表示
		return {
			data: {
				key: params.key,
				lists: artTmp
			}
		};
	} else {
	// データ表示
		var attachment = jmail.getAttachment(params.key);
		var {ByteArray} = require('binary');
		var byteContent = new ByteArray(attachment.content.getBytes());
		
		// テンプレートを使わないでコンテンツを表示
		return {
			status: 200,
			headers: {
				"Content-Type": attachment.contenttype,
				"X-gae-key": params.key
			},
			body: [byteContent]
		};
	}
};