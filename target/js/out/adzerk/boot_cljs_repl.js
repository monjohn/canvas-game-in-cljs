// Compiled by ClojureScript 0.0-2814 {}
goog.provide('adzerk.boot_cljs_repl');
goog.require('cljs.core');
goog.require('weasel.repl');
var repl_conn_16774 = null;
if(cljs.core.truth_((function (){var and__3752__auto__ = repl_conn_16774;
if(cljs.core.truth_(and__3752__auto__)){
return !(weasel.repl.alive_QMARK_.call(null));
} else {
return and__3752__auto__;
}
})())){
weasel.repl.connect.call(null,null);
} else {
}

//# sourceMappingURL=boot_cljs_repl.js.map