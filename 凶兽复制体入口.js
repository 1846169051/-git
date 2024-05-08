
let text = {
    enterTxt: "特殊副本——凶獸複製體",

    secTxt: "是否準備完畢？"
}
let event = "fierce_beast_copy";
let onlyOne = true;

let config = {
    PQLog:"FierceBeastCopy",
    minPlayers:1,
    maxPlayers:6,
    minLevel:100,
    maxLevel:999,
    maxEnterTime:2,
    limitBreak:5000000000,
    jobLimit: 0,
    npcModal: true,
}
let toDrop;

start();

function start(){
    let txt = text.enterTxt +
            "\r\n" +
            "#L" + 1 + "#申請進入挑戰凶獸複製體 #l\r\n"
            ;
    let options = npc.askMenuA(txt, true);
    toDrop = player.getInventorySlot(-1, -0xB);
    switch(options){
        case 1:{
            let members = party.getLocalMembers();
            let teamNum = members.length;
            // 判断职业
            let isFullJob = true;
            // 一次轉升判斷
            let reviveTimes = player.getEventValue('轉生次數');
            player.showSystemMessage("reviveTimes" + reviveTimes);

            if(reviveTimes < 1){
                isFullJob = false;
            }
            

            let isFullTimes = true;

            // 非正常退出清理事件
            // let event = npc.getEvent("fierce_beast_copy");
            // if (event) {
            //     event.destroyEvent();
            // }

            for (let i = 0; i < members.length; i++) {
                let times = members[i].getEventValue("凶獸複製體副本限制");

                if(times === undefined){
                    members[i].addEventValue("凶獸複製體副本限制", 0);
                    times = 0;
                }
                if(times > config.maxEnterTime){
                    isFullTimes = false;
                    break;
                }
            }
            if (toDrop.getLimitBreak() < config.limitBreak){
                npc.say("你的武器破功還沒達到50E，請先使用金幣破功");
            }
            else if(!isFullJob){
                npc.say("至少需要一轉才能進行該副本！")
            }
            else if(!isFullTimes){
                npc.say("你或者你的隊友今日已經參加過#r2次#k該副本，請明天再來！")
            }
            else if (party.numberOfMembersInChannel() < config.minPlayers || party.getMembersCount(map.getId(), 1, 500) > config.maxPlayers) {
                npc.say("你需要有一個#r" + config.minPlayers + "~" + config.maxPlayers + "#k人的隊伍.!", config.npcModal);
            } 
            else if (party.getMembersCount(map.getId(), config.minLevel, config.maxLevel) < party.numberOfMembersInChannel()) {
                npc.say("你隊員的等級要在" + config.minLevel + "~" + config.maxLevel + "範圍!請確認!", config.npcModal);
            } 
            else if (npc.makeEvent("fierce_beast_copy", onlyOne, [party]) == null) {
                npc.say("已經有隊伍在進行了,請更換其他頻道嘗試。", config.npcModal);
            }
            break;
            
        }
    }
}