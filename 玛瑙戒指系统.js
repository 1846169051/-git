
let item = 1114219  //瑪瑙戒
let leveList = [
    //幹淨到1階
    { level: 1, add: 35, itemlist: [[4000016, 499], [4000000, 499]] },
    { level: 2, add: 70, itemlist: [[4000012, 999], [4000015, 999], [4000011, 999]] },
    { level: 3, add: 95, itemlist: [[4000001, 999], [4000009, 999], [4032399, 999]] },
    { level: 4, add: 130, itemlist: [[4000002, 1499], [4000003, 1499]] },
    { level: 5, add: 165, itemlist: [[4000005, 1499], [4000007, 1499], [4000023, 1499]] },
    { level: 6, add: 200, itemlist: [[4000014, 1999], [4000164, 1999], [4000051, 1999]] },
    { level: 7, add: 235, itemlist: [[4000095, 1999], [4000273, 1999], [4000458, 1999]] },
    { level: 8, add: 270, itemlist: [[4000234, 2499], [4000232, 2499], [4000233, 2499]] },
    { level: 9, add: 315, itemlist: [[4000445, 2999], [4000450, 2999], [4000455, 2999]] },
]

main()
function main() {
    let txt = "            瑪瑙戒指係統\r\n"
    txt += "#L0# #v" + item + "# 升級\r\n"
    let sel = npc.askMenu(txt);
    if (sel == 0) {
        let thisSel
        let toDrop1 = player.getInventorySlot(1, 1);
        let itemLevel = toDrop1.getLevel()
        if (!toDrop1) {
            npc.say("請確保#v" + item + "#在背包的第一格")
            return
        }
        if (toDrop1.getItemId() != item) {
            npc.say("請確保#v" + item + "#在背包的第一格")
            return
        }
        if (!itemLevel) {
            itemLevel = 0
        }
        if (itemLevel == 9) {
            npc.say("9階之後無法繼續強化")
            return
        }

        for (let i in leveList) {
            if (leveList[i].level == (itemLevel + 1)) {
                thisSel = leveList[i]
            }
        }

        let sadsa = "強化到" + thisSel.level + "級,你需要消耗:\r\n"
        for (let i in thisSel.itemlist) {
            sadsa += "#v" + thisSel.itemlist[i][0] + "# *" + thisSel.itemlist[i][1] + "個\r\n"
        }

        sadsa += "#L0# 確認\r\n"
        sadsa += "#L1# 取消\r\n"

        var yn = npc.askMenu(sadsa)
        if (yn == 0) {

            for (let i in thisSel.itemlist) {
                if (!player.hasItem(thisSel.itemlist[i][0], thisSel.itemlist[i][1])) {
                    npc.say("您的材料似乎不夠啊")
                    return
                }
            }
            for (let i in thisSel.itemlist) {
                player.loseItem(thisSel.itemlist[i][0], thisSel.itemlist[i][1]);
            }
            toDrop1.setDex((toDrop1.getDex() + thisSel.add));
            toDrop1.setLuk((toDrop1.getLuk() + thisSel.add));
            toDrop1.setInt((toDrop1.getInt() + thisSel.add));
            toDrop1.setStr((toDrop1.getStr() + thisSel.add));
            toDrop1.setPad((toDrop1.getPad() + thisSel.add));
            toDrop1.setMad((toDrop1.getMad() + thisSel.add));
            toDrop1.setMaxHp((toDrop1.getMaxHp() + thisSel.add));
            toDrop1.setLevel((toDrop1.getLevel() + 1))
            player.updateItem(1, toDrop1);
            npc.say('強化成功當前等級:' + toDrop1.getLevel())
        } else {
            return
        }
    }
}