let text =
    "\t#k-------#r#v3801309#冒險島  ·  月卡中心#v3801309##k--------\r\n";

let item = 2437729
let rewardList = [
    [4009507, 2],
    [2630281, 2],
    [2430394, 2],
    [2436711, 1],
    [2435153, 1],
    [4036657, 1],
]
let onlineTime = player.getOnlineTime()
main()
function main() {
    text += "#e當前在線時間:#r(" + onlineTime + ")#k分鐘\r\n"
    if (!player.getEventValue('月卡' + getYearAndMonth())) {
        text += "當月還可以未開通月卡\r\n"
    }
    text += "購買後完成每日在線240分鍾可獲得" + item + "*1\r\n"
    text += "開啓後可獲得以下獎勵:\r\n"
    for (reward of rewardList) {
        text += "#v" + reward[0] + "#*" + reward[1] + "\t\t"
    }
    if (player.getEventValue('月卡' + getYearAndMonth())) {
        text += "\r\n#L0# #b#e領取獎勵#l\t"
    }
    if (!player.getEventValue('月卡' + getYearAndMonth())) {
        text += "\r\n#L1# #b#e購買月卡#l"
    }

    let sel = npc.askMenuS(text);
    if (sel == 0) {
        if (onlineTime < 240) {
            npc.say('在線時間不足240分鍾')
            return
        }
        if (!player.getEventValue('月卡' + getYearAndMonth())) {
            npc.say('您當月還冇有月卡')
            return
        }
        if (!player.getEventValue('月卡箱子領取')) {
            npc.say('您今日已經領取過了')
            return
        }
        if (!player.canGainItem(item, 1)) {
            npc.say('請檢查背包空位')
            return
        }
        player.addEventValue("月卡箱子領取", 1, 1);
        player.gainItem(item, 1)
        return
    } else {
        let txt = "購買月卡:\r\n"
        txt += '299點券可購買月卡,月卡每月底刷新\r\n'
        var yes = npc.askYesNoS("您確定要花費299點券購買月卡x1");
        if (yes == 1) {
            if (player.getCashShopCurrency(1) < 299) {
                npc.say('点券不足299')
                return
            }
            player.modifyCashShopCurrency(1,-299);
            player.addEventValue('月卡' + getYearAndMonth(), 1, -1);
            npc.say("購買成功")
        }
    }
}



function getYearAndMonth() {
    var today = new Date();
    var year = today.getFullYear(); // 獲取年份
    var month = today.getMonth() + 1; // 獲取月份，註意月份是從 0 開始的，所以要加 1
    return year + "-" + month
}
