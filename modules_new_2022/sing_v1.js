/**
 * @author MạnhG
 * @warn Do not edit code or edit credits
 */
 module.exports.config = {
    name: "sing",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "MạnhG",
    description: "Phát nhạc thông qua link YouTube hoặc từ khoá tìm kiếm",
    commandCategory: "Phương tiện",
    usages: "[search]",
    cooldowns: 10,
    dependencies: {
        "axios": "",
        "path": "",
        "fs-extra": "",
        "tinyurl": ""
    },
    envConfig: {
        "API_KEY": "mzkFree_722124509AC10"
    }
};
var rdPath = Math.floor(Math.random() * 99999999999999);
var timeSearch = 7; // Tìm kiếm theo thời gian, ví dụ: 4, 5, 6,...,<= 9

module.exports.run=async function({event:e,api:t,args:a,body:r}){const n=require("axios"),{createReadStream:s,statSync:i,writeFileSync:o,createWriteStream:d,unlinkSync:g}=require("fs-extra"),{threadID:l,senderID:c,messageID:u}=e,{API_KEY:h}=global.configModule[this.config.name];try{if(0==a.length||!a)return t.sendMessage("[YTB_mp3] Nhập ký tự cần tìm kiếm!",l,u);if(0==a.join(" ").indexOf("https://")){const e=a.join(" ").trim();try{t.sendMessage("Đang tải, vui lòng đợi...",l,((e,a)=>setTimeout((()=>{t.unsendMessage(a.messageID)}),3e4)));let{data:a}=await n.get(`https://manhict.tech/sing?link=${e}&apikey=${h}`);if(a.error)return t.sendMessage(a.error,l);let r=a.title,d=a.link;var f=__dirname+`/cache/${rdPath}.m4a`;if(""==d){let{data:a}=await n.get(`https://manhict.tech/video?link=${e}&apikey=${h}`);if(a.error)return t.sendMessage(a.error,l);let r=a.title,i=a.link.audio;const d=(await n.get(i,{responseType:"arraybuffer"})).data;o(f,Buffer.from(d,"utf-8"));return await t.sendMessage({body:r,attachment:s(f)},l,(()=>g(f)),u)}{const a=(await n.get(d,{responseType:"arraybuffer"})).data;if(o(f,Buffer.from(a,"utf-8")),i(f).size>26e6){t.sendMessage("Không thể gửi file có dung lượng lớn hơn 25MB.\n\nTiến hành render và gửi lại...",l,(()=>g(f)),u);let{data:a}=await n.get(`https://manhict.tech/video?link=${e}&apikey=${h}`);if(a.error)return t.sendMessage(a.error,l);let r=a.title,i=a.link.audio;const d=(await n.get(i,{responseType:"arraybuffer"})).data;o(f,Buffer.from(d,"utf-8"));return await t.sendMessage({body:r,attachment:s(f)},l,(()=>g(f)),u)}await t.sendMessage({body:r,attachment:s(f)},l,(()=>g(f)),u)}}catch(e){return console.log(e),t.sendMessage("Có lỗi xảy ra:"+e,l,u)}}else try{var y,m,p=[],M="",b=0;const s=encodeURIComponent(a.join(" "));var{data:w}=await n.get(`https://manhict.tech/youtube?q=${s}&apikey=${h}`);if(w.error)return t.sendMessage(w.error,l);y=w.results;for(let e in y)if(null!=y[e].video&&(m=y[e].video).duration.length<=timeSearch&&"Live"!=m.duration){b=b+=1,p.push(m.id),M+=`${b}.《${m.duration}》 ${m.title}\n\n`}r=`»🔎 There are ${p.length} results matching your search keyword:\n\n${M}» Please reply (feedback) choose one of the above searches.`;return void t.sendMessage({body:r},l,((t,a)=>{client.handleReply.push({name:this.config.name,messageID:a.messageID,author:e.senderID,idYT:p})}),u)}catch(e){return t.sendMessage("The request could not be processed due to an error: "+e.message,l,u)}}catch(e){return void console.log(e)}},module.exports.handleReply=async function({event:e,api:t,handleReply:a}){const r=require("axios"),{createReadStream:n,statSync:s,writeFileSync:i,readdirSync:o,unlinkSync:d}=require("fs-extra"),{threadID:g,senderID:l,messageID:c,body:u}=e,{API_KEY:h}=global.configModule[this.config.name];if(f=u,isNaN(f)||(f<1||f>20))return t.sendMessage("Choose from 1 -> 20, baby. love uwu ❤️",g,c);var f;t.unsendMessage(a.messageID),t.sendMessage("Đang tải, vui lòng đợi...",g,((e,a)=>setTimeout((()=>{t.unsendMessage(a.messageID)}),3e4)));try{let{data:o}=await r.get(`https://manhict.tech/sing/id?id=${a.idYT[e.body-1]}&apikey=${h}`);if(o.error)return t.sendMessage(o.error,g);let l=o.title,u=o.link;var y=__dirname+`/cache/${rdPath}.m4a`;if(""==u){let{data:s}=await r.get(`https://manhict.tech/singv2/id?id=${a.idYT[e.body-1]}&apikey=${h}`);if(s.error)return t.sendMessage(s.error,g);let o=s.title,l=s.link;const u=(await r.get(l,{responseType:"arraybuffer"})).data;i(y,Buffer.from(u,"utf-8"));return await t.sendMessage({body:o,attachment:n(y)},g,(()=>d(y)),c)}{const o=(await r.get(u,{responseType:"arraybuffer"})).data;if(i(y,Buffer.from(o,"utf-8")),s(y).size>26e6){t.sendMessage("Không thể gửi file có dung lượng lớn hơn 25MB.\n\nTiến hành render và gửi lại...",g,(()=>d(y)),c);let{data:s}=await r.get(`https://manhict.tech/singv2/id?id=${a.idYT[e.body-1]}&apikey=${h}`);if(s.error)return t.sendMessage(s.error,g);let o=s.title,l=s.link;const u=(await r.get(l,{responseType:"arraybuffer"})).data;i(y,Buffer.from(u,"utf-8"));return await t.sendMessage({body:o,attachment:n(y)},g,(()=>d(y)),c)}await t.sendMessage({body:l,attachment:n(y)},g,(()=>d(y)),c)}}catch(e){return console.log(e),t.sendMessage("Có lỗi xảy ra:"+e,g,c)}};