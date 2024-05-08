let maxPlayers = 6
let minPlayers = 1
let event = 'level_oldTime'
let callCont=2
let onlyOne = true
let minLevel=270 
let limitBreak=5000000000
main()
function main() {
    let say = "#k#n是否前往夢回舊時代？\r\n"
    say += "#L0##b申請進入：夢回舊時代（跑環)#l\r\n"
    let sel = npc.askMenuA(say, true);
    if (sel != 0) return


    //队伍               //当前不是队长
    if (party == null || player.getId() != party.getLeader()) {
        npc.sayNextE("你需要有一個#r" + minPlayers + "~" + "#k人的隊伍.\r\n那麼請讓你的組隊長和我對話吧!", true);
        return
    }
    //判断队伍人数数量是否在范围类
    if (party.numberOfMembersInChannel() < minPlayers || party.getMembersCount(map.getId(), 1, 300) > maxPlayers) {
        npc.sayNextE("你需要有一個#r" + minPlayers + "~" + maxPlayers + "#k人的隊伍且都在270級以上.!", true);
        return
    }
    //判断队伍是否在都在
    if (party.getMembersCount(map.getId(), 1, 300) < party.getMembersCount()) {
        npc.say("好像有隊員在其他地方，請把隊員都召集到這裡！", true);
        return
    }


    let members = party.getLocalMembers();
    for(let  member of members){
        if (member.getEventValue('randomByDay') >= callCont) {
            npc.sayNext("隊伍中有人已經挑戰上限了");
            return
        }
         
        if(member.getLevel()<minLevel) {
            npc.sayNext("隊伍中有人不滿270級");
            return
        }

        var toDrop = member.getInventorySlot(-1, -0xB);
        if(toDrop.getLimitBreak()< limitBreak) {
            npc.sayNext("隊伍中有人 武器破功還沒達到50E，請先使用金幣破功");
            return
        }
    }


    // let event = npc.getEvent("level_oldTime");
    // if (event) {
    //     event.destroyEvent();
    //     npc.say("清理完畢");
    // }
    //开始进入地图
    if (npc.makeEvent('level_oldTime', onlyOne, [party]) == null) {
        npc.sayNextE("已經有隊伍在進行了,請更換其他頻道嘗試。", true);
    }
}