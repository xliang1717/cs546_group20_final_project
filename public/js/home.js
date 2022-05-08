if (window.location.href == "http://localhost:3000/") {
    window.onload = function () {
        var wrap = document.getElementById('wrap'),

            pic = document?.getElementById('pic')?.getElementsByTagName("li"),
            list = document?.getElementById('list')?.getElementsByTagName('li'),
            index = 0,
            timer = null;

        // 定义并调用自动播放函数
        timer = setInterval(autoPlay, 2000);

        // 鼠标划过整个容器时停止自动播放
        wrap.onmouseover = function () {
            clearInterval(timer);
        }

        // 鼠标离开整个容器时继续播放至下一张
        wrap.onmouseout = function () {
            timer = setInterval(autoPlay, 2000);
        }
        // 遍历所有数字导航实现划过切换至对应的图片
        for (var i = 0; i < list.length; i++) {
            list[i].onmouseover = function () {
                clearInterval(timer);
                index = this.innerText - 1;
                changePic(index);
            };
        };

        function autoPlay() {
            if (++index >= pic.length) index = 0;
            changePic(index);
        }

        // 定义图片切换函数
        function changePic(curIndex) {
            for (var i = 0; i < pic.length; ++i) {
                pic[i].style.display = "none";
                list[i].className = "";
            }
            pic[curIndex].style.display = "block";
            list[curIndex].className = "on";
        }

    };

    function btn1() {
        // 设置btn1点击之后会发生什么
        document.getElementById('show1').style.display = 'block';
        document.getElementById('wrap').style.display = 'none';
        document.getElementById('show3').style.display = 'none';
    }

    function btn2() {
        // 这里就是跟btn1一样的意思 点击btn2之后show1会隐藏 同时show2显示
        document.getElementById('show1').style.display = 'none';
        document.getElementById('wrap').style.display = 'block';
        document.getElementById('show3').style.display = 'none';
    }

    function btn3() {
        document.getElementById('show1').style.display = 'none';
        document.getElementById('wrap').style.display = 'none';
        document.getElementById('show3').style.display = 'block';
    }

}
