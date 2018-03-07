// 数组
var myarr = ['red', 'blue', 'yellow', 'purple'];
console.log(myarr);
console.log(myarr[0]);
console.log(myarr[3]);
// 索引键  对应值


// 对象
// 对象和数组很像，唯一不同的是  它的键值对是自己定义的
// 也就是说 索引方式不再局限于数字了，可以使用更友好的键名

//表示对象的变量名hero
// 与定义数组不同[]，定义对象用的是{}
// 逗号分割的是组成该对象的元素
// 键/值 对之间用冒号分割 key：value
var hero = {
    breed: 'Turtle',
    occupation: 'Ninja'
};

console.log(typeof hero); // Object

// 可以在键名(属性名)上面加一个引号
//以下是完全相同的
// 但是不建议在属性名加引号 这可以减少输入
//但是在一下的情况下必须加引号
// 1.属性名是javascript中的关键字
// 2.属性名中包含空格或者其它特殊的字符(包括除了字母 数字 下划线以及美元符号以外的字符)
// 3.属性名以数字开头
// var hero={occupation:1}
// var hero={"occupation":1}
// var hero={'occupation':1}

// {}--> 对象文本标识法
// []--> 数组文本标识法

// 元素、属性、方法与成员
//在一些程序设计语言中，有一下两种不同的数组形式
//1.一般性数组 也叫作索引型数组或者枚举型数组(通常以数字为键名)
//2.关联型数组  也叫哈希表或者字典(通常以字符串为键值)
// javascript 中我们以数组表示索引型数组  对象来表示关联型数组
// 访问对象属性
// 中括号 hero['occupation']
// 点号 hero.occupation

console.log(hero.breed); // Turtle
console.log(hero['breed']); // Turtle

console.log(hero.hair_color);  // undefined
console.log(hero['hair_color']); // undefined

// 嵌套对象
var book = {
    name: 'Catch-22',
    published: 1961,
    author: {
        firstname: 'Joseph',
        lastname: 'Heller'
    }
};
// 连续点好
console.log(book.author.firstname);
//连续方括号
console.log(book['author']['firstname']);
// 两种混合使用
console.log(book.author['firstname']);
console.log(book['author'].firstname);

// 如果我们要访问的属性名是不确定的，就必须使用中括号表示法，它允许我们在运行的时候通过变量来实现相关属性的动态存取
var key = 'firstname';
console.log(book.author[key]);

// 调用对象方法  对象方法实际上只是一个函数类型的属性，也可以通过点号和方括号访问，调用的时候只要加上一个括号就可以

var hero2 = {
    breed: 'Turtle',
    occupation: 'Ninja',
    say: function () {
        // return 'I am ' + hero2.breed;
        return 'I am ' + this.breed;
    }
};
// 点号
console.log(hero2.say());
// 方括号
console.log(hero2['say']());

//使用方括号调用方法并不常见,除非属性名是在运行时定义的
// 尽量不要使用引号 尽量使用点号来访问对象的方法和属性
var method = 'say';
console.log(hero2[method]());


//修改属性与方法
//1.先建立一个空对象
var hero3 = {};
//访问一个不存在的属性时候,会undefined
console.log(typeof hero3.breed);  //undefined

//为对象添加属性和方法
hero3.breed = 'turtle';
hero3.name = 'Lenonardo';
hero3.sayName = function () {
    return hero3.name;
};

//调用该方法
console.log(hero3.sayName()); // Lenonardo

// 删除一个属性
delete hero3.name;
console.log(hero3.sayName()); //undefined


// 构造器函数
function FHero() {
    this.occupation = 'Ninja';
}

var hero4 = new FHero();
console.log(hero4.occupation);

//使用构造器函数的好处之一就是可以在它创建对象的时候接受一些参数
//构造器函数的首字母大写以区别于其它一般的函数
// new操作符
function FHero2(name) {
    // this 引用的是全局对象
    name1 = 'wangyong';
    this.name = name;
    this.occupation = 'Ninja';
    this.whoAreYou = function () {
        return "I am " + this.name + "and my job is" + this.occupation;
    };
}

var h1 = new FHero2('Michelanelo');
var h2 = new FHero2('Donatello');
console.log(h1.whoAreYou());
console.log(h2.whoAreYou());

// 全局对象
console.log(typeof name1);
console.log(name1); //wangyong

//构造器属性  constructor
console.log(h2.constructor);

//insanceof 操作符
// 测试一个对象是不是由某一个指定的构造器函数创建

function hero5() {

};
var h5 = new hero5();
var o5 = {};
console.log(h5 instanceof hero5); // true
console.log(h5 instanceof Object); //true
console.log(o5 instanceof Object); //true

//返回对象的函数
// 构造器返回的不再是包含属性a的this对象而是另外一个包含属性b的对象
//这只有在返回是一个对象的时候才发生，如果返回的是一个非对象类型，构造器函数依旧会返回this
function C2() {
    this.a = 1;
    return {b: 2};
}

var c2 = new C2();
console.log(c2.a); //undefined
console.log(c2.b); // 2

function C3() {
    this.a = 1;
    return 'haha';
}

var c3 = new C3();
console.log(c3.a); // 1
console.log(c3.constructor); //[Function: C3]

//传递对象
// 当我们拷贝某个对象或者将它传递给某个函数时，往往传递的是对该对象的引用
//因此 对引用的改变会影响引用的原对象


var original = {howmany: 1};
var mycopy = original;
console.log(mycopy.howmany);  // 1
mycopy.howmany = 100;
console.log(original.howmany); // 100

//同样将对象传递给函数的情况也大抵相同
var nullifty = function (o) {
    o.howmany = 0;
};
nullifty(original);
console.log(original.howmany); // 0

// 比较对象
// 两个对象进行比较的时候，当且仅当引用指向同一个对象时，结果为true
// 如果不是同一个对象，即使是相同的方法或者属性，比较结果也会返回一个false

var fido = {breed:'dog'};
var benji ={breed:'dog'};

console.log(fido === benji); // false
console.log(fido == benji); // false
//创建一个变量mydog,并将其中的一个对象赋值给它
// 此时 mydog和benji所指向的对象是相同的
// 所以比较的结果是 true
var mydog = benji;
console.log(mydog === benji); // true;
console.log(mydog === fido); // false










