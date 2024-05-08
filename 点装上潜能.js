let itemId = [
    [4033450, 1],
    [4033449, 1],
    [4033458, 1],
    [4033457, 1],
    [4033456, 1],
    [4033455, 1],
]

let dzItem = [
    1182158
]
let money = 100000 //10w點券
let option = [[40041, "力量12%"], [40042, "敏捷12%"], [40043, "智力12%"], [40044, "運氣12%"], [40052, "魔法攻擊力12%"], [40051, "物理攻擊力12%"], [40292, "BOSS無視防禦40%"], [40603, "BOSS傷害40%"]]

main()
function main() {
    let txt = "#r該功能可將點裝強製上潛能#k\r\n"
    txt += "#b每條將消耗特殊材料和點券\r\n#k"
    txt += "#b#L0#第1條\r\n"
    txt += "#b#L1#第2條\r\n"
    txt += "#b#L2#第3條\r\n"
    txt += "#b#L3#第4條\r\n"
    txt += "#b#L4#第5條\r\n"
    txt += "#b#L5#第6條\r\n"
    let sel = npc.askMenu(txt)
    if (sel) {
        let say = "您選擇了第" + (sel + 1) + "條潛能,將消耗一下材料:\r\n"
        say += "#v" + itemId[sel][0] + "# *" + itemId[sel][1] + "和點券 *" + money + "\r\n"
        let selected = npc.askYesNo(say)
        if (selected != 1) {
            return
        }
        if (!player.hasItem(itemId[sel][0], itemId[sel][1])) {
            npc.say("您的材料不足")
            return
        }
        if (player.getCashShopCurrency(1) < money) {
            npc.say('點券不足: 10w')
            return
        }
        player.modifyCashShopCurrency(1, -money);
        let toDrop = player.getInventorySlot(1, 1);
        if (toDrop == null) {
            npc.say("裝備欄的第一格不能為空")
            return
        }
        let flag = false;
        for (var i = 0; i < dzItem.length; i++) {
            if (toDrop.getDataId() == dzItem[i]) {
                flag = true;
            }
        }
        if (!flag) {
            npc.say("隻有點裝才能使用此功能")
            return
        }
        let randomIndex = Math.floor(Math.random() * option.length);
        let randomId = option[randomIndex][0];

        toDrop.setGrade(20)
        switch ((sel + 1)) {
            case 1:
                toDrop.setOption1(randomId)
                break;
            case 2:
                toDrop.setOption2(randomId)
                break;
            case 3:
                toDrop.setOption3(randomId)
                break;
            case 4:
                toDrop.setOption4(randomId)
                break;
            case 5:
                toDrop.setOption5(randomId)
                break;
            case 6:
                toDrop.setOption6(randomId)
                break;
            default:
                break;
        }

        player.updateItem(1, toDrop)
        npc.say("操作成功")
        return
    }
}