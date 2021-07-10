/**
 * ファイル選択コンポーネント
 */ 
Vue.component('input-file', {
    template: `
        <div><input ref="file" class="file-button" type="file" @change="upload" /></div>
    `,
    data() {
        return {
            file: null
        }
    },
    methods: {
        async upload(event) {
            const files = event.target.files || event.dataTransfer.files
            const file = files[0]

            if (this.checkFile(file)) {
                const picture = await this.getBase64(file)
                this.$emit('input', picture)
            }
        },
        getBase64(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload = () => resolve(reader.result)
                reader.onerror = error => reject(error)
            })
        },
        checkFile(file) {
            let result = true
            const SIZE_LIMIT = 5000000 // 5MB
            // キャンセルしたら処理中断
            if (!file) {
                result = false
            }
            // jpeg か png 関連ファイル以外は受付けない
            if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
                result = false
            }
            // 上限サイズより大きければ受付けない
            if (file.size > SIZE_LIMIT) {
                result = false
            }
            return result
        }
    }
});