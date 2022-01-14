/**
 * @author MạnhG
 * @warn Do not edit code or edit credits
 */
 module.exports.config = {
    name: "audio",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "MạnhG",
    description: "Phát nhạc thông qua link YouTube hoặc từ khoá tìm kiếm nhanh",
    commandCategory: "Phương tiện",
    usages: "[Text]",
    cooldowns: 10,
    dependencies: {
        "ytdl-core": "",
        "simple-youtube-api": "",
        "fs-extra": "",
        "axios": ""
    },
    envConfig: {
        "API_KEY": "mzkFree_722124509AC10"
    }
};
var numberMoney = 500;
var timeSearch = 4; // Tìm kiếm theo thời gian, ví dụ: >=5 (6,7, 8, 9)
var rdPath = Math.floor(Math.random() * 99999999999);
var path = __dirname + `/cache/${rdPath}.m4a`;

module.exports.run = async function({
	event: e,
	api: n,
	args: t,
	Currencies: a
}) {
	const {
		threadID: s,
		messageID: r,
		senderID: o
	} = e, {
		createReadStream: i,
		existsSync: d,
		writeFileSync: l,
		readdirSync: u,
		unlinkSync: g
	} = global.nodemodule["fs-extra"], h = global.nodemodule.axios;
	var c = (await a.getData(o)).money;
	//if (c < numberMoney) return n.sendMessage(`Bạn không đủ tiền để sử dụng lệnh này!\nBạn cần tối thiểu ${numberMoney}$ để nghe nhạc`, s, r);
	var {
		API_KEY: y
	} = global.configModule[this.config.name];
	try {
		if (a.setData(o, options = {
				money: c - parseInt(numberMoney)
			}), 0 == t.length || !t) return n.sendMessage("» Search cannot be left blank!", s, r);
		if (0 == t.join(" ").indexOf("https://")) {
			const e = t.join(" ").trim();
			try {
				var m;
				n.sendMessage("Đang tải, vui lòng đợi...", s, ((e, t) => setTimeout((() => {
					n.unsendMessage(t.messageID)
				}), 2e4)));
				let {
					data: t
				} = await h.get(`https://manhict.tech/video?link=${e}&apikey=${y}`);
				if ("ok" != t.status) return n.sendMessage("Erorr", s, r);
				m = t.title, M = t.link.audio;
				const a = await h.get(M, {
					responseType: "arraybuffer"
				});
				return l(path, Buffer.from(a.data, "utf-8")), void n.sendMessage({
					body: m,
					attachment: i(path)
				}, s, (() => g(path)), r)
			} catch (e) {
				return console.log(e), n.sendMessage("Có lỗi xảy ra!", s, r)
			}
		} else try {
			var p, f, M = [],
				b = "",
				v = 0;
			const a = encodeURIComponent(t.join(" "));
			p = (await h.get(`https://manhict.tech/youtube?q=${a}&apikey=${y}`)).data.results;
			for (let e in p)
				if (null != p[e].video && (f = p[e].video).duration.length <= timeSearch && "Live" != f.duration) {
					v = v += 1, M.push(f.id), b += `${v}.《${f.duration}》 ${f.title}\n\n`
				} var I = `»🔎 There are ${M.length} results matching your search keyword:\n\n${b}» Please reply (feedback) choose one of the above searches.`;
			return n.sendMessage({
				body: I
			}, s, ((n, t) => {
				client.handleReply.push({
					name: this.config.name,
					messageID: t.messageID,
					author: e.senderID,
					idYT: M
				})
			}), r)
		} catch (e) {
			return n.sendMessage("The request could not be processed due to an error: " + e.message, s, r)
		}
	} catch (e) {
		return void console.log(e)
	}
}, module.exports.handleReply = async function({
	api: e,
	event: n,
	handleReply: t,
	Currencies: a
}) {
	const s = global.nodemodule["ytdl-core"],
		{
			threadID: r,
			senderID: o,
			messageID: i
		} = n,
		{
			createReadStream: d,
			createWriteStream: l,
			unlinkSync: u,
			statSync: g
		} = global.nodemodule["fs-extra"];
	var h = (await a.getData(o)).money;
	if (parseInt(o) != parseInt(t.author)) {
		//if (h < numberMoney) return e.sendMessage(`Bạn không đủ tiền để sử dụng lệnh này!\nBạn cần tối thiểu ${numberMoney}$ để nghe nhạc`, r, i);
		a.setData(o, options = {
			money: h - parseInt(numberMoney)
		})
	}
	try {
		s.getInfo(t.idYT[n.body - 1]).then((a => {
			let o = a.videoDetails.title;
			e.sendMessage("Đang tải, vui lòng đợi...", r, ((n, t) => setTimeout((() => {
				e.unsendMessage(t.messageID)
			}), 5e3))), s(t.idYT[n.body - 1]).pipe(l(path)).on("close", (() => g(path).size > 99952214400 ? e.sendMessage("Không thể gửi file vì dung lượng lớn hơn 50MB.", r, (() => u(path)), i) : e.sendMessage({
				body: `${o}`,
				attachment: d(path)
			}, r, (() => u(path)), i))).on("error", (n => e.sendMessage(`Đã xảy ra vấn đề khi đang xử lý request, lỗi: \n${n}`, r, i)))
		}))
	} catch (n) {
		e.sendMessage("Lỗi:" + n, r, i)
	}
	return e.unsendMessage(t.messageID)
};