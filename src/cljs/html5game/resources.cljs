(ns html5game.resources
  (:require 
   [clojure.browser.dom :as dom]
   ))

(def cache (atom {}))
(def loading (atom []))                    ;
(def ready-callbacks (atom []))

(defn is-ready? []
  (not-any? false? (vals @cache)))

(defn on-ready [f]
  (swap! ready-callbacks conj f))

(defn on-image-load [url img]
  (swap! cache assoc url img)
  (if (is-ready?)
    (doseq [f @ready-callbacks] 
      (f))
    nil))

(defn load-url [url]
  (if (get @cache url) 
    (get @cache url) 
    ;; else if not in cache 
    (let [img (js/Image.)]
      (dom/set-properties img {"onload" (partial on-image-load url img)})
      (swap! cache assoc url false)
      (dom/set-properties img {"src" url}))))


(defn load [x]
  (if (vector? x)
    (dorun 
     (map load-url x))
    (load-url x)))

(defn get-image [url]
  (get @cache url))

