// 数据封装类对象
// Object Array Boolean Number String

// Object
// 无论多复杂的对象  它都继承自Object对象的，拥有一下的属性和方法
// {}空对象的部分属性
// constructor: 返回构造器函数的引用
// toString(): 返回对象的描述字符串
// valueOf() : 返回对象本身
var o = {}; // var o = new Object{}  两者是等价的 {}叫做对象文本标识法
console.log(o.toString()); //[object Object]
console.log(o.constructor); // [Function: Object]
console.log(o.valueOf()); //{}

//对于简单的对象来说 valuef()方法返回的就是对象自己

console.log(o.valueOf() === o); // true

// Array() 是一个用来构建数组的内建构造器函数
var a = new Array(1, 2, 3, 'four');  // var a = [1,2,3,'four'] 与数组文本标识法是一样的
console.log(a);

// 如果给构造器一个单独的数字，会出现异常,会认为是数组的长度
var a2 = new Array(5);
console.log(a2); //[ <5 empty items> ]

var a3 = [5];
console.log(a3); // [ 5 ]

// 数组实际上也是一个对象
console.log(typeof a3); //object

// 既然数组是对象 那么 他也继承了Object的所有方法和属性
console.log(a.toString()); //1,2,3,four
console.log(a.valueOf()); // [ 1, 2, 3, 'four' ]
console.log(a.constructor); // [Function: Array]

// 尽管数组也是一个对象  但是他也有不同的地方
// 数组的属性名是从0开始递增的，并自动生成数值
// 数组拥有一个用于记录元素数量的属性length
// 数组在父级对象的基础上扩展了更多额外的内建方法

// 验证一下对象和数组的区别

var v = [], oo = {};
console.log(v.length); // 0
console.log(oo.length); // undefined

v[0] = 1;
oo[0] = 1;
v.prop = 2;
oo.prop = 2;

console.log(v.length); // 1
//可以手动设置数组的长度
v.length = 5;
console.log(v); //[ 1, <4 empty items>, prop: 2 ]
// 如果多余的length小于当前元素数，多出的那部分元素将会被移除
v.length = 2;
console.log(v); // [ 1, <1 empty item>, prop: 2 ]

// 数组的内建方法
var newa = [3, 5, 1, 7, 'test'];
//push pop
// push arr[arr.length] = xxx;
newa.push('wangyong');
console.log(newa); // [ 3, 5, 1, 7, 'test', 'wangyong' ]
// pop arr.length--
newa.pop()
console.log(newa) // [ 3, 5, 1, 7, 'test' ]

// sort 返回排序后的函数  会改变原来的数组
var b = newa.sort();
console.log(b); // [ 1, 3, 5, 7, 'test' ]
console.log(newa);// [ 1, 3, 5, 7, 'test' ]
console.log(b === newa); // true

// join() 方法会返回一个由目标数组元素的连接字符串
console.log(newa.join('<-->')); // 1<-->3<-->5<-->7<-->test

// slice() 方法会在不修改目标数组的情况下返回其中的某个片段,片段的首位可以通过slice的两个参数确定
console.log(newa.slice(0, 2));  // [ 1, 3 ]  不包括右边
console.log(newa); // [ 1, 3, 5, 7, 'test' ]


// splice() 会修改目标数组 会移除并返回指定的切片
newb = newa.splice(1, 2, 'n', 'm');
console.log(newb);  // 移除 1开始 长度为2的片段
console.log(newa);  // 用'n' 'm' 填补替换后的数组

// Function()
// 函数是一个特殊的数据类型 实际上是一个对象
//function declaration
function sum(a, b) {
    return a + b;
}

console.log(sum(1, 2));

// function expression
var sum1 = function (a, b) {
    return a + b;
};
console.log(sum1(1, 2));

// Function()  构造器  必须使用参数传递的方法来设定函数的参数名(通常为字符串) 以及函数体的代码(通常为字符串)
// javascipt引擎会对这些源代码进行解析，并创建新函数，这样子会带来和eval()相似的缺点
// 尽量避免使用Function()构造器,它与eval() setTimeOut()一样，会以字符串的形式通过javascript的代码检测
var sum2 = new Function('a', 'b', 'return a+b;');
console.log(sum2(1, 2)); // 3

// 函数对象的属性 constructor length
function myfunc(a) {
    return a;
}

console.log(myfunc.constructor); // [Function: Function]
console.log(myfunc.length);  // 参数数量

// prototype属性
// prototype 属性允许您向对象添加属性和方法
// 1. 每一个函数的prototype属性中都指向了一个对象
// 2.它只有在该函数是构造函数的时候才会发挥作用
// 3.该函数的所有对象都会有一个该prototype属性的引用，并可以将其当作自身的属性来应用
// 任何一个新建的函数都会有一个prototype属性，该属性会指向一个新对象
var ninja = {
    name: 'Ninja',
    say: function () {
        return 'I am a ' + this.name;
    }
};
console.log(typeof  ninja.prototype); // undefined

function FF() {

};
console.log(typeof FF.prototype); // Object

FF.prototype = ninja;
console.log(typeof FF.prototype); // Object

// 将FF()当作构造器函数来创建对象对象baby_ninja
var baby_ninja = new FF();
console.log(baby_ninja.name); // Ninja
console.log(baby_ninja.say()); // I am a Ninja

//函数对象的方法
// 函数对象都继承自顶级父级对象Oject,他们都拥有Object对象的方法,例如toString()
// 函数的toString()就是查看函数的源代码
function myFunc(a, b, c) {
    return a + b + c;
}

console.log(myFunc.toString()); //function myFunc(a, b, c) {return a + b + c;}
// 但是如果这个方法用来查看内建函数的源码的话,就只会得到一个毫无用处的字符串 function parseInt() { [native code] }
console.log(parseInt.toString()); //function parseInt() { [native code] }

// 可以用toString()来区别本地方法和自定义的方法

// 在javascript中每一个方法都有call()和apply()两个方法
// 1.可以用他们来触发函数，并指定相关的调用参数
// 2.可以让一个对象去‘借用’另外一个对象的方法，并为自用，这也是实现代码代码重用简单实用的方法

var some_obj = {
    name: 'Ninja',
    say: function (who) {
        return 'Haya ' + who + ', I am a ' + this.name;
    }
};
console.log(some_obj.say('wangyong')); // Haya wangyong, I am a Ninja

var my_obj = {name: 'script guru'};
// some_obj的say()方法也适用于my_obj,将say()方法当作my_obj自身的方法来调用
// say在被调用的时候，其中的this就被自动设置为my_obj对象的引用，参数也会传递给say()
// 如果没有将对象传递给call()的首参数，或者传递给它的是null 它的调用对象将会被默认为全局对象
console.log(some_obj.say.call(my_obj, 'wangjiangyong')); //Haya wangjiangyong, I am a script guru
console.log(some_obj.say.call('wangjiangyong')); // Haya undefined, I am a undefined

// apply()的工作方式和call()基本相同，唯一不同的在于参数的传递方式
// apply()要求传递一个数组
console.log(some_obj.say.apply(my_obj, ['wangjiangyong2'])); //Haya wangjiangyong2, I am a script guru

//重新认识arguments
// arguments看起来想一个数组，但实际上是一个类似数组的对象
// 但是它不在提供sort()和slice()这样子的数组方法
// 但是可以把它变为数组，这里就用到call()方法
//  这里新建一个空数组，再使用他的slice属性
function farguments() {
    return arguments;
}

console.log(farguments(1, 2, 3)); //{ '0': 1, '1': 2, '2': 3 }

function fToArray() {
    var arges = [].slice.call(arguments);
    return arges.reverse();
}

console.log(fToArray(1, 2, 3, 4)); //[ 4, 3, 2, 1 ]

// 判断对象类型
// 如何区分对象和数组呢？
// 使用Object对象的toString()方法,该方法会返回所创建对象的内部类名
// 这里toString()方法必须要来自Object构造器的prototype属性，直接调用Array的方法是不可以的
// 因为在Array中，这个方法已经被其他目的重写了

console.log(Object.prototype.toString.call({})); // [object Object]
console.log(Object.prototype.toString.call([])); // [object Array]

console.log([1, 2, 3].toString());
console.log(Array.prototype.toString.call([1, 2, 3]));

// Object.prototype.toString 用一个引用变量表示
var toStr = Object.prototype.toString;

console.log((function () {
    return toStr.call(arguments);
}()));  //[object Arguments]

console.log((function () {
    return toStr.call([]);
}()));  // [object Array]

// 该方法也同样适用于dom
// console.log(toStr.call(document.body)); // [object HTMLBodyElement]

// Boolean
//这里要明白新创建的b是一个对象，而不是一个基本的数据类型的布尔值
// 如果想把b转变为基本数据类型的布尔值，可以调用她的valueOf()方法(继承自Object对象)
// 总体而言，用Boolean()构造器没有什么实用价值，因为他没有提供除了父级以外的任何方法和属性
var b = new Boolean();
console.log(typeof b); // object

console.log(typeof b.valueOf()); // boolean
console.log(b.valueOf()); //false

// 不使用new操作符而是作为一般的函数使用的时候，Boolean()可以将一些非布尔值转变为布尔值
//
console.log(Boolean('test')); // true
console.log(Boolean(''));  // false
console.log(Boolean({})); // true

// Number()与Boolean()类似
// 1. 当被当作构造器函数时(new 操作符),它用于创建一个对象
// 2. 当被当作一个一般的函数的时候, 它会试图将任何值转变为数 这点和parseInt() parseFloat()类似
var nn = Number('12.12');
console.log(nn); //12.12
console.log(typeof nn); //number

var obnn = new Number('12.12');
console.log(typeof obnn); // object

//Number内置属性
//MAX_VALUE MIN_VALUE
console.log(Number.MAX_VALUE); //1.7976931348623157e+308
console.log(Number.MIN_VALUE); // 5e-324
console.log(Number.POSITIVE_INFINITY); // Infinity
console.log(Number.NEGATIVE_INFINITY); // -Infinity
console.log(Number.NaN); //NaN
//Number内置方法
var numberFun = new Number(123.456);
console.log(numberFun.toFixed(1)); //123.5
// 可以在未创建对象Number的时候就使用这些方法
// Number对象均在后台完成创建和销毁
console.log((12345).toExponential()); //1.2345e+4

// Number也有自己的toString()方法，他有一个可以选择的参数radix
var nnto = new Number(225);
console.log(nnto.toString()); // 225
console.log(nnto.toString(10)); // 225
console.log(nnto.toString(16)); // e1
console.log(nnto.toString(2)); // 11100001

// String()
// String对象和基本字符串类型之间的区别
// String 对象实际上就是一个字符数组，其中就包括索引属性
var primitive = 'Hello';
console.log(typeof  primitive); // string
var obj_String = new String('world');
console.log(typeof  obj_String); //object

console.log(obj_String[0]); // w
console.log(obj_String[1]); // o
console.log(obj_String[2]); // r

// 获取String对象的基本类型值，可以调用该对象的valueOf()或者toString()方法(都继承自Object对象)，
// 但是很少会这样子做  因为在很多情况下String会被自动转换为基本类型的字符串
// 基本类型的字符串就不再是对象了，因此不再包含任何属性和方法，但javascript为我们提供了一些将基本字符串类型转换为String对象的语法
console.log(obj_String.valueOf()); //world
console.log(obj_String.toString());//world
console.log(obj_String + ""); //自动转换

console.log('potato'.length); // 6


































