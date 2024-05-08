var jobData = [
    Array("琳恩", 17212, 0),
    Array("卡莉(4轉)", 15412, 0),
    Array("煉獄駭客4轉", 6312, 0),
    Array("影魂異人(4轉)", 15512, 0),
    Array("聖晶使徒(4轉)", 15212, 0),
    Array("魔鏈影士(4轉)", 6412, 0),
    Array("暗影雙刀", 434, 1),
    Array("神炮王", 532, 2),
    Array("英雄", 112, 0),
    Array("聖騎士", 122, 0),
    Array("黑騎士", 132, 0),
    Array("火毒魔導士", 212, 0),
    Array("冰雷魔導士", 222, 0),
    Array("主教", 232, 0),
    Array("神射手", 312, 0),
    Array("箭神", 322, 0),
    Array("隱士", 412, 0),
    Array("俠盜", 422, 0),
    Array("沖鋒隊長", 512, 0),
    Array("船長", 522, 0),
    /*騎士團聯盟------------------*/
    Array("魂騎士（四轉）", 1112, 0),
    Array("炎術士（四轉）", 1212, 0),
    Array("風靈使者（四轉）", 1312, 0),
    Array("夜行者（四轉）", 1412, 0),
    Array("奇襲者（四轉）", 1512, 0),
    /*騎士團聯盟-------------------*/

    Array("戰神（四轉）", 2112, 0),
    Array("雙弩精靈（四轉）", 2312, 0),
    Array("幻影（四轉）", 2412, 0),
    Array("夜光法師（四轉）", 2712, 0),
    /*惡魔聯盟--------------------------*/
    Array("惡魔獵手（四轉）", 3112, 0),
    Array("惡魔複仇者（四轉）", 3122, 0),
    /*惡魔聯盟--------------------------*/

    /*反抗者聯盟--------------------------*/
    Array("豹弩遊俠（四轉）", 3312, 0),
    Array("喚靈鬥師（四轉）", 3212, 0),
    Array("機械師（四轉）", 3512, 0),
    Array("爆破手（四轉）", 3712, 0),
    /*反抗者聯盟--------------------------*/

    /*尖兵聯盟--------------------------*/
    Array("尖兵（四轉）", 3612, 0),
    /*尖兵聯盟--------------------------*/

    /*米哈爾聯盟--------------------------*/
    Array("米哈爾（四轉）", 5112, 0),
    /*米哈爾聯盟--------------------------*/

    Array("狂龍戰士（四轉）", 6112, 0),
    Array("爆莉萌天使（四轉）", 6512, 0),
    Array("隱月（四轉）", 2512, 0),
    Array("劍豪（四轉）", 4112, 0),

    Array("陰陽師（四轉）", 4212, 1),
    Array("超能力者（四轉）", 14212, 1),
    Array("龍神（四轉）", 2217, 0),
    Array("古跡獵人（四轉）", 332, 3),
    Array("虎影(4轉)", 16412, 0),
    Array("禦劍(4轉)", 15112, 0),
    //Array("神之子", 10112, 0),

    Array("墨玄(4轉)", 17512, 0)
];
let item = [4310258, 10]//複古比
let mesoNum = 50 * 100000000//50e楓幣
let list = [
    [10, [[1112260, 1]]],
    [15, [[1112260, 2]]],
    [20, [[1112260, 3]]],
    [30, [[1112260, 4]]],
    [40, [[1112260, 5]]],
    [50, [[1112260, 6]]],
    [60, [[1112260, 7]]],
    [70, [[1112260, 8]]],
    [80, [[1112260, 9]]],
    [90, [[1112260, 10]]],
    [100, [[1112260, 11]]],
]
main()
function main() {
    if (player.isGm()) {
        for (let i = 0; i < 100; i++) {
            // player.gainExp(10000000000)
        }
    }
    let shux = {
        str: player.getStr(),
        dex: player.getDex(),
        int: player.getInt(),
        luk: player.getLuk(),
    }
    var text = "當角色達到250LV  可以進行一次轉生 消耗 10  復古幣 50E楓幣\r\n屬性+100並轉為指定職業 等級減至10LV：\r\n";
    text += "每當轉生達到一定次數可觸發特殊獎勵\r\n"
    text += "當前已經轉" + player.getEventValue('轉生次數') + "次\r\n"
    text += "#L0# 開始轉生\r\n"
    text += "#L1# 檢視獎勵\r\n"
    let sel = npc.askMenuS(text);

    if (sel == 0) {
        let sadsad = "請選擇職業\r\n"
        for (let i in jobData) {
            sadsad += "#L" + i + "#" + jobData[i][0] + "\r\n";
        }
        let seldsad = npc.askMenuS(sadsad);

        if (player.getLevel() < 250) {
            npc.say("達到250級才能進行轉生");
            return;
        }
        if (!player.hasMesos(mesoNum)) {
            npc.say("您的金幣不足!");
            return;
        }
        if (!player.hasItem(item[0], item[1])) {
            npc.say("您的複古幣不足!");
            return;
        }
        if (player.getEventValue('轉生次數') >= 100) {
            npc.say('轉生次數上限為100~')
            return
        }
        let jd
        for (i of list) {
            if (i[0] == player.getEventValue("轉生次數")) {
                jd = i
                break
            }
        }
        if (player.getJob() == jobData[seldsad][1]) {
            npc.say('不能選擇自己的職業~')
            return
        }

        player.setJob(jobData[seldsad][1]);
        player.resetHyperSkill();
        player.resetHyperStatSkill();
        player.resetSkills();
        player.maxSkills();
        player.resetVSkills();
        player.clearHexaSkills()
        player.maxSkills();
        player.getPlayer().resetStats((shux.str + 100), (shux.dex + 100), (shux.int + 100), (shux.luk + 100), false);
        player.addEventValue("轉生次數", 1, -1);
        player.loseItem(item[0], item[1])
        player.loseMesos(mesoNum);
        if (jd) {
            for (let i in jd[1]) {
                player.gainItem(jd[1][i][0], jd[1][i][1]);
            }
            npc.say("您已經轉生" + jd[0] + "次,特殊獎勵已發放至背包")
            return
        }
    } else if (sel == 1) {
        let say = "轉生階段獎勵:\r\n"
        for (item of list) {
            say += "\r\n" + item[0] + "次:\r\n"
            say += "\r\n"
            for (let i in item[1]) {
                say += "#v" + item[1][i][0] + "# *" + item[1][i][1] + "\t"
            }
        }
        let sel = npc.askMenuS(say);
        return
    }
}

