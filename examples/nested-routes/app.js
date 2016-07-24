import Vue from 'vue/dist/vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// A route component can also contain <router-view> to render
// nested children route components
const Parent = {
  template: `
    <div>
      <h1>Parent</h1>
      <router-view></router-view>
    </div>
  `
}

const ParentDefault = { template: '<div>default</div>' }
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', redirect: '/parent' },
    { path: '/parent', component: Parent, children: [
      // an empty path or "/" will be treated as the default, e.g.
      // components rendered at /parent: Root -> Parent -> Default
      { path: '/', component: ParentDefault },
      // components rendered at /parent/foo: Root -> Parent -> Foo
      { path: '/foo', component: Foo },
      // components rendered at /parent/bar: Root -> Parent -> Bar
      { path: '/bar', component: Bar }
    ]}
  ]
})

const app = new Vue({
  router,
  template: `
    <div id="app">
      <ul>
        <li><router-link to="/parent">/parent</router-link></li>
        <li><router-link to="/parent/foo">/parent/foo</router-link></li>
        <li><router-link to="/parent/bar">/parent/bar</router-link></li>
      </ul>
      <router-view class="view"></router-view>
    </div>
  `
}).$mount('#app')
