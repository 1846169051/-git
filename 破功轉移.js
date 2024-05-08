let equipInfoTest =
{
    depleteItemIds: [4036309, 4036309, 4036309, 4036309, 4036309, 4036309, 4036309],
    itemCont: [10, 1, 1, 1, 1, 1, 1],
    coupon: 500000,
}
main()
//只轉移破功
function main() {
    var sel = "                    破功轉移#k#n\r\n"
    sel += ""
    sel += "將裝備欄位第一格的裝備的破功轉移到裝備欄位第二格。轉移後，被轉移的道具將會被刪除。\r\n"
    sel += `#b#L0#破功轉移轉移\r\n`


    let str = npc.askMenu(sel);
    if (str != "0") return;
    //获取道具
    let toDrop1 = player.getInventorySlot(1, 1)
    let toDrop2 = player.getInventorySlot(1, 2)
    //判斷是否爲空
    if (!toDrop1 || !toDrop2) {
        npc.say("您的背包前倆格有空")
        main()
        return
    }


    if (toDrop1.getLevel() != toDrop2.getLevel()) {
        npc.say("裝備等級不同，無法轉移")
        main()
        return
    }

    //確定轉移
    var sayStr = "確定將破功轉移#v" + toDrop1.getItemId() + "#到#v" + toDrop2.getItemId() + "#嗎？\r\n"
    sayStr += "轉移後，被轉移的道具將會被刪除。\r\n"
    sayStr += "轉移許需消耗道具\r\n"
    for (let i = 0; i < equipInfoTest.depleteItemIds.length; i++) {
        var itemId = equipInfoTest.depleteItemIds[i]
        var itemNum = equipInfoTest.itemCont[i]
        sayStr += `#v${itemId}#x${itemNum}\r\n`
    }

    let needCoupon = equipInfoTest.coupon
    if (needCoupon != 0) sayStr += "需要" + needCoupon + "點券。\r\n"
    let ans = npc.askYesNoS(sayStr);

    if (ans == 1) {
        //確認是否有足夠的道具
        for (let i = 0; i < equipInfoTest.depleteItemIds.length; i++) {
            var itemId = equipInfoTest.depleteItemIds[i]
            var itemNum = equipInfoTest.itemCont[i]
            if (!player.hasItem(itemId, itemNum)) {
                npc.say("沒有足夠的道具。")
                main()
                return
            }
        }

        //判斷是否有足夠的點券
        if (needCoupon != 0 && !player.getCashShopCurrency(1) >= needCoupon) {
            npc.say("沒有足夠的點券。")
            main()
            return
        }

        toDrop2.setLimitBreak(toDrop1.getLimitBreak());//破功
        player.updateItem(1, toDrop2);
        player.loseItem(toDrop1.getDataId(), 1);
        npc.say("轉移成功")

    }
}

