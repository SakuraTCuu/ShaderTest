const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Sprite)
    sp: cc.Sprite = null;
    @property(cc.SpriteFrame)
    spf: cc.SpriteFrame = null;

    @property(cc.Sprite)
    bg: cc.Sprite = null;

    @property(cc.Sprite)
    showNode: cc.Sprite = null;


    onLoad() {
        cc.dynamicAtlasManager.enabled = false;
        this.sp.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
        let x = Math.abs(this.sp.node.x);
        let y = Math.abs(this.sp.node.y);
        let startPoint = cc.v2(x, y);
        cc.log('startPoint->', startPoint.x, startPoint.y);
        // this.showNode.spriteFrame = this.spf;
        this.bg.spriteFrame.setOriginalSize(new cc.Size(960, 640));


        let w = this.bg.node.width;
        let h = this.bg.node.height;
        cc.log(w, h);

    }

    touchEnd(event) {
        let w = this.bg.node.width;
        let h = this.bg.node.height;

        this.showNode.node.height = this.showNode.node.width / (w / h);

        this.showNode.spriteFrame = null;
        let pos = event.getLocation();
        pos = this.sp.node.parent.convertToNodeSpaceAR(pos);
        cc.log("pos-->", pos.x, pos.y);
        let texture = this.bg.spriteFrame.getTexture();

        let disx = pos.x + w / 2;
        let disy = h / 2 - pos.y;
        let scaleX = disx / w;
        let scaleY = disy / h;
        cc.log(scaleX, scaleY);
        let rate = w / h;
        let rateW = w / texture.width;
        let rateH = h / texture.height;
        let tempx = texture.width * scaleX;
        let tempy = texture.height * scaleY;
        let rectW = 500 / w * texture.width;
        let rectH = 500 / h * texture.height;
        let rect = new cc.Rect(tempx, tempx, rectW, rectH);
        // this.bg.spriteFrame.setRect(rect);
        // this.showNode.spriteFrame.setRect(rect);
        let spframe = this.bg.spriteFrame;

        let flag = spframe.setTexture(texture, rect);
        this.showNode.spriteFrame = spframe;
        // let flag = this.showNode.spriteFrame.setTexture(texture,rect);
        cc.log(flag);
        // let x = pos.x + this.sp.node.width / 2;
        // let y = this.sp.node.height / 2 - pos.y;
        // let dis = cc.v2(x / this.sp.node.width, y / this.sp.node.height);
        // cc.log(dis.x, dis.y);
    }
}
