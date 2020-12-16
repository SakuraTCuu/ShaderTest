const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Sprite)
    bgSprite: cc.Sprite = null;
    @property(cc.Sprite)
    frontSprite: cc.Sprite = null;

    @property(cc.Node)
    maskNode: cc.Node = null;

    onLoad () {
        this.frontSprite.node.on(cc.Node.EventType.TOUCH_END,this.onTouchEnd,this);
    }

    onTouchEnd(event) {
       //cc.log(event.getLocation());
       let pos = event.getLocation();
       let localPos = this.node.convertToNodeSpaceAR(pos);
       cc.log(localPos);
       //截图

       this.setMask(localPos);
    }

    setMask(localPos) {
       this.maskNode.active = true;
       this.maskNode.position = localPos;
    }

    start () {

    }

     /**
     * @title 将节点内容导出为图片
     * @param {cc.Node} node
     */
    captureNode2Base64 (node) {
        // 初始化渲染纹理
        let width = node.width;
        let height = node.height;
        let w_h = width / height;
        let vw_vh = cc.visibleRect.width / cc.visibleRect.height;
        let _texture = new cc.RenderTexture();
        _texture.initWithSize(width, height, cc.gfx.RB_FMT_S8);

        // 获取canvas画布
        let _canvas = document.getElementById('capture_canvas');
        if (!_canvas) {
            _canvas = document.createElement('canvas');
            _canvas.setAttribute('id', 'capture_canvas');
        }
        _canvas.width = width;
        _canvas.height = height;
        let _ctx = _canvas.getContext('2d');

        // 克隆需要渲染的节点
        let _content = cc.instantiate(node);
        _content.parent = cc.Canvas.instance.node;
        _content.position = cc.v3(0, 0, 0);
        _content.scale = w_h > vw_vh ? (cc.visibleRect.width / width) + 0.02 : (cc.visibleRect.height / height) + 0.02;
        let _camera = _content.addComponent(cc.Camera);
        _camera.alignWithScreen = true;
        _camera.clearFlags = 7;
        _camera.targetTexture = _texture;
        _camera.render(_content);

        // 渲染图片到canvas
        let data = _texture.readPixels();
        let rowBytes = width * 4;
        for (let row = 0; row < height; row++) {
            let srow = height - 1 - row;
            let imageData = _ctx.createImageData(width, 1);
            let start = srow * width * 4;
            for (let i = 0; i < rowBytes; i++) {
                imageData.data[i] = data[start + i];
            }
            _ctx.putImageData(imageData, 0, row);
        }

        // 销毁临时节点
        _content.destroy();
        _texture.destroy();
        return _canvas.toDataURL("image/png");
    }

    // update (dt) {}
}
