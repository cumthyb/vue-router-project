/**
 * mode
 * router-link
 * router-view
 * this.$router
 * this.$route
 * install
 */

class VueRouter {
  constructor(options) {
    this.mode = options.mode || 'hash'
    this.routes = options.routes || []
    this.routesMap = this.createMap(this.routes)
    this.history = new History()

    this.init()
  }

  createMap(routes) {
    return routes.reduce((acc, item) => {
      acc[item.path] = item.component
      return acc
    }, {})
  }

  init() {
    // 当前mode
    if (this.mode === 'hash') {
      // 先判断当前location有没有hash
      location.hash ? '' : location.hash = '/'
      window.addEventListener('load', () => {
        this.history.current = location.hash.slice(1)
      })
      window.addEventListener('hashchange', () => {
        this.history.current = location.hash.slice(1)
      })
    } else {
      location.pathname ? "" : location.pathname = '/'
      window.addEventListener('load', () => {
        this.history.current = location.pathname
      })
      window.addEventListener('popstate', () => {
        this.history.current = location.pathname
      })
    }
  }

  go() {

  }

  push() {

  }

  back() {

  }

  static install(_Vue) {
    _Vue.mixin({
      beforeCreate() {
        // root组件
        if (this.$options && this.$options.router) {
          this._router = this.$options.router
          // 深度监控history，包括current，当current变化时会触发更新
          _Vue.util.defineReactive(this, 'current', this._router.history)
        } else {
          this._router = this.$parent && this.$parent._router
        }

        Object.defineProperty(this, '$router', {
          get() {
            return this._router
          }
        })
        Object.defineProperty(this, '$route', {
          get() {
            return this._router.history.current
          }
        })
      },
    })

    _Vue.component('router-link', {
      props: {
        to: String
      },
      render(h) {
        let mode = this._self._router.mode
        return <a href={mode === 'hash' ? `#${this.to}` : this.to}>{this.$slots.default}</a>
      },
    })

    // 更具当前current和路由表 
    _Vue.component('router-view', {
      render(h) {
        let current = this._self._router.history.current
        let routesMap = this._self._router.routesMap
        return h(routesMap[current])
      },
    })
  }
}

VueRouter.createMap = (routes) => {
  return routes.reduce((acc, item) => {
    acc[item.path] = item.component
    return acc
  }, {})
}


class History {
  constructor() {
    this.current = null
  }
}


export default VueRouter