// 可以強化的圖騰id
let canUpIdg = [
    1202022, 1202050, 1202054,
]
// 各個階段需要的材料及數量
let materials = [
    // 等級下,等級上,材料,加成
    [0, 1, [[4000288, 1000], [4000625, 1000]], 9],
    [2, 10, [[4000001, 2000], [4000022, 2000]], 9],
    [11, 20, [[4000365, 4000], [4000364, 4000]], 90],
    [21, 30, [[4000299, 3000], [4000289, 3000]], 180],
    [31, 40, [[4000056, 2000], [4000049, 2000]], 270],
    [41, 50, [[4000653, 5000], [4000652, 5000]], 360],
    [51, 60, [[4000832, 6000], [4000828, 6000]], 450],
    [61, 70, [[4034297, 7000], [4034296, 7000]], 540],
    [71, 80, [[4036102, 8000], [4036100, 8000]], 630],
    [81, 90, [[4036456, 9000], [4036398, 9000]], 720],
    [91, 98, [[4036446, 10000], [4036456, 10000]], 810],
    [99, 99, [[4036446, 10000], [4036456, 10000]], 900],
    [100, 100, [[4036446, 10000], [4036456, 10000]], 999],
]

let curLevel
let curId
let list
let add
start()
function start() {
    let text = '圖騰強化係統\r\n'
    text += '#L1#強化圖騰#l\r\n'
    text += '#L2#查看可強化圖騰#l\r\n'
    text += '#L3#查看各階段所需材料及加成#l\r\n'
    let xuan = npc.askMenu(text)
    if (xuan == 1) {
        // 獲取裝備欄第一格實例
        let equip = player.getInventorySlot(1, 1)
        if (equip == null) {
            npc.say("請將圖騰放入背包第一格")
            return
        }
        // 獲取當前圖騰的強化等級
        const str = equip.getTitle();
        if (str == null) {
            str="0級"
        }
        curLevel = str.match(/\d+/);
        curLevel=curLevel-0+1
        if (curLevel > 100) {
            npc.say("圖騰已滿級")
            return
        }
        for (let i = 0; i < canUpIdg.length; i++) {
            if (equip.getItemId() == canUpIdg[i]) {
                // 獲取圖騰id
                curId = canUpIdg[i]
                break
            }
        }
        let text='确定要强化#v'+curId+'#吗？\r\n'
        text+='強化後等級+1\r\n'
        text+='需要消耗材料:'
        for (let i = 0; i < list.length; i++) {
            text += '#v' + list[i][0] + '#' + list[i][1] + '個\r\n'
        }
        let yn=npc.askYesNo(text)
        if (yn==0) {
            return
        }
        // 獲取強化材料
        for (let i = 0; i < materials.length; i++) {
            if (curLevel >= materials[i][0] && curLevel <= materials[i][1]) {
                // 獲取強化材料
                list = materials[i][2]
                // 獲取強化材料加成
                add = materials[i][3]
            }
        }
        // 判斷材料是否足夠(list,add)
        for (let i = 0; i < list.length; i++) {
            if (player.getAmountOfItem(list[i][0]) < list[i][1]) {
                npc.say("材料不足")
                return
            }
        }
        // 扣除材料
        for (let i = 0; i < list.length; i++) {
            player.loseItem(list[i][0], list[i][1])
        }
        // 強化
        equip.setDex((add));
        equip.setLuk((add));
        equip.setInt((add));
        equip.setStr((add));
        equip.setTitle(curLevel+"級")
        // 重載實例
        player.loseInvSlot(1, 1);  //使玩家玩家id窗口的number欄道具消失
        player.gainItem(equip)
    } else if (xuan == 2) {
        let text = '可強化圖騰\r\n'
        for (let i = 0; i < canUpIdg.length; i++) {
            text += '#v' + canUpIdg[i] + '# #z' + canUpIdg[i] + '\r\n'
        }
        npc.say(text)
    } else if (xuan == 3) {
        let text = '各階段所需材料及加成\r\n'
        for (let i = 0; i < materials.length; i++) {
            text += materials[i][0] + '級~' + materials[i][1] + '級所需材料:\r\n'
            for (let j = 0; j < materials[i][2].length; j++) {
                text += '#v' + materials[i][2][j][0] + '#' + materials[i][2][j][1] + '個\r\n'
            }
            text += '強化加成:四维+' + materials[i][3] + '\r\n\r\n'
        }
        npc.say(text)
    }
}
