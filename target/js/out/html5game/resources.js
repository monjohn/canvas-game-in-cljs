// Compiled by ClojureScript 0.0-2814 {}
goog.provide('html5game.resources');
goog.require('cljs.core');
goog.require('clojure.browser.dom');
html5game.resources.cache = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
html5game.resources.loading = cljs.core.atom.call(null,cljs.core.PersistentVector.EMPTY);
html5game.resources.ready_callbacks = cljs.core.atom.call(null,cljs.core.PersistentVector.EMPTY);
html5game.resources.is_ready_QMARK_ = (function is_ready_QMARK_(){
return cljs.core.not_any_QMARK_.call(null,cljs.core.false_QMARK_,cljs.core.vals.call(null,cljs.core.deref.call(null,html5game.resources.cache)));
});
html5game.resources.on_ready = (function on_ready(f){
return cljs.core.swap_BANG_.call(null,html5game.resources.ready_callbacks,cljs.core.conj,f);
});
html5game.resources.on_image_load = (function on_image_load(url,img){
cljs.core.swap_BANG_.call(null,html5game.resources.cache,cljs.core.assoc,url,img);

if(html5game.resources.is_ready_QMARK_.call(null)){
var seq__16754 = cljs.core.seq.call(null,cljs.core.deref.call(null,html5game.resources.ready_callbacks));
var chunk__16755 = null;
var count__16756 = (0);
var i__16757 = (0);
while(true){
if((i__16757 < count__16756)){
var f = cljs.core._nth.call(null,chunk__16755,i__16757);
f.call(null);

var G__16758 = seq__16754;
var G__16759 = chunk__16755;
var G__16760 = count__16756;
var G__16761 = (i__16757 + (1));
seq__16754 = G__16758;
chunk__16755 = G__16759;
count__16756 = G__16760;
i__16757 = G__16761;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__16754);
if(temp__4425__auto__){
var seq__16754__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__16754__$1)){
var c__4551__auto__ = cljs.core.chunk_first.call(null,seq__16754__$1);
var G__16762 = cljs.core.chunk_rest.call(null,seq__16754__$1);
var G__16763 = c__4551__auto__;
var G__16764 = cljs.core.count.call(null,c__4551__auto__);
var G__16765 = (0);
seq__16754 = G__16762;
chunk__16755 = G__16763;
count__16756 = G__16764;
i__16757 = G__16765;
continue;
} else {
var f = cljs.core.first.call(null,seq__16754__$1);
f.call(null);

var G__16766 = cljs.core.next.call(null,seq__16754__$1);
var G__16767 = null;
var G__16768 = (0);
var G__16769 = (0);
seq__16754 = G__16766;
chunk__16755 = G__16767;
count__16756 = G__16768;
i__16757 = G__16769;
continue;
}
} else {
return null;
}
}
break;
}
} else {
return null;
}
});
html5game.resources.load_url = (function load_url(url){
if(cljs.core.truth_(cljs.core.get.call(null,cljs.core.deref.call(null,html5game.resources.cache),url))){
return cljs.core.get.call(null,cljs.core.deref.call(null,html5game.resources.cache),url);
} else {
var img = (new Image());
clojure.browser.dom.set_properties.call(null,img,new cljs.core.PersistentArrayMap(null, 1, ["onload",cljs.core.partial.call(null,html5game.resources.on_image_load,url,img)], null));

cljs.core.swap_BANG_.call(null,html5game.resources.cache,cljs.core.assoc,url,false);

return clojure.browser.dom.set_properties.call(null,img,new cljs.core.PersistentArrayMap(null, 1, ["src",url], null));
}
});
html5game.resources.load = (function load(x){
if(cljs.core.vector_QMARK_.call(null,x)){
return cljs.core.dorun.call(null,cljs.core.map.call(null,html5game.resources.load_url,x));
} else {
return html5game.resources.load_url.call(null,x);
}
});
html5game.resources.get_image = (function get_image(url){
return cljs.core.get.call(null,cljs.core.deref.call(null,html5game.resources.cache),url);
});

//# sourceMappingURL=resources.js.map