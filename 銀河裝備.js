
load("./server/tool_zw")
let ids = [
    1342095,//銀河之刃
    1352009,//銀河之箭矢
    1352109,//銀河之卡片
    1352206,//銀河之吊墜
    1352216,//銀河之念珠
    1352226,//銀河之鎖鏈
    1352236,//銀河之赤銅之書
    1352246,//銀河之青銀之書
    1352256,//銀河之白金之書
    1352266,//銀河之風暴羽毛
    1352276,//銀河之扳指
    1352286,//銀河之劍鞘
    1352296,//銀河之靈符
    1352406,//銀河之魂珠
    1352506,//銀河之精髓
    1352606,//銀河之靈魂手鐲
    1352707,//銀河之麥林彈
    1352807,//銀河之小太刀
    1352815,//銀河之私語
    1352824,//銀河之宿命之拳
    1352906,//銀河之腕輪
    1352916,//銀河之鷹眼
    1352928,//銀河之火藥桶
    1352935,//銀河之天龍錘
    1352945,//銀河之龍神的遺産
    1352957,//銀河之極限球
    1352967,//銀河之狂野之矛
    1352975,//銀河之聖地之光
    1353006,//銀河之控製器
    1353105,//銀河之狐貍珠
    1353405,//銀河之爆破彈
    1353505,//銀河之不滅之翼
    1353606,//銀河之精氣球
    1353807,//銀河之扇墜
]
let initensify = [
    {
        name: "銀河裝備",   // 強化列名稱
        ids: ids,        //係列id數組
        demandItemIds: [[4031189], [4031189], [4031189], [4031189], [4031189]], //需求物品id數組
        multiplier: [[1], [5], [10], [15], [20]], //消耗數量數組
        coupon: [10000, 20000, 30000, 40000, 50000],  //點券數量
        maple: [0, 0, 0, 0, 0],  //楓幣
        initensifyCont: 50, //強化最大值
        addAttCont: 5,    //附加屬性
        initensifyRandom: [1, 1, 1, 1, 1], //強化機率
        stage: 10  //多少級為一個階段
    }
]

initensifyMain(initensify)