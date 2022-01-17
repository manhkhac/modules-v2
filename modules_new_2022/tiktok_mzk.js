/**
 * @author MạnhG
 * @warn Do not edit code or edit credits
 */
 module.exports.config = {
    name: "tiktok",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "MạnhG",
    description: "Phát video thông qua link Tiktok hoặc từ khoá tìm kiếm",
    commandCategory: "Phương tiện",
    usages: "[searchVideos]",
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
var timeVD = "0"; // 0 - mọi lúc; 1 - ngày hôm qua; 7 - tuần này; 30 - tháng; 90 - 3 tháng; 180 - 6 tháng
var rdPath = Math.floor(Math.random() * 99999999999999);
var path = __dirname + `/cache/${rdPath}.mp4`;

module.exports.run=async function({event:e,api:t,args:a}){const{threadID:s,messageID:r}=e,{createReadStream:n,existsSync:i,writeFileSync:o,readdirSync:c,unlinkSync:d}=require("fs-extra"),u=require("axios"),{API_KEY:l}=global.configModule[this.config.name];try{if(0==a.length||!a)return t.sendMessage("[Tiktok] Nhập ký tự cần tìm kiếm!",s,r);if(0==a.join(" ").indexOf("https://")){const e=a.join(" ").trim();try{t.sendMessage("Đang tải, vui lòng đợi...",s,((e,a)=>setTimeout((()=>{t.unsendMessage(a.messageID)}),2e4)));let{data:a}=await u.get(`https://manhict.tech/tiktok?link=${e}&apikey=${l}`);if(a.error)return t.sendMessage(a.error,s);let i=a.data.title,c=a.data.video_no_watermark;const h=await u.get(c,{responseType:"arraybuffer"});return o(path,Buffer.from(h.data,"utf-8")),void t.sendMessage({body:i,attachment:n(path)},s,(()=>d(path)),r)}catch(e){return console.log(e),t.sendMessage("Có lỗi xảy ra!",s,r)}}else try{var h,f=[],g=[],y="",m=0;const n=encodeURIComponent(a.join(" "));var{data:p}=await u.get(`https://manhict.tech/tiktok/search?query=${n}&time=${timeVD}&apikey=${l}`);if(p.error)return t.sendMessage(p.error,s);h=p.results;for(let e of h){f.push(e.video),g.push(e.desc);var k=`${e.time}`,M=Math.floor(k/1e3/60<0),v=Math.floor(k/1e3%60);if(1==(m=m+=1))var x="⓵";if(2==m)x="⓶";if(3==m)x="⓷";if(4==m)x="⓸";if(5==m)x="⓹";if(6==m)x="⓺";if(7==m)x="⓻";if(8==m)x="⓼";if(9==m)x="⓽";if(10==m)x="⓾";y+=`${x}.《${M+":"+v}》${e.desc}\n\n`}var I=`»🔎 There are ${f.length} results matching your search keyword:\n\n${y}» Please reply (feedback) choose one of the above searches.`;return t.sendMessage({body:I},s,((t,a)=>{client.handleReply.push({name:this.config.name,messageID:a.messageID,author:e.senderID,tikTitle:g,tikLink:f})}),r)}catch(e){return t.sendMessage("Có lỗi xảy ra:"+e,s,r)}}catch(e){return void console.log(e)}},module.exports.handleReply=async function({event:e,api:t,handleReply:a}){const{threadID:s,body:r,messageID:n}=e,{createReadStream:i,existsSync:o,writeFileSync:c,readdirSync:d,unlinkSync:u}=require("fs-extra"),l=require("axios");if(h=r,isNaN(h)||(h<1||h>10))return t.sendMessage("Chọn từ 1 -> 10, baby. love uwu ❤️",s,n);var h;t.unsendMessage(a.messageID),t.sendMessage("Đang tải, vui lòng đợi...",s,((e,a)=>setTimeout((()=>{t.unsendMessage(a.messageID)}),2e4)));try{const e=a.tikTitle[r-1],o=a.tikLink[r-1],d=await l.get(o,{responseType:"arraybuffer"});c(path,Buffer.from(d.data,"utf-8"));return await t.sendMessage({body:e,attachment:i(path)},s,(()=>u(path)),n)}catch(e){return console.log(e),t.sendMessage("Có lỗi xảy ra:"+e,s,n)}};