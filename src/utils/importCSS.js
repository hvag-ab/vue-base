import Vue from 'vue'

Vue.component('remote-res', {
    data() {
        return {
            loaded: false
        };
    },
    render(createElement) {
        let scs = [];
        if (this.css) {
            for (let i = 0; i < this.css.length; i++) {
                let pps = {
                    attrs: {
                        rel: 'stylesheet',
                        href: this.css[i]
                    }
                };
                scs.push(createElement('link', pps));
            }
        }
        if (this.scripts) {
            for (let i = 0; i < this.scripts.length; i++) {
                let pps = {
                    attrs: {
                        type: 'text/javascript',
                        src: this.scripts[i]
                    }
                };
                if (i === this.scripts.length - 1) {
                    pps.on = {
                        load: () => {
                            this.$emit("loaded");
                        }
                    };
                }
                scs.push(createElement('script', pps));
            }
        } 
        return createElement('div', scs);
    },
    props: {
        scripts: {
            type: Array
        },
        css: {
            type: Array
        },
    },
})

/*
// 引入
import '@/utils/importCSS.js'
// 使用
<remote-res
    :css="['https://g.alicdn.com/de/prismplayer/2.8.2/skins/default/aliplayer-min.css']"
    :scripts="['https://g.alicdn.com/de/prismplayer/2.8.2/aliplayer-h5-min.js']"
    ></remote-res>

*/