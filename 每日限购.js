let items = [
    //id  數量  限購次數  需要材料數   需要的材料
    [2022678, 100, 10, 10, 4310258],
    [2028030, 100, 10, 10, 4310258],
    [2022663, 100, 1, 5, 4310258],
    [2431553, 100, 1, 5, 4310258],
    [2430394, 100, 1, 5, 4310258],
    [2028082, 100, 1, 5, 4310258],
]

let items2 = [
    //id  數量  限購次數  需要點券數   
    [2022678, 100, 10, 10],
    [2028030, 100, 10, 10],
    [2022663, 100, 1, 5],
    [2431553, 100, 1, 5],
    [2430394, 100, 1, 5],
    [2028082, 100, 1, 5],
]


main()
function main() {
    let str = "每日限購\r\n"
    str += "#r請選擇你需要的，註意請仔細選擇：#k#l\r\n"
    str += "#L0# 複古幣購買  #L1# 點券購買"
    let sel = npc.askMenu(str);
    if (sel == 0) {
        var say1 = "請選擇需要的物品:\r\n"
        for (var i = 0; i < items.length; i++) {
            say1 += "#L" + i + "# 兌換 #v" + items[i][0] + "# * " + items[i][1] + "個 需要#v" + items[i][4] + "#*" + items[i][3] + "個當前可兌換(" + getNum(items[i][0], items[i][2]) + "次) #l\r\n"
        }
        let sel2 = npc.askMenu(say1);
        if (getNum(items[sel2][0], items[sel2][2]) < 1) {
            npc.say("該物品已達到兌換上限,看看別的吧~")
            return
        }
        let num = player.getAmountOfItem(items[sel2][4])
        if (num < items[sel2][3]) {
            npc.say("材料不足,看看別的吧~")
            return
        }
        if (player.canGainItem(items[sel2][0], items[sel2][1])) {
            player.addEventValue(items[sel2][0] + getinayue(), 1, 1)
            player.loseItem(items[sel2][4], items[sel2][3])
            player.gainItem(items[sel2][0], items[sel2][1])
            return
        } else {
            npc.say("請你確認在背包的空間。"); // 背包空間不足提示
        }
    } else {
        var say1 = "請選擇需要的物品:\r\n"
        for (var i = 0; i < items2.length; i++) {
            say1 += "#L" + i + "# 兌換 #v" + items2[i][0] + "# * " + items2[i][1] + "個 需要點券*" + items2[i][3] + "個當前可兌換(" + getNum(items2[i][0], items2[i][2]) + "次) #l\r\n"
        }
        let sel2 = npc.askMenu(say1);
        if (getNum(items2[sel2][0], items2[sel2][2]) < 1) {
            npc.say("該物品已達到兌換上限,看看別的吧~")
            return
        }
        if (player.getCashShopCurrency(1) < items2[sel2][3]) {
            npc.say('點券不足:' + items2[sel2][3])
            return
        }
        player.modifyCashShopCurrency(1, -items2[sel2][3]);
        player.addEventValue(items2[sel2][0] + getinayue(), 1, 1)
        player.gainItem(items2[sel2][0], items2[sel2][1])
        return
    }
}

function getNum(id, num) {
    if (!num) {
        return '無限'
    }
    return num - player.getEventValue(id + getinayue())
}

function getinayue() {
    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = currentDate.getMonth() + 1;
    var monthString = month.toString().padStart(2, '0');
    return year + monthString
}