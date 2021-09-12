module.exports.config = {
	name: "covid",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "ManhG",
	description: "Lấy thông tin về tình hình dịch bệnh COVID-19",
	commandCategory: "news",
	cooldowns: 5,
	dependencies: {
		axios: ""
	}
}, module.exports.languages = {
	vi: {
		return: "====== Thế Giới ======\n😷 Nhiễm: %1\n💚 Đã hồi phục: %2\n💀 Tử vong: %3\n====== Việt Nam ======\n😷 Nhiễm: %4\n😎 Điều trị: %5\n💚 Đã hồi phục: %6\n💀 Tử vong: %7\n\n Thời gian: %8"
	},
	en: {
		return: "====== World ======\n😷 Cases: %1\n😎 Treating: %2\n💚 Recovered: %3\n💀 Deaths: %4\n====== VietNam ======\n😷 Cases: %5\n😎 Treating: %6\n💚 Recovered: %7\n💀 Deaths: %8\n📰 News: %8\nData is updated at: %8 (UTC +7)"
	}
}, module.exports.run = async function({
	api: e,
	event: n,
	getText: t
}) {
	const a = global.nodemodule.axios;
	var i = require("moment-timezone").tz("Asia/Ho_Chi_Minh").format("HH:mm:ss D/MM/YYYY");
	let o = await a.get("https://static.pipezero.com/covid/data.json");
	var s = (await o.data).today,
		r = s.internal || {},
		d = s.world || {};
	return e.sendMessage(t("return", d.cases, d.recovered, d.death, r.cases, r.treating, r.recovered, r.death, i), n.threadID, n.messageID)
};
