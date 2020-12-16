const { ccclass, property } = cc._decorator;

@ccclass
export default class Helloworld extends cc.Component {

    @property(cc.Sprite)
    sp: cc.Sprite = null;

    @property(cc.SpriteFrame)
    spf: cc.SpriteFrame = null;

    startPoint: cc.Vec2;

    posArr: Array<any>;

    time: number = 0;

    material;

    flag: boolean = false;

    onLoad() {
        this.posArr = new Array<any>();
        // for(let i = 0; i < 20;i++){
        //     this.posArr.push(0.0);
        // }
        cc.dynamicAtlasManager.enabled = false;
        this.sp.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
        let x = Math.abs(this.sp.node.x);
        let y = Math.abs(this.sp.node.y);
        let startPoint = cc.v2(x, y);
        cc.log('startPoint->', startPoint.x, startPoint.y);
    }

    index = 0;
    touchEnd(event) {
        this.flag = true;
        let pos = event.getLocation();
        pos = this.sp.node.parent.convertToNodeSpaceAR(pos);
        // cc.log(pos.x,pos.y);
        cc.log("pos-->", pos.x, pos.y);
        let x = pos.x + this.sp.node.width / 2;
        let y = this.sp.node.height / 2 - pos.y;
        let dis = cc.v2(x / this.sp.node.width, y / this.sp.node.height);
        cc.log(dis.x, dis.y);

        this.material = this.sp.getMaterial(0);
        //   material.setProperty("pos", new cc.Vec2(0.1,0.1));
        let clickPos = new cc.Vec2(dis.x, dis.y);
        this.material.setProperty("centerPos", clickPos);
        this.material.setProperty("val", 0.1);
        // material.SetFloat("_Value" + i, value);

        // if (this.posArr[0]) {
        //     material.setProperty("pos2", this.posArr[0]);
        // }
        // if (this.posArr[1]) {
        //     material.setProperty("pos3", this.posArr[1]);
        // }
        // if (this.posArr[2]) {
        //     material.setProperty("pos4", this.posArr[2]);
        // }
        // if (this.posArr[3]) {
        //     material.setProperty("pos5", this.posArr[3]);
        // }
        // if (this.posArr[4]) {
        //     material.setProperty("pos6", this.posArr[4]);
        // }
        // if (this.posArr[5]) {
        //     material.setProperty("pos7", this.posArr[5]);
        // }
        // this.posArr.push(clickPos.x, clickPos.y);
        // this.posArr[this.index] = clickPos;
        // this.posArr.push(clickPos);
        // this.posArr[++this.index] = clickPos.y;

        // var typeArr = new Float32Array(this.posArr);
        // material.setProperty("posArr",typeArr);
        // ++this.index;
    }

    setMaterial() {
        for (let i = 0; i < 10; ++i) {
            // material.SetFloat(“_Value” + i, value);
        }
    }

    id = 0;
    update() {
        if(!this.flag) {
           return;
        }
        this.id++;
        if(this.id >= 30){
            this.flag = false;
        }
        //溶解速度
        this.time += 0.008;
        if(this.material){
            cc.log(this.time); 
            this.material.setProperty("time", this.time);
        }
    }
}
