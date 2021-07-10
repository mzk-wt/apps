let canvasUtils = {
    methods: {
        /**
         * 直線を描画
         * @param {CanvasRenderingContext2D} ctx 2Dレンダリングコンテキスト
         * @param {{x, y}} s 開始位置の座標
         * @param {{x, y}} e 終了位置の座標
         * @param {number} lw 線の太さ（デフォルト:1.0）
         */
        drawLine: function(ctx, s, e, c = '#000', lw = 1.0) {
            ctx.strokeStyle = c;
            ctx.lineWidth = lw;
            ctx.beginPath();
            ctx.moveTo(s.x, s.y);
            ctx.lineTo(e.x, e.y);
            ctx.stroke();
            ctx.closePath();
        },

        /**
         * 四角形を描画
         * @param {CanvasRenderingContext2D} ctx 2Dレンダリングコンテキスト
         * @param {{x, y}} lu 左上の座標
         * @param {{x, y}} rd 右下の座標
         * @param {*} c 塗り潰し色(color or gradient or pattern)
         * @param {number} lw 線の太さ（デフォルト:1.0）
         */
        drawRect: function(ctx, lu, rd, c ='#000', lw = 1.0) {
            ctx.strokeStyle = c;
            ctx.lineWidth = lw;
            ctx.beginPath();
            ctx.strokeRect(lu.x, lu.y, rd.x - lu.x, rd.y - lu.y);
            ctx.closePath();
        },

        /**
         * 四角形（塗り潰し）を描画 
         * @param {CanvasRenderingContext2D} ctx 2Dレンダリングコンテキスト
         * @param {{x, y}} lu 左上の座標
         * @param {{x, y}} rd 右下の座標
         * @param {*} c 塗り潰し色(color or gradient or pattern)
         */
        fillRect: function(ctx, lu, rd, c = '#000') {
            ctx.fillStyle = c;
            ctx.beginPath();
            ctx.fillRect(lu.x, lu.y, rd.x - lu.x, rd.y - lu.y);
            ctx.closePath();
        },

        /**
         * 角丸四角形を描画
         * @param {CanvasRenderingContext2D} ctx 2Dレンダリングコンテキスト
         * @param {{x, y}} lu 左上の座標
         * @param {{x, y}} rd 右下の座標
         * @param {number} r 角の丸み
         * @param {*} c 塗り潰し色(color or gradient or pattern)
         * @param {number} lw 線の太さ（デフォルト:1.0）
         */
        drawRoundedRect: function(ctx, lu, rd, r, c = '#000', lw = 1.0) {
            let x = lu.x;
            let y = lu.y;
            let w = rd.x - lu.x;
            let h = rd.y - lu.y;
            ctx.lineWidth = lw;
            ctx.strokeStyle = c;
            ctx.beginPath();
            ctx.moveTo(x, y + r);
            ctx.arc(x + r, y + h - r, r, Math.PI, Math.PI * 0.5, true);
            ctx.arc(x + w - r, y + h - r, r, Math.PI * 0.5, 0, 1);
            ctx.arc(x + w - r, y + r, r, 0, Math.PI * 1.5, 1);
            ctx.arc(x + r, y + r, r, Math.PI * 1.5, Math.PI, 1);
            ctx.closePath();
            ctx.stroke();
        },

        /**
         * テキストを描画
         * @param {CanvasRenderingContext2D} ctx 2Dレンダリングコンテキスト
         * @param {string} text 文字列 
         * @param {number} x
         * @param {number} y
         * @param {string} f フォント
         * @param {*} c 文字色(color or gradient or pattern)
         * @param {number} rotate 回転角
         */
        fillText: function(ctx, text, x, y, f = "18px serif", c = "#000", rotate = 0) {
            ctx.rotate(rotate);
            ctx.font = f;
            ctx.fillStyle = c;
            ctx.fillText(text, x, y);
            ctx.rotate(-rotate);
        },

        /**
         * 画像を描画
         * @param {CanvasRenderingContext2D} ctx 2Dレンダリングコンテキスト
         * @param {*} src 画像のパス
         * @param {*} x 
         * @param {*} y 
         * @param {*} w 
         * @param {*} h 
         * @param {number} rotate 回転角
         */
        drawImage: function(ctx, src, x, y, w, h, rotate = 0) {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                ctx.rotate(rotate);
                ctx.drawImage(img, x, y, w, h);
                ctx.rotate(-rotate);
            }
        },

        /**
         * ファイルアップロードされた画像を描画
         * @param {CanvasRenderingContext2D} ctx 2Dレンダリングコンテキスト
         * @param {*} data アップロードデータ 
         * @param {*} x 
         * @param {*} y 
         * @param {*} w 
         * @param {*} h 
         * @param {number} rotate 回転角
         */
        drawUploadImage: function(ctx, data, x, y, w, h, rotate = 0) {
            let reader = new FileReader();
            reader.onload = () => {
                let src = reader.result;
                this.drawImage(ctx, src, x, y, w, h, rotate);
            }
            reader.readAsDataURL(data);
        }
    }
}

Vue.mixin(canvasUtils);