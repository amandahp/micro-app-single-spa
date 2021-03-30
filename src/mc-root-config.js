
import { registerApplication, start } from "single-spa";

fetch('https://run.mocky.io/v3/b12693b5-2a6a-4321-b21c-668d04befd47')
  .then(resp => resp.json())
  .then(data => {
    console.log(data)
    data.applications.forEach(app => {
      registerApplication({
        name: app.name,
        app: () => System.import(app.package),
        activeWhen: app.exact
          ? (location) => location.pathname === app.activeWhen
          : [app.activeWhen]
      });
    })
  })
  .finally(() => {
    start({
      urlRerouteOnly: true,
    })
  })
