module.exports.config = {
  name: "demngayyeu",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "MạnhG",
  description: "Đếm ngày yêu nhau",
  commandCategory: "countdown",
  cooldowns: 5
}

module.exports.onLoad = () => {
  const fs = global.nodemodule["fs-extra"];
  const request = global.nodemodule["request"];
  const dirMaterial = __dirname + `/Noprefix/`;
  if (!fs.existsSync(dirMaterial + "Noprefix")) fs.mkdirSync(dirMaterial, { recursive: true });
  if (!fs.existsSync(dirMaterial + "demngayyeu.jpg")) request("https://raw.githubusercontent.com/manhkhac/mirai-1.2.8/data/img/demngayyeu.jpg").pipe(fs.createWriteStream(dirMaterial + "demngayyeu.jpg"));
}

module.exports.handleEvent = async ({ event, api, Users }) => {
  const fs = global.nodemodule["fs-extra"];
  //let name = await Users.getNameUser(event.senderID);
  var { threadID, messageID, body, senderID } = event;
  if (senderID == api.getCurrentUserID()) return;
  function out(data) {
    api.sendMessage(data, threadID, messageID)
  }
	//Thay số ngày yêu nhau ở đây, trừ đi 1 tháng
  let dateBegin = new Date(2021, 02, 23, 00, 00, 00).getTime()
  let dateNow = Date.now()
  let Time = dateNow - dateBegin
  let parseDays = Math.floor(Time / (1000 * 60 * 60 * 24))
  let parseHours = Math.floor((Time - parseDays * (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  let parseMinutes = Math.floor((Time - parseDays * (1000 * 60 * 60 * 24) - parseHours * (1000 * 60 * 60)) / (1000 * 60))
  let parseSeconds = Math.floor((Time - parseDays * (1000 * 60 * 60 * 24) - parseHours * (1000 * 60 * 60) - parseMinutes * (1000 * 60)) / (1000))
  //trả lời
  var msg = {
    body: `❤Đếm ngày yêu❤\n\n${parseDays} ngày ${parseHours} tiếng ${parseMinutes} phút ${parseSeconds} giây `,
    attachment: fs.createReadStream(__dirname + `/Noprefix/demngayyeu.jpg`)
  }
  // Gọi bot
  var arr = ["demngayyeu", "đếm ngày yêu", "số ngày yêu nhau", "đny"];
  arr.forEach(i => {
    let str = i[0].toUpperCase() + i.slice(1);
    if (body === i.toUpperCase() | body === i | str === body) return out(msg)
  });
};

module.exports.run = function ({ event, api }) {
	//Thay số ngày yêu nhau ở đây, trừ đi 1 tháng
  let dateBegin = new Date(2021, 02, 23, 00, 00, 00).getTime()
  let dateNow = Date.now()
  let Time = dateNow - dateBegin
  let parseDays = Math.floor(Time / (1000 * 60 * 60 * 24))
  let parseHours = Math.floor((Time - parseDays * (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  let parseMinutes = Math.floor((Time - parseDays * (1000 * 60 * 60 * 24) - parseHours * (1000 * 60 * 60)) / (1000 * 60))
  let parseSeconds = Math.floor((Time - parseDays * (1000 * 60 * 60 * 24) - parseHours * (1000 * 60 * 60) - parseMinutes * (1000 * 60)) / (1000))
  return api.sendMessage(`❤Đếm ngày yêu❤\n\n ${parseDays} ngày ${parseHours} tiếng ${parseMinutes} phút ${parseSeconds} giây `, event.threadID, event.messageID);

}
