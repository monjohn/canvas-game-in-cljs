(ns html5game.app
  (:require 
   [clojure.browser.event :as e]
   [clojure.browser.dom :as dom]
   [html5game.resources :as resources]
   [cljs.core.match :refer-macros [match]]))

(enable-console-print!)

;;;; This game is a port of James Long's sprite experiment
;;;; http://jlongster.com/Making-Sprite-based-Games-with-Canvas
;;;; CODE: https://github.com/jlongster/canvas-game-bootstrap/blob/master/js/app.js
;;;; It has been translated into ClojureScript idioms. 
;;;; The order of function is somewhat reversed, because cljs
;;;; does not hoist functions as in JavaScript.

;;;; TODO: Explain how state is dealt with

;; ------------------- Create canvas and context
(def canvas (.createElement js/document "canvas"))
(set! (.-width canvas) 512)
(set! (.-height canvas) 480)

(def ctx (.getContext canvas "2d"))
(dom/append js/document.body canvas)

(def player-speed  200)
(def bullet-speed  500)
(def enemy-speed  100)
(def last-time (atom 0))

; Just declares that the function will be provided, so that it can be called 
; in `initial-state` 
(declare make-sprite)

;; The state of the game is kept in a map, which is passed to each function,
;; rather than being separated out into many global variables.
(defn initial-state [] 
  {:ctx ctx
   :player {:pos [0, 0]
            :sprite (make-sprite "img/sprites.png" [0 0] [39 39] 16 {:frames [0 1]})}
   :bullets  []
   :enemies  []
   :explosions []
   :last-fire (.now js/Date) 
   :dt 0
   :game-time 0
   :game-over? false
   :terrain-pattern nil
   :score  0
   :score-el (dom/get-element "score") 
   :pressed-keys {}})


;; Creating a new sprite functionality is not in separate file as it is in JavaScript, 
;; because it is not a distinct object. The update and render methods assigned to the 
;; prototype is JS are named 'update-sprite' and 'render-sprite' and are found in the 
;; respective update and render sections of this file.

(defn make-sprite 
  "Optional arguments are :frames, :dir, :once"
  [url, pos, size, speed & opts]
  (let [opts (first opts)
        dir (or (:dir opts) "horizontal")
        once (or (:once opts) false)
        frames (or (:frames opts) nil)]
    {:pos pos
     :size size
     :speed (if (number? speed) speed 0)
     :frames frames
     :index 0
     :url url
     :dir dir
     :once once}))

;;;; ------------- Set up Code ------------------;;;;


;; The first two functions were separated out into input.js, but given how short they 
;; are, it didn't seem necessary.

(defn set-key! [state event status]
  (let [key (case (.-keyCode event)
              32 :space
              37 :left
              38 :up
              39 :right
              40 :down
              (.fromCharCode js/String (.-keyCode event)))]
    (swap! state update :pressed-keys assoc key status)))

; It is conventional to append an exclamation mark to the end of a function name
; as an indication that it mutates some state and is not a pure function, such as
; modifying the DOM.

(defn attach-listeners! [state]
  (.addEventListener js/window.document "keydown" #(set-key! state % true) )
  (.addEventListener js/window.document "keyup" #(set-key! state % false) )
  (.addEventListener js/window.document "blur" #(swap! state assoc :pressed-keys {})))

(defn game-over! [state]
  (let [over-el (dom/get-element "game-over")
        overlay-el (dom/get-element "game-over-overlay")]
    (set! (.-display  (.-style over-el)) "block")
    (set! (.-display  (.-style overlay-el)) "block")))

(defn reset-game! [state]
  (let [over-el (dom/get-element "game-over")
        overlay-el (dom/get-element "game-over-overlay")]
    (set! (.-display  (.-style over-el)) "none")
    (set! (.-display  (.-style overlay-el)) "none")
    (-> state 
        (assoc-in [:player :pos] [50 (/ canvas.height  2)])
        (assoc :game-over? false
               :score 0
               :game-time 0
               :enemies []
               :bullets []))))


;;;; ---------------- Rendering Code ----------------------- ;;;;


;; helper function for rendering sprite
(defn compute-frame [sprite]
  (if (> (:speed sprite) 0)
    (let [max (count (:frames sprite))
          idx (.floor js/Math (:index sprite))]
      (get  (:frames sprite) (mod idx max)))
    ;; code in Javascript that testing for done was moved to update cycle
    0))

(defn render-sprite! [sprite ctx]
  (let [frame (compute-frame sprite)
        [sx sy] (:size sprite)
        [px py] (:pos sprite)
        y (if (= "vertical" (:dir sprite))
            (+ py (* frame sy))
            py)
        x (+ px (* frame sx))
        img (resources/get-image (:url sprite))]
    (.drawImage ctx img, x, y, sx, sy, 0, 0, sx, sy))) 

(defn render-entity! [e]
  (let [[x y] (:pos e)]
    (.save ctx)
    (.translate ctx x y)
    (render-sprite! (:sprite e) ctx)
    (.restore ctx)))

(defn render-entities! [entities]
  (doseq [e entities]
    (render-entity! e)))

(defn render! [state]
  (let [ctx (:ctx state)]
    ;; Set background
    (dom/set-properties ctx {"fillStyle" (:terrain-pattern state)})
    (.fillRect ctx 0 0  canvas.width, canvas.height )
    ;;  Render the player if the game isn't over
    (if-not (:game-over? state)
      (render-entity! (:player state))
      (game-over! state))   
    (render-entities! (:bullets state))             
    (render-entities! (:enemies state))             
    (render-entities! (:explosions state))))


;;;; --------------- Updating Functions ---------------- ;;;;


(defn fire-bullets [state] 
  (if (> (- (.now js/Date) (:last-fire state)) 100)
    (let [[px py] (get-in state [:player :pos])
          [sx sy] (get-in state [:player :sprite :size])
          bx (+ px (/ sx 2))
          by (+ py (/ sy 2))
          now (.now js/Date)]
      (-> state 
          (update :bullets conj 
                  {:pos [bx by] :dir "forward" 
                   :sprite (make-sprite "img/sprites.png" [0 39] [18 8] bullet-speed)})
          (assoc :last-fire (.now js/Date)))) 
    state))

(defn is-down? [state key]
  (true? (get-in state [:pressed-keys key])))

(defn check-player-bounds 
  "Takes playter position and size of player sprite
  returns the position of player within bounds"
  [[x y] [ssx ssy]]
  (match [x y]
         [(_ :guard neg?) _] [0 y]
         [(_ :guard #(> % (- canvas.width ssx))) _] [(- canvas.width ssx) y]
         [_ (_ :guard neg?)] [x 0]
         [_ (_ :guard #(> % (- canvas.height ssy)))] [x (- canvas.height ssy)]
         :else [x y]))

(defn handle-input [state]
  (let [[x1 y1] (get-in state [:player :pos])
        is-down? (partial is-down? state)
        x (atom x1)
        y (atom y1)
        dt (:dt state)]
    ;; calculate new values for x and y
    (when (is-down? :down)
      (swap! y #(+ @y (* dt player-speed))))
    (when (is-down? :up)
      (swap! y #(- @y (* dt player-speed ))))
    (when (is-down? :right) 
      (swap! x #(+ @x (* dt player-speed))) )
    (when (is-down? :left) 
      (swap! x #(- @x (* dt player-speed))) )
    ;; update state with bullets, if fired
    (let [new-state (if (is-down? :space) 
                      (fire-bullets state)
                      state)]  
    ; checking the newly calculated position, ensuring player does not go off screen
      (->> (check-player-bounds [@x @y] (get-in state [:player :sprite :size]))
           (assoc-in new-state [:player :pos] )))))



(defn add-enemies [state]
  ;;     It gets harder over time by adding enemies using this
  ;;     equation: 1-.993^gameTime
  (if (< (.random js/Math) (- 1 (.pow js/Math 0.933 (/  (:game-time state) 20 ))))
    (update state :enemies conj 
            {:pos [canvas.width, (* (.random js/Math) (- canvas.height 39))],
             :sprite (make-sprite "img/sprites.png" [0 78] [80 39] 6 
                                  {:frames [0, 1, 2, 3, 2, 1]})}) 
    state))

(defn update-sprite [sprite dt]
  (let [new-index (+ (:index sprite) (* dt (:speed sprite)))]
    (assoc sprite :index new-index)))

(defn off-screen? [ent]
  (let [[x y] (:pos ent)]
    (or  (< y 0)
         (< x 0)
         (> x canvas.width)
         (> x canvas.heigh))))

(defn update-bullet [bullet dt]
  (let [dir (:dir bullet)
        [x y] (:pos bullet)]
    (case dir
      "up" (assoc bullet :pos [x (- y (* dt bullet-speed))])
      "down" (assoc bullet :pos [x (+ y (* dt bullet-speed))])
      (assoc bullet :pos [(+ x (* dt bullet-speed)), y]))))

(defn update-bullets [bullets dt]
  (->> bullets
       (map #(update-bullet % dt))
       (remove off-screen?)))

(defn update-enemy [enemy dt]
  (let [[x y] (:pos enemy)]
    (-> 
     (assoc enemy :pos [(- x (* dt enemy-speed)) y])
     (update-in [:sprite] update-sprite dt ))))

(defn update-enemies [enemies dt]
  (->> enemies
       (map #(update-enemy % dt))
       (remove off-screen?)))

(defn explosion-done? 
  "Takes and explosion and tests whether it has displayed all frames"
  [ex]
  (let [idx (.floor js/Math (get-in ex [:sprite :index]))]
    (not (and (get-in ex [:sprite :once])
              (>= idx (count (get-in ex [:sprite :frames])))))))

(defn update-explosions [explosions dt]
  (->> explosions
       (map #(update % :sprite update-sprite dt))
       (filter explosion-done?)))

(defn update-entities [state]
  (let [dt (:dt state)]
    (-> state
        (update-in [:player :sprite] update-sprite dt)
        (update :bullets update-bullets dt)
        (update :enemies update-enemies dt)
        (update :explosions update-explosions dt))))

;; detect and handle collisions

(defn collides [x, y, r, b, x2, y2, r2, b2]
  (not (or (<= r x2)
           (> x r2)
           (<= b y2)
           (> y b2))))

(defn box-collides [pos1 size1 pos2 size2]
  (let [[p1x p1y] pos1
        [s1x s1y] size1
        [p2x p2y] pos2
        [s2x s2y] size2]
    (collides p1x, p1y, (+ p1x s1x), (+ p1y s1y), p2x, p2y, (+ p2x s2x), (+ p2y s2y))))

(defn check-collisions [state]
  (let [e (atom)
        b (atom)]
    (doseq [enemy (:enemies state)
            bullet (:bullets state)]

      (let [e-pos (:pos enemy)
            e-sprite-size (get-in enemy [:sprite :size])
            b-pos (:pos bullet)
            b-sprite-size (get-in enemy [:sprite :size])]
        (when (box-collides e-pos e-sprite-size b-pos b-sprite-size)
          (reset! e e-pos)
          (reset! b b-pos))))
    (if-not @e
      state
      (-> state
          (update :score + 100)
          (update :enemies (fn [enemies] (filter #(not= @e (:pos %)) enemies) ))
          (update :bullets (fn [bullets] (filter #(not= @b (:pos %)) bullets) ))
          (update :explosions 
                  conj {:pos @b
                        :sprite (make-sprite "img/sprites.png"
                                             [0 117] [39 39] 16 
                                             {:frames [0 1 2 3 4 5 6 7 8 9 10 11 12]
                                              :dir nil 
                                              :once true} )})))))

(defn check-game-over [state]
  (let [ppos (get-in state [:player :pos])
        psize (get-in state [:player :sprite :size])  
        tf? (fn [tf enemy] 
              (if (true? tf) true
                  (box-collides ppos psize (:pos enemy) (get-in enemy [:sprite :size]))))
        game-over? (reduce tf? false (:enemies state))]
    (assoc state :game-over? game-over?)))

(defn update-state [state]
  (let [update-fns (comp 
                    #(update % :game-time + (:dt %))
                    handle-input
                    update-entities                    
                    add-enemies
                    check-collisions
                    check-game-over)]
    (swap! state update-fns)
    (set! ( .-innerHTML (:score-el @state)) (:score @state))))


;;;; ------------- Main game loop and initialization code -------------------- ;;;;


(defn main-loop [state]
  (let [now (. js/Date now)
        dt (/ (- now @last-time) 1000.0)]
    (swap! state assoc :dt dt)
    (update-state state)
    (render! @state)
    (reset! last-time now)
    (.requestAnimationFrame js/window (partial  main-loop state) )))

(defn setup []
  (let [state (atom (initial-state))]
    (swap! state assoc :terrain-pattern 
           (.createPattern ctx (resources/get-image "img/terrain.png") "repeat"))
    (e/listen (dom/get-element :play-again) :click (partial swap! state reset-game!) )
    (attach-listeners! state)
    (swap! state reset-game! )
    (reset! last-time (. js/Date now))
    (main-loop state)))


(defn init []
  (resources/load ["img/sprites.png" "img/terrain.png"])
  (resources/on-ready setup))


