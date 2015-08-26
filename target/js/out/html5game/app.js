// Compiled by ClojureScript 0.0-2814 {}
goog.provide('html5game.app');
goog.require('cljs.core');
goog.require('clojure.browser.event');
goog.require('clojure.browser.dom');
goog.require('html5game.resources');
goog.require('cljs.core.match');
cljs.core.enable_console_print_BANG_.call(null);
html5game.app.canvas = document.createElement("canvas");
html5game.app.canvas.width = (512);
html5game.app.canvas.height = (480);
html5game.app.ctx = html5game.app.canvas.getContext("2d");
clojure.browser.dom.append.call(null,document.body,html5game.app.canvas);
html5game.app.player_speed = (200);
html5game.app.bullet_speed = (500);
html5game.app.enemy_speed = (100);
html5game.app.last_time = cljs.core.atom.call(null,(0));
html5game.app.initial_state = (function initial_state(){
return cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"bullets","bullets",1734809024),new cljs.core.Keyword(null,"pressed-keys","pressed-keys",1612079142),new cljs.core.Keyword(null,"game-over?","game-over?",432859304),new cljs.core.Keyword(null,"dt","dt",-368444759),new cljs.core.Keyword(null,"explosions","explosions",-1941460974),new cljs.core.Keyword(null,"score","score",-1963588780),new cljs.core.Keyword(null,"player","player",-97687400),new cljs.core.Keyword(null,"enemies","enemies",2114285722),new cljs.core.Keyword(null,"ctx","ctx",-493610118),new cljs.core.Keyword(null,"score-el","score-el",-1975858661),new cljs.core.Keyword(null,"last-fire","last-fire",1643074014),new cljs.core.Keyword(null,"game-time","game-time",-1829009153),new cljs.core.Keyword(null,"terrain-pattern","terrain-pattern",180304671)],[cljs.core.PersistentVector.EMPTY,cljs.core.PersistentArrayMap.EMPTY,false,(0),cljs.core.PersistentVector.EMPTY,(0),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"pos","pos",-864607220),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0)], null),new cljs.core.Keyword(null,"sprite","sprite",172516848),html5game.app.make_sprite.call(null,"img/sprites.png",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(39),(39)], null),(16),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"frames","frames",1765687497),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(1)], null)], null))], null),cljs.core.PersistentVector.EMPTY,html5game.app.ctx,clojure.browser.dom.get_element.call(null,"score"),Date.now(),(0),null]);
});
/**
* Optional arguments are :frames, :dir, :once
* @param {...*} var_args
*/
html5game.app.make_sprite = (function() { 
var make_sprite__delegate = function (url,pos,size,speed,opts){
var opts__$1 = cljs.core.first.call(null,opts);
var dir = (function (){var or__3764__auto__ = new cljs.core.Keyword(null,"dir","dir",1734754661).cljs$core$IFn$_invoke$arity$1(opts__$1);
if(cljs.core.truth_(or__3764__auto__)){
return or__3764__auto__;
} else {
return "horizontal";
}
})();
var once = (function (){var or__3764__auto__ = new cljs.core.Keyword(null,"once","once",-262568523).cljs$core$IFn$_invoke$arity$1(opts__$1);
if(cljs.core.truth_(or__3764__auto__)){
return or__3764__auto__;
} else {
return false;
}
})();
var frames = (function (){var or__3764__auto__ = new cljs.core.Keyword(null,"frames","frames",1765687497).cljs$core$IFn$_invoke$arity$1(opts__$1);
if(cljs.core.truth_(or__3764__auto__)){
return or__3764__auto__;
} else {
return null;
}
})();
return new cljs.core.PersistentArrayMap(null, 8, [new cljs.core.Keyword(null,"pos","pos",-864607220),pos,new cljs.core.Keyword(null,"size","size",1098693007),size,new cljs.core.Keyword(null,"speed","speed",1257663751),((typeof speed === 'number')?speed:(0)),new cljs.core.Keyword(null,"frames","frames",1765687497),frames,new cljs.core.Keyword(null,"index","index",-1531685915),(0),new cljs.core.Keyword(null,"url","url",276297046),url,new cljs.core.Keyword(null,"dir","dir",1734754661),dir,new cljs.core.Keyword(null,"once","once",-262568523),once], null);
};
var make_sprite = function (url,pos,size,speed,var_args){
var opts = null;
if (arguments.length > 4) {
var G__24421__i = 0, G__24421__a = new Array(arguments.length -  4);
while (G__24421__i < G__24421__a.length) {G__24421__a[G__24421__i] = arguments[G__24421__i + 4]; ++G__24421__i;}
  opts = new cljs.core.IndexedSeq(G__24421__a,0);
} 
return make_sprite__delegate.call(this,url,pos,size,speed,opts);};
make_sprite.cljs$lang$maxFixedArity = 4;
make_sprite.cljs$lang$applyTo = (function (arglist__24422){
var url = cljs.core.first(arglist__24422);
arglist__24422 = cljs.core.next(arglist__24422);
var pos = cljs.core.first(arglist__24422);
arglist__24422 = cljs.core.next(arglist__24422);
var size = cljs.core.first(arglist__24422);
arglist__24422 = cljs.core.next(arglist__24422);
var speed = cljs.core.first(arglist__24422);
var opts = cljs.core.rest(arglist__24422);
return make_sprite__delegate(url,pos,size,speed,opts);
});
make_sprite.cljs$core$IFn$_invoke$arity$variadic = make_sprite__delegate;
return make_sprite;
})()
;
html5game.app.set_key_BANG_ = (function set_key_BANG_(state,event,status){
var key = (function (){var G__24424 = event.keyCode;
switch (G__24424) {
case (32):
return new cljs.core.Keyword(null,"space","space",348133475);

break;
case (37):
return new cljs.core.Keyword(null,"left","left",-399115937);

break;
case (38):
return new cljs.core.Keyword(null,"up","up",-269712113);

break;
case (39):
return new cljs.core.Keyword(null,"right","right",-452581833);

break;
case (40):
return new cljs.core.Keyword(null,"down","down",1565245570);

break;
default:
return String.fromCharCode(event.keyCode);

}
})();
return cljs.core.swap_BANG_.call(null,state,cljs.core.update,new cljs.core.Keyword(null,"pressed-keys","pressed-keys",1612079142),cljs.core.assoc,key,status);
});
html5game.app.attach_listeners_BANG_ = (function attach_listeners_BANG_(state){
window.document.addEventListener("keydown",(function (p1__24426_SHARP_){
return html5game.app.set_key_BANG_.call(null,state,p1__24426_SHARP_,true);
}));

window.document.addEventListener("keyup",(function (p1__24427_SHARP_){
return html5game.app.set_key_BANG_.call(null,state,p1__24427_SHARP_,false);
}));

return window.document.addEventListener("blur",(function (){
return cljs.core.swap_BANG_.call(null,state,cljs.core.assoc,new cljs.core.Keyword(null,"pressed-keys","pressed-keys",1612079142),cljs.core.PersistentArrayMap.EMPTY);
}));
});
html5game.app.game_over_BANG_ = (function game_over_BANG_(state){
var over_el = clojure.browser.dom.get_element.call(null,"game-over");
var overlay_el = clojure.browser.dom.get_element.call(null,"game-over-overlay");
over_el.style.display = "block";

return overlay_el.style.display = "block";
});
html5game.app.reset_game_BANG_ = (function reset_game_BANG_(state){
var over_el = clojure.browser.dom.get_element.call(null,"game-over");
var overlay_el = clojure.browser.dom.get_element.call(null,"game-over-overlay");
over_el.style.display = "none";

overlay_el.style.display = "none";

return cljs.core.assoc.call(null,cljs.core.assoc_in.call(null,state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"player","player",-97687400),new cljs.core.Keyword(null,"pos","pos",-864607220)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(50),(html5game.app.canvas.height / (2))], null)),new cljs.core.Keyword(null,"game-over?","game-over?",432859304),false,new cljs.core.Keyword(null,"score","score",-1963588780),(0),new cljs.core.Keyword(null,"game-time","game-time",-1829009153),(0),new cljs.core.Keyword(null,"enemies","enemies",2114285722),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"bullets","bullets",1734809024),cljs.core.PersistentVector.EMPTY);
});
html5game.app.compute_frame = (function compute_frame(sprite){
if((new cljs.core.Keyword(null,"speed","speed",1257663751).cljs$core$IFn$_invoke$arity$1(sprite) > (0))){
var max = cljs.core.count.call(null,new cljs.core.Keyword(null,"frames","frames",1765687497).cljs$core$IFn$_invoke$arity$1(sprite));
var idx = Math.floor(new cljs.core.Keyword(null,"index","index",-1531685915).cljs$core$IFn$_invoke$arity$1(sprite));
return cljs.core.get.call(null,new cljs.core.Keyword(null,"frames","frames",1765687497).cljs$core$IFn$_invoke$arity$1(sprite),cljs.core.mod.call(null,idx,max));
} else {
return (0);
}
});
html5game.app.render_sprite_BANG_ = (function render_sprite_BANG_(sprite,ctx){
var frame = html5game.app.compute_frame.call(null,sprite);
var vec__24430 = new cljs.core.Keyword(null,"size","size",1098693007).cljs$core$IFn$_invoke$arity$1(sprite);
var sx = cljs.core.nth.call(null,vec__24430,(0),null);
var sy = cljs.core.nth.call(null,vec__24430,(1),null);
var vec__24431 = new cljs.core.Keyword(null,"pos","pos",-864607220).cljs$core$IFn$_invoke$arity$1(sprite);
var px = cljs.core.nth.call(null,vec__24431,(0),null);
var py = cljs.core.nth.call(null,vec__24431,(1),null);
var y = ((cljs.core._EQ_.call(null,"vertical",new cljs.core.Keyword(null,"dir","dir",1734754661).cljs$core$IFn$_invoke$arity$1(sprite)))?(py + (frame * sy)):py);
var x = (px + (frame * sx));
var img = html5game.resources.get_image.call(null,new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(sprite));
return ctx.drawImage(img,x,y,sx,sy,(0),(0),sx,sy);
});
html5game.app.render_entity_BANG_ = (function render_entity_BANG_(e){
var vec__24433 = new cljs.core.Keyword(null,"pos","pos",-864607220).cljs$core$IFn$_invoke$arity$1(e);
var x = cljs.core.nth.call(null,vec__24433,(0),null);
var y = cljs.core.nth.call(null,vec__24433,(1),null);
html5game.app.ctx.save();

html5game.app.ctx.translate(x,y);

html5game.app.render_sprite_BANG_.call(null,new cljs.core.Keyword(null,"sprite","sprite",172516848).cljs$core$IFn$_invoke$arity$1(e),html5game.app.ctx);

return html5game.app.ctx.restore();
});
html5game.app.render_entities_BANG_ = (function render_entities_BANG_(entities){
var seq__24438 = cljs.core.seq.call(null,entities);
var chunk__24439 = null;
var count__24440 = (0);
var i__24441 = (0);
while(true){
if((i__24441 < count__24440)){
var e = cljs.core._nth.call(null,chunk__24439,i__24441);
html5game.app.render_entity_BANG_.call(null,e);

var G__24442 = seq__24438;
var G__24443 = chunk__24439;
var G__24444 = count__24440;
var G__24445 = (i__24441 + (1));
seq__24438 = G__24442;
chunk__24439 = G__24443;
count__24440 = G__24444;
i__24441 = G__24445;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__24438);
if(temp__4425__auto__){
var seq__24438__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__24438__$1)){
var c__4551__auto__ = cljs.core.chunk_first.call(null,seq__24438__$1);
var G__24446 = cljs.core.chunk_rest.call(null,seq__24438__$1);
var G__24447 = c__4551__auto__;
var G__24448 = cljs.core.count.call(null,c__4551__auto__);
var G__24449 = (0);
seq__24438 = G__24446;
chunk__24439 = G__24447;
count__24440 = G__24448;
i__24441 = G__24449;
continue;
} else {
var e = cljs.core.first.call(null,seq__24438__$1);
html5game.app.render_entity_BANG_.call(null,e);

var G__24450 = cljs.core.next.call(null,seq__24438__$1);
var G__24451 = null;
var G__24452 = (0);
var G__24453 = (0);
seq__24438 = G__24450;
chunk__24439 = G__24451;
count__24440 = G__24452;
i__24441 = G__24453;
continue;
}
} else {
return null;
}
}
break;
}
});
html5game.app.render_BANG_ = (function render_BANG_(state){
var ctx = new cljs.core.Keyword(null,"ctx","ctx",-493610118).cljs$core$IFn$_invoke$arity$1(state);
clojure.browser.dom.set_properties.call(null,ctx,new cljs.core.PersistentArrayMap(null, 1, ["fillStyle",new cljs.core.Keyword(null,"terrain-pattern","terrain-pattern",180304671).cljs$core$IFn$_invoke$arity$1(state)], null));

ctx.fillRect((0),(0),html5game.app.canvas.width,html5game.app.canvas.height);

if(cljs.core.not.call(null,new cljs.core.Keyword(null,"game-over?","game-over?",432859304).cljs$core$IFn$_invoke$arity$1(state))){
html5game.app.render_entity_BANG_.call(null,new cljs.core.Keyword(null,"player","player",-97687400).cljs$core$IFn$_invoke$arity$1(state));
} else {
html5game.app.game_over_BANG_.call(null,state);
}

html5game.app.render_entities_BANG_.call(null,new cljs.core.Keyword(null,"bullets","bullets",1734809024).cljs$core$IFn$_invoke$arity$1(state));

html5game.app.render_entities_BANG_.call(null,new cljs.core.Keyword(null,"enemies","enemies",2114285722).cljs$core$IFn$_invoke$arity$1(state));

return html5game.app.render_entities_BANG_.call(null,new cljs.core.Keyword(null,"explosions","explosions",-1941460974).cljs$core$IFn$_invoke$arity$1(state));
});
html5game.app.fire_bullets = (function fire_bullets(state){
if(((Date.now() - new cljs.core.Keyword(null,"last-fire","last-fire",1643074014).cljs$core$IFn$_invoke$arity$1(state)) > (200))){
var vec__24456 = cljs.core.get_in.call(null,state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"player","player",-97687400),new cljs.core.Keyword(null,"pos","pos",-864607220)], null));
var px = cljs.core.nth.call(null,vec__24456,(0),null);
var py = cljs.core.nth.call(null,vec__24456,(1),null);
var vec__24457 = cljs.core.get_in.call(null,state,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"player","player",-97687400),new cljs.core.Keyword(null,"sprite","sprite",172516848),new cljs.core.Keyword(null,"size","size",1098693007)], null));
var sx = cljs.core.nth.call(null,vec__24457,(0),null);
var sy = cljs.core.nth.call(null,vec__24457,(1),null);
var bx = (px + (sx / (2)));
var by = (py + (sy / (2)));
var now = Date.now();
return cljs.core.assoc.call(null,cljs.core.update.call(null,state,new cljs.core.Keyword(null,"bullets","bullets",1734809024),cljs.core.conj,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"pos","pos",-864607220),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [bx,by], null),new cljs.core.Keyword(null,"dir","dir",1734754661),"forward",new cljs.core.Keyword(null,"sprite","sprite",172516848),html5game.app.make_sprite.call(null,"img/sprites.png",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(39)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(18),(8)], null),html5game.app.bullet_speed)], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"pos","pos",-864607220),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [bx,by], null),new cljs.core.Keyword(null,"dir","dir",1734754661),"up",new cljs.core.Keyword(null,"sprite","sprite",172516848),html5game.app.make_sprite.call(null,"img/sprites.png",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(50)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(9),(5)], null),html5game.app.bullet_speed)], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"pos","pos",-864607220),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [bx,by], null),new cljs.core.Keyword(null,"dir","dir",1734754661),"down",new cljs.core.Keyword(null,"sprite","sprite",172516848),html5game.app.make_sprite.call(null,"img/sprites.png",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(60)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(9),(5)], null),html5game.app.bullet_speed)], null)),new cljs.core.Keyword(null,"last-fire","last-fire",1643074014),Date.now());
} else {
return state;
}
});
html5game.app.is_down_QMARK_ = (function is_down_QMARK_(state,key){
return cljs.core.get_in.call(null,state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"pressed-keys","pressed-keys",1612079142),key], null)) === true;
});
/**
* Takes playter position and size of player sprite
* returns the position of player within bounds
*/
html5game.app.check_player_bounds = (function check_player_bounds(p__24460,p__24461){
var vec__24478 = p__24460;
var x = cljs.core.nth.call(null,vec__24478,(0),null);
var y = cljs.core.nth.call(null,vec__24478,(1),null);
var vec__24479 = p__24461;
var ssx = cljs.core.nth.call(null,vec__24479,(0),null);
var ssy = cljs.core.nth.call(null,vec__24479,(1),null);
try{if((x < (0))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),y], null);
} else {
throw cljs.core.match.backtrack;

}
}catch (e24490){if((e24490 instanceof Error)){
var e__8859__auto__ = e24490;
if((e__8859__auto__ === cljs.core.match.backtrack)){
try{if(((function (e__8859__auto__,vec__24478,x,y,vec__24479,ssx,ssy){
return (function (p1__24458_SHARP_){
return (p1__24458_SHARP_ > (html5game.app.canvas.width - ssx));
});})(e__8859__auto__,vec__24478,x,y,vec__24479,ssx,ssy))
.call(null,x)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(html5game.app.canvas.width - ssx),y], null);
} else {
throw cljs.core.match.backtrack;

}
}catch (e24491){if((e24491 instanceof Error)){
var e__8859__auto____$1 = e24491;
if((e__8859__auto____$1 === cljs.core.match.backtrack)){
try{if((y < (0))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x,(0)], null);
} else {
throw cljs.core.match.backtrack;

}
}catch (e24492){if((e24492 instanceof Error)){
var e__8859__auto____$2 = e24492;
if((e__8859__auto____$2 === cljs.core.match.backtrack)){
try{if(((function (e__8859__auto____$2,e__8859__auto____$1,e__8859__auto__,vec__24478,x,y,vec__24479,ssx,ssy){
return (function (p1__24459_SHARP_){
return (p1__24459_SHARP_ > (html5game.app.canvas.height - ssy));
});})(e__8859__auto____$2,e__8859__auto____$1,e__8859__auto__,vec__24478,x,y,vec__24479,ssx,ssy))
.call(null,y)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x,(html5game.app.canvas.height - ssy)], null);
} else {
throw cljs.core.match.backtrack;

}
}catch (e24493){if((e24493 instanceof Error)){
var e__8859__auto____$3 = e24493;
if((e__8859__auto____$3 === cljs.core.match.backtrack)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x,y], null);
} else {
throw e__8859__auto____$3;
}
} else {
throw e24493;

}
}} else {
throw e__8859__auto____$2;
}
} else {
throw e24492;

}
}} else {
throw e__8859__auto____$1;
}
} else {
throw e24491;

}
}} else {
throw e__8859__auto__;
}
} else {
throw e24490;

}
}});
html5game.app.handle_input = (function handle_input(state){
var vec__24495 = cljs.core.get_in.call(null,state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"player","player",-97687400),new cljs.core.Keyword(null,"pos","pos",-864607220)], null));
var x1 = cljs.core.nth.call(null,vec__24495,(0),null);
var y1 = cljs.core.nth.call(null,vec__24495,(1),null);
var is_down_QMARK_ = cljs.core.partial.call(null,html5game.app.is_down_QMARK_,state);
var x = cljs.core.atom.call(null,x1);
var y = cljs.core.atom.call(null,y1);
var dt = new cljs.core.Keyword(null,"dt","dt",-368444759).cljs$core$IFn$_invoke$arity$1(state);
if(cljs.core.truth_(is_down_QMARK_.call(null,new cljs.core.Keyword(null,"down","down",1565245570)))){
cljs.core.swap_BANG_.call(null,y,((function (vec__24495,x1,y1,is_down_QMARK_,x,y,dt){
return (function (){
return (cljs.core.deref.call(null,y) + (dt * html5game.app.player_speed));
});})(vec__24495,x1,y1,is_down_QMARK_,x,y,dt))
);
} else {
}

if(cljs.core.truth_(is_down_QMARK_.call(null,new cljs.core.Keyword(null,"up","up",-269712113)))){
cljs.core.swap_BANG_.call(null,y,((function (vec__24495,x1,y1,is_down_QMARK_,x,y,dt){
return (function (){
return (cljs.core.deref.call(null,y) - (dt * html5game.app.player_speed));
});})(vec__24495,x1,y1,is_down_QMARK_,x,y,dt))
);
} else {
}

if(cljs.core.truth_(is_down_QMARK_.call(null,new cljs.core.Keyword(null,"right","right",-452581833)))){
cljs.core.swap_BANG_.call(null,x,((function (vec__24495,x1,y1,is_down_QMARK_,x,y,dt){
return (function (){
return (cljs.core.deref.call(null,x) + (dt * html5game.app.player_speed));
});})(vec__24495,x1,y1,is_down_QMARK_,x,y,dt))
);
} else {
}

if(cljs.core.truth_(is_down_QMARK_.call(null,new cljs.core.Keyword(null,"left","left",-399115937)))){
cljs.core.swap_BANG_.call(null,x,((function (vec__24495,x1,y1,is_down_QMARK_,x,y,dt){
return (function (){
return (cljs.core.deref.call(null,x) - (dt * html5game.app.player_speed));
});})(vec__24495,x1,y1,is_down_QMARK_,x,y,dt))
);
} else {
}

var new_state = (cljs.core.truth_(is_down_QMARK_.call(null,new cljs.core.Keyword(null,"space","space",348133475)))?html5game.app.fire_bullets.call(null,state):state);
return cljs.core.assoc_in.call(null,new_state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"player","player",-97687400),new cljs.core.Keyword(null,"pos","pos",-864607220)], null),html5game.app.check_player_bounds.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.deref.call(null,x),cljs.core.deref.call(null,y)], null),cljs.core.get_in.call(null,state,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"player","player",-97687400),new cljs.core.Keyword(null,"sprite","sprite",172516848),new cljs.core.Keyword(null,"size","size",1098693007)], null))));
});
html5game.app.add_enemies = (function add_enemies(state){
if((Math.random() < ((1) - Math.pow(0.933,(new cljs.core.Keyword(null,"game-time","game-time",-1829009153).cljs$core$IFn$_invoke$arity$1(state) / (20)))))){
return cljs.core.update.call(null,state,new cljs.core.Keyword(null,"enemies","enemies",2114285722),cljs.core.conj,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"pos","pos",-864607220),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [html5game.app.canvas.width,(Math.random() * (html5game.app.canvas.height - (39)))], null),new cljs.core.Keyword(null,"sprite","sprite",172516848),html5game.app.make_sprite.call(null,"img/sprites.png",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(78)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(80),(39)], null),(6),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"frames","frames",1765687497),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(1),(2),(3),(2),(1)], null)], null))], null));
} else {
return state;
}
});
html5game.app.update_sprite = (function update_sprite(sprite,dt){
var new_index = (new cljs.core.Keyword(null,"index","index",-1531685915).cljs$core$IFn$_invoke$arity$1(sprite) + (dt * new cljs.core.Keyword(null,"speed","speed",1257663751).cljs$core$IFn$_invoke$arity$1(sprite)));
return cljs.core.assoc.call(null,sprite,new cljs.core.Keyword(null,"index","index",-1531685915),new_index);
});
html5game.app.off_screen_QMARK_ = (function off_screen_QMARK_(ent){
var vec__24497 = new cljs.core.Keyword(null,"pos","pos",-864607220).cljs$core$IFn$_invoke$arity$1(ent);
var x = cljs.core.nth.call(null,vec__24497,(0),null);
var y = cljs.core.nth.call(null,vec__24497,(1),null);
return ((y < (0))) || ((x < (0))) || ((x > html5game.app.canvas.width)) || ((x > html5game.app.canvas.heigh));
});
html5game.app.update_bullet = (function update_bullet(bullet,dt){
var dir = new cljs.core.Keyword(null,"dir","dir",1734754661).cljs$core$IFn$_invoke$arity$1(bullet);
var vec__24500 = new cljs.core.Keyword(null,"pos","pos",-864607220).cljs$core$IFn$_invoke$arity$1(bullet);
var x = cljs.core.nth.call(null,vec__24500,(0),null);
var y = cljs.core.nth.call(null,vec__24500,(1),null);
var G__24501 = dir;
switch (G__24501) {
case "up":
return cljs.core.assoc.call(null,bullet,new cljs.core.Keyword(null,"pos","pos",-864607220),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x,(y - (dt * html5game.app.bullet_speed))], null));

break;
case "down":
return cljs.core.assoc.call(null,bullet,new cljs.core.Keyword(null,"pos","pos",-864607220),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x,(y + (dt * html5game.app.bullet_speed))], null));

break;
default:
return cljs.core.assoc.call(null,bullet,new cljs.core.Keyword(null,"pos","pos",-864607220),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(x + (dt * html5game.app.bullet_speed)),y], null));

}
});
html5game.app.update_bullets = (function update_bullets(bullets,dt){
return cljs.core.remove.call(null,html5game.app.off_screen_QMARK_,cljs.core.map.call(null,(function (p1__24503_SHARP_){
return html5game.app.update_bullet.call(null,p1__24503_SHARP_,dt);
}),bullets));
});
html5game.app.update_enemy = (function update_enemy(enemy,dt){
var vec__24505 = new cljs.core.Keyword(null,"pos","pos",-864607220).cljs$core$IFn$_invoke$arity$1(enemy);
var x = cljs.core.nth.call(null,vec__24505,(0),null);
var y = cljs.core.nth.call(null,vec__24505,(1),null);
return cljs.core.update_in.call(null,cljs.core.assoc.call(null,enemy,new cljs.core.Keyword(null,"pos","pos",-864607220),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(x - (dt * html5game.app.enemy_speed)),y], null)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sprite","sprite",172516848)], null),html5game.app.update_sprite,dt);
});
html5game.app.update_enemies = (function update_enemies(enemies,dt){
return cljs.core.remove.call(null,html5game.app.off_screen_QMARK_,cljs.core.map.call(null,(function (p1__24506_SHARP_){
return html5game.app.update_enemy.call(null,p1__24506_SHARP_,dt);
}),enemies));
});
/**
* Takes and explosion and tests whether it has displayed all frames
*/
html5game.app.explosion_done_QMARK_ = (function explosion_done_QMARK_(ex){
var idx = Math.floor(cljs.core.get_in.call(null,ex,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sprite","sprite",172516848),new cljs.core.Keyword(null,"index","index",-1531685915)], null)));
return cljs.core.not.call(null,(function (){var and__3752__auto__ = cljs.core.get_in.call(null,ex,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sprite","sprite",172516848),new cljs.core.Keyword(null,"once","once",-262568523)], null));
if(cljs.core.truth_(and__3752__auto__)){
return (idx >= cljs.core.count.call(null,cljs.core.get_in.call(null,ex,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sprite","sprite",172516848),new cljs.core.Keyword(null,"frames","frames",1765687497)], null))));
} else {
return and__3752__auto__;
}
})());
});
html5game.app.update_explosions = (function update_explosions(explosions,dt){
return cljs.core.filter.call(null,html5game.app.explosion_done_QMARK_,cljs.core.map.call(null,(function (p1__24507_SHARP_){
return cljs.core.update.call(null,p1__24507_SHARP_,new cljs.core.Keyword(null,"sprite","sprite",172516848),html5game.app.update_sprite,dt);
}),explosions));
});
html5game.app.update_entities = (function update_entities(state){
var dt = new cljs.core.Keyword(null,"dt","dt",-368444759).cljs$core$IFn$_invoke$arity$1(state);
return cljs.core.update.call(null,cljs.core.update.call(null,cljs.core.update.call(null,cljs.core.update_in.call(null,state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"player","player",-97687400),new cljs.core.Keyword(null,"sprite","sprite",172516848)], null),html5game.app.update_sprite,dt),new cljs.core.Keyword(null,"bullets","bullets",1734809024),html5game.app.update_bullets,dt),new cljs.core.Keyword(null,"enemies","enemies",2114285722),html5game.app.update_enemies,dt),new cljs.core.Keyword(null,"explosions","explosions",-1941460974),html5game.app.update_explosions,dt);
});
html5game.app.collides = (function collides(x,y,r,b,x2,y2,r2,b2){
return !(((r <= x2)) || ((x > r2)) || ((b <= y2)) || ((y > b2)));
});
html5game.app.box_collides = (function box_collides(pos1,size1,pos2,size2){
var vec__24512 = pos1;
var p1x = cljs.core.nth.call(null,vec__24512,(0),null);
var p1y = cljs.core.nth.call(null,vec__24512,(1),null);
var vec__24513 = size1;
var s1x = cljs.core.nth.call(null,vec__24513,(0),null);
var s1y = cljs.core.nth.call(null,vec__24513,(1),null);
var vec__24514 = pos2;
var p2x = cljs.core.nth.call(null,vec__24514,(0),null);
var p2y = cljs.core.nth.call(null,vec__24514,(1),null);
var vec__24515 = size2;
var s2x = cljs.core.nth.call(null,vec__24515,(0),null);
var s2y = cljs.core.nth.call(null,vec__24515,(1),null);
return html5game.app.collides.call(null,p1x,p1y,(p1x + s1x),(p1y + s1y),p2x,p2y,(p2x + s2x),(p2y + s2y));
});
html5game.app.check_collisions = (function check_collisions(state){
var e = cljs.core.atom.call(null);
var b = cljs.core.atom.call(null);
var seq__24530_24542 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"enemies","enemies",2114285722).cljs$core$IFn$_invoke$arity$1(state));
var chunk__24535_24543 = null;
var count__24536_24544 = (0);
var i__24537_24545 = (0);
while(true){
if((i__24537_24545 < count__24536_24544)){
var enemy_24546 = cljs.core._nth.call(null,chunk__24535_24543,i__24537_24545);
var seq__24538_24547 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"bullets","bullets",1734809024).cljs$core$IFn$_invoke$arity$1(state));
var chunk__24539_24548 = null;
var count__24540_24549 = (0);
var i__24541_24550 = (0);
while(true){
if((i__24541_24550 < count__24540_24549)){
var bullet_24551 = cljs.core._nth.call(null,chunk__24539_24548,i__24541_24550);
var e_pos_24552 = new cljs.core.Keyword(null,"pos","pos",-864607220).cljs$core$IFn$_invoke$arity$1(enemy_24546);
var e_sprite_size_24553 = cljs.core.get_in.call(null,enemy_24546,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sprite","sprite",172516848),new cljs.core.Keyword(null,"size","size",1098693007)], null));
var b_pos_24554 = new cljs.core.Keyword(null,"pos","pos",-864607220).cljs$core$IFn$_invoke$arity$1(bullet_24551);
var b_sprite_size_24555 = cljs.core.get_in.call(null,enemy_24546,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sprite","sprite",172516848),new cljs.core.Keyword(null,"size","size",1098693007)], null));
if(html5game.app.box_collides.call(null,e_pos_24552,e_sprite_size_24553,b_pos_24554,b_sprite_size_24555)){
cljs.core.reset_BANG_.call(null,e,e_pos_24552);

cljs.core.reset_BANG_.call(null,b,b_pos_24554);
} else {
}

var G__24556 = seq__24538_24547;
var G__24557 = chunk__24539_24548;
var G__24558 = count__24540_24549;
var G__24559 = (i__24541_24550 + (1));
seq__24538_24547 = G__24556;
chunk__24539_24548 = G__24557;
count__24540_24549 = G__24558;
i__24541_24550 = G__24559;
continue;
} else {
var temp__4425__auto___24560 = cljs.core.seq.call(null,seq__24538_24547);
if(temp__4425__auto___24560){
var seq__24538_24561__$1 = temp__4425__auto___24560;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__24538_24561__$1)){
var c__4551__auto___24562 = cljs.core.chunk_first.call(null,seq__24538_24561__$1);
var G__24563 = cljs.core.chunk_rest.call(null,seq__24538_24561__$1);
var G__24564 = c__4551__auto___24562;
var G__24565 = cljs.core.count.call(null,c__4551__auto___24562);
var G__24566 = (0);
seq__24538_24547 = G__24563;
chunk__24539_24548 = G__24564;
count__24540_24549 = G__24565;
i__24541_24550 = G__24566;
continue;
} else {
var bullet_24567 = cljs.core.first.call(null,seq__24538_24561__$1);
var e_pos_24568 = new cljs.core.Keyword(null,"pos","pos",-864607220).cljs$core$IFn$_invoke$arity$1(enemy_24546);
var e_sprite_size_24569 = cljs.core.get_in.call(null,enemy_24546,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sprite","sprite",172516848),new cljs.core.Keyword(null,"size","size",1098693007)], null));
var b_pos_24570 = new cljs.core.Keyword(null,"pos","pos",-864607220).cljs$core$IFn$_invoke$arity$1(bullet_24567);
var b_sprite_size_24571 = cljs.core.get_in.call(null,enemy_24546,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sprite","sprite",172516848),new cljs.core.Keyword(null,"size","size",1098693007)], null));
if(html5game.app.box_collides.call(null,e_pos_24568,e_sprite_size_24569,b_pos_24570,b_sprite_size_24571)){
cljs.core.reset_BANG_.call(null,e,e_pos_24568);

cljs.core.reset_BANG_.call(null,b,b_pos_24570);
} else {
}

var G__24572 = cljs.core.next.call(null,seq__24538_24561__$1);
var G__24573 = null;
var G__24574 = (0);
var G__24575 = (0);
seq__24538_24547 = G__24572;
chunk__24539_24548 = G__24573;
count__24540_24549 = G__24574;
i__24541_24550 = G__24575;
continue;
}
} else {
}
}
break;
}

var G__24576 = seq__24530_24542;
var G__24577 = chunk__24535_24543;
var G__24578 = count__24536_24544;
var G__24579 = (i__24537_24545 + (1));
seq__24530_24542 = G__24576;
chunk__24535_24543 = G__24577;
count__24536_24544 = G__24578;
i__24537_24545 = G__24579;
continue;
} else {
var temp__4425__auto___24580 = cljs.core.seq.call(null,seq__24530_24542);
if(temp__4425__auto___24580){
var seq__24530_24581__$1 = temp__4425__auto___24580;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__24530_24581__$1)){
var c__4551__auto___24582 = cljs.core.chunk_first.call(null,seq__24530_24581__$1);
var G__24583 = cljs.core.chunk_rest.call(null,seq__24530_24581__$1);
var G__24584 = c__4551__auto___24582;
var G__24585 = cljs.core.count.call(null,c__4551__auto___24582);
var G__24586 = (0);
seq__24530_24542 = G__24583;
chunk__24535_24543 = G__24584;
count__24536_24544 = G__24585;
i__24537_24545 = G__24586;
continue;
} else {
var enemy_24587 = cljs.core.first.call(null,seq__24530_24581__$1);
var seq__24531_24588 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"bullets","bullets",1734809024).cljs$core$IFn$_invoke$arity$1(state));
var chunk__24532_24589 = null;
var count__24533_24590 = (0);
var i__24534_24591 = (0);
while(true){
if((i__24534_24591 < count__24533_24590)){
var bullet_24592 = cljs.core._nth.call(null,chunk__24532_24589,i__24534_24591);
var e_pos_24593 = new cljs.core.Keyword(null,"pos","pos",-864607220).cljs$core$IFn$_invoke$arity$1(enemy_24587);
var e_sprite_size_24594 = cljs.core.get_in.call(null,enemy_24587,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sprite","sprite",172516848),new cljs.core.Keyword(null,"size","size",1098693007)], null));
var b_pos_24595 = new cljs.core.Keyword(null,"pos","pos",-864607220).cljs$core$IFn$_invoke$arity$1(bullet_24592);
var b_sprite_size_24596 = cljs.core.get_in.call(null,enemy_24587,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sprite","sprite",172516848),new cljs.core.Keyword(null,"size","size",1098693007)], null));
if(html5game.app.box_collides.call(null,e_pos_24593,e_sprite_size_24594,b_pos_24595,b_sprite_size_24596)){
cljs.core.reset_BANG_.call(null,e,e_pos_24593);

cljs.core.reset_BANG_.call(null,b,b_pos_24595);
} else {
}

var G__24597 = seq__24531_24588;
var G__24598 = chunk__24532_24589;
var G__24599 = count__24533_24590;
var G__24600 = (i__24534_24591 + (1));
seq__24531_24588 = G__24597;
chunk__24532_24589 = G__24598;
count__24533_24590 = G__24599;
i__24534_24591 = G__24600;
continue;
} else {
var temp__4425__auto___24601__$1 = cljs.core.seq.call(null,seq__24531_24588);
if(temp__4425__auto___24601__$1){
var seq__24531_24602__$1 = temp__4425__auto___24601__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__24531_24602__$1)){
var c__4551__auto___24603 = cljs.core.chunk_first.call(null,seq__24531_24602__$1);
var G__24604 = cljs.core.chunk_rest.call(null,seq__24531_24602__$1);
var G__24605 = c__4551__auto___24603;
var G__24606 = cljs.core.count.call(null,c__4551__auto___24603);
var G__24607 = (0);
seq__24531_24588 = G__24604;
chunk__24532_24589 = G__24605;
count__24533_24590 = G__24606;
i__24534_24591 = G__24607;
continue;
} else {
var bullet_24608 = cljs.core.first.call(null,seq__24531_24602__$1);
var e_pos_24609 = new cljs.core.Keyword(null,"pos","pos",-864607220).cljs$core$IFn$_invoke$arity$1(enemy_24587);
var e_sprite_size_24610 = cljs.core.get_in.call(null,enemy_24587,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sprite","sprite",172516848),new cljs.core.Keyword(null,"size","size",1098693007)], null));
var b_pos_24611 = new cljs.core.Keyword(null,"pos","pos",-864607220).cljs$core$IFn$_invoke$arity$1(bullet_24608);
var b_sprite_size_24612 = cljs.core.get_in.call(null,enemy_24587,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sprite","sprite",172516848),new cljs.core.Keyword(null,"size","size",1098693007)], null));
if(html5game.app.box_collides.call(null,e_pos_24609,e_sprite_size_24610,b_pos_24611,b_sprite_size_24612)){
cljs.core.reset_BANG_.call(null,e,e_pos_24609);

cljs.core.reset_BANG_.call(null,b,b_pos_24611);
} else {
}

var G__24613 = cljs.core.next.call(null,seq__24531_24602__$1);
var G__24614 = null;
var G__24615 = (0);
var G__24616 = (0);
seq__24531_24588 = G__24613;
chunk__24532_24589 = G__24614;
count__24533_24590 = G__24615;
i__24534_24591 = G__24616;
continue;
}
} else {
}
}
break;
}

var G__24617 = cljs.core.next.call(null,seq__24530_24581__$1);
var G__24618 = null;
var G__24619 = (0);
var G__24620 = (0);
seq__24530_24542 = G__24617;
chunk__24535_24543 = G__24618;
count__24536_24544 = G__24619;
i__24537_24545 = G__24620;
continue;
}
} else {
}
}
break;
}

if(cljs.core.not.call(null,cljs.core.deref.call(null,e))){
return state;
} else {
return cljs.core.update.call(null,cljs.core.update.call(null,cljs.core.update.call(null,cljs.core.update.call(null,state,new cljs.core.Keyword(null,"score","score",-1963588780),cljs.core._PLUS_,(100)),new cljs.core.Keyword(null,"enemies","enemies",2114285722),((function (e,b){
return (function (enemies){
return cljs.core.filter.call(null,((function (e,b){
return (function (p1__24516_SHARP_){
return cljs.core.not_EQ_.call(null,cljs.core.deref.call(null,e),new cljs.core.Keyword(null,"pos","pos",-864607220).cljs$core$IFn$_invoke$arity$1(p1__24516_SHARP_));
});})(e,b))
,enemies);
});})(e,b))
),new cljs.core.Keyword(null,"bullets","bullets",1734809024),((function (e,b){
return (function (bullets){
return cljs.core.filter.call(null,((function (e,b){
return (function (p1__24517_SHARP_){
return cljs.core.not_EQ_.call(null,cljs.core.deref.call(null,b),new cljs.core.Keyword(null,"pos","pos",-864607220).cljs$core$IFn$_invoke$arity$1(p1__24517_SHARP_));
});})(e,b))
,bullets);
});})(e,b))
),new cljs.core.Keyword(null,"explosions","explosions",-1941460974),cljs.core.conj,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"pos","pos",-864607220),cljs.core.deref.call(null,b),new cljs.core.Keyword(null,"sprite","sprite",172516848),html5game.app.make_sprite.call(null,"img/sprites.png",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(117)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(39),(39)], null),(16),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"frames","frames",1765687497),new cljs.core.PersistentVector(null, 13, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(1),(2),(3),(4),(5),(6),(7),(8),(9),(10),(11),(12)], null),new cljs.core.Keyword(null,"dir","dir",1734754661),null,new cljs.core.Keyword(null,"once","once",-262568523),true], null))], null));
}
});
html5game.app.check_game_over = (function check_game_over(state){
var ppos = cljs.core.get_in.call(null,state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"player","player",-97687400),new cljs.core.Keyword(null,"pos","pos",-864607220)], null));
var psize = cljs.core.get_in.call(null,state,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"player","player",-97687400),new cljs.core.Keyword(null,"sprite","sprite",172516848),new cljs.core.Keyword(null,"size","size",1098693007)], null));
var tf_QMARK_ = ((function (ppos,psize){
return (function (tf,enemy){
if(tf === true){
return true;
} else {
return html5game.app.box_collides.call(null,ppos,psize,new cljs.core.Keyword(null,"pos","pos",-864607220).cljs$core$IFn$_invoke$arity$1(enemy),cljs.core.get_in.call(null,enemy,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sprite","sprite",172516848),new cljs.core.Keyword(null,"size","size",1098693007)], null)));
}
});})(ppos,psize))
;
var game_over_QMARK_ = cljs.core.reduce.call(null,tf_QMARK_,false,new cljs.core.Keyword(null,"enemies","enemies",2114285722).cljs$core$IFn$_invoke$arity$1(state));
return cljs.core.assoc.call(null,state,new cljs.core.Keyword(null,"game-over?","game-over?",432859304),game_over_QMARK_);
});
html5game.app.update_state = (function update_state(state){
var update_fns = cljs.core.comp.call(null,(function (p1__24621_SHARP_){
return cljs.core.update.call(null,p1__24621_SHARP_,new cljs.core.Keyword(null,"game-time","game-time",-1829009153),cljs.core._PLUS_,new cljs.core.Keyword(null,"dt","dt",-368444759).cljs$core$IFn$_invoke$arity$1(p1__24621_SHARP_));
}),html5game.app.handle_input,html5game.app.update_entities,html5game.app.add_enemies,html5game.app.check_collisions,html5game.app.check_game_over);
cljs.core.swap_BANG_.call(null,state,update_fns);

return new cljs.core.Keyword(null,"score-el","score-el",-1975858661).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,state)).innerHTML = new cljs.core.Keyword(null,"score","score",-1963588780).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,state));
});
html5game.app.main_loop = (function main_loop(state){
var now = Date.now();
var dt = ((now - cljs.core.deref.call(null,html5game.app.last_time)) / 1000.0);
cljs.core.swap_BANG_.call(null,state,cljs.core.assoc,new cljs.core.Keyword(null,"dt","dt",-368444759),dt);

html5game.app.update_state.call(null,state);

html5game.app.render_BANG_.call(null,cljs.core.deref.call(null,state));

cljs.core.reset_BANG_.call(null,html5game.app.last_time,now);

return window.requestAnimationFrame(cljs.core.partial.call(null,main_loop,state));
});
html5game.app.setup = (function setup(){
var state = cljs.core.atom.call(null,html5game.app.initial_state.call(null));
cljs.core.swap_BANG_.call(null,state,cljs.core.assoc,new cljs.core.Keyword(null,"terrain-pattern","terrain-pattern",180304671),html5game.app.ctx.createPattern(html5game.resources.get_image.call(null,"img/terrain.png"),"repeat"));

clojure.browser.event.listen.call(null,clojure.browser.dom.get_element.call(null,new cljs.core.Keyword(null,"play-again","play-again",184461122)),new cljs.core.Keyword(null,"click","click",1912301393),cljs.core.partial.call(null,cljs.core.swap_BANG_,state,html5game.app.reset_game_BANG_));

html5game.app.attach_listeners_BANG_.call(null,state);

cljs.core.swap_BANG_.call(null,state,html5game.app.reset_game_BANG_);

cljs.core.reset_BANG_.call(null,html5game.app.last_time,Date.now());

return html5game.app.main_loop.call(null,state);
});
/**
* loads image resources before calling setup
*/
html5game.app.init = (function init(){
html5game.resources.load.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["img/sprites.png","img/terrain.png"], null));

return html5game.resources.on_ready.call(null,html5game.app.setup);
});

//# sourceMappingURL=app.js.map