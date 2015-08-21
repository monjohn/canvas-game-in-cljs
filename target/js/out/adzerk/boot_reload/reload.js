// Compiled by ClojureScript 0.0-2814 {}
goog.provide('adzerk.boot_reload.reload');
goog.require('cljs.core');
goog.require('clojure.string');
goog.require('goog.Uri');
goog.require('goog.async.DeferredList');
goog.require('goog.net.jsloader');
adzerk.boot_reload.reload.page_uri = (new goog.Uri(window.location.href));
adzerk.boot_reload.reload.ends_with_QMARK_ = (function ends_with_QMARK_(s,pat){
return cljs.core._EQ_.call(null,pat,cljs.core.subs.call(null,s,(cljs.core.count.call(null,s) - cljs.core.count.call(null,pat))));
});
adzerk.boot_reload.reload.reload_page_BANG_ = (function reload_page_BANG_(){
return window.location.reload();
});
adzerk.boot_reload.reload.changed_href_QMARK_ = (function changed_href_QMARK_(href_or_uri,changed){
if(cljs.core.truth_(href_or_uri)){
var uri = (new goog.Uri(href_or_uri));
var path = adzerk.boot_reload.reload.page_uri.resolve(uri).getPath();
if(cljs.core.truth_(cljs.core.not_empty.call(null,cljs.core.filter.call(null,((function (uri,path){
return (function (p1__10281_SHARP_){
return adzerk.boot_reload.reload.ends_with_QMARK_.call(null,p1__10281_SHARP_,path);
});})(uri,path))
,changed)))){
return uri;
} else {
return null;
}
} else {
return null;
}
});
adzerk.boot_reload.reload.reload_css = (function reload_css(changed){
var sheets = document.styleSheets;
var seq__10286 = cljs.core.seq.call(null,cljs.core.range.call(null,(0),sheets.length));
var chunk__10287 = null;
var count__10288 = (0);
var i__10289 = (0);
while(true){
if((i__10289 < count__10288)){
var s = cljs.core._nth.call(null,chunk__10287,i__10289);
var temp__4425__auto___10290 = (sheets[s]);
if(cljs.core.truth_(temp__4425__auto___10290)){
var sheet_10291 = temp__4425__auto___10290;
var temp__4425__auto___10292__$1 = adzerk.boot_reload.reload.changed_href_QMARK_.call(null,sheet_10291.href,changed);
if(cljs.core.truth_(temp__4425__auto___10292__$1)){
var href_uri_10293 = temp__4425__auto___10292__$1;
sheet_10291.ownerNode.href = href_uri_10293.makeUnique().toString();
} else {
}
} else {
}

var G__10294 = seq__10286;
var G__10295 = chunk__10287;
var G__10296 = count__10288;
var G__10297 = (i__10289 + (1));
seq__10286 = G__10294;
chunk__10287 = G__10295;
count__10288 = G__10296;
i__10289 = G__10297;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__10286);
if(temp__4425__auto__){
var seq__10286__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__10286__$1)){
var c__4551__auto__ = cljs.core.chunk_first.call(null,seq__10286__$1);
var G__10298 = cljs.core.chunk_rest.call(null,seq__10286__$1);
var G__10299 = c__4551__auto__;
var G__10300 = cljs.core.count.call(null,c__4551__auto__);
var G__10301 = (0);
seq__10286 = G__10298;
chunk__10287 = G__10299;
count__10288 = G__10300;
i__10289 = G__10301;
continue;
} else {
var s = cljs.core.first.call(null,seq__10286__$1);
var temp__4425__auto___10302__$1 = (sheets[s]);
if(cljs.core.truth_(temp__4425__auto___10302__$1)){
var sheet_10303 = temp__4425__auto___10302__$1;
var temp__4425__auto___10304__$2 = adzerk.boot_reload.reload.changed_href_QMARK_.call(null,sheet_10303.href,changed);
if(cljs.core.truth_(temp__4425__auto___10304__$2)){
var href_uri_10305 = temp__4425__auto___10304__$2;
sheet_10303.ownerNode.href = href_uri_10305.makeUnique().toString();
} else {
}
} else {
}

var G__10306 = cljs.core.next.call(null,seq__10286__$1);
var G__10307 = null;
var G__10308 = (0);
var G__10309 = (0);
seq__10286 = G__10306;
chunk__10287 = G__10307;
count__10288 = G__10308;
i__10289 = G__10309;
continue;
}
} else {
return null;
}
}
break;
}
});
adzerk.boot_reload.reload.reload_img = (function reload_img(changed){
var images = document.images;
var seq__10314 = cljs.core.seq.call(null,cljs.core.range.call(null,(0),images.length));
var chunk__10315 = null;
var count__10316 = (0);
var i__10317 = (0);
while(true){
if((i__10317 < count__10316)){
var s = cljs.core._nth.call(null,chunk__10315,i__10317);
var temp__4425__auto___10318 = (images[s]);
if(cljs.core.truth_(temp__4425__auto___10318)){
var image_10319 = temp__4425__auto___10318;
var temp__4425__auto___10320__$1 = adzerk.boot_reload.reload.changed_href_QMARK_.call(null,image_10319.src,changed);
if(cljs.core.truth_(temp__4425__auto___10320__$1)){
var href_uri_10321 = temp__4425__auto___10320__$1;
image_10319.src = href_uri_10321.makeUnique().toString();
} else {
}
} else {
}

var G__10322 = seq__10314;
var G__10323 = chunk__10315;
var G__10324 = count__10316;
var G__10325 = (i__10317 + (1));
seq__10314 = G__10322;
chunk__10315 = G__10323;
count__10316 = G__10324;
i__10317 = G__10325;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__10314);
if(temp__4425__auto__){
var seq__10314__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__10314__$1)){
var c__4551__auto__ = cljs.core.chunk_first.call(null,seq__10314__$1);
var G__10326 = cljs.core.chunk_rest.call(null,seq__10314__$1);
var G__10327 = c__4551__auto__;
var G__10328 = cljs.core.count.call(null,c__4551__auto__);
var G__10329 = (0);
seq__10314 = G__10326;
chunk__10315 = G__10327;
count__10316 = G__10328;
i__10317 = G__10329;
continue;
} else {
var s = cljs.core.first.call(null,seq__10314__$1);
var temp__4425__auto___10330__$1 = (images[s]);
if(cljs.core.truth_(temp__4425__auto___10330__$1)){
var image_10331 = temp__4425__auto___10330__$1;
var temp__4425__auto___10332__$2 = adzerk.boot_reload.reload.changed_href_QMARK_.call(null,image_10331.src,changed);
if(cljs.core.truth_(temp__4425__auto___10332__$2)){
var href_uri_10333 = temp__4425__auto___10332__$2;
image_10331.src = href_uri_10333.makeUnique().toString();
} else {
}
} else {
}

var G__10334 = cljs.core.next.call(null,seq__10314__$1);
var G__10335 = null;
var G__10336 = (0);
var G__10337 = (0);
seq__10314 = G__10334;
chunk__10315 = G__10335;
count__10316 = G__10336;
i__10317 = G__10337;
continue;
}
} else {
return null;
}
}
break;
}
});
adzerk.boot_reload.reload.reload_js = (function reload_js(changed,p__10340){
var map__10342 = p__10340;
var map__10342__$1 = ((cljs.core.seq_QMARK_.call(null,map__10342))?cljs.core.apply.call(null,cljs.core.hash_map,map__10342):map__10342);
var on_jsload = cljs.core.get.call(null,map__10342__$1,new cljs.core.Keyword(null,"on-jsload","on-jsload",-395756602),cljs.core.identity);
var js_files = cljs.core.filter.call(null,((function (map__10342,map__10342__$1,on_jsload){
return (function (p1__10338_SHARP_){
return adzerk.boot_reload.reload.ends_with_QMARK_.call(null,p1__10338_SHARP_,".js");
});})(map__10342,map__10342__$1,on_jsload))
,changed);
if(cljs.core.seq.call(null,js_files)){
goog.async.DeferredList.gatherResults(cljs.core.clj__GT_js.call(null,cljs.core.map.call(null,((function (js_files,map__10342,map__10342__$1,on_jsload){
return (function (p1__10339_SHARP_){
return goog.net.jsloader.load(goog.Uri.parse(p1__10339_SHARP_).makeUnique());
});})(js_files,map__10342,map__10342__$1,on_jsload))
,js_files))).addCallbacks(((function (js_files,map__10342,map__10342__$1,on_jsload){
return (function() { 
var G__10343__delegate = function (_){
return on_jsload.call(null);
};
var G__10343 = function (var_args){
var _ = null;
if (arguments.length > 0) {
var G__10344__i = 0, G__10344__a = new Array(arguments.length -  0);
while (G__10344__i < G__10344__a.length) {G__10344__a[G__10344__i] = arguments[G__10344__i + 0]; ++G__10344__i;}
  _ = new cljs.core.IndexedSeq(G__10344__a,0);
} 
return G__10343__delegate.call(this,_);};
G__10343.cljs$lang$maxFixedArity = 0;
G__10343.cljs$lang$applyTo = (function (arglist__10345){
var _ = cljs.core.seq(arglist__10345);
return G__10343__delegate(_);
});
G__10343.cljs$core$IFn$_invoke$arity$variadic = G__10343__delegate;
return G__10343;
})()
;})(js_files,map__10342,map__10342__$1,on_jsload))
,((function (js_files,map__10342,map__10342__$1,on_jsload){
return (function (e){
return console.error("Load failed:",e.message);
});})(js_files,map__10342,map__10342__$1,on_jsload))
);

if(cljs.core.truth_((window["jQuery"]))){
return jQuery(document).trigger("page-load");
} else {
return null;
}
} else {
return null;
}
});
adzerk.boot_reload.reload.reload_html = (function reload_html(changed){
var page_path = adzerk.boot_reload.reload.page_uri.getPath();
var html_path = ((adzerk.boot_reload.reload.ends_with_QMARK_.call(null,page_path,"/"))?[cljs.core.str(page_path),cljs.core.str("index.html")].join(''):page_path);
if(cljs.core.truth_(adzerk.boot_reload.reload.changed_href_QMARK_.call(null,html_path,changed))){
return adzerk.boot_reload.reload.reload_page_BANG_.call(null);
} else {
return null;
}
});
adzerk.boot_reload.reload.group_log = (function group_log(title,things_to_log){
console.groupCollapsed(title);

var seq__10350_10354 = cljs.core.seq.call(null,things_to_log);
var chunk__10351_10355 = null;
var count__10352_10356 = (0);
var i__10353_10357 = (0);
while(true){
if((i__10353_10357 < count__10352_10356)){
var t_10358 = cljs.core._nth.call(null,chunk__10351_10355,i__10353_10357);
console.log(t_10358);

var G__10359 = seq__10350_10354;
var G__10360 = chunk__10351_10355;
var G__10361 = count__10352_10356;
var G__10362 = (i__10353_10357 + (1));
seq__10350_10354 = G__10359;
chunk__10351_10355 = G__10360;
count__10352_10356 = G__10361;
i__10353_10357 = G__10362;
continue;
} else {
var temp__4425__auto___10363 = cljs.core.seq.call(null,seq__10350_10354);
if(temp__4425__auto___10363){
var seq__10350_10364__$1 = temp__4425__auto___10363;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__10350_10364__$1)){
var c__4551__auto___10365 = cljs.core.chunk_first.call(null,seq__10350_10364__$1);
var G__10366 = cljs.core.chunk_rest.call(null,seq__10350_10364__$1);
var G__10367 = c__4551__auto___10365;
var G__10368 = cljs.core.count.call(null,c__4551__auto___10365);
var G__10369 = (0);
seq__10350_10354 = G__10366;
chunk__10351_10355 = G__10367;
count__10352_10356 = G__10368;
i__10353_10357 = G__10369;
continue;
} else {
var t_10370 = cljs.core.first.call(null,seq__10350_10364__$1);
console.log(t_10370);

var G__10371 = cljs.core.next.call(null,seq__10350_10364__$1);
var G__10372 = null;
var G__10373 = (0);
var G__10374 = (0);
seq__10350_10354 = G__10371;
chunk__10351_10355 = G__10372;
count__10352_10356 = G__10373;
i__10353_10357 = G__10374;
continue;
}
} else {
}
}
break;
}

return console.groupEnd();
});
adzerk.boot_reload.reload.reload = (function reload(opts,changed){
adzerk.boot_reload.reload.group_log.call(null,"Reload",changed);

var G__10376 = changed;
adzerk.boot_reload.reload.reload_js.call(null,G__10376,opts);

adzerk.boot_reload.reload.reload_html.call(null,G__10376);

adzerk.boot_reload.reload.reload_css.call(null,G__10376);

adzerk.boot_reload.reload.reload_img.call(null,G__10376);

return G__10376;
});

//# sourceMappingURL=reload.js.map