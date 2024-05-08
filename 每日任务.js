let text =
    "\t#k-------#r#v3801309#冒險島  ·  每日任務中心#v3801309##k--------\r\n";
let rewardList = [
    [1212120, 1],
    [1222113, 1]
]
let item = 1113098 //提價材料
let kus = [//签到奖励
    [4001848, 5],
    [4033248, 9999],
    [2430394, 1],
    [2614026, 5],
]

let onlineTime = player.getOnlineTime()
let KillMonsterNumber = 123
let killBoss = player.getEventValue('Demian')
let gather = player.getEventValue('每日任務提交')
let MonsterPark = player.getEventValue('MonsterPark')
let DimensionalInvasion = player.getEventValue('次元獎勵')

main()
function main() {
    text += "當前在線時間:(" + onlineTime + ")分鐘\r\n"
    // text += " #d" + "#b200LV以上怪物獵殺5000隻僅限奧術之河以及之後的地圖:當前擊敗(" + KillMonsterNumber + ") #l\r\n";
    text += " #d" + "#b討伐王怪黛米安:(" + isOk(killBoss) + ")#l\r\n";
    text += " #d" + "#b蒐集#v" + item + "#道具200個:當前收集(" + gather + ")#l\r\n";
    text += " #d" + "#b怪物公園通關1次:當前次數(" + isOk(MonsterPark) + ")#l\r\n";
    text += " #d" + "#b次元入侵通關1次:當前次數(" + isOk(DimensionalInvasion) + ")#l\r\n";
    text += " #d" + "#b上線纍積120分鐘:(" + isOkTime(120, onlineTime) + ")#l\r\n";
    text += " #d" + "#b上線纍積240分鐘:(" + isOkTime(240, onlineTime) + ")#l\r\n";
    text += "\t\r\n"
    text += "#L0# 領取獎勵#l\t\"#L1# 檢視獎勵#l\t\"#L2# 提交#v" + item + "##l\r\n"
    text += "#L3# 每日簽到#l"
    let sel = npc.askMenuS(text);
    if (sel == 0) {
        if (isOkTime(120, onlineTime) == '未完成') {
            npc.say('上線纍積120分鐘未完成呢')
            return
        }
        if (isOkTime(240, onlineTime) == '未完成') {
            npc.say('上線纍積240分鐘未完成呢')
            return
        }
        if (isOk(MonsterPark) == '未完成') {
            npc.say('怪物公園通關1次未完成呢')
            return
        }
        if (isOk(DimensionalInvasion) == '未完成') {
            npc.say('次元入侵通關1次未完成呢')
            return
        }
        if (gather < 200) {
            npc.say('蒐集#v' + item + '#道具200個未完成呢')
            return
        }

        let arr = []
        for (var i = 0; i < rewardList.length; i++) {
            if (!player.canGainItem(rewardList[i][0], rewardList[i][1])) {
                arr.push(false)
            }
        }
        if (arr.includes(false)) {
            npc.say('請檢查背包空位')
            return
        }
        if (player.getEventValue('每日任務獎勵')) {
            npc.say('不要太貪心哦~')
            return
        }
        for (reward of rewardList) {
            player.gainItem(reward[0], reward[1])
        }
        AddGuildLog(player.getGuildId(), player.getId(), player.getAccountId(), gettime(), '上線纍積240分鐘')
        player.addEventValue("上線纍積240分鐘" + getYearAndMonth(), 1, -1);
        if (player.getEventValue("上線纍積240分鐘" + getYearAndMonth()) >= 20) { //通行证累计20次上线240
            player.addEventValue("當月簽到240分鐘20次" + getYearAndMonth(), 1, -1)
        }
        player.addEventValue("每日任務獎勵", 1, 1);
        npc.say(txt)
        return
    } else if (sel == 1) {
        let txt = "每日任務:\r\n"
        for (reward of rewardList) {
            txt += "#v" + reward[0] + "#*" + reward[1] + "\r\n"
        }
        npc.say(txt)
        return
    } else if (sel == 2) {
        let number = npc.askNumber("#b請輸入提交數量", 1, 1, player.getAmountOfItem(item));
        player.loseItem(item, number);
        for (let i = 0; i < number; i++) {
            player.addEventValue("每日任務提交", 1, 1);
        }
        npc.say("提交完成")
        return
    } else if (sel == 3) {
        if (player.getEventValue("每日签到")) {
            npc.say("今天已经签到过~")
            return
        }
        for (let i = 0; i < kus; i++) {
            player.gainItem(kus[i][0], kus[i][1])
        }
        player.addEventValue("每日签到", 1, 1);
        npc.say("歡迎來到冒險島~")
        return
    }
};

function isOkTime(num, time) {
    if (num <= time) {
        return '已完成'
    } else {
        return '未完成'
    }
}

function isOk(log) {
    if (log) {
        return '已完成'
    } else {
        return '未完成'
    }
}

function getYearAndMonth() {
    var today = new Date();
    var year = today.getFullYear(); // 獲取年份
    var month = today.getMonth() + 1; // 獲取月份，註意月份是從 0 開始的，所以要加 1
    return year + "-" + month
}

/**
 * 新增log
 * @param {*} guild 
 * @param {*} playerid 
 * @param {*} accid 
 * @param {*} time 
 * @param {*} logname 
 */
function AddGuildLog(guild, playerid, accid, time, logname) {
    var sql3 =
        "insert into hh_guild_log(guild_id,playerid,aaccid,createtime,logname)values(?,?,?,?,?)";
    player.customSqlInsert(
        sql3,
        guild, playerid, accid, time, logname
    );
}

function gettime() {
    let currentDate = new Date();
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1; // 月份从0开始，所以需要加1
    let day = currentDate.getDate();
    let hour = currentDate.getHours();
    let minute = currentDate.getMinutes();
    return year + "-" + month + "-" + day + " " + hour + ":" + minute
}