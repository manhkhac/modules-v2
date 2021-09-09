module.exports.config = {
  name: "covid",
  version: "1.0.3",
  hasPermssion: 0,
  credits: "ManhG",
  description: "Lấy thông tin về tình hình dịch bệnh COVID-19",
  commandCategory: "news",
  cooldowns: 5,
  dependencies: {
    "axios": ""
  }
};
module.exports.languages = {
  "vi": {
    "return": "====== Thế Giới ======\n😷 Nhiễm: %1\n💚 Đã hồi phục: %2\n💀 Tử vong: %3\n====== Việt Nam ======\n😷 Nhiễm: %4\n💚 Đã hồi phục: %5\n💀 Tử vong: %6"
  },
  "en": {
    "return": "====== World ======\n😷 Cases: %1\n💚 Recovered: %2\n💀 Deaths: %3\n====== VietNam ======\n😷 Cases: %4\n💚 Recovered: %5\n💀 Deaths: %6\n📰 News: %7\nData is updated at: %8 (UTC +7)"
  }
}
module.exports.run = async function ({ api, event, getText }) {
  const axios = global.nodemodule["axios"];
  let fetchdata = await axios.get("https://code.junookyo.xyz/api/ncov-moh/data.json");
  var jsondata = (await fetchdata.data).data;
  var vn = jsondata.vietnam || {};
  var tg = jsondata.global || {};
  return api.sendMessage(getText("return",
    tg.cases,
    tg.recovered,
    tg.deaths,
    vn.cases,
    vn.recovered,
    vn.deaths),
    event.threadID, event.messageID);
}

