
// Руда
Java.perform(function () {
    var shouldRun = true;
    var paused = false;
    var Thread = Java.use('java.lang.Thread');
    var Com = Java.use("Base.Com");

    function sleepSync(ms) {
        const end = Date.now() + ms;
        while (Date.now() < end) {}
    }

    var GameMapObjectsController = Java.use("Base.GameMapObjectsController");
    var objM = Java.use("MenuPck.ListTypes.OtherMenuList");
    var Runnable = Java.use("java.lang.Runnable");
    var map = Java.use("Base.Com").currentGameMap.value;

    function mobs(){
        var ensMap = Com.EnsMap.value;
        var enemies = ensMap.Enemys.value;
    
        for (var i = 0; i <= 5; i++) {
            var enemy = enemies[i];
    
            if (enemy !== null && enemy !== undefined) {
                try {
                    var level = enemy.level.value;
                    if (level > 0) {
                        enemy.cx.value = 0;
                        enemy.cy.value = 0;
                        console.log("Reset cx and cy for enemy at index " + i);
                    }
                } catch (err) {
                    console.warn("Error accessing enemy at index " + i + ": " + err);
                }
            } else {
                console.warn("Enemy at index " + i + " is null or undefined");
            }
        }
   }

    // Hook View.dispatchKeyEvent to detect F1 and F2 only on ACTION_DOWN (0)
    var View = Java.use("android.view.View");
    View.dispatchKeyEvent.implementation = function (event) {
        var keyCode = event.getKeyCode();
        var action = event.getAction(); // 0 = down, 1 = up

        if (action === 0) { // Only handle key down
            console.log("Key down: " + keyCode);

            if (keyCode === 131) { // F1
                shouldRun = false;
                console.log("[F1] Stop signal received. Loop will terminate.");
            } else if (keyCode === 132) { // F2
                paused = !paused;
                console.log("[F2] Pause/Resume toggled. Paused = " + paused);
            }
        }

        return this.dispatchKeyEvent(event);
    };

    GameMapObjectsController.analisMapObject.overload('int', 'boolean').implementation = function (arg1, arg2) {
        console.log("[Base.GameMapObjectsController] analisMapObject called with args: [" + arg1 + "," + arg2 + "]");
        return this.analisMapObject(arg1, arg2);
    };

    objM.executeDelegated.overload('int').implementation = function (arg1) {
        console.log("[MenuPck.ListTypes.OtherMenuList] executeDelegated called with args: [" + arg1 + "]");
        return this.executeDelegated(arg1);
    };

    var MyRunnable = Java.registerClass({
        name: 'com.example.MyRunnable',
        implements: [Runnable],
        methods: {
        run: function loop() {
        if (!shouldRun) {
            console.log("Loop stopped completely.");
            return;
        }

        if (paused) {
            console.log("Loop paused... waiting to resume.");
            setTimeout(loop, 500);
            return;
        }

        var start = Date.now(); // Start timing

        var controllerInstance = GameMapObjectsController.$new();
        var objMInstance = objM.$new();
        if( map.nameId.value == "Wild_B5"){
        controllerInstance.analisMapObject(1, true);
        }
        if( map.nameId.value == "Craft_B5_Ore"){
        mobs();
        controllerInstance.analisMapObject(1, true);
        controllerInstance.analisMapObject(2, true);
        controllerInstance.analisMapObject(3, true);
        controllerInstance.analisMapObject(4, true);
        controllerInstance.analisMapObject(5, true);
        Thread.sleep(10);
        controllerInstance.analisMapObject(9, true);
        sleepSync(25);
        objMInstance.executeDelegated(3);
        Thread.sleep(10);
        controllerInstance.analisMapObject(6, true);
        controllerInstance.analisMapObject(7, true);
        controllerInstance.analisMapObject(8, true);
        controllerInstance.analisMapObject(0, true);
        }

        var end = Date.now(); // End timing
        var elapsed = end - start;
        console.log("\x1b[31mThread execution took: " + elapsed + " ms\x1b[0m");
        setTimeout(loop, 1000); // continue loop
        //console.log('\x1Bc');
    }

}
});

var Thread = Java.use("java.lang.Thread");
var myThread = Thread.$new(Java.cast(MyRunnable.$new(), Runnable));
myThread.start();
});