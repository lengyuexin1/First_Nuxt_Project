import ElementPlus from 'element-plus'
import { ID_INJECTION_KEY } from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

export default defineNuxtPlugin((nextApp) => {
    nextApp.vueApp.use(ElementPlus)
    nextApp.vueApp.provide(ID_INJECTION_KEY,{
        prefix: Math.floor(Math.random() * 10000),
        current: 0,
    })
    if (process.client) {
        const app = nextApp.vueApp
        app.provide(ID_INJECTION_KEY, {
                prefix: Math.floor(Math.random() * 10000),
                current: 0
            })
            .use(ElementPlus, {
                size: 'small',
            })

        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            if (key === 'Link') {
                continue
            }
            app.component(key, component)
        }
    }
})
