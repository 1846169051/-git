load("./server/tool_zw")
//神秘  
var sm = [
    1292016, 1213016, 1592018, 1262016, 1212063, 1272015, 1282015, 1222058,1232057, 1242060, 1242061, 1302275, 1312153, 1322203, 1332225, 1342082,
    1362090, 1372177, 1382208, 1402196, 1412135, 1422140, 1432167, 1442223,1452205, 1462193, 1472214, 1482168, 1492179, 1522094, 1532098, 1252015,
    1542063, 1552063, 1552063, 1582016, 1132174, 1132175, 1132176, 1132177,1132178, 1102481, 1102482, 1102483, 1102484, 1102485, 1082543, 1082544,
    1082545, 1082546, 1082547, 1072743, 1072744, 1072745, 1072746, 1072747,
]
//創世
var cs = [
    1332289, 1472275, 1362149, 1272040, 1242139, 1312213, 1412189, 1302355,1402268, 1322264, 1422197, 1442285, 1432227, 1582044, 1542128, 1232122,
    1462252, 1522152, 1452266, 1592022, 1482232, 1492245, 1532157, 1222122,1382274, 1372237, 1212129, 1282040, 1262051, 1552130, 1252106, 1292022,
    1213022, 1403022, 1214022,
]
/**
 * 强化数组
 * @type {{name: string , ids: number[], demandItemIds: number[], itemCont: number[], coupon: number, maple: number, initensifyCont: number, addAttCont: number, initensifyRandom: number[], retro: number}[]}
 */
let initensify = [
    {
        name: "神秘",   // 强化列名称
        ids: sm,        //系列id数组
        demandItemIds: [[4009507, 4310258], [4009507, 4310258], [4009507, 4310258]], //需求物品id数组
        multiplier: [[5, 1], [5, 1], [5, 1]],
        coupon: [200000, 200000, 200000],  //点券数量
        maple: [100000, 100000, 100000],  //枫币
        initensifyCont: 30, //强化最大值
        addAttCont: 10,    //附加属性
        initensifyRandom: [1, 0.7, 0.5], //强化概率
        stage: 10
    },
    {

        name: "創世",
        ids: cs,
        demandItemIds: [[4020010, 4020011, 4020012]],
        multiplier: [[5, 5, 5]],
        coupon: [200000, 200000, 200000],
        maple: [0, 0, 0],
        addAttCont: 30,
        initensifyCont: 50,
        initensifyRandom: [0.9, 0.6, 0.3],
        stage: 10
    }
]

transferInfo = [
    {
        name: "神秘",
        ids: sm,
        depleteItemIds: [4036309],
        itemCont: [1],
        coupon: 200000,
        maple: 0,
        maxLv: 30,
    },
    {
        name: "創世",
        ids: cs,
        depleteItemIds: [4036309],
        itemCont: [1],
        coupon: 200000,
        maple: 0,
        maxLv: 50
    }
]
main()
function main() {
    var sel = "\t#e裝備強化_轉移#k#n\r\n"
    sel += ""
    sel += "可以把裝備欄位第一格的裝備的屬性轉移到裝備欄位第二格。轉移後，被轉移的道具將會被刪除。\r\n"
    sel += "#b#L0#裝備強化\r\n"
    sel += "#b#L1#裝備轉移\r\n"
    let str = npc.askMenu(sel);
    if (str == "0") {
        initensifyMain(initensify)
    } else if (str == "1") {
        transfer(transferInfo)
    }
}