// Compiled by ClojureScript 0.0-2814 {}
goog.provide('adzerk.boot_reload');
goog.require('cljs.core');
goog.require('adzerk.boot_reload.client');
goog.require('html5game.app');
if(adzerk.boot_reload.client.alive_QMARK_.call(null)){
} else {
adzerk.boot_reload.client.connect.call(null,"ws://localhost:54535",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-jsload","on-jsload",-395756602),(function (){
return html5game.app.init.call(null);
})], null));
}

//# sourceMappingURL=boot_reload.js.map