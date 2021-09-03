/**
* @author ProCoderMew
* @warn Do not edit code or edit credits
*/

module.exports.config = {
    name: "antiout",
    eventType: ["log:unsubscribe"],
    version: "1.0.7",
    credits: "ProCoderMew",
    description: "Listen events",
    dependencies: {
        "path": ""
    }
};

module.exports.run = async function ({ api, event, Users }) {
    const { resolve } = global.nodemodule["path"];
    const path = resolve(__dirname, '../commands', 'cache', 'meewmeew.json');
    const { antiout } = require(path);
    const { logMessageData, author, threadID } = event;
    const id = logMessageData.leftParticipantFbId;
    if (id == api.getCurrentUserID()) return;
    if (author == id) {
        const name = await Users.getNameUser(id) || "Người dùng Facebook";
        if (antiout.hasOwnProperty(threadID) && antiout[threadID] == true) {
            try {
                await api.addUserToGroup(id, threadID);
                return api.sendMessage(` ${name} Đã cố gắng trốn thoát khỏi nhóm nhưng không thành và đã bị bắt lại.`);
            }
            catch (e) {
                return api.sendMessage(`Không thể thêm ${name} vừa out vào lại nhóm.`, threadID);
            }
        }
    }
    return;
}