function animate(obj, target, callback) {

    clearInterval(obj.timers);
    obj.timers = setInterval(function () {

        // let step = Math.ceil((target - obj.offsetLeft) / 10);
        let step = (target - obj.offsetLeft) / 10;
        // 正值向上取整，负值向下，负值表示向后
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft === target) {
            clearInterval(obj.timers);
            if (callback) {
                // console.log(callback);
                callback();
            }
        }
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 15)

}

function animate_top(obj, target, callback) {

    clearInterval(obj.timers);
    obj.timers = setInterval(function () {

        // let step = Math.ceil((target - obj.offsetLeft) / 10);
        let step = (target - obj.scrollY) / 10;
        // 正值向上取整，负值向下，负值表示向后
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.scrollY === target) {
            clearInterval(obj.timers);
            if (callback) {
                // console.log(callback);
                callback();
            }
        }
        obj.style.left = obj.scrollY + step + 'px';
        window.scroll(0, scrollY + step);
    }, 15)

}