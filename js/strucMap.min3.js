function loadMap(t, e, r,fn) {
    var a = e, //节点
        n = r,//线
        c = ["#1f77b4", "#ff7f0e", "#2ca02c", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"],//颜色
        l = t.width,   //设置默认的宽度
        i = t.height,   //设置默认的高度
        ary = [],
        o = d3.select("#map"),
        s = o.append("g"), //插入一个g标签
        u = d3.layout.force(); //力学图d3.layout.force

    u.on("tick", function () { //tick 表示当运动进行中每更新一帧时。这是力学图中最常使用的事件 //所有的都在这个运动中，
        s.selectAll("line.link").each(function (t) { //选择所有是line标签，class名是link的遍历，
            var e, r, a, n, c = d3.select(this);//指的是每一个line

            if ("NEXT" == t.type) {  //是线的那个数组中的值
                var l = t.target.x - t.source.x,
                    i = t.target.y - t.source.y, o = Math.sqrt(l * l + i * i),
                    s = l / o, u = i / o, d = 35, f = 35;
                e = t.source.x + d * s,
                    r = t.target.x - f * s,
                    a = t.source.y + d * u,
                    n = t.target.y - f * u,
                    c.attr("marker-end", "url(#arrow)")
                console.log(e, r, a, n)
            } else { //是线的那个数组中的值，出了next的都走这里
                e = t.source.x, //指的是节点中的第一条，自己本身的那个点的x坐标和y坐标
                    a = t.source.y,
                    r = t.target.x,//指的是节点中的其他条的x坐标和y坐标
                    n = t.target.y;
            }
            c.attr("x1", e),  //给每一条线增加x1的属性，属性值是起点的x坐标
                c.attr("x2", r), //给每一条线增加x2的属性，属性值是终点的x坐标
                c.attr("y1", a), //给每一条线增加y1的属性，属性值是起点的y坐标
                c.attr("y2", n) //给每一条线增加y2的属性，属性值是终点的y坐标
        }),
            s.selectAll("g.node").selectAll("circle.ring").attr({
                cx: function (t) {
                    return t.x
                },
                cy: function (t) {
                    return t.y
                }
            }),
            s.selectAll("g.node").selectAll("circle.outline").attr({
                cx: function (t) {
                    return t.x
                },
                cy: function (t) {
                    return t.y
                }
            }),
            s.selectAll("g.node").selectAll("text.nTxt").attr({
                x: function (t) {
                    return t.x - 15
                },
                y: function (t) {
                    return t.y + 6
                }
            }),
            s.selectAll("g.node").selectAll("text.propName").attr({
                x: function (t) {
                    return t.x - 35
                },
                y: function (t) {
                    return t.y - 35
                }
            }),
            d.attr({
                x: function (t) {
                    return (t.source.x + t.target.x) / 2 - 25
                },
                y: function (t) {
                    return (t.source.y + t.target.y) / 2 + 5
                },
                transform: function (t) {
                    var e = t.target.x - t.source.x,
                        r = t.target.y - t.source.y,
                        a = 360 * Math.atan(r / e) / (2 * Math.PI),
                        n = (t.target.x + t.source.x) / 2,
                        c = (t.target.y + t.source.y) / 2;
                    return "rotate(" + a + "," + n + "," + c + ")"
                }
            })
    }).charge(-1300).linkDistance(200).nodes(a).links(n).size([l, i]).alpha(.1),
        s.selectAll("line.link").data(n).enter().append("line").attr("class", "link");
    var d = s.selectAll("link.desc").data(n).enter().append("text").attr("class", "desc").text(function (t) {
            return t.text
        }),
        f = (u.drag().on("dragstart", function (t) {
            t.fixed = !0
        }),
            s.selectAll("g.node").data(a)),
        p = f.enter().append("g").attr("class", function (t, e) {
            return 0 === e ? "node active" : "node"
        }).call(u.drag).on("click", function (t) {
            d3.event.defaultPrevented;
        });
    p.append("circle").attr({r: 29, class: "ring"});

//这里不允许alert
    var io = o.append("svg:defs");
    $.each(a, function (index, data) {
        var m;
        if(data.prop.img.length>20){
            console.log(1)
            m = data.prop.img;
        }else{
            m ="./images/"+ data.prop.img;
        }
        io.append("svg:pattern").attr("id", data.id).attr("width", "100%").attr("height", "100%").attr("patternContentUnits", "objectBoundingBox").append("image").attr("width", "1").attr("height", "1").attr("xlink:href", m);
    });
    $.each(p,function (index,data) {
        $.each($(data).children(),function (index,value) {
            $(value).parent().click(function () {
                $("#info").slideDown().css({"left":"84%","top":"22px"});
               fn($(this).prevAll(".node").length)

            });
        });
    });
    p.append("circle").attr({r: 25, class: "outline"}).style({
        fill: function (index) {  //index是一个对象，node的那个数组中的每一个对象
            var id = index.id;
            return "url(#" + id + ")"
        },
        stroke: "#5CA8DB", "stroke-width": "2px"
    });
    p.append("text").attr("class", "nTxt").text(function (t) {
        return t.prop.nTxt
    }).style({fill: "black"}),
        p.append("text").attr("class", "propName").text(function (t) {
            return t.prop.name
        }).style({fill: "black", "font-family": "SimSun"}),
        u.start();

    for (var x = 0; x < 50; x++) {
        u.tick()
    }
    ;
    var g = setInterval(function () {
        u.alpha() < .01 ? clearInterval(g) : u.tick()  //alpha()  设定动画运动的时间，超过时间后运动就会停止。其实force.start() 即 alpha(0.1)     force.stop() 即 alpha(0)

    }, 80)
}