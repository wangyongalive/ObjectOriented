// 在javascript中,变量的作用域并不是以代码块作为作用域的，而是以函数作为作用域的，也就是说如果变量在某一个函数中定义的，那么它在函数以外的地方是不可见的。
// 而如果该变量是定义在if或者for这样的代码块中的，它在代码块之外是可以见的
// javascript中 全局变量是定义在所有函数之外的变量，局部变量则是在某一个函数中定义的变量
// 函数内的变量可以访问局部变量,反之则不行

var i = 0; // 0
function f() {
    console.log(i);
}

f();
// var i = 0; // undefined

for (var k = 0; k < 5; k++) {
    console.log(k);
}
console.log(k); // 5


var global = 1;

function f1() {
    var local = 2;
    global++;
    return global;
}

console.log('global = ' + f1());
console.log('global = ' + f1());

// console.log(local);  // local is not defined

function f2() {
    local = 2;
    global++;
    return global;
}

console.log(f2());  //  在函数没有被调用之前，local是不存在的，local会在被首次调用的时候被创建，并赋予一个全局作用域
console.log(local); // 如果没有声明一个变量时候没有用var,该变量会认为是一个全局变量


// 变量提升 hoisting
var a = 123;

// 函数的作用域始终优先于全局域，所以局部变量a会覆盖所有与它同名的全局变量
// 变量提升  就是说 当函数进入新的函数时，这个函数内被声明的所有变量会被提升到函数最开始的地方
// 被提升的只是变量的声明，赋值操作并不会被提升，它还是在原来的位置
function f3() {
    console.log(a); // undefined
    var a = 1;
    console.log(a); // 1
}

f3();

//f3等价与f4
function f4() {
    var a;
    console.log(a); // undefined
    a = 1;
    console.log(a); // 1
}

f4();

// 编程实践 仅在函数体内的第一行使用一个var来定义这个作用域中所有要用到的变量

// 匿名函数
//1.回调函数
// 函数是数据，所以函数可以当作参数传递给其它函数
// f5 参数不要加括号
function f5(a, b) {
    return a() + b();
}

function one() {
    return 1;
}

function two() {
    return 2;
}

console.log(f5(one, two)); // 3

// 直接用匿名函数  使用匿名函数的好处 节省变量名的使用 可以提升性能
console.log(f5(
    function () {
        return 1;
    },
    function () {
        return 2;
    }));

// 回调函数  callback + 匿名函数
function multipyByTwo(a, b, c, callback) {
    var i, ar = [];
    for (i = 0; i < 3; i++) {
        ar[i] = callback(arguments[i] * 2);
    }
    return ar;
}

console.log(multipyByTwo(1, 2, 3, function (a) {
    return a + 1;
}));


// 即时函数 定义后马上调用
// 好处：不会产生任何的全局变量  缺点在于无法重复执行
// 所以比较适合用来做初始化的任务
// 即时函数也可以有返回值
// 将匿名函数放在一个括号()中，最后再加上一个()

//1.(function(){}())
//2.(function(){})()
//3.
(function () {
    console.log('hello world');
})();
(function () {
    console.log('hello world');
})();

// 内部(私有)函数
// 确保全局变量名空间的冲突
// 确保私有性
function outer(param) {
    function inner(theinput) {
        return theinput * 2;
    }

    return 'The result is ' + inner(param);
};

//将以上的函数改为一个  函数标记法
var outer = function outer(param) {
    function inner(theinput) {
        return theinput * 2;
    }

    return 'The result is ' + inner(param);
};
console.log(outer(2));

// console.log(inner(2)); //inner is not defined

// 返回函数的函数
function f6() {
    console.log('A');
    return function () {
        console.log('B');
    }
};

f6();
// 返回的函数立即执行
f6()();

//重写自己的函数
function f7() {
    console.log('1111');
    f7 = function () {
        console.log('2222');
    }
}

f7();
f7 = f7();

// 组合应用
// 私有函数  someSetup() 和 actualWork()
// 即时函数  ({})()
// 第一次调用的时候，会调用someSetup()，并返回actualWork的引用,
// 返回值是不带括号的 因此，此结果仅仅是函数引用，并不会产生函数调用
// 即时函数返回的结果会被重新赋值给a
var a = (function () {
    function someSetup() {
        var setup = 'done';
        console.log('done');
    }

    function actualWork() {
        console.log('work');
    }

    someSetup();
    return actualWork;
})();

a();
console.log(typeof  a);

//闭包  突破作用域
// 全局变量 1.不使用var 2.通过函数传递给全局空间
//1. 作用域链 scope chain
// ’父级’-->‘子级’

//闭包#1
var global = 'global';
var F = function () {
    var local = 'local';
    var N = function () {
        var inner = 'inner';
        return local;
    };
    return N;
};

// 通过返回函数N，实现查看私有数据
var inner = F();
console.log(inner());//local

// 闭包2# 直接创建全局函数inner()
var inner2;  // 占位符
var F = function () {
    var local = 'local';
    var N = function () {
        return local;
    };
    inner2 = N;
};
F();
console.log(inner2()); // local

// 闭包3#
// 函数参数 是隐式创建的，即不要通过var声明
// F返回一个子函数，该子函数有会返回父级的参数
function F3(param) {
    var N = function () {
        return param;
    }
    param++;
    return N;
}

var inner3 = F3(123);
console.log(inner3());
; // 124


// 循环中的闭包
function F4() {
    var arr = [], i;
    for (i = 0; i < 3; i++) {
        arr[i] = function () {
            return i;
        }
    }
    return arr;
}

// 这里创建了3个闭包，他们都指向了同一个共同的局部变量i
// 当要获取某一个变量时候，它会从其所在的域开始向上寻找距离最近的i
var arr = F4();
console.log(arr[0]()); // 3
console.log(arr[1]()); // 3
console.log(arr[2]()); // 3

// 循环中的闭包 改进
// 将i传递给另一个即时函数，在该函数中i被赋值给了局部变量x
function F41() {
    var arr1 = [], i;
    for (i = 0; i < 3; i++) {
        arr1[i] = (function (x) {
            return function () {
                return x;
            };
        }(i));
    }
    return arr1;
}

var arr1 = F41();
console.log(arr1); //[ [Function], [Function], [Function] ]
console.log(arr1[0]()); // 0
console.log(arr1[1]()); // 1
console.log(arr1[2]()); // 2

// getter setter
//所有的一切都可以通过一个即时函数来实现，定义了两个全局函数setValue()和getValue(),
//并以此来确保局部变量的不可以访问性
var getValue, setValue;
(function () {
    var secret = 0;
    getValue = function () {
        return secret;
    };
    setValue = function (v) {
        if (typeof v == 'number') {
            secret = v;
        }
    };
}());
console.log(getValue());
setValue(123);
console.log(getValue());

//闭包的应用  ---迭代器
function setup(x) {
    var i = 0;
    return function () {
        return x[i++];
    };
}

var next=setup(['a','b','c']);
console.log(next()); // a
console.log(next()); // b
console.log(next()); // c
console.log(next()); // undefined



