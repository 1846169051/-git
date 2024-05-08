let text =
    "\t#k-------#r#v3801309#冒險島  ·  公會任務中心#v3801309##k--------\r\n";

let rewardList = [
    [1212120, 1],
    [1222113, 1]
]

let signIn = [//簽到獎勵
    [1212120, 1],
]

let taskList = [
    [" #d" + "當月與公會成員成功討伐限定BOSS 30 隻 (至少 3 名公會成員) 当前:(" + GetGuildLogBuyGuildId(player.getGuildId(), 'killboss') + ")#l"],
    [" #d" + "當月公會成員上線時間纍計2400H 当前:(" + (GetGuildLogBuyGuildId(player.getGuildId(), '上線纍積240分鐘') * 4) + ")#l"],
    // [" #d" + "當月公會成員纍計擊殺等級範圍內怪物10000000隻,僅限奧術之河以及之後的地圖#l"],
    [" #d" + "當月公會成員纍計通關怪物公園100次 当前:(" + GetGuildLogBuyGuildId(player.getGuildId(), 'MonsterPark') + ")#l"],
    [" #d" + "當月公會成員簽到次數達100次 当前:(" + GetGuildLogBuyGuildId(player.getGuildId(), '公会签到') + ")#l"],
    // [" #d" + "公會成員纍積等級提升5000LV #l"], //做不到
];

let onlineTime = player.getOnlineTime()

main()
function main() {
    for (task of taskList) {
        text += "#b" + task + "#l\r\n"
    }
    text += "\t\r\n"
    text += "#L0# 領取獎勵\t\"#L1# 檢視獎勵\t\"#L2# 點選簽到"

    let sel = npc.askMenuS(text);
    if (!player.getGuildId()) {
        npc.say("你好像冇有加入任何公會");
        return;
    }
    if (sel == 0) {
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
        if (player.getEventValue('每月公會任務獎勵' + getYearAndMonth())) {
            npc.say('本月已經領取過了,不要太貪心哦~')
            return
        }
        if (GetGuildLogBuyGuildId(player.getGuildId(), 'killboss') < 30) {
            npc.say('當月與公會成員成功討伐限定BOSS 30 隻.才能領取哦~')
            return
        }
        if ((GetGuildLogBuyGuildId(player.getGuildId(), '上線纍積240分鐘') * 4) < 2400) {
            npc.say('當月公會成員上線時間纍計2400H.才能領取哦~')
            return
        }
        if (GetGuildLogBuyGuildId(player.getGuildId(), 'MonsterPark') < 100) {
            npc.say('當月公會成員纍計通關怪物公園100次.才能領取哦~')
            return
        }
        if (GetGuildLogBuyGuildId(player.getGuildId(), '公会签到') < 100) {
            npc.say('當月公會成員簽到次數達100次.才能領取哦~')
            return
        }

        for (reward of rewardList) {
            player.gainItem(reward[0], reward[1])
        }
        player.addEventValue("每月公會任務獎勵" + getYearAndMonth(), 1, 1);
        npc.say('奖励领取完成')
        return
    } else if (sel == 1) {
        let txt = "公會任務:\r\n"
        for (reward of rewardList) {
            txt += "#v" + reward[0] + "#*" + reward[1] + "\r\n"
        }
        npc.say(txt)
        return
    } else if (sel == 2) {
        let txt = "公會簽到任務:\r\n"
        txt += "每日參加簽到可以獲得以下獎勵\r\n"
        for (sign of signIn) {
            txt += "#v" + sign[0] + "#*" + sign[1] + "\r\n"
        }
        var yes = npc.askYesNoS("簽到花費6000金幣");
        if (yes == 1) {
            if (!player.hasMesos(6000)) {
                npc.say("您的金幣不足!");
                return;
            }
            if (player.getEventValue('公會簽到獎勵')) {
                npc.say('你今天已經簽到過了哦~')
                return
            }
            for (sign of signIn) {
                player.gainItem(sign[0], sign[1])
            }
            player.loseMesos(6000);
            player.addEventValue("公會簽到獎勵", 1, 1);
            AddGuildLog(player.getGuildId(), player.getId(), player.getAccountId(), GetTime(), '公会签到')
            npc.say("簽到成功")
            return
        }
    }
};
function textType(log) {
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
 * 查询当月log
 * @param {*} guildid 
 * @param {*} logname 
 * @returns 
 */
function GetGuildLogBuyGuildId(guildid, logname) {
    if (!guildid) {
        return 0
    }
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth() + 1; // 月份从0开始，所以需要加1
    let sql = `SELECT * FROM hh_guild_log WHERE guildid = ${guildid} AND logname = '${logname}' AND YEAR(createtime) = ${currentYear} AND MONTH(createtime) = ${currentMonth}`;
    let result = player.customSqlResult(sql);
    if (result) {
        return result.length;
    } else {
        return 0
    }
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
    if (!guild) {
        guild = '暫無工會'
    }
    var sql3 =
        "insert into hh_guild_log(guild_id,playerid,aaccid,createtime,logname)values(?,?,?,?,?)";
    player.customSqlInsert(
        sql3,
        guild, playerid, accid, time, logname
    );
}

function GetTime() {
    let currentDate = new Date();
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1; // 月份从0开始，所以需要加1
    let day = currentDate.getDate();
    let hour = currentDate.getHours();
    let minute = currentDate.getMinutes();
    return year + "-" + month + "-" + day + " " + hour + ":" + minute
}