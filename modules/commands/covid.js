module.exports.config = {
	name: "covid",
	version: "1.0.3",
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
		return: "====== Thế Giới ======\n😷 Nhiễm: %1\n💚 Đã hồi phục: %2\n💀 Tử vong: %3\n====== Việt Nam ======\n😷 Nhiễm: %4\n💚 Đã hồi phục: %5\n💀 Tử vong: %6"
	},
	en: {
		return: "====== World ======\n😷 Cases: %1\n💚 Recovered: %2\n💀 Deaths: %3\n====== VietNam ======\n😷 Cases: %4\n💚 Recovered: %5\n💀 Deaths: %6\n📰 News: %7\nData is updated at: %8 (UTC +7)"
	}
}, module.exports.run = async function({
	api: e,
	event: n,
	getText: a
}) {
	const o = global.nodemodule.axios;
	let s = await o.get("https://code.junookyo.xyz/api/ncov-moh/data.json");
	var t = (await s.data).data,
		d = t.vietnam || {},
		i = t.global || {};
	return e.sendMessage(a("return", i.cases, i.recovered, i.deaths, d.cases, d.recovered, d.deaths), n.threadID, n.messageID)
};
