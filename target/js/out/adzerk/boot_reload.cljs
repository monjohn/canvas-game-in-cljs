(ns adzerk.boot-reload (:require [adzerk.boot-reload.client :as client] html5game.app))
(when-not (client/alive?) (client/connect "ws://localhost:54535" {:on-jsload (fn* [] (html5game.app/init))}))