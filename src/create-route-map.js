import { cleanPath } from './util/path'

export function createRouteMap (routes) {
  const pathMap = Object.create(null)
  const nameMap = Object.create(null)

  routes.forEach(route => {
    addRoute(pathMap, nameMap, route)
  })

  return {
    pathMap,
    nameMap
  }
}

function addRoute (pathMap, nameMap, route, parent) {
  const { path, name } = route

  if (path == null) {
    throw new Error('[vue-router] "path" is required in a route configuration.')
  }

  const record = {
    path: normalizePath(path, parent),
    components: route.components || { default: route.component },
    instances: {},
    name,
    parent,
    alias: route.alias,
    redirect: route.redirect,
    canActivate: route.canActivate,
    canDeactivate: route.canDeactivate
  }

  if (route.children) {
    route.children.forEach(child => {
      addRoute(pathMap, nameMap, child, record)
    })
  }

  pathMap[record.path] = record
  if (name) nameMap[name] = record
}

function normalizePath (path, parent) {
  if (path[0] === '/') return path  // "/" signifies an absolute route
  if (parent == null) return path  // no need for a join
  return cleanPath(`${parent.path}/${path}`) // join
}
