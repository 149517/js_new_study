window.onload = function () {
    let box = document.querySelector('.box');
    let img = document.querySelector('img');
    let banner = document.querySelector('.banner');
    let arrow_l = document.querySelector('.arrow_l');
    let arrow_r = document.querySelector('.arrow_r');

    // 左右按钮显示
    box.addEventListener('mouseover', function () {
        arrow_r.style.display = 'block';
        arrow_l.style.display = 'block';

        // 停止定时器
        clearInterval(timer);
        // 清除定时器变量
        timer = null;
    })
    box.addEventListener('mouseleave', function () {
        arrow_r.style.display = 'none';
        arrow_l.style.display = 'none';
        timer = setInterval(function(){
            //手动调用事件
            arrow_r.click();

            // 添加鼠标经过暂停，上面

        },2000)
    })

    console.log(banner.offsetWidth);
    console.log(banner.offsetLeft);

    //生成小圆圈
    let ul = document.querySelector('.circular');
    // 获取banner内的图片数量
    console.log(banner.children.length);
    for (let i = 0; i < banner.children.length; i++) {
        let li = document.createElement('li');

        //添加自定义属性为 li 增加索引
        li.setAttribute('index', i);
        ul.append(li);

        // 排他
        li.addEventListener('click', function () {
            for (let j = 0; j < ul.children.length; j++) {
                ul.children[j].className = '';
            }
            this.className = 'current';
            // 获取自定义的属性index
            let index = this.getAttribute('index');
            num = index;
            circle = index;

            animate(banner, -index * img.offsetWidth);
        })

    }
    // .第一个li添加current
    ul.children[0].className = 'current';

    //克隆第一张图片，放到banner的最后面
    let first = banner.children[0].cloneNode(true);
    banner.appendChild(first);


    // 图片切换
    // 通过定时器控制图片切换，图片采用位移的方式切换
    // circle 控制小圆圈的播放
    var circle = 0;
    var num = 0;
    var flag = true;
    // flag 节流阀

    arrow_r.addEventListener('click', function () {
        if (flag){
            flag = false;
            if (num === banner.children.length - 1) {
                // 通过克隆第一个图片，在点击最后一次切换的时候
                // 快速回到直接回到第一个
                banner.style.left = 0;
                num = 0;
            }
            num++;
            animate(banner, -num * img.offsetWidth,function(){
                // 通过回调函数，开启节流阀
                flag = true;
            });
            circle++;
            // 因为展示的图片比实际少一张
            if (circle === banner.children.length - 1) {
                circle = 0;
            }
            circleChange();
        }
    })
    arrow_l.addEventListener('click', function () {
        if(flag){
            flag = false;
            if (num === 0) {
                // 通过克隆第一个图片，在点击最后一次切换的时候
                // 快速回到直接回到第一个
                num = banner.children.length - 1;
                banner.style.left = -num * img.offsetWidth + 'px';
            }
            num--;
            animate(banner, -num * img.offsetWidth,function (){
                // 通过回调函数，开启节流阀
                flag = true;
            });
            circle--;
            // 因为展示的图片比实际少一张
            if (circle < 0) {
                circle = ul.children.length - 1;
            }
            circleChange();
        }

    })

    // 自动播放

    var timer = setInterval(function(){
        //手动调用事件
        arrow_r.click();

        // 添加鼠标经过暂停，上面

    },2000)

    function circleChange(){
        // 清除其他小圆圈的current类名
        for (let i = 0; i < ul.children.length; i++) {
            ul.children[i].className = '';

        }
        // 留下当前小圆圈的类名
        ul.children[circle].className = 'current';
    }

}