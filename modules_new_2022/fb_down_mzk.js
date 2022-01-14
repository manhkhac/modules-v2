/**
 * @author MạnhG
 * @warn Do not edit code or edit credits
 */
 module.exports.config = {
    name: "fbvideo",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "MạnhG",
    description: "Phát video thông qua link Facebook",
    commandCategory: "Phương tiện",
    usages: "[link Videos/ story]",
    cooldowns: 5,
    dependencies: {
        "axios": "",
        "path": "",
        "fs-extra": "",
        "tinyurl": ""
    },
    envConfig: {
        API_KEY: "mzkFree_722124509AC10" //Nhập API_Key của bạn ở đây hoặc file config.json
    }
};
var getLink = "https://manhict.tech/fbvideo/v2?url=";
var numberSize = 26000000;
var sizeN = "25MB";
var rdPath = Math.floor(Math.random() * 99999999999);

module.exports.run=async function({event:e,api:n,args:a}){const{threadID:t,messageID:i}=e,s=require("axios"),r=require("fs-extra"),{API_KEY:u}=global.configModule[this.config.name];if(0==!a.join(" ").indexOf("https://"))return n.sendMessage("Bạn phải nhập url video FB !",t,i);n.sendMessage("Đang tải, vui lòng đợi...",t,((e,a)=>setTimeout((()=>{n.unsendMessage(a.messageID)}),2e4)));const d=a.join(" ").trim();try{let{data:e}=await s.get(`${getLink}${d}&apikey=${u}`);if(e.error)return n.sendMessage(e.error,t);let a=e.data.title,c=e.data.medias[1].url,l=e.data.medias[0].url;var g=await require("tinyurl").shorten(c),o=__dirname+`/cache/${rdPath}.mp4`;const h=(await s.get(c,{responseType:"arraybuffer"})).data;if(r.writeFileSync(o,Buffer.from(h,"utf-8")),r.statSync(o).size>numberSize){n.sendMessage(`Link Tải Full HD: ${g}\n\nKhông thể gửi video chất lượng HD vì dung lượng lớn hơn ${sizeN}\n\nTiến hành tải video có chất lượng SD...`,t,(()=>r.unlinkSync(o)),i);const e=(await s.get(l,{responseType:"arraybuffer"})).data;r.writeFileSync(o,Buffer.from(e,"utf-8"));return await n.sendMessage({body:a,attachment:r.createReadStream(o)},t,(()=>r.unlinkSync(o)),i)}n.sendMessage("Tiến hành gửi video Full HD...\n\nGửi được hay không tuỳ video vch:))",t,((e,a)=>setTimeout((()=>{n.unsendMessage(a.messageID)}),35e3)));return await n.sendMessage({body:`Link Tải Full HD: ${g}`,attachment:r.createReadStream(o)},t,(()=>r.unlinkSync(o)),i)}catch(e){return n.sendMessage("Không thể xử lý yêu cầu của bạn!!!",t,i)}};