const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Mask)
    ImageMask: cc.Mask = null;

    clickId: number = 0;
    clickPos: cc.Vec2;

    arr:Array<any>;

    onLoad() {
        this.arr = new Array<any>();
        // this.initView();
        // this.initEvent();
        // this.testMask();
        // this.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
    }

    touchEnd(event) {
        this.clickId++;
        // this.clickId = 1;

        let worldPos = event.getLocation();
        let localPos = this.node.convertToNodeSpaceAR(worldPos);
        this.clickPos = localPos;
        this.test();
    }

    test(){
        switch (this.clickId) {
            case 1:
                this.testMask();
                break;
            case 2:
                this.testMask2();
                break;
            case 3:
                this.testMask3();
                break;
            default: 
                this.testMask3();
        }
    }

    testMask() {
        let mask = this.ImageMask;
        mask.inverted = true;
        let x = this.clickPos.x;
        let y = this.clickPos.y;
        let w = 150/2;
        let h = 150/2;
        mask._updateGraphics = () => {
            let graphics = mask._graphics;
            graphics.clear(false);
            // 第一块
            graphics.moveTo(x-w, y-h);
            graphics.lineTo(x, y + h/2);
            graphics.lineTo(x, y+h);
            // graphics.lineTo(x-10, y+h/2 -10);
            graphics.lineTo(x-w, y-h);

            // 第二块
            graphics.moveTo(x-w/2, y+h/2);
            graphics.lineTo(x, y);
            graphics.lineTo(x-5, y-50);
            graphics.lineTo(x+w, y-h);

            // // 第二块
            graphics.moveTo(x, y-20);
            graphics.lineTo(x+w/2, y-h/2);
            graphics.lineTo(x+20, y-h);
            graphics.lineTo(x, y-h);

            // // 第二块
            // graphics.moveTo(250, 0);
            // graphics.lineTo(100, 140);
            // graphics.lineTo(250, -18);
            // graphics.lineTo(250, 0);

            // graphics.moveTo(-224, 173);
            // graphics.lineTo(-240, 163);
            // graphics.lineTo(-82, -47);
            // graphics.lineTo(-77, -40);
            this.drawOld2(graphics);
            graphics.fill();
        }
        mask._updateGraphics();
    }
    testMask2() {
        let mask = this.ImageMask;
        mask.inverted = true;
        mask._updateGraphics = () => {
            let graphics = mask._graphics;
            graphics.clear(false);
            // 第一块
            graphics.moveTo(-200, -250);
            graphics.lineTo(-162, -158);
            graphics.lineTo(138, 257);
            graphics.lineTo(-144, -176);
            graphics.lineTo(-200, -250);

            // 第二块
            graphics.moveTo(-70, -250);
            graphics.lineTo(42, -14);
            graphics.lineTo(-25, -252);
            graphics.lineTo(-70, -250);

            // 第二块
            graphics.moveTo(0, -250);
            graphics.lineTo(250, -47);
            graphics.lineTo(35, -250);
            graphics.lineTo(0, -250);

            // 第二块
            graphics.moveTo(250, 0);
            graphics.lineTo(100, 140);
            graphics.lineTo(250, -18);
            graphics.lineTo(250, 0);

            graphics.moveTo(-224, 173);
            graphics.lineTo(-240, 163);
            graphics.lineTo(-82, -47);
            graphics.lineTo(-77, -40);

            this.drawOld2(graphics);

            graphics.fill();
        }
        mask._updateGraphics();
        // this.drawOld();
    }
    testMask3() {
        let mask = this.ImageMask;
        mask.inverted = true;
        let x = this.clickPos.x;
        let y = this.clickPos.y;
        let w = 150/2;
        let h = 150/2;
        this.arr.push({x,y});

        mask._updateGraphics = () => {
            let graphics = mask._graphics;
            graphics.clear(false);

            graphics.moveTo(x-w, y-h);
            graphics.lineTo(x-w, y+h);
            graphics.lineTo(x+w, y+h);
            graphics.lineTo(x+w, y-h);
            graphics.lineTo(x-w, y-h);

            this.drawOld2(graphics);

            graphics.fill();
        }
        mask._updateGraphics();
        // this.drawOld();
        this.clickId = 0;
    }

    drawOld() {
        let mask = this.ImageMask;
        mask.inverted = true;
        let w = 150/2;
        let h = 150/2;
        //this.arr.push({x,y});

        mask._updateGraphics = () => {
            let graphics = mask._graphics;
            graphics.clear(false);

            for(let i =0; i < this.arr.length;i++){
                let x = this.arr[i].x;
                let y = this.arr[i].y;
                graphics.moveTo(x-w, y-h);
                graphics.lineTo(x-w, y+h);
                graphics.lineTo(x+w, y+h);
                graphics.lineTo(x+w, y-h);
                graphics.lineTo(x-w, y-h);
                graphics.fill();
            }
            // graphics.fill();
        }
        mask._updateGraphics();
        this.clickId = 0;
    }

    drawOld2(graphics) {
        let w = 150/2;
        let h = 150/2;
        for(let i =0; i < this.arr.length;i++){
            let x = this.arr[i].x;
            let y = this.arr[i].y;
            graphics.moveTo(x-w, y-h);
            graphics.lineTo(x-w, y+h);
            graphics.lineTo(x+w, y+h);
            graphics.lineTo(x+w, y-h);
            graphics.lineTo(x-w, y-h);
            // graphics.fill();
        }
    }
}
