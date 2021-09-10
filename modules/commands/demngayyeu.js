var _0x193c62=_0xd9e9;function _0x5625(){var _0x51115f=['exports','MạnhG','demngayyeu','Đếm\x20ngày\x20y','10uAhJrl','1902XMbrYR','1710850DGNKan','countdown','187BuNyHq','êu\x20nhau','1868058oVpYoZ','1.0.0','1217754CUHXoU','40hsmPkh','config','4694530kbOZBV','16639zvNGYm','39682hzBybh','2412800ltfUdP'];_0x5625=function(){return _0x51115f;};return _0x5625();}function _0xd9e9(_0x2c73f2,_0x24e2ba){var _0x34f22c=_0x5625();return _0xd9e9=function(_0x396392,_0x291dec){_0x396392=_0x396392-(-0x1c0*-0x10+-0x155+-0x19bc);var _0x25fed2=_0x34f22c[_0x396392];return _0x25fed2;},_0xd9e9(_0x2c73f2,_0x24e2ba);}(function(_0x4bb8b9,_0x51d4bf){var _0x4d7e12=_0xd9e9,_0x229b60=_0x4bb8b9();while(!![]){try{var _0x32a2a8=parseInt(_0x4d7e12(0xff))/(0x5*-0x332+-0x23cb+0x33c6)*(-parseInt(_0x4d7e12(0xf9))/(-0x1c82+0x45*-0x6b+-0x1*-0x395b))+parseInt(_0x4d7e12(0xf2))/(0x15fc+-0x10de+0x1*-0x51b)+parseInt(_0x4d7e12(0xfa))/(-0x52*0x2f+-0x20a4+0x2*0x17db)+parseInt(_0x4d7e12(0xf7))/(-0xfdf+0x2db*0x3+0x271*0x3)+parseInt(_0x4d7e12(0x100))/(0x23b*0x7+0xc89+-0x1c20)*(parseInt(_0x4d7e12(0xf8))/(0x10dc+0x606+0x1*-0x16db))+-parseInt(_0x4d7e12(0xf5))/(0x8a5+0x328*0x7+0x1eb5*-0x1)*(-parseInt(_0x4d7e12(0xf4))/(-0x2631+0x1*0xcc4+0x1976))+-parseInt(_0x4d7e12(0x101))/(0x85e+0x1*0x580+0x49c*-0x3)*(parseInt(_0x4d7e12(0xf0))/(0x1*0x50b+0x81*-0x25+0xda5));if(_0x32a2a8===_0x51d4bf)break;else _0x229b60['push'](_0x229b60['shift']());}catch(_0x204e10){_0x229b60['push'](_0x229b60['shift']());}}}(_0x5625,-0x101ed*0x3+-0x19b3a+-0x1*-0xc1329),module[_0x193c62(0xfb)][_0x193c62(0xf6)]={'name':_0x193c62(0xfd),'version':_0x193c62(0xf3),'hasPermssion':0x0,'credits':_0x193c62(0xfc),'description':_0x193c62(0xfe)+_0x193c62(0xf1),'commandCategory':_0x193c62(0xef),'cooldowns':0x5});

module.exports.onLoad = () => {
	const e = global.nodemodule["fs-extra"],
		n = global.nodemodule.request,
		o = __dirname + "/Noprefix/";
	e.existsSync(o + "noprefix") || e.mkdirSync(o, {
		recursive: !0
	}), e.existsSync(o + "demngayyeu.jpg") || n("https://img.thuthuattinhoc.vn/uploads/2019/01/24/hinh-nen-cute-love_115832772.jpg").pipe(e.createWriteStream(o + "demngayyeu.jpg"))
};

module.exports.handleEvent = async ({
	event: e,
	api: a,
	Users: t
}) => {
	const n = global.nodemodule["fs-extra"];
	var {
		threadID: r,
		messageID: o,
		body: s,
		senderID: g
	} = e;
	if (g == a.getCurrentUserID()) return;

  //Thay ngày bắt đầu yêu nhau của 2 bạn vào đây, dòng 27: năm/tháng/ngày
	let y = new Date(2021, 2, 23, 0, 0, 0).getTime(),
		l = Date.now() - y,
		d = Math.floor(l / 864e5),
		h = Math.floor((l - 864e5 * d) / 36e5),
		u = Math.floor((l - 864e5 * d - 36e5 * h) / 6e4);
	var i = {
		body: `❤Đếm ngày yêu❤\n\n${d} ngày ${h} tiếng ${u} phút ${Math.floor((l-864e5*d-36e5*h-6e4*u)/1e3)} giây `,
		attachment: n.createReadStream(__dirname + "/Noprefix/demngayyeu.jpg")
	};
  //Lệnh gọi noprefix
	["demngayyeu", "đếm ngày yêu", "số ngày yêu nhau", "đny"].forEach((e => {
		let t = e[0].toUpperCase() + e.slice(1);
		if (s === e.toUpperCase() | s === e | t === s) return n = i, void a.sendMessage(n, r, o);
		var n
	}))
}, module.exports.run = function({
	event: e,
	api: a
}) {
	 //Thay ngày bắt đầu yêu nhau của 2 bạn vào đây, dòng 47: năm/tháng/ngày
	let t = new Date(2021, 2, 23, 0, 0, 0).getTime(),
		n = Date.now() - t,
		r = Math.floor(n / 864e5),
		o = Math.floor((n - 864e5 * r) / 36e5),
		s = Math.floor((n - 864e5 * r - 36e5 * o) / 6e4),
		g = Math.floor((n - 864e5 * r - 36e5 * o - 6e4 * s) / 1e3);
	return a.sendMessage(`❤Đếm ngày yêu❤\n\n ${r} ngày ${o} tiếng ${s} phút ${g} giây `, e.threadID, e.messageID)
};
