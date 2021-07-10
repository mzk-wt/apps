/**
 * カラーピッカーコンポーネント
 * ----
 *  Depends on vue-js-modal and vue-color. 
 *  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/vue-js-modal@1.3.31/dist/styles.css">
 *  <script src="https://cdn.jsdelivr.net/npm/vue-js-modal@1.3.31/dist/index.min.js"></script>
 *  <script src="https://cdn.jsdelivr.net/npm/vue-color@2.7.0/dist/vue-color.min.js"></script>
 * ----
 */
const VueColor = window.VueColor,
Chrome = VueColor.Chrome;

const VModal = window["vue-js-modal"].default
Vue.use(VModal);

Vue.component('color-picker', {
    template: `
        <div>
            <button @click="show" class="btn btn-secondary rounded-circle p-0"
                    style="width:1.5rem; height:1.5rem;"
                    :style="{backgroundColor: value}">
                &nbsp;
            </button>
            <modal :name="modalname">
                <chrome-picker v-model="colors"></chrome-picker>
                <button @click="ok">OK</button>
                <button @click="cancel">キャンセル</button> 
            </modal>
        </div>
    `,
    props: ['value', 'name'],
    components: {
        'chrome-picker': Chrome
    },
    data() {
        return {
            colors: {
                hex: this.value,
                a: 1
            }
        }
    },
    computed: {
        modalname: function () {
            return "color-picker-modal-" + this.name;
        }
    },
    methods: {
        show: function () {
            this.$modal.show(this.modalname);
        },
        ok: function () {
            this.$emit('input', this.colors.hex);
            this.$modal.hide(this.modalname);
        },
        cancel: function () {
            this.$set(this.colors, 'hex', this.value);
            this.$modal.hide(this.modalname);
        }
    }
});